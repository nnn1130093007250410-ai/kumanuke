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

# ── 統計更新 ──────────────────────────────────────────────────────────────────
echo ""
echo "$LOG_PREFIX 統計更新 開始..."
python3 scripts/update_stats.py || {
    echo "$LOG_PREFIX ⚠ update_stats.py でエラーが発生しました"
    exit 1
}

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

    # 対象ファイルのみ追加
    git add public/data/bear-japan.json 2>/dev/null || true
    git add src/app/page.tsx 2>/dev/null || true
    git add "src/app/guide/japan-regional-bear-data/page.tsx" 2>/dev/null || true
    git add "src/app/guide/bear-incident-news-2026/page.tsx" 2>/dev/null || true

    # candidates.json があれば追加（discover モード用）
    [ -f scripts/candidates.json ] && git add scripts/candidates.json 2>/dev/null || true

    git -c user.name="kumanuke-bot" \
        -c user.email="bot@kumanuke.jp" \
        commit -m "🐻 自動更新: 熊出没データ ${TOTAL}件 (${DATE_STR})

- ArcGIS REST API 増分収集
- Google My Maps KML 増分収集
- 都道府県別統計・件数を自動更新

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
