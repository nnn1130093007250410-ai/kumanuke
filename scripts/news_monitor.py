#!/usr/bin/env python3
"""
クマ関連ニュース自動監視・X投稿スクリプト

Google News RSS を定期チェックし、クマ人身被害・出没速報を検出したら
X に3ツイートのスレッドを自動投稿する。

実行タイミング（launchd: com.kumanuke.news-monitor）:
  毎日 06:00 / 09:00 / 12:00 / 15:00 / 18:00 / 21:00

スレッド構成:
  ツイート1: 見出し + 出典・時刻
  ツイート2: 記事本文から抽出した詳細
  ツイート3: 周辺住民への注意喚起（外出自粛）
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

# ── パス設定 ───────────────────────────────────────────────────────────────
SCRIPT_DIR   = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
POSTED_FILE  = SCRIPT_DIR / 'news_posted.json'
LOG_FILE     = SCRIPT_DIR / 'news_monitor.log'

# post_to_x から認証・投稿関数をインポート
sys.path.insert(0, str(SCRIPT_DIR))
from post_to_x import load_credentials, post_thread, tw_weight

JST = timezone(timedelta(hours=9))

# 当日（JST）に公開された記事のみ速報する

# ── 検索クエリ（Google News RSS） ───────────────────────────────────────────
SEARCH_QUERIES = [
    'クマ 人身被害',
    'クマ 死亡 襲撃',
    'ヒグマ 人身',
    'ツキノワグマ 被害',
    'クマ 重傷 搬送',
]

# ── 記事フィルタ ────────────────────────────────────────────────────────────
# タイトルにこれらのいずれかが含まれる記事のみ対象
REQUIRED_KEYWORDS = [
    '人身', '死亡', 'けが', '負傷', '重傷', '軽傷', '搬送',
    '噛ま', '咬', '襲われ', '襲撃', '臨時休校', '緊急出動',
    '出没警戒', '捕獲', '目撃',
]

# これらを含む記事は無視（誤検知防止）
EXCLUDE_KEYWORDS = [
    'くまモン', 'クマムシ', '映画', '株価', '株式',
    '為替', '相場', 'YouTube', 'ゲーム', 'アニメ',
    'ぬいぐるみ', 'キャラクター',
]

# 都道府県リスト（ハッシュタグ抽出用）
PREFECTURES = [
    '北海道', '青森', '岩手', '宮城', '秋田', '山形', '福島',
    '茨城', '栃木', '群馬', '埼玉', '千葉', '東京', '神奈川',
    '新潟', '富山', '石川', '福井', '山梨', '長野', '岐阜',
    '静岡', '愛知', '三重', '滋賀', '京都', '大阪', '兵庫',
    '奈良', '和歌山', '鳥取', '島根', '岡山', '広島', '山口',
    '徳島', '香川', '愛媛', '高知', '福岡', '佐賀', '長崎',
    '熊本', '大分', '宮崎', '鹿児島', '沖縄',
]

# ── ログ出力 ────────────────────────────────────────────────────────────────

def log(msg: str):
    ts = datetime.now(JST).strftime('%Y-%m-%d %H:%M:%S')
    line = f"[{ts}] {msg}"
    print(line)
    try:
        with open(LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(line + '\n')
    except Exception:
        pass

# ── 投稿済み管理 ────────────────────────────────────────────────────────────

def _article_id(title: str, source: str) -> str:
    """タイトル+出典のハッシュを記事IDとして使用"""
    key = f"{title.strip()}{source.strip()}"
    return hashlib.md5(key.encode('utf-8')).hexdigest()[:16]


def already_posted(article_id: str) -> bool:
    if not POSTED_FILE.exists():
        return False
    with open(POSTED_FILE, encoding='utf-8') as f:
        return article_id in json.load(f).get('ids', [])


def mark_posted(article_id: str):
    data = {'ids': []}
    if POSTED_FILE.exists():
        with open(POSTED_FILE, encoding='utf-8') as f:
            data = json.load(f)
    if article_id not in data['ids']:
        data['ids'].append(article_id)
        data['ids'] = data['ids'][-2000:]
    with open(POSTED_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# ── RSS フェッチ ────────────────────────────────────────────────────────────

def fetch_rss(query: str) -> list[dict]:
    """Google News RSS から記事リストを取得する"""
    q   = urllib.parse.quote(query)
    url = f'https://news.google.com/rss/search?q={q}&hl=ja&gl=JP&ceid=JP:ja'
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; KumanukeBearBot/1.0)',
            'Accept-Language': 'ja,en;q=0.9',
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            xml_data = resp.read()
        root = ET.fromstring(xml_data)
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

        raw_title = html_module.unescape(title_el.text or '')
        # Google News RSS のタイトルは「記事タイトル - 出典名」形式
        # 出典名を分離
        source_name = ''
        if source_el is not None and source_el.text:
            source_name = source_el.text.strip()
            headline = raw_title
            if raw_title.endswith(f' - {source_name}'):
                headline = raw_title[: -len(f' - {source_name}')]
        else:
            # " - " で分割して最後の要素を出典とみなす
            parts = raw_title.rsplit(' - ', 1)
            headline    = parts[0].strip()
            source_name = parts[1].strip() if len(parts) == 2 else ''

        # 記事URLを取得（textの次のsibling: link は text形式）
        link = ''
        if link_el is not None:
            link = (link_el.text or '').strip()
        if not link and source_el is not None:
            link = source_el.attrib.get('url', '')

        # 公開日時をパース
        pub_time = ''
        pub_dt   = None
        if pub_el is not None and pub_el.text:
            try:
                dt = datetime.strptime(pub_el.text.strip(), '%a, %d %b %Y %H:%M:%S %Z')
                pub_dt   = dt.replace(tzinfo=timezone.utc)
                dt_jst   = pub_dt.astimezone(JST)
                pub_time = dt_jst.strftime('%m/%d %H:%M')
            except Exception:
                pub_time = ''

        items.append({
            'headline':    headline,
            'source_name': source_name,
            'link':        link,
            'pub_time':    pub_time,
            'pub_dt':      pub_dt,   # 時間フィルター用
        })

    return items

# ── 時間フィルター ──────────────────────────────────────────────────────────

def is_recent_article(pub_dt) -> bool:
    """記事が今日（JST）に公開されたか確認。日時不明な記事は通す"""
    if pub_dt is None:
        return True
    today_jst = datetime.now(JST).date()
    pub_date_jst = pub_dt.astimezone(JST).date()
    return pub_date_jst == today_jst

# ── 同一インシデント重複検知 ────────────────────────────────────────────────

def incident_key(headline: str) -> str | None:
    """
    見出しから「本日 × 都道府県」のインシデントキーを生成。
    同日・同都道府県の記事を同一事件とみなして重複投稿を防ぐ。
    都道府県が特定できない場合は None を返す。
    """
    from datetime import date as _date
    today = _date.today().isoformat()
    for pref in PREFECTURES:
        if pref in headline:
            return f"incident_{today}_{pref}"
    return None

def already_posted_incident(key: str) -> bool:
    """同一インシデントがすでに投稿済みか確認"""
    if not POSTED_FILE.exists():
        return False
    with open(POSTED_FILE, encoding='utf-8') as f:
        return key in json.load(f).get('incidents', [])

def mark_incident_posted(key: str):
    """インシデントを投稿済みとして記録（直近1,000件を保持）"""
    data = {'ids': [], 'incidents': []}
    if POSTED_FILE.exists():
        with open(POSTED_FILE, encoding='utf-8') as f:
            data = json.load(f)
    if 'incidents' not in data:
        data['incidents'] = []
    if key not in data['incidents']:
        data['incidents'].append(key)
        data['incidents'] = data['incidents'][-1000:]
    with open(POSTED_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# ── 追跡・特集記事の検知（古い事件の記事を速報から除外） ──────────────────────

# これらを含む記事は「古い事件の追跡・特集記事」として除外する
STALE_INDICATORS = [
    # 経過時間の言及
    'から半年', 'から1ヶ月', 'から2ヶ月', 'から3ヶ月', 'から約',
    'ヶ月が経', '年が経', 'ヶ月後の', '年後の', '半年たった', '半年経った',
    # 事後の報告・分析
    '報告書', '再発防止策', '再発防止計画', '検証報告',
    # 特集・コラム記事
    '記者ノート', 'ルポ',
]

# 見出しに出てくる月（XX年MM月）の対応
_MONTH_RE = re.compile(r'(\d{2})年(\d{1,2})月')


def is_stale_article(headline: str) -> bool:
    """
    古い事件の追跡・特集記事かどうかを判定する。
    ① STALE_INDICATORS キーワードを含む
    ② 見出しに2ヶ月以上前の「XX年MM月」表記がある
    どちらかに該当すれば True（速報として除外）
    """
    # ① 明示的な追跡記事キーワード
    if any(kw in headline for kw in STALE_INDICATORS):
        return True

    # ② 見出しに "26年2月" などの古い年月が含まれているか
    from datetime import date as _date
    today = _date.today()
    for m in _MONTH_RE.finditer(headline):
        year_2d = int(m.group(1))   # e.g. 26
        month   = int(m.group(2))   # e.g. 2
        # 4桁年に変換（2000年代を前提）
        year_4d = 2000 + year_2d
        # 今日からの経過月数
        months_ago = (today.year - year_4d) * 12 + (today.month - month)
        if months_ago >= 1:
            return True

    return False

# ── 続報判定 ────────────────────────────────────────────────────────────────

# これらのキーワードを含む記事は同一インシデントでも続報として投稿する
# キーワードは「種別」として扱い、同種の続報は1事件1回のみ投稿
FOLLOWUP_KEYWORDS = [
    '捕獲', '射殺', '死亡', '重体', '重篤', '退院',
    '逃走中', '逃走', '発見', '続報', 'その後', '新たに',
    '再び', '緊急銃猟', '行方', '搬送先', '手術',
]

def is_followup(headline: str) -> bool:
    """続報・新展開キーワードを含む記事かどうか判定"""
    return any(kw in headline for kw in FOLLOWUP_KEYWORDS)

def followup_type_key(headline: str, inc_key: str) -> str:
    """
    続報の種別ごとの一意キー。
    同じ事件の同種続報（例：複数社が「捕獲成功」を報道）を1回に絞るために使用。
    """
    # 最初にマッチした最重要キーワードで種別を決定
    PRIORITY_KEYWORDS = ['死亡', '射殺', '捕獲', '重体', '重篤', '退院',
                         '逃走中', '逃走', '発見', '緊急銃猟', '手術']
    for kw in PRIORITY_KEYWORDS:
        if kw in headline:
            return f"{inc_key}_fu_{kw}"
    return f"{inc_key}_fu_general"

# ── フィルタリング ──────────────────────────────────────────────────────────

def is_bear_incident(headline: str) -> bool:
    """クマによる人身被害・重要出没記事かどうか判定"""
    # 除外ワードチェック
    for kw in EXCLUDE_KEYWORDS:
        if kw in headline:
            return False
    # 必須キーワードチェック
    for kw in REQUIRED_KEYWORDS:
        if kw in headline:
            return True
    return False

# ── 記事詳細のスクレイピング ────────────────────────────────────────────────

def _strip_html(html_text: str) -> str:
    """HTMLタグを除去してテキストを返す"""
    text = re.sub(r'<script[^>]*>.*?</script>', ' ', html_text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<style[^>]*>.*?</style>',  ' ', text,      flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = html_module.unescape(text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def fetch_article_detail(url: str, max_chars: int = 260) -> str | None:
    """
    記事URLにアクセスし、本文の冒頭を取得する。
    取得できない場合は None を返す。
    """
    if not url or url.startswith('https://news.google.com'):
        return None
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                          'AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/124.0 Safari/537.36',
            'Accept-Language': 'ja,en;q=0.9',
        })
        with urllib.request.urlopen(req, timeout=12) as resp:
            html_bytes = resp.read(300_000)  # 最大300KB
        charset = 'utf-8'
        try:
            content_type = resp.headers.get('Content-Type', '')
            m = re.search(r'charset=([^\s;]+)', content_type, re.IGNORECASE)
            if m:
                charset = m.group(1).replace('"', '').strip()
        except Exception:
            pass
        html_text = html_bytes.decode(charset, errors='replace')
    except Exception as e:
        log(f"  記事取得失敗 {url[:60]}…: {e}")
        return None

    # <p>タグの内容を抽出（メインコンテンツらしき段落）
    paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', html_text, re.DOTALL | re.IGNORECASE)
    sentences  = []
    for p in paragraphs:
        text = _strip_html(p).strip()
        # 短すぎる・ナビゲーション系・広告系の段落を除外
        if len(text) < 20:
            continue
        if re.search(r'(広告|cookie|プライバシー|著作権|copyright|JavaScript)', text, re.IGNORECASE):
            continue
        sentences.append(text)
        if sum(len(s) for s in sentences) >= max_chars * 2:
            break

    if not sentences:
        return None

    # クマ関連の文章を優先して抽出
    bear_sentences = [s for s in sentences if re.search(r'(クマ|ヒグマ|ツキノワ|熊)', s)]
    target = bear_sentences if bear_sentences else sentences

    # max_chars 以内に収める
    result = ''
    for s in target:
        candidate = (result + ('。' if result else '') + s).strip('。')
        if tw_weight(candidate) <= (max_chars * 2):  # 加重換算
            result = candidate
        else:
            # この段落を途中まで追加
            remaining = max_chars * 2 - tw_weight(result)
            if remaining > 20 and not result:
                result = s[:remaining // 2]
            break

    return result.strip() if result else None

# ── 都道府県ハッシュタグ ────────────────────────────────────────────────────

def extract_prefecture_tag(text: str) -> str:
    """テキストから都道府県を抽出してハッシュタグ文字列を返す"""
    for pref in PREFECTURES:
        if pref in text:
            # '北海道' → '北海道', '福島県' → '福島'
            tag = pref.replace('県', '').replace('都', '').replace('府', '')
            return f'#{tag}'
    return ''

# ── スレッド構築 ────────────────────────────────────────────────────────────

def build_news_thread(
    headline: str,
    detail: str | None,
    source_name: str,
    pub_time: str,
    pref_tag: str,
    is_followup: bool = False,
) -> list[str]:
    """ニュース速報（単発ツイート）"""

    label     = "🔄【続報】" if is_followup else "🐻⚠️【速報】"
    src_line  = f"出典：{source_name}（{pub_time}）" if pub_time else f"出典：{source_name}"
    pref_part = f" {pref_tag}".rstrip() if pref_tag else ""

    # クマ・熊・出没を本文に含めて検索ヒット率を上げる
    tweet = (
        f"{label}\n\n"
        f"{headline}\n\n"
        f"{src_line}\n"
        f"クマ（熊）出没・最新情報\n\n"
        f"#クマ出没 #熊出没 #クマ被害{pref_part}"
    )

    # 加重チェック・必要に応じてトリム
    w = tw_weight(tweet)
    if w > 280:
        excess = (w - 275) // 2
        short_headline = headline[:max(20, len(headline) - excess)] + '…'
        tweet = (
            f"{label}\n\n"
            f"{short_headline}\n\n"
            f"{src_line}\n\n"
            f"#クマ被害{pref_part}"
        )
        log(f"  ⚠ 見出しをトリム")

    return [tweet]

# ── メイン処理 ─────────────────────────────────────────────────────────────

def main():
    log("=== news_monitor 起動 ===")

    creds = load_credentials()
    if not creds:
        log("⚠ X API 認証情報が見つかりません")
        return

    # 直近3時間以内の記事のみ対象
    now_jst = datetime.now(JST)

    seen_ids  = set()   # 今回の実行内での重複除去
    posted    = 0

    for query in SEARCH_QUERIES:
        log(f"RSS取得: {query}")
        articles = fetch_rss(query)
        log(f"  取得件数: {len(articles)}件")
        time.sleep(3)

        for art in articles:
            headline    = art['headline']
            source_name = art['source_name']
            link        = art['link']
            pub_time    = art['pub_time']
            pub_dt      = art.get('pub_dt')

            # ① クマ人身被害・重要記事かどうか
            if not is_bear_incident(headline):
                continue

            # ② 古いニュースを除外（MAX_AGE_HOURS 時間以内のみ）
            if not is_recent_article(pub_dt):
                log(f"  スキップ（古いニュース {pub_time}）: {headline[:40]}")
                continue

            # ②-b 古い事件の追跡・特集記事を除外
            if is_stale_article(headline):
                log(f"  スキップ（追跡・特集記事）: {headline[:40]}")
                continue

            # ③ 記事単位の重複チェック（同じ記事が複数クエリでヒット）
            aid = _article_id(headline, source_name)
            if aid in seen_ids:
                continue
            if already_posted(aid):
                log(f"  スキップ（記事投稿済み）: {headline[:40]}")
                continue

            # ④ 同一インシデントの重複チェック
            inc_key = incident_key(headline)
            is_update = False   # 続報フラグ

            if inc_key and already_posted_incident(inc_key):
                if is_followup(headline):
                    # 続報の種別ごとにも重複チェック
                    # 例：「捕獲」続報は同一事件で1回のみ投稿
                    fu_key = followup_type_key(headline, inc_key)
                    if already_posted_incident(fu_key):
                        log(f"  スキップ（同種続報済み [{fu_key.split('_fu_')[-1]}]）: {headline[:40]}")
                        continue
                    log(f"  続報として投稿（{fu_key.split('_fu_')[-1]}）: {headline[:40]}")
                    is_update = True
                else:
                    log(f"  スキップ（重複 [{inc_key}]）: {headline[:40]}")
                    continue

            seen_ids.add(aid)
            log(f"  ✓ {'【続報】' if is_update else '新着速報'}: {headline[:60]}")

            # 記事詳細をスクレイピング
            detail   = None
            if link and not link.startswith('https://news.google.com'):
                log(f"  記事取得: {link[:60]}…")
                detail = fetch_article_detail(link)
                if detail:
                    log(f"  詳細取得成功（{len(detail)}字）")
                else:
                    log(f"  詳細取得失敗（フォールバック使用）")
            time.sleep(3)

            # ハッシュタグ
            pref_tag = extract_prefecture_tag(headline + (detail or ''))

            # スレッド構築（続報の場合はラベルを切り替え）
            tweets = build_news_thread(
                headline, detail, source_name, pub_time, pref_tag,
                is_followup=is_update,
            )

            # 投稿
            try:
                results = post_thread(tweets, creds)
                tid = results[0].get('data', {}).get('id', '')
                log(f"  ✅ 投稿完了 ({len(tweets)}ツイート) tweet_id={tid}")
                log(f"     URL: https://x.com/i/web/status/{tid}")
                mark_posted(aid)
                if inc_key:
                    mark_incident_posted(inc_key)   # 初報：事件キーを記録
                    if is_update:
                        # 続報：種別キーも記録（同種続報の重複を防止）
                        mark_incident_posted(followup_type_key(headline, inc_key))
                posted += 1
                time.sleep(60)   # 投稿間隔：最低1分
            except Exception as e:
                log(f"  ❌ 投稿エラー: {e}")

    log(f"=== 完了: {posted}件投稿 ===")


if __name__ == '__main__':
    main()
