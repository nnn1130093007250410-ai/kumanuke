'use client'
import { useEffect, useState } from 'react'

export default function BackToTop({ bg = '#143D1E' }: { bg?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="ページトップへ戻る"
      style={{
        position: 'fixed', bottom: 28, right: 20, zIndex: 800,
        width: 44, height: 44, borderRadius: '50%',
        background: bg, color: '#fff', border: 'none',
        cursor: 'pointer', fontSize: 18, lineHeight: 1,
        boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.2s, transform 0.2s',
      }}
    >
      ↑
    </button>
  )
}
