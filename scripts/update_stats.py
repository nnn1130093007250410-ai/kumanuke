#!/usr/bin/env python3
"""
統計自動更新スクリプト
bear-japan.json から都道府県別件数・年別件数を再計算し、
関連するTSXファイルのハードコード数値を自動更新する。

更新対象ファイル:
  - src/app/page.tsx (metadata件数)
  - src/app/guide/japan-regional-bear-data/page.tsx (ランキング件数・順位)
  - src/app/guide/bear-incident-news-2026/page.tsx (2026年件数・総件数)
"""

import json
import re
import sys
from collections import Counter
from datetime import date, datetime
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_FILE = PROJECT_ROOT / "public" / "data" / "bear-japan.json"
LOG_FILE  = PROJECT_ROOT / "public" / "data" / "update-log.json"


def compute_stats(data: list[dict]) -> dict:
    """主要統計を計算"""
    total = len(data)
    pref_counts = Counter(d.get('prefecture', '') for d in data if d.get('prefecture'))
    top10 = pref_counts.most_common(10)

    year_counts: dict[str, int] = {}
    for d in data:
        y = d.get('date', '')[:4]
        if y.isdigit():
            year_counts[y] = year_counts.get(y, 0) + 1

    current_year = str(date.today().year)
    this_year_count = year_counts.get(current_year, 0)

    pref_year_counts: dict[tuple, int] = Counter()
    for d in data:
        p = d.get('prefecture', '')
        y = d.get('date', '')[:4]
        if p and y.isdigit():
            pref_year_counts[(p, y)] += 1

    return {
        'total': total,
        'top10': top10,
        'this_year': this_year_count,
        'current_year': current_year,
        'year_counts': year_counts,
        'pref_year_counts': dict(pref_year_counts),
        'pref_counts': dict(pref_counts),
    }


def fmt(n: int) -> str:
    """数字をカンマ区切りに"""
    return f"{n:,}"


def fmt_k(n: int) -> str:
    """千件単位の概算（例: 110692 → '110,000'）"""
    return f"{(n // 1000) * 1000:,}"


def current_month() -> int:
    return date.today().month


def update_update_log(stats: dict) -> bool:
    """public/data/update-log.json に今回の実行結果を追記する"""
    today = date.today().isoformat()
    current_total = stats['total']

    # 既存ログを読み込む
    try:
        with open(LOG_FILE, encoding='utf-8') as f:
            log: list[dict] = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        log = []

    # 直前エントリの合計から増加件数を算出
    prev_total = 0
    for entry in reversed(log):
        if 'total' in entry:
            prev_total = entry['total']
            break

    added = max(0, current_total - prev_total)

    # 当日エントリが既にあれば上書き、なければ追加
    new_entry = {
        'date': today,
        'total': current_total,
        'added': added,
        'year': stats['current_year'],
        'year_count': stats['this_year'],
        'top_prefecture': stats['top10'][0][0] if stats['top10'] else '',
        'note': f"自動週次更新: {stats['current_year']}年{stats['this_year']:,}件 / 全{current_total:,}件",
    }

    if log and log[-1].get('date') == today:
        # 同日の再実行はエントリを更新
        log[-1].update(new_entry)
        action = '更新'
    else:
        log.append(new_entry)
        action = '追記'

    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(log, f, ensure_ascii=False, indent=2)

    print(f"  ✓ update-log.json {action} (追加{added:,}件 / 総計{current_total:,}件)")
    return added > 0


def update_all_stats() -> None:
    print("=== 統計更新 ===")

    with open(DATA_FILE, encoding='utf-8') as f:
        data = json.load(f)

    stats = compute_stats(data)
    total = stats['total']
    top10 = stats['top10']
    this_year = stats['this_year']
    cy = stats['current_year']
    mo = current_month()

    total_str = fmt(total)        # 例: '110,692'
    total_k = fmt_k(total)        # 例: '110,000'
    this_year_str = fmt(this_year)

    print(f"総件数: {total_str}")
    print(f"{cy}年件数: {this_year_str}")
    print("Top10:", [(p, fmt(c)) for p, c in top10])

    changed_files = []

    # ──────────────────────────────────────────────────────────────────
    # 1. src/app/page.tsx (metadata)
    # ──────────────────────────────────────────────────────────────────
    page_file = PROJECT_ROOT / "src" / "app" / "page.tsx"
    if page_file.exists():
        content = page_file.read_text(encoding='utf-8')
        nc = content
        # 例: '全国110,000件+のデータ'
        nc = re.sub(r'全国[\d,]+件\+のデータ', f'全国{total_k}件+のデータ', nc)
        # 例: '全国110,000件超の出没データ' / '全国110,000件超'
        nc = re.sub(r'全国[\d,]+件超', f'全国{total_k}件超', nc)
        if nc != content:
            page_file.write_text(nc, encoding='utf-8')
            changed_files.append('page.tsx')
            print("  ✓ page.tsx 更新")
        else:
            print("  - page.tsx 変更なし")

    # ──────────────────────────────────────────────────────────────────
    # 2. japan-regional-bear-data/page.tsx
    # ──────────────────────────────────────────────────────────────────
    regional_file = (
        PROJECT_ROOT / "src" / "app" / "guide" / "japan-regional-bear-data" / "page.tsx"
    )
    if regional_file.exists():
        content = regional_file.read_text(encoding='utf-8')
        nc = content

        # metadata / H1 の件数: '110,000件のデータが語ること'
        nc = re.sub(r'[\d,]+件のデータが語ること', f'{total_k}件のデータが語ること', nc)
        # metadata description: '110,000件超のデータ'
        nc = re.sub(r'[\d,]+件超のデータ', f'{total_k}件超のデータ', nc)
        nc = re.sub(r'[\d,]+件超', f'{total_k}件超', nc)
        # 本文中の 'XX,XXX件（2026年N月時点）'
        nc = re.sub(
            r'[\d,]+件（\d{4}年\d+月時点）',
            f'{total_str}件（{cy}年{mo}月時点）',
            nc
        )

        # ランキング件数・順位を更新（各都道府県の count: 'XX,XXX' と rank: N を更新）
        top10_dict = {pref: (rank, count) for rank, (pref, count) in enumerate(top10, 1)}
        # 現在のランキング行を解析して更新
        def replace_rank_row(m: re.Match) -> str:
            row = m.group(0)
            # 都道府県名を取得
            pref_m = re.search(r"pref: '([^']+)'", row)
            if not pref_m:
                return row
            pref = pref_m.group(1)
            if pref not in top10_dict:
                return row
            new_rank, new_count = top10_dict[pref]
            # rank: N を更新
            row = re.sub(r'rank: \d+', f'rank: {new_rank}', row)
            # count: 'XX,XXX' を更新
            row = re.sub(r"count: '[\d,]+'", f"count: '{fmt(new_count)}'", row)
            return row

        nc = re.sub(
            r'\{\s*rank: \d+, pref: \'[^\']+\'.*?\}',
            replace_rank_row,
            nc,
            flags=re.DOTALL
        )

        if nc != content:
            regional_file.write_text(nc, encoding='utf-8')
            changed_files.append('japan-regional-bear-data/page.tsx')
            print("  ✓ japan-regional-bear-data/page.tsx 更新")
        else:
            print("  - japan-regional-bear-data/page.tsx 変更なし")

    # ──────────────────────────────────────────────────────────────────
    # 3. bear-incident-news-2026/page.tsx
    # ──────────────────────────────────────────────────────────────────
    news_file = (
        PROJECT_ROOT / "src" / "app" / "guide" / "bear-incident-news-2026" / "page.tsx"
    )
    if news_file.exists():
        content = news_file.read_text(encoding='utf-8')
        nc = content

        # リード文: 'KUMANUKEのデータ（XX,XXX件収録・YYYY年N月時点）'
        nc = re.sub(
            r'KUMANUKEのデータ（[\d,]+件収録・\d{4}年\d+月時点）',
            f'KUMANUKEのデータ（{total_str}件収録・{cy}年{mo}月時点）',
            nc
        )

        # 統計ボックス '2026年収録件数': value: 'X,XXX件'
        nc = re.sub(
            r"(label: '2026年収録件数', value: ')[\d,]+(件',)",
            rf"\g<1>{this_year_str}件',",
            nc
        )

        # 山形県の件数: '2025年の出没急増（X,XXX件収録）'
        yamagata_total = fmt(stats['pref_counts'].get('山形県', 0))
        nc = re.sub(
            r'(2025年の出没急増（)[\d,]+(件収録）)',
            rf'\g<1>{yamagata_total}\g<2>',
            nc
        )

        # 関連リンクラベル: '｜XX,XXX件のデータが語ること'
        nc = re.sub(
            r'(japan-regional-bear-data.*?｜)[\d,]+件のデータ',
            rf'\g<1>{total_k}件のデータ',
            nc
        )

        if nc != content:
            news_file.write_text(nc, encoding='utf-8')
            changed_files.append('bear-incident-news-2026/page.tsx')
            print("  ✓ bear-incident-news-2026/page.tsx 更新")
        else:
            print("  - bear-incident-news-2026/page.tsx 変更なし")

    # ──────────────────────────────────────────────────────────────────
    # 4. update-log.json
    # ──────────────────────────────────────────────────────────────────
    update_update_log(stats)

    # ──────────────────────────────────────────────────────────────────
    # 完了サマリー
    # ──────────────────────────────────────────────────────────────────
    print(f"\n=== 統計更新完了 ({len(changed_files)}ファイル変更) ===")
    for f in changed_files:
        print(f"  - {f}")


if __name__ == '__main__':
    update_all_stats()
