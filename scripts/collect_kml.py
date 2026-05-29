#!/usr/bin/env python3
"""
Google My Maps KML 増分収集スクリプト
各KMLソースを再ダウンロードし、既存データにない新規プレースマークのみを追加する。
"""

import json
import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_FILE = PROJECT_ROOT / "public" / "data" / "bear-japan.json"
CONFIG_FILE = SCRIPT_DIR / "sources_config.json"

NS = 'http://www.opengis.net/kml/2.2'
HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; KumanukeBearBot/1.0)'}


# ── ヘルパー ────────────────────────────────────────────────────────────────

def normalize_fullwidth(text: str) -> str:
    return ''.join(
        chr(ord(c) - 0xFEE0) if 0xFF01 <= ord(c) <= 0xFF5E else c
        for c in text
    )


ERA_OFFSET = {
    'H': 1988, '平': 1988,
    'R': 2018, '令': 2018,
}


def parse_year_from_folder_name(name: str) -> int | None:
    """フォルダ名から年度を推定"""
    name = normalize_fullwidth(name)
    # 西暦
    m = re.search(r'(20\d{2})年?', name)
    if m:
        return int(m.group(1))
    # 令和 / 平成
    m = re.search(r'([RrHh令平])(\d{1,2})年?', name)
    if m:
        era = m.group(1).upper()
        num = int(m.group(2))
        offset = ERA_OFFSET.get(era, ERA_OFFSET.get('R'))
        return offset + num
    return None


def parse_date_from_text(text: str, year_hint: int | None) -> str | None:
    """プレースマーク説明文から日付を抽出"""
    text = normalize_fullwidth(text)
    # 年月日形式
    for pat in [
        r'(\d{4})[-/年](\d{1,2})[-/月](\d{1,2})日?',
        r'令和(\d+)年(\d{1,2})月(\d{1,2})日',
        r'R(\d+)[./年](\d{1,2})[./月](\d{1,2})',
    ]:
        m = re.search(pat, text)
        if m:
            g = m.groups()
            if len(g) == 3:
                y_raw = int(g[0])
                mo, d = int(g[1]), int(g[2])
                year = 2018 + y_raw if y_raw < 100 else y_raw
                if 2000 <= year <= 2030 and 1 <= mo <= 12 and 1 <= d <= 31:
                    return f'{year:04d}-{mo:02d}-{d:02d}'

    # 月日のみ（年はフォルダヒントを使う）
    if year_hint:
        m = re.search(r'(\d{1,2})月(\d{1,2})日', text)
        if m:
            mo, d = int(m.group(1)), int(m.group(2))
            if 1 <= mo <= 12 and 1 <= d <= 31:
                return f'{year_hint:04d}-{mo:02d}-{d:02d}'

    return None


def parse_incident_type(name: str, desc: str) -> str:
    """出没タイプを推定"""
    combined = (name + ' ' + desc).lower()
    if '捕獲' in combined:
        return '捕獲'
    if '人身' in combined or '負傷' in combined or '被害' in combined:
        return '人身被害'
    if '侵入' in combined or '食害' in combined:
        return '農作物被害'
    return '目撃'


def parse_danger_level(incident_type: str, desc: str) -> int:
    if incident_type == '人身被害':
        return 3
    if incident_type in ('捕獲', '農作物被害'):
        return 1
    combined = desc.lower()
    if '民家' in combined or '住宅' in combined or '市街' in combined:
        return 2
    return 1


def process_container(el, year_ctx: int | None, placemarks: list, prefix: str, src: dict) -> None:
    """KML Document/Folder を再帰的に処理してプレースマークを収集"""
    # このコンテナの名前から年を取得
    local_year = year_ctx
    name_el = el.find(f'{{{NS}}}name')
    if name_el is not None and name_el.text:
        y = parse_year_from_folder_name(name_el.text)
        if y:
            local_year = y

    # このコンテナ直下のプレースマーク
    for pm in el.findall(f'{{{NS}}}Placemark'):
        pm_name_el = pm.find(f'{{{NS}}}name')
        pm_name = (pm_name_el.text or '').strip() if pm_name_el is not None else ''

        desc_el = pm.find(f'{{{NS}}}description')
        desc_raw = (desc_el.text or '').strip() if desc_el is not None else ''
        # HTMLタグを除去
        desc = re.sub(r'<[^>]+>', ' ', desc_raw).strip()
        desc = re.sub(r'\s+', ' ', desc)

        # 座標
        coord_el = pm.find(f'.//{{{NS}}}coordinates')
        if coord_el is None or not coord_el.text:
            continue
        coord_str = coord_el.text.strip().split()[0]
        parts = coord_str.split(',')
        if len(parts) < 2:
            continue
        try:
            lng, lat = float(parts[0]), float(parts[1])
        except ValueError:
            continue
        if not (24 <= lat <= 46 and 122 <= lng <= 154):
            continue

        # 日付
        full_text = f"{pm_name} {desc}"
        date_str = parse_date_from_text(full_text, local_year) or (
            f'{local_year}-01-01' if local_year else '2000-01-01'
        )

        # タイプ
        inc_type = parse_incident_type(pm_name, desc)

        pref = src.get('prefecture', '')
        bear_type = src.get('bear_type', 'ツキノワグマ')
        city = pm_name[:50] if pm_name else pref
        title_base = pm_name or f"{pref}でクマ出没"

        placemarks.append({
            'name': pm_name,
            'desc': desc[:300],
            'lat': round(lat, 7),
            'lng': round(lng, 7),
            'date': date_str,
            'type': inc_type,
            'bear_type': bear_type,
            'prefecture': pref,
            'city': city,
            'title': title_base,
            'danger': parse_danger_level(inc_type, desc),
        })

    # 子コンテナ（Document, Folder）を再帰処理
    for child in el:
        tag = child.tag.split('}')[-1] if '}' in child.tag else child.tag
        if tag in ('Document', 'Folder'):
            process_container(child, local_year, placemarks, prefix, src)


def download_and_parse_kml(mid: str) -> ET.Element | None:
    """Google My Maps KMLをダウンロードして解析"""
    url = f"https://www.google.com/maps/d/kml?mid={mid}&forcekml=1"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            content = resp.read()
        return ET.fromstring(content)
    except Exception as e:
        print(f"  ダウンロードエラー ({mid}): {e}")
        return None


# ── メイン処理 ───────────────────────────────────────────────────────────────

def collect_kml(dry_run: bool = False) -> int:
    """全KMLソースを再ダウンロードして増分収集。追加件数を返す。"""
    print("=== KML 増分収集 ===")

    with open(DATA_FILE, encoding='utf-8') as f:
        bear_data: list[dict] = json.load(f)

    with open(CONFIG_FILE, encoding='utf-8') as f:
        config = json.load(f)

    # 既存IDセット
    existing_ids = {d['id'] for d in bear_data}

    # 既存の(lat,lng,date)セット（重複チェック）
    existing_triplets = {
        (round(d['lat'], 4), round(d['lng'], 4), d.get('date', ''))
        for d in bear_data
    }

    # ソース別の既存連番最大値
    max_seqs: dict[str, int] = {}
    for d in bear_data:
        pid = d.get('id', '')
        parts = pid.rsplit('-', 1)
        if len(parts) == 2 and parts[1].isdigit():
            prefix = parts[0]
            seq = int(parts[1])
            max_seqs[prefix] = max(max_seqs.get(prefix, -1), seq)

    new_records: list[dict] = []
    total_added = 0

    for src in config.get('kml', []):
        prefix = src['id_prefix']
        mid = src['mid']
        print(f"\n[{prefix}] mid={mid}")

        root = download_and_parse_kml(mid)
        if root is None:
            continue

        # KML全プレースマークを収集
        placemarks: list[dict] = []
        process_container(root, None, placemarks, prefix, src)
        print(f"  KMLから {len(placemarks)}件取得")

        seq = max_seqs.get(prefix, -1)
        source_new = 0

        for pm in placemarks:
            triplet = (round(pm['lat'], 4), round(pm['lng'], 4), pm['date'])
            if triplet in existing_triplets:
                continue

            seq += 1
            new_id = f"{prefix}-{seq:04d}"
            while new_id in existing_ids:
                seq += 1
                new_id = f"{prefix}-{seq:04d}"

            rec = {
                'id': new_id,
                'date': pm['date'],
                'prefecture': pm['prefecture'],
                'city': pm['city'],
                'type': pm['type'],
                'bear_type': pm['bear_type'],
                'title': pm['title'],
                'description': pm['desc'],
                'source_name': src.get('source_name', ''),
                'source_url': f"https://www.google.com/maps/d/viewer?mid={mid}",
                'danger_level': pm['danger'],
                'lat': pm['lat'],
                'lng': pm['lng'],
            }
            existing_ids.add(new_id)
            existing_triplets.add(triplet)
            new_records.append(rec)
            source_new += 1

        max_seqs[prefix] = seq
        print(f"  ➜ {source_new}件追加")
        total_added += source_new
        time.sleep(1.0)  # KMLダウンロード間の待機

    if new_records and not dry_run:
        bear_data.extend(new_records)
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
    added = collect_kml(dry_run=dry)
    sys.exit(0 if added >= 0 else 1)
