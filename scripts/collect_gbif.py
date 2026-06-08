#!/usr/bin/env python3
"""
GBIF（Global Biodiversity Information Facility）からクマ科の出現記録を取得する。

対象：世界のクマ8種（座標あり・日本除く）
出力：public/data/bear-gbif.json
API：https://api.gbif.org/v1/occurrence/search（無料・認証不要）
"""

import json
import time
import urllib.request
import urllib.parse
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
OUTPUT_FILE  = PROJECT_ROOT / 'public' / 'data' / 'bear-gbif.json'

HEADERS = {'User-Agent': 'KumanukeBearBot/1.0 (kumanuke@bubuworks.co.jp)'}

# クマ科8種の GBIF taxon key と表示名
BEAR_SPECIES = [
    {'taxonKey': 2433407, 'bear_type': 'American black bear', 'bear_type_ja': 'アメリカクロクマ'},
    {'taxonKey': 2433433, 'bear_type': 'Brown bear',          'bear_type_ja': 'ヒグマ'},
    {'taxonKey': 2433451, 'bear_type': 'Polar bear',          'bear_type_ja': 'ホッキョクグマ'},
    {'taxonKey': 9335699, 'bear_type': 'Asian black bear',    'bear_type_ja': 'ツキノワグマ'},
    {'taxonKey': 2433449, 'bear_type': 'Sun bear',            'bear_type_ja': 'マレーグマ'},
    {'taxonKey': 2433453, 'bear_type': 'Sloth bear',          'bear_type_ja': 'ナマケグマ'},
    {'taxonKey': 2433452, 'bear_type': 'Spectacled bear',     'bear_type_ja': 'メガネグマ'},
    {'taxonKey': 5219243, 'bear_type': 'Giant panda',         'bear_type_ja': 'ジャイアントパンダ'},
]

# 国コード → 日本語国名
COUNTRY_JA: dict[str, str] = {
    'US': 'アメリカ', 'CA': 'カナダ', 'RU': 'ロシア', 'CN': '中国',
    'IN': 'インド',   'MY': 'マレーシア', 'ID': 'インドネシア',
    'TH': 'タイ', 'MM': 'ミャンマー', 'VN': 'ベトナム',
    'PK': 'パキスタン', 'NP': 'ネパール', 'BT': 'ブータン',
    'KR': '韓国', 'TW': '台湾',
    'RO': 'ルーマニア', 'SE': 'スウェーデン', 'FI': 'フィンランド',
    'NO': 'ノルウェー', 'SK': 'スロバキア', 'SI': 'スロベニア',
    'HR': 'クロアチア', 'PL': 'ポーランド', 'CZ': 'チェコ',
    'DE': 'ドイツ',  'FR': 'フランス',   'IT': 'イタリア',
    'ES': 'スペイン', 'GR': 'ギリシャ', 'BG': 'ブルガリア',
    'MX': 'メキシコ', 'PE': 'ペルー', 'CO': 'コロンビア',
    'EC': 'エクアドル', 'BO': 'ボリビア', 'VE': 'ベネズエラ',
    'GL': 'グリーンランド',
}

# 信頼性の高い根拠のみ採用
ACCEPTED_BASIS = {
    'HUMAN_OBSERVATION',
    'MACHINE_OBSERVATION',
    'OBSERVATION',
    'PRESERVED_SPECIMEN',
    'MATERIAL_SAMPLE',
}


def fetch_occurrences(taxon_key: int, limit_per_species: int = 30000) -> list[dict]:
    """GBIF から1種分の出現記録を取得する（日本除く）"""
    records = []
    page_size = 300
    offset = 0

    while offset < limit_per_species:
        # GBIF: basisOfRecord は複数値を個別パラメータで指定
        params = urllib.parse.urlencode([
            ('taxonKey',      taxon_key),
            ('hasCoordinate', 'true'),
            ('limit',         page_size),
            ('offset',        offset),
        ])
        url = f'https://api.gbif.org/v1/occurrence/search?{params}'
        # 429レート制限に対してリトライ
        retry = 0
        data = None
        while retry < 5:
            try:
                req = urllib.request.Request(url, headers=HEADERS)
                with urllib.request.urlopen(req, timeout=20) as resp:
                    data = json.loads(resp.read())
                break
            except urllib.error.HTTPError as e:
                if e.code == 429:
                    wait = 30 * (retry + 1)
                    print(f"    レート制限 (429) → {wait}秒待機...")
                    time.sleep(wait)
                    retry += 1
                else:
                    print(f"    HTTPエラー offset={offset}: {e}")
                    break
            except Exception as e:
                print(f"    エラー offset={offset}: {e}")
                time.sleep(5)
                break
        if data is None:
            break

        results = data.get('results', [])
        if not results:
            break

        for r in results:
            lat = r.get('decimalLatitude')
            lng = r.get('decimalLongitude')
            if lat is None or lng is None:
                continue
            if not (-90 <= lat <= 90 and -180 <= lng <= 180):
                continue

            basis = r.get('basisOfRecord', '')
            if basis not in ACCEPTED_BASIS:
                continue

            country_code = r.get('countryCode', '') or r.get('country', '')

            # GADM から市区町村レベルの地名を取得
            gadm = r.get('gadm') or {}
            level2 = (gadm.get('level2') or {}).get('name', '') or ''
            level3 = (gadm.get('level3') or {}).get('name', '') or ''
            municipality = level3 or level2

            # 写真URL（最初のStillImage）
            media = r.get('media') or []
            photo_url = ''
            for m in media:
                if isinstance(m, dict) and m.get('type') == 'StillImage' and m.get('references'):
                    photo_url = m['references']
                    break

            records.append({
                'gbif_key':    r.get('key'),
                'country_code': country_code,
                'country_ja':  COUNTRY_JA.get(country_code, country_code),
                'region':      r.get('stateProvince', '') or '',
                'municipality': municipality,
                'locality':    (r.get('verbatimLocality', '') or '').strip(),
                'date':        (r.get('eventDate') or '')[:10],
                'lat':         round(float(lat), 6),
                'lng':         round(float(lng), 6),
                'basis':       basis,
                'remarks':     (r.get('occurrenceRemarks', '') or '').strip(),
                'dataset':     r.get('datasetName', '') or r.get('institutionCode', '') or '',
                'obs_url':     r.get('references', '') or r.get('occurrenceID', '') or '',
                'photo_url':   photo_url,
            })

        print(f"    offset={offset}: {len(results)}件取得 / 累計{len(records)}件")

        if data.get('endOfRecords', False) or len(results) < page_size:
            break

        offset += page_size
        time.sleep(1.5)   # GBIF レートリミット対策（1.5秒/リクエスト）

    return records


def main():
    print('=== GBIF クマ出現記録 取得開始 ===\n')

    # 既存データを引き継ぐ（続きから取得）
    if OUTPUT_FILE.exists() and OUTPUT_FILE.stat().st_size > 10:
        existing = json.loads(OUTPUT_FILE.read_text(encoding='utf-8'))
        all_records: list[dict] = existing
        seen_keys: set = {r.get('id','') for r in existing}
        print(f"既存データ引き継ぎ: {len(all_records):,}件\n")
    else:
        all_records: list[dict] = []
        seen_keys: set = set()

    for sp in BEAR_SPECIES:
        taxon_key   = sp['taxonKey']
        bear_type   = sp['bear_type']
        bear_type_ja = sp['bear_type_ja']
        print(f'[{bear_type_ja}] taxonKey={taxon_key} 取得中...')

        records = fetch_occurrences(taxon_key)

        added = 0
        for r in records:
            key = r.get('gbif_key')
            if key and key in seen_keys:
                continue
            if key:
                seen_keys.add(key)

            # 最終レコード形式に変換（リッチフィールド追加）
            all_records.append({
                'id':           f"gbif-{key or len(all_records)}",
                'bear_type':    bear_type,
                'bear_type_ja': bear_type_ja,
                'country_code': r['country_code'],
                'country_ja':   r['country_ja'],
                'region':       r['region'],
                'municipality': r.get('municipality', ''),
                'locality':     r.get('locality', ''),
                'date':         r['date'] or '2000-01-01',
                'lat':          r['lat'],
                'lng':          r['lng'],
                'basis':        r['basis'],
                'remarks':      r.get('remarks', ''),
                'dataset':      r.get('dataset', ''),
                'source_name':  r.get('dataset', '') or 'GBIF',
                'source_url':   r.get('obs_url', '') or f"https://www.gbif.org/occurrence/{key}" if key else 'https://www.gbif.org',
                'photo_url':    r.get('photo_url', ''),
            })
            added += 1

        print(f'  → {added:,}件追加 / 総計{len(all_records):,}件\n')

        # 種ごとに中間保存＆push（長時間実行でも途中結果をデプロイ）
        if added > 0:
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                json.dump(all_records, f, ensure_ascii=False)
            _push(all_records, bear_type_ja)

    print(f'✅ 完了: {len(all_records):,}件')


def _push(records: list[dict], label: str = ''):
    """中間保存後にgit push（種ごとに呼ばれる）"""
    import subprocess, datetime
    today = datetime.date.today().isoformat()
    try:
        subprocess.run(['git', '-C', str(PROJECT_ROOT), 'add', str(OUTPUT_FILE)],
                       check=True, capture_output=True)
        msg = f'🌍 GBIF取得: {len(records):,}件 {label} ({today})'
        subprocess.run(
            ['git', '-C', str(PROJECT_ROOT),
             '-c', 'user.name=kumanuke-bot',
             '-c', 'user.email=bot@kumanuke.jp',
             'commit', '-m', msg],
            check=True, capture_output=True)
        subprocess.run(['git', '-C', str(PROJECT_ROOT), 'push', 'origin', 'main'],
                       check=True, capture_output=True)
        print(f'  ✅ push完了: {msg[:50]}')
    except subprocess.CalledProcessError as e:
        print(f'⚠ git push スキップ（変更なし or エラー）: {e}')

    # 国別統計
    from collections import Counter
    country_counts = Counter(r['country_ja'] for r in all_records)
    print('\n【国別トップ10】')
    for country, cnt in country_counts.most_common(10):
        print(f'  {country}: {cnt:,}件')


if __name__ == '__main__':
    main()
