'use client'

import Link from 'next/link'
import { useState } from 'react'

type Category = 'LAB' | 'GUIDE' | 'DATA' | 'WORLD' | 'NEWS'

// カテゴリ別の目安読了時間（分）
const READING_MINUTES: Record<Category, number> = {
  LAB: 10, GUIDE: 7, DATA: 5, WORLD: 8, NEWS: 4,
}

const articles: {
  slug: string
  title: string
  description: string
  tag: string
  tagColor: string
  category: Category
}[] = [
  {
    slug: 'bear-olfactory-science',
    title: '熊が匂いで近づかない理由｜嗅覚の仕組みと忌避メカニズムを科学的に解説',
    description: '熊の嗅覚は犬の7倍・人間の2100倍。WSU・東京大学・化学生態学誌など国内外の研究が示す、匂いによる熊の行動制御メカニズムと植物由来成分が注目される科学的根拠を解説。',
    tag: '科学・研究',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'smells-bears-dislike',
    title: 'クマが嫌いな匂いとは｜忌避成分の種類・作用と研究事例',
    description: 'カプサイシン・木酢液・精油成分など、クマの嗅覚特性を利用した忌避アプローチの原理と研究事例を解説。東京大学名誉教授監修による実地試験の結果も紹介。',
    tag: '科学・研究',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'bear-spray-accidents',
    title: '熊スプレーの誤噴射事故と法的リスク｜正しい熊対策の選び方',
    description: '2026年・JR多度津駅で8名負傷など、熊撃退スプレーの誤噴射事故が相次いでいます。護身用スプレーとエリア散布型の違い、法的リスクと正しい対策を解説します。',
    tag: '安全・リスク',
    tagColor: '#DC2626',
    category: 'GUIDE',
  },
  {
    slug: 'bear-spray-transportation-rules',
    title: '熊スプレーは飛行機・新幹線に持ち込めるか｜国内外の運搬ルール完全ガイド',
    description: '飛行機は機内持込み・受託手荷物いずれも不可。新幹線・宅配便の取り扱いや現地調達の方法など、登山旅行前に知っておくべき運搬ルールを詳しく解説します。',
    tag: '実用・ルール',
    tagColor: '#92400E',
    category: 'GUIDE',
  },
  {
    slug: 'bear-bell-effectiveness',
    title: '熊鈴の効果と限界｜科学的研究が示す正しい使い方と補完すべき対策',
    description: 'トム・スミス博士の実験データや環境省ガイドラインをもとに、熊鈴の効果と機能しにくい状況を解説。熊鈴だけに頼らない多層的な対策の組み方を紹介します。',
    tag: '科学・研究',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'camping-bear-prevention',
    title: 'キャンプ場・野営地での熊対策完全ガイド',
    description: 'テントサイト周辺への事前散布から食料管理まで、キャンプ中の熊遭遇リスクを下げる実践的な方法を解説します。',
    tag: 'キャンプ・登山',
    tagColor: '#1F5C2E',
    category: 'GUIDE',
  },
  {
    slug: 'hiking-bear-prevention',
    title: '登山・トレッキングでの熊対策｜山でのリスクを下げる方法',
    description: '登山道・野営地・山小屋周辺での熊遭遇リスク低減策。入山前にできる事前対策とKUMANUKEの活用方法を解説します。',
    tag: 'キャンプ・登山',
    tagColor: '#1F5C2E',
    category: 'GUIDE',
  },
  {
    slug: 'farm-bear-prevention',
    title: '農地・畑を熊から守る方法｜農家のための熊対策',
    description: '農作物被害を防ぐための農地外周散布・収穫前の対策など、農業従事者向けの熊忌避対策を詳しく解説します。',
    tag: '農業・農地',
    tagColor: '#92400E',
    category: 'GUIDE',
  },
  {
    slug: 'garbage-bear-prevention',
    title: 'ゴミ置き場・住宅地の熊対策｜自治体・集合住宅向け',
    description: 'ゴミの匂いに誘引される熊への対策。自治体・マンション管理組合・集合住宅向けのエリア散布型対策を解説します。',
    tag: '住宅・自治体',
    tagColor: '#1E40AF',
    category: 'GUIDE',
  },
  {
    slug: 'how-to-choose-bear-repellent',
    title: '熊よけスプレーの種類と選び方｜護身用と事前散布型の違い',
    description: '護身用の熊撃退スプレーとエリア散布型の忌避スプレーは目的が異なります。用途に合った製品の選び方を解説します。',
    tag: '製品知識',
    tagColor: '#6B21A8',
    category: 'GUIDE',
  },
  {
    slug: 'preventive-bear-approach',
    title: '予防型クマ対策とは何か｜事後対応ではなく事前接近抑制の考え方',
    description: '護身型スプレーや熊鈴とは異なる「そもそもクマを近づけない」予防型アプローチの考え方と実践手法。農地・住宅・アウトドア全シーンに対応した対策設計を解説。',
    tag: '対策・予防',
    tagColor: '#1F5C2E',
    category: 'GUIDE',
  },
  {
    slug: 'why-bears-come-to-towns',
    title: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説',
    description: 'ナラ枯れ・里山荒廃・ドングリ凶作・個体数回復など、クマ出没が急増する複合的な背景を科学的視点から解説。問題の本質を理解した上での対策立案に役立てください。',
    tag: '生態・行動',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'bear-seasonal-activity',
    title: 'クマの年間活動パターン｜季節ごとの行動変化と出没リスクカレンダー',
    description: '春の冬眠明けから秋の過食期まで、クマの月別活動強度と出没リスクを解説。いつ・どこで・どんな状況でリスクが高まるかを理解して季節ごとの対策に活かせます。',
    tag: '生態・行動',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'tsuki-no-wa-kuma-vs-higuma',
    title: 'ツキノワグマとヒグマの違い｜分布・体格・生態・危険性を徹底比較',
    description: '本州・四国のツキノワグマと北海道のヒグマの違いを体格・食性・習性・危険性・必要な対策の観点から徹底比較。自分の地域に合った対策選びに役立てください。',
    tag: '生態・行動',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'japan-bear-damage-statistics',
    title: '日本のクマ被害統計2025-2026｜過去最多238人・死者13人の実態と背景',
    description: '2025年度の環境省集計でクマ被害は238人・13人死亡と過去最多を更新。出没5万件超の実態を月別・都道府県別データとともに解説。増加背景と今後の対策の方向性も考察。',
    tag: 'データ・統計',
    tagColor: '#1E40AF',
    category: 'DATA',
  },
  {
    slug: 'satoyama-bear-human-coexistence',
    title: '里山と人獣共存問題｜クマ被害が増える構造的背景と共存への道',
    description: '里山の荒廃・農村人口減少・ナラ枯れなどクマ被害増加の構造的背景を解説。「駆除か保護か」を超えた科学的・社会的アプローチと、海外の共存事例を紹介します。',
    tag: '社会・政策',
    tagColor: '#1E40AF',
    category: 'LAB',
  },
  {
    slug: 'international-bear-management',
    title: '海外のクマ対策研究・管理事例｜北米・ヨーロッパの知見から学ぶ',
    description: 'カナダのBear SmartプログラムからイエローストーンのGPS管理、スウェーデンの個体数管理まで。海外の先行事例が示す「共存の条件」と日本への示唆を解説します。',
    tag: '科学・研究',
    tagColor: '#0C5C3E',
    category: 'WORLD',
  },
  {
    slug: 'bear-learning-behavior',
    title: 'クマの学習能力と認知行動｜なぜ同じ場所に繰り返し来るのか',
    description: '空間記憶・報酬学習・習慣化・問題解決行動・条件付け嫌悪。哺乳類研究が明かすクマの認知能力と、学習行動を踏まえた対策設計の考え方を解説します。',
    tag: '野生動物行動学',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'abandoned-fruit-trees-bear-damage',
    title: '放置果樹・放任果樹が熊を呼ぶ｜農村の誘引源管理と対策',
    description: '収穫されない柿・栗・リンゴが高カロリーの誘引源となりクマを集落へ引き寄せるメカニズムを解説。農林水産省・環境省の管理指針と各地の補助金制度も紹介します。',
    tag: '農業・農地',
    tagColor: '#92400E',
    category: 'GUIDE',
  },
  {
    slug: 'bear-home-range',
    title: 'クマの行動圏・ホームレンジとは｜GPS追跡が明かす移動距離と出没パターン',
    description: 'GPS追跡データが示すクマのホームレンジは地域・性別により数十〜数百km²超。日光・奥多摩・北アルプス等の国内データと、ホームレンジが対策設計に持つ意味を解説します。',
    tag: '野生動物行動学',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'non-lethal-bear-management',
    title: '非致死型クマ対策の体系｜移送・条件付け嫌悪・忌避・電気柵の科学',
    description: 'IUCNが推奨する段階的対応方針を軸に、トランスロケーション・aversive conditioning・忌避剤・電気柵を比較解説。駆除に頼らない管理手法の科学的根拠と限界を整理します。',
    tag: 'Wildlife Management',
    tagColor: '#1E40AF',
    category: 'WORLD',
  },
  {
    slug: 'olfactory-repellent-research',
    title: 'Olfactory Repellent研究の最前線｜嗅覚忌避を科学する国際的アプローチ',
    description: 'TRPV1受容体・USDA・WSU・東京大学など国内外の研究が示す嗅覚忌避の機序を解説。Primary／Secondary／Conditioned repellentの3分類と化合物特性の比較も紹介します。',
    tag: '海外研究・論文解説',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'climate-change-bears',
    title: '気候変動とクマ出没｜温暖化が熊の行動・生息域・冬眠に与える影響',
    description: '冬眠期間の短縮・ドングリ豊凶サイクルの変化・生息域の北方シフト。東京農工大研究や北米・北欧の事例から、気候変動がクマと人の接触リスクをどう変えるかを解説します。',
    tag: '環境・社会',
    tagColor: '#1E40AF',
    category: 'WORLD',
  },
  {
    slug: 'electric-fence-bear-prevention',
    title: '電気柵によるクマ対策｜設置の科学・有効性の研究・補助金制度',
    description: 'スロベニア90%超削減・国内80%以上削減のデータが示す電気柵の有効性。6,000〜10,000V設定の根拠・設置要件・メンテナンス・農林水産省補助金制度を詳しく解説します。',
    tag: '対策・予防',
    tagColor: '#1F5C2E',
    category: 'GUIDE',
  },
  {
    slug: 'bear-scent-marking',
    title: 'クマの嗅覚コミュニケーション｜匂いによる縄張り・情報伝達の仕組み',
    description: 'スクラッチマーク・尿マーキング・顔こすりつけなどクマの匂い行動をGC-MS分析の知見から解説。脂肪酸・揮発性アミン・テルペン類の機能と忌避アプローチへの示唆を紹介します。',
    tag: '野生動物行動学',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  // ── 8 new articles ───────────────────────────────────────────────────────
  {
    slug: 'bear-hibernation',
    title: 'クマの冬眠メカニズム｜生理学・脂肪代謝・目覚めの危険性を科学的に解説',
    description: '心拍10bpmまで低下、体温はわずか4〜6℃の低下——クマの冬眠は哺乳類最大の生理的謎のひとつ。脂肪代謝の仕組み・過食期・巣穴環境・目覚め後の行動変化を科学的に解説します。',
    tag: '生態・行動',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'bear-diet-ecology',
    title: 'クマの食性と採食生態｜季節別食料戦略と出没リスクの関係',
    description: '植物70-85%・昆虫10-20%・脊椎動物3-8%。月別採食カレンダーとドングリ凶作年の出没急増メカニズムを解説。食料依存学習の4段階サイクルと農業被害の構造的背景も詳述。',
    tag: '生態・行動',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'bear-reproduction-cubs',
    title: 'クマの繁殖と母子行動｜なぜ母グマは最も危険なのか',
    description: '交尾期は5〜7月（登山シーズンと完全に重複）、着床遅延、1〜2月の出産、1.5〜2.5年の養育期間——繁殖生態の全容と、母グマ遭遇が最危険シナリオである4つの理由を解説。',
    tag: '生態・行動',
    tagColor: '#0C5C3E',
    category: 'LAB',
  },
  {
    slug: 'canada-bear-smart',
    title: 'カナダBear Smartプログラム｜人と熊の共存を実現した政策モデル',
    description: 'BC州の殺処分を90%削減したウィスラーの成功。認証5要件（ゴミ管理・教育・誘引源除去・移動経路・対応プロトコル）の具体的な内容と日本への示唆をデータとともに解説。',
    tag: '海外政策・共存',
    tagColor: '#7C3AED',
    category: 'WORLD',
  },
  {
    slug: 'north-america-bear-spray',
    title: '北米のベアスプレー文化｜義務化・研究・効果の科学',
    description: 'Tom Smith博士の83件実証研究で97.9%の攻撃阻止率。国立公園での義務化・銃との比較データ・日本との文化差——北米でスプレーが標準装備になった科学的根拠と社会的背景を解説。',
    tag: '海外研究・文化',
    tagColor: '#7C3AED',
    category: 'WORLD',
  },
  {
    slug: 'sansai-bear-safety',
    title: '山菜採り・野山作業中の熊対策｜春の最危険期を安全に',
    description: '山菜採りは熊被害で最多を占める活動のひとつ。春山独特の4つのリスク要因・危険地形別の対策・入山前チェックリスト・熊の痕跡の見分け方・遭遇時の3シナリオ別対応を解説。',
    tag: '農業・山仕事',
    tagColor: '#92400E',
    category: 'GUIDE',
  },
  {
    slug: 'japan-regional-bear-data',
    title: '都道府県別クマ出没傾向分析｜102,000件のデータが語ること',
    description: '102,213件の目撃データから見えてくる地域差の構造——なぜ秋田はトップなのか、なぜ件数が少ない県でも油断できないのか。4つの地域類型と2025年急増エリアの背景を解説。',
    tag: '地域分析',
    tagColor: '#1E40AF',
    category: 'DATA',
  },
  {
    slug: 'bear-incident-news-2026',
    title: '2026年春のクマ出没動向｜急増地域と背景要因の解説',
    description: '2026年春、クマは例年より2〜3週間早く活動を開始。東北・北陸を中心に出没が急増している背景——長期トレンド・構造的要因・今年固有の気象条件——を編集部が独自に解説。',
    tag: '編集解説',
    tagColor: '#E07A30',
    category: 'NEWS',
  },
  // ── 特集コンテンツ（ビジュアル・インパクト重視）────────────────────────
  {
    slug: 'bear-october-danger',
    title: '📊 クマが最も危険な月は10月｜年間23%が集中・人身被害も26%',
    description: '10月にクマ出没の23%・人身被害の26%が集中。KUMANUKEの11万件超のデータが示す事実を視覚的に解説。秋のアウトドア・農作業前に必読です。',
    tag: '🔥 特集',
    tagColor: '#EF4444',
    category: 'DATA',
  },
  {
    slug: 'bear-rapid-increase',
    title: '📊 6年で6倍。クマが急増した3つの理由',
    description: '2020年6,667件→2025年42,031件。個体数回復・耕作放棄地・人を怖がらないクマ——急増の構造を3つの理由でシンプルに解説します。',
    tag: '🔥 特集',
    tagColor: '#EF4444',
    category: 'DATA',
  },
  {
    slug: 'bear-prefecture-ranking',
    title: '📊 クマ出没 都道府県ランキング｜秋田1位・意外な3位は京都府',
    description: '11万件超のデータによる全国ランキングTOP20。秋田断トツ1位の理由・意外にも3位の京都府——あなたの地域は何位？各県の特徴も解説します。',
    tag: '🔥 特集',
    tagColor: '#EF4444',
    category: 'DATA',
  },
]

const CATEGORIES: { key: Category | 'all'; label: string; color: string; desc: string }[] = [
  { key: 'all',   label: 'ALL',   color: '#5A5A55', desc: `全${articles.length}本` },
  { key: 'GUIDE', label: 'GUIDE', color: '#1F5C2E', desc: `実践ガイド ${articles.filter(a => a.category === 'GUIDE').length}本` },
  { key: 'LAB',   label: 'LAB',   color: '#0C5C3E', desc: `科学・生態 ${articles.filter(a => a.category === 'LAB').length}本` },
  { key: 'DATA',  label: 'DATA',  color: '#1E40AF', desc: `データ・統計 ${articles.filter(a => a.category === 'DATA').length}本` },
  { key: 'WORLD', label: 'WORLD', color: '#7C3AED', desc: `海外・国際 ${articles.filter(a => a.category === 'WORLD').length}本` },
  { key: 'NEWS',  label: 'NEWS',  color: '#B45309', desc: `編集解説 ${articles.filter(a => a.category === 'NEWS').length}本` },
]

// Sub-tags in display order
const ALL_TAGS = ['すべて', ...Array.from(new Set(articles.map((a) => a.tag)))]

export default function GuideArticleGrid() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [activeTag, setActiveTag] = useState('すべて')

  // When category changes, reset tag filter
  const handleCategory = (cat: Category | 'all') => {
    setActiveCategory(cat)
    setActiveTag('すべて')
  }

  const categoryFiltered = activeCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === activeCategory)

  const filtered = activeTag === 'すべて'
    ? categoryFiltered
    : categoryFiltered.filter((a) => a.tag === activeTag)

  const availableTags = ['すべて', ...Array.from(new Set(categoryFiltered.map((a) => a.tag)))]

  return (
    <div>
      {/* ── Category tabs ── */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20,
          flexWrap: 'wrap',
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat.key === activeCategory
          return (
            <button
              key={cat.key}
              onClick={() => handleCategory(cat.key as Category | 'all')}
              style={{
                background: isActive ? cat.color : 'transparent',
                color: isActive ? '#fff' : '#5A5A55',
                border: isActive ? `1.5px solid ${cat.color}` : '1.5px solid #DDDDD8',
                fontSize: 12,
                fontWeight: 800,
                padding: '7px 16px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.15s',
                letterSpacing: '0.08em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <span>{cat.label}</span>
              <span style={{ fontSize: 9, fontWeight: 500, opacity: 0.75, letterSpacing: '0.02em' }}>
                {cat.desc}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Sub-tag filter (shown when category is selected) ── */}
      {activeCategory !== 'all' && availableTags.length > 2 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            marginBottom: 16,
            paddingLeft: 4,
          }}
        >
          {availableTags.map((tag) => {
            const isActive = tag === activeTag
            const tagArticle = articles.find((a) => a.tag === tag)
            const color = tagArticle ? tagArticle.tagColor : '#143D1E'
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  background: isActive ? color : 'transparent',
                  color: isActive ? '#fff' : '#5A5A55',
                  border: isActive ? `1px solid ${color}` : '1px solid #DDDDD8',
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  padding: '4px 12px',
                  borderRadius: 20,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {tag}
                {tag !== 'すべて' && (
                  <span style={{ marginLeft: 4, fontSize: 9, opacity: 0.7 }}>
                    {categoryFiltered.filter((a) => a.tag === tag).length}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Article count */}
      <p style={{ fontSize: 12, color: '#9A9A95', marginBottom: 16 }}>
        {filtered.length}件の記事
      </p>

      {/* 2-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
        }}
      >
        {filtered.map((a) => {
          const catConfig = CATEGORIES.find((c) => c.key === a.category)
          return (
            <Link
              key={a.slug}
              href={`/guide/${a.slug}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                background: '#fff',
                border: '1px solid #DDDDD8',
                borderTop: `3px solid ${catConfig?.color ?? '#5A5A55'}`,
                borderRadius: 8,
                padding: '20px 22px',
                transition: 'box-shadow 0.2s, transform 0.15s',
              }}
            >
              {/* Category + tag badges + reading time */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: catConfig?.color ?? '#5A5A55',
                    color: '#fff',
                    fontSize: 9,
                    fontWeight: 800,
                    padding: '3px 9px',
                    borderRadius: 3,
                    letterSpacing: '0.1em',
                  }}
                >
                  {a.category}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    background: `${a.tagColor}18`,
                    color: a.tagColor,
                    border: `1px solid ${a.tagColor}44`,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 20,
                    letterSpacing: '0.03em',
                  }}
                >
                  {a.tag}
                </span>
                <span style={{ fontSize: 10, color: '#AAA', marginLeft: 'auto' }}>
                  ⏱ 約{READING_MINUTES[a.category]}分
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(14px,1.6vw,15px)',
                  fontWeight: 700,
                  color: '#1A1A16',
                  marginBottom: 10,
                  lineHeight: 1.55,
                  flex: 1,
                }}
              >
                {a.title}
              </h2>
              <p
                style={{
                  fontSize: 12,
                  color: '#5A5A55',
                  lineHeight: 1.8,
                  marginBottom: 16,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {a.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#fff',
                    background: catConfig?.color ?? '#143D1E',
                    padding: '5px 14px',
                    borderRadius: 20,
                  }}
                >
                  読む →
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Responsive: single column on small screens */}
      <style>{`
        @media (max-width: 680px) {
          .guide-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
