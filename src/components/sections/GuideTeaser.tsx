import Link from 'next/link'

const guides = [
  {
    href: '/guide/bear-olfactory-science',
    title: '熊が匂いで近づかない理由｜科学的メカニズムを解説',
    tag: '科学・研究',
    tagColor: '#0C5C3E',
  },
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

        {/* Map promotion banner */}
        <Link
          href="/map"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginTop: 28,
            background: '#0F2E16',
            borderRadius: 10,
            padding: '24px 28px',
            textDecoration: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 36, lineHeight: 1 }}>🗺</span>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.12em', margin: '0 0 4px' }}>
                KUMANUKE MAP
              </p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 4px', lineHeight: 1.4 }}>
                全国の熊出没・目撃情報をマップで確認
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                都道府県別・危険度別にフィルタリング。ヒートマップ表示対応。
              </p>
            </div>
          </div>
          <span
            style={{
              background: '#5EC97C',
              color: '#0F2E16',
              fontWeight: 700,
              fontSize: 13,
              padding: '10px 24px',
              borderRadius: 6,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            マップを見る →
          </span>
        </Link>
      </div>
    </section>
  )
}
