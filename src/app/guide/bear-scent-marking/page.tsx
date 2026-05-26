import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマの嗅覚コミュニケーション｜匂いによる縄張り・情報伝達の仕組み | KUMANUKE',
  description: 'クマは嗅覚を使って縄張りの主張・繁殖シグナル・食料情報などを伝達します。スクラッチマーク・尿マーキング・顔こすり付けなど、匂いを使ったクマの行動コミュニケーションの仕組みと、それが対策設計に示す示唆を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-scent-marking' },
  openGraph: {
    title: 'クマの嗅覚コミュニケーション｜匂いによる縄張り・情報伝達の仕組み | KUMANUKE',
    description: 'スクラッチマーク・尿マーキング・顔こすり付けなど、クマの匂いコミュニケーションの科学的仕組みを解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-scent-marking',
  },
}

export default function BearScentMarkingPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            野生動物行動学
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            クマの嗅覚コミュニケーション<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>匂いによる縄張り・情報伝達の仕組み</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：野生動物行動学
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマは視覚よりも嗅覚を主要なコミュニケーション手段として使用する動物です。他の個体との直接接触を避けながら、匂いを通じて「誰がここにいるか」「いつ来たか」「発情期か」「どんな食料があるか」といった情報を受発信しています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、クマが行う様々な匂いコミュニケーション（Scent Marking）の形態とその機能を解説し、これが嗅覚忌避アプローチや対策設計にどのような示唆を持つかを考察します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. クマが使う匂いコミュニケーションの種類
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {[
            {
              type: 'スクラッチマーク（引っ掻きマーク）',
              desc: '木の幹に爪で引っ掻き傷をつけ、同時に前肢の皮脂腺・肉球の分泌物を付着させる行動。ツキノワグマ・ヒグマともに広く見られ、特定の「マーキングツリー（目印木）」に繰り返し行う個体が多い。高さは個体の大きさに対応しており、「自分の大きさを示す」機能があるとする説もある。',
              function: '個体識別・サイズ情報・滞在記録',
            },
            {
              type: '尿マーキング（Urinary Marking）',
              desc: '尿に含まれる個体特異的な化学物質（フェロモン様物質）を特定の場所に残す行動。繁殖期のオスが特に頻繁に行い、発情中のメスが残した尿を追う行動も観察されている。尿の化学組成は個体・年齢・性別・健康状態などの情報を含んでいる可能性がある。',
              function: '個体識別・性別・繁殖状態の伝達',
            },
            {
              type: '顔こすりつけ（Facial Rubbing）',
              desc: '目の周り・鼻・口周辺には皮脂腺が集中しており、岩・木・電柱などに顔をこすりつけることで分泌物を付着させる。スクラッチマークと組み合わせて行うことが多い。',
              function: '個体の匂い標識・縄張り主張',
            },
            {
              type: '背中こすりつけ（Trunk Rubbing）',
              desc: '木の幹や岩に背中・わき腹をこすりつける行動。身体の分泌物を付着させると同時に、木や岩の匂いを自分の体につける「匂い転写」とも解釈される。繁殖期の前後に頻度が高まるとされる。',
              function: '存在・状態の記録と伝達',
            },
            {
              type: '糞のマーキング',
              desc: '糞には食べたものの成分・個体特異的な腸内微生物が産生する揮発性化合物が含まれる。他のクマが糞の匂いを嗅いで情報収集する行動が観察されており、社会的な情報交換として機能している可能性がある。',
              function: '食料情報・個体情報・縄張り',
            },
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #DDDDD8', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ background: '#143D1E', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>{item.type}</p>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>機能：{item.function}</span>
              </div>
              <div style={{ padding: '14px 20px', background: '#fff' }}>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          2. フェロモンと揮発性化合物：匂いに含まれる情報
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          動物が分泌する匂い物質の多くは、皮脂腺・肛門腺・尿・糞などから放出される揮発性有機化合物（VOC）です。これらは大気中に拡散し、同種他個体の嗅覚受容体で検知されます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの匂いマーキングに含まれる化合物の詳細な化学分析は研究途上の部分が多いですが、ガスクロマトグラフィー・質量分析（GC-MS）を用いた研究では、以下のような成分グループが検出されています：
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
          {[
            '脂肪酸誘導体（短鎖脂肪酸・中鎖脂肪酸）：皮脂腺・汗腺から分泌される代表的な動物臭成分',
            '揮発性アミン類：タンパク質代謝物として生成される含窒素化合物',
            'テルペン類：食べた植物由来の揮発性成分が体内を経由して排出されるもの',
            '腸内微生物由来の揮発性化合物：糞・直腸腺分泌物に含まれる',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 15, lineHeight: 1.85, color: '#2A2A26', marginBottom: 8 }}>{item}</li>
          ))}
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          これらの化合物の組み合わせパターンは個体ごとに異なる「化学的指紋」を形成するとされており、クマが他個体を識別できる根拠のひとつです。近縁種のパンダ・マレーグマなどでも同様の嗅覚コミュニケーション研究が進んでいます。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          3. 繁殖期における匂いコミュニケーションの重要性
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの繁殖期（ツキノワグマで概ね5〜7月）は、嗅覚コミュニケーションが最も活発になる時期です。発情したメスは尿マーキングや顔こすりつけを頻繁に行い、その匂いを頼りにオスが遠距離から追跡してくることが観察されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          この時期、オスは通常の倍以上の行動圏を移動し、マーキング木に立ち寄りながら情報を収集します。繁殖期の前後に人里近くの「マーキングポイント」（特定の木・電柱・農地脇の構造物など）にクマが繰り返し現れるケースは、こうした嗅覚コミュニケーション行動と関係している場合があります。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          4. 嗅覚コミュニケーションと忌避対策への示唆
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの嗅覚コミュニケーションの仕組みを理解することは、忌避対策の設計にいくつかの示唆を与えます。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {[
            { title: '「危険のシグナル」としての匂い', body: '捕食者の匂い・燃焼臭・特定の化学物質は、クマにとって「危険・脅威」を示すシグナルとして機能する可能性があります。こうした「2次的忌避シグナル」として機能する匂いの研究が進んでいます。' },
            { title: 'マーキング行動の観察で個体の情報を得る', body: 'マーキングツリーの新鮮な傷跡・引っ掻き跡の高さから、その地域に滞在するクマの大きさ・活動時間帯などを推定できることがあります。被害対策の計画立案に役立てられる場合があります。' },
            { title: '複合的な匂い刺激の重要性', body: 'クマは複数の匂いを同時に処理する高度な嗅覚情報処理能力を持ちます。単一成分の忌避剤より、複数の忌避成分を組み合わせた複合的な匂い刺激のほうが、クマの行動変化をより広い個体に引き起こす可能性があるとされています。' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 6, padding: '14px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 6 }}>{item.title}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          まとめ
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          クマは視覚的・聴覚的なコミュニケーションよりも嗅覚コミュニケーションに大きく依存する動物です。スクラッチマーク・尿マーキング・顔こすりつけなどの行動を通じて、個体情報・繁殖状態・縄張り情報を持続的に交換しています。この嗅覚への依存度の高さが、忌避成分による行動変化アプローチの理論的根拠のひとつとなっています。嗅覚コミュニケーションの研究は、クマ対策の科学的基盤をより深く理解するための重要な視点を提供しています。
        </p>

        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>嗅覚特性を活用した予防型対策として</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            クマが嗅覚に高度に依存することを踏まえ、植物由来の忌避成分をエリアに散布することでクマの接近抑制を図る予防型対策が注目されています。KUMANUKEはこの考え方に基づき設計されたエリア散布型の忌避スプレーです。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/bear-olfactory-science', label: '熊が匂いで近づかない理由｜科学的メカニズムを解説' },
              { href: '/guide/olfactory-repellent-research', label: 'Olfactory Repellent研究の最前線｜嗅覚忌避を科学する国際的アプローチ' },
              { href: '/guide/bear-learning-behavior', label: 'クマの学習能力と認知行動｜なぜ同じ場所に繰り返し来るのか' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ fontSize: 14, color: '#143D1E', fontWeight: 600, textDecoration: 'none' }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
