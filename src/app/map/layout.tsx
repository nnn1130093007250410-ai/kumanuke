import Link from 'next/link'

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        style={{
          background: '#0F2E16',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 52,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontSize: 16,
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: '0.08em',
            }}
          >
            KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>|</span>
          <Link
            href="/map"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#5EC97C',
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            🗺 MAP
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Link
            href="/guide"
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
          >
            対策ガイド
          </Link>
          <Link
            href="/"
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
          >
            製品TOP
          </Link>
        </div>
      </nav>

      {children}

      <footer style={{ background: '#0F2E16', padding: '32px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link
          href="/map"
          style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontSize: 18,
            fontWeight: 700,
            color: '#fff',
            textDecoration: 'none',
            letterSpacing: '0.1em',
          }}
        >
          KUMANUKE <span style={{ color: '#5EC97C' }}>MAP</span>
        </Link>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 10, lineHeight: 1.8, maxWidth: 560, margin: '12px auto 0' }}>
          掲載情報は自治体・報道等を参考にしています。最新情報は各自治体発表をご確認ください。
          <br />
          本マップは熊・野生動物対策の情報提供を目的としています。
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>KUMANUKE TOP</Link>
          <Link href="/guide" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>対策ガイド</Link>
          <Link href="/privacy" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>プライバシーポリシー</Link>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 16 }}>
          © 2026 BUBUWORKS合同会社. All rights reserved.
        </p>
      </footer>
    </>
  )
}
