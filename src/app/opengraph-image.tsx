import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'KUMANUKE｜日本全国クマ出没マップ＆データポータル'
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
          background: '#0F2D18',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 背景グリッド */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(94,201,124,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(94,201,124,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          display: 'flex',
        }} />

        {/* 右側 アクセントサークル */}
        <div style={{ position: 'absolute', right: -100, top: -80, width: 560, height: 560, borderRadius: '50%', background: 'rgba(224,122,48,0.07)', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 80, bottom: -160, width: 400, height: 400, borderRadius: '50%', background: 'rgba(31,92,46,0.35)', display: 'flex' }} />

        {/* 左側コンテンツ */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 72px', flex: 1, zIndex: 1 }}>

          {/* ロゴ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '0.12em', display: 'flex' }}>
              KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
            </div>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)', display: 'flex' }} />
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', display: 'flex' }}>日本最大級クマ情報ポータル</div>
          </div>

          {/* メインキャッチ */}
          <div style={{ fontSize: 52, fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 20, display: 'flex', flexDirection: 'column' }}>
            <span style={{ display: 'flex' }}>全国クマ出没データを</span>
            <span style={{ color: '#5EC97C', display: 'flex' }}>地図で、数字で。</span>
          </div>

          {/* サブテキスト */}
          <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 44, display: 'flex' }}>
            ArcGIS・自治体オープンデータを毎週自動収集。<br />
            都道府県別統計・対策ガイド・世界の熊情報を網羅。
          </div>

          {/* 統計バッジ */}
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { num: '110,000+', label: '出没件数' },
              { num: '47', label: '都道府県' },
              { num: '35+', label: '対策ガイド' },
            ].map(({ num, label }) => (
              <div key={label} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)',
                borderRadius: 10, padding: '14px 24px',
              }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#E07A30', display: 'flex' }}>{num}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4, display: 'flex' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 右側 マップ風イラスト */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          width: 360, paddingRight: 48, zIndex: 1,
        }}>
          <div style={{ fontSize: 120, display: 'flex' }}>🐻</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', marginTop: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ display: 'flex' }}>毎週月曜 自動更新</span>
            <span style={{ display: 'flex', marginTop: 4 }}>kumanuke.bubuworks.co.jp</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
