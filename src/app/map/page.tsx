import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  loadBearData,
  loadUpdateLog,
  getLatestSightings,
  getMonthlyCounts,
  getPrefectureStats,
  DANGER_COLORS,
  DANGER_LABELS,
} from '@/lib/bear-data'
import {
  loadWorldBearData,
  getLatestWorldReports,
  loadWorldBearReports,
  WORLD_IMPORTANCE_LABELS,
  WORLD_IMPORTANCE_COLORS,
} from '@/lib/bear-world'
import { WORLD_EVENT_TYPE_CONFIG, WORLD_COUNTRY_JA, type WorldEventType } from '@/lib/bear-constants'
import { PREFECTURES, getSlugByName } from '@/lib/prefectures'
import BuyNowBanner from '@/components/ui/BuyNowBanner'
import TrustBadge from '@/components/ui/TrustBadge'
import { loadBearHistory } from '@/lib/bear-history'
import HistoryAccordion from './HistoryAccordion'

const MapClient = dynamic(() => import('@/components/map/MapClient'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F0F7F2',
        borderRadius: 8,
      }}
    >
      <p style={{ color: '#5A5A55', fontSize: 14 }}>地図を読み込み中...</p>
    </div>
  ),
})

export const metadata: Metadata = {
  title: '【2026年最新】全国熊出没情報マップ｜KUMANUKE MAP',
  description: '全国の熊（クマ）出没情報をリアルタイムに近い形でマップ表示。都道府県別・危険度別の出没データを一覧。熊対策・安全確認に活用できる情報基盤。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/map' },
  openGraph: {
    title: '全国熊出没情報マップ｜KUMANUKE MAP',
    description: '北海道・東北・信越・近畿の熊出没情報を地図上で確認。危険度別（注意・警戒・高警戒）のピン表示・ヒートマップ対応。',
    url: 'https://kumanuke.bubuworks.co.jp/map',
  },
  keywords: [
    '熊出没', '熊出没マップ', '熊目撃情報', 'クマ出没', 'クマ情報',
    '北海道 ヒグマ', '福島 熊', '秋田 熊', '長野 熊', '岐阜 熊',
    '熊出没地図', '野生動物情報', 'クマ注意', '熊対策',
    '世界 熊 出没', '海外 熊被害', 'カナダ 熊', 'アメリカ ベアスプレー',
    'ルーマニア 熊', '世界の熊ニュース', 'WORLD BEAR REPORT',
  ],
}

export const revalidate = 3600

// ─────────────────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

const TYPE_FILTERS = [
  { key: 'all',  label: 'すべて' },
  { key: '目撃', label: '🔭 目撃情報' },
  { key: '被害', label: '⚠️ 出没・被害情報' },
] as const

const YEAR_FILTERS = [
  { key: '2026', label: '2026年' },
  { key: '2025', label: '2025年' },
  { key: '2024', label: '2024年' },
  { key: '2023', label: '2023年' },
  { key: 'all',  label: '全期間' },
] as const

type TypeFilter = typeof TYPE_FILTERS[number]['key']
type YearFilter = typeof YEAR_FILTERS[number]['key']

export default async function MapPage({
  searchParams,
}: {
  searchParams?: { type?: string; year?: string }
}) {
  const typeFilter: TypeFilter =
    (searchParams?.type as TypeFilter | undefined) ?? 'all'
  const yearFilter: YearFilter =
    (searchParams?.year as YearFilter | undefined) ?? '2026'

  const allSightings = loadBearData()

  const yearFiltered = yearFilter === 'all'
    ? allSightings
    : allSightings.filter((s) => s.date.startsWith(yearFilter))
  const sightings =
    typeFilter === '目撃'
      ? yearFiltered.filter((s) => s.type === '目撃')
      : typeFilter === '被害'
      ? yearFiltered.filter((s) => ['被害', '人身被害', '住宅侵入'].includes(s.type))
      : yearFiltered

  const worldSightings = loadWorldBearData()
  const latestWorld = getLatestWorldReports(worldSightings)
  const worldReports = loadWorldBearReports()
  const historyData = loadBearHistory()

  // GBIFデータはMapClient側でクライアントフェッチするため不要

  const updateLog = loadUpdateLog()
  const latest = getLatestSightings(sightings, 30)
  const monthly = getMonthlyCounts(sightings)
  const prefStats = getPrefectureStats(sightings)
  const lastUpdate = updateLog[updateLog.length - 1]
  const maxMonthCount = Math.max(...monthly.map((m) => m.count), 1)

  // Active prefectures with data
  const activePrefectures = prefStats.map((s) => ({
    ...s,
    slug: getSlugByName(s.prefecture),
  })).filter((s) => s.slug)

  return (
    <main style={{ background: '#F5F7F5', minHeight: '80vh' }}>
      {/* Hero */}
      <div style={{ background: '#0F2E16', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: 8 }}>
            KUMANUKE MAP
          </p>
          <h1
            style={{
              fontSize: 'clamp(22px,3.5vw,32px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: 10,
              lineHeight: 1.3,
            }}
          >
            全国熊出没情報マップ
          </h1>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              最終更新：{lastUpdate?.date ?? '–'}　表示中：<strong style={{ color: '#5EC97C' }}>{sightings.length.toLocaleString()}件</strong>／全{allSightings.length.toLocaleString()}件
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {([1, 2, 3] as const).map((level) => (
                <span key={level} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: DANGER_COLORS[level],
                    }}
                  />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
                    {DANGER_LABELS[level]}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Year filter */}
          <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', marginRight: 2 }}>YEAR</span>
            {YEAR_FILTERS.map((f) => {
              const href = f.key === '2026'
                ? (typeFilter === 'all' ? '/map' : `/map?type=${encodeURIComponent(typeFilter)}`)
                : f.key === 'all'
                ? (typeFilter === 'all' ? '/map?year=all' : `/map?year=all&type=${encodeURIComponent(typeFilter)}`)
                : (typeFilter === 'all' ? `/map?year=${f.key}` : `/map?year=${f.key}&type=${encodeURIComponent(typeFilter)}`)
              return (
                <Link
                  key={f.key}
                  href={href}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    background: yearFilter === f.key ? '#5EC97C' : 'rgba(255,255,255,0.1)',
                    color: yearFilter === f.key ? '#0F2E16' : 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    border: `1.5px solid ${yearFilter === f.key ? '#5EC97C' : 'rgba(255,255,255,0.18)'}`,
                    transition: 'all 0.15s',
                  }}
                >
                  {f.label}
                </Link>
              )
            })}
          </div>

          {/* Type filter */}
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', marginRight: 2 }}>TYPE</span>
            {TYPE_FILTERS.map((f) => {
              const href = f.key === 'all'
                ? (yearFilter === '2026' ? '/map' : `/map?year=${yearFilter}`)
                : (yearFilter === '2026' ? `/map?type=${encodeURIComponent(f.key)}` : `/map?year=${yearFilter}&type=${encodeURIComponent(f.key)}`)
              return (
                <Link
                  key={f.key}
                  href={href}
                  style={{
                    padding: '5px 16px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    background: typeFilter === f.key ? '#fff' : 'rgba(255,255,255,0.12)',
                    color: typeFilter === f.key ? '#0F2E16' : 'rgba(255,255,255,0.65)',
                    textDecoration: 'none',
                    border: `1.5px solid ${typeFilter === f.key ? '#fff' : 'rgba(255,255,255,0.25)'}`,
                    transition: 'all 0.2s',
                  }}
                >
                  {f.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{ background: '#0F2E16', paddingBottom: 0 }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 0 0 0' }}>
          <div
            style={{
              width: '100%',
              height: 'min(520px, 55vw)',
              minHeight: 320,
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden',
            }}
          >
            <MapClient sightings={sightings} historySightings={historyData} worldSightings={worldSightings} worldReports={worldReports} centerLng={137.0} centerLat={36.5} zoom={5} />
          </div>
        </div>
      </div>

      <BuyNowBanner variant="compact" />
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 20px 80px' }}>
        {/* Prefecture quick filter */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 12 }}>
            都道府県から探す
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {activePrefectures.map((p) => (
              <Link
                key={p.slug}
                href={`/map/${p.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  background: '#fff',
                  border: `1.5px solid ${DANGER_COLORS[p.maxLevel as 1 | 2 | 3]}44`,
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#1A1A16',
                  textDecoration: 'none',
                  transition: 'box-shadow 0.2s',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: DANGER_COLORS[p.maxLevel as 1 | 2 | 3],
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                {p.prefecture}
                <span style={{ fontSize: 11, color: '#888' }}>{p.count}件</span>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 760px) {
            #map-stats-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 540px) {
            .year-filters { flex-wrap: wrap !important; gap: 6px !important; }
            .type-filters { flex-wrap: wrap !important; }
          }
        `}</style>
        <div
          id="map-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)',
            gap: 28,
            alignItems: 'start',
          }}
        >
          {/* Latest sightings list */}
          <div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#143D1E',
                marginBottom: 16,
                paddingBottom: 10,
                borderBottom: '2px solid #EFEFED',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              {typeFilter === '目撃' ? '最新目撃情報' : typeFilter === '被害' ? '最新出没・被害情報' : '最新出没情報'}
              <span style={{ fontSize: 13, fontWeight: 400, color: '#888' }}>
                新着順 {sightings.length}件
              </span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {latest.map((s) => {
                const isHigh = s.danger_level === 3
                const isMid  = s.danger_level === 2
                return (
                  <div
                    key={s.id}
                    style={{
                      background: isHigh ? '#FFF5F5' : isMid ? '#FFFBF0' : '#fff',
                      border: `1px solid ${isHigh ? '#FECACA' : isMid ? '#FDE68A' : '#DDDDD8'}`,
                      borderLeft: `5px solid ${DANGER_COLORS[s.danger_level]}`,
                      borderRadius: 8,
                      padding: '14px 16px',
                    }}
                  >
                    {/* Header */}
                    <div style={{ display:'flex', gap:7, alignItems:'center', marginBottom:7, flexWrap:'wrap' }}>
                      <span style={{
                        background: DANGER_COLORS[s.danger_level], color:'#fff',
                        fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:4,
                      }}>
                        {DANGER_LABELS[s.danger_level]}
                      </span>
                      <span style={{ fontSize:12, color:'#555', fontWeight:600 }}>
                        {formatDate(s.date)}{s.time ? ` ${s.time}` : ''}
                      </span>
                      <span style={{
                        fontSize:10, background:'#F0F7F2', color:'#2D6A3F',
                        padding:'2px 7px', borderRadius:3, fontWeight:600,
                      }}>
                        {s.type}
                      </span>
                      <span style={{ fontSize:10, color:'#888' }}>🐻 {s.bear_type}</span>
                    </div>
                    {/* Title */}
                    <p style={{ fontWeight:700, fontSize:14, color:'#0F2E16', margin:'0 0 4px', lineHeight:1.4 }}>
                      {s.title}
                    </p>
                    {/* Location link */}
                    <Link
                      href={`/map/${getSlugByName(s.prefecture) ?? ''}`}
                      style={{ fontSize:12, color:'#143D1E', fontWeight:600, textDecoration:'none', display:'block', marginBottom:6 }}
                    >
                      📍 {s.city !== s.prefecture ? `${s.prefecture} ${s.city}` : s.prefecture}
                    </Link>
                    {/* Description */}
                    {s.description && (
                      <p style={{
                        fontSize:12, color:'#444', margin:0, lineHeight:1.75,
                        padding:'7px 10px', background:'rgba(0,0,0,0.03)',
                        borderRadius:5, borderLeft:'3px solid #C8DDD0',
                      }}>
                        {s.description}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right panel: stats + prefecture ranking */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Monthly chart */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #DDDDD8',
                borderRadius: 8,
                padding: '20px 20px 16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', margin: 0 }}>
                  📊 月別出没件数
                </h3>
                {monthly.length > 0 && (
                  <span style={{ fontSize: 10, color: '#888' }}>
                    ピーク <strong style={{ color: '#E07A30' }}>{maxMonthCount.toLocaleString()}件</strong>
                  </span>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 3,
                  alignItems: 'flex-end',
                  height: 120,
                  borderBottom: '2px solid #EFEFED',
                  paddingBottom: 6,
                  overflow: 'hidden',
                }}
              >
                {monthly.map((m) => {
                  const isLatest = m.month === monthly[monthly.length - 1]?.month
                  const isPeak = m.count === maxMonthCount
                  const barH = Math.max(6, (m.count / maxMonthCount) * 108)
                  return (
                    <div
                      key={m.month}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        minWidth: 0,
                        gap: 2,
                      }}
                    >
                      {m.count > 0 && (
                        <span style={{ fontSize: 8, color: isPeak ? '#E07A30' : isLatest ? '#143D1E' : 'transparent', fontWeight: 700, lineHeight: 1 }}>
                          {m.count}
                        </span>
                      )}
                      <div
                        style={{
                          width: '100%',
                          height: `${barH}px`,
                          background: isPeak
                            ? 'linear-gradient(to top, #E07A30, #F5A060)'
                            : isLatest
                            ? 'linear-gradient(to top, #143D1E, #2A6B3A)'
                            : 'linear-gradient(to top, #143D1E88, #143D1E55)',
                          borderRadius: '3px 3px 0 0',
                        }}
                      />
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', gap: 3, marginTop: 5 }}>
                {monthly.map((m) => (
                  <div key={m.month} style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
                    <span style={{ fontSize: 9, color: '#AAA', whiteSpace: 'nowrap' }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prefecture ranking */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #DDDDD8',
                borderRadius: 8,
                padding: '20px',
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 14 }}>
                🏆 都道府県別件数
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {prefStats.slice(0, 8).map((p, i) => {
                  const slug = getSlugByName(p.prefecture)
                  const pct = Math.round((p.count / prefStats[0].count) * 100)
                  const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null
                  return (
                    <div key={p.prefecture}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <span style={{ fontSize: 12, minWidth: 20, textAlign: 'center', flexShrink: 0 }}>
                          {medal ?? <span style={{ fontSize: 10, color: '#CCC', fontWeight: 700 }}>{i + 1}</span>}
                        </span>
                        <Link
                          href={slug ? `/map/${slug}` : '#'}
                          style={{
                            fontSize: 12,
                            color: '#1A1A16',
                            textDecoration: 'none',
                            flex: 1,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minWidth: 0,
                            fontWeight: i < 3 ? 700 : 400,
                          }}
                        >
                          {p.prefecture}
                        </Link>
                        <span style={{ fontSize: 11, fontWeight: 700, color: DANGER_COLORS[p.maxLevel as 1|2|3], minWidth: 44, textAlign: 'right', flexShrink: 0 }}>
                          {p.count.toLocaleString()}
                        </span>
                      </div>
                      <div style={{ paddingLeft: 26 }}>
                        <div style={{ height: 5, background: '#F0F0EE', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${pct}%`,
                            background: `linear-gradient(to right, ${DANGER_COLORS[p.maxLevel as 1|2|3]}, ${DANGER_COLORS[p.maxLevel as 1|2|3]}AA)`,
                            borderRadius: 3,
                          }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Related guides */}
            <div
              style={{
                background: '#F0F7F2',
                border: '1px solid #C8DDD0',
                borderRadius: 8,
                padding: '18px',
              }}
            >
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#143D1E', marginBottom: 12 }}>
                関連する対策ガイド
              </h3>
              {[
                { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか' },
                { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン' },
                { href: '/guide/electric-fence-bear-prevention', label: '電気柵によるクマ対策' },
                { href: '/guide/non-lethal-bear-management', label: '非致死型クマ対策の体系' },
              ].map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  style={{
                    display: 'block',
                    fontSize: 12,
                    color: '#143D1E',
                    textDecoration: 'none',
                    padding: '5px 0',
                    borderBottom: '1px solid rgba(20,61,30,0.1)',
                    lineHeight: 1.4,
                  }}
                >
                  → {g.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── 環境省データバナー ── */}
        <Link href="/data" style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }}>
          <div style={{
            background: 'linear-gradient(135deg, #1A2D4E 0%, #0F1C33 100%)',
            border: '1.5px solid #3B6CB7',
            borderRadius: 10,
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: 32, flexShrink: 0 }}>📊</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#7DD3FC', letterSpacing: '0.1em', marginBottom: 4 }}>
                環境省公式データ
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
                人身被害件数・出没統計・対策パッケージをまとめて確認
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                年度別推移グラフ・最新お知らせ・PDFリンク一覧
              </div>
            </div>
            <div style={{
              background: '#3B6CB7', color: '#fff', fontWeight: 700, fontSize: 12,
              padding: '8px 16px', borderRadius: 6, whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              環境省データを見る →
            </div>
          </div>
        </Link>

        {/* ── 地域別・過去の出没記録 ── */}
        <div style={{ marginTop: 56 }}>
          <div
            style={{
              background: '#2D2D28',
              borderRadius: '10px 10px 0 0',
              padding: '20px 24px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.15em', margin: '0 0 4px' }}>
                BEAR INCIDENT ARCHIVE
              </p>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>
                🗂 地域別・過去の出没記録
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '0 0 2px' }}>
                {historyData.length}件・2023〜2024年
              </p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
                都道府県ごとにクリックして展開
              </p>
            </div>
          </div>
          <div
            style={{
              border: '1px solid #DDDDD8',
              borderTop: 'none',
              borderRadius: '0 0 10px 10px',
              background: '#F8F8F6',
              padding: '16px',
            }}
          >
            <HistoryAccordion history={historyData} />
          </div>
          <p style={{ fontSize: 11, color: '#888', marginTop: 10, lineHeight: 1.7 }}>
            ※ アーカイブ情報は報道・自治体発表をもとにしています。マップを拡大（ズームレベル9以上）すると過去情報のピンも表示されます。
          </p>
        </div>

        {/* WORLD BEAR REPORT section */}
        <div style={{ marginTop: 56 }}>
          {/* Header */}
          <div
            style={{
              background: '#1E3A5F',
              borderRadius: '10px 10px 0 0',
              padding: '20px 24px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#60A5FA', letterSpacing: '0.15em', margin: '0 0 4px' }}>
                WORLD BEAR REPORT
              </p>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>
                🌍 世界の熊ニュース
              </h2>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              {latestWorld.length}件・重要度順
            </p>
          </div>

          {/* V2 Cards */}
          <div style={{ border: '1px solid #DDDDD8', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
            {[...worldReports]
              .sort((a, b) => b.importance_level !== a.importance_level ? b.importance_level - a.importance_level : b.date.localeCompare(a.date))
              .slice(0, 20)
              .map((w, i, arr) => {
                const ev = WORLD_EVENT_TYPE_CONFIG[w.event_type as WorldEventType]
                const displayCountry = WORLD_COUNTRY_JA[w.country] ?? w.country
                return (
                  <div key={w.id} style={{
                    padding: '14px 18px',
                    borderBottom: i < arr.length - 1 ? '1px solid #EFEFED' : 'none',
                    background: '#fff',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '4px 14px',
                    alignItems: 'start',
                    borderLeft: `4px solid ${ev.color}`,
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 48 }}>
                      <span style={{
                        background: ev.color, color: '#fff',
                        fontSize: 9, fontWeight: 700,
                        padding: '2px 5px', borderRadius: 3,
                        whiteSpace: 'nowrap', textAlign: 'center',
                      }}>
                        {ev.icon} {ev.label}
                      </span>
                      <span style={{
                        background: WORLD_IMPORTANCE_COLORS[w.importance_level],
                        color: '#fff', fontSize: 8, fontWeight: 700,
                        padding: '1px 5px', borderRadius: 3,
                      }}>
                        {WORLD_IMPORTANCE_LABELS[w.importance_level]}
                      </span>
                      <span style={{ fontSize: 9, color: '#AAA' }}>{w.date.substring(5).replace('-', '/')}</span>
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 12, color: '#1E3A5F' }}>{displayCountry}</span>
                        <span style={{ fontSize: 11, color: '#888' }}>{w.region}</span>
                      </div>
                      <p style={{ fontSize: 12, color: '#333', margin: '0 0 4px', lineHeight: 1.7 }}>{w.summary_ja}</p>
                      <p style={{ fontSize: 10, color: '#AAA', margin: 0 }}>🐻 {w.bear_type}　出典：{w.source_name}</p>
                    </div>
                  </div>
                )
              })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, flexWrap: 'wrap', gap: 8 }}>
            <p style={{ fontSize: 11, color: '#888', margin: 0, lineHeight: 1.7 }}>
              ※ WORLD BEAR REPORTは海外報道・公的機関情報をもとに日本語要約しています。
            </p>
            <a href="/world" style={{
              fontSize: 12, fontWeight: 700, color: '#1E3A5F',
              textDecoration: 'none',
              background: '#EFF6FF', border: '1px solid #BFDBFE',
              borderRadius: 6, padding: '6px 14px',
            }}>
              🌍 WORLD BEAR REPORT を見る →
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            marginTop: 32,
            background: '#fff',
            border: '1px solid #DDDDD8',
            borderRadius: 8,
            padding: '16px 20px',
          }}
        >
          <p style={{ fontSize: 12, color: '#888', lineHeight: 1.9, margin: 0 }}>
            ⚠️ <strong>免責事項</strong>：本マップは自治体発表・報道機関等の公開情報をもとに作成した<strong>参考情報</strong>です。
            情報の正確性・完全性・最新性を保証するものではなく、掲載内容と実際の状況が異なる場合があります。
            本マップの情報のみを根拠として野外活動・行動判断を行わないでください。
            野外に出かける際は必ず各都道府県・市町村の最新発表をご確認ください。
            クマが確認された区域への立入や野生動物への接触は大変危険です。必ず地元自治体・警察の指示に従ってください。
            本マップの利用によって生じたいかなる損害についても、運営者は責任を負いかねます。
          </p>
        </div>
      </div>
    </main>
  )
}
