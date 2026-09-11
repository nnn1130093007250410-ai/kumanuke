'use client'

import { useState } from 'react'

type Pref = { name: string; slug: string }

const BASE = 'https://kumanuke.bubuworks.co.jp'

export default function WidgetBuilder({ prefectures }: { prefectures: Pref[] }) {
  const [slug, setSlug] = useState('') // '' = 全国
  const [height, setHeight] = useState(520)
  const [copied, setCopied] = useState(false)

  const prefName = slug ? prefectures.find((p) => p.slug === slug)?.name ?? '全国' : '全国'
  const embedSrc = `${BASE}/embed${slug ? `?pref=${slug}` : ''}`
  const linkHref = `${BASE}/map${slug ? `/${slug}` : ''}`
  const linkText = `${prefName}のクマ出没マップ｜KUMANUKE`

  // ★ iframe（表示用）＋ クロール可能な出典リンク（被リンクの本体）をセットで配布する
  const snippet =
    `<iframe src="${embedSrc}" width="100%" height="${height}" ` +
    `style="max-width:440px;border:1px solid #dddddd;border-radius:10px;" ` +
    `title="${prefName}のクマ出没情報 - KUMANUKE" loading="lazy"></iframe>\n` +
    `<p style="font-size:12px;color:#555555;margin:6px 0 0;">` +
    `出典：<a href="${linkHref}" target="_blank" rel="noopener">${linkText}</a></p>`

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // クリップボード不可の環境では手動選択にフォールバック
      const el = document.getElementById('kmn-snippet') as HTMLTextAreaElement | null
      el?.select()
    }
  }

  const label: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: '#143D1E', display: 'block', marginBottom: 6 }
  const control: React.CSSProperties = {
    width: '100%', padding: '10px 12px', fontSize: 14, borderRadius: 8,
    border: '1px solid #CBD5CB', background: '#fff', color: '#1A1A16',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 28, alignItems: 'start' }} className="kmn-widget-grid">
      {/* 左：設定＋コード */}
      <div>
        <div style={{ marginBottom: 18 }}>
          <label style={label} htmlFor="kmn-pref">表示する地域</label>
          <select id="kmn-pref" value={slug} onChange={(e) => setSlug(e.target.value)} style={control}>
            <option value="">全国（すべての都道府県）</option>
            {prefectures.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={label} htmlFor="kmn-h">高さ（px）</label>
          <select id="kmn-h" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} style={control}>
            <option value={420}>420（コンパクト）</option>
            <option value={520}>520（標準）</option>
            <option value={640}>640（大きめ）</option>
          </select>
        </div>

        <label style={label} htmlFor="kmn-snippet">貼り付け用コード</label>
        <textarea
          id="kmn-snippet"
          readOnly
          value={snippet}
          rows={5}
          onFocus={(e) => e.currentTarget.select()}
          style={{
            ...control, fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
            fontSize: 12, lineHeight: 1.6, resize: 'vertical', minHeight: 120,
          }}
        />
        <button
          onClick={copy}
          style={{
            marginTop: 12, width: '100%', padding: '13px 0', border: 'none', borderRadius: 8,
            background: copied ? '#2D6A3F' : '#143D1E', color: '#fff', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', transition: 'background 0.15s',
          }}
        >
          {copied ? '✓ コピーしました' : 'コードをコピー'}
        </button>
        <p style={{ fontSize: 12, color: '#6E6E68', lineHeight: 1.8, marginTop: 14 }}>
          コピーしたコードを、ブログや自治体サイトのHTMLに貼り付けるだけで、
          最新のクマ出没情報が自動表示されます（データは毎週自動更新）。
          <strong style={{ color: '#143D1E' }}>出典リンクは残したままでご利用ください。</strong>
        </p>
      </div>

      {/* 右：ライブプレビュー */}
      <div>
        <label style={label}>プレビュー</label>
        <div style={{ background: '#F0F4F0', border: '1px solid #DDE5DD', borderRadius: 12, padding: 16 }}>
          <iframe
            key={`${slug}-${height}`}
            src={embedSrc}
            width="100%"
            height={height}
            style={{ maxWidth: 440, border: '1px solid #dddddd', borderRadius: 10, display: 'block', background: '#0F2D18' }}
            title={`${prefName}のクマ出没情報 - KUMANUKE`}
            loading="lazy"
          />
          <p style={{ fontSize: 12, color: '#555', margin: '6px 0 0' }}>
            出典：<a href={linkHref} target="_blank" rel="noopener noreferrer" style={{ color: '#2D6A3F' }}>{linkText}</a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .kmn-widget-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
