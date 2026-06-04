#!/usr/bin/env python3
"""
逆ジオコーディング: city == prefecture のエントリに市町村名を付与する

戦略:
  外部APIに依存せず、既存データ（市町村名あり 103,000+件）を
  空間近傍検索で利用する。
  - city != prefecture のエントリから空間インデックスを構築
  - city == prefecture のエントリに対し、最近傍エントリの市町村名を割り当てる
  - 距離が20km以内の場合のみ採用
"""

import json
import math
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
DATA_FILE    = PROJECT_ROOT / 'public' / 'data' / 'bear-japan.json'


def haversine_km(lat1, lng1, lat2, lng2) -> float:
    """2点間の距離（km）を計算"""
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = (math.sin(dlat/2)**2
         + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2))
         * math.sin(dlng/2)**2)
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))


def extract_municipality(city_str: str) -> str:
    """
    長い住所文字列から市区町村レベルの名前だけを抽出する。
    例:
      "桐生市新里町板橋地内 交差点付近" → "桐生市"
      "高崎市倉渕町権田2236"           → "高崎市倉渕町"
      "仙台市太白区"                    → "仙台市太白区"
      "みなかみ町湯原"                  → "みなかみ町"
    """
    import re
    # 1. 政令指定都市の区（仙台市太白区など）
    m = re.match(r'^(.+?[市])(.*?[区])', city_str)
    if m:
        return m.group(1) + m.group(2).split('　')[0].split(' ')[0].split('地内')[0][:10]
    # 2. 市 で終わるパターン → 市まで
    m = re.match(r'^(.+?市)', city_str)
    if m:
        rest = city_str[m.end():]
        # "高崎市倉渕町" のように 市+町 はセットで保持
        m2 = re.match(r'^(.+?[町村])', rest)
        if m2 and len(m2.group(1)) <= 6:
            return m.group(1) + m2.group(1)
        return m.group(1)
    # 3. 町・村
    m = re.match(r'^(.+?[町村])', city_str)
    if m:
        return m.group(1)
    # 4. それ以外はそのまま（ただし20文字まで）
    return city_str[:20]


def make_title(prefecture: str, city: str, sighting_type: str) -> str:
    """市町村名を使ったタイトルを生成する"""
    type_map = {
        '人身被害': 'でクマによる人身被害',
        '目撃':     'でクマを目撃',
        '農業被害': 'でクマによる農業被害',
        '住宅侵入': 'にクマが侵入',
        '痕跡':     'でクマの痕跡を確認',
        '捕獲':     'でクマを捕獲',
    }
    suffix = type_map.get(sighting_type, 'でクマ出没')
    location = city if city and city != prefecture else prefecture
    return f"{location}{suffix}"


def main():
    print('=== 近傍検索による市町村名付与 ===')

    with open(DATA_FILE, encoding='utf-8') as f:
        data = json.load(f)

    # ── インデックス構築: 市町村名あり & 座標あり ──
    reference = [
        d for d in data
        if d.get('city') and d.get('city') != d.get('prefecture')
        and d.get('lat') and d.get('lng')
    ]
    print(f'参照データ（市町村名あり）: {len(reference):,}件')

    # 都道府県ごとにグループ化（同一都道府県内で検索を限定）
    ref_by_pref: dict[str, list] = {}
    for d in reference:
        p = d['prefecture']
        ref_by_pref.setdefault(p, []).append(d)

    # ── 処理対象: city == prefecture ──
    targets_idx = [
        i for i, d in enumerate(data)
        if d.get('city') == d.get('prefecture')
        and d.get('lat') and d.get('lng')
    ]
    print(f'処理対象: {len(targets_idx):,}件')

    MAX_DIST_KM = 20.0  # この距離以内の最近傍のみ採用

    updated = 0
    no_ref = 0
    too_far = 0

    for i in targets_idx:
        d     = data[i]
        pref  = d['prefecture']
        lat   = d['lat']
        lng   = d['lng']

        refs = ref_by_pref.get(pref, [])
        if not refs:
            no_ref += 1
            continue

        # 最近傍を探す
        best_city = None
        best_dist = float('inf')
        for r in refs:
            dist = haversine_km(lat, lng, r['lat'], r['lng'])
            if dist < best_dist:
                best_dist = dist
                best_city = r['city']

        if best_dist > MAX_DIST_KM:
            too_far += 1
            continue

        data[i]['city']  = best_city
        data[i]['title'] = make_title(pref, best_city, d.get('type', ''))
        updated += 1

    print(f'\n結果:')
    print(f'  更新成功: {updated:,}件')
    print(f'  参照データなし: {no_ref}件')
    print(f'  距離超過（>{MAX_DIST_KM}km）: {too_far}件')

    # サンプル表示
    sample_updated = [data[i] for i in targets_idx if data[i].get('city') != data[i].get('prefecture')][:8]
    print('\nサンプル（更新後）:')
    for d in sample_updated:
        print(f"  {d['prefecture']} → {d['city']} | {d['title']}")

    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)

    print('\n=== 完了 ===')


if __name__ == '__main__':
    main()
