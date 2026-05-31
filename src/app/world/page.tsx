import type { Metadata } from 'next'
import Link from 'next/link'
import {
  loadWorldBearReports,
  getTopWorldReports,
  getCountryCounts,
  countByEventType,
} from '@/lib/bear-world'
import {
  WORLD_IMPORTANCE_COLORS,
  WORLD_IMPORTANCE_LABELS,
  WORLD_EVENT_TYPE_CONFIG,
  WORLD_COUNTRY_JA,
  type WorldEventType,
} from '@/lib/bear-constants'

// ── YouTube world bear news ──────────────────────────────────────────────────
interface YouTubeSnippet {
  title: string
  channelTitle: string
  publishedAt: string
  thumbnails: { medium?: { url: string }; high?: { url: string } }
}
interface YouTubeItem {
  id: { videoId: string }
  snippet: YouTubeSnippet
}

// 日本語文字（ひらがな・カタカナ）を含むか判定
const JAPANESE_RE = /[぀-ヿ]/

async function getWorldBearYouTubeNews(): Promise<YouTubeItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) return []
  try {
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    const q = encodeURIComponent('bear attack wildlife news')
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&publishedAfter=${twoWeeksAgo}&maxResults=12&order=date&relevanceLanguage=en&key=${apiKey}`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = await res.json()
    const items = (data.items ?? []) as YouTubeItem[]
    // 日本語タイトル・チャンネルを除外し最大6件
    return items
      .filter((item) => {
        const title = item.snippet.title ?? ''
        const channel = item.snippet.channelTitle ?? ''
        return !JAPANESE_RE.test(title) && !JAPANESE_RE.test(channel)
      })
      .slice(0, 6)
  } catch {
    return []
  }
}

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'WORLD BEAR REPORT | 世界の熊情報メディア — KUMANUKE',
  description: '世界の熊出没・人身事故・政策・研究・人獣共存を日本語で整理。アメリカ・カナダ・フィンランド・スウェーデンほか世界各国の熊情報を編集・比較。',
  keywords: ['世界 熊 出没', '海外 熊事故', 'カナダ 熊', 'アメリカ ベアスプレー', '世界の熊対策', '人獣共存 海外'],
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/world' },
  openGraph: {
    title: 'WORLD BEAR REPORT | 世界の熊情報メディア',
    description: '世界50カ国超の熊出没・政策・研究を日本語で整理するメディア。',
    url: 'https://kumanuke.bubuworks.co.jp/world',
  },
}

const PHASE1_COUNTRIES = [
  {
    slug: 'usa',
    country: 'USA',
    flag: '🇺🇸',
    nameJa: 'アメリカ',
    bears: ['Grizzly', 'Black bear', 'Polar bear'],
    desc: '年間数百件の被害報告。NPS・州野生動物局が充実したデータを公開。クマスプレー文化の先進国。',
  },
  {
    slug: 'canada',
    country: 'Canada',
    flag: '🇨🇦',
    nameJa: 'カナダ',
    bears: ['Grizzly', 'Black bear', 'Polar bear'],
    desc: '北米最大の熊生息地。バンフ・イエローナイフ・チャーチルなど多様な生息域。Bear Smart政策が参考になる。',
  },
  {
    slug: 'finland',
    country: 'Finland',
    flag: '🇫🇮',
    nameJa: 'フィンランド',
    bears: ['Brown bear'],
    desc: '個体数2,800頭超で欧州トップクラスの密度。公的機関による体系的な調査・管理が進んでいる。',
  },
  {
    slug: 'sweden',
    country: 'Sweden',
    flag: '🇸🇪',
    nameJa: 'スウェーデン',
    bears: ['Brown bear'],
    desc: '個体数3,000頭超。春の狩猟管理制度と農業被害補償が整備。野生動物共存政策の先進事例。',
  },
]

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export default async function WorldPage() {
  const [worldYouTubeNews, allReports] = await Promise.all([
    getWorldBearYouTubeNews(),
    Promise.resolve(loadWorldBearReports()),
  ])
  const topReports = getTopWorldReports(allReports, 12)
  const countryCounts = getCountryCounts(allReports, 15)
  const eventTypeCounts = countByEventType(allReports)
  const totalCountries = new Set(allReports.map((r) => r.country)).size

  return (
    <main style={{ background: '#0D1F2D', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ padding: '48px 24px 40px', maxWidth: 1080, margin: '0 auto' }}>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em', marginBottom: 10 }}>
          WORLD BEAR REPORT
        </p>
        <h1 style={{
          fontSize: 'clamp(24px,4vw,40px)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.2,
          marginBottom: 14,
        }}>
          🌍 世界の熊情報メディア
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 640, marginBottom: 28 }}>
          世界の熊出没・人身被害・保護政策・人獣共存の取り組みを、日本語で整理・編集しています。
          「速報」ではなく、「価値ある整理と比較」を目指します。
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[
            { value: allReports.length, label: 'レポート件数' },
            { value: totalCountries, label: 'カバー国数' },
            { value: allReports.filter((r) => r.importance_level >= 2).length, label: '重要・重大' },
          ].map((s) => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '14px 20px',
              minWidth: 100,
            }}>
              <div style={{
                fontSize: 26,
                fontWeight: 800,
                color: '#60A5FA',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                letterSpacing: '-0.02em',
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── Event type legend ── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 40,
          paddingBottom: 32,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {(Object.entries(WORLD_EVENT_TYPE_CONFIG) as [WorldEventType, typeof WORLD_EVENT_TYPE_CONFIG[WorldEventType]][]).map(([key, cfg]) => (
            <div key={key} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${cfg.color}44`,
              borderRadius: 20,
              padding: '4px 10px',
            }}>
              <span style={{ fontSize: 13 }}>{cfg.icon}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                {cfg.label}
              </span>
              <span style={{ fontSize: 10, color: cfg.color, fontWeight: 700 }}>
                {eventTypeCounts[key] ?? 0}
              </span>
            </div>
          ))}
        </div>

        {/* ── Main grid: latest reports + country list ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)',
          gap: 32,
          alignItems: 'start',
        }}>
          {/* Latest important reports */}
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '0.05em' }}>
              📰 最新レポート
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {topReports.map((r) => {
                const ev = WORLD_EVENT_TYPE_CONFIG[r.event_type]
                const displayCountry = WORLD_COUNTRY_JA[r.country] ?? r.country
                return (
                  <div key={r.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderLeft: `3px solid ${ev.color}`,
                    padding: '14px 16px',
                    borderRadius: '0 6px 6px 0',
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{
                        background: ev.color, color: '#fff',
                        fontSize: 9, fontWeight: 700,
                        padding: '1px 7px', borderRadius: 3,
                        whiteSpace: 'nowrap',
                      }}>
                        {ev.icon} {ev.label}
                      </span>
                      <span style={{
                        background: WORLD_IMPORTANCE_COLORS[r.importance_level],
                        color: '#fff', fontSize: 9, fontWeight: 700,
                        padding: '1px 7px', borderRadius: 3,
                      }}>
                        {WORLD_IMPORTANCE_LABELS[r.importance_level]}
                      </span>
                      {/* Casualties badge */}
                      {r.casualties && (r.casualties.killed ?? 0) > 0 && (
                        <span style={{
                          background: '#7F1D1D', color: '#FCA5A5',
                          fontSize: 9, fontWeight: 700,
                          padding: '1px 7px', borderRadius: 3,
                        }}>
                          死亡 {r.casualties.killed}
                        </span>
                      )}
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
                        🌐 {displayCountry} · {r.region}
                      </span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                        {formatDateShort(r.date)}
                      </span>
                    </div>
                    {/* Summary */}
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: '0 0 6px', lineHeight: 1.7 }}>
                      {r.summary_ja}
                    </p>
                    {/* Lessons snippet */}
                    {r.lessons_ja && (
                      <p style={{
                        fontSize: 11, color: '#34D399',
                        margin: '0 0 6px', lineHeight: 1.65,
                        paddingLeft: 8, borderLeft: '2px solid rgba(16,185,129,0.3)',
                      }}>
                        📌 {r.lessons_ja.length > 80 ? r.lessons_ja.slice(0, 80) + '…' : r.lessons_ja}
                      </p>
                    )}
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
                      🐻 {r.bear_type} · {r.source_name}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: country ranking + links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Country ranking */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '20px',
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 14, letterSpacing: '0.08em' }}>
                REPORT件数 · 国別
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {countryCounts.map((c, i) => {
                  const displayName = WORLD_COUNTRY_JA[c.country] ?? c.country
                  const maxCount = countryCounts[0].count
                  return (
                    <div key={c.country} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700,
                        color: i < 3 ? '#60A5FA' : 'rgba(255,255,255,0.3)',
                        minWidth: 14, textAlign: 'right',
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {displayName}
                      </span>
                      <div style={{
                        height: 5, borderRadius: 3,
                        background: '#60A5FA',
                        width: `${Math.max(6, (c.count / maxCount) * 50)}px`,
                        opacity: 0.6,
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: 11, color: '#60A5FA', fontWeight: 700, minWidth: 22, textAlign: 'right' }}>
                        {c.count}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Phase1 country quick links */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '20px',
            }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 12, letterSpacing: '0.1em' }}>
                国別レポート
              </h3>
              {PHASE1_COUNTRIES.map((c) => (
                <Link key={c.slug} href={`/world/${c.slug}`} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  textDecoration: 'none',
                }}>
                  <span style={{ fontSize: 18 }}>{c.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                      {c.nameJa} / {c.country}
                    </div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
                      {c.bears.join(' · ')}
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: '#60A5FA' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Phase1 Country cards ── */}
        <div style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '0.05em' }}>
            🗺 国別レポート詳細
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>Phase 1カバー国 — 詳細レポートページあり</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {PHASE1_COUNTRIES.map((c) => {
              const countryReports = allReports.filter((r) => r.country === c.country)
              const latestDate = countryReports[0]?.date ?? '–'
              const attackCount = countryReports.filter((r) => r.event_type === 'attack').length
              const researchCount = countryReports.filter((r) => r.event_type === 'research').length
              return (
                <Link key={c.slug} href={`/world/${c.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(96,165,250,0.25)',
                    borderRadius: 12,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s, transform 0.15s',
                  }}>
                    {/* Flag hero */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(30,58,95,0.8) 0%, rgba(15,30,50,0.9) 100%)',
                      padding: '24px 20px 20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                    }}>
                      <span style={{ fontSize: 44, lineHeight: 1, flexShrink: 0 }}>{c.flag}</span>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 3 }}>{c.nameJa}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{c.country}</div>
                        <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
                          {c.bears.map((b) => (
                            <span key={b} style={{
                              background: 'rgba(96,165,250,0.15)',
                              border: '1px solid rgba(96,165,250,0.25)',
                              borderRadius: 20,
                              padding: '2px 8px',
                              fontSize: 9,
                              color: 'rgba(255,255,255,0.6)',
                            }}>🐻 {b}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Body */}
                    <div style={{ padding: '16px 20px 18px' }}>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 14px' }}>
                        {c.desc}
                      </p>
                      {/* Stats row */}
                      <div style={{ display: 'flex', gap: 0, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
                        {[
                          { v: countryReports.length, l: '総件数', c: '#60A5FA' },
                          { v: attackCount, l: '人身被害', c: '#EF4444' },
                          { v: researchCount, l: '研究・調査', c: '#34D399' },
                        ].map((s) => (
                          <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ fontSize: 20, fontWeight: 800, color: s.c, fontFamily: 'var(--font-dm-sans, sans-serif)' }}>{s.v}</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{s.l}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ textAlign: 'right', marginTop: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#60A5FA' }}>詳細レポートを見る →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ── World Bear YouTube News ── */}
        {worldYouTubeNews.length > 0 && (
          <div style={{ marginTop: 56 }}>
            {/* Header */}
            <div style={{
              background: 'rgba(30,58,95,0.6)',
              border: '1px solid rgba(96,165,250,0.2)',
              borderRadius: '10px 10px 0 0',
              padding: '20px 24px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#60A5FA', letterSpacing: '0.15em', margin: '0 0 4px' }}>
                  WORLD BEAR VIDEO
                </p>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>
                  🎬 最新の世界熊ニュース動画
                </h2>
              </div>
              <a
                href="https://www.youtube.com/results?search_query=bear+attack+wildlife+news"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                YouTube でもっと見る →
              </a>
            </div>

            {/* Video grid */}
            <div style={{
              border: '1px solid rgba(96,165,250,0.15)',
              borderTop: 'none',
              borderRadius: '0 0 10px 10px',
              background: 'rgba(255,255,255,0.03)',
              padding: '20px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {worldYouTubeNews.map((item) => {
                  const thumb =
                    item.snippet.thumbnails.medium?.url ??
                    item.snippet.thumbnails.high?.url ??
                    `https://i.ytimg.com/vi/${item.id.videoId}/mqdefault.jpg`
                  const pubDate = new Date(item.snippet.publishedAt)
                  const dateLabel = `${pubDate.getMonth() + 1}/${pubDate.getDate()}`
                  return (
                    <a
                      key={item.id.videoId}
                      href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(96,165,250,0.15)',
                        borderRadius: 8,
                        overflow: 'hidden',
                      }}>
                        {/* Thumbnail */}
                        <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#0D1F2D' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={thumb}
                            alt={item.snippet.title}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(0,0,0,0.2)',
                          }}>
                            <div style={{
                              width: 40, height: 40, borderRadius: '50%',
                              background: 'rgba(30,58,95,0.85)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <span style={{ color: '#fff', fontSize: 16, marginLeft: 3 }}>▶</span>
                            </div>
                          </div>
                        </div>
                        {/* Info */}
                        <div style={{ padding: '10px 12px 12px' }}>
                          <p style={{
                            fontSize: 12, fontWeight: 600,
                            color: 'rgba(255,255,255,0.85)',
                            margin: '0 0 6px', lineHeight: 1.45,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                            {item.snippet.title}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                              {item.snippet.channelTitle}
                            </span>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>{dateLabel}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── What is WORLD BEAR REPORT ── */}
        <div style={{
          marginTop: 56,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 10,
          padding: '28px 32px',
        }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 8 }}>
            ABOUT WORLD BEAR REPORT
          </p>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 14 }}>
            「世界比較」で熊問題を深く理解する
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxWidth: 720 }}>
            WORLD BEAR REPORTは、単なる海外ニュースの翻訳サイトではありません。
            世界各国の熊出没・人身被害・保護政策・人獣共存の取り組みを日本語で整理し、
            「日本の熊問題をより広い視点で考えるための情報基盤」を提供します。
            国立公園サービス・州野生動物局・大学研究機関など公的情報源を優先し、
            編集部として重要性・信頼性を判断したうえで掲載しています。
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            <Link href="/map" style={{
              background: 'rgba(96,165,250,0.15)',
              border: '1px solid rgba(96,165,250,0.3)',
              borderRadius: 6,
              padding: '8px 18px',
              fontSize: 12, fontWeight: 700, color: '#60A5FA',
              textDecoration: 'none',
            }}>
              🗺 MAPで世界の熊を見る
            </Link>
            <Link href="/guide/international-bear-management" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              padding: '8px 18px',
              fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
            }}>
              海外の熊対策研究を読む →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
