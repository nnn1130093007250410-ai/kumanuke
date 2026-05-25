export default function Hero() {
  return (
    <section
      className="mt-14 grid"
      style={{
        minHeight: '88vh',
        gridTemplateColumns: '1fr 1fr',
        background: '#0C2914',
      }}
      aria-label="ヒーローセクション"
    >
      {/* Left */}
      <div className="flex flex-col justify-center px-12 py-16 relative z-10" style={{ paddingLeft: 'clamp(24px,5vw,56px)' }}>
        {/* Badge */}
        <div
          className="flex items-center gap-2 w-fit mb-6 text-xs font-bold tracking-widest"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: 'rgba(255,255,255,0.7)',
            padding: '5px 12px',
            borderRadius: '2px',
            letterSpacing: '0.14em',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E07A30', display: 'inline-block' }} />
          植物由来成分 ／ 国内企画・品質管理
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,38px)', color: '#fff', lineHeight: 1.45, marginBottom: 8 }}>
          熊との遭遇を防ぐ、<br />
          <em style={{ fontStyle: 'normal', color: '#E07A30' }}>予防型対策</em>を。
        </h1>
        <p style={{ fontFamily: 'var(--font-en)', fontSize: 'clamp(32px,5vw,58px)', fontWeight: 700, color: '#fff', letterSpacing: '0.08em', lineHeight: 1, marginBottom: 24 }}>
          KUMANUKE
        </p>

        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.85, marginBottom: 32, maxWidth: 400 }}>
          エリア散布型の野生動物対策スプレー。<br />
          植物由来成分を使用し、OCガス・カプサイシン不使用。<br />
          キャンプ・登山・農業・ゴミ置き場管理など幅広い場面での<br />
          事前対策としてご活用いただけます。
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['OCガス不使用', 'カプサイシン不使用', '植物由来成分', 'エリア散布型', '200ml'].map((t) => (
            <span
              key={t}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.11)',
                color: 'rgba(255,255,255,0.65)',
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 2,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3">
          <a
            href="#wholesale"
            style={{
              background: '#E07A30',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              padding: '13px 26px',
              borderRadius: 4,
              textDecoration: 'none',
            }}
          >
            卸・法人向けお問い合わせ
          </a>
          <a
            href="#about"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 500,
              fontSize: 14,
              padding: '13px 22px',
              borderRadius: 4,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            製品詳細を見る
          </a>
        </div>
      </div>

      {/* Right: SVG illustration */}
      <div className="hidden md:flex relative items-center justify-center" style={{ background: '#1B3A22' }} aria-hidden="true">
        <svg viewBox="0 0 480 520" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <rect width="480" height="520" fill="#152A1A" />
          <ellipse cx="60" cy="200" rx="45" ry="90" fill="#1F3D22" opacity="0.8" />
          <ellipse cx="380" cy="180" rx="50" ry="100" fill="#1A3520" opacity="0.9" />
          <ellipse cx="440" cy="210" rx="40" ry="85" fill="#204028" opacity="0.7" />
          <ellipse cx="240" cy="420" rx="280" ry="60" fill="#0E2012" />
          <circle cx="240" cy="320" r="120" fill="none" stroke="rgba(200,230,200,0.05)" strokeWidth="1" strokeDasharray="4,6" />
          <circle cx="240" cy="320" r="90" fill="none" stroke="rgba(200,230,200,0.07)" strokeWidth="1" strokeDasharray="3,5" />
          <circle cx="240" cy="320" r="60" fill="rgba(31,92,46,0.12)" stroke="rgba(200,230,200,0.1)" strokeWidth="1" />
          {[
            [200,280,2,0.4],[220,265,1.5,0.35],[265,275,2.5,0.45],
            [280,295,2,0.3],[215,310,1.5,0.4],[260,310,2,0.38],[240,285,1.5,0.35],
          ].map(([cx,cy,r,op],i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={`rgba(150,220,160,${op})`} />
          ))}
          <ellipse cx="170" cy="355" rx="35" ry="25" fill="#0D1E10" />
          <ellipse cx="168" cy="335" rx="22" ry="22" fill="#0D1E10" />
          <circle cx="158" cy="326" r="8" fill="#0D1E10" />
          <circle cx="178" cy="326" r="8" fill="#0D1E10" />
          <ellipse cx="145" cy="375" rx="10" ry="7" fill="#0D1E10" />
          <ellipse cx="195" cy="375" rx="10" ry="7" fill="#0D1E10" />
          <circle cx="162" cy="327" r="2" fill="rgba(255,255,255,0.12)" />
          <circle cx="174" cy="327" r="2" fill="rgba(255,255,255,0.12)" />
          <circle cx="175" cy="350" r="55" fill="none" stroke="rgba(224,122,48,0.18)" strokeWidth="1.5" strokeDasharray="4,4" />
          <rect x="208" y="150" width="64" height="110" rx="12" fill="#1F5C2E" />
          <rect x="208" y="150" width="64" height="110" rx="12" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="218" y="162" width="44" height="68" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.5" />
          <text x="240" y="183" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="9" fontFamily="'DM Sans',sans-serif" fontWeight="700" letterSpacing="2">KUMA</text>
          <text x="240" y="195" textAnchor="middle" fill="rgba(224,122,48,0.9)" fontSize="9" fontFamily="'DM Sans',sans-serif" fontWeight="700" letterSpacing="2">NUKE</text>
          <text x="240" y="215" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif">200ml</text>
          <text x="240" y="226" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="sans-serif">エリア散布型</text>
          <rect x="228" y="140" width="24" height="14" rx="4" fill="#2A7A3C" />
          <rect x="252" y="142" width="20" height="8" rx="3" fill="#3A9A4C" transform="rotate(-15,252,146)" />
          <ellipse cx="270" cy="132" rx="8" ry="4" fill="rgba(150,220,160,0.18)" transform="rotate(-15,270,132)" />
          <ellipse cx="285" cy="120" rx="6" ry="3" fill="rgba(150,220,160,0.12)" transform="rotate(-20,285,120)" />
          <rect x="208" y="236" width="64" height="24" rx="2" fill="rgba(224,122,48,0.28)" />
          <text x="240" y="252" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="7" fontFamily="sans-serif">植物由来成分</text>
          <rect x="290" y="158" width="92" height="34" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.5" />
          <text x="336" y="172" textAnchor="middle" fill="rgba(224,122,48,0.9)" fontSize="8" fontFamily="sans-serif" fontWeight="700">OCガス不使用</text>
          <text x="336" y="184" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif">カプサイシン不使用</text>
          <text x="48" y="430" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="monospace">WILDLIFE DETERRENT</text>
          <text x="48" y="442" fill="rgba(255,255,255,0.07)" fontSize="7" fontFamily="monospace">AREA SPRAY TYPE / PLANT-BASED</text>
        </svg>
      </div>
    </section>
  )
}
