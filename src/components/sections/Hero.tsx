// 商品画像を public/product.jpg に置くと自動で表示されます
// 画像が無い場合は SVG プレースホルダーを表示します

const TAGS = ['OCガス不使用', 'カプサイシン不使用', '植物由来成分', 'エリア散布型', '200ml']

const SCENES = [
  { emoji: '⛺', label: 'キャンプ・登山' },
  { emoji: '🌾', label: '農業・田畑' },
  { emoji: '🏕️', label: '山林作業' },
  { emoji: '🗑️', label: 'ゴミ置き場管理' },
]

export default function Hero() {
  return (
    <section
      className="mt-14"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2,1fr)',
        background: '#0C2914',
      }}
      aria-label="ヒーローセクション"
    >
      {/* ===== Left: Copy ===== */}
      <div
        className="flex flex-col justify-center relative z-10"
        style={{ padding: 'clamp(40px,6vw,64px) clamp(20px,5vw,56px)', minHeight: '88vh' }}
      >
        {/* Badge */}
        <div
          className="flex items-center gap-2 w-fit mb-6 text-xs font-bold"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: 'rgba(255,255,255,0.7)',
            padding: '5px 12px',
            borderRadius: '2px',
            letterSpacing: '0.14em',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E07A30', display: 'inline-block', flexShrink: 0 }} />
          植物由来成分 ／ 国内企画・品質管理
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(20px,2.8vw,36px)',
            color: '#fff',
            lineHeight: 1.5,
            marginBottom: 8,
          }}
        >
          熊との遭遇を防ぐ、<br />
          <em style={{ fontStyle: 'normal', color: '#E07A30' }}>予防型対策</em>を。
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-en)',
            fontSize: 'clamp(28px,4.5vw,54px)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.08em',
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          KUMANUKE
        </p>

        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(12px,1.2vw,14px)',
            lineHeight: 1.85,
            marginBottom: 28,
            maxWidth: 400,
          }}
        >
          エリア散布型の野生動物対策スプレー。<br />
          植物由来成分を使用し、OCガス・カプサイシン不使用。<br />
          キャンプ・登山・農業・ゴミ置き場管理など<br />
          幅広い場面での事前対策としてご活用いただけます。
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((t) => (
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

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <a
            href="#wholesale"
            style={{
              background: '#E07A30',
              color: '#fff',
              fontWeight: 700,
              fontSize: 'clamp(12px,1.1vw,14px)',
              padding: '13px 24px',
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
              fontSize: 'clamp(12px,1.1vw,14px)',
              padding: '13px 20px',
              borderRadius: 4,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            製品詳細を見る
          </a>
        </div>
      </div>

      {/* ===== Right: Product + Scenes ===== */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}
        aria-hidden="true"
      >
        {/* 上 55%: 商品イメージ */}
        <div
          className="relative flex items-center justify-center"
          style={{ flex: '0 0 57%', background: '#1B3A22', minHeight: 220 }}
        >
          {/* SVG プレースホルダー (public/product.jpg を置くと差し替え可能) */}
          <svg
            viewBox="0 0 320 380"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '68%', maxWidth: 220, height: 'auto' }}
          >
            <defs>
              <radialGradient id="hbg" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#245c30" />
                <stop offset="100%" stopColor="#0d1e10" />
              </radialGradient>
            </defs>
            <ellipse cx="160" cy="355" rx="180" ry="22" fill="#0A1A0C" opacity="0.7" />
            {/* ボトル本体 */}
            <rect x="106" y="90" width="108" height="210" rx="20" fill="url(#hbg)" />
            <rect x="106" y="90" width="108" height="210" rx="20" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" />
            {/* 光沢 */}
            <rect x="118" y="102" width="26" height="190" rx="10" fill="rgba(255,255,255,0.04)" />
            {/* ラベル枠 */}
            <rect x="116" y="118" width="88" height="130" rx="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
            {/* ブランド名 */}
            <text x="160" y="150" textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="14" fontFamily="'DM Sans',sans-serif" fontWeight="700" letterSpacing="3">KUMA</text>
            <text x="160" y="170" textAnchor="middle" fill="rgba(224,122,48,0.95)" fontSize="14" fontFamily="'DM Sans',sans-serif" fontWeight="700" letterSpacing="3">NUKE</text>
            <line x1="126" y1="180" x2="194" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
            <text x="160" y="200" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="sans-serif">エリア散布型 / 200ml</text>
            <text x="160" y="215" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="sans-serif">植物由来成分</text>
            <rect x="116" y="224" width="88" height="17" rx="3" fill="rgba(224,122,48,0.22)" />
            <text x="160" y="236" textAnchor="middle" fill="rgba(255,255,255,0.62)" fontSize="8" fontFamily="sans-serif">OCガス・カプサイシン不使用</text>
            {/* ポンプ */}
            <rect x="142" y="54" width="36" height="40" rx="8" fill="#2A7A3C" />
            <rect x="178" y="56" width="30" height="11" rx="4" fill="#3A9A4C" transform="rotate(-14 178 62)" />
            <ellipse cx="198" cy="46" rx="10" ry="5" fill="rgba(150,220,160,0.2)" transform="rotate(-14 198 46)" />
            {/* 足元の装飾 */}
            {[[106,310],[180,322],[230,308],[270,318],[80,302]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={2.5} fill="rgba(150,220,160,0.13)" />
            ))}
          </svg>

          {/* PRODUCT IMAGE プレースホルダーラベル */}
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(224,122,48,0.15)',
              border: '1px dashed rgba(224,122,48,0.4)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 9,
              padding: '3px 10px',
              borderRadius: 2,
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
            }}
          >
            PRODUCT IMAGE PLACEHOLDER
          </div>
        </div>

        {/* 下 43%: 使用シーン */}
        <div
          className="flex flex-col justify-center"
          style={{ flex: '0 0 43%', padding: '18px 22px', background: '#0E2012', minHeight: 160 }}
        >
          <p
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.32)',
              marginBottom: 12,
              textTransform: 'uppercase',
            }}
          >
            Use Scenes
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {SCENES.map(({ emoji, label }) => (
              <div
                key={label}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 6,
                  padding: '10px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <span style={{ fontSize: 17 }}>{emoji}</span>
                <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: 11, fontWeight: 500 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* モバイル対応: グローバルCSSの@mediaより確実に適用するインラインスタイル調整 */}
      <style>{`
        @media (max-width: 767px) {
          section[aria-label="ヒーローセクション"] {
            grid-template-columns: 1fr !important;
          }
          section[aria-label="ヒーローセクション"] > div:first-child {
            min-height: 0 !important;
            padding-top: 36px !important;
            padding-bottom: 36px !important;
          }
        }
      `}</style>
    </section>
  )
}
