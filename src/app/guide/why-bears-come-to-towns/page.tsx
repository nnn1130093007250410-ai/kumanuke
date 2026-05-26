import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説 | KUMANUKE',
  description: '近年、クマの人里出没が急増している背景を解説。ナラ枯れによる食料不足、里山の荒廃、クマの高い学習能力、個体数の回復など、複合的な要因を科学的視点からわかりやすく説明します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/why-bears-come-to-towns' },
  openGraph: {
    title: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説 | KUMANUKE',
    description: '近年、クマの人里出没が急増している背景を解説。ナラ枯れ・里山荒廃・学習行動など複合的な要因を科学的視点から説明します。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/why-bears-come-to-towns',
  },
}

export default function WhyBearsComeToTownsPage() {
  return (
    <main style={{ background: '#fff' }}>
      {/* Hero */}
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            生態・行動
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            クマはなぜ人里に来るのか<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>里山変化・食料不足・学習行動の複合要因</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：生態・行動
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* 導入 */}
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 32 }}>
          2025年度の環境省集計によれば、全国のクマによる人的被害は238人（死者13人）と過去最多を更新し、出没件数は5万件を超えました。ニュースではクマの「凶暴化」が語られることもありますが、研究者たちが指摘するのは異なる見方です。クマの行動は大きくは変わっておらず、それよりも<strong>人間社会とクマが生息する自然環境の双方が変化した</strong>ことが、出没増加の主な背景とされています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、クマが人里へ現れるようになった複合的な要因を、生態学・環境科学の知見をもとに整理します。
        </p>

        {/* Section 1 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. 秋の食料不足：ドングリ凶作とナラ枯れ
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          ツキノワグマが人里に降りてくる最も直接的な引き金とされているのが、<strong>秋の堅果類（ドングリ・ブナの実）の凶作</strong>です。クマは冬眠前の秋（9〜11月）に体重の30〜50%を増やす必要があり、この時期にブナ・ナラ・クリなどの木の実を大量に消費します。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          ブナの実は「豊凶サイクル」を持ち、5〜7年に1度しか大量結実（豊作）しない年があります。これは捕食者（リス・クマなど）の個体数が一定以上に増えることを防ぐための、植物側の生存戦略と考えられています。凶作の年にクマが採食できる熱量は著しく低下し、冬眠に必要な脂肪を蓄えられなくなる個体が増加します。
        </p>
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>ナラ枯れが追い打ちをかけている</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            2000年代以降、カシノナガキクイムシが媒介する「ナラ枯れ」が全国で急拡大しています。新潟県ではミズナラの約70%、コナラの20〜30%が枯れたと推定されており、かつて「里山のセーフティネット」として機能していたナラが消滅しつつあります。里山のナラは奥山のブナが凶作だった年の代替食料源でしたが、その機能が失われたことで食料危機が深刻化しているとされています。
          </p>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          環境省および各県の野生動物管理担当者は、出没が急増した年の前秋に堅果類の凶作が重なるケースが多いことを繰り返し指摘しています。ただし、凶作だけが原因ではなく、後述する複数の要因が複合的に作用しているとみられています。
        </p>

        {/* Section 2 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          2. 里山の荒廃：人間活動の縮小が境界を曖昧にした
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          かつての日本には「奥山（クマの領域）→ 里山（農林業地帯）→ 集落・農地」という緩やかな緩衝地帯が存在していました。里山では薪炭林の管理や農業が行われ、人の気配が常に漂う空間であったため、クマが踏み込むことは比較的少なかったとされています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          しかし農村部の人口減少・高齢化が進んだことで、耕作放棄地が全国に拡大しました。農林水産省の統計によれば、耕作放棄地面積は近年40万ヘクタールを超えて推移しており、こうした場所では草木が繁茂してクマが身を隠しながら移動できる「廊下」が形成されやすくなっています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          また、かつては定期的に行われていた河川沿いや農地周辺の草刈り・伐採が行われなくなったことで、クマが見通しの悪い環境を利用して集落近くまで侵入するケースが増えているとされます。WWFジャパンをはじめとする保全研究機関も、里山管理の衰退が野生動物と人との距離を縮めていると指摘しています。
        </p>

        {/* Section 3 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          3. クマの高い学習能力：「人里は食べ物がある場所」という記憶
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマは体重に対する大脳比率が非常に高い動物です。食料を探す能力・記憶する能力・状況から学習する能力は、哺乳類の中でも高水準にあるとされており、一度「ここに食べ物がある」と認識した場所には繰り返し訪れる傾向が確認されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          人里で農作物や生ごみを入手した経験を持つクマは、その場所を「採食地」として記憶し、繰り返し訪れるようになります。特に問題とされているのが、<strong>幼い時期に母親と共に人里へ来た経験のある個体</strong>です。こうした個体は奥山に戻らず、集落近くをテリトリーとして定住するケースが報告されており、研究者はこれを「人里依存型クマ」と呼ぶことがあります。
        </p>
        <div style={{ background: '#FFF8F0', border: '1px solid #FED7AA', borderLeft: '4px solid #E07A30', borderRadius: 8, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#C05A1A', marginBottom: 8 }}>「慣れ」が生む近接リスク</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            食料を目当てに人里へ来たクマが人間と遭遇しても危害を受けなかった場合、人間への警戒心が薄れる「慣れ（habituation）」が生じます。こうした個体は人の接近に対して逃走せず、近距離で対峙するケースが増えるため、ハンターや専門家は「問題個体」として捕獲・駆除の対象とすることが多くなっています。
          </p>
        </div>

        {/* Section 4 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          4. 個体数の回復：保護政策と狩猟者の減少
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          1990年代まで日本のツキノワグマは乱獲や生息地の縮小により一部地域で絶滅危機が懸念され、いくつかの県では「希少野生動植物」に指定されていました。その後の保護施策と狩猟規制強化により個体数が回復し、分布域が拡大した地域が多いとされています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          一方でハンター（狩猟者）の高齢化・後継者不足が進んでおり、農林水産省の統計では狩猟免許取得者数は1970年代後半のピーク時から大幅に減少しています。野生動物管理を担う専門的な人材が不足していることが、個体数コントロールの課題となっており、被害対応の遅延にもつながっているとみられています。
        </p>

        {/* Section 5 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          5. 気候変動との関係：活動期間の変化
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          気候変動との関係についても研究が進んでいます。気温上昇により冬眠期間が短くなるケース、あるいは融雪が早まることで春の行動開始時期が早まるといった変化が、一部のフィールド研究から報告されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          また、温暖化によって標高の高い地域にも食料が分布するようになることで、クマの行動圏そのものが変化する可能性も指摘されています。ただし、気候変動と出没増加の因果関係については、現時点では研究途上の部分が多く、確定的な結論は出ていません。
        </p>

        {/* Section 6 まとめ */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          6. 複合要因の整理：なぜ今、この規模で？
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>要因</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>概要</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>影響度</th>
              </tr>
            </thead>
            <tbody>
              {[
                { factor: 'ドングリ凶作', detail: '冬眠前の栄養源不足→人里へ移動', impact: '高（毎年変動）' },
                { factor: 'ナラ枯れ拡大', detail: 'セーフティネットの喪失', impact: '高（長期的）' },
                { factor: '里山の荒廃', detail: '耕作放棄地増、緩衝地帯の消失', impact: '中〜高（構造的）' },
                { factor: '学習行動の累積', detail: '人里依存型個体の増加', impact: '中（個体レベル）' },
                { factor: '個体数の回復', detail: '分布域拡大・遭遇機会増加', impact: '中（地域差大）' },
                { factor: '狩猟者の減少', detail: '個体数管理の困難化', impact: '中（長期的）' },
                { factor: '気候変動', detail: '活動期間・行動圏の変化', impact: '低〜中（研究途上）' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.factor}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.detail}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          クマが人里に来る背景は単一の原因ではなく、上記のような複数の要因が絡み合った結果です。そのため解決策も「食料管理の徹底」「里山の緩衝帯整備」「個体数管理の適正化」「忌避対策の普及」など、多層的なアプローチが必要とされています。
        </p>

        {/* Section 7 対策 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          7. 個人レベルでできること：誘引物の除去と事前対策
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマが人里へ来る根本的な原因の多くは個人が短期間で解決できるものではありません。しかし、日常的に取り組める対策によって、少なくとも「自分の周辺」へのリスクを抑えることは可能です。
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
          {[
            '生ごみ・農産物残渣をクマが近づける場所に放置しない（誘引物の管理）',
            '柿・栗・梅など果実が落ちたままになっている木の周辺を定期的に清掃する',
            '農地・ゴミ置き場周辺に電気柵や忌避剤を設置し、接近を抑制する',
            '人の気配を示す音や灯り（ラジオ・防犯灯）を活用する',
            '里山・農村部での作業時は複数人・音を出して行動する',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 15, lineHeight: 1.85, color: '#2A2A26', marginBottom: 8 }}>{item}</li>
          ))}
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          クマ被害の多い地域では、一度でも食料にありついた個体が繰り返し訪れるケースが多く報告されています。「最初に来させない」環境づくりが、もっとも費用対効果の高い対策とされています。
        </p>

        {/* KUMANUKE CTA */}
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>エリア散布型忌避アプローチについて</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            クマを「来させない」ための事前対策として、植物由来成分を活用したエリア散布型の忌避スプレーが注目されています。KUMANUKEは農地・ゴミ置き場・キャンプサイト周辺など、クマの接近が懸念される場所への事前散布を想定して設計された製品です。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        {/* Related */}
        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { href: '/guide/bear-olfactory-science', label: '熊が匂いで近づかない理由｜科学的メカニズムを解説' },
              { href: '/guide/smells-bears-dislike', label: 'クマが嫌いな匂いとは｜忌避成分の種類と作用' },
              { href: '/guide/japan-bear-damage-statistics', label: '日本のクマ被害統計2025-2026｜過去最多238人の実態' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
