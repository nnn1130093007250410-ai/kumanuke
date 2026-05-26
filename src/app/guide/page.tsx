import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '熊・野生動物対策ガイド | KUMANUKE',
  description: 'キャンプ・登山・農地・ゴミ置き場など場所別の熊・野生動物対策を解説。KUMANUKEが提供する実践的な対策ガイドです。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide' },
}

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
]

export default function GuidePage() {
  return (
    <main style={{ background: '#F8F8F6', minHeight: '60vh' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', marginBottom: 10 }}>KUMANUKE GUIDE</p>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.4 }}>
            熊・野生動物対策ガイド
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, maxWidth: 560 }}>
            場所・用途別の対策方法をわかりやすく解説します。
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/guide/${a.slug}`}
              style={{ textDecoration: 'none', display: 'block', background: '#fff', border: '1px solid #DDDDD8', borderRadius: 8, padding: '24px 28px', transition: 'box-shadow 0.2s' }}
            >
              <span style={{ display: 'inline-block', background: a.tagColor, color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginBottom: 10, letterSpacing: '0.05em' }}>
                {a.tag}
              </span>
              <h2 style={{ fontSize: 'clamp(15px,2vw,18px)', fontWeight: 700, color: '#1A1A16', marginBottom: 8, lineHeight: 1.5 }}>
                {a.title}
              </h2>
              <p style={{ fontSize: 13, color: '#5A5A55', lineHeight: 1.75 }}>{a.description}</p>
              <span style={{ display: 'inline-block', marginTop: 14, fontSize: 13, color: '#143D1E', fontWeight: 700 }}>
                読む →
              </span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48, background: '#143D1E', borderRadius: 8, padding: '32px 28px', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>卸・法人でのご購入</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 20 }}>農業組合・自治体・アウトドアショップなど法人・卸のお取引を承っています。</p>
          <Link href="/#wholesale" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 4, textDecoration: 'none' }}>
            お問い合わせはこちら
          </Link>
        </div>
      </div>
    </main>
  )
}
