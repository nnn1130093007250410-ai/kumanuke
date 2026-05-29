#!/usr/bin/env python3
"""
ArcGIS FeatureServer 増分収集スクリプト
既存のbear-japan.jsonの各ソースの最大OBJECTIDを確認し、
それ以降の新規レコードのみを取得してJSONに追加する。
"""

import json
import re
import sys
import time
import urllib.request
import urllib.parse
from datetime import datetime, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_FILE = PROJECT_ROOT / "public" / "data" / "bear-japan.json"
CONFIG_FILE = SCRIPT_DIR / "sources_config.json"

HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; KumanukeBearBot/1.0)'}


# ── ヘルパー ────────────────────────────────────────────────────────────────

def normalize_fullwidth(text: str) -> str:
    """全角数字・記号を半角に変換"""
    return ''.join(
        chr(ord(c) - 0xFEE0) if 0xFF01 <= ord(c) <= 0xFF5E else c
        for c in text
    )


def parse_date_any(val) -> str | None:
    """様々な形式の日付を YYYY-MM-DD に変換"""
    if val is None:
        return None
    # エポックミリ秒（ArcGIS標準）
    if isinstance(val, (int, float)) and val > 1_000_000_000_000:
        try:
            dt = datetime.fromtimestamp(val / 1000, tz=timezone.utc)
            return dt.strftime('%Y-%m-%d')
        except Exception:
            return None
    if not isinstance(val, str):
        val = str(val)
    val = normalize_fullwidth(val.strip())
    # YYYY-MM-DD または YYYY/MM/DD
    m = re.match(r'(\d{4})[-/](\d{1,2})[-/](\d{1,2})', val)
    if m:
        y, mo, d = int(m.group(1)), int(m.group(2)), int(m.group(3))
        if 2000 <= y <= 2030 and 1 <= mo <= 12 and 1 <= d <= 31:
            return f'{y:04d}-{mo:02d}-{d:02d}'
    # YYYY年MM月DD日
    m = re.match(r'(\d{4})年(\d{1,2})月(\d{1,2})日', val)
    if m:
        y, mo, d = int(m.group(1)), int(m.group(2)), int(m.group(3))
        return f'{y:04d}-{mo:02d}-{d:02d}'
    # R〇年→西暦
    m = re.match(r'R(\d+)年(\d{1,2})月(\d{1,2})日', val)
    if m:
        y = 2018 + int(m.group(1))
        mo, d = int(m.group(2)), int(m.group(3))
        return f'{y:04d}-{mo:02d}-{d:02d}'
    return None


def pick_field(attrs: dict, candidates: list[str]) -> str | None:
    """候補フィールド名リストから最初にヒットした値を返す（大文字小文字無視）"""
    lower_attrs = {k.lower(): v for k, v in attrs.items()}
    for c in candidates:
        v = lower_attrs.get(c.lower())
        if v is not None and str(v).strip() not in ('', 'null', 'None'):
            return str(v).strip()
    return None


def fetch_feature_page(service_url: str, where: str, offset: int, page_size: int = 1000) -> list:
    """ArcGIS FeatureServer から1ページ分のフィーチャーを取得"""
    # URLに日本語が含まれる場合はパーセントエンコード
    encoded_base = urllib.parse.quote(service_url, safe=':/?=&@#%')
    params = urllib.parse.urlencode({
        'where': where,
        'outFields': '*',
        'outSR': '4326',
        'f': 'json',
        'resultOffset': offset,
        'resultRecordCount': page_size,
        'orderByFields': 'OBJECTID',
        'returnGeometry': 'true',
    })
    url = f"{encoded_base}/query?{params}"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode('utf-8')).get('features', [])


def get_service_fields(service_url: str) -> list[str]:
    """サービスの全フィールド名を取得"""
    try:
        # URLに日本語が含まれる場合はパーセントエンコード
        encoded_url = urllib.parse.quote(service_url, safe=':/?=&@#%')
        url = f"{encoded_url}?f=json"
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=20) as resp:
            meta = json.loads(resp.read().decode('utf-8'))
        return [f['name'] for f in meta.get('fields', [])]
    except Exception:
        return []


def find_date_field(fields: list[str], date_candidates: list[str]) -> str | None:
    """実在するフィールド名からdate候補を選択（CreationDateより発生日時を優先）"""
    lower_fields = {f.lower(): f for f in fields}
    # 設定ファイルの候補を優先
    for c in date_candidates:
        real = lower_fields.get(c.lower())
        if real:
            return real
    # 発生日時系フィールドを優先（ArcGIS/survey123共通パターン）
    priority_patterns = ['hassei', 'jiko', 'mokugeki', 'shutsubotsu', 'bunpu', 'hasseidate']
    for pat in priority_patterns:
        for f in fields:
            if pat in f.lower():
                return f
    # 日付系フィールド（CreationDate / EditDate を除外）
    exclude = {'creationdate', 'editdate', 'last_edited_date', 'created_date'}
    for f in fields:
        fl = f.lower()
        if fl in exclude:
            continue
        if 'date' in fl or '日' in fl or 'jikoku' in fl or 'time' in fl:
            return f
    # 最終フォールバック: CreationDate
    for f in fields:
        if f.lower() in ('creationdate', 'editdate'):
            return f
    return None


def feature_to_record(
    feature: dict,
    source_cfg: dict,
    date_field: str | None,
    city_field: str | None,
    desc_field: str | None,
    type_field: str | None,
) -> dict | None:
    """ArcGIS フィーチャーを bear-japan.json レコードに変換"""
    attrs = feature.get('attributes', {})
    geom = feature.get('geometry', {})

    # 座標
    lng = geom.get('x') if geom else None
    lat = geom.get('y') if geom else None
    if lat is None or lng is None:
        return None
    if not (-90 <= lat <= 90) or not (-180 <= lng <= 180):
        return None
    # 日本の大まかな範囲チェック
    if not (24 <= lat <= 46 and 122 <= lng <= 154):
        return None

    # OBJECTID
    oid = attrs.get('OBJECTID') or attrs.get('objectid') or attrs.get('ObjectID')
    if oid is None:
        return None

    # 日付
    date_val = attrs.get(date_field) if date_field else None
    date_str = parse_date_any(date_val)
    if not date_str:
        # 他のフィールドから試みる
        for k, v in attrs.items():
            parsed = parse_date_any(v)
            if parsed and parsed != '2000-01-01':
                date_str = parsed
                break
    if not date_str:
        date_str = '2000-01-01'

    # 市区町村
    city = pick_field(attrs, [city_field] if city_field else []) or source_cfg.get('prefecture', '')

    # 説明
    description = pick_field(attrs, [desc_field] if desc_field else []) or ''

    # タイプ（クマ以外を除外するフィルタ用）
    incident_type = '目撃'
    if type_field:
        t_val = pick_field(attrs, [type_field])
        if t_val:
            # 長野県など複数動物が含まれるソースでクマ以外を除外
            type_filter = source_cfg.get('type_filter', '')
            if type_filter and type_filter not in t_val:
                return None

    # タイプ判定（description / city などから）
    combined = f"{city} {description}".lower()
    if '捕獲' in combined or '錯誤捕獲' in combined:
        incident_type = '捕獲'
    elif '侵入' in combined or '食害' in combined or '農業' in combined:
        incident_type = '農作物被害'
    elif '人身' in combined or '被害' in combined or '負傷' in combined:
        incident_type = '人身被害'

    bear_type = source_cfg.get('bear_type', 'ツキノワグマ')
    pref = source_cfg.get('prefecture', '')
    id_prefix = source_cfg['id_prefix']
    source_name = source_cfg.get('source_name', '')
    source_url_val = source_cfg.get('source_url', source_cfg.get('service_url', ''))

    title = f"{pref} {city}でクマ{'出没' if incident_type == '目撃' else incident_type}" if city else f"{pref}でクマ出没"

    return {
        'id': f"{id_prefix}-{int(oid):05d}",
        'date': date_str,
        'prefecture': pref,
        'city': city,
        'type': incident_type,
        'bear_type': bear_type,
        'title': title,
        'description': description[:200] if description else '',
        'source_name': source_name,
        'source_url': source_url_val,
        'danger_level': 2 if incident_type == '人身被害' else 1,
        'lat': round(lat, 7),
        'lng': round(lng, 7),
    }


# ── メイン処理 ───────────────────────────────────────────────────────────────

def collect_arcgis(dry_run: bool = False) -> int:
    """全ArcGISソースを増分収集。追加件数を返す。"""
    print("=== ArcGIS 増分収集 ===")

    with open(DATA_FILE, encoding='utf-8') as f:
        bear_data: list[dict] = json.load(f)

    with open(CONFIG_FILE, encoding='utf-8') as f:
        config = json.load(f)

    # 既存IDセット（重複チェック用）
    existing_ids = {d.get('id', '') for d in bear_data if d.get('id')}

    # 既存の(lat,lng)ペアセット（座標重複チェック）
    existing_coords = {
        (round(d['lat'], 4), round(d['lng'], 4))
        for d in bear_data
        if d.get('lat') is not None and d.get('lng') is not None
    }

    # ソース別最大OBJECTID
    max_oids: dict[str, int] = {}
    for d in bear_data:
        pid = d.get('id', '')
        if not pid:
            continue
        parts = pid.rsplit('-', 1)
        if len(parts) == 2 and parts[1].isdigit():
            prefix = parts[0]
            oid = int(parts[1])
            max_oids[prefix] = max(max_oids.get(prefix, 0), oid)

    new_records: list[dict] = []
    total_added = 0

    for src in config.get('arcgis', []):
        if src.get('_skip'):
            continue

        prefix = src['id_prefix']
        service_url = src['service_url']
        max_oid = max_oids.get(prefix, 0)

        print(f"\n[{prefix}] 現在の最大OBJECTID={max_oid}")

        # サービスのフィールド一覧を取得
        try:
            all_fields = get_service_fields(service_url)
        except Exception as e:
            print(f"  フィールド取得エラー: {e}")
            all_fields = []

        # フィールド名解決
        date_field = find_date_field(all_fields, src.get('date_fields', []))
        city_field = next((f for c in src.get('city_fields', []) for f in all_fields if f.lower() == c.lower()), None)
        desc_field = next((f for c in src.get('desc_fields', []) for f in all_fields if f.lower() == c.lower()), None)
        type_field = next((f for c in src.get('type_fields', []) for f in all_fields if f.lower() == c.lower()), None)

        print(f"  Fields: date={date_field}, city={city_field}, desc={desc_field}")

        # 新規フィーチャー取得
        where = f"OBJECTID > {max_oid}"
        offset = 0
        page_size = 1000
        source_new = 0

        try:
            while True:
                features = fetch_feature_page(service_url, where, offset, page_size)
                if not features:
                    break

                for feat in features:
                    rec = feature_to_record(feat, src, date_field, city_field, desc_field, type_field)
                    if rec is None:
                        continue
                    # ID重複チェック
                    if rec['id'] in existing_ids:
                        continue
                    # 座標重複チェック
                    coord = (round(rec['lat'], 4), round(rec['lng'], 4))
                    if coord in existing_coords:
                        continue
                    existing_ids.add(rec['id'])
                    existing_coords.add(coord)
                    new_records.append(rec)
                    source_new += 1

                print(f"  オフセット{offset}: {len(features)}件取得 / 追加候補{source_new}件")
                if len(features) < page_size:
                    break
                offset += page_size
                time.sleep(0.5)

        except Exception as e:
            print(f"  エラー: {e}")
            continue

        print(f"  ➜ {source_new}件追加")
        total_added += source_new

    if new_records and not dry_run:
        bear_data.extend(new_records)
        # 日付順にソート（オプション：そのまま追記でもOK）
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(bear_data, f, ensure_ascii=False, separators=(',', ':'))
        print(f"\n✓ bear-japan.json に {total_added}件追加 (総計 {len(bear_data)}件)")
    elif dry_run:
        print(f"\n[DRY RUN] {total_added}件が追加予定")
    else:
        print("\n新規レコードなし")

    return total_added


if __name__ == '__main__':
    dry = '--dry-run' in sys.argv
    added = collect_arcgis(dry_run=dry)
    sys.exit(0 if added >= 0 else 1)
