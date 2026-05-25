'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'KUMANUKEは熊を確実に撃退・駆除できますか？',
    a: 'KUMANUKEは熊の「撃退・駆除」を目的とした製品ではありません。野生動物の寄り付き対策・遭遇予防を目的とした事前散布型の対策スプレーです。すべての状況・個体において効果を保証するものではなく、熊と遭遇した際の護身用品としてはご使用いただけません。必ず事前散布でご使用ください。',
  },
  {
    q: 'どのくらいの頻度で散布すればよいですか？',
    a: '使用環境・天候により異なりますが、目安として1〜2週間ごとの再散布をお勧めします。降雨後や強風の後は成分が薄まる可能性があるため、早めの再散布をお勧めします。',
  },
  {
    q: '人やペット、農作物に影響はありますか？',
    a: '植物由来成分を主体としていますが、直接人や動物にスプレーすることは絶対にお避けください。農作物への直接散布も避け、農地外周・周囲への使用にとどめてください。',
  },
  {
    q: '熊以外の動物にも効果はありますか？',
    a: '主用途は熊を含む大型野生動物の寄り付き対策ですが、猪・鹿・ハクビシン・アライグマなど他の野生動物への使用事例もあります。ただし、動物の種類・個体差・環境条件により効果は異なります。',
  },
  {
    q: 'どのくらいの面積をカバーできますか？',
    a: '200mlで散布できる面積は使用方法・散布密度により異なります。テントサイト（2〜3張り規模）の外周散布であれば数回分に相当しますが、農地外周など広いエリアでは複数本のご使用をお勧めします。',
  },
  {
    q: '雨が降ったら効果はなくなりますか？',
    a: '降雨により有効成分が流れ、効果が薄まる可能性があります。大雨・長雨の後は早めの再散布をお勧めします。天候予報を確認した上で散布タイミングを検討してください。',
  },
  {
    q: '卸・法人での大量購入は可能ですか？',
    a: 'はい、卸・法人向けのご注文を承っています。自治体・農業組合・アウトドア関連事業者・ホームセンター等への卸販売を積極的に行っています。数量・条件等はお問い合わせフォームまたはメールにてご相談ください。',
  },
  {
    q: '使用期限・保管方法について教えてください。',
    a: '品質保持期限の目安は製造から約3年です。ただし、保管状況や使用環境により変動する場合があります。製造日は製品底面に記載されています。直射日光・高温多湿の場所を避け、冷暗所で保管してください。',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="fade-up" style={{ background: '#F8F8F6', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="section-label">FAQ</div>
        <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,30px)', marginBottom: 40 }}>よくあるご質問</h2>
        <div>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid #EFEFED' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '18px 0',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                aria-expanded={open === i}
              >
                <div style={{ background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 12, width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  Q
                </div>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#1A1A16' }}>{f.q}</div>
                <div style={{ color: '#9A9A95', fontSize: 20, transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</div>
              </button>
              {open === i && (
                <div style={{ padding: '0 0 18px 34px', fontSize: 14, color: '#5A5A55', lineHeight: 1.85 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
