import Link from 'next/link'

const PHASE1_COUNTRIES = [
  { slug: 'usa',     label: '🇺🇸 USA' },
  { slug: 'canada',  label: '🇨🇦 Canada' },
  { slug: 'finland', label: '🇫🇮 Finland' },
  { slug: 'sweden',  label: '🇸🇪 Sweden' },
]

export default function WorldLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Nav */}
      <nav style={{
        background: '#0D1F2D',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Main row */}
        <div style={{
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 48,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/" style={{
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontSize: 15, fontWeight: 700, color: '#fff',
              textDecoration: 'none', letterSpacing: '0.08em',
            }}>
              KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 14 }}>|</span>
            <Link href="/world" style={{
              fontSize: 12, fontWeight: 700, color: '#60A5FA',
              textDecoration: 'none', letterSpacing: '0.1em',
            }}>
              🌍 WORLD
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/map" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '4px 8px' }}>
              🗺 MAP
            </Link>
            <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '4px 8px' }}>
              📖 ガイド
            </Link>
          </div>
        </div>
        {/* Country tabs row — horizontally scrollable on mobile */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          padding: '0 24px 10px',
          gap: 6,
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}>
          {PHASE1_COUNTRIES.map((c) => (
            <Link key={c.slug} href={`/world/${c.slug}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              fontSize: 11,
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              padding: '4px 12px',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
            }}>
              {c.label}
            </Link>
          ))}
        </div>
      </nav>

      {children}

      <footer style={{
        background: '#0D1F2D',
        padding: '36px 24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <Link href="/world" style={{
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          fontSize: 17, fontWeight: 700, color: '#fff',
          textDecoration: 'none', letterSpacing: '0.1em',
        }}>
          KUMANUKE <span style={{ color: '#60A5FA' }}>WORLD</span>
        </Link>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 10, lineHeight: 1.8, maxWidth: 560, margin: '10px auto 0' }}>
          WORLD BEAR REPORTは海外報道・公的機関情報をもとに日本語で整理・編集しています。
          最新情報は各情報源をご確認ください。
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>TOP</Link>
          <Link href="/map" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>MAP</Link>
          <Link href="/guide" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>対策ガイド</Link>
          <Link href="/privacy" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>プライバシーポリシー</Link>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', marginTop: 14 }}>
          © 2026 BUBUWORKS合同会社. All rights reserved.
        </p>
      </footer>
    </>
  )
}
