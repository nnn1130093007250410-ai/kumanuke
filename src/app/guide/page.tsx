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
      <div style={{ background: 'linear-gradient(135deg, #0F2E16 0%, #143D1E 60%, #1A5230 100%)', padding: '56px 24px 52px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: 12 }}>KUMANUKE GUIDE</p>
          <h1 style={{ fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.3 }}>
            🐻 熊・野生動物対策ガイド
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, maxWidth: 600, marginBottom: 28 }}>
            科学的根拠にもとづく対策から、場所・用途別の実践方法まで。農地・登山・キャンプ・住宅地ごとのリスクを理解して、最適な対策を設計できます。
          </p>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { n: '33', label: '記事数' },
              { n: '5', label: 'カテゴリ' },
              { n: '2,100×', label: 'クマの嗅覚（人比）' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#5EC97C', fontFamily: 'var(--font-dm-sans, sans-serif)', letterSpacing: '-0.02em' }}>{s.n}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* ── 注目特集 ── */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#EF4444', letterSpacing: '0.15em' }}>🔥 注目特集</span>
            <span style={{ fontSize: 11, color: '#9A9A95' }}>データで見るクマの実態</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 12 }}>
            {[
              {
                href: '/guide/bear-october-danger',
                bg: 'linear-gradient(135deg, #7F1D1D 0%, #1A0A0A 100%)',
                accent: '#EF4444',
                stat: '23%',
                statLabel: '年間出没が10月に集中',
                title: '最も危険な月は10月',
                sub: 'クマ出没・人身被害データ',
              },
              {
                href: '/guide/bear-rapid-increase',
                bg: 'linear-gradient(135deg, #1E1B4B 0%, #0A0F1E 100%)',
                accent: '#818CF8',
                stat: '6.3×',
                statLabel: '6年間での増加倍率',
                title: 'なぜ急増したのか',
                sub: '2020→2025年の変化',
              },
              {
                href: '/guide/bear-prefecture-ranking',
                bg: 'linear-gradient(135deg, #0F2E16 0%, #0A1628 100%)',
                accent: '#5EC97C',
                stat: '1位',
                statLabel: '秋田県が断トツ全国1位',
                title: '都道府県ランキング',
                sub: '全国TOP20の実態',
              },
            ].map((card) => (
              <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: card.bg,
                  borderRadius: 12,
                  padding: '24px 20px',
                  color: '#fff',
                  border: `1px solid ${card.accent}33`,
                  transition: 'transform 0.15s',
                }}>
                  <div style={{
                    fontSize: 'clamp(32px,6vw,44px)',
                    fontWeight: 900,
                    color: card.accent,
                    fontFamily: 'var(--font-dm-sans)',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>{card.stat}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>{card.statLabel}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{card.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{card.sub}</div>
                  <div style={{
                    marginTop: 16, fontSize: 11, fontWeight: 700,
                    color: card.accent, letterSpacing: '0.05em',
                  }}>読む →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <GuideArticleGrid />

        <div style={{ marginTop: 48, background: '#143D1E', borderRadius: 8, padding: '32px 28px', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>卸・法人でのご購入</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 20 }}>農業組合・自治体・アウトドアショップなど法人・卸のお取引を承っています。</p>
          <Link href="/products/kumanuke#wholesale" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 4, textDecoration: 'none' }}>
            お問い合わせはこちら
          </Link>
        </div>
      </div>
    </main>
  )
}
