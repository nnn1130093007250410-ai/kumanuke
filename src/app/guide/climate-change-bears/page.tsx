import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '気候変動とクマ出没｜温暖化が熊の行動・生息域・冬眠に与える影響 | KUMANUKE',
  description: '地球温暖化はクマの行動にどう影響するのか。冬眠期間の短縮・ドングリ豊凶サイクルの変化・行動域の拡大・人口減少との複合効果など、東京農工大などの研究をもとに気候変動とクマ被害の関係を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/climate-change-bears' },
  openGraph: {
    title: '気候変動とクマ出没｜温暖化が熊の行動・生息域・冬眠に与える影響 | KUMANUKE',
    description: '温暖化による冬眠短縮・ドングリ変動・行動域拡大など、気候変動とクマ被害の関係を研究データとともに解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/climate-change-bears',
  },
}

export default function ClimateChangeBears() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1E40AF', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            環境・社会
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            気候変動とクマ出没<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>温暖化が熊の行動・生息域・冬眠に与える影響</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：環境・社会
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          近年のクマ被害急増の背景に、里山の荒廃・ナラ枯れ・農村人口の減少といった構造的変化があることは広く知られています。しかし近年、これらに加えて<strong>気候変動（地球温暖化）</strong>との関係が注目されるようになっています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          東京農工大学などの研究グループは、日本の大型哺乳動物と人との軋轢増加の原因として「人口減少の加速と気候変動の進行」が複合的に作用していると指摘しています。ウェザーニュース・日本経済新聞などの報道でも取り上げられており、気候変動とクマ問題の関係は国際的にも研究が進んでいます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、気候変動がクマの生態・行動・被害パターンに与える影響を、現時点の研究知見をもとに整理します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. 冬眠期間への影響：暖冬がクマを早く目覚めさせる
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの冬眠は気温・積雪量・食料の入手状況などに影響されます。近年の温暖化により、冬の寒さが和らぐ年が増えており、本来12月〜翌3月頃まで続くはずの冬眠が早く終わる、または冬眠に入る時期が遅くなるといった変化が報告されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          冬眠期間が短縮されると、クマが食料を必要とする期間が長くなります。春の山菜・タケノコが出る前から行動を始めるケース、あるいは晩秋の食料探しがより長期にわたるケースなど、「クマが活動する時期」が拡大する方向の変化が起きているとされています。
        </p>
        <div style={{ background: '#FFF8F0', border: '1px solid #FED7AA', borderLeft: '4px solid #E07A30', borderRadius: 8, padding: '20px 24px', marginBottom: 40 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#C05A1A', marginBottom: 8 }}>「1月の出没」も現実に</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            従来「クマは冬眠中」として警戒が薄れる1〜2月に、暖冬の年には一部の個体が活動を続けているケースが確認されています。専門家は「気温が安定して低い年でも、冬眠に入る時期・出る時期は個体差が大きい」として、冬季の油断を戒めています。
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          2. ドングリ豊凶サイクルへの影響：温暖化がクマを増やす？
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          これまでクマの個体数は、ドングリ（ブナ・ナラの実）の豊凶サイクルに大きく左右されてきました。凶作の年は食料不足でクマの生存率・繁殖率が下がり、豊作の年に回復するという波を繰り返してきたとされています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          しかし複数の研究者が、温暖化によってこの豊凶サイクルの構造が変化している可能性を指摘しています。具体的には、温暖化に伴う春の気温上昇が結実を促進し、<strong>「全体としてのドングリの量が増加する傾向」</strong>があるというものです。ドングリが増えれば、クマが十分な栄養を蓄えられる機会が増え、繁殖成功率・幼獣の生存率が向上し、個体数が増加しやすくなります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          このメカニズムが正しければ、温暖化が進む将来には、クマの個体数増加圧力がさらに強まる可能性があります。ただし、この仮説はまだ検証中であり、温暖化によるナラ枯れの拡大と拮抗する要素もあるため、結論は慎重に解釈する必要があります。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          3. 生息域・行動域の変化：高山帯への拡大と温帯林の変化
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          気温上昇に伴い、クマが利用できる植生帯の範囲が変化しています。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 48 }}>
          {[
            {
              title: '高山帯への拡大',
              body: '従来は雪線以上には現れにくかったクマが、温暖化による積雪減少で夏季に高い標高帯まで行動圏を広げるケースが北米・欧州で報告されています。登山道・山岳エリアでの遭遇リスクが高まる要因のひとつとして指摘されています。',
            },
            {
              title: '温帯落葉樹林の分布変化',
              body: '日本のツキノワグマの主食であるブナ・ナラなどの温帯落葉樹林は、温暖化により分布域が北方・高標高方向にシフトすると予測されています。長期的には生息地の南部での食料環境が変化し、クマの分布・行動圏の再編が起きる可能性があります。',
            },
            {
              title: '人口減少との複合効果',
              body: '東京農工大学などの研究は、人口減少（農村の過疎化）と気候変動が複合的に作用することで、クマと人の接触機会が増加していると分析しています。過疎化した地域に気候変動によるクマ個体数の増加が重なることで、軋轢リスクが相乗的に高まる構造です。',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '14px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 6 }}>{item.title}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#5A5A55', margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          4. 国際的な研究動向
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          気候変動と大型哺乳動物・人の軋轢の関係は、国際的な野生動物管理・保全生態学の重要研究テーマになっています。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {[
            { region: '北米（グリズリー）', findings: 'イエローストーン生態系のグリズリーは気候変動により、かつての主食のひとつだったホワイトバーク松の種子（White bark pine nuts）が減少し、農業地帯への進出が増えているとする研究が発表されています。' },
            { region: 'ヨーロッパ（ブラウンベア）', findings: 'スカンジナビア半島では気候変動による春の早まりで、クマの冬眠明け時期が早期化しており、農業活動開始前の食料不足期間が生じるとする研究があります。' },
            { region: '北極圏（ホッキョクグマ）', findings: '海氷の縮小により狩猟範囲が制限されたホッキョクグマが、海岸集落へ接近するケースが増加。温暖化と人獣軋轢の関係として最も分かりやすい事例として国際的に注目されています。' },
          ].map((r, i) => (
            <div key={i} style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 6, padding: '14px 20px' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#143D1E', marginBottom: 4 }}>{r.region}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>{r.findings}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          5. 現時点での研究の限界と注意点
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          気候変動とクマ被害の因果関係については、現時点でいくつかの留意が必要です。
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 48 }}>
          {[
            '気候変動の影響は、ナラ枯れ・里山荒廃・農村人口減少など他の要因と切り分けて評価することが困難',
            'クマの生態は地域・個体・年によって大きく変動するため、気候変動との直接的な因果関係の特定には長期データが必要',
            '「温暖化でドングリが増えてクマが増える」という仮説は有力だが、温暖化による干ばつ・異常気象が結実に負の影響を与えるケースもある',
            '現在の被害急増の主な原因は、依然として食料環境の変化（ナラ枯れ・凶作）・里山管理の衰退・誘引物管理の不備であり、気候変動はこれらに「上乗せする要因」として理解される',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 15, lineHeight: 1.85, color: '#2A2A26', marginBottom: 8 }}>{item}</li>
          ))}
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          まとめ：気候変動は「背景にある増幅要因」
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          現時点での研究知見を総合すると、気候変動はクマ被害増加の「単独の原因」ではなく、既存の問題（食料環境変化・里山荒廃・人口減少）を増幅させる「背景要因」として機能していると考えられます。温暖化が進む将来においては、冬眠期間のさらなる変化・生息域の北方拡大・個体数増加圧力の強化といった変化が起きる可能性が研究者から指摘されています。今後はより長期的・広域的なモニタリングデータの蓄積と分析が必要とされています。
        </p>

        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>変化する環境下での予防型対策として</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            気候変動による出没リスクの変化が長期的に続く可能性がある中、農地・住宅地・アウトドアシーンでの予防型対策の重要性は高まっています。KUMANUKEは植物由来成分を配合したエリア散布型の忌避スプレーです。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説' },
              { href: '/guide/japan-bear-damage-statistics', label: '日本のクマ被害統計2025-2026｜過去最多238人の実態' },
              { href: '/guide/satoyama-bear-human-coexistence', label: '里山と人獣共存問題｜クマ被害が増える構造的背景と共存への道' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ fontSize: 14, color: '#143D1E', fontWeight: 600, textDecoration: 'none' }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
