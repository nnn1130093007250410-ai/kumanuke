import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '里山と人獣共存問題｜クマ被害が増える構造的背景と共存への道 | KUMANUKE',
  description: '里山の荒廃・農村人口減少・ナラ枯れなど、クマ被害増加の構造的背景を解説。「駆除か保護か」の二項対立を超えた、里山管理と人獣共存の現実的アプローチを考察します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/satoyama-bear-human-coexistence' },
  openGraph: {
    title: '里山と人獣共存問題｜クマ被害が増える構造的背景と共存への道 | KUMANUKE',
    description: '里山崩壊・農村過疎化がクマ被害増加を生む構造的メカニズムと、人獣共存の現実的アプローチを解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/satoyama-bear-human-coexistence',
  },
}

export default function SatoyamaBearHumanCoexistencePage() {
  return (
    <main style={{ background: '#fff' }}>
      {/* Hero */}
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1E40AF', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            社会・政策
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            里山と人獣共存問題<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>クマ被害が増える構造的背景と共存への道</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：社会・政策
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* 導入 */}
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          2025年度のクマによる人的被害が238人と過去最多を更新し、日本社会においてクマ問題への関心が急速に高まっています。ニュースでは「クマが凶暴化した」「街に出てきた」という表現が目立ちますが、研究者や野生動物管理の現場からは異なる文脈が語られます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          「クマと人間の距離が縮まっている」のは、クマの変化だけでなく、<strong>人間社会の変化</strong>が大きく関わっているという点です。里山の荒廃、農村人口の減少、ナラ枯れによる食料環境の悪化。これらは単に「自然現象」ではなく、人間の社会構造・経済構造の変化が生み出した問題です。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、クマ被害増加の背景にある里山問題の構造的メカニズムを整理し、「駆除か保護か」という二項対立を超えた、現実的な人獣共存のアプローチについて考察します。
        </p>

        {/* Section 1 里山とは */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          1. 「里山」が果たしていた緩衝機能
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          里山とは、農村集落と自然の奥山の間に広がる、人間が管理してきた二次的な自然環境の総称です。薪炭林（コナラ・クヌギなど）や農地・草地が混在し、定期的な人間活動によって常に「手が入った環境」として維持されてきました。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          里山はクマとヒトの空間的な緩衝地帯として機能していました。人の気配が漂う里山は、クマが近づきにくい空間であり、農村集落と奥山の間に一定の距離感を保つ役割を担っていたのです。また、里山のコナラやナラはクマの食料源でもあり、奥山の食料が不足した際のセーフティネットとしても機能していました。
        </p>

        {/* Section 2 里山崩壊 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, marginTop: 56, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          2. 里山の崩壊：何が緩衝機能を失わせたか
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          戦後の高度経済成長期から現在にかけて、農村部の人口は大幅に減少しました。石油・ガスエネルギーの普及により薪炭林の需要がなくなり、農山村では定期的な間伐・草刈りが行われなくなりました。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {[
            {
              title: '農村人口の流出と高齢化',
              body: '若い世代が都市部へ流出した農村では、農地管理・里山管理を担う人材が不足しています。高齢化した農業従事者が引退すると、その農地は放棄されることが多く、日本の耕作放棄地は近年40万ヘクタールを超えて推移しています。',
            },
            {
              title: '薪炭林の需要消失',
              body: '里山の中心を担ってきたコナラ・クヌギは、薪炭として定期的に伐採・萌芽更新されることで若い林が維持されていました。石油・ガスの普及でその需要がなくなると、これらの林は成熟・老齢化し、実をつけなくなる木が増えました。',
            },
            {
              title: 'ナラ枯れの拡大',
              body: 'さらに2000年代以降、カシノナガキクイムシが媒介する「ナラ枯れ」が全国で急拡大。新潟県ではミズナラの約70%が枯れたとも推定されています。これにより里山が担っていた「食料セーフティネット」が急速に失われています。',
            },
            {
              title: '廊下（コリドー）の形成',
              body: '管理されなくなった耕作放棄地や荒廃した里山は、クマが身を隠しながら移動できる「廊下（コリドー）」となります。視界が悪く草木が繁茂した環境は、クマにとって人目を避けながら農村・集落に接近しやすい地形になります。',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '14px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 6 }}>{item.title}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#5A5A55', margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* Section 3 駆除か保護か */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          3. 「駆除か保護か」：二項対立を超えた議論
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマ問題が社会的な議題になるたびに、「クマを駆除すべき」対「クマを保護すべき」という二項対立が生じがちです。しかし野生動物管理の専門家の多くは、この二項対立自体が問題の本質を見誤っていると指摘しています。
        </p>
        <div style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 8, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 12 }}>専門家が指摘する「適正管理」の考え方</p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {[
              '「保護と管理は対立しない」──個体数を適正範囲に維持することで、人との共存可能性は高まる',
              '問題を起こした個体の駆除と、種全体の保護は別の話として扱う必要がある',
              '被害ゼロを目指すより「許容できる共存関係を構築する」ことが現実的目標とされている',
              'WWFジャパン・日本クマネットワークなど保全団体も「共存のための適正管理」を支持',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>{item}</li>
            ))}
          </ul>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          人身被害を起こした個体や、人里への依存が著しい「問題個体」の捕獲・処分は、野生動物管理の観点から必要な措置とされています。一方で、個体数の維持・分布域の管理・生息地保全を並行して行わなければ、根本的な解決にはなりません。
        </p>

        {/* Section 4 共存への道 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          4. 人獣共存の現実的アプローチ
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          国内外の研究者・野生動物管理機関が示す「人獣共存」の実現には、以下のような多層的アプローチが必要とされています。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { title: '①里山管理の再興', body: '耕作放棄地の再利用、薪炭林の計画的管理、緩衝帯の草刈り。行政・地域コミュニティ・NPOが連携した里山再生プロジェクトが各地で始まっている。', color: '#143D1E' },
            { title: '②誘引物管理の徹底', body: '農作物・生ごみ・落果の適切な管理。「クマを呼び込まない環境づくり」は個人レベルで実践可能な最も重要な予防策。', color: '#1F5C2E' },
            { title: '③適正な個体数管理', body: '科学的データに基づいたモニタリングと、問題個体の対処。地域ごとの個体数推定精度の向上が課題とされている。', color: '#1E40AF' },
            { title: '④コミュニティの対応能力強化', body: '地域住民への教育・情報共有・早期警戒システム。出没情報のリアルタイム共有アプリの普及が進みつつある。', color: '#6B21A8' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderLeft: `4px solid ${c.color}`, borderRadius: 6, padding: '16px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: c.color, marginBottom: 8 }}>{c.title}</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#5A5A55', margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>

        {/* Section 5 海外事例 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, marginTop: 56, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          5. 海外の人獣共存事例：カナダ・スウェーデンから学ぶこと
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマと人間の共存に長い歴史を持つカナダや北欧諸国には、参考になる事例が多数あります。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {[
            {
              country: 'カナダ（ブリティッシュコロンビア州）',
              summary: '「Bear Smart Community」プログラムを導入。自治体が認定基準（誘引物管理・ゴミ処理規制・コミュニティ教育・問題個体管理の計画）を満たすことで、クマとの軋轢が低減した事例が報告されています。誘引物管理の規制（屋外でのゴミ放置禁止など）を条例化している自治体が多く、違反には罰則が設けられています。',
              color: '#1E40AF',
            },
            {
              country: 'スウェーデン（ブラウンベア管理）',
              summary: 'ブラウンベア（ヒグマ）の個体数が1930年代の約130頭から現在3,000頭超に回復。同時に人身被害件数を一定の水準に維持できているのは、農業・林業・牧畜業者への被害補償制度、ハンターによる個体数管理、市民教育の三本柱が機能しているからとされています。',
              color: '#059669',
            },
            {
              country: '米国（イエローストーン国立公園周辺）',
              summary: '公園内外のグリズリーの個体数回復に成功しながらも、公園外での農業被害・家畜被害が課題として続いています。「電気柵補助金プログラム」「熊スプレーの無償貸し出し」「被害農家への補償」といった支援策が共存維持に貢献しているとされます。',
              color: '#D97706',
            },
          ].map((c, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderLeft: `4px solid ${c.color}`, borderRadius: 6, padding: '16px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: c.color, marginBottom: 8 }}>{c.country}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>{c.summary}</p>
            </div>
          ))}
        </div>

        {/* Section 6 個人レベル */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          6. 個人・地域レベルでできること
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          里山問題の根本的解決は社会構造レベルの課題ですが、個人や地域コミュニティにも実践可能な取り組みがあります。
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 48 }}>
          {[
            '農地・庭の誘引物（果実・生ごみ）を適切に管理し、クマが食料を得られない環境を維持する',
            '地域の自治体・農協・猟友会が実施する忌避対策・電気柵設置への参加・協力',
            '出没情報を積極的に地域・行政・警察に報告し、早期警戒システムに貢献する',
            '近隣の耕作放棄地について自治体や土地所有者と連携して管理を検討する',
            'クマとの正しい接し方・対処法を学び、地域内で情報共有する',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 15, lineHeight: 1.85, color: '#2A2A26', marginBottom: 8 }}>{item}</li>
          ))}
        </ul>

        {/* KUMANUKE CTA */}
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>地域でできる予防型対策の一手として</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            自治体・農業組合・集合住宅管理組合など、地域単位でのエリア散布型忌避スプレーの活用は、予防型クマ対策の一手段として機能します。KUMANUKEは植物由来成分を用いたエリア散布型製品で、法人・卸でのご購入にも対応しています。
          </p>
          <Link href="/#wholesale" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            法人・卸のお問い合わせはこちら →
          </Link>
        </div>

        {/* Related */}
        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説' },
              { href: '/guide/japan-bear-damage-statistics', label: '日本のクマ被害統計2025-2026｜過去最多238人の実態' },
              { href: '/guide/international-bear-management', label: '海外のクマ対策研究・管理事例｜北米・ヨーロッパの取り組み' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
