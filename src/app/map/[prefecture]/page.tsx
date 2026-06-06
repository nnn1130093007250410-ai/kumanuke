import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  loadBearData,
  getSightingsByPrefecture,
  getLatestSightings,
  getMonthlyCounts,
  DANGER_COLORS,
  DANGER_LABELS,
} from '@/lib/bear-data'
import { PREFECTURES, getPrefectureBySlug } from '@/lib/prefectures'

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
      }}
    >
      <p style={{ color: '#5A5A55', fontSize: 14 }}>地図を読み込み中...</p>
    </div>
  ),
})

// Related guides per prefecture region
const REGIONAL_GUIDES: Record<string, { href: string; label: string }[]> = {
  hokkaido: [
    { href: '/guide/tsuki-no-wa-kuma-vs-higuma', label: 'ツキノワグマとヒグマの違い' },
    { href: '/guide/bear-home-range', label: 'クマの行動圏・ホームレンジ' },
  ],
  default: [
    { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか' },
    { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン' },
    { href: '/guide/abandoned-fruit-trees-bear-damage', label: '放置果樹が熊を呼ぶ' },
    { href: '/guide/electric-fence-bear-prevention', label: '電気柵によるクマ対策' },
  ],
}

// ── 都道府県統計ヘルパー ─────────────────────────────────────────────────────
function getPrefStats(allSightings: ReturnType<typeof loadBearData>, prefName: string) {
  const pref = allSightings.filter((s) => s.prefecture === prefName)
  const total = pref.length

  // 全国順位
  const counts: Record<string, number> = {}
  for (const s of allSightings) if (s.prefecture) counts[s.prefecture] = (counts[s.prefecture] ?? 0) + 1
  const rank = Object.values(counts).filter((c) => c > total).length + 1

  // 上位3市区町村
  const cityMap: Record<string, number> = {}
  for (const s of pref) if (s.city) cityMap[s.city] = (cityMap[s.city] ?? 0) + 1
  const topCities = Object.entries(cityMap).sort((a, b) => b[1] - a[1]).slice(0, 3)

  // ピーク月（1〜12）
  const mMap: Record<number, number> = {}
  for (const s of pref) {
    const m = parseInt(s.date?.slice(5, 7))
    if (!isNaN(m) && m >= 1 && m <= 12) mMap[m] = (mMap[m] ?? 0) + 1
  }
  const peakEntry = Object.entries(mMap).sort((a, b) => +b[1] - +a[1])[0]
  const peakMonth = peakEntry ? +peakEntry[0] : null

  // 年別件数（直近3年）
  const cy = new Date().getFullYear()
  const yearCounts: Record<number, number> = {}
  for (const s of pref) {
    const y = parseInt(s.date?.slice(0, 4))
    if (y >= cy - 2) yearCounts[y] = (yearCounts[y] ?? 0) + 1
  }

  return { total, rank, topCities, peakMonth, yearCounts }
}

export async function generateStaticParams() {
  const sightings = loadBearData()
  const prefSet = new Set(sightings.map((s) => s.prefecture))
  const prefectures = Array.from(prefSet)
  return PREFECTURES
    .filter((p) => prefectures.includes(p.name))
    .map((p) => ({ prefecture: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { prefecture: string }
}): Promise<Metadata> {
  const info = getPrefectureBySlug(params.prefecture)
  if (!info) return {}
  const stats = getPrefStats(loadBearData(), info.name)
  const topCity = stats.topCities[0]?.[0] ?? ''
  const totalStr = stats.total.toLocaleString('ja-JP')
  return {
    title: `${info.name}のクマ出没情報 ${totalStr}件・全国${stats.rank}位｜KUMANUKE`,
    description: `${info.name}のクマ出没情報${totalStr}件（全国${stats.rank}位）。${topCity ? `${topCity}での出没が最多。` : ''}目撃・人身被害・捕獲など危険度別にマップ表示。${info.bearType}の出没データを毎週自動更新。`,
    alternates: { canonical: `https://kumanuke.bubuworks.co.jp/map/${params.prefecture}` },
    openGraph: {
      title: `${info.name}のクマ出没情報 ${totalStr}件・全国${stats.rank}位`,
      description: `${info.name}のクマ出没${totalStr}件を地図で確認。${info.bearType}の目撃・被害・捕獲情報を毎週更新。`,
      url: `https://kumanuke.bubuworks.co.jp/map/${params.prefecture}`,
    },
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

export default function PrefecturePage({ params }: { params: { prefecture: string } }) {
  const info = getPrefectureBySlug(params.prefecture)
  if (!info) notFound()

  const allSightings = loadBearData()
  const prefSightings = getSightingsByPrefecture(allSightings, info.name)
  if (prefSightings.length === 0) notFound()

  const latest = getLatestSightings(prefSightings, 30)
  const monthly = getMonthlyCounts(prefSightings)
  const maxMonthCount = Math.max(...monthly.map((m) => m.count), 1)

  const level3Count = prefSightings.filter((s) => s.danger_level === 3).length
  const level2Count = prefSightings.filter((s) => s.danger_level === 2).length
  const level1Count = prefSightings.filter((s) => s.danger_level === 1).length

  const relatedGuides = REGIONAL_GUIDES[params.prefecture] ?? REGIONAL_GUIDES.default
  const prefStats = getPrefStats(allSightings, info.name)

  return (
    <main style={{ background: '#F5F7F5', minHeight: '80vh' }}>
      {/* Hero */}
      <div style={{ background: '#0F2E16', padding: '32px 24px 28px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Link
            href="/map"
            style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
          >
            ← 全国マップへ戻る
          </Link>
          <h1
            style={{
              fontSize: 'clamp(20px,3vw,28px)',
              fontWeight: 700,
              color: '#fff',
              margin: '8px 0 8px',
              lineHeight: 1.3,
            }}
          >
            {info.name}の熊出没情報
          </h1>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              {info.bearType}　登録件数：{prefSightings.length}件
            </span>
            <div style={{ display: 'flex', gap: 10 }}>
              {([3, 2, 1] as const).map((level) => {
                const count = [level3Count, level2Count, level1Count][[3,2,1].indexOf(level)]
                if (count === 0) return null
                return (
                  <span
                    key={level}
                    style={{
                      background: DANGER_COLORS[level],
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 10px',
                      borderRadius: 20,
                    }}
                  >
                    {DANGER_LABELS[level]} {count}件
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{ background: '#0F2E16' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div
            style={{
              width: '100%',
              height: 'min(420px, 50vw)',
              minHeight: 260,
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden',
            }}
          >
            <MapClient
              sightings={prefSightings}
              centerLng={info.center[0]}
              centerLat={info.center[1]}
              zoom={info.zoom}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '36px 20px 72px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)',
            gap: 28,
            alignItems: 'start',
          }}
        >
          {/* Sightings list */}
          <div>
            <h2
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: '#143D1E',
                marginBottom: 14,
                paddingBottom: 10,
                borderBottom: '2px solid #EFEFED',
              }}
            >
              {info.name}の出没情報一覧
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
                    {/* Header row */}
                    <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                      <span style={{
                        background: DANGER_COLORS[s.danger_level],
                        color: '#fff', fontSize: 11, fontWeight: 700,
                        padding: '3px 10px', borderRadius: 4,
                      }}>
                        {DANGER_LABELS[s.danger_level]}
                      </span>
                      <span style={{ fontSize: 12, color: '#555', fontWeight: 600 }}>
                        {formatDate(s.date)}{s.time ? ` ${s.time}` : ''}
                      </span>
                      <span style={{
                        fontSize: 10, background: '#F0F7F2', color: '#2D6A3F',
                        padding: '2px 7px', borderRadius: 3, fontWeight: 600,
                      }}>
                        {s.type}
                      </span>
                      <span style={{ fontSize: 10, color: '#888' }}>🐻 {s.bear_type}</span>
                    </div>
                    {/* Title */}
                    <p style={{ fontWeight: 700, fontSize: 15, color: '#0F2E16', margin: '0 0 5px', lineHeight: 1.4 }}>
                      {s.title}
                    </p>
                    {/* Location */}
                    <p style={{ fontSize: 12, color: '#5A5A55', margin: '0 0 8px' }}>
                      📍 {s.city !== s.prefecture ? s.city : s.prefecture}
                    </p>
                    {/* Description */}
                    {s.description && (
                      <p style={{
                        fontSize: 13, color: '#333', margin: '0 0 8px', lineHeight: 1.75,
                        padding: '8px 10px', background: 'rgba(0,0,0,0.03)',
                        borderRadius: 5, borderLeft: '3px solid #C8DDD0',
                      }}>
                        {s.description}
                      </p>
                    )}
                    {/* Source */}
                    {s.source_name && (
                      <p style={{ fontSize: 10, color: '#AAA', margin: 0 }}>
                        出典：{s.source_name}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Monthly chart */}
            {monthly.length > 0 && (
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #DDDDD8',
                  borderRadius: 8,
                  padding: '18px 18px 14px',
                }}
              >
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#143D1E', marginBottom: 14 }}>
                  月別件数
                </h3>
                <div
                  style={{
                    display: 'flex',
                    gap: 5,
                    alignItems: 'flex-end',
                    height: 80,
                    borderBottom: '1px solid #EFEFED',
                    paddingBottom: 4,
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
                        gap: 3,
                      }}
                    >
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#143D1E' }}>{m.count}</span>
                      <div
                        style={{
                          width: '100%',
                          height: `${Math.max(5, (m.count / maxMonthCount) * 60)}px`,
                          background: '#143D1E',
                          borderRadius: '2px 2px 0 0',
                          opacity: 0.65,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 5, marginTop: 4 }}>
                  {monthly.map((m) => (
                    <div key={m.month} style={{ flex: 1, textAlign: 'center' }}>
                      <span style={{ fontSize: 9, color: '#888' }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary stats */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #DDDDD8',
                borderRadius: 8,
                padding: '18px',
              }}
            >
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#143D1E', marginBottom: 12 }}>
                {info.name}の概況
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: '登録件数（全期間）', value: `${prefSightings.length.toLocaleString()}件` },
                  { label: '全国順位', value: `${prefStats.rank}位` },
                  { label: '確認種', value: info.bearType },
                  {
                    label: '高警戒',
                    value: `${level3Count}件`,
                    color: level3Count > 0 ? '#EF4444' : '#888',
                  },
                  {
                    label: '警戒',
                    value: `${level2Count}件`,
                    color: level2Count > 0 ? '#F97316' : '#888',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 12,
                      padding: '4px 0',
                      borderBottom: '1px solid #F2F2F0',
                    }}
                  >
                    <span style={{ color: '#888' }}>{item.label}</span>
                    <span style={{ fontWeight: 700, color: item.color ?? '#1A1A16' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Year-over-year comparison */}
            {Object.keys(prefStats.yearCounts).length > 0 && (() => {
              const years = Object.entries(prefStats.yearCounts).sort((a,b) => +a[0] - +b[0])
              const maxYearCount = Math.max(...years.map(([,c]) => c), 1)
              return (
                <div style={{ background:'#fff', border:'1px solid #DDDDD8', borderRadius:8, padding:'18px' }}>
                  <h3 style={{ fontSize:13, fontWeight:700, color:'#143D1E', marginBottom:14 }}>年別件数（直近3年）</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {years.map(([year, count]) => (
                      <div key={year}>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:3 }}>
                          <span style={{ color:'#555', fontWeight:600 }}>{year}年</span>
                          <span style={{ color:'#143D1E', fontWeight:700 }}>{count.toLocaleString()}件</span>
                        </div>
                        <div style={{ background:'#F0F7F2', borderRadius:4, height:10, overflow:'hidden' }}>
                          <div style={{
                            height:'100%',
                            width:`${Math.max(4, (count / maxYearCount) * 100)}%`,
                            background:'#143D1E',
                            borderRadius:4,
                            transition:'width 0.3s',
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* Incident type breakdown */}
            {(() => {
              const types = [
                { key:'人身被害', label:'🔴 人身被害', color:'#EF4444' },
                { key:'目撃',     label:'🟡 目撃',     color:'#F59E0B' },
                { key:'農作物被害', label:'🟢 農作物被害', color:'#22C55E' },
                { key:'捕獲',     label:'🔵 捕獲',     color:'#3B82F6' },
                { key:'住宅侵入', label:'🟠 住宅侵入', color:'#F97316' },
              ]
              const typeCounts = types.map(t => ({
                ...t,
                count: prefSightings.filter(s => s.type === t.key).length,
              })).filter(t => t.count > 0)
              if (typeCounts.length === 0) return null
              const maxTypeCount = Math.max(...typeCounts.map(t => t.count), 1)
              return (
                <div style={{ background:'#fff', border:'1px solid #DDDDD8', borderRadius:8, padding:'18px' }}>
                  <h3 style={{ fontSize:13, fontWeight:700, color:'#143D1E', marginBottom:14 }}>事例タイプ別内訳</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {typeCounts.map(t => (
                      <div key={t.key}>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:3 }}>
                          <span style={{ color:'#555' }}>{t.label}</span>
                          <span style={{ color:t.color, fontWeight:700 }}>{t.count.toLocaleString()}件</span>
                        </div>
                        <div style={{ background:'#F5F5F5', borderRadius:4, height:8, overflow:'hidden' }}>
                          <div style={{
                            height:'100%',
                            width:`${Math.max(4, (t.count / maxTypeCount) * 100)}%`,
                            background:t.color,
                            borderRadius:4,
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* Related guides */}
            <div
              style={{
                background: '#F0F7F2',
                border: '1px solid #C8DDD0',
                borderRadius: 8,
                padding: '16px',
              }}
            >
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#143D1E', marginBottom: 10 }}>
                {info.name}向け対策ガイド
              </h3>
              {relatedGuides.map((g) => (
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

            {/* Back to map */}
            <Link
              href="/map"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px 0',
                background: '#143D1E',
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              ← 全国マップへ
            </Link>
          </div>
        </div>

        {/* SEO テキストセクション（検索エンジン向けの自然言語コンテンツ） */}
        <section
          style={{
            marginTop: 48,
            background: '#fff',
            border: '1px solid #DDDDD8',
            borderRadius: 10,
            padding: 'clamp(16px, 4vw, 28px) clamp(16px, 4vw, 32px)',
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#143D1E', marginBottom: 16 }}>
            {info.name}のクマ出没状況について
          </h2>
          <p style={{ fontSize: 14, color: '#333', lineHeight: 1.9, marginBottom: 16 }}>
            {info.name}では、KUMANUKEデータベースに
            <strong>{prefStats.total.toLocaleString('ja-JP')}件</strong>
            のクマ出没情報が登録されており、都道府県別では全国
            <strong>{prefStats.rank}位</strong>です（{new Date().getFullYear()}年{new Date().getMonth() + 1}月時点）。
            {prefStats.topCities.length > 0 && (
              <>
                市区町村別では
                {prefStats.topCities.map(([city, count], i) => (
                  <span key={city}>
                    {i > 0 && '、'}
                    <strong>{city}</strong>（{count.toLocaleString('ja-JP')}件）
                  </span>
                ))}
                の順で出没が多く記録されています。
              </>
            )}
          </p>
          {prefStats.peakMonth && (
            <p style={{ fontSize: 14, color: '#333', lineHeight: 1.9, marginBottom: 16 }}>
              月別では<strong>{prefStats.peakMonth}月</strong>が年間で最も出没件数が多くなっています。
              {prefStats.peakMonth >= 9 && prefStats.peakMonth <= 11
                ? 'クマの冬眠前の過食期（9〜11月）は特に活動が活発化し、人里への出没リスクが高まります。山林や農地付近への立ち入りには十分な注意が必要です。'
                : prefStats.peakMonth >= 4 && prefStats.peakMonth <= 6
                ? '冬眠明けの春（4〜6月）は食料を求めて行動範囲が広がる時期です。登山・山菜採りの際は特に注意してください。'
                : '農作業や山での活動の際は、クマよけ鈴や撃退スプレーを携帯することをおすすめします。'}
            </p>
          )}
          {Object.keys(prefStats.yearCounts).length > 0 && (
            <p style={{ fontSize: 14, color: '#333', lineHeight: 1.9 }}>
              直近の年別件数：
              {Object.entries(prefStats.yearCounts)
                .sort((a, b) => +a[0] - +b[0])
                .map(([year, count], i) => (
                  <span key={year}>
                    {i > 0 && '／'}
                    {year}年 <strong>{count.toLocaleString('ja-JP')}件</strong>
                  </span>
                ))}。
              最新の出没情報は上記マップおよびリストでご確認ください。
            </p>
          )}
        </section>

        {/* Disclaimer */}
        <div
          style={{
            marginTop: 40,
            background: '#fff',
            border: '1px solid #DDDDD8',
            borderRadius: 8,
            padding: '14px 18px',
          }}
        >
          <p style={{ fontSize: 12, color: '#888', lineHeight: 1.8, margin: 0 }}>
            ⚠️ 掲載情報は自治体・報道等を参考にしています。最新情報は{info.name}の発表をご確認ください。
            クマが確認された区域への立入は大変危険です。必ず地元自治体の指示に従ってください。
          </p>
        </div>
      </div>
    <style>{`
        @media (max-width: 760px) {
          #pref-stats-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          #pref-stats-grid .right-panel { display: none; }
        }
      `}</style>
    </main>
  )
}
