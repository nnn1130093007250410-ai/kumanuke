#!/usr/bin/env python3
"""
X（Twitter）自動投稿スクリプト - 改修版

投稿スケジュール（launchd: com.kumanuke.x-post が月・水・金 07:00 に起動）:
  月曜 07:00 → 週次データサマリー（ランキング形式）+ 人身被害速報チェック
  水曜 07:00 → 教育・豆知識コンテンツ         + 人身被害速報チェック
  金曜 07:00 → 都道府県フォーカス              + 人身被害速報チェック
  3/1 07:00  → 春シーズン開始告知
  9/1 07:00  → 秋シーズン開始告知

URL 方針:
  本文に URL を直書きするとインプレッションが 30〜50% 低下するため
  URL は原則プロフィールに置き「プロフィールのリンクから」と案内。
  シーズン告知など特別投稿のみ SHORT_URL を使用。

ハッシュタグ:
  最大 2 個まで。多いとスパム扱いでインプレッションが落ちる。

認証情報の設定:
  scripts/x_credentials.json に保存:
  {
    "api_key": "...",
    "api_secret": "...",
    "access_token": "...",
    "access_token_secret": "..."
  }
  または環境変数 X_API_KEY / X_API_SECRET / X_ACCESS_TOKEN / X_ACCESS_TOKEN_SECRET で設定
"""

import base64
import hashlib
import hmac
import json
import os
import time
import urllib.parse
import urllib.request
from datetime import date, timedelta
from pathlib import Path

SCRIPT_DIR   = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_FILE    = PROJECT_ROOT / "public" / "data" / "bear-japan.json"
LOG_FILE     = PROJECT_ROOT / "public" / "data" / "update-log.json"
CRED_FILE    = SCRIPT_DIR / "x_credentials.json"
POSTED_FILE  = SCRIPT_DIR / "x_posted.json"

# 短縮URL（URLを本文に入れる場合のみ使用）
SITE_URL = 'https://tinyurl.com/22xplgns'   # kumanuke.bubuworks.co.jp
MAP_URL  = 'https://tinyurl.com/23w2n4xj'   # kumanuke.bubuworks.co.jp/map

# ── 教育コンテンツ（週番号でローテーション）────────────────────────────────
BEAR_FACTS = [
    {
        "body": (
            "🐻 知っていましたか？\n\n"
            "クマは冬眠前に1日20時間食べ続ける時期があります。\n\n"
            "どんぐりが凶作の年は山の食料が不足し\n"
            "人里に降りてくる確率が大幅に上がります。\n\n"
            "秋の出没急増の主な原因がこれです⚠️\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 日本に生息する2種類のクマ\n\n"
            "🔵 ヒグマ：北海道のみ。体重200〜400kg。\n"
            "⚫ ツキノワグマ：本州・四国。体重50〜150kg。\n\n"
            "本州の出没の99%はツキノワグマですが\n"
            "木登りが得意で住宅街にも現れます。\n\n"
            "どちらも遭遇したら静かに後退してください\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 クマが最も活発な時間帯は？\n\n"
            "早朝（日の出前後）と夕暮れ時が\n"
            "最も出没しやすい時間帯です。\n\n"
            "KUMANUKEのデータでも\n"
            "早朝・夕方の目撃情報が全体の60%以上を占めます。\n\n"
            "登山・キャンプでの朝夕の行動には特に注意を⚠️\n\n"
            "#クマ対策"
        ),
    },
    {
        "body": (
            "🐻 クマの嗅覚は犬の7倍\n\n"
            "食べ物の臭いを数km先から感知します。\n\n"
            "農地・住宅地への侵入を防ぐ基本：\n"
            "✅ 生ゴミは前夜に出さない\n"
            "✅ 収穫残渣をすぐに片付ける\n"
            "✅ 果樹の落果をその日のうちに処理\n\n"
            "臭いを管理するだけで大幅に防げます\n\n"
            "#クマ対策"
        ),
    },
    {
        "body": (
            "🐻 クマ鈴は本当に効果があるのか？\n\n"
            "有効です。ただし条件があります：\n\n"
            "⚠️ 川沿い・風下・密藪では音が届きにくい\n"
            "⚠️ 止めると無音になる（常に鳴らし続けること）\n"
            "⚠️ 大声で話す方が効果的という研究も\n\n"
            "「鈴をつけているから安全」は過信です\n\n"
            "#クマ対策 #登山"
        ),
    },
    {
        "body": (
            "📊 クマ出没がピークになる月は？\n\n"
            "KUMANUKEのデータ（11万件超）による集計：\n\n"
            "🔴 10月：年間の約23%が集中（最多）\n"
            "🟠 11月：約14%\n"
            "🟡  9月：約10%\n\n"
            "9〜11月の3ヶ月で年間の約47%が発生。\n"
            "秋こそ最大の警戒シーズンです\n\n"
            "#クマ出没"
        ),
    },
    {
        "body": (
            "⚠️ 最も危険なクマの状況は？\n\n"
            "子グマを連れた母グマです。\n\n"
            "母グマは子どもを守るため\n"
            "攻撃性が通常の数倍〜十数倍に高まります。\n\n"
            "「小さいクマがいる = 近くに母グマがいる」\n\n"
            "可愛くても絶対に近づかないでください🚫\n\n"
            "#クマ対策"
        ),
    },
    {
        "body": (
            "🐻 農業被害でもっとも多いのは？\n\n"
            "KUMANUKEのデータでは\n"
            "農業被害（トウモロコシ・スイカ・蜂蜜など）が\n"
            "出没情報全体の約30%を占めます。\n\n"
            "電気柵の設置は農業被害を最大90%削減するという\n"
            "研究結果があります。\n\n"
            "農業をされている方はぜひご検討を⚡\n\n"
            "#クマ対策 #農業"
        ),
    },
    {
        "body": (
            "🐻 クマは一度成功すると繰り返す\n\n"
            "ゴミ箱を漁って食料を得たクマは\n"
            "同じ場所に何度も戻ってきます。\n\n"
            "「習慣化」したクマは駆除対象になることが多い。\n\n"
            "クマに餌を与えない環境を作ることが\n"
            "クマと人間の共存への第一歩です\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "📊 日本のクマの個体数は？\n\n"
            "推定個体数：\n"
            "⚫ ツキノワグマ：約4〜5万頭（本州・四国）\n"
            "🔵 ヒグマ：約1万頭（北海道）\n\n"
            "20年前と比べ生息域が拡大。\n"
            "これが出没件数増加の大きな背景のひとつです。\n\n"
            "「駆除か共存か」の議論が全国で続いています\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 冬眠しないクマがいる\n\n"
            "「穴持たず」と呼ばれる冬眠しないクマが\n"
            "稀に存在します。\n\n"
            "原因：食料が豊富すぎた / 体重が不十分 / 老齢など\n\n"
            "真冬でも出没情報が届く理由のひとつ。\n"
            "KUMANUKEでは1〜2月の出没も記録しています。\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 クマの走る速さは？\n\n"
            "時速50〜60km。\n"
            "これは短距離走の世界記録（約37km/h）を上回ります。\n\n"
            "「逃げれば大丈夫」は通用しません。\n\n"
            "遭遇した時の鉄則：\n"
            "✅ 静かにゆっくり後退する\n"
            "✅ 目を合わせ続ける\n"
            "✅ 背中を向けて走らない\n\n"
            "#クマ対策"
        ),
    },
]


# ── 認証情報の読み込み ────────────────────────────────────────────────────────

def load_credentials():
    """環境変数 → x_credentials.json の順で認証情報を取得"""
    env = {
        'api_key':             os.getenv('X_API_KEY', ''),
        'api_secret':          os.getenv('X_API_SECRET', ''),
        'access_token':        os.getenv('X_ACCESS_TOKEN', ''),
        'access_token_secret': os.getenv('X_ACCESS_TOKEN_SECRET', ''),
    }
    if all(env.values()):
        return env
    if CRED_FILE.exists():
        with open(CRED_FILE, encoding='utf-8') as f:
            return json.load(f)
    return None


# ── OAuth 1.0a 署名 ───────────────────────────────────────────────────────────

def _percent_encode(s):
    return urllib.parse.quote(str(s), safe='')


def _build_oauth_header(method, url, params, creds):
    ts    = str(int(time.time()))
    nonce = base64.b64encode(os.urandom(16)).decode().replace('=', '').replace('+', '').replace('/', '')

    oauth_params = {
        'oauth_consumer_key':     creds['api_key'],
        'oauth_nonce':            nonce,
        'oauth_signature_method': 'HMAC-SHA1',
        'oauth_timestamp':        ts,
        'oauth_token':            creds['access_token'],
        'oauth_version':          '1.0',
    }

    all_params    = {**params, **oauth_params}
    sorted_params = '&'.join(
        f"{_percent_encode(k)}={_percent_encode(v)}"
        for k, v in sorted(all_params.items())
    )
    base_string  = '&'.join([method.upper(), _percent_encode(url), _percent_encode(sorted_params)])
    signing_key  = f"{_percent_encode(creds['api_secret'])}&{_percent_encode(creds['access_token_secret'])}"
    signature    = base64.b64encode(
        hmac.new(signing_key.encode(), base_string.encode(), hashlib.sha1).digest()
    ).decode()

    oauth_params['oauth_signature'] = signature
    header_parts = ', '.join(
        f'{_percent_encode(k)}="{_percent_encode(v)}"'
        for k, v in sorted(oauth_params.items())
    )
    return f'OAuth {header_parts}'


def post_tweet(text, creds):
    """X API v2 でツイートを投稿"""
    url  = 'https://api.twitter.com/2/tweets'
    body = json.dumps({'text': text}).encode('utf-8')
    auth = _build_oauth_header('POST', url, {}, creds)
    req  = urllib.request.Request(
        url, data=body,
        headers={
            'Authorization': auth,
            'Content-Type':  'application/json',
            'User-Agent':    'KumanukeBearBot/1.0',
        },
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode('utf-8'))


# ── データ取得ヘルパー ────────────────────────────────────────────────────────

def load_data():
    with open(DATA_FILE, encoding='utf-8') as f:
        return json.load(f)


def get_top_prefectures(data, n=3, since_days=7):
    """直近 since_days 日間の都道府県別出没件数ランキング"""
    cutoff = (date.today() - timedelta(days=since_days)).isoformat()
    counts = {}
    for d in data:
        if d.get('date', '') >= cutoff:
            p = d.get('prefecture', '')
            if p:
                counts[p] = counts.get(p, 0) + 1
    return sorted(counts.items(), key=lambda x: x[1], reverse=True)[:n]


def get_new_injury_records(since_days=8):
    """直近 since_days 日以内の新着人身被害レコードを返す"""
    data   = load_data()
    cutoff = (date.today() - timedelta(days=since_days)).isoformat()
    return sorted(
        [d for d in data if d.get('type') in ('人身被害', '人身') and d.get('date', '') >= cutoff],
        key=lambda x: x.get('date', ''),
        reverse=True,
    )


def already_posted(key):
    """投稿済みかチェック"""
    if not POSTED_FILE.exists():
        return False
    with open(POSTED_FILE, encoding='utf-8') as f:
        return key in json.load(f).get('ids', [])


def mark_posted(key):
    """投稿済みに記録"""
    posted = {'ids': []}
    if POSTED_FILE.exists():
        with open(POSTED_FILE, encoding='utf-8') as f:
            posted = json.load(f)
    if key not in posted['ids']:
        posted['ids'].append(key)
        posted['ids'] = posted['ids'][-1000:]
    with open(POSTED_FILE, 'w', encoding='utf-8') as f:
        json.dump(posted, f, ensure_ascii=False, indent=2)


# ── 投稿テンプレート ──────────────────────────────────────────────────────────

def build_injury_alert_tweet(record):
    """人身被害速報（URL なし・地域ハッシュタグ付き）"""
    pref     = record.get('prefecture', '')
    city     = record.get('city', '')
    dt       = record.get('date', '')
    title    = (record.get('title') or '')[:40]
    pref_tag = pref.replace('県', '').replace('道', '').replace('府', '').replace('都', '')

    try:
        y, m, d_str = dt.split('-')
        dt_fmt = f"{int(m)}月{int(d_str)}日"
    except Exception:
        dt_fmt = dt

    lines = [
        "🐻⚠️【速報】クマによる人身被害",
        "",
        f"■ 場所：{pref} {city}",
        f"■ 日時：{dt_fmt}",
        f"■ 概要：{title}",
        "",
        "🔴 外出時は十分ご注意ください",
        "🔴 ゴミは前夜に出さない",
        "🔴 遭遇時は静かに後退",
        "",
        "最新出没リストはプロフィールのリンクから",
        "",
        f"#クマ被害 #{pref_tag}",
    ]
    return '\n'.join(lines)


def build_weekly_summary_tweet(log_entry, data):
    """週次データサマリー（月曜 07:00 / URL なし・ランキング形式）"""
    today      = date.today()
    week_start = today - timedelta(days=today.weekday())
    week_end   = week_start + timedelta(days=6)

    added    = log_entry.get('added', 0)
    total    = len(data)
    cy       = today.year
    cy_count = sum(1 for d in data if d.get('date', '').startswith(str(cy)))

    # 今週の都道府県トップ3
    top    = get_top_prefectures(data, n=3, since_days=7)
    medals = ['🥇', '🥈', '🥉']

    lines = [
        f"📊 今週のクマ出没まとめ（{week_start.month}/{week_start.day}〜{week_end.month}/{week_end.day}）",
        "",
        f"全国：+{added:,}件（累計 {total:,}件）",
        "",
        "今週の都道府県トップ3：",
    ]
    for i, (pref, cnt) in enumerate(top):
        lines.append(f"{medals[i]} {pref}：{cnt}件")

    lines += [
        "",
        f"{cy}年の出没件数：{cy_count:,}件",
        "",
        "最新データはプロフィールのリンクから",
        "",
        "#クマ出没",
    ]
    return '\n'.join(lines)


def build_educational_tweet():
    """教育・豆知識ツイート（水曜 07:00 / 週番号でローテーション）"""
    week_num = date.today().isocalendar()[1]
    return BEAR_FACTS[week_num % len(BEAR_FACTS)]['body']


def build_prefecture_focus_tweet(data):
    """都道府県フォーカス（金曜 07:00 / 今週最多の県を特集）"""
    top = get_top_prefectures(data, n=5, since_days=7)
    if not top:
        return None

    top_pref, top_cnt = top[0]
    cy      = date.today().year
    cy_data = [d for d in data if d.get('prefecture') == top_pref and d.get('date', '').startswith(str(cy))]
    cy_cnt  = len(cy_data)

    # 市区町村トップ3
    city_counts = {}
    for d in cy_data:
        c = d.get('city', '')
        if c:
            city_counts[c] = city_counts.get(c, 0) + 1
    top_cities = sorted(city_counts.items(), key=lambda x: x[1], reverse=True)[:3]

    lines = [
        f"📍 今週の注目エリア：{top_pref}",
        "",
        f"今週の出没件数：{top_cnt}件（全国1位）",
        f"{cy}年累計：{cy_cnt:,}件",
        "",
    ]
    if top_cities:
        lines.append(f"{cy}年の出没上位市区町村：")
        for city, cnt in top_cities:
            lines.append(f"  ・{city}：{cnt}件")
        lines.append("")

    lines += [
        f"{top_pref}にお住まいの方は特にご注意を⚠️",
        "",
        "最新出没リストはプロフィールのリンクから",
        "",
        f"#クマ出没 #{top_pref.replace('県','').replace('道','').replace('府','').replace('都','')}",
    ]
    return '\n'.join(lines)


def build_seasonal_tweet(season):
    """シーズン開始告知（3/1 春・9/1 秋 / SHORT_URL 使用）"""
    if season == 'autumn':
        lines = [
            "🍂 クマ出没シーズンが始まります",
            "",
            "9〜11月は年間出没の約47%が集中する",
            "最も危険な時期です。",
            "",
            "山菜・キャンプ・登山の前に",
            "必ず地域の出没情報を確認してください。",
            "",
            "KUMANUKEでは毎週データを更新中：",
            "✅ 全国出没マップ（11万件超）",
            "✅ 都道府県別件数ランキング",
            "✅ 週次トレンドレポート",
            "",
            f"👉 {SITE_URL}",
            "",
            "#クマ出没 #クマ対策",
        ]
    else:  # spring
        lines = [
            "🌱 クマが冬眠から目覚める季節です",
            "",
            "3〜5月は冬眠明けで空腹なクマが",
            "活発に食料を探します。",
            "",
            "山菜採りの時期と重なるため",
            "この時期は特に注意が必要です⚠️",
            "",
            "KUMANUKEで今年の出没状況を確認：",
            f"👉 {SITE_URL}",
            "",
            "#クマ出没 #山菜採り",
        ]
    return '\n'.join(lines)


# ── メイン処理 ───────────────────────────────────────────────────────────────

def main():
    today   = date.today()
    weekday = today.weekday()  # 0=月, 1=火, 2=水, 3=木, 4=金
    day_jp  = ['月', '火', '水', '木', '金', '土', '日'][weekday]

    print(f"=== X 自動投稿 ({today} {day_jp}曜日) ===")

    creds = load_credentials()
    if not creds:
        print("⚠ X API の認証情報が設定されていません。")
        print("  1. https://developer.x.com/ で Developer アカウントを作成")
        print("  2. Project・App を作成（Free プランで OK）")
        print("  3. Read and Write 権限を付与")
        print("  4. 以下の情報を scripts/x_credentials.json に保存:")
        print('     {"api_key":"...","api_secret":"...","access_token":"...","access_token_secret":"..."}')
        return

    data          = load_data()
    posted_count  = 0

    # ── ① 人身被害速報（毎日チェック・最大3件）──────────────────────────────
    print("\n[速報チェック]")
    new_injuries = get_new_injury_records(since_days=8)
    injury_posted = 0
    for rec in new_injuries[:3]:
        rid = rec.get('id', '')
        if rid and not already_posted(rid):
            try:
                text   = build_injury_alert_tweet(rec)
                result = post_tweet(text, creds)
                print(f"  ✓ 人身被害速報: {rec.get('prefecture')} {rec.get('date')}")
                print(f"    tweet_id: {result.get('data', {}).get('id')}")
                mark_posted(rid)
                injury_posted += 1
                posted_count  += 1
                time.sleep(5)
            except Exception as e:
                print(f"  ⚠ 速報投稿エラー: {e}")
    if injury_posted == 0:
        print("  - 新着の人身被害なし（スキップ）")

    # ── ② シーズン告知（3/1 または 9/1）────────────────────────────────────
    seasonal_key  = None
    seasonal_text = None
    if today.month == 9 and today.day == 1:
        seasonal_key  = f"seasonal_autumn_{today.year}"
        seasonal_text = build_seasonal_tweet('autumn')
    elif today.month == 3 and today.day == 1:
        seasonal_key  = f"seasonal_spring_{today.year}"
        seasonal_text = build_seasonal_tweet('spring')

    if seasonal_key and not already_posted(seasonal_key):
        print("\n[シーズン告知]")
        try:
            result = post_tweet(seasonal_text, creds)
            print(f"  ✓ シーズン告知投稿: {seasonal_key}")
            print(f"    tweet_id: {result.get('data', {}).get('id')}")
            mark_posted(seasonal_key)
            posted_count += 1
            time.sleep(5)
        except Exception as e:
            print(f"  ⚠ シーズン告知投稿エラー: {e}")

    # ── ③ 曜日別定期投稿 ────────────────────────────────────────────────────
    print(f"\n[{day_jp}曜日の定期投稿]")

    if weekday == 0:
        # 月曜：週次データサマリー
        summary_key = f"weekly_summary_{today.isoformat()}"
        if not already_posted(summary_key):
            try:
                log_entry = {}
                if LOG_FILE.exists():
                    with open(LOG_FILE, encoding='utf-8') as f:
                        log = json.load(f)
                    if log:
                        log_entry = log[-1]
                text   = build_weekly_summary_tweet(log_entry, data)
                result = post_tweet(text, creds)
                print(f"  ✓ 週次サマリー投稿（累計 {len(data):,}件）")
                print(f"    tweet_id: {result.get('data', {}).get('id')}")
                mark_posted(summary_key)
                posted_count += 1
            except Exception as e:
                print(f"  ⚠ 週次サマリー投稿エラー: {e}")
        else:
            print("  - 週次サマリーは本日投稿済み（スキップ）")

    elif weekday == 2:
        # 水曜：教育・豆知識コンテンツ
        week_num = today.isocalendar()[1]
        edu_key  = f"educational_w{week_num}_{today.year}"
        if not already_posted(edu_key):
            try:
                text   = build_educational_tweet()
                result = post_tweet(text, creds)
                print(f"  ✓ 教育コンテンツ投稿（Week {week_num} / {len(BEAR_FACTS)}種ローテーション）")
                print(f"    tweet_id: {result.get('data', {}).get('id')}")
                mark_posted(edu_key)
                posted_count += 1
            except Exception as e:
                print(f"  ⚠ 教育コンテンツ投稿エラー: {e}")
        else:
            print("  - 教育コンテンツは今週投稿済み（スキップ）")

    elif weekday == 4:
        # 金曜：都道府県フォーカス
        week_num  = today.isocalendar()[1]
        focus_key = f"pref_focus_w{week_num}_{today.year}"
        if not already_posted(focus_key):
            try:
                text = build_prefecture_focus_tweet(data)
                if text:
                    result = post_tweet(text, creds)
                    print("  ✓ 都道府県フォーカス投稿")
                    print(f"    tweet_id: {result.get('data', {}).get('id')}")
                    mark_posted(focus_key)
                    posted_count += 1
                else:
                    print("  - 今週のデータが不足（スキップ）")
            except Exception as e:
                print(f"  ⚠ 都道府県フォーカス投稿エラー: {e}")
        else:
            print("  - 都道府県フォーカスは今週投稿済み（スキップ）")

    else:
        print(f"  - {day_jp}曜日は定期投稿なし")

    print(f"\n投稿完了: {posted_count}件")


if __name__ == '__main__':
    main()
