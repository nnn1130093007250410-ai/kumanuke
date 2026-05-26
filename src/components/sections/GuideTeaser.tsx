import Link from 'next/link'

const guides = [
  {
    href: '/guide/bear-spray-accidents',
    title: '熊スプレーの誤噴射事故と法的リスク',
    tag: '安全・リスク',
    tagColor: '#DC2626',
  },
  {
    href: '/guide/camping-bear-prevention',
    title: 'キャンプ場・野営地での熊対策',
    tag: 'キャンプ・登山',
    tagColor: '#1F5C2E',
  },
  {
    href: '/guide/farm-bear-prevention',
    title: '農地・畑を熊から守る方法',
    tag: '農業・農地',
    tagColor: '#92400E',
  },
  {
    href: '/guide/garbage-bear-prevention',
    title: 'ゴミ置き場・住宅地の熊対策',
    tag: '住宅・自治体',
    tagColor: '#1E40AF',
  },
  {
    href: '/guide/how-to-choose-bear-repellent',
    title: '熊よけスプレーの種類と選び方',
    tag: '製品知識',
    tagColor: '#6B21A8',
  },
  {
    href: '/guide/hiking-bear-prevention',
    title: '登山・トレッキングでの熊対策',
    tag: 'キャンプ・登山',
    tagColor: '#1F5C2E',
  },
]

export default function GuideTeaser() {
  return (
    <section id="guide" className="fade-up" style={{ background: '#F8F8F6', padding: '80px 24px', borderTop: '1px solid #EFEFED' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="section-label">GUIDE</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,30px)', marginBottom: 0 }}>
            場所別・熊対策ガイド
          </h2>
          <Link
            href="/guide"
            style={{ fontSize: 13, color: '#143D1E', fontWeight: 700, textDecoration: 'none', flexShrink: 0 }}
          >
            すべてのガイドを見る →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                background: '#fff',
                border: '1px solid #DDDDD8',
                borderRadius: 8,
                padding: '20px 20px',
                textDecoration: 'none',
              }}
            >
              <span style={{
                display: 'inline-block',
                background: g.tagColor,
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 3,
                letterSpacing: '0.05em',
                alignSelf: 'flex-start',
              }}>
                {g.tag}
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A16', lineHeight: 1.55 }}>
                {g.title}
              </span>
              <span style={{ fontSize: 12, color: '#143D1E', fontWeight: 600, marginTop: 'auto' }}>
                読む →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
