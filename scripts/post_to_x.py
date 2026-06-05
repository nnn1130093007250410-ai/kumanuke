#!/usr/bin/env python3
"""
X（Twitter）自動投稿スクリプト ― スレッド対応版

【文字数の仕様】
  日本語・CJK文字は Twitter の加重カウントで 1文字=2ウェイト扱い。
  140字の日本語 ≒ 280ウェイト = 上限。
  全投稿を「加重280以内のツイート複数」のスレッド形式で組み立てる。

投稿スケジュール（launchd: com.kumanuke.x-post が毎日 07:00 に起動）:
  月曜 07:00 → 週次データサマリー（ランキング形式）+ 人身被害速報チェック
  火曜 07:00 → 比較系投稿（12種ローテーション）   + 人身被害速報チェック
  水曜 07:00 → 教育・豆知識コンテンツ（12種）     + 人身被害速報チェック
  木曜 07:00 → 豆知識その2（12種ローテーション）  + 人身被害速報チェック
  金曜 07:00 → 都道府県フォーカス                + 人身被害速報チェック
  3/1 07:00  → 春シーズン開始告知
  9/1 07:00  → 秋シーズン開始告知

URL 方針:
  本文に URL を直書きするとインプレッションが 30〜50% 低下するため
  URL は原則プロフィールに置く。シーズン告知など特別投稿のみ使用。
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

# XはどんなURLもt.coで自動23文字に短縮するため、直接URLを使用
SITE_URL  = 'https://kumanuke.bubuworks.co.jp'
MAP_URL   = 'https://kumanuke.bubuworks.co.jp/map'
WORLD_URL = 'https://kumanuke.bubuworks.co.jp/world'
GUIDE_URL = 'https://kumanuke.bubuworks.co.jp/guide'

# ═══════════════════════════════════════════════════════════════════════════
#  文字数ユーティリティ
# ═══════════════════════════════════════════════════════════════════════════

# Twitter が「加重2」として扱う Unicode 範囲（CJK・全角記号など）
_CJK_RANGES = [
    (0x1100, 0x115F), (0x2E80, 0x303F), (0x3040, 0x33FF),
    (0x3400, 0x4DBF), (0x4E00, 0xA4CF), (0xA960, 0xA97F),
    (0xAC00, 0xD7FF), (0xF900, 0xFAFF), (0xFE10, 0xFE1F),
    (0xFE30, 0xFE6F), (0xFF01, 0xFF60), (0xFFE0, 0xFFE6),
]

def tw_weight(text: str) -> int:
    """Twitter 加重文字数を返す（日本語1字=2ウェイト、絵文字サロゲートペア=2）"""
    w, i = 0, 0
    while i < len(text):
        cp = ord(text[i])
        if 0xD800 <= cp <= 0xDBFF and i + 1 < len(text):
            w += 2; i += 2; continue
        w += 2 if any(lo <= cp <= hi for lo, hi in _CJK_RANGES) else 1
        i += 1
    return w

def assert_weights(tweets):
    """全ツイートが280ウェイト以内か検証（超えていたら警告）"""
    for i, t in enumerate(tweets, 1):
        w = tw_weight(t)
        if w > 280:
            print(f"  ⚠ ツイート{i}が加重オーバー ({w}/280): {t[:30]}...")

# ═══════════════════════════════════════════════════════════════════════════
#  コンテンツ ― 教育・豆知識（水曜）
#  各エントリは tweets: [t1, t2] のリスト
# ═══════════════════════════════════════════════════════════════════════════
BEAR_FACTS = [
    {
        "tweets": [
            (
                "🐻 知っていましたか？\n\n"
                "クマは冬眠前に「過食期」があります。\n"
                "1日20時間食べ続け、体重を一気に増やす時期です。\n\n"
                "↓ どんぐりが不作の年はどうなるか"
            ),
            (
                "山の食料が足りないクマは人里に降りてきます。\n\n"
                "どんぐり凶作年のデータ：\n"
                "📈 人里への出没が平年の2〜3倍に増加\n"
                "📈 人身被害も増加傾向\n\n"
                "秋の出没急増の主な原因がこれです⚠️\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 日本に生息する2種類のクマ\n\n"
                "🔵 ヒグマ（北海道のみ）\n"
                "　体重200〜400kg・体長最大2.5m\n\n"
                "⚫ ツキノワグマ（本州・四国）\n"
                "　体重50〜150kg・体長最大1.5m\n\n"
                "↓ 本州でよく見られるのは？"
            ),
            (
                "本州の出没の99%はツキノワグマです。\n\n"
                "木登りが得意で住宅街にも現れます。\n"
                "どちらも走力は時速50km超——\n"
                "人間が逃げ切ることはまず不可能です。\n\n"
                "遭遇したら静かにゆっくり後退を⚠️\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマが最も活発な時間帯は？\n\n"
                "KUMANUKEのデータ（11万件超）より：\n\n"
                "🌅 早朝（日の出前後）が最多\n"
                "🌆 夕暮れ時が次点\n"
                "☀️ 昼間は比較的少ない\n\n"
                "↓ 登山・キャンプへの影響は"
            ),
            (
                "早朝と夕方の2つのピーク帯だけで\n"
                "目撃情報全体の60%以上を占めます。\n\n"
                "山行の計画では「早朝出発・夕方帰着」の\n"
                "時間帯に特に気をつけてください⚠️\n\n"
                "農地での作業も同様です。\n\n"
                "#クマ対策"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマの嗅覚は犬の7倍\n\n"
                "食べ物の臭いを数km先から感知します。\n\n"
                "農地・住宅地への侵入を防ぐ基本：\n"
                "✅ 生ゴミは前夜に出さない\n"
                "✅ 収穫残渣をその日のうちに片付ける\n\n"
                "↓ さらにもう1つ"
            ),
            (
                "✅ 果樹の落果もその日のうちに処理\n\n"
                "これらは「クマを呼び寄せない」\n"
                "最も基本的な対策です。\n\n"
                "臭いの管理だけで出没を大幅に減らせます。\n\n"
                "#クマ対策"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマ鈴は本当に効果があるのか？\n\n"
                "有効です。ただし条件があります：\n\n"
                "⚠️ 川沿い・風下では音が届きにくい\n"
                "⚠️ 止めると無音になる（常に鳴らし続けること）\n\n"
                "↓ さらに重要な注意点"
            ),
            (
                "⚠️ 大声で話す方が効果的という研究もあります\n\n"
                "「鈴をつけているから安全」は過信です。\n\n"
                "クマ鈴は「存在を知らせる道具」。\n"
                "クマスプレーは「出合頭の最終手段」。\n"
                "両方の役割を理解して使いましょう⚠️\n\n"
                "#クマ対策 #登山"
            ),
        ]
    },
    {
        "tweets": [
            (
                "📊 クマ出没がピークになる月は？\n\n"
                "KUMANUKEのデータ（11万件超）による集計：\n\n"
                "🔴 10月：年間の約23%が集中（最多）\n"
                "🟠 11月：約14%\n"
                "🟡  9月：約10%\n\n"
                "↓ 3ヶ月合計すると？"
            ),
            (
                "9〜11月のわずか3ヶ月で\n"
                "年間出没の約47%が集中します。\n\n"
                "秋こそ最大の警戒シーズンです。\n"
                "キャンプ・登山・農作業は\n"
                "この時期に特に注意を⚠️\n\n"
                "#クマ出没"
            ),
        ]
    },
    {
        "tweets": [
            (
                "⚠️ 最も危険なクマの状況は？\n\n"
                "答え：子グマを連れた母グマです。\n\n"
                "母グマは子どもを守るため\n"
                "攻撃性が通常の数倍〜十数倍に高まります。\n\n"
                "↓ 遭遇してしまったら"
            ),
            (
                "子グマを見たら「近くに母グマがいる」\n"
                "というサインです。\n\n"
                "✅ 絶対に近づかない\n"
                "✅ 子グマと自分の間に入らない\n"
                "✅ 静かにゆっくり後退\n\n"
                "可愛くても近づくのは厳禁🚫\n\n"
                "#クマ対策"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 農業被害でもっとも多いのは？\n\n"
                "KUMANUKEのデータでは\n"
                "農業被害（トウモロコシ・スイカ・蜂蜜など）が\n"
                "出没情報全体の約30%を占めます。\n\n"
                "↓ 最も効果的な対策は"
            ),
            (
                "電気柵の設置は農業被害を\n"
                "最大90%削減するという研究結果があります。\n\n"
                "補助金制度がある自治体も多数あります。\n"
                "農業をされている方はぜひご検討を⚡\n\n"
                "#クマ対策 #農業"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマは一度成功すると繰り返す\n\n"
                "ゴミ箱を漁って食料を得たクマは\n"
                "同じ場所に何度も戻ってきます。\n\n"
                "「習慣化」したクマは最終的に\n"
                "駆除対象になることが多い。\n\n"
                "↓ 根本的な解決策は"
            ),
            (
                "クマに「ここは食料がない」と\n"
                "学ばせることが最も重要です。\n\n"
                "クマに一度も成功させない環境を作ること——\n"
                "それがクマと人間が共存するための\n"
                "第一歩です。\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "📊 日本のクマの個体数は？\n\n"
                "推定個体数：\n"
                "⚫ ツキノワグマ：約4〜5万頭（本州・四国）\n"
                "🔵 ヒグマ：約1万頭（北海道）\n\n"
                "↓ なぜ出没が増えたのか"
            ),
            (
                "20年前と比べて生息域が拡大し\n"
                "人里との距離が縮まっています。\n\n"
                "これが出没件数増加の背景のひとつ。\n\n"
                "「駆除か共存か」の議論が\n"
                "全国で続いています。\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 冬眠しないクマがいる\n\n"
                "「穴持たず」と呼ばれる\n"
                "冬眠しないクマが稀に存在します。\n\n"
                "原因として考えられること：\n"
                "・食料が豊富すぎた\n"
                "・体重が冬眠に足りなかった\n"
                "・老齢のため\n\n"
                "↓ どんな影響があるか"
            ),
            (
                "穴持たずのクマは真冬でも活動します。\n\n"
                "KUMANUKEでも1〜2月に\n"
                "出没情報が届くことがあります。\n\n"
                "「冬だから安心」は過信です。\n"
                "雪上の足跡を見かけたら要注意⚠️\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマの走る速さは？\n\n"
                "時速50〜60km。\n"
                "短距離走の世界記録（約37km/h）を\n"
                "大きく上回ります。\n\n"
                "「逃げれば大丈夫」は通用しません。\n\n"
                "↓ 正しい対処法は"
            ),
            (
                "遭遇した時の鉄則：\n\n"
                "✅ 静かにゆっくり後退する\n"
                "✅ 目を合わせたまま大きく見せる\n"
                "✅ 背中を向けて走らない\n"
                "✅ クマスプレーをすぐ出せる位置に\n\n"
                "#クマ対策"
            ),
        ]
    },
]

# ═══════════════════════════════════════════════════════════════════════════
#  コンテンツ ― 比較系（火曜）
# ═══════════════════════════════════════════════════════════════════════════
BEAR_COMPARISONS = [
    {
        "tweets": [
            (
                "🆚 ヒグマ vs ツキノワグマ【体格比較】\n\n"
                "🔵 ヒグマ（北海道のみ）\n"
                "体重100〜400kg／体長最大2.5m\n\n"
                "⚫ ツキノワグマ（本州・四国）\n"
                "体重50〜150kg／体長最大1.5m\n\n"
                "↓ 走力の差は？"
            ),
            (
                "走力はどちらも時速50km超。\n\n"
                "体格差はあっても\n"
                "人間が逃げ切ることは不可能です。\n\n"
                "「ツキノワは小さいから大丈夫」\n"
                "は大きな誤解です⚠️\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 春のクマ vs 秋のクマ【危険度比較】\n\n"
                "🌸 春（3〜5月）\n"
                "冬眠明けで空腹・山菜採りと時期が重複\n"
                "動きはやや緩慢だが気性は荒め\n\n"
                "🍂 秋（9〜11月）\n"
                "1日中食べ続け体力が最大\n"
                "人里への出没も最多\n\n"
                "↓ 結論は"
            ),
            (
                "出没件数は断然「秋＞春」です。\n\n"
                "年間出没の約47%が9〜11月に集中。\n"
                "どんぐり凶作年はさらに増加します。\n\n"
                "春も油断は禁物ですが\n"
                "秋こそ最大の警戒シーズンです⚠️\n\n"
                "#クマ出没"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 クマ鈴 vs 熊よけスプレー【用途の違い】\n\n"
                "🔔 クマ鈴\n"
                "✅ 事前に存在を知らせる「予防ツール」\n"
                "⚠️ 川沿い・風下では音が届きにくい\n"
                "⚠️ 鳴らし続けないと意味がない\n\n"
                "↓ スプレーは"
            ),
            (
                "🧴 熊よけスプレー\n"
                "✅ 至近距離（7m以内）での「最終防衛」\n"
                "✅ 研究で97%の撃退効果が確認済み\n"
                "⚠️ 事前に使い方を練習しておく\n\n"
                "最強の対策は両方の併用です。\n"
                "役割が違うので代替はできません⚠️\n\n"
                "#クマ対策"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 子連れ母グマ vs 単独グマ【危険度比較】\n\n"
                "👶 子連れ母グマ\n"
                "攻撃性が通常の数倍〜十数倍\n"
                "子を守るため突然チャージしてくることも\n"
                "警告なしに攻撃する場合あり\n\n"
                "↓ 単独グマは？"
            ),
            (
                "🐻 単独グマ\n"
                "通常は人を回避しようとする\n"
                "驚かせなければ攻撃は少ない\n\n"
                "【重要】\n"
                "小さい子グマを見かけたら\n"
                "近くに母グマがいるサインです。\n"
                "即座に静かに離れてください🚫\n\n"
                "#クマ対策"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 日本 vs アメリカ vs インド\n"
                "【クマ人身被害・国際比較】\n\n"
                "🇯🇵 日本：年間100〜240件\n"
                "🇺🇸 アメリカ：年間40〜50件（国立公園内）\n"
                "🇮🇳 インド：ナマケグマ被害700件超/年\n\n"
                "↓ 日本が多い理由は"
            ),
            (
                "日本が多い主な理由：\n\n"
                "・人口密度が高く里山と生活域が重複\n"
                "・山菜採り・農業従事者が多い\n"
                "・クマスプレー普及率がまだ低い\n\n"
                "件数だけ見ると日本は世界でも\n"
                "被害の多い国に入ります⚠️\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 電気柵あり vs なし【農業被害の差】\n\n"
                "研究データによる比較：\n\n"
                "❌ 電気柵なし：クマ侵入・農業被害が継続\n"
                "✅ 電気柵あり：被害を最大90%削減\n\n"
                "↓ コストは？"
            ),
            (
                "電気柵は初期費用がかかりますが\n"
                "農業被害の損失と比べれば\n"
                "費用対効果は非常に高い対策です。\n\n"
                "補助金制度がある自治体も多数あります。\n"
                "農林業をされている方はご確認を⚡\n\n"
                "#クマ対策 #農業"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 冬眠前 vs 冬眠明け【クマの状態比較】\n\n"
                "🍂 冬眠前（秋）\n"
                "1日中食べ続け体力が最大\n"
                "食料を求めて人里に来やすい\n"
                "出没件数が年間最多の時期\n\n"
                "↓ 冬眠明けは"
            ),
            (
                "🌸 冬眠明け（春）\n"
                "体力回復中で動きはやや鈍め\n"
                "ただし空腹で気性は荒め\n"
                "山菜採りと出没時期が重なる\n\n"
                "出没リスクは秋の方が圧倒的に高いですが\n"
                "春の山菜採りも要注意です⚠️\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 ヒグマ vs グリズリー vs ホッキョクグマ\n"
                "【世界の大型クマ比較】\n\n"
                "🐻 ヒグマ（ユーラシア・北米）\n"
                "体重最大400〜600kg\n\n"
                "🐻 グリズリー（北米内陸）\n"
                "体重最大360kg・気性が激しい\n\n"
                "↓ 最大は？"
            ),
            (
                "🧊 ホッキョクグマ\n"
                "体重最大700kg\n"
                "世界最大の陸上肉食獣\n\n"
                "日本のヒグマは\n"
                "世界最大級クラスに位置します。\n\n"
                "特に北海道のヒグマは\n"
                "世界的にも大型の個体群です⚠️\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 出没タイプ別の割合\n"
                "【KUMANUKEデータ・11万件超より】\n\n"
                "👀 目撃・痕跡：約65%\n"
                "🌽 農業・養蜂被害：約30%\n"
                "🔴 人身被害：約5%\n\n"
                "↓ 5%でも心配な理由は"
            ),
            (
                "人身被害の5%は件数でいえば\n"
                "年間数十〜200件超に相当します。\n\n"
                "しかも近年は増加傾向にあり\n"
                "2023年は過去最多水準を記録しました。\n\n"
                "「自分は大丈夫」という思い込みが\n"
                "最大のリスクです⚠️\n\n"
                "#クマ出没"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 山間部 vs 市街地【出没場所の変化】\n\n"
                "📊 10年前：出没の90%以上が山間部\n\n"
                "📊 近年：住宅街・市街地での出没が急増\n\n"
                "なぜ変わったのか？↓"
            ),
            (
                "主な背景：\n\n"
                "・個体数増加と生息域の拡大\n"
                "・耕作放棄地の増加（里山の緩衝帯が消失）\n"
                "・人の気配に慣れたクマの世代交代\n\n"
                "「山に入らなければ安全」は\n"
                "もはや過去の話です⚠️\n\n"
                "#クマ出没"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 昼間 vs 夜間【クマの活動時間帯比較】\n\n"
                "KUMANUKEのデータより：\n\n"
                "🌅 早朝（日の出前後）：目撃が最多\n"
                "🌆 夕暮れ時：次点\n"
                "☀️ 昼間：比較的少ない\n\n"
                "↓ 夜間は？"
            ),
            (
                "🌙 深夜〜夜間：\n"
                "農業・養蜂被害は夜間も多く発生\n\n"
                "登山者には「早朝・夕方」\n"
                "農業従事者には「夜間」\n"
                "それぞれ最も注意が必要な時間帯が違います。\n\n"
                "行動に合わせた対策を⚠️\n\n"
                "#クマ対策"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🆚 クマよけグッズ【効果比較ランキング】\n\n"
                "専門家・研究による評価：\n\n"
                "🥇 熊よけスプレー\n"
                "　至近距離での撃退効果が最も高い（97%）\n\n"
                "🥈 爆竹・ホイッスル\n"
                "　接近前の追い払いに有効\n\n"
                "↓ 3位と番外は"
            ),
            (
                "🥉 クマ鈴\n"
                "　事前の存在アピールとして有効\n\n"
                "❌ 光り物・ライト類\n"
                "　クマへの効果はほぼ確認されていない\n\n"
                "グッズに頼りすぎず\n"
                "「音を出す」「臭いを管理する」\n"
                "基本行動が最重要です⚠️\n\n"
                "#クマ対策"
            ),
        ]
    },
]

# ═══════════════════════════════════════════════════════════════════════════
#  コンテンツ ― 豆知識その2（木曜）
# ═══════════════════════════════════════════════════════════════════════════
BEAR_FACTS_2 = [
    {
        "tweets": [
            (
                "🐻 クマの寿命はどのくらい？\n\n"
                "⚫ ツキノワグマ（野生）：10〜25年\n"
                "🔵 ヒグマ（野生）：20〜30年\n"
                "飼育下では40年以上生きる個体も\n\n"
                "↓ 長寿クマは何が怖いのか"
            ),
            (
                "長寿のクマほど「ベテラン」。\n\n"
                "人の行動パターン・ゴミ収集日・\n"
                "農作物の収穫時期などを学習済みの\n"
                "可能性が高く、特に注意が必要です。\n\n"
                "「何十年もいる老クマ」は\n"
                "地域で最も危険な個体かもしれません⚠️\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマはどのくらい賢いのか？\n\n"
                "クマの知能は霊長類に匹敵するとも言われます。\n\n"
                "実際に記録された行動：\n"
                "✅ ゴミ箱の開け方を学習し何度も来る\n"
                "✅ 電気柵の電源を切る方法を覚えた\n"
                "✅ 人間の生活リズムを把握して行動\n\n"
                "↓ 対策への示唆は"
            ),
            (
                "「賢いクマ」ほど被害が繰り返されます。\n\n"
                "一度でも「食料が得られた」と\n"
                "学習させないことが最大の対策。\n\n"
                "ゴミ・農作物・ペットフードを\n"
                "クマの手の届かない場所で管理する——\n"
                "これが根本解決です。\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマの感覚を数字で比べると\n\n"
                "嗅覚：犬の7倍（数km先から察知）\n"
                "聴覚：人間の約2倍\n"
                "視覚：人間とほぼ同等（色覚あり）\n\n"
                "↓ よくある誤解"
            ),
            (
                "「クマは視力が悪い」はよくある誤解。\n"
                "実際には色も形もよく見えています。\n\n"
                "3つの感覚の中で\n"
                "最も圧倒的なのは嗅覚です。\n\n"
                "食料の臭い管理が\n"
                "最も効果的な対策になる理由がここにあります。\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマは泳げるのか？\n\n"
                "答え：非常に得意です。\n\n"
                "🔵 ヒグマ：川でのサーモン漁が有名\n"
                "⚫ ツキノワグマ：川・池を平気で渡る\n\n"
                "↓ 「川の向こうは安全」は本当か"
            ),
            (
                "「川を天然の柵として使う」考えは危険です。\n\n"
                "クマは川を泳いで渡ります。\n"
                "島にクマが泳いで上陸した記録もあります。\n\n"
                "川の存在を「完全な障壁」として\n"
                "過信しないよう注意を⚠️\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 どんぐり凶作とクマ被害の関係\n\n"
                "クマは秋にどんぐりを大量に食べて\n"
                "冬眠前の脂肪を蓄えます。\n\n"
                "どんぐり凶作年のデータ：\n"
                "📈 人里への出没が平年の2〜3倍\n"
                "📈 人身被害も増加傾向\n\n"
                "↓ 行政の対応は"
            ),
            (
                "環境省・各県は毎年秋に\n"
                "どんぐりの豊凶予測を行い\n"
                "警戒レベルを設定しています。\n\n"
                "凶作予報が出た年の秋は\n"
                "特に注意が必要です⚠️\n\n"
                "地域の注意喚起情報を\n"
                "こまめにチェックしてください。\n\n"
                "#クマ出没"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマの縄張りはこうして確認できる\n\n"
                "クマは木に爪や牙でひっかき傷をつけて\n"
                "縄張りを主張します。\n\n"
                "山道で見つけたら要注意のサイン：\n"
                "🪵 幹に深い縦のひっかき傷\n"
                "🪵 樹皮が剥がされた跡\n\n"
                "↓ 傷の高さが示すもの"
            ),
            (
                "背丈より高い位置にある傷ほど\n"
                "大型クマの可能性があります。\n\n"
                "爪跡・足跡・糞を見つけたら\n"
                "その場所はクマの生息地です。\n\n"
                "すぐに引き返し\n"
                "地元の行政機関へ報告を⚠️\n\n"
                "#クマ豆知識 #登山"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマと養蜂被害の実態\n\n"
                "クマはハチの巣を好んで食べます。\n"
                "（成虫・幼虫・蜜・巣すべて）\n\n"
                "KUMANUKEのデータでも養蜂被害は\n"
                "農業被害の中で件数が多いカテゴリです。\n\n"
                "↓ 効果的な対策は"
            ),
            (
                "養蜂箱へのクマ対策：\n\n"
                "✅ 電気柵の設置（最も効果的）\n"
                "✅ 地上から吊るす方法も有効\n"
                "✅ 近くに食料源を置かない\n\n"
                "一度標的になった場所には\n"
                "繰り返し来る傾向があります。\n"
                "早めの対策を⚡\n\n"
                "#クマ対策 #養蜂"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマの冬眠中に何が起きているのか\n\n"
                "冬眠中は「省エネモード」に移行：\n\n"
                "体温：通常より5〜8℃低下\n"
                "心拍数：毎分50回 → 8〜10回\n"
                "呼吸：毎分20回 → 2〜4回\n\n"
                "↓ 起こすことはできるのか"
            ),
            (
                "冬眠中でも物音には反応します。\n\n"
                "冬眠穴に近づくと突然飛び出してくる\n"
                "危険があります。\n\n"
                "山中で洞窟・木の根元の空洞・\n"
                "岩穴を見つけたら\n"
                "近づかず速やかに離れてください⚠️\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 日本のクマ人身被害の統計\n\n"
                "環境省データより：\n\n"
                "📊 年間被害者数：70〜240人\n"
                "📊 死亡者数：年間0〜10人\n"
                "📊 被害が多い職業：農林業・山菜採り\n"
                "📊 被害の多い月：10月（最多）\n\n"
                "↓ 近年の傾向は"
            ),
            (
                "2023年は過去最多水準を記録。\n"
                "2024〜2026年も高水準が続いています。\n\n"
                "被害者の多くは「まさか自分が」\n"
                "という状況での遭遇です。\n\n"
                "対策の見直しが急務⚠️\n"
                "最新データはKUMANUKEで確認できます。\n\n"
                "#クマ被害"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマはなぜ人を怖がらなくなったのか\n\n"
                "かつては「人の匂い＝危険」と\n"
                "学習していたクマが多かったのですが\n"
                "近年この認識が薄れています。\n\n"
                "↓ その原因は"
            ),
            (
                "主な原因：\n\n"
                "・山に入る人が減り遭遇機会が減少\n"
                "・追い払いをしない地域が増えた\n"
                "・人に慣れた個体の世代交代が進んだ\n\n"
                "「怖くないクマ」の増加が\n"
                "出没増加の大きな一因です。\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマと日本の山岳文化の関係\n\n"
                "日本ではクマは古来から\n"
                "山の神の使いとして畏れられてきました。\n\n"
                "・アイヌ民族のイヨマンテ（熊送り）\n"
                "・東北地方の熊野信仰\n"
                "・木彫り熊の民芸品\n\n"
                "↓ 現代の議論との関係"
            ),
            (
                "「駆除か共存か」の議論は\n"
                "単なる安全問題ではなく\n"
                "文化・信仰・生業とも深く絡んでいます。\n\n"
                "地域によって考え方が大きく異なる背景には\n"
                "こうした歴史的・文化的な要因があります。\n\n"
                "#クマ豆知識"
            ),
        ]
    },
    {
        "tweets": [
            (
                "🐻 クマの爪ってどのくらい強い？\n\n"
                "前爪の長さ：\n"
                "🔵 ヒグマ：最大15cm\n"
                "⚫ ツキノワグマ：最大8cm\n\n"
                "鋭い爪で厚い鉄板を曲げることができます。\n\n"
                "↓ 木登りへの影響は"
            ),
            (
                "ツキノワグマはこの爪で\n"
                "高さ10m以上の木にも登れます。\n\n"
                "「木に登れば安全」は\n"
                "大きな間違いです⚠️\n\n"
                "クマから逃げる時に\n"
                "木に登るのは逆効果になります。\n\n"
                "#クマ豆知識"
            ),
        ]
    },
]

# ═══════════════════════════════════════════════════════════════════════════
#  認証情報の読み込み
# ═══════════════════════════════════════════════════════════════════════════

def load_credentials():
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

# ═══════════════════════════════════════════════════════════════════════════
#  OAuth 1.0a 署名
# ═══════════════════════════════════════════════════════════════════════════

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


def post_tweet(text, creds, reply_to_id=None):
    """X API v2 でツイートを1件投稿。reply_to_id を指定するとスレッドになる"""
    url  = 'https://api.twitter.com/2/tweets'
    body = {'text': text}
    if reply_to_id:
        body['reply'] = {'in_reply_to_tweet_id': reply_to_id}
    body_bytes = json.dumps(body).encode('utf-8')
    auth = _build_oauth_header('POST', url, {}, creds)
    req  = urllib.request.Request(
        url, data=body_bytes,
        headers={
            'Authorization': auth,
            'Content-Type':  'application/json',
            'User-Agent':    'KumanukeBearBot/1.0',
        },
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode('utf-8'))


def post_thread(tweets, creds):
    """ツイートのリストをスレッドとして順番に投稿する"""
    assert_weights(tweets)
    reply_to = None
    results  = []
    for i, text in enumerate(tweets):
        result   = post_tweet(text, creds, reply_to_id=reply_to)
        tweet_id = result.get('data', {}).get('id')
        reply_to = tweet_id
        results.append(result)
        if i < len(tweets) - 1:
            time.sleep(60)  # 投稿間隔：最低1分
    return results

# ═══════════════════════════════════════════════════════════════════════════
#  データ取得ヘルパー
# ═══════════════════════════════════════════════════════════════════════════

def load_data():
    with open(DATA_FILE, encoding='utf-8') as f:
        return json.load(f)


def get_top_prefectures(data, n=3, since_days=7):
    cutoff = (date.today() - timedelta(days=since_days)).isoformat()
    counts = {}
    for d in data:
        if d.get('date', '') >= cutoff:
            p = d.get('prefecture', '')
            if p:
                counts[p] = counts.get(p, 0) + 1
    return sorted(counts.items(), key=lambda x: x[1], reverse=True)[:n]


def get_new_injury_records(since_days=8):
    data   = load_data()
    cutoff = (date.today() - timedelta(days=since_days)).isoformat()
    return sorted(
        [d for d in data if d.get('type') in ('人身被害', '人身') and d.get('date', '') >= cutoff],
        key=lambda x: x.get('date', ''),
        reverse=True,
    )


def already_posted(key):
    if not POSTED_FILE.exists():
        return False
    with open(POSTED_FILE, encoding='utf-8') as f:
        return key in json.load(f).get('ids', [])


def mark_posted(key):
    posted = {'ids': []}
    if POSTED_FILE.exists():
        with open(POSTED_FILE, encoding='utf-8') as f:
            posted = json.load(f)
    if key not in posted['ids']:
        posted['ids'].append(key)
        posted['ids'] = posted['ids'][-1000:]
    with open(POSTED_FILE, 'w', encoding='utf-8') as f:
        json.dump(posted, f, ensure_ascii=False, indent=2)

# ═══════════════════════════════════════════════════════════════════════════
#  投稿テンプレート（全て tweet リストを返す）
# ═══════════════════════════════════════════════════════════════════════════

def build_injury_alert_thread(record):
    """人身被害速報スレッド（3ツイート構成）"""
    pref     = record.get('prefecture', '')
    city     = record.get('city', '')
    dt       = record.get('date', '')
    title    = (record.get('title') or '')[:50]
    desc     = (record.get('description') or '')
    bear     = (record.get('bear_type') or 'クマ')
    pref_tag = pref.replace('県','').replace('道','').replace('府','').replace('都','')

    try:
        _, m, d_str = dt.split('-')
        dt_fmt = f"{int(m)}月{int(d_str)}日"
    except Exception:
        dt_fmt = dt

    # ツイート1：見出し＋最重要情報
    t1 = (
        f"⚠️【速報】{pref} クマによる人身被害\n\n"
        f"{dt_fmt}、{city}で発生。\n"
        f"{title}\n\n"
        f"詳細↓"
    )

    # ツイート2：詳細情報
    t2_lines = [f"【詳細】{pref} {city}・{dt_fmt}"]
    if desc:
        # descが長い場合は100字以内に収める
        short_desc = desc[:100] + ('…' if len(desc) > 100 else '')
        t2_lines += ["", short_desc]
    t2_lines += [
        "",
        f"🐻 {bear}",
        "",
        "最新の出没情報はプロフ欄のリンクから確認できます",
    ]
    t2 = '\n'.join(t2_lines)

    # ツイート3：対策
    t3 = (
        "【クマに遭遇した場合の対処法】\n\n"
        "✅ 静かにゆっくり後退する\n"
        "✅ 背中を向けて走らない\n"
        "✅ 目を合わせたまま大きく見せる\n"
        "✅ クマスプレーがあれば使用\n"
        "✅ 子グマを見たら即座に離れる\n\n"
        f"#クマ被害 #{pref_tag}"
    )

    return [t1, t2, t3]


def build_weekly_summary_thread(log_entry, data):
    """週次データサマリー（月曜・2ツイート）"""
    today      = date.today()
    week_start = today - timedelta(days=today.weekday())
    week_end   = week_start + timedelta(days=6)
    added      = log_entry.get('added', 0)
    total      = len(data)
    cy         = today.year
    cy_count   = sum(1 for d in data if d.get('date', '').startswith(str(cy)))
    top        = get_top_prefectures(data, n=3, since_days=7)
    medals     = ['🥇', '🥈', '🥉']

    # ツイート1：サマリー見出し＋トップ3
    t1_lines = [
        f"📊 今週のクマ出没まとめ（{week_start.month}/{week_start.day}〜{week_end.month}/{week_end.day}）",
        "",
        f"全国累計：{total:,}件（今週 +{added:,}件）",
        "",
        "今週の都道府県トップ3：",
    ]
    for i, (pref, cnt) in enumerate(top):
        t1_lines.append(f"{medals[i]} {pref}：{cnt}件")
    t1_lines.append("\n詳細↓")
    t1 = '\n'.join(t1_lines)

    # ツイート2：年間データ＋注意喚起
    t2 = (
        f"【{cy}年の出没状況】\n\n"
        f"・{cy}年の出没件数：{cy_count:,}件\n"
        f"・全国累計データ：{total:,}件（2000年〜）\n\n"
        "出没が多い時期・都道府県・時間帯など\n"
        "詳細データはプロフ欄のリンクから確認できます。\n\n"
        "#クマ出没"
    )

    return [t1, t2]


def build_educational_thread():
    """教育・豆知識スレッド（水曜・2ツイート）"""
    week_num = date.today().isocalendar()[1]
    return BEAR_FACTS[week_num % len(BEAR_FACTS)]['tweets']


def build_comparison_thread():
    """比較系スレッド（火曜・2ツイート）"""
    week_num = date.today().isocalendar()[1]
    return BEAR_COMPARISONS[week_num % len(BEAR_COMPARISONS)]['tweets']


def build_educational_thread_thu():
    """豆知識その2スレッド（木曜・2ツイート）"""
    week_num = date.today().isocalendar()[1]
    return BEAR_FACTS_2[week_num % len(BEAR_FACTS_2)]['tweets']


def build_prefecture_focus_thread(data):
    """都道府県フォーカス（金曜・2ツイート）"""
    top = get_top_prefectures(data, n=5, since_days=7)
    if not top:
        return None

    top_pref, top_cnt = top[0]
    cy      = date.today().year
    cy_data = [d for d in data if d.get('prefecture') == top_pref and d.get('date','').startswith(str(cy))]
    cy_cnt  = len(cy_data)

    city_counts = {}
    for d in cy_data:
        c = d.get('city', '')
        if c:
            city_counts[c] = city_counts.get(c, 0) + 1
    top_cities = sorted(city_counts.items(), key=lambda x: x[1], reverse=True)[:3]
    pref_tag   = top_pref.replace('県','').replace('道','').replace('府','').replace('都','')

    # ツイート1：見出し＋今週データ
    t1_lines = [
        f"📍 今週の注目エリア：{top_pref}",
        "",
        f"今週の出没件数：{top_cnt}件（全国1位）",
        f"{cy}年累計：{cy_cnt:,}件",
        "",
        "詳細↓",
    ]
    t1 = '\n'.join(t1_lines)

    # ツイート2：市区町村詳細＋注意喚起
    t2_lines = [f"【{top_pref}・{cy}年 出没上位市区町村】", ""]
    for city, cnt in top_cities:
        t2_lines.append(f"・{city}：{cnt}件")
    t2_lines += [
        "",
        f"{top_pref}にお住まいの方は",
        "外出時に十分ご注意ください⚠️",
        "",
        f"#クマ出没 #{pref_tag}",
    ]
    t2 = '\n'.join(t2_lines)

    return [t1, t2]


def build_seasonal_thread(season):
    """シーズン開始告知（3/1 春・9/1 秋・2ツイート）"""
    if season == 'autumn':
        t1 = (
            "🍂 クマ出没シーズンが始まります\n\n"
            "9〜11月は年間出没の約47%が集中する\n"
            "最も危険な時期です。\n\n"
            "山菜・キャンプ・登山の前に\n"
            "必ず地域の出没情報を確認してください⚠️\n\n"
            "詳細↓"
        )
        t2 = (
            "【KUMANUKEで確認できること】\n\n"
            "✅ 全国出没マップ（11万件超）\n"
            "✅ 都道府県別件数ランキング\n"
            "✅ 週次トレンドレポート\n"
            "✅ 対策ガイド35本以上\n\n"
            f"👉 {SITE_URL}\n\n"
            "#クマ出没 #クマ対策"
        )
    else:
        t1 = (
            "🌱 クマが冬眠から目覚める季節です\n\n"
            "3〜5月は冬眠明けで空腹なクマが\n"
            "活発に食料を探します。\n\n"
            "山菜採りの時期と重なるため\n"
            "この時期は特に注意が必要です⚠️\n\n"
            "詳細↓"
        )
        t2 = (
            "【春のクマ対策ポイント】\n\n"
            "✅ 山菜採りは複数人で行く\n"
            "✅ クマ鈴・クマスプレーを携帯\n"
            "✅ 早朝・夕方は特に注意\n"
            "✅ 地域の出没情報を事前確認\n\n"
            f"最新情報: {SITE_URL}\n\n"
            "#クマ出没 #山菜採り"
        )
    return [t1, t2]

# ═══════════════════════════════════════════════════════════════════════════
#  メイン処理
# ═══════════════════════════════════════════════════════════════════════════

def main():
    today   = date.today()
    weekday = today.weekday()
    day_jp  = ['月', '火', '水', '木', '金', '土', '日'][weekday]

    print(f"=== X 自動投稿 ({today} {day_jp}曜日) ===")

    creds = load_credentials()
    if not creds:
        print("⚠ X API の認証情報が設定されていません。")
        print("  scripts/x_credentials.json に保存してください。")
        return

    data         = load_data()
    posted_count = 0

    # ── ① 人身被害速報（毎日チェック・最大3件）──────────────────────────────
    print("\n[速報チェック]")
    new_injuries  = get_new_injury_records(since_days=8)
    injury_posted = 0
    for rec in new_injuries[:3]:
        rid = rec.get('id', '')
        if rid and not already_posted(rid):
            try:
                tweets = build_injury_alert_thread(rec)
                results = post_thread(tweets, creds)
                print(f"  ✓ 人身被害速報スレッド({len(tweets)}件): {rec.get('prefecture')} {rec.get('date')}")
                print(f"    tweet_id: {results[0].get('data',{}).get('id')}")
                mark_posted(rid)
                injury_posted += 1
                posted_count  += 1
                time.sleep(60)  # 投稿間隔：最低1分
            except Exception as e:
                print(f"  ⚠ 速報投稿エラー: {e}")
    if injury_posted == 0:
        print("  - 新着の人身被害なし（スキップ）")

    # ── ② シーズン告知（3/1 または 9/1）────────────────────────────────────
    seasonal_key    = None
    seasonal_tweets = None
    if today.month == 9 and today.day == 1:
        seasonal_key    = f"seasonal_autumn_{today.year}"
        seasonal_tweets = build_seasonal_thread('autumn')
    elif today.month == 3 and today.day == 1:
        seasonal_key    = f"seasonal_spring_{today.year}"
        seasonal_tweets = build_seasonal_thread('spring')

    if seasonal_key and not already_posted(seasonal_key):
        print("\n[シーズン告知]")
        try:
            results = post_thread(seasonal_tweets, creds)
            print(f"  ✓ シーズン告知スレッド投稿: {seasonal_key}")
            print(f"    tweet_id: {results[0].get('data',{}).get('id')}")
            mark_posted(seasonal_key)
            posted_count += 1
            time.sleep(60)  # 投稿間隔：最低1分
        except Exception as e:
            print(f"  ⚠ シーズン告知エラー: {e}")

    # ── ③ 曜日別定期投稿 ────────────────────────────────────────────────────
    print(f"\n[{day_jp}曜日の定期投稿]")

    if weekday == 0:
        # 月曜：週次データサマリー
        key = f"weekly_summary_{today.isoformat()}"
        if not already_posted(key):
            try:
                log_entry = {}
                if LOG_FILE.exists():
                    with open(LOG_FILE, encoding='utf-8') as f:
                        log = json.load(f)
                    if log:
                        log_entry = log[-1]
                tweets  = build_weekly_summary_thread(log_entry, data)
                results = post_thread(tweets, creds)
                print(f"  ✓ 週次サマリースレッド投稿（累計 {len(data):,}件）")
                print(f"    tweet_id: {results[0].get('data',{}).get('id')}")
                mark_posted(key)
                posted_count += 1
            except Exception as e:
                print(f"  ⚠ 週次サマリーエラー: {e}")
        else:
            print("  - 週次サマリーは本日投稿済み（スキップ）")

    elif weekday == 1:
        # 火曜：比較系
        week_num = today.isocalendar()[1]
        key = f"comparison_w{week_num}_{today.year}"
        if not already_posted(key):
            try:
                tweets  = build_comparison_thread()
                results = post_thread(tweets, creds)
                print(f"  ✓ 比較系スレッド投稿（Week {week_num}）")
                print(f"    tweet_id: {results[0].get('data',{}).get('id')}")
                mark_posted(key)
                posted_count += 1
            except Exception as e:
                print(f"  ⚠ 比較系エラー: {e}")
        else:
            print("  - 比較系は今週投稿済み（スキップ）")

    elif weekday == 2:
        # 水曜：教育・豆知識
        week_num = today.isocalendar()[1]
        key = f"educational_w{week_num}_{today.year}"
        if not already_posted(key):
            try:
                tweets  = build_educational_thread()
                results = post_thread(tweets, creds)
                print(f"  ✓ 豆知識スレッド投稿（Week {week_num}）")
                print(f"    tweet_id: {results[0].get('data',{}).get('id')}")
                mark_posted(key)
                posted_count += 1
            except Exception as e:
                print(f"  ⚠ 豆知識エラー: {e}")
        else:
            print("  - 豆知識は今週投稿済み（スキップ）")

    elif weekday == 3:
        # 木曜：豆知識その2
        week_num = today.isocalendar()[1]
        key = f"educational2_w{week_num}_{today.year}"
        if not already_posted(key):
            try:
                tweets  = build_educational_thread_thu()
                results = post_thread(tweets, creds)
                print(f"  ✓ 豆知識2スレッド投稿（Week {week_num}）")
                print(f"    tweet_id: {results[0].get('data',{}).get('id')}")
                mark_posted(key)
                posted_count += 1
            except Exception as e:
                print(f"  ⚠ 豆知識2エラー: {e}")
        else:
            print("  - 豆知識2は今週投稿済み（スキップ）")

    elif weekday == 4:
        # 金曜：都道府県フォーカス
        week_num = today.isocalendar()[1]
        key = f"pref_focus_w{week_num}_{today.year}"
        if not already_posted(key):
            try:
                tweets = build_prefecture_focus_thread(data)
                if tweets:
                    results = post_thread(tweets, creds)
                    print("  ✓ 都道府県フォーカススレッド投稿")
                    print(f"    tweet_id: {results[0].get('data',{}).get('id')}")
                    mark_posted(key)
                    posted_count += 1
                else:
                    print("  - 今週のデータが不足（スキップ）")
            except Exception as e:
                print(f"  ⚠ フォーカスエラー: {e}")
        else:
            print("  - フォーカスは今週投稿済み（スキップ）")

    else:
        print(f"  - {day_jp}曜日は定期投稿なし（土・日）")

    print(f"\n投稿完了: {posted_count}件")


if __name__ == '__main__':
    main()
