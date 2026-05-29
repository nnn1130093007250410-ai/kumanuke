#!/usr/bin/env python3
"""
環境省クマ関連文書の新着チェック
https://www.env.go.jp/nature/choju/effort/effort12/ を監視して
新しいPDF・お知らせを検出し、ログに記録する。

新着があれば scripts/env_new_docs.json に書き出す。
（内容確認後、data/page.tsx を手動更新してください）
"""

import json
import re
import time
import urllib.request
import urllib.parse
from datetime import date
from html.parser import HTMLParser
from pathlib import Path

SCRIPT_DIR   = Path(__file__).parent
KNOWN_FILE   = SCRIPT_DIR / 'env_known_docs.json'
NEW_FILE     = SCRIPT_DIR / 'env_new_docs.json'

TARGET_URLS = [
    'https://www.env.go.jp/nature/choju/effort/effort12/effort12.html',
]
HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; KumanukeBearBot/1.0)'}

BEAR_KEYWORDS = [
    'クマ', '熊', 'ヒグマ', 'ツキノワ', '人身被害', '出没',
    '捕獲', '緊急銃猟', '鳥獣', '被害防止',
]


# ── HTML パーサー ─────────────────────────────────────────────────────────────

class LinkExtractor(HTMLParser):
    """ページ内のリンク（href）とそのテキストを収集する"""

    def __init__(self, base_url: str):
        super().__init__()
        self.base_url = base_url
        self.links: list[dict] = []
        self._current_text = ''
        self._in_a = False

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            attrs_dict = dict(attrs)
            href = attrs_dict.get('href', '')
            if href:
                full_url = urllib.parse.urljoin(self.base_url, href)
                self._current_href = full_url
                self._current_text = ''
                self._in_a = True

    def handle_endtag(self, tag):
        if tag == 'a' and self._in_a:
            self.links.append({
                'url': self._current_href,
                'text': self._current_text.strip(),
            })
            self._in_a = False

    def handle_data(self, data):
        if self._in_a:
            self._current_text += data


# ── フェッチ ─────────────────────────────────────────────────────────────────

def fetch_links(url: str) -> list[dict]:
    """ページからリンク一覧を取得"""
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=20) as resp:
            html = resp.read().decode('utf-8', errors='replace')
    except Exception as e:
        print(f"  フェッチエラー ({url}): {e}")
        return []

    parser = LinkExtractor(url)
    parser.feed(html)
    return parser.links


def is_bear_related(text: str, url: str) -> bool:
    """クマ関連のリンクか判定"""
    combined = (text + ' ' + url).lower()
    # PDF or HTML リンクのみ対象
    if not any(combined.endswith(ext) for ext in ('.pdf', '.html', '.htm', '/')):
        if '?' not in combined and '#' not in combined:
            return False
    return any(kw in text or kw.lower() in url for kw in BEAR_KEYWORDS)


# ── メイン処理 ───────────────────────────────────────────────────────────────

def check_env_docs() -> list[dict]:
    """新着文書を確認して返す"""
    print("=== 環境省文書 新着チェック ===")

    # 既知文書リストを読み込み
    if KNOWN_FILE.exists():
        with open(KNOWN_FILE, encoding='utf-8') as f:
            known: list[dict] = json.load(f)
    else:
        known = []
    known_urls = {d['url'] for d in known}

    all_links: list[dict] = []
    for url in TARGET_URLS:
        print(f"  チェック中: {url}")
        links = fetch_links(url)
        # クマ関連リンクに絞る
        bear_links = [
            {**lk, 'source_url': url, 'found_date': date.today().isoformat()}
            for lk in links
            if is_bear_related(lk['text'], lk['url'])
        ]
        all_links.extend(bear_links)
        print(f"  → {len(bear_links)}件のクマ関連リンクを発見")
        time.sleep(0.5)

    # 重複除去
    seen = set()
    unique_links = []
    for lk in all_links:
        if lk['url'] not in seen:
            seen.add(lk['url'])
            unique_links.append(lk)

    # 新着のみ抽出
    new_links = [lk for lk in unique_links if lk['url'] not in known_urls]

    print(f"\n発見: 全{len(unique_links)}件 → 新着{len(new_links)}件")

    if new_links:
        # 新着をファイルに書き出し
        with open(NEW_FILE, 'w', encoding='utf-8') as f:
            json.dump(new_links, f, ensure_ascii=False, indent=2)
        print(f"⚠ 新着文書を {NEW_FILE.name} に保存しました")
        print("  → data/page.tsx を確認・手動更新してください")
        for lk in new_links:
            print(f"  📄 {lk['text'][:60]}")
            print(f"     {lk['url']}")
    else:
        print("✓ 新着文書なし")

    # 既知リストを更新（新着を追加）
    all_known = known + [
        lk for lk in new_links if lk['url'] not in known_urls
    ]
    with open(KNOWN_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_known, f, ensure_ascii=False, indent=2)

    return new_links


if __name__ == '__main__':
    new = check_env_docs()
    import sys
    # 新着があれば exit code 2（run_weekly.sh で検知可能）
    sys.exit(2 if new else 0)
