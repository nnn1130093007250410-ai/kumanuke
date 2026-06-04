#!/usr/bin/env python3
"""
世界のクマ関連ニュース自動監視・X投稿スクリプト

Google News RSS（英語）を定期チェックし、世界のクマ速報を検出したら
X に2ツイートのスレッドで自動投稿する。

実行タイミング（launchd: com.kumanuke.news-monitor-world）:
  毎日 07:30 / 13:30 / 19:30 の3回（日本版とずらして投稿）

スレッド構成:
  ツイート1: 🌍【世界速報】見出し + 出典・時刻
  ツイート2: 詳細（日本語要約） + ハッシュタグ
"""

import hashlib
import html as html_module
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from pathlib import Path

SCRIPT_DIR   = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
POSTED_FILE  = SCRIPT_DIR / 'news_world_posted.json'
LOG_FILE     = SCRIPT_DIR / 'news_monitor_world.log'

sys.path.insert(0, str(SCRIPT_DIR))
from post_to_x import load_credentials, post_thread, tw_weight

JST = timezone(timedelta(hours=9))
MAX_AGE_HOURS = 12   # 世界ニュースは12時間以内（時差考慮）

# ── 英語 Google News 検索クエリ ──────────────────────────────────────────────
SEARCH_QUERIES = [
    'grizzly bear attack',
    'brown bear attack fatal',
    'bear kills hiker',
    'black bear attack mauled',
    'polar bear attack',
    'bear attack injury park',
]

# 関連キーワード（いずれかを含む記事のみ対象）
REQUIRED_KEYWORDS_EN = [
    'attack', 'mauled', 'maul', 'kill', 'kills', 'killed', 'fatal',
    'injure', 'injured', 'injures', 'mauling', 'charges', 'charged',
    'death', 'dead', 'victim', 'hospital',
]

# 除外キーワード（コンテキスト外の記事を排除）
EXCLUDE_KEYWORDS_EN = [
    'teddy bear', 'care bear', 'chicago bears', 'bear market',
    'stock', 'crypto', 'nfl', 'nba', 'movie', 'film', 'show',
    'chicago', 'bear grylls',
]

# ── 国名マッピング（英語 → 日本語 + ハッシュタグ）─────────────────────────────
COUNTRY_MAP: dict[str, dict] = {
    'united states': {'name': 'アメリカ',          'tag': '#アメリカ'},
    'usa':           {'name': 'アメリカ',          'tag': '#アメリカ'},
    'u.s.':          {'name': 'アメリカ',          'tag': '#アメリカ'},
    'alaska':        {'name': 'アラスカ（米国）',  'tag': '#アメリカ'},
    'yellowstone':   {'name': 'イエローストーン（米国）', 'tag': '#アメリカ'},
    'glacier':       {'name': 'グレイシャーNP（米国）',  'tag': '#アメリカ'},
    'grand teton':   {'name': 'グランドティトン（米国）', 'tag': '#アメリカ'},
    'montana':       {'name': 'モンタナ（米国）',  'tag': '#アメリカ'},
    'wyoming':       {'name': 'ワイオミング（米国）', 'tag': '#アメリカ'},
    'colorado':      {'name': 'コロラド（米国）',  'tag': '#アメリカ'},
    'california':    {'name': 'カリフォルニア（米国）', 'tag': '#アメリカ'},
    'florida':       {'name': 'フロリダ（米国）',  'tag': '#アメリカ'},
    'canada':        {'name': 'カナダ',            'tag': '#カナダ'},
    'british columbia': {'name': 'BC州（カナダ）', 'tag': '#カナダ'},
    'alberta':       {'name': 'アルバータ（カナダ）', 'tag': '#カナダ'},
    'ontario':       {'name': 'オンタリオ（カナダ）', 'tag': '#カナダ'},
    'romania':       {'name': 'ルーマニア',        'tag': '#ルーマニア'},
    'russia':        {'name': 'ロシア',            'tag': '#ロシア'},
    'finland':       {'name': 'フィンランド',      'tag': '#フィンランド'},
    'sweden':        {'name': 'スウェーデン',      'tag': '#スウェーデン'},
    'norway':        {'name': 'ノルウェー',        'tag': '#ノルウェー'},
    'slovakia':      {'name': 'スロバキア',        'tag': '#スロバキア'},
    'slovenia':      {'name': 'スロベニア',        'tag': '#スロベニア'},
    'croatia':       {'name': 'クロアチア',        'tag': '#クロアチア'},
    'india':         {'name': 'インド',            'tag': '#インド'},
    'china':         {'name': '中国',              'tag': '#中国'},
    'pakistan':      {'name': 'パキスタン',        'tag': '#パキスタン'},
    'malaysia':      {'name': 'マレーシア',        'tag': '#マレーシア'},
    'indonesia':     {'name': 'インドネシア',      'tag': '#インドネシア'},
}

# ── 熊種マッピング ─────────────────────────────────────────────────────────────
BEAR_TYPE_MAP: dict[str, str] = {
    'grizzly':      'グリズリー',
    'brown bear':   'ヒグマ',
    'black bear':   'クロクマ',
    'polar bear':   'ホッキョクグマ',
    'sun bear':     'サンベア',
    'sloth bear':   'ナマケグマ',
    'panda':        'ジャイアントパンダ',
    'spectacled':   'メガネグマ',
}

# ── 事件種別マッピング ──────────────────────────────────────────────────────────
EVENT_MAP: dict[str, dict] = {
    'kills':    {'label': '死亡事故',  'level': 3},
    'killed':   {'label': '死亡事故',  'level': 3},
    'fatal':    {'label': '死亡事故',  'level': 3},
    'dead':     {'label': '死亡事故',  'level': 3},
    'death':    {'label': '死亡事故',  'level': 3},
    'mauls':    {'label': '人身被害',  'level': 3},
    'mauled':   {'label': '人身被害',  'level': 3},
    'mauling':  {'label': '人身被害',  'level': 3},
    'injures':  {'label': '人身被害',  'level': 2},
    'injured':  {'label': '人身被害',  'level': 2},
    'attack':   {'label': '人身被害',  'level': 2},
    'attacks':  {'label': '人身被害',  'level': 2},
    'charges':  {'label': '接近・威嚇', 'level': 1},
    'sighted':  {'label': '目撃',      'level': 1},
    'spotted':  {'label': '目撃',      'level': 1},
}


# ── ログ ───────────────────────────────────────────────────────────────────────

def log(msg: str):
    ts = datetime.now(JST).strftime('%Y-%m-%d %H:%M:%S')
    line = f"[{ts}] {msg}"
    print(line)
    try:
        with open(LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(line + '\n')
    except Exception:
        pass


# ── 投稿済み管理 ────────────────────────────────────────────────────────────────

def _article_id(title: str, source: str) -> str:
    return hashlib.md5(f"{title.strip()}{source.strip()}".encode()).hexdigest()[:16]

def already_posted(aid: str) -> bool:
    if not POSTED_FILE.exists():
        return False
    with open(POSTED_FILE, encoding='utf-8') as f:
        return aid in json.load(f).get('ids', [])

def mark_posted(aid: str):
    data = {'ids': []}
    if POSTED_FILE.exists():
        with open(POSTED_FILE, encoding='utf-8') as f:
            data = json.load(f)
    if aid not in data['ids']:
        data['ids'].append(aid)
        data['ids'] = data['ids'][-2000:]
    with open(POSTED_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# ── 時間フィルター ─────────────────────────────────────────────────────────────

def is_recent(pub_dt, max_hours: int = MAX_AGE_HOURS) -> bool:
    if pub_dt is None:
        return True
    now = datetime.now(timezone.utc)
    return (now - pub_dt).total_seconds() / 3600 <= max_hours


# ── RSS フェッチ ───────────────────────────────────────────────────────────────

def fetch_rss(query: str) -> list[dict]:
    q   = urllib.parse.quote(query)
    url = f'https://news.google.com/rss/search?q={q}&hl=en-US&gl=US&ceid=US:en'
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; KumanukeBearBot/1.0)',
            'Accept-Language': 'en-US,en;q=0.9',
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            root = ET.fromstring(resp.read())
    except Exception as e:
        log(f"RSS取得エラー [{query}]: {e}")
        return []

    items = []
    for item in root.findall('.//item'):
        title_el  = item.find('title')
        link_el   = item.find('link')
        pub_el    = item.find('pubDate')
        source_el = item.find('source')
        if title_el is None:
            continue

        raw = html_module.unescape(title_el.text or '')
        source_name = source_el.text.strip() if source_el is not None and source_el.text else ''
        headline = raw[:-len(f' - {source_name}')].strip() if source_name and raw.endswith(f' - {source_name}') else raw

        link = (link_el.text or '').strip() if link_el is not None else ''

        pub_dt   = None
        pub_time = ''
        if pub_el is not None and pub_el.text:
            try:
                dt = datetime.strptime(pub_el.text.strip(), '%a, %d %b %Y %H:%M:%S %Z')
                pub_dt   = dt.replace(tzinfo=timezone.utc)
                dt_jst   = pub_dt.astimezone(JST)
                pub_time = dt_jst.strftime('%m/%d %H:%M')
            except Exception:
                pass

        items.append({'headline': headline, 'source_name': source_name,
                      'link': link, 'pub_time': pub_time, 'pub_dt': pub_dt})
    return items


# ── フィルタリング ─────────────────────────────────────────────────────────────

def is_bear_incident_en(headline: str) -> bool:
    hl = headline.lower()
    for kw in EXCLUDE_KEYWORDS_EN:
        if kw in hl:
            return False
    return any(kw in hl for kw in REQUIRED_KEYWORDS_EN)


# ── 情報抽出 ───────────────────────────────────────────────────────────────────

def extract_country(headline: str) -> dict | None:
    hl = headline.lower()
    for key, val in COUNTRY_MAP.items():
        if key in hl:
            return val
    return None

def extract_bear_type(headline: str) -> str:
    hl = headline.lower()
    for key, val in BEAR_TYPE_MAP.items():
        if key in hl:
            return val
    return 'クマ'

def extract_event(headline: str) -> dict:
    hl = headline.lower()
    for key, val in EVENT_MAP.items():
        if key in hl:
            return val
    return {'label': '出没・被害', 'level': 1}


# ── 記事本文スクレイピング ───────────────────────────────────────────────────────

def _strip_html(html_text: str) -> str:
    text = re.sub(r'<script[^>]*>.*?</script>', ' ', html_text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<style[^>]*>.*?</style>',  ' ', text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = html_module.unescape(text)
    return re.sub(r'\s+', ' ', text).strip()

def fetch_detail_en(url: str, max_chars: int = 240) -> str | None:
    if not url or url.startswith('https://news.google.com'):
        return None
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; KumanukeBearBot/1.0)',
            'Accept-Language': 'en-US,en;q=0.9',
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
            html_bytes = resp.read(300_000)
        html_text = html_bytes.decode('utf-8', errors='replace')
    except Exception:
        return None

    paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', html_text, re.DOTALL | re.IGNORECASE)
    sentences  = []
    for p in paragraphs:
        text = _strip_html(p).strip()
        if len(text) < 30:
            continue
        if re.search(r'(cookie|privacy|copyright|javascript|subscribe)', text, re.IGNORECASE):
            continue
        if re.search(r'(bear|attack|grizzly|hiker|mauled|killed|injured)', text, re.IGNORECASE):
            sentences.append(text)
        if sum(len(s) for s in sentences) >= max_chars * 3:
            break

    if not sentences:
        return None

    result = ''
    for s in sentences[:3]:
        candidate = (result + ' ' + s).strip()
        if len(candidate) <= max_chars:
            result = candidate
        else:
            break
    return result.strip() or None


# ── スレッド構築 ───────────────────────────────────────────────────────────────

def build_world_thread(
    headline: str,
    detail_en: str | None,
    source_name: str,
    pub_time: str,
    country_info: dict | None,
    bear_type_ja: str,
    event_info: dict,
) -> list[str]:

    country_name = country_info['name'] if country_info else '海外'
    country_tag  = country_info['tag']  if country_info else ''
    event_label  = event_info['label']
    level        = event_info['level']

    level_icons = {3: '🔴', 2: '🟠', 1: '🟡'}
    icon = level_icons.get(level, '🟡')

    src_line = f"出典：{source_name}（{pub_time}）" if pub_time else f"出典：{source_name}"

    # ツイート1：見出し
    t1 = (
        f"🌍{icon}【世界速報】{country_name} {event_label}\n\n"
        f"{headline}\n\n"
        f"{src_line}↓"
    )

    # ツイート2：詳細（英語原文 + 日本語コンテキスト）
    if detail_en and len(detail_en) > 30:
        detail_part = detail_en[:220] + ('…' if len(detail_en) > 220 else '')
    else:
        detail_part = (
            f"{country_name}で{bear_type_ja}による{event_label}が報告されました。"
            f"現地当局が対応中。詳細はリンク先報道をご確認ください。"
        )

    hashtags = f"#世界のクマ {country_tag}".strip()
    t2 = (
        f"【詳細】\n\n{detail_part}\n\n"
        f"🌍 世界のクマ情報：プロフ欄リンクから\n\n"
        f"{hashtags}"
    )

    # 加重チェック・調整
    tweets = [t1, t2]
    for i, t in enumerate(tweets):
        w = tw_weight(t)
        if w > 280:
            log(f"  ⚠ ツイート{i+1}が加重オーバー ({w}): 自動トリム")
            if i == 1:
                excess = (w - 275) // 2
                tweets[i] = t2.replace(detail_part, detail_part[:max(30, len(detail_part) - excess)] + '…')

    return tweets


# ── メイン処理 ─────────────────────────────────────────────────────────────────

def main():
    log("=== news_monitor_world 起動 ===")

    creds = load_credentials()
    if not creds:
        log("⚠ X API 認証情報が見つかりません")
        return

    seen_ids = set()
    posted   = 0

    for query in SEARCH_QUERIES:
        log(f"RSS取得（英語）: {query}")
        articles = fetch_rss(query)
        log(f"  取得件数: {len(articles)}件")
        time.sleep(2)

        for art in articles:
            headline    = art['headline']
            source_name = art['source_name']
            link        = art['link']
            pub_time    = art['pub_time']
            pub_dt      = art.get('pub_dt')

            # フィルタリング
            if not is_bear_incident_en(headline):
                continue
            if not is_recent(pub_dt):
                log(f"  スキップ（古い記事 {pub_time}）: {headline[:40]}")
                continue

            aid = _article_id(headline, source_name)
            if aid in seen_ids or already_posted(aid):
                continue
            seen_ids.add(aid)

            # 情報抽出
            country_info = extract_country(headline)
            bear_type_ja = extract_bear_type(headline)
            event_info   = extract_event(headline)

            # 低重要度（目撃のみ）はスキップ（投稿数を絞る）
            if event_info['level'] < 2:
                log(f"  スキップ（低重要度: {event_info['label']}）: {headline[:40]}")
                continue

            log(f"  ✓ 世界速報: [{country_info['name'] if country_info else '海外'}] {headline[:50]}")

            # 記事詳細取得
            detail_en = None
            if link and not link.startswith('https://news.google.com'):
                detail_en = fetch_detail_en(link)
                time.sleep(2)

            # スレッド構築・投稿
            tweets = build_world_thread(
                headline, detail_en, source_name, pub_time,
                country_info, bear_type_ja, event_info,
            )

            try:
                results = post_thread(tweets, creds)
                tid = results[0].get('data', {}).get('id', '')
                log(f"  ✅ 投稿完了 tweet_id={tid}")
                log(f"     URL: https://x.com/i/web/status/{tid}")
                mark_posted(aid)
                posted += 1
                time.sleep(60)   # 投稿間隔：最低1分
            except Exception as e:
                log(f"  ❌ 投稿エラー: {e}")

    log(f"=== 完了: {posted}件投稿 ===")


if __name__ == '__main__':
    main()
