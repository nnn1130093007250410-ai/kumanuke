import Link from 'next/link'

export default function StoresBanner() {
  return (
    <section id="stores-banner" style={{ background: '#FBF6EA', padding: '56px 24px', borderTop: '1px solid #EFE7D2', borderBottom: '1px solid #EFE7D2' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 34, lineHeight: 1, marginBottom: 12 }}>🏬</div>
        <p style={{ fontSize: 11, letterSpacing: '0.2em', color: '#B2922A', fontWeight: 700, marginBottom: 10 }}>STORE / 店頭でも購入できます</p>
        <h2 style={{ fontSize: 'clamp(22px,3.4vw,30px)', fontWeight: 700, color: '#143D1E', lineHeight: 1.4, marginBottom: 12 }}>
          全国<span style={{ color: '#E07A30' }}>27店舗</span>で取扱い中
        </h2>
        <p style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.85, marginBottom: 26 }}>
          お近くの釣具店・アウトドアショップでも、KUMANUKEを店頭でお求めいただけます。<br />
          北海道・東北を中心に取扱店を拡大中です。
        </p>
        <Link
          href="/stores"
          style={{
            display: 'inline-block',
            background: '#E07A30',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            padding: '14px 34px',
            borderRadius: 6,
            textDecoration: 'none',
            boxShadow: '0 6px 18px rgba(224,122,48,0.28)',
          }}
        >
          取扱店舗一覧を見る →
        </Link>
      </div>
    </section>
  )
}
