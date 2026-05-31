#!/usr/bin/env python3
"""
X（Twitter）自動投稿スクリプト - 改修版

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


# ── 比較系コンテンツ（週番号でローテーション）────────────────────────────────
BEAR_COMPARISONS = [
    {
        "body": (
            "🆚 ヒグマ vs ツキノワグマ【体格比較】\n\n"
            "🔵 ヒグマ（北海道のみ）\n"
            "体重100〜400kg／体長最大2.5m\n\n"
            "⚫ ツキノワグマ（本州・四国）\n"
            "体重50〜150kg／体長最大1.5m\n\n"
            "走力はどちらも時速50km超。\n"
            "人間が逃げ切ることは不可能です⚠️\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🆚 春のクマ vs 秋のクマ【危険シーズン比較】\n\n"
            "🌸 春（3〜5月）\n"
            "冬眠明けで空腹・山菜採りと時期が重複\n\n"
            "🍂 秋（9〜11月）\n"
            "年間出没の約47%が集中\n"
            "どんぐり凶作年はさらに増加\n\n"
            "出没件数は断然「秋＞春」です\n\n"
            "#クマ出没"
        ),
    },
    {
        "body": (
            "🆚 クマ鈴 vs 熊よけスプレー【効果比較】\n\n"
            "🔔 クマ鈴\n"
            "✅ 事前に存在を知らせる\n"
            "⚠️ 川沿い・風下では音が届きにくい\n\n"
            "🧴 熊よけスプレー\n"
            "✅ 至近距離7m以内で高い効果\n"
            "⚠️ 風向きを確認して使用\n\n"
            "最強は両方の併用です\n\n"
            "#クマ対策"
        ),
    },
    {
        "body": (
            "🆚 母グマ vs 単独グマ【危険度比較】\n\n"
            "👶 子連れ母グマ\n"
            "攻撃性が通常の数倍〜十数倍\n"
            "子を守るため突然攻撃することも\n\n"
            "🐻 単独グマ\n"
            "通常は人を避けようとする\n"
            "驚かせなければ攻撃は少ない\n\n"
            "子グマを見たら即座に離れてください🚫\n\n"
            "#クマ対策"
        ),
    },
    {
        "body": (
            "🆚 日本 vs アメリカ vs インド\n"
            "【クマ人身被害の国際比較】\n\n"
            "🇯🇵 日本：年間100〜200件\n"
            "🇺🇸 アメリカ：年間40〜50件（公園内）\n"
            "🇮🇳 インド：ナマケグマ被害700件超\n\n"
            "件数だけ見ると日本は多い方です。\n"
            "生息域と人口が重なりやすいのが原因⚠️\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🆚 電気柵あり vs なし【農業被害の差】\n\n"
            "📊 研究データより：\n\n"
            "❌ 電気柵なし：被害発生率 高\n"
            "✅ 電気柵あり：被害を最大90%削減\n\n"
            "補助金制度がある自治体も多数あり\n\n"
            "農業従事者への最も費用対効果が\n"
            "高い対策のひとつです⚡\n\n"
            "#クマ対策 #農業"
        ),
    },
    {
        "body": (
            "🆚 冬眠前 vs 冬眠明け【クマの状態比較】\n\n"
            "🍂 冬眠前（秋）\n"
            "1日20時間食べ続ける時期も\n"
            "食料を求めて人里に来やすい\n\n"
            "🌸 冬眠明け（春）\n"
            "体力回復中で動きは比較的少ない\n"
            "ただし空腹で気性は荒め\n\n"
            "出没リスクは秋の方が圧倒的に高い\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🆚 ヒグマ vs グリズリー vs ホッキョクグマ\n"
            "【世界最大クマ比較】\n\n"
            "🐻 ヒグマ（ユーラシア・北米）\n"
            "体重最大600kg\n\n"
            "🐻 グリズリー（北米内陸）\n"
            "体重最大360kg・気性激しい\n\n"
            "🧊 ホッキョクグマ\n"
            "体重最大700kg・世界最大の陸上肉食獣\n\n"
            "日本のヒグマは世界最大級クラスです\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🆚 目撃のみ vs 農業被害 vs 人身被害\n"
            "【出没タイプ別の割合】\n\n"
            "KUMANUKEのデータ（11万件超）より：\n\n"
            "👀 目撃・痕跡：約65%\n"
            "🌽 農業・養蜂被害：約30%\n"
            "🔴 人身被害：約5%\n\n"
            "人身被害は5%ですが近年は増加傾向⚠️\n\n"
            "#クマ出没"
        ),
    },
    {
        "body": (
            "🆚 山間部 vs 市街地【出没場所の変化】\n\n"
            "📊 10年前：出没の90%以上が山間部\n\n"
            "📊 近年：住宅街・市街地での出没が増加\n\n"
            "背景：\n"
            "・個体数増加と生息域拡大\n"
            "・耕作放棄地の増加\n"
            "・人の気配に慣れたクマの増加\n\n"
            "「山に入らなければ安全」は過去の話です\n\n"
            "#クマ出没"
        ),
    },
    {
        "body": (
            "🆚 昼間 vs 夜間【クマの活動時間帯比較】\n\n"
            "KUMANUKEのデータによる傾向：\n\n"
            "🌅 最多：早朝（日の出前後）\n"
            "🌆 次点：夕暮れ時\n"
            "☀️ 昼間：比較的少ない\n"
            "🌙 深夜：農業被害は夜間も多い\n\n"
            "早朝・夕方の山道・農地での\n"
            "行動には特に注意を⚠️\n\n"
            "#クマ対策"
        ),
    },
    {
        "body": (
            "🆚 クマよけグッズ【効果比較ランキング】\n\n"
            "専門家・研究による評価：\n\n"
            "🥇 熊よけスプレー\n"
            "　至近距離での撃退効果が最も高い\n\n"
            "🥈 爆竹・ホイッスル\n"
            "　接近前の追い払いに有効\n\n"
            "🥉 クマ鈴\n"
            "　事前の存在アピールとして有効\n\n"
            "ライト系はほぼ効果なし\n\n"
            "#クマ対策"
        ),
    },
]

# ── 豆知識その2（木曜用・週番号でローテーション）──────────────────────────────
BEAR_FACTS_2 = [
    {
        "body": (
            "🐻 クマの寿命はどのくらい？\n\n"
            "⚫ ツキノワグマ（野生）：10〜25年\n"
            "🔵 ヒグマ（野生）：20〜30年\n"
            "飼育下では40年生きる個体も\n\n"
            "長寿なほど「ベテラン」で\n"
            "人の生活パターンを学習済みの可能性大。\n"
            "要注意な存在です⚠️\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 クマはどのくらい賢いのか？\n\n"
            "クマの知能は霊長類に匹敵するとも言われます。\n\n"
            "✅ ゴミ箱の開け方を学習し何度も来る\n"
            "✅ 電気柵の電源を切る方法を覚えた例も\n"
            "✅ 人間の生活リズムを把握して行動\n\n"
            "「賢いクマ」ほど被害が繰り返されます。\n"
            "一度成功させないことが最大の対策です\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 クマの感覚を数字で比べると\n\n"
            "嗅覚：犬の7倍（数km先から察知）\n"
            "聴覚：人間の約2倍\n"
            "視覚：人間とほぼ同等（色覚あり）\n\n"
            "「クマは視力が悪い」はよくある誤解。\n"
            "実際には色も形もよく見えています。\n\n"
            "嗅覚が圧倒的なため\n"
            "匂い対策が最も効果的です⚠️\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 クマは泳げるのか？\n\n"
            "答え：得意です。\n\n"
            "ヒグマは川での魚（サーモン）漁が有名。\n"
            "ツキノワグマも川・池を平気で渡ります。\n\n"
            "⚠️ 川を天然の柵として\n"
            "「川の向こうなら安全」と考えるのは危険。\n\n"
            "島にクマが泳いで上陸した記録もあります\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 どんぐり凶作とクマ被害の関係\n\n"
            "クマは秋にどんぐりを大量に食べて\n"
            "冬眠前の脂肪を蓄えます。\n\n"
            "どんぐり凶作年のデータ：\n"
            "📈 人里への出没が平年の2〜3倍に増加\n"
            "📈 人身被害も増加傾向\n\n"
            "環境省・各県はどんぐりの豊凶を\n"
            "毎年予測して警戒レベルを設定しています⚠️\n\n"
            "#クマ出没"
        ),
    },
    {
        "body": (
            "🐻 クマの縄張りはこうして確認できる\n\n"
            "クマは木に爪や牙でひっかき傷をつけて\n"
            "縄張りを主張します。\n\n"
            "山道で見つけたら要注意のサイン：\n"
            "🪵 幹に深い縦のひっかき傷\n"
            "🪵 樹皮が剥がされた跡\n"
            "🪵 背丈より高い位置にある傷\n\n"
            "高い位置の傷ほど大型クマの可能性\n\n"
            "#クマ豆知識 #登山"
        ),
    },
    {
        "body": (
            "🐻 クマと養蜂被害の実態\n\n"
            "クマはハチの巣を好んで食べます。\n"
            "（成虫・幼虫・蜜・巣すべて）\n\n"
            "KUMANUKEのデータでも養蜂被害は\n"
            "農業被害の中で件数が多いカテゴリです。\n\n"
            "養蜂箱への対策：\n"
            "✅ 電気柵の設置が最も効果的\n"
            "✅ 地上から吊るす方法も有効\n\n"
            "#クマ対策 #養蜂"
        ),
    },
    {
        "body": (
            "🐻 クマの冬眠中に何が起きているのか\n\n"
            "冬眠中のクマは「省エネモード」に移行：\n\n"
            "体温：通常より5〜8℃低下\n"
            "心拍数：毎分50回 → 8〜10回に低下\n"
            "呼吸：毎分20回 → 2〜4回に低下\n\n"
            "この間も物音に反応して目を覚まします。\n"
            "冬眠穴には絶対に近づかないこと⚠️\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 日本のクマ人身被害の統計\n\n"
            "環境省データより：\n\n"
            "📊 年間被害者数：70〜240人\n"
            "📊 死亡者数：年間0〜10人\n"
            "📊 多い職業：農林業従事者・山菜採り\n"
            "📊 被害の多い月：10月（最多）\n\n"
            "2023年は過去最多水準を記録。\n"
            "対策の見直しが急務です⚠️\n\n"
            "#クマ被害"
        ),
    },
    {
        "body": (
            "🐻 クマはなぜ人を怖がらなくなったのか\n\n"
            "かつては「人の匂い＝危険」と学習していたが\n"
            "近年この認識が薄れています。\n\n"
            "原因：\n"
            "・山に入る人が減り遭遇回数が減少\n"
            "・追い払いをしない地域が増えた\n"
            "・人に慣れた個体の世代交代が進んだ\n\n"
            "「怖くないクマ」の増加が出没増の一因\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 クマと日本の山岳文化の関係\n\n"
            "日本ではクマは古来から\n"
            "山の神の使いとして畏れられてきました。\n\n"
            "・アイヌ民族のイヨマンテ（熊送り）\n"
            "・東北地方の熊野信仰\n"
            "・クマをモチーフにした木彫り民芸品\n\n"
            "「駆除か共存か」の議論は\n"
            "文化的背景とも深く絡んでいます\n\n"
            "#クマ豆知識"
        ),
    },
    {
        "body": (
            "🐻 クマの爪ってどのくらい強い？\n\n"
            "ヒグマの前爪の長さ：最大15cm\n"
            "ツキノワグマ：最大8cm\n\n"
            "鋭い爪で厚い鉄板を曲げることができます。\n\n"
            "木登りにも使われるため\n"
            "ツキノワグマは高さ10m以上まで登れます。\n\n"
            "「木に登れば安全」は大きな間違いです⚠️\n\n"
            "#クマ豆知識"
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


def build_comparison_tweet():
    """比較系投稿（火曜 07:00 / 週番号でローテーション）"""
    week_num = date.today().isocalendar()[1]
    return BEAR_COMPARISONS[week_num % len(BEAR_COMPARISONS)]['body']


def build_educational_tweet_thu():
    """豆知識その2（木曜 07:00 / 週番号でローテーション・水曜とズラす）"""
    week_num = date.today().isocalendar()[1]
    return BEAR_FACTS_2[week_num % len(BEAR_FACTS_2)]['body']


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

    elif weekday == 1:
        # 火曜：比較系投稿
        week_num = today.isocalendar()[1]
        comp_key = f"comparison_w{week_num}_{today.year}"
        if not already_posted(comp_key):
            try:
                text   = build_comparison_tweet()
                result = post_tweet(text, creds)
                print(f"  ✓ 比較系投稿（Week {week_num} / {len(BEAR_COMPARISONS)}種ローテーション）")
                print(f"    tweet_id: {result.get('data', {}).get('id')}")
                mark_posted(comp_key)
                posted_count += 1
            except Exception as e:
                print(f"  ⚠ 比較系投稿エラー: {e}")
        else:
            print("  - 比較系投稿は今週投稿済み（スキップ）")

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

    elif weekday == 3:
        # 木曜：豆知識その2
        week_num  = today.isocalendar()[1]
        edu2_key  = f"educational2_w{week_num}_{today.year}"
        if not already_posted(edu2_key):
            try:
                text   = build_educational_tweet_thu()
                result = post_tweet(text, creds)
                print(f"  ✓ 豆知識（木曜）投稿（Week {week_num} / {len(BEAR_FACTS_2)}種ローテーション）")
                print(f"    tweet_id: {result.get('data', {}).get('id')}")
                mark_posted(edu2_key)
                posted_count += 1
            except Exception as e:
                print(f"  ⚠ 豆知識（木曜）投稿エラー: {e}")
        else:
            print("  - 豆知識（木曜）は今週投稿済み（スキップ）")

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
        print(f"  - {day_jp}曜日は定期投稿なし（土・日）")

    print(f"\n投稿完了: {posted_count}件")


if __name__ == '__main__':
    main()
