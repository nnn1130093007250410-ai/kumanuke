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
  return {
    title: `${info.name}の熊出没情報マップ｜KUMANUKE MAP`,
    description: `${info.name}の最新クマ出没情報。目撃・被害・人身事故など危険度別にマップ表示。${info.name}で確認されたクマ（${info.bearType}）の出没データ一覧。`,
    alternates: { canonical: `https://kumanuke.bubuworks.co.jp/map/${params.prefecture}` },
    openGraph: {
      title: `${info.name}の熊出没情報マップ`,
      description: `${info.name}のクマ出没情報を地図で確認。${info.bearType}の目撃・被害情報を一覧で提供。`,
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
              {latest.map((s) => (
                <div
                  key={s.id}
                  style={{
                    background: '#fff',
                    border: '1px solid #DDDDD8',
                    borderLeft: `4px solid ${DANGER_COLORS[s.danger_level]}`,
                    borderRadius: 6,
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                    <span
                      style={{
                        background: DANGER_COLORS[s.danger_level],
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 3,
                      }}
                    >
                      {DANGER_LABELS[s.danger_level]}
                    </span>
                    <span style={{ fontSize: 11, color: '#888' }}>{formatDate(s.date)}</span>
                    <span
                      style={{
                        fontSize: 10,
                        background: '#F0F7F2',
                        color: '#5A5A55',
                        padding: '1px 6px',
                        borderRadius: 3,
                      }}
                    >
                      {s.type}
                    </span>
                  </div>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#1A1A16',
                      margin: '0 0 6px',
                      lineHeight: 1.4,
                    }}
                  >
                    {s.title}
                  </p>
                  <p style={{ fontSize: 12, color: '#5A5A55', margin: '0 0 6px', lineHeight: 1.65 }}>
                    📍 {s.city}　{s.bear_type}
                  </p>
                  <p style={{ fontSize: 13, color: '#333', margin: 0, lineHeight: 1.7 }}>
                    {s.description}
                  </p>
                  {s.source_name && (
                    <p style={{ fontSize: 11, color: '#AAA', margin: '6px 0 0' }}>
                      情報源：{s.source_name}
                    </p>
                  )}
                </div>
              ))}
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
                  { label: '登録件数（直近）', value: `${prefSightings.length}件` },
                  { label: '確認種', value: info.bearType },
                  {
                    label: '高警戒（level 3）',
                    value: `${level3Count}件`,
                    color: level3Count > 0 ? '#EF4444' : '#888',
                  },
                  {
                    label: '警戒（level 2）',
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
    </main>
  )
}
