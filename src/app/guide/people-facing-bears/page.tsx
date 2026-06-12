import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマと向き合う人たち——研究者・NPO・農家の現場 | KUMANUKE',
  description: 'クマを研究し、追い払い、共に生きようとしている人たちがいます。NPOピッキオ・日本クマネットワーク・山﨑晃司教授・坪田敏男教授など、実在する人物・組織の取り組みを紹介します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/people-facing-bears' },
  openGraph: {
    title: 'クマと向き合う人たち——研究者・NPO・農家の現場 | KUMANUKE',
    description: 'NPOピッキオ・日本クマネットワーク・研究者など、実在する人物・組織のクマとの向き合い方を紹介します。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/people-facing-bears',
  },
}

export default function PeopleFacingBearsPage() {
  return (
    <main style={{ background: '#fff' }}>

      {/* Hero */}
      <div style={{ background: '#0F2E16', padding: '64px 24px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(94,201,124,0.06)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1A5C2E', color: '#5EC97C', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 3, marginTop: 20, marginBottom: 16, letterSpacing: '0.06em' }}>
            共存・人と現場
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.2vw,32px)', fontWeight: 800, color: '#fff', lineHeight: 1.45, marginBottom: 16 }}>
            クマと向き合う人たち<br />
            <span style={{ fontSize: '0.72em', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>研究者・NPO・農家——現場を支える実在の人・組織</span>
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>更新日：2026年6月 ／ カテゴリ：共存・人と現場</p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 96px' }}>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          クマの出没がニュースになるとき、そこには必ず「現場で向き合っている人たち」がいます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 48 }}>
          生態を調べ続ける研究者。犬を訓練してクマを山に帰すNPO。農地を守りながらクマとの距離を模索する農家。彼らの存在と取り組みを知ることは、クマ問題を「遠いニュース」ではなく、<strong>社会の一部として理解する</strong>ことにつながります。
        </p>

        {/* 研究者 */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>研究者——クマを「知る」ことから始まる</h2>
        </div>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 28, marginTop: 8 }}>Chapter 01</p>

        {[
          {
            name: '山﨑晃司（やまざき こうじ）教授',
            affil: '東京農業大学 地域環境科学部',
            body: 'ツキノワグマの生態研究の第一人者として知られ、動物生態学・保全生態学を専門とします。茨城県自然博物館の首席学芸員を長年務めた後、東京農業大学へ。2016年の秋田県でのクマによる連続人身事故では現地調査と報告会を実施し、被害実態と生態学的背景を明らかにしました。クマを「管理の対象」としてだけでなく、生態系の一部として捉える視点で研究を続けています。',
            tag: 'ツキノワグマ生態',
          },
          {
            name: '坪田敏男（つぼた としお）教授',
            affil: '北海道大学大学院獣医学研究院／総合博物館長',
            body: 'ヒグマの生態研究と野生動物医学の権威で、知床半島でのヒグマ調査を25年以上にわたって継続しています。DNA調査を駆使した知床半島のヒグマ個体群数推定（約400〜500頭）をはじめ、血液サンプルによる高精度のクマ年齢推定法の開発など、野生動物医学・保全の両面で実績を重ねています。北海道大学野生動物学教室（1995年創設・国公立獣医系大学で初）の中心的存在として後進の育成にも取り組んでいます。',
            tag: 'ヒグマ生態・獣医学',
          },
        ].map(({ name, affil, body, tag }) => (
          <div key={name} style={{ background: '#FAFAF8', border: '1px solid #E8E8E4', borderRadius: 12, padding: '28px', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 17, fontWeight: 800, color: '#0F2E16', margin: '0 0 4px' }}>{name}</p>
                <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{affil}</p>
              </div>
              <span style={{ background: '#E8F5EC', color: '#1A5C2E', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>{tag}</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: '#444', margin: 0 }}>{body}</p>
          </div>
        ))}

        <div style={{ background: '#F5FBF6', border: '1px solid #C8E0CF', borderRadius: 10, padding: '20px 24px', marginBottom: 56 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0F2E16', marginBottom: 8 }}>日本クマネットワーク（Japan Bear Network）</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#444', margin: '0 0 8px' }}>
            1997年設立。大学研究者・行政職員・NPO・狩猟者・学生など多様な立場のメンバーが集まる、クマに関する情報交換と調査支援の全国ネットワーク。本部は東京農工大学（東京都府中市）に置かれています。クマ保護と被害防止の両立を目指し、各地の調査データや管理手法の情報を共有し続けています。
          </p>
          <a href="https://www.japanbear.org/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#1A6B2E', textDecoration: 'none', fontWeight: 600 }}>
            → 公式サイト：japanbear.org
          </a>
        </div>

        {/* NPO */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>NPO——現場で「共存」を実践する</h2>
        </div>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 28, marginTop: 8 }}>Chapter 02</p>

        {/* ピッキオ */}
        <div style={{ border: '2px solid #C8E0CF', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
          <div style={{ background: '#0F2E16', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <p style={{ fontSize: 17, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>NPO法人ピッキオ</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }}>長野県軽井沢町 ／ 1992年設立</p>
            </div>
            <span style={{ background: '#5EC97C', color: '#0F2E16', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>国内先進事例</span>
          </div>
          <div style={{ padding: '24px 28px' }}>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: '#333', marginBottom: 16 }}>
              「人の安全を守る」と「野生クマを絶滅させない」の両立をミッションに掲げ、軽井沢町でクマの総合管理を実践してきたNPOです。ベアドッグ（クマ追払い専用の訓練犬）・GPS首輪による行動追跡・住民への出没情報発信・ゴミ管理指導を組み合わせた複合的なアプローチが特徴です。
            </p>
            <div style={{ background: '#F5FBF6', borderRadius: 8, padding: '16px 20px', marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0F2E16', margin: '0 0 10px' }}>活動の成果（公表値）</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                {[
                  { val: '36件 → 9件', desc: 'クマ目撃件数\n2006年→2016年' },
                  { val: 'ほぼゼロ', desc: 'ゴミ荒らし件数\n（年100件超から削減）' },
                ].map(({ val, desc }) => (
                  <div key={val} style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 18, fontWeight: 900, color: '#1A5C2E', margin: '0 0 4px' }}>{val}</p>
                    <p style={{ fontSize: 12, color: '#666', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <a href="https://npo.picchio.jp/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#1A6B2E', textDecoration: 'none', fontWeight: 600 }}>
              → 公式サイト：npo.picchio.jp
            </a>
          </div>
        </div>

        {/* 四国 */}
        <div style={{ border: '1px solid #E8E8E4', borderRadius: 12, padding: '24px 28px', marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 16, fontWeight: 800, color: '#0F2E16', margin: '0 0 4px' }}>四国ツキノワグマ保護プログラム<br />（SAVE THE ISLAND BEAR）</p>
              <p style={{ fontSize: 13, color: '#666', margin: 0 }}>日本自然保護協会・日本クマネットワーク・WWFジャパンほか</p>
            </div>
            <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>絶滅危惧</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: '#444', marginBottom: 12 }}>
            四国に生息するツキノワグマは推定約20頭。2036年までの絶滅確率が62%とされており、国内で最も深刻な状況に置かれた個体群です。GPS首輪・カメラトラップ約150台・毛髪DNAトラップを組み合わせた調査が続けられており、「50年後に100頭」を目標とした保護プログラムが進行中です。
          </p>
          <a href="https://islandbearproject.org/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#1A6B2E', textDecoration: 'none', fontWeight: 600 }}>
            → 公式サイト：islandbearproject.org
          </a>
        </div>

        {/* 農家・地域 */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>農家・地域——最も近い距離で向き合う人たち</h2>
        </div>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 28, marginTop: 8 }}>Chapter 03</p>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          研究者やNPOの活動の陰で、毎日クマと「隣り合わせ」で暮らしているのが農家や山間地域の住民です。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 24 }}>
          2023年に出没件数が例年の6倍超（約4,500件）を記録した秋田県では、被害農家が電気柵の設置・収穫後の廃棄野菜の即日処分・果樹の早期収穫など、日々の作業に対策を組み込む取り組みが進んでいます。こうした「誘引物管理」は、研究者やNPOが一貫して推奨する基本対策であり、農家の実践なしには成立しません。
        </p>

        <div style={{ background: '#FAFAF8', border: '1px solid #E8E8E4', borderRadius: 10, padding: '22px 24px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0F2E16', marginBottom: 10 }}>秋田県の取り組み「クマダス」</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#444', margin: '0 0 10px' }}>
            秋田県が導入したクマ目撃情報・人身事故情報のマップ化・メール配信システム「クマダス」。
            住民が目撃情報をリアルタイムで共有し、農家や登山者が行動の判断に活用できる仕組みです。
            2024年は前年のブナ・ナラ豊作を背景に出没が減少しましたが、こうしたシステムの整備は凶作年への備えとして機能し続けています。
          </p>
          <a href="https://kumadas.net/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#1A6B2E', textDecoration: 'none', fontWeight: 600 }}>
            → クマダス公式サイト：kumadas.net
          </a>
        </div>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 56 }}>
          「クマが嫌いなわけじゃないが、畑は守らないといけない」——山間地域の農家が持つこの感覚こそ、共存の難しさと本質を映しています。対策は「クマを排除する」ためではなく、<strong>「接触を防いで、それぞれの領域を守る」</strong>ためにある。現場の人たちはそれを、長年の実践から知っています。
        </p>

        {/* まとめ */}
        <div style={{ background: '#0F2E16', borderRadius: 12, padding: '36px 32px', marginBottom: 48 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.1em', margin: '0 0 16px' }}>この記事のまとめ</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              '山﨑晃司教授（東京農業大学）や坪田敏男教授（北海道大学）など、生態研究の第一線で活動する研究者がいる',
              'NPOピッキオは軽井沢でベアドッグ＋GPS＋住民連携により目撃件数を36件から9件に削減した実績を持つ',
              '日本クマネットワーク（1997年設立）は全国の研究者・行政・狩猟者らをつなぐ情報共有ネットワーク',
              '四国のツキノワグマは推定約20頭・絶滅危惧状態にあり、保護プログラムが進行中',
              '農家や地域住民が誘引物管理を実践することが、あらゆる対策の基盤になっている',
            ].map((text) => (
              <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: '#5EC97C', flexShrink: 0, marginTop: 3 }}>✓</span>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 関連記事 */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F2E16', marginBottom: 14, paddingBottom: 8, borderBottom: '2px solid #E8E8E4' }}>関連ガイド</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { href: '/guide/bear-not-the-enemy', label: 'クマは悪くない。環境変化が生んだ「共存の危機」と私たちにできること' },
              { href: '/guide/bear-translocation-technology', label: 'クマを殺さず共存する技術の最前線——学習放獣・GPS追跡・ベアドッグ' },
              { href: '/guide/non-lethal-bear-management', label: '非致死的クマ管理——駆除に頼らない共存の手法' },
              { href: '/guide/canada-bear-smart', label: 'カナダBear Smartプログラム｜人と熊の共存を実現した政策モデル' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#FAFAF8', borderRadius: 8, textDecoration: 'none', border: '1px solid #E8E8E4', fontSize: 14, color: '#0F2E16', fontWeight: 500 }}>
                <span style={{ color: '#5EC97C', flexShrink: 0 }}>→</span>{label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
