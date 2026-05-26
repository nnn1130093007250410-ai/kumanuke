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
      <footer style={{ background: '#1A1A16', padding: '32px 24px', textAlign: 'center' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 20, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.1em' }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 16 }}>
          © 2025 BUBUWORKS合同会社. All rights reserved.
        </p>
        <div style={{ marginTop: 12, display: 'flex', gap: 24, justifyContent: 'center' }}>
          <Link href="/privacy" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>プライバシーポリシー</Link>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>対策ガイド一覧</Link>
        </div>
      </footer>
    </>
  )
}
