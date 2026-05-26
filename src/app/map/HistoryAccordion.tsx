'use client'

import { useState } from 'react'
import type { BearSighting } from '@/lib/bear-constants'
import { DANGER_COLORS, DANGER_LABELS } from '@/lib/bear-constants'

interface Props {
  history: BearSighting[]
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

// Group history by prefecture
function groupByPrefecture(history: BearSighting[]): Record<string, BearSighting[]> {
  const groups: Record<string, BearSighting[]> = {}
  history.forEach((h) => {
    if (!groups[h.prefecture]) groups[h.prefecture] = []
    groups[h.prefecture].push(h)
  })
  // Sort entries within each prefecture by date desc
  Object.values(groups).forEach((arr) => arr.sort((a, b) => b.date.localeCompare(a.date)))
  return groups
}

export default function HistoryAccordion({ history }: Props) {
  const [openPref, setOpenPref] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const grouped = groupByPrefecture(history)

  // Sort prefectures by number of historical entries desc
  const sortedPrefs = Object.entries(grouped).sort(
    ([, a], [, b]) => b.length - a.length
  )

  const visiblePrefs = showAll ? sortedPrefs : sortedPrefs.slice(0, 8)

  return (
    <div>
      {/* Prefecture accordion list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {visiblePrefs.map(([pref, entries]) => {
          const isOpen = openPref === pref
          const maxDanger = (entries.reduce(
            (mx: number, e) => Math.max(mx, e.danger_level),
            1
          )) as 1 | 2 | 3
          const humanCount = entries.filter(
            (e) => e.type === '人身被害'
          ).length
          return (
            <div
              key={pref}
              style={{
                border: '1px solid #DDDDD8',
                borderRadius: 8,
                overflow: 'hidden',
                background: '#fff',
              }}
            >
              {/* Header row */}
              <button
                onClick={() => setOpenPref(isOpen ? null : pref)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 18px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderBottom: isOpen ? '1px solid #EFEFED' : 'none',
                }}
              >
                {/* Danger dot */}
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: DANGER_COLORS[maxDanger],
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                {/* Prefecture name */}
                <span style={{ fontWeight: 700, fontSize: 14, color: '#1A1A16', flex: 1 }}>
                  {pref}
                </span>
                {/* Badges */}
                <span
                  style={{
                    fontSize: 11,
                    color: '#888',
                    background: '#F5F5F2',
                    padding: '3px 9px',
                    borderRadius: 12,
                    fontWeight: 600,
                  }}
                >
                  {entries.length}件
                </span>
                {humanCount > 0 && (
                  <span
                    style={{
                      fontSize: 10,
                      color: '#fff',
                      background: '#EF4444',
                      padding: '2px 8px',
                      borderRadius: 12,
                      fontWeight: 700,
                    }}
                  >
                    人身 {humanCount}件
                  </span>
                )}
                {/* Chevron */}
                <span
                  style={{
                    fontSize: 12,
                    color: '#9A9A95',
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    flexShrink: 0,
                  }}
                >
                  ▼
                </span>
              </button>

              {/* Entry list */}
              {isOpen && (
                <div style={{ padding: '8px 0' }}>
                  {entries.map((entry, i) => (
                    <div
                      key={entry.id}
                      style={{
                        padding: '12px 18px',
                        borderBottom:
                          i < entries.length - 1 ? '1px solid #F5F5F2' : 'none',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: '4px 12px',
                        alignItems: 'start',
                      }}
                    >
                      {/* Left: label + date */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 4,
                          minWidth: 48,
                        }}
                      >
                        <span
                          style={{
                            background: DANGER_COLORS[entry.danger_level],
                            color: '#fff',
                            fontSize: 9,
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 3,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {DANGER_LABELS[entry.danger_level]}
                        </span>
                        <span style={{ fontSize: 10, color: '#AAA', textAlign: 'center', lineHeight: 1.3 }}>
                          {formatDate(entry.date)}
                        </span>
                      </div>
                      {/* Right: title + description */}
                      <div>
                        <p
                          style={{
                            fontWeight: 700,
                            fontSize: 13,
                            color: '#1A1A16',
                            margin: '0 0 4px',
                            lineHeight: 1.4,
                          }}
                        >
                          {entry.title}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            color: '#5A5A55',
                            margin: '0 0 4px',
                            lineHeight: 1.65,
                          }}
                        >
                          {entry.description}
                        </p>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontSize: 10,
                              background: '#F0F7F2',
                              color: '#5A5A55',
                              padding: '1px 6px',
                              borderRadius: 3,
                            }}
                          >
                            {entry.city}
                          </span>
                          <span
                            style={{
                              fontSize: 10,
                              background: '#F5F5F2',
                              color: '#888',
                              padding: '1px 6px',
                              borderRadius: 3,
                            }}
                          >
                            {entry.type}・{entry.bear_type}
                          </span>
                          <span style={{ fontSize: 10, color: '#AAA' }}>
                            出典：{entry.source_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Show more / less toggle */}
      {sortedPrefs.length > 8 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          style={{
            marginTop: 12,
            width: '100%',
            padding: '11px',
            background: '#F5F5F2',
            border: '1px solid #DDDDD8',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 700,
            color: '#5A5A55',
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
        >
          {showAll
            ? '▲ 表示を折りたたむ'
            : `▼ 残り ${sortedPrefs.length - 8} 都道府県を表示する`}
        </button>
      )}
    </div>
  )
}
