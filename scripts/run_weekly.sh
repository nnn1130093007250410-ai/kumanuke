#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# KUMANUKE 週次自動データ更新スクリプト
# launchd から毎週月曜 00:00 JST に実行される
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

# ── 環境設定 ─────────────────────────────────────────────────────────────────
export PATH="/Library/Frameworks/Python.framework/Versions/3.13/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
export PYTHONIOENCODING=utf-8
export HOME="/Users/sakumashinrou"

PROJECT_DIR="/Users/sakumashinrou/Downloads/kumanuke 4"
LOG_PREFIX="[$(date '+%Y-%m-%d %H:%M:%S JST')]"

echo ""
echo "======================================================"
echo " 🐻 KUMANUKE 週次自動更新"
echo " $LOG_PREFIX"
echo "======================================================"

cd "$PROJECT_DIR"

# ── データ収集 ────────────────────────────────────────────────────────────────
echo ""
echo "$LOG_PREFIX ArcGIS 増分収集 開始..."
python3 scripts/collect_arcgis.py || {
    echo "$LOG_PREFIX ⚠ collect_arcgis.py でエラーが発生しましたが続行します"
}

echo ""
echo "$LOG_PREFIX KML 増分収集 開始..."
python3 scripts/collect_kml.py || {
    echo "$LOG_PREFIX ⚠ collect_kml.py でエラーが発生しましたが続行します"
}

# ── 統計更新（update-log.json も含む）────────────────────────────────────────
echo ""
echo "$LOG_PREFIX 統計更新 開始..."
python3 scripts/update_stats.py || {
    echo "$LOG_PREFIX ⚠ update_stats.py でエラーが発生しました"
    exit 1
}

# ── X（Twitter）自動投稿 ─────────────────────────────────────────────────────
# ※ 投稿は com.kumanuke.x-post（月・水・金 07:00）が担当するため、ここでは実行しない
# ※ 月曜 00:00 に投稿すると最適時間帯を逃すため分離

# ── 環境省文書 新着チェック ───────────────────────────────────────────────────
echo ""
echo "$LOG_PREFIX 環境省文書チェック 開始..."
python3 scripts/check_env_docs.py
ENV_RC=$?
if [ "$ENV_RC" -eq "2" ]; then
    echo "$LOG_PREFIX ⚠ 環境省に新着文書があります！ scripts/env_new_docs.json を確認してください"
fi

# ── Git コミット & プッシュ ───────────────────────────────────────────────────
echo ""
echo "$LOG_PREFIX 変更確認..."

# git ステータス確認
CHANGED=$(git status --porcelain 2>/dev/null | grep -v "^??" | wc -l | tr -d ' ')

if [ "$CHANGED" -gt "0" ]; then
    # 件数取得
    TOTAL=$(python3 -c "
import json
with open('public/data/bear-japan.json') as f:
    data = json.load(f)
print(len(data))
" 2>/dev/null || echo "不明")

    DATE_STR=$(date '+%Y-%m-%d')

    # 対象ファイルのみ追加（update-log.json も追加）
    git add public/data/bear-japan.json 2>/dev/null || true
    git add public/data/update-log.json 2>/dev/null || true
    git add src/app/page.tsx 2>/dev/null || true
    git add "src/app/guide/japan-regional-bear-data/page.tsx" 2>/dev/null || true

    # 現年の bear-incident-news ページを動的に追加
    CURRENT_YEAR=$(date '+%Y')
    NEWS_PAGE="src/app/guide/bear-incident-news-${CURRENT_YEAR}/page.tsx"
    [ -f "$NEWS_PAGE" ] && git add "$NEWS_PAGE" 2>/dev/null || true

    # candidates.json / env_known_docs.json があれば追加
    [ -f scripts/candidates.json ]     && git add scripts/candidates.json 2>/dev/null || true
    [ -f scripts/env_known_docs.json ] && git add scripts/env_known_docs.json 2>/dev/null || true

    git -c user.name="kumanuke-bot" \
        -c user.email="bot@kumanuke.jp" \
        commit -m "🐻 自動更新: 熊出没データ ${TOTAL}件 (${DATE_STR})

- ArcGIS REST API 増分収集
- Google My Maps KML 増分収集
- 都道府県別統計・件数を自動更新
- update-log.json 更新

Co-authored-by: kumanuke-bot <bot@kumanuke.jp>"

    echo "$LOG_PREFIX git push origin main ..."
    git push origin main

    echo ""
    echo "$LOG_PREFIX ✅ 完了: ${TOTAL}件 をコミット・プッシュしました"
else
    echo "$LOG_PREFIX ℹ️ 変更なし - 新規データなし"
fi

echo ""
echo "======================================================"
echo " 更新完了: $(date '+%Y-%m-%d %H:%M:%S JST')"
echo "======================================================"
