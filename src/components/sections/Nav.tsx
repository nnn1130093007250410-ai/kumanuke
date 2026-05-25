'use client'

import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #EFEFED',
      }}
    >
      {/* Logo */}
      <a href="/" className="font-en font-bold text-xl tracking-widest" style={{ color: '#143D1E', fontFamily: 'var(--font-en)' }}>
        KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
      </a>

      {/* Links (desktop) */}
      <ul className="hidden md:flex gap-6 list-none">
        {[
          { href: '#about',      label: '製品について' },
          { href: '#scenes',     label: '使用シーン' },
          { href: '#faq',        label: 'FAQ' },
        ].map(({ href, label }) => (
          <li key={href}>
            <a href={href} className="text-xs font-medium" style={{ color: '#5A5A55', textDecoration: 'none' }}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#wholesale"
            className="text-xs font-bold rounded px-3 py-1.5"
            style={{ background: '#143D1E', color: '#fff', textDecoration: 'none' }}
          >
            卸・法人向け
          </a>
        </li>
      </ul>
    </nav>
  )
}
