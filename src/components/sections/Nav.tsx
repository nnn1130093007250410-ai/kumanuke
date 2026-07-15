'use client'

import { useState, useEffect } from 'react'

// アナウンスバーの高さ（px）
const BAR_H = 36
// Navの高さ（px）= h-14 = 56px
const NAV_H = 56
// 合計オフセット
const TOTAL_H = BAR_H + NAV_H // 92px

const NAV_LINKS = [
  { href: '#about',  label: '製品について' },
  { href: '#scenes', label: '使用シーン' },
  { href: '#faq',    label: 'FAQ' },
  { href: '/guide',  label: '対策ガイド' },
  { href: '/stores', label: '取扱店' },
  { href: '/data',   label: '📊 環境省データ' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      {/* ① アナウンスバー ── 常時表示・全画面幅 */}
      <a
        href="/map"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 52,
          height: BAR_H,
          background: 'linear-gradient(90deg, #0F2E16 0%, #143D1E 50%, #0F2E16 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        {/* 点滅ドット */}
        <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#5EC97C',
              animation: 'ping 1.6s cubic-bezier(0,0,0.2,1) infinite',
              opacity: 0.6,
            }}
          />
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#5EC97C',
            }}
          />
        </span>

        {/* PC用テキスト */}
        <span
          className="hidden sm:inline"
          style={{ color: 'rgba(255,255,255,0.88)', fontSize: 12, fontWeight: 600, letterSpacing: '0.03em' }}
        >
          🗺&nbsp;全国熊出没マップ公開中 — 最新情報を今すぐ確認
        </span>

        {/* スマホ用テキスト */}
        <span
          className="sm:hidden"
          style={{ color: 'rgba(255,255,255,0.88)', fontSize: 11, fontWeight: 600 }}
        >
          🗺&nbsp;熊出没マップ公開中
        </span>

        <span
          className="hidden sm:inline"
          style={{
            background: '#5EC97C',
            color: '#0F2E16',
            fontSize: 10,
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: 3,
            letterSpacing: '0.06em',
            flexShrink: 0,
          }}
        >
          MAP →
        </span>
      </a>

      {/* Ping animation */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

      {/* ② Main Nav ── top = バーの高さぶん下げる */}
      <nav
        className={`fixed left-0 right-0 z-50 h-14 flex items-center justify-between px-5 md:px-6 transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
        style={{
          top: BAR_H,
          background: 'rgba(255,255,255,0.97)',
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
        <ul className="hidden md:flex items-center gap-5 list-none m-0 p-0">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-xs font-medium"
                style={{ color: '#5A5A55', textDecoration: 'none' }}
              >
                {label}
              </a>
            </li>
          ))}

          {/* ② MAP CTA ── オレンジボタン */}
          <li>
            <a
              href="/map"
              className="text-xs font-bold flex items-center gap-1"
              style={{
                background: '#E07A30',
                color: '#fff',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 4,
                letterSpacing: '0.02em',
              }}
            >
              🗺 出没マップ
            </a>
          </li>

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
              display: 'block', width: 22, height: 2, background: '#143D1E', borderRadius: 1,
              transformOrigin: 'center',
              transition: 'transform 0.25s, opacity 0.25s',
              transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block', width: 22, height: 2, background: '#143D1E', borderRadius: 1,
              transition: 'opacity 0.2s',
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block', width: 22, height: 2, background: '#143D1E', borderRadius: 1,
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
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer ── top = バー + Nav の高さ */}
      <div
        className="md:hidden fixed left-0 right-0 z-40"
        style={{
          top: TOTAL_H,
          background: '#fff',
          borderBottom: '1px solid #EFEFED',
          boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.24s',
          transform: open ? 'translateY(0)' : 'translateY(-110%)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        aria-hidden={!open}
      >
        {/* MAP専用ブロック（スマホドロワー最上部） */}
        <div style={{ padding: '14px 16px 12px', background: '#FFF8F4', borderBottom: '2px solid #E07A30' }}>
          <a
            href="/map"
            onClick={close}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#E07A30',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              padding: '13px 18px',
              borderRadius: 6,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(224,122,48,0.35)',
            }}
          >
            <span>🗺&nbsp;全国熊出没マップを見る</span>
            <span style={{ fontSize: 13, opacity: 0.9 }}>→</span>
          </a>
          <p style={{ margin: '8px 2px 0', fontSize: 11, color: '#92400E', lineHeight: 1.5 }}>
            日本全国102,000件超 + 世界35カ国のクマ出没情報をマップで確認
          </p>
        </div>

        {/* 通常のナビリスト */}
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
          <li className="px-5 pt-4">
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

      {/* ③ スマホ専用フローティングMAPボタン */}
      <a
        href="/map"
        className="md:hidden"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 16,
          zIndex: 45,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: '#E07A30',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(224,122,48,0.5)',
          gap: 1,
        }}
        aria-label="熊出没マップを開く"
      >
        <span style={{ fontSize: 24, lineHeight: 1 }}>🗺</span>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.04em', lineHeight: 1 }}>MAP</span>
      </a>
    </>
  )
}
