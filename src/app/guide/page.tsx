import type { Metadata } from 'next'
import Link from 'next/link'
import GuideArticleGrid from './GuideArticleGrid'

export const metadata: Metadata = {
  title: '熊・野生動物対策ガイド | KUMANUKE',
  description: 'キャンプ・登山・農地・ゴミ置き場など場所別の熊・野生動物対策を解説。KUMANUKEが提供する実践的な対策ガイドです。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide' },
}

export default function GuidePage() {
  return (
    <main style={{ background: '#F8F8F6', minHeight: '60vh' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', marginBottom: 10 }}>KUMANUKE GUIDE</p>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.4 }}>
            熊・野生動物対策ガイド
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, maxWidth: 560 }}>
            場所・用途別の対策方法をわかりやすく解説します。
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>
        <GuideArticleGrid />

        <div style={{ marginTop: 48, background: '#143D1E', borderRadius: 8, padding: '32px 28px', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>卸・法人でのご購入</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 20 }}>農業組合・自治体・アウトドアショップなど法人・卸のお取引を承っています。</p>
          <Link href="/#wholesale" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 4, textDecoration: 'none' }}>
            お問い合わせはこちら
          </Link>
        </div>
      </div>
    </main>
  )
}
