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
  WORLD_IMPORTANCE_LABELS,
  WORLD_IMPORTANCE_COLORS,
} from '@/lib/bear-world'
import { PREFECTURES, getSlugByName } from '@/lib/prefectures'
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

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

const TYPE_FILTERS = [
  { key: 'all',  label: 'すべて' },
  { key: '目撃', label: '🔭 目撃情報' },
  { key: '被害', label: '⚠️ 出没・被害情報' },
] as const

type TypeFilter = typeof TYPE_FILTERS[number]['key']

export default function MapPage({
  searchParams,
}: {
  searchParams?: { type?: string }
}) {
  const typeFilter: TypeFilter =
    (searchParams?.type as TypeFilter | undefined) ?? 'all'

  const allSightings = loadBearData()
  const sightings =
    typeFilter === '目撃'
      ? allSightings.filter((s) => s.type === '目撃')
      : typeFilter === '被害'
      ? allSightings.filter((s) => ['被害', '人身被害', '住宅侵入'].includes(s.type))
      : allSightings

  const worldSightings = loadWorldBearData()
  const latestWorld = getLatestWorldReports(worldSightings)
  const historyData = loadBearHistory()

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
              最終更新：{lastUpdate?.date ?? '–'}　登録件数：{sightings.length}件
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

          {/* Type filter */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            {TYPE_FILTERS.map((f) => (
              <Link
                key={f.key}
                href={f.key === 'all' ? '/map' : `/map?type=${encodeURIComponent(f.key)}`}
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
            ))}
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
            <MapClient sightings={sightings} historySightings={historyData} worldSightings={worldSightings} centerLng={137.0} centerLat={36.5} zoom={5} />
          </div>
        </div>
      </div>

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

        <div
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
              {latest.map((s) => (
                <div
                  key={s.id}
                  style={{
                    background: '#fff',
                    border: '1px solid #DDDDD8',
                    borderLeft: `4px solid ${DANGER_COLORS[s.danger_level]}`,
                    borderRadius: 6,
                    padding: '14px 16px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '4px 14px',
                    alignItems: 'start',
                  }}
                >
                  <div
                    style={{
                      gridRow: '1 / 3',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      minWidth: 40,
                    }}
                  >
                    <span
                      style={{
                        background: DANGER_COLORS[s.danger_level],
                        color: '#fff',
                        fontSize: 9,
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: 3,
                        letterSpacing: '0.05em',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {DANGER_LABELS[s.danger_level]}
                    </span>
                    <span style={{ fontSize: 10, color: '#AAA', textAlign: 'center' }}>
                      {formatDate(s.date)}
                    </span>
                  </div>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#1A1A16',
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {s.title}
                  </p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link
                      href={`/map/${getSlugByName(s.prefecture) ?? ''}`}
                      style={{
                        fontSize: 11,
                        color: '#143D1E',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      📍 {s.prefecture} {s.city}
                    </Link>
                    <span
                      style={{
                        fontSize: 10,
                        background: '#F0F7F2',
                        color: '#5A5A55',
                        padding: '1px 6px',
                        borderRadius: 3,
                      }}
                    >
                      {s.type}・{s.bear_type}
                    </span>
                  </div>
                </div>
              ))}
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
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 16 }}>
                月別出没件数
              </h3>
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  alignItems: 'flex-end',
                  height: 100,
                  borderBottom: '1px solid #EFEFED',
                  paddingBottom: 6,
                }}
              >
                {monthly.map((m) => (
                  <div
                    key={m.month}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#143D1E' }}>{m.count}</span>
                    <div
                      style={{
                        width: '100%',
                        height: `${Math.max(6, (m.count / maxMonthCount) * 80)}px`,
                        background: '#143D1E',
                        borderRadius: '3px 3px 0 0',
                        opacity: m.month === monthly[monthly.length - 1]?.month ? 1 : 0.45,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                {monthly.map((m) => (
                  <div key={m.month} style={{ flex: 1, textAlign: 'center' }}>
                    <span style={{ fontSize: 10, color: '#888' }}>{m.label}</span>
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
                都道府県別件数
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {prefStats.slice(0, 8).map((p, i) => {
                  const slug = getSlugByName(p.prefecture)
                  return (
                    <div key={p.prefecture} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: i < 3 ? '#E07A30' : '#AAA',
                          minWidth: 18,
                          textAlign: 'right',
                        }}
                      >
                        {i + 1}
                      </span>
                      <Link
                        href={slug ? `/map/${slug}` : '#'}
                        style={{
                          fontSize: 12,
                          color: '#1A1A16',
                          textDecoration: 'none',
                          flex: 1,
                        }}
                      >
                        {p.prefecture}
                      </Link>
                      <div
                        style={{
                          height: 8,
                          background: DANGER_COLORS[p.maxLevel as 1 | 2 | 3],
                          borderRadius: 4,
                          width: `${Math.max(12, (p.count / prefStats[0].count) * 60)}px`,
                          opacity: 0.7,
                        }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#5A5A55', minWidth: 20, textAlign: 'right' }}>
                        {p.count}
                      </span>
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

          {/* Cards */}
          <div
            style={{
              border: '1px solid #DDDDD8',
              borderTop: 'none',
              borderRadius: '0 0 10px 10px',
              overflow: 'hidden',
            }}
          >
            {latestWorld.map((w, i) => (
              <div
                key={w.id}
                style={{
                  padding: '16px 20px',
                  borderBottom: i < latestWorld.length - 1 ? '1px solid #EFEFED' : 'none',
                  background: '#fff',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '4px 16px',
                  alignItems: 'start',
                  borderLeft: `4px solid ${WORLD_IMPORTANCE_COLORS[w.importance_level]}`,
                }}
              >
                {/* Left column */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 5,
                    minWidth: 44,
                  }}
                >
                  <span
                    style={{
                      background: WORLD_IMPORTANCE_COLORS[w.importance_level],
                      color: '#fff',
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 3,
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    {WORLD_IMPORTANCE_LABELS[w.importance_level]}
                  </span>
                  <span style={{ fontSize: 10, color: '#AAA', textAlign: 'center' }}>
                    {w.date.substring(5).replace('-', '/')}
                  </span>
                </div>

                {/* Right column */}
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: '#1E3A5F' }}>
                      {w.country}
                    </span>
                    <span style={{ fontSize: 11, color: '#888' }}>{w.region}</span>
                    <span
                      style={{
                        fontSize: 10,
                        background: '#F0F4F8',
                        color: '#5A5A55',
                        padding: '1px 6px',
                        borderRadius: 3,
                      }}
                    >
                      {w.type}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: '#333', margin: '0 0 4px', lineHeight: 1.7 }}>
                    {w.summary_ja}
                  </p>
                  <p style={{ fontSize: 10, color: '#AAA', margin: 0 }}>
                    🐻 {w.bear_type}　出典：{w.source_name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 11, color: '#888', marginTop: 10, lineHeight: 1.7 }}>
            ※ WORLD BEAR REPORTは海外報道・公的機関情報をもとに日本語要約しています。最新情報は各情報源をご確認ください。
          </p>
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
          <p style={{ fontSize: 12, color: '#888', lineHeight: 1.8, margin: 0 }}>
            ⚠️ <strong>免責事項</strong>：掲載情報は自治体・報道等を参考にしています。最新情報は各自治体発表をご確認ください。
            本マップは情報提供を目的としており、正確性・完全性を保証するものではありません。
            野生動物への接触を試みる行為や、クマが確認された区域への立入は大変危険です。必ず地元自治体の指示に従ってください。
          </p>
        </div>
      </div>
    </main>
  )
}
