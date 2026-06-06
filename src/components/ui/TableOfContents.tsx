'use client'
import { useEffect, useState } from 'react'

export type TocItem = { id: string; title: string; level?: 1 | 2 }

export default function TableOfContents({ items, accentColor = '#5EC97C' }: { items: TocItem[]; accentColor?: string }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <nav style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10,
      padding: '18px 20px',
      marginBottom: 40,
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: accentColor, letterSpacing: '0.1em', margin: '0 0 12px' }}>
        📋 目次
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.level === 2 ? 14 : 0 }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              style={{
                fontSize: item.level === 2 ? 12 : 13,
                color: activeId === item.id ? accentColor : 'rgba(255,255,255,0.6)',
                fontWeight: activeId === item.id ? 700 : 400,
                textDecoration: 'none',
                borderLeft: activeId === item.id ? `2px solid ${accentColor}` : '2px solid transparent',
                paddingLeft: 8,
                transition: 'color 0.2s',
                display: 'block',
                lineHeight: 1.5,
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
