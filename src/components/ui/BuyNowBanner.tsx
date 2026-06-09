import Link from 'next/link'

const SHOPS = [
  {
    label: '楽天市場',
    href: 'https://search.rakuten.co.jp/search/mall/KUMANUKE/',
    color: '#BF0000',
  },
  {
    label: 'Yahoo!ショッピング',
    href: 'https://shopping.yahoo.co.jp/search/KUMANUKE/0/?first=1&tab_ex=commerce',
    color: '#FF0033',
  },
  {
    label: 'au PAYマーケット',
    href: 'https://wowma.jp/itemlist?at=FP&e_scope=O&non_gr=ex&spe_id=header_search&keyword=KUMANUKE',
    color: '#FF6600',
  },
]

export default function BuyNowBanner({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  if (variant === 'compact') {
    return (
      <div
        style={{
          background: '#0F2E16',
          borderTop: '1px solid rgba(224,122,48,0.25)',
          borderBottom: '1px solid rgba(224,122,48,0.25)',
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexWrap: 'wrap',
          gap: 8,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 17 }}>🐻</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#E07A30',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}
          >
            クマ対策スプレー KUMANUKE
          </span>
        </div>

        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {SHOPS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: s.color,
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                padding: '5px 11px',
                borderRadius: 4,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                lineHeight: 1.3,
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    )
  }

  // full variant
  return (
    <div
      style={{
        background: '#0F2E16',
        border: '1px solid rgba(224,122,48,0.3)',
        borderRadius: 10,
        padding: '24px 28px',
        margin: '24px 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 42, lineHeight: 1 }}>🐻</span>

        <div style={{ flex: 1, minWidth: 220 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#E07A30',
              letterSpacing: '0.1em',
              margin: '0 0 4px',
              textTransform: 'uppercase',
            }}
          >
            KUMANUKE 野生動物対策スプレー
          </p>
          <p style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>
            クマが出る地域への外出前に対策を
          </p>
          <p
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.55)',
              margin: '0 0 18px',
              lineHeight: 1.65,
            }}
          >
            植物由来成分・OCガス不使用 / エリア散布型 / カプサイシン不使用
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {SHOPS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: s.color,
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  padding: '9px 18px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.label}で購入 →
              </a>
            ))}
            <Link
              href="/products/kumanuke"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.65)',
                fontSize: 12,
                fontWeight: 600,
                padding: '9px 18px',
                borderRadius: 6,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                whiteSpace: 'nowrap',
              }}
            >
              製品詳細
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
