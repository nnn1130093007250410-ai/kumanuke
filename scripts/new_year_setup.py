#!/usr/bin/env python3
"""
年次セットアップスクリプト
新しい年に入ったとき、bear-incident-news-{YEAR}/page.tsx の雛形を自動生成する。

実行タイミング: launchd で毎年1月1日 09:00 JST に自動実行
手動実行:       python scripts/new_year_setup.py [--year YYYY]
"""

import json
import re
import sys
from datetime import date
from pathlib import Path

SCRIPT_DIR   = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
GUIDE_DIR    = PROJECT_ROOT / 'src' / 'app' / 'guide'


def find_latest_news_page() -> tuple[int, Path] | tuple[None, None]:
    """既存の bear-incident-news-YYYY ディレクトリの最新年を返す"""
    max_year = None
    max_path = None
    for p in GUIDE_DIR.iterdir():
        m = re.match(r'bear-incident-news-(\d{4})$', p.name)
        if m and p.is_dir():
            y = int(m.group(1))
            if max_year is None or y > max_year:
                max_year = y
                max_path = p
    return max_year, max_path


def generate_new_year_page(prev_year: int, new_year: int, template_path: Path) -> str:
    """前年ページを基に新年の雛形を生成する"""
    template = template_path.read_text(encoding='utf-8')
    prev = str(prev_year)
    curr = str(new_year)
    # 和暦 (令和)
    prev_reiwa = prev_year - 2018
    curr_reiwa = new_year  - 2018

    result = template

    # ── URL・スラッグ置換 ──────────────────────────────────────────────
    result = result.replace(
        f'bear-incident-news-{prev}',
        f'bear-incident-news-{curr}',
    )

    # ── 西暦年の置換（本文・タイトル）─────────────────────────────────
    # 例: '2026年' → '2027年'  (全置換)
    result = result.replace(f'{prev}年', f'{curr}年')
    # 例: '2026/' → '2027/'
    result = result.replace(f'{prev}/', f'{curr}/')

    # ── 令和年号 ──────────────────────────────────────────────────────
    result = result.replace(f'令和{prev_reiwa}年', f'令和{curr_reiwa}年')
    result = result.replace(f'R{prev_reiwa}', f'R{curr_reiwa}')

    # ── 件数リセット（実データが入るまでのプレースホルダー）───────────
    # 統計ボックスの件数を 0 に（update_stats.py が後で上書き）
    result = re.sub(
        r"(label: '[\d]{4}年収録件数', value: ')[\d,]+(件',)",
        r"\g<1>0件',",
        result,
    )
    # KUMANUKEのデータ（XX,XXX件収録・YYYY年N月時点）
    result = re.sub(
        r'KUMANUKEのデータ（[\d,]+件収録・\d{4}年\d+月時点）',
        f'KUMANUKEのデータ（収録中・{curr}年1月時点）',
        result,
    )

    # ── 更新日表示 ─────────────────────────────────────────────────────
    result = re.sub(
        r'\d{4}年\d{1,2}月更新',
        f'{curr}年1月更新',
        result,
    )

    # ── ページ関数名 ───────────────────────────────────────────────────
    result = result.replace(
        f'BearIncidentNews{prev}Page',
        f'BearIncidentNews{curr}Page',
    )

    # ── H1 タイトルを新年向けに調整 ───────────────────────────────────
    result = result.replace(
        f'{prev}年春のクマ出没動向',
        f'{curr}年のクマ出没動向',
    )

    return result


def setup_new_year(target_year: int | None = None) -> bool:
    """新年ページを生成する。既に存在する場合はスキップ。"""
    current_year = target_year or date.today().year

    # 対象ページが既に存在するかチェック
    target_dir = GUIDE_DIR / f'bear-incident-news-{current_year}'
    if target_dir.exists():
        print(f"✓ bear-incident-news-{current_year} は既に存在します（スキップ）")
        return False

    # テンプレートとなる前年ページを探す
    prev_year, prev_path = find_latest_news_page()
    if prev_year is None or prev_path is None:
        print("⚠ テンプレートとなる前年ページが見つかりません")
        return False

    template_file = prev_path / 'page.tsx'
    if not template_file.exists():
        print(f"⚠ テンプレートファイルが見つかりません: {template_file}")
        return False

    print(f"=== {current_year}年ページ自動生成 ===")
    print(f"  テンプレート: bear-incident-news-{prev_year}/page.tsx")

    # 生成
    new_content = generate_new_year_page(prev_year, current_year, template_file)

    # 新しいディレクトリとファイルを作成
    target_dir.mkdir(parents=True, exist_ok=True)
    new_file = target_dir / 'page.tsx'
    new_file.write_text(new_content, encoding='utf-8')

    print(f"✓ {target_dir.relative_to(PROJECT_ROOT)} を作成しました")
    print("  → 内容を確認・編集後、git commit してください")
    print("  → update_stats.py が件数を自動更新します")

    # ── ガイド一覧ページへのリンク追加アドバイス ─────────────────────
    print(f"\n📌 TODO: src/app/guide/page.tsx に以下のリンクを追加してください:")
    print(f"   /guide/bear-incident-news-{current_year}")

    # 生成レポートを JSON に保存
    report = {
        'generated_date': date.today().isoformat(),
        'new_year': current_year,
        'template_year': prev_year,
        'file': str(new_file.relative_to(PROJECT_ROOT)),
    }
    report_file = SCRIPT_DIR / 'new_year_report.json'
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    return True


if __name__ == '__main__':
    # --year YYYY で年を指定可能（テスト用）
    year = None
    if '--year' in sys.argv:
        idx = sys.argv.index('--year')
        try:
            year = int(sys.argv[idx + 1])
        except (IndexError, ValueError):
            print("使い方: python new_year_setup.py --year 2027")
            sys.exit(1)

    created = setup_new_year(year)
    sys.exit(0)
