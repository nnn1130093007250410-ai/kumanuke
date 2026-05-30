#!/usr/bin/env python3
"""
X（Twitter）自動投稿スクリプト
週次データ更新の結果をXに投稿する。

必要な設定（初回のみ）:
  export X_API_KEY="..."
  export X_API_SECRET="..."
  export X_ACCESS_TOKEN="..."
  export X_ACCESS_TOKEN_SECRET="..."

または scripts/x_credentials.json に保存:
  {
    "api_key": "...",
    "api_secret": "...",
    "access_token": "...",
    "access_token_secret": "..."
  }

X Developer Portal: https://developer.x.com/
  - 無料プランで OK（月 1,500 ツイートまで）
  - App の権限: Read and Write が必要
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
POSTED_FILE  = SCRIPT_DIR / "x_posted.json"   # 投稿済み管理


# ── 認証情報の読み込み ────────────────────────────────────────────────────────

def load_credentials() -> dict | None:
    """環境変数 → credentials.json の順で認証情報を取得"""
    env = {
        'api_key':              os.getenv('X_API_KEY', ''),
        'api_secret':           os.getenv('X_API_SECRET', ''),
        'access_token':         os.getenv('X_ACCESS_TOKEN', ''),
        'access_token_secret':  os.getenv('X_ACCESS_TOKEN_SECRET', ''),
    }
    if all(env.values()):
        return env

    if CRED_FILE.exists():
        with open(CRED_FILE, encoding='utf-8') as f:
            return json.load(f)

    return None


# ── OAuth 1.0a 署名 ───────────────────────────────────────────────────────────

def _percent_encode(s: str) -> str:
    return urllib.parse.quote(str(s), safe='')


def _build_oauth_header(method: str, url: str, params: dict, creds: dict) -> str:
    """OAuth 1.0a Authorization ヘッダーを生成"""
    ts = str(int(time.time()))
    nonce = base64.b64encode(os.urandom(16)).decode().replace('=', '').replace('+', '').replace('/', '')

    oauth_params = {
        'oauth_consumer_key':     creds['api_key'],
        'oauth_nonce':            nonce,
        'oauth_signature_method': 'HMAC-SHA1',
        'oauth_timestamp':        ts,
        'oauth_token':            creds['access_token'],
        'oauth_version':          '1.0',
    }

    all_params = {**params, **oauth_params}
    sorted_params = '&'.join(
        f"{_percent_encode(k)}={_percent_encode(v)}"
        for k, v in sorted(all_params.items())
    )

    base_string = '&'.join([
        method.upper(),
        _percent_encode(url),
        _percent_encode(sorted_params),
    ])

    signing_key = f"{_percent_encode(creds['api_secret'])}&{_percent_encode(creds['access_token_secret'])}"
    signature = base64.b64encode(
        hmac.new(signing_key.encode(), base_string.encode(), hashlib.sha1).digest()
    ).decode()

    oauth_params['oauth_signature'] = signature
    header_parts = ', '.join(
        f'{_percent_encode(k)}="{_percent_encode(v)}"'
        for k, v in sorted(oauth_params.items())
    )
    return f'OAuth {header_parts}'


def post_tweet(text: str, creds: dict) -> dict:
    """X API v2 でツイートを投稿"""
    url = 'https://api.twitter.com/2/tweets'
    body = json.dumps({'text': text}).encode('utf-8')
    auth_header = _build_oauth_header('POST', url, {}, creds)

    req = urllib.request.Request(
        url,
        data=body,
        headers={
            'Authorization': auth_header,
            'Content-Type': 'application/json',
            'User-Agent': 'KumanukeBearBot/1.0',
        },
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode('utf-8'))


# ── 投稿内容の生成 ────────────────────────────────────────────────────────────

def build_weekly_summary_tweet(log_entry: dict, total: int) -> str:
    """週次サマリーツイートのテキストを生成"""
    added   = log_entry.get('added', 0)
    cy      = log_entry.get('year', str(date.today().year))
    cy_cnt  = log_entry.get('year_count', 0)
    top_p   = log_entry.get('top_prefecture', '秋田県')
    today   = date.today().strftime('%Y年%-m月%-d日')

    lines = [
        f"🐻 【週次更新】{today}",
        f"",
        f"今週 +{added:,}件を追加。",
        f"累計データ：{total:,}件",
        f"{cy}年（今年）：{cy_cnt:,}件",
        f"出没最多：{top_p}",
        f"",
        f"📊 データで見る日本全国のクマ出没状況",
        f"kumanuke.bubuworks.co.jp",
        f"",
        f"#クマ出没 #野生動物 #クマ対策",
    ]
    return '\n'.join(lines)


def build_injury_alert_tweet(record: dict) -> str:
    """人身被害アラートツイートのテキストを生成"""
    pref = record.get('prefecture', '')
    city = record.get('city', '')
    dt   = record.get('date', '')
    desc = record.get('description', '')[:60]

    lines = [
        f"⚠️ 【人身被害情報】",
        f"{dt} {pref} {city}",
        f"",
        desc,
        f"",
        f"詳細はKUMANUKEマップで確認できます。",
        f"kumanuke.bubuworks.co.jp/map",
        f"",
        f"#クマ被害 #クマ出没 #{pref.replace('県','').replace('道','').replace('府','').replace('都','')}",
    ]
    return '\n'.join(lines)


# ── 新着人身被害の検知 ────────────────────────────────────────────────────────

def get_new_injury_records(since_days: int = 8) -> list[dict]:
    """直近 since_days 日以内の新着人身被害レコードを返す"""
    with open(DATA_FILE, encoding='utf-8') as f:
        data = json.load(f)

    cutoff = (date.today() - timedelta(days=since_days)).isoformat()
    injuries = [
        d for d in data
        if d.get('type') in ('人身被害', '人身') and d.get('date', '') >= cutoff
    ]
    return sorted(injuries, key=lambda x: x.get('date', ''), reverse=True)


def already_posted(record_id: str) -> bool:
    """投稿済みかチェック"""
    if not POSTED_FILE.exists():
        return False
    with open(POSTED_FILE, encoding='utf-8') as f:
        posted = json.load(f)
    return record_id in posted.get('ids', [])


def mark_posted(record_id: str) -> None:
    """投稿済みに記録"""
    posted = {'ids': []}
    if POSTED_FILE.exists():
        with open(POSTED_FILE, encoding='utf-8') as f:
            posted = json.load(f)
    if record_id not in posted['ids']:
        posted['ids'].append(record_id)
        # 1000件以上は古いものを削除
        posted['ids'] = posted['ids'][-1000:]
    with open(POSTED_FILE, 'w', encoding='utf-8') as f:
        json.dump(posted, f, ensure_ascii=False, indent=2)


# ── メイン処理 ───────────────────────────────────────────────────────────────

def main() -> None:
    print("=== X 自動投稿 ===")

    creds = load_credentials()
    if not creds:
        print("⚠ X API の認証情報が設定されていません。")
        print("  1. https://developer.x.com/ で Developer アカウントを作成")
        print("  2. Project・App を作成（Free プランで OK）")
        print("  3. Read and Write 権限を付与")
        print("  4. 以下の情報を scripts/x_credentials.json に保存:")
        print('     {"api_key":"...","api_secret":"...","access_token":"...","access_token_secret":"..."}')
        return

    # ── ① 人身被害アラート（優先）────────────────────────────────────────────
    new_injuries = get_new_injury_records(since_days=8)
    injury_posted = 0
    for rec in new_injuries[:3]:  # 最大3件
        rid = rec.get('id', '')
        if rid and not already_posted(rid):
            try:
                tweet_text = build_injury_alert_tweet(rec)
                result = post_tweet(tweet_text, creds)
                print(f"  ✓ 人身被害アラート投稿: {rec.get('prefecture')} {rec.get('date')}")
                print(f"    tweet_id: {result.get('data', {}).get('id')}")
                mark_posted(rid)
                injury_posted += 1
                time.sleep(3)
            except Exception as e:
                print(f"  ⚠ 投稿エラー: {e}")

    # ── ② 週次サマリー（月曜実行時）─────────────────────────────────────────
    if date.today().weekday() == 0:  # 0 = Monday
        try:
            # 最新ログエントリを取得
            with open(LOG_FILE, encoding='utf-8') as f:
                log = json.load(f)
            with open(DATA_FILE, encoding='utf-8') as f:
                data = json.load(f)

            if log:
                last_entry = log[-1]
                today_key = f"weekly_summary_{date.today().isoformat()}"

                if not already_posted(today_key):
                    tweet_text = build_weekly_summary_tweet(last_entry, len(data))
                    result = post_tweet(tweet_text, creds)
                    print(f"  ✓ 週次サマリー投稿 (total: {len(data):,}件)")
                    print(f"    tweet_id: {result.get('data', {}).get('id')}")
                    mark_posted(today_key)
                else:
                    print("  - 週次サマリーは本日投稿済み（スキップ）")
        except Exception as e:
            print(f"  ⚠ 週次サマリー投稿エラー: {e}")
    else:
        print("  - 週次サマリーは月曜のみ投稿")

    total_posted = injury_posted
    print(f"\n投稿完了: {total_posted}件")


if __name__ == '__main__':
    main()
