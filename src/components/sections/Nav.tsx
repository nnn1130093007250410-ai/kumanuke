'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#about',     label: '製品について' },
  { href: '#scenes',    label: '使用シーン' },
  { href: '#faq',       label: 'FAQ' },
  { href: '/guide',     label: '対策ガイド' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ドロワーが開いているときはスクロール禁止
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 md:px-6 transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #EFEFED',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          className="font-bold text-xl tracking-widest"
          style={{ color: '#143D1E', fontFamily: 'var(--font-en)', textDecoration: 'none' }}
          onClick={close}
        >
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6 list-none m-0 p-0">
          {NAV_LINKS.map(({ href, label }) => (
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

        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}
        >
          <span
            style={{
              display: 'block',
              width: 22,
              height: 2,
              background: '#143D1E',
              borderRadius: 1,
              transformOrigin: 'center',
              transition: 'transform 0.25s, opacity 0.25s',
              transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 22,
              height: 2,
              background: '#143D1E',
              borderRadius: 1,
              transition: 'opacity 0.2s',
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: 22,
              height: 2,
              background: '#143D1E',
              borderRadius: 1,
              transformOrigin: 'center',
              transition: 'transform 0.25s, opacity 0.25s',
              transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className="md:hidden fixed top-14 left-0 right-0 z-40"
        style={{
          background: '#fff',
          borderBottom: '1px solid #EFEFED',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.24s',
          transform: open ? 'translateY(0)' : 'translateY(-110%)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        aria-hidden={!open}
      >
        <ul className="list-none m-0 p-0 pb-4">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} style={{ borderBottom: '1px solid #F2F2F0' }}>
              <a
                href={href}
                onClick={close}
                className="block px-6 py-4 text-sm font-medium"
                style={{ color: '#333', textDecoration: 'none' }}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="px-6 pt-4">
            <a
              href="#wholesale"
              onClick={close}
              className="block text-center text-sm font-bold rounded py-3"
              style={{ background: '#143D1E', color: '#fff', textDecoration: 'none' }}
            >
              卸・法人向けお問い合わせ
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
