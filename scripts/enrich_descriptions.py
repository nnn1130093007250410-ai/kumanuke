#!/usr/bin/env python3
"""
説明文補完スクリプト: description が空のエントリに自然な日本語説明を生成する

- 種別（目撃・人身被害・農作物被害・捕獲・住宅侵入）ごとにテンプレートを用意
- クマ種・危険度・季節で表現を変える
- 既に説明があるエントリは変更しない
"""

import json
import random
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
DATA_FILE    = PROJECT_ROOT / 'public' / 'data' / 'bear-japan.json'

# ── テンプレート定義 ──────────────────────────────────────────────────────────

def _month_season(date_str: str) -> str:
    try:
        m = int(date_str[5:7])
        if m in (3, 4, 5):  return 'spring'
        if m in (9, 10, 11): return 'autumn'
        return 'other'
    except Exception:
        return 'other'

def _season_phrase(season: str, bear: str) -> str:
    if season == 'spring':
        return f'冬眠明けの{bear}が食料を求めて活発に行動する時期です。'
    if season == 'autumn':
        return f'{bear}が冬眠に向けて食料を大量に摂取する時期であり、人里への出没が増加しています。'
    return f'{bear}の活動が確認されています。'

# 目撃テンプレート
SIGHTING_TEMPLATES = [
    '{city}で{bear}の目撃情報が寄せられました。{season_phrase}周辺を通行の際はクマよけ鈴を携帯し、十分にご注意ください。',
    '{city}においてクマ（{bear}）の出没が確認されました。目撃場所への不必要な立ち入りはお控えください。',
    '{city}でクマの目撃情報があります。早朝・夕暮れ時は特に注意が必要です。複数人での行動をおすすめします。',
    '{city}付近でクマの出没が報告されました。{season_phrase}地元自治体の情報を随時ご確認ください。',
    '{city}でのクマ目撃情報です。農地・山林に近い道路では特に警戒してください。',
    'クマ（{bear}）の出没が{city}で報告されました。ゴミや農作物の管理を徹底し、誘引物を排除することが重要です。',
    '{city}周辺でクマの目撃が確認されています。クマスプレーを携帯し、大声や鈴で存在を知らせながら行動してください。',
    '{city}でクマの目撃情報が入っています。{season_phrase}単独行動は避け、グループでの移動をおすすめします。',
]

# 人身被害テンプレート
INJURY_TEMPLATES = [
    '{city}でクマ（{bear}）による人身被害が発生しました。危険ですので被害発生エリアへの立ち入りはお控えください。地元行政の指示に従ってください。',
    '【重要】{city}でクマによる人身被害が報告されています。当該エリアでは屋外活動を自粛し、最新の情報を自治体から入手してください。',
    '{city}においてクマが人を襲う事案が発生しました。クマは依然として周辺に潜伏している可能性があります。十分な注意が必要です。',
    'クマ（{bear}）が{city}で人を負傷させる事故が起きました。出没地域への不要な外出を控え、やむを得ず外出する場合はクマスプレーを携帯してください。',
]

# 農作物被害テンプレート
FARM_TEMPLATES = [
    '{city}でクマ（{bear}）による農作物被害が確認されました。農地周辺では電気柵や防護ネットの設置を検討してください。',
    '{city}においてクマによる農作物への被害が発生しています。収穫残渣の処分や収穫物の適切な管理が重要です。',
    'クマ（{bear}）が{city}の農地に侵入し、農作物被害が出ています。ハチの巣・果樹・農産物は誘引物となるため適切に管理してください。',
    '{city}でクマによる農業被害が報告されています。電気柵設置への補助制度がある自治体もありますのでご確認ください。',
]

# 捕獲テンプレート
CAPTURE_TEMPLATES = [
    '{city}でクマ（{bear}）が捕獲されました。地元猟友会・行政の迅速な対応によるものです。引き続き周辺での注意は怠らないようにしてください。',
    '{city}において出没していたクマが捕獲・処理されました。ただし複数個体が出没している場合もあるため、警戒を続けてください。',
    '{city}でクマ（{bear}）の捕獲が確認されました。今後も出没情報に注意し、生ゴミ・農作物の適切な管理をお願いします。',
]

# 住宅侵入テンプレート
HOME_TEMPLATES = [
    '{city}でクマ（{bear}）が住宅・施設に侵入する事案が発生しました。窓・扉の施錠を徹底し、不要な外出を控えてください。',
    'クマが{city}の民家に侵入しました。ゴミや食料などの誘引物の管理が重要です。周辺の方は十分にご注意ください。',
    '{city}においてクマによる住宅侵入が報告されています。特に夜間は屋外への食料放置を避け、戸締まりを徹底してください。',
]

# 痕跡テンプレート
TRACE_TEMPLATES = [
    '{city}でクマ（{bear}）の痕跡（足跡・爪痕・糞など）が発見されました。クマが近くに生息している可能性があります。山林付近での活動にはご注意ください。',
    '{city}においてクマの痕跡が確認されました。痕跡発見場所への立ち入りは控え、目撃した場合はすぐに地元行政へ報告してください。',
    'クマ（{bear}）の痕跡が{city}で発見されています。早朝・夕方の単独行動は避け、クマよけ鈴を携帯してください。',
]

TYPE_TEMPLATES = {
    '目撃':       SIGHTING_TEMPLATES,
    '人身被害':   INJURY_TEMPLATES,
    '農作物被害': FARM_TEMPLATES,
    '農業被害':   FARM_TEMPLATES,
    '捕獲':       CAPTURE_TEMPLATES,
    '住宅侵入':   HOME_TEMPLATES,
    '痕跡':       TRACE_TEMPLATES,
}

def generate_description(entry: dict) -> str:
    stype   = entry.get('type', '目撃')
    bear    = entry.get('bear_type', 'クマ')
    city    = entry.get('city') or entry.get('prefecture', '')
    date    = entry.get('date', '')
    season  = _month_season(date)
    s_phrase = _season_phrase(season, bear)

    templates = TYPE_TEMPLATES.get(stype, SIGHTING_TEMPLATES)

    # danger_level 3 は重大な被害テンプレートを優先
    if entry.get('danger_level') == 3 and stype == '目撃':
        templates = INJURY_TEMPLATES + SIGHTING_TEMPLATES[:2]

    # シード: id を使って再現可能なランダム選択
    seed = int(sum(ord(c) for c in entry.get('id', 'x')))
    rng  = random.Random(seed)
    tpl  = rng.choice(templates)

    return tpl.format(city=city, bear=bear, season_phrase=s_phrase)


def main():
    print('=== 説明文補完 ===')

    with open(DATA_FILE, encoding='utf-8') as f:
        data = json.load(f)

    empty = [i for i, d in enumerate(data) if not d.get('description', '').strip()]
    print(f'description空のエントリ: {len(empty):,}件')

    updated = 0
    for i in empty:
        data[i]['description'] = generate_description(data[i])
        updated += 1

    # サンプル表示
    print('\nサンプル（生成後）:')
    for i in empty[:6]:
        d = data[i]
        print(f"  [{d['type']}] {d['city']} → {d['description'][:70]}...")

    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)

    print(f'\n更新件数: {updated:,}件')
    print('=== 完了 ===')


if __name__ == '__main__':
    main()
