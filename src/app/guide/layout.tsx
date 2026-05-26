import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  robots: { index: true, follow: true },
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav style={{ background: '#143D1E', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 18, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.08em' }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link href="/guide" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
            対策ガイド
          </Link>
          <Link href="/map" style={{ fontSize: 13, color: '#5EC97C', fontWeight: 700, textDecoration: 'none' }}>
            🗺 出没マップ
          </Link>
          <Link href="/#wholesale" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
            卸・法人のお客様
          </Link>
        </div>
      </nav>
      {children}

      {/* MAP誘導バナー */}
      <div style={{ background: 'linear-gradient(90deg, #0F2E16 0%, #143D1E 50%, #0F2E16 100%)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ position: 'relative', width: 10, height: 10, flexShrink: 0, display: 'inline-block' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#5EC97C', animation: 'ping 1.6s cubic-bezier(0,0,0.2,1) infinite', opacity: 0.6 }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#5EC97C' }} />
            </span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
                🗺 全国熊出没マップ — リアルタイム更新中
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                日本全国82件 + 世界35カ国のクマ出没情報をマップで確認できます
              </p>
            </div>
          </div>
          <Link
            href="/map"
            style={{
              background: '#5EC97C',
              color: '#0F2E16',
              fontWeight: 800,
              fontSize: 13,
              padding: '10px 22px',
              borderRadius: 4,
              textDecoration: 'none',
              flexShrink: 0,
              letterSpacing: '0.03em',
            }}
          >
            マップを見る →
          </Link>
        </div>
      </div>
      <style>{`@keyframes ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }`}</style>

      <footer style={{ background: '#1A1A16', padding: '32px 24px', textAlign: 'center' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 20, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.1em' }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 16 }}>
          © 2026 BUBUWORKS合同会社. All rights reserved.
        </p>
        <div style={{ marginTop: 12, display: 'flex', gap: 24, justifyContent: 'center' }}>
          <Link href="/privacy" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>プライバシーポリシー</Link>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>対策ガイド一覧</Link>
        </div>
      </footer>
    </>
  )
}
