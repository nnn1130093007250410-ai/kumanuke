export default function InstagramBand() {
  return (
    <section
      id="instagram"
      style={{
        background: 'linear-gradient(90deg, #F58529 0%, #DD2A7B 52%, #8134AF 100%)',
        padding: '26px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 920,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#fff' }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.6" stroke="#fff" strokeWidth="1.7" />
            <circle cx="12" cy="12" r="4.3" stroke="#fff" strokeWidth="1.7" />
            <circle cx="17.4" cy="6.6" r="1.3" fill="#fff" />
          </svg>
          <div style={{ lineHeight: 1.35 }}>
            <div style={{ fontSize: 13, opacity: 0.92 }}>最新情報はInstagramで</div>
            <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: '0.02em' }}>＠kumanuke2026</div>
          </div>
        </div>
        <a
          href="https://www.instagram.com/kumanuke2026/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#fff',
            color: '#C1268A',
            fontWeight: 700,
            fontSize: 15,
            padding: '13px 34px',
            borderRadius: 999,
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            whiteSpace: 'nowrap',
          }}
        >
          フォローする →
        </a>
      </div>
    </section>
  )
}
