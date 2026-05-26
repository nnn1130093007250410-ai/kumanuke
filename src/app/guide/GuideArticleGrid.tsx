'use client'

import Link from 'next/link'
import { useState } from 'react'

const articles = [
  {
    slug: 'bear-olfactory-science',
    title: '熊が匂いで近づかない理由｜嗅覚の仕組みと忌避メカニズムを科学的に解説',
    description: '熊の嗅覚は犬の7倍・人間の2100倍。WSU・東京大学・化学生態学誌など国内外の研究が示す、匂いによる熊の行動制御メカニズムと植物由来成分が注目される科学的根拠を解説。',
    tag: '科学・研究',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'smells-bears-dislike',
    title: 'クマが嫌いな匂いとは｜忌避成分の種類・作用と研究事例',
    description: 'カプサイシン・木酢液・精油成分など、クマの嗅覚特性を利用した忌避アプローチの原理と研究事例を解説。東京大学名誉教授監修による実地試験の結果も紹介。',
    tag: '科学・研究',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'bear-spray-accidents',
    title: '熊スプレーの誤噴射事故と法的リスク｜正しい熊対策の選び方',
    description: '2026年・JR多度津駅で8名負傷など、熊撃退スプレーの誤噴射事故が相次いでいます。護身用スプレーとエリア散布型の違い、法的リスクと正しい対策を解説します。',
    tag: '安全・リスク',
    tagColor: '#DC2626',
  },
  {
    slug: 'bear-spray-transportation-rules',
    title: '熊スプレーは飛行機・新幹線に持ち込めるか｜国内外の運搬ルール完全ガイド',
    description: '飛行機は機内持込み・受託手荷物いずれも不可。新幹線・宅配便の取り扱いや現地調達の方法など、登山旅行前に知っておくべき運搬ルールを詳しく解説します。',
    tag: '実用・ルール',
    tagColor: '#92400E',
  },
  {
    slug: 'bear-bell-effectiveness',
    title: '熊鈴の効果と限界｜科学的研究が示す正しい使い方と補完すべき対策',
    description: 'トム・スミス博士の実験データや環境省ガイドラインをもとに、熊鈴の効果と機能しにくい状況を解説。熊鈴だけに頼らない多層的な対策の組み方を紹介します。',
    tag: '科学・研究',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'camping-bear-prevention',
    title: 'キャンプ場・野営地での熊対策完全ガイド',
    description: 'テントサイト周辺への事前散布から食料管理まで、キャンプ中の熊遭遇リスクを下げる実践的な方法を解説します。',
    tag: 'キャンプ・登山',
    tagColor: '#1F5C2E',
  },
  {
    slug: 'hiking-bear-prevention',
    title: '登山・トレッキングでの熊対策｜山でのリスクを下げる方法',
    description: '登山道・野営地・山小屋周辺での熊遭遇リスク低減策。入山前にできる事前対策とKUMANUKEの活用方法を解説します。',
    tag: 'キャンプ・登山',
    tagColor: '#1F5C2E',
  },
  {
    slug: 'farm-bear-prevention',
    title: '農地・畑を熊から守る方法｜農家のための熊対策',
    description: '農作物被害を防ぐための農地外周散布・収穫前の対策など、農業従事者向けの熊忌避対策を詳しく解説します。',
    tag: '農業・農地',
    tagColor: '#92400E',
  },
  {
    slug: 'garbage-bear-prevention',
    title: 'ゴミ置き場・住宅地の熊対策｜自治体・集合住宅向け',
    description: 'ゴミの匂いに誘引される熊への対策。自治体・マンション管理組合・集合住宅向けのエリア散布型対策を解説します。',
    tag: '住宅・自治体',
    tagColor: '#1E40AF',
  },
  {
    slug: 'how-to-choose-bear-repellent',
    title: '熊よけスプレーの種類と選び方｜護身用と事前散布型の違い',
    description: '護身用の熊撃退スプレーとエリア散布型の忌避スプレーは目的が異なります。用途に合った製品の選び方を解説します。',
    tag: '製品知識',
    tagColor: '#6B21A8',
  },
  {
    slug: 'preventive-bear-approach',
    title: '予防型クマ対策とは何か｜事後対応ではなく事前接近抑制の考え方',
    description: '護身型スプレーや熊鈴とは異なる「そもそもクマを近づけない」予防型アプローチの考え方と実践手法。農地・住宅・アウトドア全シーンに対応した対策設計を解説。',
    tag: '対策・予防',
    tagColor: '#1F5C2E',
  },
  {
    slug: 'why-bears-come-to-towns',
    title: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説',
    description: 'ナラ枯れ・里山荒廃・ドングリ凶作・個体数回復など、クマ出没が急増する複合的な背景を科学的視点から解説。問題の本質を理解した上での対策立案に役立てください。',
    tag: '生態・行動',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'bear-seasonal-activity',
    title: 'クマの年間活動パターン｜季節ごとの行動変化と出没リスクカレンダー',
    description: '春の冬眠明けから秋の過食期まで、クマの月別活動強度と出没リスクを解説。いつ・どこで・どんな状況でリスクが高まるかを理解して季節ごとの対策に活かせます。',
    tag: '生態・行動',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'tsuki-no-wa-kuma-vs-higuma',
    title: 'ツキノワグマとヒグマの違い｜分布・体格・生態・危険性を徹底比較',
    description: '本州・四国のツキノワグマと北海道のヒグマの違いを体格・食性・習性・危険性・必要な対策の観点から徹底比較。自分の地域に合った対策選びに役立てください。',
    tag: '生態・行動',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'japan-bear-damage-statistics',
    title: '日本のクマ被害統計2025-2026｜過去最多238人・死者13人の実態と背景',
    description: '2025年度の環境省集計でクマ被害は238人・13人死亡と過去最多を更新。出没5万件超の実態を月別・都道府県別データとともに解説。増加背景と今後の対策の方向性も考察。',
    tag: 'データ・統計',
    tagColor: '#1E40AF',
  },
  {
    slug: 'satoyama-bear-human-coexistence',
    title: '里山と人獣共存問題｜クマ被害が増える構造的背景と共存への道',
    description: '里山の荒廃・農村人口減少・ナラ枯れなどクマ被害増加の構造的背景を解説。「駆除か保護か」を超えた科学的・社会的アプローチと、海外の共存事例を紹介します。',
    tag: '社会・政策',
    tagColor: '#1E40AF',
  },
  {
    slug: 'international-bear-management',
    title: '海外のクマ対策研究・管理事例｜北米・ヨーロッパの知見から学ぶ',
    description: 'カナダのBear SmartプログラムからイエローストーンのGPS管理、スウェーデンの個体数管理まで。海外の先行事例が示す「共存の条件」と日本への示唆を解説します。',
    tag: '科学・研究',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'bear-learning-behavior',
    title: 'クマの学習能力と認知行動｜なぜ同じ場所に繰り返し来るのか',
    description: '空間記憶・報酬学習・習慣化・問題解決行動・条件付け嫌悪。哺乳類研究が明かすクマの認知能力と、学習行動を踏まえた対策設計の考え方を解説します。',
    tag: '野生動物行動学',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'abandoned-fruit-trees-bear-damage',
    title: '放置果樹・放任果樹が熊を呼ぶ｜農村の誘引源管理と対策',
    description: '収穫されない柿・栗・リンゴが高カロリーの誘引源となりクマを集落へ引き寄せるメカニズムを解説。農林水産省・環境省の管理指針と各地の補助金制度も紹介します。',
    tag: '農業・農地',
    tagColor: '#92400E',
  },
  {
    slug: 'bear-home-range',
    title: 'クマの行動圏・ホームレンジとは｜GPS追跡が明かす移動距離と出没パターン',
    description: 'GPS追跡データが示すクマのホームレンジは地域・性別により数十〜数百km²超。日光・奥多摩・北アルプス等の国内データと、ホームレンジが対策設計に持つ意味を解説します。',
    tag: '野生動物行動学',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'non-lethal-bear-management',
    title: '非致死型クマ対策の体系｜移送・条件付け嫌悪・忌避・電気柵の科学',
    description: 'IUCNが推奨する段階的対応方針を軸に、トランスロケーション・aversive conditioning・忌避剤・電気柵を比較解説。駆除に頼らない管理手法の科学的根拠と限界を整理します。',
    tag: 'Wildlife Management',
    tagColor: '#1E40AF',
  },
  {
    slug: 'olfactory-repellent-research',
    title: 'Olfactory Repellent研究の最前線｜嗅覚忌避を科学する国際的アプローチ',
    description: 'TRPV1受容体・USDA・WSU・東京大学など国内外の研究が示す嗅覚忌避の機序を解説。Primary／Secondary／Conditioned repellentの3分類と化合物特性の比較も紹介します。',
    tag: '海外研究・論文解説',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'climate-change-bears',
    title: '気候変動とクマ出没｜温暖化が熊の行動・生息域・冬眠に与える影響',
    description: '冬眠期間の短縮・ドングリ豊凶サイクルの変化・生息域の北方シフト。東京農工大研究や北米・北欧の事例から、気候変動がクマと人の接触リスクをどう変えるかを解説します。',
    tag: '環境・社会',
    tagColor: '#1E40AF',
  },
  {
    slug: 'electric-fence-bear-prevention',
    title: '電気柵によるクマ対策｜設置の科学・有効性の研究・補助金制度',
    description: 'スロベニア90%超削減・国内80%以上削減のデータが示す電気柵の有効性。6,000〜10,000V設定の根拠・設置要件・メンテナンス・農林水産省補助金制度を詳しく解説します。',
    tag: '対策・予防',
    tagColor: '#1F5C2E',
  },
  {
    slug: 'bear-scent-marking',
    title: 'クマの嗅覚コミュニケーション｜匂いによる縄張り・情報伝達の仕組み',
    description: 'スクラッチマーク・尿マーキング・顔こすりつけなどクマの匂い行動をGC-MS分析の知見から解説。脂肪酸・揮発性アミン・テルペン類の機能と忌避アプローチへの示唆を紹介します。',
    tag: '野生動物行動学',
    tagColor: '#0C5C3E',
  },
]

// Unique tags in display order
const ALL_TAGS = ['すべて', ...Array.from(new Set(articles.map((a) => a.tag)))]

export default function GuideArticleGrid() {
  const [activeTag, setActiveTag] = useState('すべて')

  const filtered = activeTag === 'すべて' ? articles : articles.filter((a) => a.tag === activeTag)

  return (
    <div>
      {/* Category filter */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 28,
        }}
      >
        {ALL_TAGS.map((tag) => {
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
                fontSize: 12,
                fontWeight: isActive ? 700 : 500,
                padding: '6px 14px',
                borderRadius: 20,
                cursor: 'pointer',
                transition: 'all 0.15s',
                letterSpacing: '0.02em',
              }}
            >
              {tag}
              {tag !== 'すべて' && (
                <span
                  style={{
                    marginLeft: 5,
                    fontSize: 10,
                    opacity: isActive ? 0.8 : 0.5,
                  }}
                >
                  {articles.filter((a) => a.tag === tag).length}
                </span>
              )}
            </button>
          )
        })}
      </div>

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
        {filtered.map((a) => (
          <Link
            key={a.slug}
            href={`/guide/${a.slug}`}
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              border: '1px solid #DDDDD8',
              borderRadius: 8,
              padding: '20px 22px',
              transition: 'box-shadow 0.2s, border-color 0.2s',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: a.tagColor,
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: 3,
                marginBottom: 10,
                letterSpacing: '0.05em',
                alignSelf: 'flex-start',
              }}
            >
              {a.tag}
            </span>
            <h2
              style={{
                fontSize: 'clamp(14px,1.6vw,16px)',
                fontWeight: 700,
                color: '#1A1A16',
                marginBottom: 8,
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              {a.title}
            </h2>
            <p
              style={{
                fontSize: 12,
                color: '#5A5A55',
                lineHeight: 1.75,
                marginBottom: 14,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {a.description}
            </p>
            <span
              style={{
                fontSize: 12,
                color: '#143D1E',
                fontWeight: 700,
                marginTop: 'auto',
              }}
            >
              読む →
            </span>
          </Link>
        ))}
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
