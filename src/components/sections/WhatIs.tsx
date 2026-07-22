import Image from 'next/image'

const points = [
  { title: '植物由来成分を使用', text: '天然植物由来の香気成分を配合。OCガス・カプサイシンを使用しない処方で、環境への配慮を意識した設計です。' },
  { title: 'エリア散布型のアプローチ', text: '人がいない場所・時間帯でも、事前に散布することでエリアの対策が可能。農地・ゴミ置き場・倉庫周辺などに。' },
  { title: '多様なシーンに対応', text: 'キャンプ・登山・釣り・農業・ゴミ置き場・通学路周辺など、さまざまなシーンでの事前対策としてご活用いただけます。' },
  { title: '国内企画・品質管理', text: '国内にて企画・品質管理を実施。成分・製造工程における安全性を重視した製品管理を行っています。' },
  { title: '熊だけでなく野生動物全般に', text: '熊対策を主用途としつつ、猪・鹿・ハクビシンなど他の野生動物への寄り付き対策にも活用いただけます。' },
]

export default function WhatIs() {
  return (
    <section id="about" style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="section-label">ABOUT KUMANUKE</div>
        <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,30px)', marginBottom: 14 }}>KUMANUKEとは</h2>
        <p style={{ fontSize: 15, color: '#5A5A55', lineHeight: 1.85, marginBottom: 40 }}>
          植物由来成分を活用した、エリア散布型の野生動物対策スプレーです。<br />
          特定エリアに事前散布することで、野生動物の侵入・接近を
          <strong style={{ color: '#143D1E' }}>事前に対策</strong>することを目的としています。
        </p>

        <div className="fade-up grid gap-14" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', alignItems: 'start' }}>
          {/* Product card */}
          <div
            style={{ background: '#EFF5F0', border: '2px solid #C8DFC9', borderRadius: 8, padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
          >
            <div style={{ background: '#143D1E', color: '#fff', fontFamily: 'var(--font-en)', fontSize: 26, fontWeight: 700, letterSpacing: '0.1em', padding: '10px 28px', borderRadius: 4, marginBottom: 14 }}>
              KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
            </div>
            <p style={{ fontSize: 12, color: '#5A5A55', marginBottom: 20 }}>エリア散布型 野生動物対策スプレー ／ 200ml</p>
            {/* 商品ボトル画像 */}
            <div style={{ margin: '0 0 20px', lineHeight: 0 }}>
              <Image
                src="/product-bottle.png"
                alt="KUMANUKE ベアリペレントエリアスプレー 商品本体"
                width={112}
                height={300}
                style={{
                  width: 'auto',
                  height: 220,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.18))',
                }}
              />
            </div>
            <div style={{ background: '#fff', border: '1px solid #DDDDD8', borderRadius: 6, padding: '16px 24px', width: '100%' }}>
              <div style={{ fontSize: 11, color: '#9A9A95' }}>現在販売価格（税込）</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'center', margin: '4px 0' }}>
                <span style={{ fontFamily: 'var(--font-en)', fontSize: 28, fontWeight: 700, color: '#143D1E' }}>¥3,980</span>
                <span style={{ fontSize: 12, color: '#5A5A55' }}>(税込)</span>
              </div>
              <div style={{ fontSize: 12, color: '#9A9A95', textDecoration: 'line-through' }}>通常価格 ¥4,980（税込）</div>
            </div>
            <a
              href="https://kumanuke.jp/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 16, background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 13, padding: '10px 22px', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}
            >
              購入・詳細を見る
            </a>
          </div>

          {/* Points */}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {points.map((p, i) => (
              <li key={p.title} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: i < points.length - 1 ? '1px solid #EFEFED' : 'none' }}>
                <div style={{ background: '#E07A30', color: '#fff', fontFamily: 'var(--font-en)', fontWeight: 700, fontSize: 11, width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  {i + 1}
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: 14, color: '#1A1A16', marginBottom: 3 }}>{p.title}</strong>
                  <span style={{ fontSize: 13, color: '#5A5A55' }}>{p.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
