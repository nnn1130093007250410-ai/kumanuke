'use client'
import { useEffect, useState } from 'react'

export default function ScrollProgress({ color = 'linear-gradient(to right, #5EC97C, #143D1E, #E07A30)' }: { color?: string }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop  = doc.scrollTop || document.body.scrollTop
      const scrollable = doc.scrollHeight - doc.clientHeight
      setPct(scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 9999, background: 'rgba(0,0,0,0.12)', pointerEvents: 'none' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, transition: 'width 0.08s linear' }} />
    </div>
  )
}
