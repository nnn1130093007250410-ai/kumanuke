import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'KUMANUKE｜日本全国クマ出没マップ 110,000件超のデータ'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex',
        background: '#0D1F27', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden',
      }}>
        {/* マップ風グリッド */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(94,201,124,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(94,201,124,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px', display: 'flex',
        }} />

        {/* ピン風装飾 */}
        {[
          { top: 120, left: 680, size: 18, opacity: 0.9, color: '#E07A30' },
          { top: 200, left: 820, size: 14, opacity: 0.7, color: '#E07A30' },
          { top: 160, left: 760, size: 10, opacity: 0.5, color: '#FF6B6B' },
          { top: 280, left: 700, size: 16, opacity: 0.8, color: '#E07A30' },
          { top: 340, left: 860, size: 12, opacity: 0.6, color: '#E07A30' },
          { top: 400, left: 740, size: 20, opacity: 1.0, color: '#FF4444' },
          { top: 440, left: 820, size: 11, opacity: 0.6, color: '#E07A30' },
          { top: 300, left: 900, size: 13, opacity: 0.7, color: '#E07A30' },
          { top: 480, left: 680, size: 15, opacity: 0.8, color: '#E07A30' },
          { top: 520, left: 780, size: 9, opacity: 0.5, color: '#E07A30' },
          { top: 140, left: 940, size: 17, opacity: 0.85, color: '#E07A30' },
          { top: 380, left: 960, size: 12, opacity: 0.65, color: '#E07A30' },
        ].map(({ top, left, size: s, opacity, color }, i) => (
          <div key={i} style={{ position: 'absolute', top, left, width: s, height: s, borderRadius: '50%', background: color, opacity, display: 'flex' }} />
        ))}

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 72px', flex: 1, zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '0.1em', display: 'flex' }}>KUMA<span style={{ color: '#E07A30' }}>NUKE</span></div>
            <div style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: 12, padding: '3px 10px', borderRadius: 4, display: 'flex' }}>インタラクティブマップ</div>
          </div>

          <div style={{ fontSize: 50, fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 18, display: 'flex', flexDirection: 'column' }}>
            <span style={{ display: 'flex' }}>日本全国の</span>
            <span style={{ color: '#5EC97C', display: 'flex' }}>クマ出没を地図で確認</span>
          </div>

          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 44, display: 'flex' }}>
            都道府県・市区町村ごとのクマ出没データを地図上で可視化。<br />
            自分の地域の出没状況をリアルタイムで確認できます。
          </div>

          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: '#E07A30', display: 'flex' }}>110,000+</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', display: 'flex' }}>収録件数（毎週更新）</div>
            </div>
            <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.12)', alignSelf: 'center', display: 'flex' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: '#5EC97C', display: 'flex' }}>47</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', display: 'flex' }}>都道府県対応</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
