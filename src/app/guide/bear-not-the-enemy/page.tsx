import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマは悪くない。環境変化が生んだ「共存の危機」と私たちにできること | KUMANUKE',
  description: 'クマは本来、人を避ける生き物です。出没が増えた背景には、気候変動・里山の荒廃・人口減少など人間社会の変化があります。クマを「敵」にせず、共存するための考え方と対策を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-not-the-enemy' },
  openGraph: {
    title: 'クマは悪くない。環境変化が生んだ「共存の危機」と私たちにできること | KUMANUKE',
    description: 'クマは本来、人を避ける生き物です。出没が増えた背景には、気候変動・里山の荒廃など人間社会の変化があります。共存するための考え方と対策を解説します。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-not-the-enemy',
  },
}

export default function BearNotTheEnemyPage() {
  return (
    <main style={{ background: '#fff' }}>

      {/* ── Hero ── */}
      <div style={{ background: '#0F2E16', padding: '64px 24px 56px', position: 'relative', overflow: 'hidden' }}>
        {/* 背景装飾 */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(94,201,124,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(94,201,124,0.04)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1A5C2E', color: '#5EC97C', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 3, marginTop: 20, marginBottom: 16, letterSpacing: '0.06em' }}>
            共存・考え方
          </div>
          {/* メインコピー */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 'clamp(36px,6vw,60px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
              クマは、
            </p>
            <p style={{ fontSize: 'clamp(36px,6vw,60px)', fontWeight: 900, color: '#5EC97C', lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
              悪くない。
            </p>
          </div>
          <h1 style={{ fontSize: 'clamp(15px,2.2vw,20px)', fontWeight: 400, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 32px' }}>
            出没が増えた背景には、気候・環境・人間社会の変化がある。<br />
            クマを「敵」にしない共存の考え方と、今すぐできる対策。
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            更新日：2026年6月 ／ カテゴリ：共存・考え方
          </p>
        </div>
      </div>

      {/* ── 本文 ── */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 96px' }}>

        {/* リード文 */}
        <p style={{ fontSize: 17, lineHeight: 2, color: '#1A1A16', marginBottom: 16, fontWeight: 500 }}>
          毎年秋になると、クマの出没ニュースが列島を騒がせます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          「凶暴化している」「駆除するしかない」——そんな声もメディアから聞こえてきます。
          でも、野生動物の研究者たちが口を揃えて言うのは少し違う見方です。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 48 }}>
          <strong>クマ自身は変わっていない。変わったのは、クマを取り巻く環境と、人間社会のほうです。</strong>
        </p>

        {/* インパクトBOX */}
        <div style={{ background: '#0F2E16', borderRadius: 12, padding: '36px 32px', marginBottom: 56, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'rgba(94,201,124,0.08)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 13, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.1em', marginBottom: 20, margin: '0 0 20px' }}>FACT</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { num: '238人', label: '2025年度のクマによる人的被害数（過去最多・環境省）' },
              { num: '5万件超', label: '同年の全国出没件数' },
              { num: '40万ha超', label: '全国の耕作放棄地面積（農水省）—— 人とクマの緩衝帯が消えつつある' },
            ].map(({ num, label }) => (
              <div key={num} style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#5EC97C', lineHeight: 1, minWidth: 80 }}>{num}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, paddingTop: 6 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1 */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>
            クマは本来、人を避ける生き物
          </h2>
        </div>
        <p style={{ fontSize: 15, color: '#888', marginBottom: 24, marginTop: 8 }}>Chapter 01</p>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          ツキノワグマもヒグマも、本来は臆病な動物です。
          人間の気配を感じると自ら距離を置き、なるべく接触を避けようとします。
          野生動物の行動研究では「クマは人間を天敵として認識する傾向がある」とも報告されており、
          むしろ人間を<strong>避ける本能</strong>を持っています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          実際に人身被害が起きるケースの多くは、
          「突然出会い頭にびっくりさせてしまった」「子グマを守ろうとした母グマ」
          「食料を求めて集落に降りてきた個体が追い詰められた」という状況が多数を占めます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 48 }}>
          クマが「人を狙っている」のではなく、<strong>人とクマが「うっかり接触してしまう環境」が増えている</strong>のです。
        </p>

        {/* 引用風BOX */}
        <div style={{ borderLeft: '5px solid #5EC97C', background: '#F5FBF6', padding: '24px 28px', borderRadius: '0 12px 12px 0', marginBottom: 56 }}>
          <p style={{ fontSize: 17, fontWeight: 700, color: '#0F2E16', lineHeight: 1.7, margin: '0 0 8px' }}>
            「凶暴化ではなく、接触機会の増加」
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', margin: 0 }}>
            多くの野生動物研究者が指摘するのは、クマの行動が変わったのではなく、
            人間の生活圏とクマの生息域が重なり始めた、という構造的な変化です。
          </p>
        </div>

        {/* Section 2 */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>
            なぜ出没が増えたのか。3つの環境変化
          </h2>
        </div>
        <p style={{ fontSize: 15, color: '#888', marginBottom: 32, marginTop: 8 }}>Chapter 02</p>

        {[
          {
            num: '01',
            title: '食料危機：ドングリ凶作とナラ枯れ',
            body: 'クマは冬眠前の秋に体重の30〜50%を増やす必要があり、ブナ・ナラ・クリの実に大きく依存します。ブナは「豊凶サイクル」を持ち、凶作の年はクマが必要な熱量を確保できなくなります。さらに2000年代以降、カシノナガキクイムシが媒介する「ナラ枯れ」が全国に拡大。新潟県ではミズナラの約70%が枯れたと推定され、里山のナラが果たしていた「奥山の凶作時の代替食料源」という機能が失われつつあります。食べ物がなければ、クマは人里へ降りてくるしかありません。',
            icon: '🌰',
          },
          {
            num: '02',
            title: '里山の荒廃：緩衝帯の消滅',
            body: 'かつての日本には「奥山（クマの領域）→ 里山（農林業地帯）→ 集落・農地」という緩やかな緩衝地帯がありました。里山では薪炭林の管理や農業が行われ、人の気配が絶えなかったため、クマが踏み込むことは少なかったのです。しかし農村部の人口減少・高齢化が進み、耕作放棄地が全国に拡大。草木が繁茂し、クマが身を隠しながら移動できる「廊下」が集落近くまで伸びています。人とクマの間にあった"見えない壁"が、消えてしまいました。',
            icon: '🌿',
          },
          {
            num: '03',
            title: '気候変動：行動パターンの乱れ',
            body: '温暖化による気温上昇と降水パターンの変化が、クマの活動時期や食料の豊凶に影響を与えています。春の早い雪解けが植生の変化をもたらし、秋の気温が高い年は冬眠前の採食行動が長引く傾向もあります。気候変動が野生動物と人間社会との接触リスクを高めていることは、国内外の研究者が継続的に指摘している問題です。',
            icon: '🌡️',
          },
        ].map(({ num, title, body, icon }) => (
          <div key={num} style={{ marginBottom: 40, background: '#FAFAF8', borderRadius: 12, padding: '28px 28px 28px 28px', border: '1px solid #E8E8E4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.1em', display: 'block' }}>REASON {num}</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F2E16', margin: 0, lineHeight: 1.4 }}>{title}</h3>
              </div>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.95, color: '#444', margin: 0 }}>{body}</p>
          </div>
        ))}

        {/* Section 3 */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12, marginTop: 16 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>
            「共存」とは何か。正しく理解する
          </h2>
        </div>
        <p style={{ fontSize: 15, color: '#888', marginBottom: 32, marginTop: 8 }}>Chapter 03</p>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          「クマと共存しよう」という言葉が使われる一方で、
          「そんな綺麗事より命を守れ」という声もあります。
          どちらも間違っていないと思います。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          共存とは、「同じ空間で仲良く暮らす」ことではありません。
        </p>

        {/* 共存の定義BOX */}
        <div style={{ background: '#0F2E16', borderRadius: 12, padding: '32px 32px', marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.1em', margin: '0 0 16px' }}>共存の本質的な意味</p>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.6, margin: '0 0 16px' }}>
            「お互いの領域を意識しながら、<br />
            <span style={{ color: '#5EC97C' }}>接触リスクを下げる</span>こと」
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: 0 }}>
            クマが山から降りなくて済む環境を守ること。<br />
            人の生活圏に近づきにくくすること。<br />
            万が一出会ってしまったときに、被害を最小化すること。<br />
            —— この3つが揃って初めて「共存」が実現します。
          </p>
        </div>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 48 }}>
          クマを「敵」にしてしまうと、感情的な議論が先行して根本的な解決から遠ざかります。
          一方で「かわいそうだから対策しなくていい」という考えも現実を無視しています。
          <strong>「クマが悪いわけではないが、接触を防ぐ仕組みは必ず必要」</strong>——
          これが現在の野生動物管理における標準的な考え方です。
        </p>

        {/* Section 4 */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>
            私たちにできること
          </h2>
        </div>
        <p style={{ fontSize: 15, color: '#888', marginBottom: 32, marginTop: 8 }}>Chapter 04</p>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 32 }}>
          個人レベルでできることは、大きく3つに分けられます。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {[
            {
              step: '1',
              title: 'クマを引き寄せない',
              items: ['生ゴミ・廃棄野菜を放置しない', '収穫しない果物・野菜を残さない（誘引物の管理）', '柿・栗など落果が多い木を管理する'],
              color: '#E8F5EC',
              border: '#B0DFC0',
            },
            {
              step: '2',
              title: '接触リスクを下げる',
              items: ['山道・農地での鈴・ラジオなど音の活用', 'エリア散布型忌避剤によるクマの侵入を抑制', '見通しの悪い草むらの刈り払い'],
              color: '#E8F5EC',
              border: '#B0DFC0',
            },
            {
              step: '3',
              title: '出会ってしまった時の備え',
              items: ['走って逃げない（クマを興奮させる）', 'ゆっくり後退し、目を合わせすぎない', 'クマスプレー（護身用）の携帯と使い方の習得'],
              color: '#E8F5EC',
              border: '#B0DFC0',
            },
          ].map(({ step, title, items, color, border }) => (
            <div key={step} style={{ background: color, border: `1px solid ${border}`, borderRadius: 10, padding: '24px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0F2E16', color: '#5EC97C', fontSize: 14, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F2E16', margin: 0 }}>{title}</h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {items.map((item) => (
                  <li key={item} style={{ fontSize: 15, lineHeight: 1.8, color: '#2A2A26', marginBottom: 4 }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* まとめ */}
        <div style={{ borderTop: '2px solid #E8E8E4', paddingTop: 40, marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F2E16', marginBottom: 20 }}>まとめ：クマを知ることが、共存の第一歩</h2>
          <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
            クマが人里に現れるのは、クマが凶暴になったからではありません。
            食料不足、里山の荒廃、気候変動——人間社会の変化が、
            クマとの「距離」を縮めてしまった結果です。
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
            だからこそ、対策も「駆除だけ」では根本的な解決になりません。
            環境の管理、誘引物の除去、接触を防ぐ仕組みの整備——
            これらを組み合わせることで、人もクマも安心して暮らせる環境を目指すことができます。
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333' }}>
            <strong>クマを正しく怖れ、正しく知り、正しく備える。</strong><br />
            それが、現代における人とクマの共存への最短ルートです。
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: '#F5FBF6', border: '1px solid #C8E0CF', borderRadius: 12, padding: '32px 28px', marginBottom: 48, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#555', margin: '0 0 8px' }}>KUMANUKEのエリア散布型スプレーは</p>
          <p style={{ fontSize: 18, fontWeight: 800, color: '#0F2E16', margin: '0 0 8px', lineHeight: 1.5 }}>
            「クマを排除しない、<span style={{ color: '#1A6B2E' }}>近づかせない</span>」<br />
            共存志向の対策アイテムです。
          </p>
          <p style={{ fontSize: 14, color: '#666', margin: '0 0 24px', lineHeight: 1.7 }}>
            植物由来成分使用。OCガス・カプサイシン不使用。<br />
            キャンプ場・農地・施設周辺への事前散布に。
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products/kumanuke" style={{ background: '#0F2E16', color: '#fff', padding: '13px 28px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
              商品詳細を見る
            </Link>
            <Link href="/monitor" style={{ background: '#fff', color: '#0F2E16', padding: '13px 28px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700, border: '2px solid #0F2E16' }}>
              施設向けモニター募集
            </Link>
          </div>
        </div>

        {/* 関連記事 */}
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F2E16', marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid #E8E8E4' }}>
            関連ガイド
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説' },
              { href: '/guide/satoyama-bear-human-coexistence', label: '里山とクマの共存——地域ぐるみの野生動物管理' },
              { href: '/guide/climate-change-bears', label: '気候変動がクマの出没に与える影響' },
              { href: '/guide/non-lethal-bear-management', label: '非致死的クマ管理——駆除に頼らない共存の手法' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#FAFAF8', borderRadius: 8, textDecoration: 'none', border: '1px solid #E8E8E4', fontSize: 14, color: '#0F2E16', fontWeight: 500, lineHeight: 1.5 }}>
                <span style={{ color: '#5EC97C', flexShrink: 0 }}>→</span>
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
