import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// iOS ホーム画面アイコン（180×180）
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#143D1E',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* 指のパッド × 4 */}
        <div style={{ position: 'absolute', width: 38, height: 38, background: '#E07A30', borderRadius: '50%', top: 28, left: 22, display: 'flex' }} />
        <div style={{ position: 'absolute', width: 38, height: 38, background: '#E07A30', borderRadius: '50%', top: 16, left: 62, display: 'flex' }} />
        <div style={{ position: 'absolute', width: 38, height: 38, background: '#E07A30', borderRadius: '50%', top: 16, left: 102, display: 'flex' }} />
        <div style={{ position: 'absolute', width: 38, height: 38, background: '#E07A30', borderRadius: '50%', top: 28, right: 20, display: 'flex' }} />
        {/* メインパッド */}
        <div style={{ position: 'absolute', width: 100, height: 78, background: '#E07A30', borderRadius: 36, bottom: 22, left: 40, display: 'flex' }} />
      </div>
    ),
    { ...size }
  )
}
