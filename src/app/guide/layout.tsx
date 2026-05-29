import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  robots: { index: true, follow: true },
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 読み進めプログレスバー（視覚的アクセント） */}
      <div style={{ height: 3, background: 'linear-gradient(to right, #5EC97C, #143D1E, #E07A30)', position: 'sticky', top: 0, zIndex: 200 }} />

      <nav style={{ background: '#143D1E', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 3, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 17, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.08em' }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600 }}>
            📖 対策ガイド
          </Link>
          <Link href="/map" style={{ fontSize: 12, color: '#5EC97C', fontWeight: 700, textDecoration: 'none' }}>
            🗺 出没マップ
          </Link>
          <Link href="/world" style={{ fontSize: 12, color: '#60A5FA', fontWeight: 700, textDecoration: 'none' }}>
            🌍 WORLD
          </Link>
          <Link href="/products/kumanuke" style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
            製品
          </Link>
        </div>
      </nav>
      {children}

      {/* MAP誘導バナー */}
      <div style={{ background: 'linear-gradient(135deg, #0F2E16 0%, #143D1E 50%, #1A4D24 100%)', padding: '36px 24px', borderTop: '1px solid rgba(94,201,124,0.15)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 36, lineHeight: 1 }}>🗺</div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.15em', marginBottom: 4 }}>
                KUMANUKE MAP — LIVE
              </p>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                全国熊出没マップで今の状況を確認
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                102,000件超の出没データ＋世界35カ国のクマ情報をマップ表示
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
            <Link
              href="/map"
              style={{
                background: '#5EC97C',
                color: '#0F2E16',
                fontWeight: 800,
                fontSize: 13,
                padding: '11px 24px',
                borderRadius: 6,
                textDecoration: 'none',
                textAlign: 'center',
                letterSpacing: '0.03em',
              }}
            >
              🗺 マップを見る →
            </Link>
            <Link
              href="/products/kumanuke"
              style={{
                background: 'rgba(224,122,48,0.15)',
                border: '1px solid rgba(224,122,48,0.4)',
                color: '#E07A30',
                fontWeight: 700,
                fontSize: 12,
                padding: '8px 20px',
                borderRadius: 6,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              🐻 KUMANUKE製品を見る
            </Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }`}</style>

      <footer style={{ background: '#0F0F0E', padding: '36px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 20, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.1em' }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 14, lineHeight: 1.8 }}>
          クマ・野生動物対策情報メディア
        </p>
        <div style={{ marginTop: 14, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/map" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>出没マップ</Link>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>対策ガイド</Link>
          <Link href="/world" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>WORLD</Link>
          <Link href="/products/kumanuke" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>製品</Link>
          <Link href="/privacy" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>プライバシー</Link>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 20 }}>
          © 2026 BUBUWORKS合同会社. All rights reserved.
        </p>
      </footer>
    </>
  )
}
