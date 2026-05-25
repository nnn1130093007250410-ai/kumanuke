export function CTA() {
  return (
    <section id="cta" style={{ background: '#143D1E', textAlign: 'center', padding: '72px 24px' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px,3vw,32px)', color: '#fff', marginBottom: 12 }}>
        熊との遭遇予防に、<br />事前対策を。
      </h2>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 36 }}>
        KUMANUKE — 植物由来成分のエリア散布型 野生動物対策スプレー
      </p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="#wholesale" style={{ background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 15, padding: '15px 36px', borderRadius: 4, textDecoration: 'none' }}>
          卸・法人のお問い合わせ
        </a>
        <a href="https://www.rakuten.co.jp" target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', color: 'rgba(255,255,255,0.75)', fontWeight: 600, fontSize: 14, padding: '15px 26px', borderRadius: 4, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
          楽天で購入
        </a>
        <a href="https://www.amazon.co.jp" target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', color: 'rgba(255,255,255,0.75)', fontWeight: 600, fontSize: 14, padding: '15px 26px', borderRadius: 4, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
          Amazonで購入
        </a>
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
    ],
    '購入・お問い合わせ': [
      { href: '#wholesale', label: '卸・法人向け' },
      { href: 'https://www.rakuten.co.jp', label: '楽天市場', external: true },
      { href: 'https://www.amazon.co.jp', label: 'Amazon', external: true },
      { href: 'mailto:info@kumanuke.jp', label: 'メールでのお問い合わせ' },
    ],
  }

  return (
    <footer style={{ background: '#1A1A16', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 40, paddingBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-en)', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
              KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.75 }}>
              植物由来成分を使用した<br />エリア散布型 野生動物対策スプレー<br />国内企画・品質管理
            </p>
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
          <div>© 2024 KUMANUKE. All rights reserved.</div>
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
