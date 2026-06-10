import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollProgress from '@/components/ui/ScrollProgress'
import BuyNowBanner from '@/components/ui/BuyNowBanner'
import BackToTop from '@/components/ui/BackToTop'

export const metadata: Metadata = {
  robots: { index: true, follow: true },
}

// ガイド共通 JSON-LD（Article スキーマ）
const guideJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'KUMANUKE 熊対策ガイド',
  description: '登山・キャンプ・農業・ゴミ管理など状況別のクマ対策を科学的根拠に基づいて解説するガイド集。35本以上の記事を掲載。',
  url: 'https://kumanuke.bubuworks.co.jp/guide',
  publisher: {
    '@type': 'Organization',
    name: 'BUBUWORKS合同会社',
    url: 'https://kumanuke.bubuworks.co.jp',
    logo: { '@type': 'ImageObject', url: 'https://kumanuke.bubuworks.co.jp/opengraph-image' },
  },
  inLanguage: 'ja',
  isAccessibleForFree: true,
  about: { '@type': 'Thing', name: 'クマ対策・野生動物対策' },
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }}
      />
      {/* スクロール進捗バー（実機能） */}
      <ScrollProgress />

      <nav style={{ background: '#143D1E', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.06)', height: 48 }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 17, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.08em' }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[
            { href: '/map',   label: '🗺 MAP',   color: '#5EC97C' },
            { href: '/guide', label: '📖 ガイド', color: 'rgba(255,255,255,0.8)' },
            { href: '/world', label: '🌍 WORLD',  color: '#60A5FA' },
            { href: '/data',  label: '📊 データ', color: 'rgba(255,255,255,0.55)' },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{
              fontSize: 11, color: item.color, fontWeight: 700,
              textDecoration: 'none', padding: '6px 10px', borderRadius: 6,
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      {children}
      <BackToTop />

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
                110,000件超の出没データ＋世界35カ国のクマ情報をマップ表示
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

      <BuyNowBanner variant="compact" />
      <footer style={{ background: '#0A0A09', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '52px 24px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* サイトマップ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 32, marginBottom: 48 }}>
            {[
              {
                heading: '🗺 出没マップ',
                links: [
                  { href: '/map', label: '全国マップ' },
                  { href: '/map?year=2026', label: '2026年データ' },
                  { href: '/map?year=2025', label: '2025年データ' },
                  { href: '/recent', label: '最新情報' },
                ],
              },
              {
                heading: '📖 対策ガイド',
                links: [
                  { href: '/guide', label: 'ガイド一覧' },
                  { href: '/guide/bear-october-danger', label: '10月が最も危険' },
                  { href: '/guide/bear-rapid-increase', label: '6年で6倍の理由' },
                  { href: '/guide/bear-prefecture-ranking', label: '都道府県ランキング' },
                  { href: '/guide/bear-seasonal-activity', label: '年間活動パターン' },
                ],
              },
              {
                heading: '🌍 WORLD',
                links: [
                  { href: '/world', label: 'ワールドレポート' },
                  { href: '/world/usa', label: 'アメリカ' },
                  { href: '/world/canada', label: 'カナダ' },
                  { href: '/world/romania', label: 'ルーマニア' },
                  { href: '/world/finland', label: 'フィンランド' },
                ],
              },
              {
                heading: '📊 データ',
                links: [
                  { href: '/data', label: '環境省データ' },
                  { href: '/guide/japan-bear-damage-statistics', label: '被害統計' },
                  { href: '/guide/japan-regional-bear-data', label: '地域別分析' },
                ],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 12 }}>
                  {col.heading}
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', lineHeight: 1.5 }}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ボトムバー */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/" style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 18, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.08em' }}>
              KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
            </Link>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <Link href="/products/kumanuke" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>製品情報</Link>
              <Link href="/monitor" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>モニター募集</Link>
              <Link href="/privacy" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>プライバシー</Link>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>© 2026 BUBUWORKS合同会社</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
