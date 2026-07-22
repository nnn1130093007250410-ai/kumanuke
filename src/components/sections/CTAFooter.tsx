const SHOPS = [
  {
    label: '楽天市場',
    href: 'https://search.rakuten.co.jp/search/mall/KUMANUKE/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#BF0000"/>
        <text x="12" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="sans-serif">R</text>
      </svg>
    ),
    color: '#BF0000',
  },
  {
    label: 'Yahoo!ショッピング',
    href: 'https://shopping.yahoo.co.jp/search/KUMANUKE/0/?first=1&tab_ex=commerce&fr=shp-prop&mcr=9053ed4f8a7f7469bbbfc0f9b3760435&ts=1779687394&sretry=1&sc_i=shopping-pc-web-search-suggest-suggest-kwd-sgstfrom-top--h_srch-kwd&area=13',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#FF0033"/>
        <text x="12" y="17" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" fontFamily="sans-serif">Y!</text>
      </svg>
    ),
    color: '#FF0033',
  },
  {
    label: 'au PAYマーケット',
    href: 'https://wowma.jp/itemlist?at=FP&e_scope=O&non_gr=ex&spe_id=header_search&keyword=KUMANUKE',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#FF6600"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif">au</text>
        <text x="12" y="22" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif">PAY</text>
      </svg>
    ),
    color: '#FF6600',
  },
  {
    label: 'Amazon',
    href: 'https://www.amazon.co.jp/dp/B0H5L7CLK4',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#FF9900"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="sans-serif">amaz</text>
        <text x="12" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="sans-serif">on</text>
      </svg>
    ),
    color: '#FF9900',
  },
]

export function CTA() {
  return (
    <section id="cta" style={{ background: '#143D1E', textAlign: 'center', padding: '72px 24px' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px,3vw,32px)', color: '#fff', marginBottom: 12 }}>
        熊との遭遇予防に、<br />事前対策を。
      </h2>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 36 }}>
        KUMANUKE — 植物由来成分のエリア散布型 野生動物対策スプレー
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 720, margin: '0 auto' }}>
        {/* 卸・法人CTA（主ボタン） */}
        <a
          href="#wholesale"
          style={{
            background: '#E07A30',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            padding: '15px 32px',
            borderRadius: 4,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          卸・法人のお問い合わせ
        </a>
        {/* 購入プラットフォーム */}
        {SHOPS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: 'rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 600,
              fontSize: 13,
              padding: '12px 20px',
              borderRadius: 4,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {s.icon}
            <span>{s.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  const footerLinks = {
    '製品情報': [
      { href: '#about', label: 'KUMANUKEとは' },
      { href: '#scenes', label: '使用シーン' },
      { href: '#faq', label: 'FAQ' },
      { href: '#caution', label: '注意事項' },
      { href: '/guide', label: '対策ガイド' },
      { href: '/map', label: '🗺 熊出没マップ' },
    ],
    '購入': [
      { href: '/stores', label: '取扱店舗一覧' },
      { href: 'https://search.rakuten.co.jp/search/mall/KUMANUKE/', label: '楽天市場', external: true },
      { href: 'https://shopping.yahoo.co.jp/search/KUMANUKE/0/?first=1&tab_ex=commerce&fr=shp-prop&mcr=9053ed4f8a7f7469bbbfc0f9b3760435&ts=1779687394&sretry=1&sc_i=shopping-pc-web-search-suggest-suggest-kwd-sgstfrom-top--h_srch-kwd&area=13', label: 'Yahoo!ショッピング', external: true },
      { href: 'https://wowma.jp/itemlist?at=FP&e_scope=O&non_gr=ex&spe_id=header_search&keyword=KUMANUKE', label: 'au PAYマーケット', external: true },
      { href: 'https://www.amazon.co.jp/dp/B0H5L7CLK4', label: 'Amazon', external: true },
    ],
    'お問い合わせ': [
      { href: '#wholesale', label: '卸・法人向け' },
      { href: '/monitor', label: 'モニター施設募集' },
      { href: 'mailto:kumanuke@bubuworks.co.jp', label: 'メールでのお問い合わせ' },
      { href: '/privacy', label: 'プライバシーポリシー' },
    ],
  }

  return (
    <footer style={{ background: '#1A1A16', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 40, paddingBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-en)', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
              KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.85, marginBottom: 10 }}>
              植物由来成分を使用した<br />エリア散布型 野生動物対策スプレー<br />国内企画・品質管理
            </p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', lineHeight: 1.7 }}>
              BUBUWORKS合同会社<br />
              福島県郡山市安積荒井1-169 C102
            </p>
            <a
              href="https://www.instagram.com/kumanuke2026/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="公式Instagram @kumanuke2026"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
              </svg>
              <span>公式Instagram ＠kumanuke2026</span>
            </a>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: 12, letterSpacing: '0.08em' }}>{title}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {links.map((l) => (
                  <li key={l.label} style={{ marginBottom: 8 }}>
                    <a
                      href={l.href}
                      target={'external' in l && l.external ? '_blank' : undefined}
                      rel={'external' in l && l.external ? 'noopener noreferrer' : undefined}
                      style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', textDecoration: 'none' }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, fontSize: 11, color: 'rgba(255,255,255,0.3)', flexWrap: 'wrap', gap: 8 }}>
          <div>© 2026 BUBUWORKS合同会社. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['国内企画', '品質管理実施', 'OCガス不使用', 'カプサイシン不使用'].map((b) => (
              <span key={b} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, padding: '3px 9px', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
