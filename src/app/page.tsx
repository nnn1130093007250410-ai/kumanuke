import type { Metadata } from 'next'
import Link from 'next/link'
import {
  loadBearData,
  loadUpdateLog,
  getLatestByPrefecture,
  getPrefectureStats,
  DANGER_COLORS,
  DANGER_LABELS,
} from '@/lib/bear-data'

export const metadata: Metadata = {
  title: 'KUMANUKE | 熊・野生動物情報ポータル — 全国115,000件+のデータ',
  description:
    '日本最大級の熊・野生動物情報インフラ。全国115,000件超の出没データをマップ・ランキング・統計で可視化。対策ガイド25本・世界情報も網羅。',
  keywords: [
    '熊出没マップ', 'クマ出没情報', '熊情報ポータル', '野生動物情報',
    '全国熊出没', '熊対策ガイド', '熊よけスプレー', '熊被害統計',
  ],
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp' },
  openGraph: {
    type: 'website',
    title: 'KUMANUKE | 熊・野生動物情報ポータル',
    description: '日本最大級の熊・野生動物情報インフラ。全国115,000件超の出没データをリアルタイムに近い形でマップ表示。',
    url: 'https://kumanuke.bubuworks.co.jp',
  },
}

const FEATURED_ARTICLES = [
  {
    slug: 'japan-bear-damage-statistics',
    title: '日本のクマ被害統計2025-2026｜過去最多238人の実態',
    tag: 'DATA',
    tagColor: '#1E40AF',
  },
  {
    slug: 'bear-olfactory-science',
    title: '熊が匂いで近づかない理由｜嗅覚の仕組みと忌避メカニズム',
    tag: 'LAB',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'international-bear-management',
    title: '海外のクマ対策研究・管理事例｜北米・ヨーロッパの知見',
    tag: 'WORLD',
    tagColor: '#7C3AED',
  },
  {
    slug: 'camping-bear-prevention',
    title: 'キャンプ場・野営地での熊対策完全ガイド',
    tag: 'GUIDE',
    tagColor: '#1F5C2E',
  },
  {
    slug: 'bear-seasonal-activity',
    title: 'クマの年間活動パターン｜季節ごとの行動変化と出没リスクカレンダー',
    tag: 'LAB',
    tagColor: '#0C5C3E',
  },
  {
    slug: 'why-bears-come-to-towns',
    title: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動',
    tag: 'LAB',
    tagColor: '#0C5C3E',
  },
]

// ── YouTube news ──────────────────────────────────────────────────────────
interface YouTubeSnippet {
  title: string
  channelTitle: string
  publishedAt: string
  thumbnails: { medium?: { url: string }; high?: { url: string } }
  description: string
}
interface YouTubeItem {
  id: { videoId: string }
  snippet: YouTubeSnippet
}

// ハングル文字（韓国語）を含む文字列かどうか判定
const HANGUL_RE = /[가-힯ᄀ-ᇿ㄰-㆏]/

async function getYouTubeNews(): Promise<YouTubeItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) return []
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    // 「日本」を追加してより日本関連に絞る。多めに取得してフィルタ後に6件揃える
    const q = encodeURIComponent('クマ 出没 ニュース 日本')
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&publishedAfter=${oneWeekAgo}&maxResults=12&order=date&relevanceLanguage=ja&regionCode=JP&key=${apiKey}`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = await res.json()
    const items = (data.items ?? []) as YouTubeItem[]
    // タイトル・チャンネル名にハングルが含まれるものを除外し、最大6件返す
    return items
      .filter((item) => {
        const title = item.snippet.title ?? ''
        const channel = item.snippet.channelTitle ?? ''
        return !HANGUL_RE.test(title) && !HANGUL_RE.test(channel)
      })
      .slice(0, 6)
  } catch {
    return []
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr || dateStr === '2000-01-01') return '—'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return '—'
  const currentYear = new Date().getFullYear()
  const y = d.getFullYear()
  if (y === currentYear) {
    return `${d.getMonth() + 1}/${d.getDate()}`
  }
  return `${y}/${d.getMonth() + 1}/${d.getDate()}`
}

function formatDateFull(dateStr: string): string {
  if (!dateStr) return '—'
  return dateStr.replace(/-/g, '/')
}

export const revalidate = 3600 // 1時間ごとに再生成（YouTubeニュース更新のため）

export default async function PortalTop() {
  const [youtubeNews, allBearData] = await Promise.all([
    getYouTubeNews(),
    Promise.resolve(loadBearData()),
  ])
  const updateLog = loadUpdateLog()
  const latestSightings = getLatestByPrefecture(allBearData, 8)
  const prefStats = getPrefectureStats(allBearData).slice(0, 10)
  const totalCount = allBearData.length
  const prefectureCount = prefStats.length
  const lastUpdate = updateLog.length > 0
    ? updateLog[updateLog.length - 1].date
    : '2026-05-27'
  const totalAdded = updateLog.reduce((s, l) => s + l.added, 0)

  return (
    <>
      {/* ───── Portal Nav ───── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#0F2E16',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontSize: 17,
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: '0.07em',
            }}
          >
            KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 14 }}>|</span>
          <Link
            href="/map"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#5EC97C',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            🗺 MAP
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
            対策ガイド
          </Link>
          <Link
            href="/products/kumanuke"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#fff',
              background: '#E07A30',
              textDecoration: 'none',
              padding: '5px 14px',
              borderRadius: 4,
              letterSpacing: '0.02em',
            }}
          >
            製品を見る
          </Link>
        </div>
      </nav>

      {/* ───── Hero ───── */}
      <section
        style={{
          background: 'linear-gradient(160deg, #0B2410 0%, #143D1E 55%, #1A4D25 100%)',
          padding: 'clamp(56px, 8vw, 100px) 24px clamp(48px, 7vw, 80px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid lines */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(94,201,124,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(94,201,124,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#5EC97C',
              letterSpacing: '0.18em',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            Japan Wildlife Information Infrastructure
          </p>

          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: 20,
              fontFamily: 'var(--font-noto-serif, serif)',
            }}
          >
            熊・野生動物の情報を
            <br />
            <span style={{ color: '#5EC97C' }}>ひとつの場所</span>で
          </h1>

          <p
            style={{
              fontSize: 'clamp(14px, 2vw, 17px)',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.85,
              maxWidth: 560,
              marginBottom: 36,
            }}
          >
            全国{totalCount.toLocaleString()}件の出没データ、25本の対策ガイド、世界の熊情報を集約。
            山・農地・住宅地のリスクを正しく把握し、適切な対策を。
          </p>

          {/* Stats strip */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 36,
            }}
          >
            {[
              { value: `${totalCount.toLocaleString()}件`, label: '全国出没記録' },
              { value: `${prefectureCount}都道府県`, label: 'カバーエリア' },
              { value: '25本', label: '対策ガイド' },
              { value: '世界35カ国+', label: 'WORLD REPORT' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '10px 18px',
                  textAlign: 'center',
                  minWidth: 100,
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(16px, 2.2vw, 22px)',
                    fontWeight: 800,
                    color: '#5EC97C',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, letterSpacing: '0.04em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href="/map"
              style={{
                background: '#5EC97C',
                color: '#0F2E16',
                fontWeight: 800,
                fontSize: 15,
                padding: '14px 28px',
                borderRadius: 6,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                letterSpacing: '0.02em',
                boxShadow: '0 4px 20px rgba(94,201,124,0.35)',
              }}
            >
              🗺 全国マップを見る
            </Link>
            <Link
              href="/guide"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                padding: '14px 24px',
                borderRadius: 6,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              対策ガイド →
            </Link>
          </div>
        </div>
      </section>

      {/* ───── Live update bar ───── */}
      <div
        style={{
          background: '#0F2E16',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-flex' }}>
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
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#5EC97C' }} />
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.03em' }}>
            最終更新: <strong style={{ color: '#fff' }}>{formatDateFull(lastUpdate)}</strong>
          </span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>|</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
          累計取得件数: <strong style={{ color: '#5EC97C' }}>{totalAdded.toLocaleString()}件</strong>
        </span>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>|</span>
        <Link href="/map" style={{ fontSize: 12, color: '#5EC97C', fontWeight: 700, textDecoration: 'none' }}>
          マップで確認 →
        </Link>
      </div>
      <style>{`@keyframes ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }`}</style>

      <main style={{ background: '#F8F8F6' }}>

        {/* ───── Latest Sightings ───── */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.14em', marginBottom: 4 }}>
                LATEST SIGHTINGS
              </p>
              <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: '#1A1A16', lineHeight: 1.3 }}>
                最新の出没情報
              </h2>
            </div>
            <Link
              href="/map"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#143D1E',
                textDecoration: 'none',
                border: '1px solid #143D1E',
                padding: '7px 16px',
                borderRadius: 4,
                flexShrink: 0,
              }}
            >
              全件マップで見る →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: 12,
            }}
          >
            {latestSightings.map((s) => (
              <Link
                key={s.id}
                href="/map"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  border: '1px solid #DDDDD8',
                  borderRadius: 8,
                  padding: '16px 18px',
                  textDecoration: 'none',
                  gap: 6,
                  transition: 'box-shadow 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      background: DANGER_COLORS[s.danger_level],
                      color: '#fff',
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 3,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {DANGER_LABELS[s.danger_level]}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: '#9A9A95',
                      background: '#F2F2F0',
                      padding: '2px 7px',
                      borderRadius: 3,
                    }}
                  >
                    {s.type}
                  </span>
                  <span style={{ fontSize: 11, color: '#9A9A95', marginLeft: 'auto' }}>
                    {formatDate(s.date)}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#1A1A16',
                    lineHeight: 1.45,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {s.title || `${s.prefecture} ${s.city}`}
                </p>
                <p style={{ fontSize: 11, color: '#5A5A55', margin: 0 }}>
                  {s.prefecture} {s.city}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ───── YouTube News ───── */}
        {youtubeNews.length > 0 && (
          <section style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#E07A30', letterSpacing: '0.14em', marginBottom: 6 }}>
                  BEAR NEWS
                </p>
                <h2 style={{ fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 700, color: '#1A1A16', margin: 0 }}>
                  最新の熊ニュース動画
                </h2>
              </div>
              <a
                href="https://www.youtube.com/results?search_query=クマ+出没+ニュース&sp=EgIIAQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, color: '#E07A30', fontWeight: 700, textDecoration: 'none' }}
              >
                YouTube で見る →
              </a>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: 16,
            }}>
              {youtubeNews.map((item) => {
                const thumb = item.snippet.thumbnails.medium?.url ?? item.snippet.thumbnails.high?.url ?? ''
                const videoUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`
                const published = new Date(item.snippet.publishedAt)
                const dateLabel = `${published.getMonth() + 1}/${published.getDate()}`
                return (
                  <a
                    key={item.id.videoId}
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      background: '#fff',
                      border: '1px solid #DDDDD8',
                      borderRadius: 8,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'box-shadow 0.2s',
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#1A1A16' }}>
                      {thumb && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumb}
                          alt={item.snippet.title}
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                      {/* Play button overlay */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%',
                          background: 'rgba(0,0,0,0.6)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ color: '#fff', fontSize: 16, marginLeft: 3 }}>▶</span>
                        </div>
                      </div>
                    </div>
                    {/* Info */}
                    <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <p style={{
                        fontSize: 13, fontWeight: 700, color: '#1A1A16',
                        lineHeight: 1.45, margin: 0,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                        {item.snippet.title}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <span style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>
                          {item.snippet.channelTitle}
                        </span>
                        <span style={{ fontSize: 11, color: '#AAA' }}>{dateLabel}</span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        )}

        {/* ───── Map Preview CTA ───── */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 0' }}>
          <Link
            href="/map"
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #0F2E16 0%, #1A4D28 60%, #0F3A1A 100%)',
              borderRadius: 12,
              padding: 'clamp(32px, 4vw, 52px) clamp(28px, 4vw, 52px)',
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Grid pattern */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(94,201,124,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(94,201,124,0.05) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.14em', marginBottom: 10 }}>
                  KUMANUKE MAP
                </p>
                <h2 style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 12 }}>
                  全国{totalCount.toLocaleString()}件のデータを
                  <br />
                  地図で今すぐ確認
                </h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 420 }}>
                  都道府県・危険度・時期でフィルタリング。クマの出没密度ヒートマップ、世界の熊情報も搭載。
                </p>
              </div>
              <div
                style={{
                  background: '#5EC97C',
                  color: '#0F2E16',
                  fontWeight: 800,
                  fontSize: 15,
                  padding: '16px 32px',
                  borderRadius: 8,
                  letterSpacing: '0.02em',
                  flexShrink: 0,
                  boxShadow: '0 4px 20px rgba(94,201,124,0.4)',
                  whiteSpace: 'nowrap',
                }}
              >
                🗺 マップを開く →
              </div>
            </div>
          </Link>
        </section>

        {/* ───── Prefecture Rankings ───── */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px 0' }}>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#E07A30', letterSpacing: '0.14em', marginBottom: 4 }}>
              PREFECTURE RANKING
            </p>
            <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: '#1A1A16', lineHeight: 1.3 }}>
              都道府県別 出没件数ランキング
            </h2>
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid #DDDDD8',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {prefStats.map((pref, i) => {
              const maxCount = prefStats[0].count
              const barPct = Math.round((pref.count / maxCount) * 100)
              const rankColors = ['#E07A30', '#B05820', '#8B4513']
              const rankColor = i < 3 ? rankColors[i] : '#9A9A95'

              return (
                <Link
                  key={pref.prefecture}
                  href={`/map?pref=${encodeURIComponent(pref.prefecture)}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 20px',
                    borderBottom: i < prefStats.length - 1 ? '1px solid #F2F2F0' : 'none',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Bar background */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${barPct}%`,
                      background: i === 0 ? 'rgba(224,122,48,0.06)' : 'rgba(94,201,124,0.04)',
                      transition: 'width 0.3s',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: rankColor,
                      minWidth: 24,
                      textAlign: 'center',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      flexShrink: 0,
                      position: 'relative',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#1A1A16',
                      flex: 1,
                      position: 'relative',
                    }}
                  >
                    {pref.prefecture}
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: '#143D1E',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      position: 'relative',
                    }}
                  >
                    {pref.count.toLocaleString()}
                    <span style={{ fontSize: 11, fontWeight: 500, color: '#9A9A95', marginLeft: 2 }}>件</span>
                  </span>
                </Link>
              )
            })}
          </div>

          <p style={{ fontSize: 12, color: '#9A9A95', marginTop: 12, textAlign: 'right' }}>
            ※ 全{allBearData.length.toLocaleString()}件中・都道府県別集計
          </p>
        </section>

        {/* ───── Guide Articles ───── */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#143D1E', letterSpacing: '0.14em', marginBottom: 4 }}>
                KUMANUKE GUIDE
              </p>
              <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: '#1A1A16', lineHeight: 1.3 }}>
                熊・野生動物 対策ガイド
              </h2>
            </div>
            <Link
              href="/guide"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#143D1E',
                textDecoration: 'none',
                border: '1px solid #143D1E',
                padding: '7px 16px',
                borderRadius: 4,
                flexShrink: 0,
              }}
            >
              全25本を見る →
            </Link>
          </div>

          {/* Category chips */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'DATA', color: '#1E40AF' },
              { label: 'LAB', color: '#0C5C3E' },
              { label: 'GUIDE', color: '#1F5C2E' },
              { label: 'WORLD', color: '#7C3AED' },
            ].map((cat) => (
              <span
                key={cat.label}
                style={{
                  background: cat.color,
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: 4,
                  letterSpacing: '0.1em',
                }}
              >
                {cat.label}
              </span>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: 14,
            }}
          >
            {FEATURED_ARTICLES.map((a) => (
              <Link
                key={a.slug}
                href={`/guide/${a.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  border: '1px solid #DDDDD8',
                  borderRadius: 8,
                  padding: '18px 20px',
                  textDecoration: 'none',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background: a.tagColor,
                    color: '#fff',
                    fontSize: 9,
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 3,
                    letterSpacing: '0.1em',
                    alignSelf: 'flex-start',
                  }}
                >
                  {a.tag}
                </span>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#1A1A16',
                    lineHeight: 1.5,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {a.title}
                </p>
                <span style={{ fontSize: 12, color: '#143D1E', fontWeight: 700 }}>
                  読む →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ───── Product Teaser ───── */}
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px 72px' }}>
          <div
            style={{
              background: '#fff',
              border: '1px solid #DDDDD8',
              borderRadius: 12,
              padding: 'clamp(28px, 4vw, 44px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 28,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#E07A30', letterSpacing: '0.12em', marginBottom: 8 }}>
                KUMANUKE SPRAY
              </p>
              <h2 style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 800, color: '#1A1A16', lineHeight: 1.4, marginBottom: 10 }}>
                植物由来 エリア散布型
                <br />
                野生動物対策スプレー
              </h2>
              <p style={{ fontSize: 13, color: '#5A5A55', lineHeight: 1.75, maxWidth: 400 }}>
                OCガス・カプサイシン不使用。キャンプ・登山・農地・ゴミ置き場の事前散布による熊遭遇予防。
              </p>
            </div>
            <Link
              href="/products/kumanuke"
              style={{
                background: '#143D1E',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                padding: '14px 28px',
                borderRadius: 6,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              製品詳細・購入 →
            </Link>
          </div>
        </section>

      </main>

      {/* ───── Footer ───── */}
      <footer style={{ background: '#0F2E16', padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
            <div>
              <Link
                href="/"
                style={{
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#fff',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
              </Link>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', maxWidth: 280, lineHeight: 1.7 }}>
                熊・野生動物情報ポータル。全国の出没データ、対策ガイド、世界情報を集約。
              </p>
            </div>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', marginBottom: 10 }}>
                  INFORMATION
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li><Link href="/map" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>出没マップ</Link></li>
                  <li><Link href="/guide" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>対策ガイド</Link></li>
                </ul>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', marginBottom: 10 }}>
                  PRODUCT
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li><Link href="/products/kumanuke" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>KUMANUKEスプレー</Link></li>
                  <li><Link href="/products/kumanuke#wholesale" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>卸・法人のお客様</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
              © 2026 BUBUWORKS合同会社. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              <Link href="/privacy" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>プライバシーポリシー</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
