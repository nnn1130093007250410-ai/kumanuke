import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'KUMANUKE 熊対策ガイド｜登山・キャンプ・農業別の実践的対策'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex',
        background: '#1A2E1E', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden',
      }}>
        {/* 背景 */}
        <div style={{ position: 'absolute', left: -60, bottom: -60, width: 400, height: 400, borderRadius: '50%', background: 'rgba(94,201,124,0.08)', display: 'flex' }} />
        <div style={{ position: 'absolute', right: -40, top: -40, width: 300, height: 300, borderRadius: '50%', background: 'rgba(224,122,48,0.1)', display: 'flex' }} />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 80px', flex: 1, zIndex: 1 }}>
          {/* ブランド */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '0.1em', display: 'flex' }}>KUMA<span style={{ color: '#E07A30' }}>NUKE</span></div>
            <div style={{ background: '#E07A30', color: '#fff', fontSize: 12, fontWeight: 800, padding: '3px 10px', borderRadius: 4, letterSpacing: '0.1em', display: 'flex' }}>GUIDE</div>
          </div>

          <div style={{ fontSize: 50, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 20, display: 'flex', flexDirection: 'column' }}>
            <span style={{ display: 'flex' }}>科学的根拠に基づく</span>
            <span style={{ color: '#5EC97C', display: 'flex' }}>クマ対策ガイド</span>
          </div>

          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 40, display: 'flex' }}>
            登山・キャンプ・農業・ゴミ管理別の実践的対策を<br />生態学・行動学の視点から解説。
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {['🏔 登山・ハイキング', '⛺ キャンプ', '🌾 農業被害', '🗑 ゴミ管理', '🐻 生態・習性'].map((tag) => (
              <div key={tag} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.7)', fontSize: 16, padding: '8px 16px', borderRadius: 6, display: 'flex' }}>{tag}</div>
            ))}
          </div>
        </div>

        {/* 右側 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 300, zIndex: 1 }}>
          <div style={{ fontSize: 100, display: 'flex' }}>📖</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: '#5EC97C', marginTop: 8, display: 'flex' }}>35+</div>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', display: 'flex' }}>記事掲載中</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
