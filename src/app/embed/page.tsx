/**
 * 埋め込みウィジェット表示ページ
 * 外部サイトから iframe で呼び出す想定
 *
 * 使い方:
 *   <iframe src="https://kumanuke.bubuworks.co.jp/embed?pref=akita" width="420" height="520"></iframe>
 *   <iframe src="https://kumanuke.bubuworks.co.jp/embed" width="420" height="520"></iframe>
 */

import type { Metadata } from 'next'
import { loadBearData } from '@/lib/bear-data'
import { getPrefectureBySlug } from '@/lib/prefectures'

export const metadata: Metadata = {
  robots: { index: false, follow: false }, // 埋め込みページはインデックスしない
}

export const revalidate = 3600

const DANGER_COLORS: Record<number, string> = {
  3: '#EF4444',
  2: '#F97316',
  1: '#5EC97C',
}
const DANGER_LABELS: Record<number, string> = {
  3: '高警戒',
  2: '警戒',
  1: '要注意',
}

export default function EmbedPage({
  searchParams,
}: {
  searchParams: { pref?: string; limit?: string }
}) {
  const prefSlug  = searchParams.pref ?? ''
  const limit     = Math.min(Math.max(1, parseInt(searchParams.limit ?? '8') || 8), 20)
  const prefInfo  = prefSlug ? getPrefectureBySlug(prefSlug) : null

  const allData   = loadBearData()
  const filtered  = prefInfo
    ? allData.filter((s) => s.prefecture === prefInfo.name)
    : allData

  const sorted = [...filtered]
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    .slice(0, limit)

  const cy = new Date().getFullYear()
  const thisYear = filtered.filter((s) => s.date?.startsWith(String(cy))).length

  function fmtDate(d: string) {
    const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/)
    return m ? `${m[1]}/${+m[2]}/${+m[3]}` : d
  }

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#0F2D18', minHeight: '100vh', padding: 0, margin: 0 }}>
      {/* ヘッダー */}
      <div style={{ background: '#0F2D18', padding: '12px 16px', borderBottom: '1px solid rgba(94,201,124,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontWeight: 900, fontSize: 15, color: '#fff', letterSpacing: '0.08em' }}>
              KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
            </span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>
              {prefInfo ? `${prefInfo.name}` : '全国'} 出没情報
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#E07A30' }}>{filtered.length.toLocaleString('ja-JP')}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>総件数</div>
          </div>
        </div>
        <div style={{ marginTop: 6, display: 'flex', gap: 12 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            {cy}年: <span style={{ color: '#5EC97C', fontWeight: 700 }}>{thisYear.toLocaleString('ja-JP')}件</span>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>毎週自動更新</div>
        </div>
      </div>

      {/* リスト */}
      <div style={{ padding: '8px 0' }}>
        {sorted.map((s) => (
          <a
            key={s.id}
            href={`https://kumanuke.bubuworks.co.jp/map/${prefSlug || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div style={{
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              borderLeft: `3px solid ${DANGER_COLORS[s.danger_level] ?? '#5EC97C'}`,
              marginBottom: 2,
            }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                <span style={{
                  background: DANGER_COLORS[s.danger_level] ?? '#5EC97C',
                  color: '#fff', fontSize: 9, fontWeight: 700,
                  padding: '1px 6px', borderRadius: 3,
                }}>
                  {DANGER_LABELS[s.danger_level] ?? '情報'}
                </span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{fmtDate(s.date ?? '')}</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{s.type}</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>
                {s.title}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                📍 {s.city}　{s.bear_type}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* フッター */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <a
          href={`https://kumanuke.bubuworks.co.jp/map${prefSlug ? `/${prefSlug}` : ''}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 11, color: '#5EC97C', textDecoration: 'none', fontWeight: 700 }}
        >
          🗺 KUMANUKEで全件を地図で見る →
        </a>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>
          kumanuke.bubuworks.co.jp
        </div>
      </div>
    </div>
  )
}
