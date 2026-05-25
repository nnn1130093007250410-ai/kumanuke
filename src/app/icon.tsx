import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// 熊の肉球アイコン（32×32）
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#143D1E',
          borderRadius: 7,
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* 指のパッド × 4 */}
        <div style={{ position: 'absolute', width: 7, height: 7, background: '#E07A30', borderRadius: '50%', top: 5, left: 4, display: 'flex' }} />
        <div style={{ position: 'absolute', width: 7, height: 7, background: '#E07A30', borderRadius: '50%', top: 3, left: 11, display: 'flex' }} />
        <div style={{ position: 'absolute', width: 7, height: 7, background: '#E07A30', borderRadius: '50%', top: 3, left: 18, display: 'flex' }} />
        <div style={{ position: 'absolute', width: 7, height: 7, background: '#E07A30', borderRadius: '50%', top: 5, right: 3, display: 'flex' }} />
        {/* メインパッド */}
        <div style={{ position: 'absolute', width: 18, height: 14, background: '#E07A30', borderRadius: 7, bottom: 4, left: 7, display: 'flex' }} />
      </div>
    ),
    { ...size }
  )
}
