import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'KUMANUKE 野生動物対策スプレー'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#0C2914',
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: 'absolute',
            right: -80,
            top: -80,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(224,122,48,0.08)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 60,
            bottom: -120,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'rgba(31,92,46,0.4)',
            display: 'flex',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: 'rgba(255,255,255,0.7)',
            padding: '6px 16px',
            borderRadius: 4,
            fontSize: 18,
            letterSpacing: '0.14em',
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#E07A30',
              display: 'inline-block',
            }}
          />
          植物由来成分 ／ 国内企画・品質管理
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.4,
            marginBottom: 16,
            display: 'flex',
          }}
        >
          熊との遭遇を防ぐ、
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#E07A30',
            lineHeight: 1.4,
            marginBottom: 24,
            display: 'flex',
          }}
        >
          予防型対策を。
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '0.08em',
            lineHeight: 1,
            marginBottom: 28,
            display: 'flex',
          }}
        >
          KUMA
          <span style={{ color: '#E07A30' }}>NUKE</span>
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.6,
            maxWidth: 600,
            display: 'flex',
          }}
        >
          エリア散布型の野生動物対策スプレー。OCガス・カプサイシン不使用。
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 32,
            flexWrap: 'wrap',
          }}
        >
          {['OCガス不使用', 'カプサイシン不使用', '植物由来成分', 'エリア散布型'].map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 16,
                padding: '6px 14px',
                borderRadius: 4,
                display: 'flex',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
