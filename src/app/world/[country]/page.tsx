import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  loadWorldBearReports,
  getReportsByCountry,
} from '@/lib/bear-world'
import {
  WORLD_IMPORTANCE_COLORS,
  WORLD_IMPORTANCE_LABELS,
  WORLD_EVENT_TYPE_CONFIG,
  WORLD_COUNTRY_JA,
  WORLD_COUNTRY_SLUGS,
  type WorldEventType,
  type WorldBearReportV2,
} from '@/lib/bear-constants'

// ── Phase1 country metadata ─────────────────────────────────────────
const COUNTRY_META: Record<string, {
  flag: string
  nameJa: string
  bears: string[]
  overviewJa: string
  relatedGuides: { href: string; label: string }[]
}> = {
  USA: {
    flag: '🇺🇸',
    nameJa: 'アメリカ',
    bears: ['Grizzly（ハイイログマ）', 'American Black bear（アメリカクロクマ）', 'Polar bear（ホッキョクグマ）'],
    overviewJa: 'アメリカには推定50万頭以上のアメリカクロクマと約1,700頭のグリズリーが生息しています。国立公園サービス（NPS）・州野生動物局が体系的なデータを公開しており、クマスプレーの効果実証研究など先進的な研究成果が蓄積されています。近年は郊外や観光地でのアメリカクロクマとの軋轢が増加しており、食料管理（Food Storage）を中心とした共存政策が各州で進化しています。',
    relatedGuides: [
      { href: '/guide/north-america-bear-spray', label: '北米のクマスプレー事情' },
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
      { href: '/guide/non-lethal-bear-management', label: '非致死型クマ対策の体系' },
    ],
  },
  Canada: {
    flag: '🇨🇦',
    nameJa: 'カナダ',
    bears: ['Grizzly（ハイイログマ）', 'American Black bear（アメリカクロクマ）', 'Polar bear（ホッキョクグマ）'],
    overviewJa: 'カナダは北米最大のクマ生息国であり、グリズリー・クロクマ・ホッキョクグマの3種が生息します。Parks Canadaが推進する「Bear Smart」コミュニティプログラムは、世界で最も体系化された人熊共存政策の一つとして知られています。チャーチル（マニトバ州）はホッキョクグマで有名な観光地でもあり、気候変動による生息域変化の最前線でもあります。',
    relatedGuides: [
      { href: '/guide/canada-bear-smart', label: 'カナダのBear Smartプログラム' },
      { href: '/guide/north-america-bear-spray', label: '北米のクマスプレー事情' },
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
    ],
  },
  Finland: {
    flag: '🇫🇮',
    nameJa: 'フィンランド',
    bears: ['Brown bear（ヒグマ）'],
    overviewJa: 'フィンランドには約2,800頭のヒグマが生息しており、欧州でもトップクラスの生息密度を誇ります。フィンランド自然資源研究所（Luke）が個体数・生息域・移動パターンを精密に調査しており、科学的根拠に基づく管理計画が整備されています。人身被害は年間数件と比較的少なく、農業被害への補償制度と春の狩猟管理が人獣共存の基盤となっています。',
    relatedGuides: [
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
      { href: '/guide/non-lethal-bear-management', label: '非致死型クマ対策の体系' },
      { href: '/guide/satoyama-bear-human-coexistence', label: '里山における熊との共存' },
    ],
  },
  Sweden: {
    flag: '🇸🇪',
    nameJa: 'スウェーデン',
    bears: ['Brown bear（ヒグマ）'],
    overviewJa: 'スウェーデンのヒグマ個体数は推定3,000頭を超え、増加傾向が続いています。スウェーデン自然保護庁（Naturvårdsverket）が毎年の狩猟許可頭数を科学的に設定し、個体数管理と農業保護のバランスを図っています。再野生化（Rewilding）の議論においても先進的な立場を取っており、北欧全体の熊政策に大きな影響を与えています。',
    relatedGuides: [
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
      { href: '/guide/climate-change-bears', label: '気候変動と熊の生息域変化' },
      { href: '/guide/electric-fence-bear-prevention', label: '電気柵によるクマ対策' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(WORLD_COUNTRY_SLUGS).map((slug) => ({ country: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { country: string }
}): Promise<Metadata> {
  const countryKey = WORLD_COUNTRY_SLUGS[params.country]
  if (!countryKey) return {}
  const meta = COUNTRY_META[countryKey]
  const nameJa = meta?.nameJa ?? countryKey
  return {
    title: `${nameJa}の熊情報 | WORLD BEAR REPORT — KUMANUKE`,
    description: `${nameJa}の熊出没・人身被害・保護政策・研究の最新情報を日本語で整理。`,
    alternates: { canonical: `https://kumanuke.vercel.app/world/${params.country}` },
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

const EVENT_TYPE_ORDER: WorldEventType[] = [
  'attack', 'warning', 'park_closure', 'sighting',
  'policy', 'wildlife_management', 'coexistence', 'research', 'spray_incident',
]

export default function CountryPage({ params }: { params: { country: string } }) {
  const countryKey = WORLD_COUNTRY_SLUGS[params.country]
  if (!countryKey) notFound()

  const meta = COUNTRY_META[countryKey]
  const allReports = loadWorldBearReports()
  const countryReports = getReportsByCountry(allReports, countryKey)

  if (countryReports.length === 0 && !meta) notFound()

  const displayName = meta?.nameJa ?? (WORLD_COUNTRY_JA[countryKey] ?? countryKey)
  const flag = meta?.flag ?? '🌐'

  // Group by event_type
  const grouped: Partial<Record<WorldEventType, WorldBearReportV2[]>> = {}
  for (const r of countryReports) {
    if (!grouped[r.event_type]) grouped[r.event_type] = []
    grouped[r.event_type]!.push(r)
  }

  const critical = countryReports.filter((r) => r.importance_level === 3)
  const attackCount = (grouped['attack'] ?? []).length

  return (
    <main style={{ background: '#0D1F2D', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '40px 24px 36px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: 8 }}>
            <Link href="/world" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
              WORLD BEAR REPORT
            </Link>
            {' '}/{' '}{displayName}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 44 }}>{flag}</span>
            <div>
              <h1 style={{ fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 700, color: '#fff', margin: 0 }}>
                {displayName}の熊事情
              </h1>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
                {countryKey} Bear Report — {countryReports.length}件のレポート
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
            {[
              { v: countryReports.length, l: '総レポート', c: '#60A5FA' },
              { v: attackCount,           l: '人身被害',   c: '#EF4444' },
              { v: critical.length,       l: '重大情報',   c: '#7C3AED' },
            ].map((s) => (
              <div key={s.l} style={{
                background: 'rgba(255,255,255,0.06)',
                border: `1px solid ${s.c}33`,
                borderRadius: 8,
                padding: '10px 18px',
                minWidth: 80,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.c, fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                  {s.v}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Bears */}
          {meta?.bears && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {meta.bears.map((b) => (
                <span key={b} style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 20,
                  padding: '3px 12px',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  🐻 {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Overview */}
        {meta?.overviewJa && (
          <div style={{
            background: 'rgba(96,165,250,0.06)',
            border: '1px solid rgba(96,165,250,0.15)',
            borderRadius: 10,
            padding: '20px 24px',
            marginBottom: 40,
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#60A5FA', marginBottom: 10 }}>
              概要
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, margin: 0 }}>
              {meta.overviewJa}
            </p>
          </div>
        )}

        {/* Reports by event_type */}
        {EVENT_TYPE_ORDER.filter((et) => grouped[et]?.length).map((et) => {
          const cfg = WORLD_EVENT_TYPE_CONFIG[et]
          const reports = grouped[et]!
          return (
            <div key={et} style={{ marginBottom: 40 }}>
              <h2 style={{
                fontSize: 15,
                fontWeight: 700,
                color: '#fff',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{
                  background: cfg.color,
                  color: '#fff',
                  fontSize: 10,
                  padding: '2px 8px',
                  borderRadius: 3,
                }}>
                  {cfg.icon} {cfg.label}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                  {reports.length}件
                </span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {reports.map((r) => (
                  <div key={r.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderLeft: `3px solid ${cfg.color}`,
                    padding: '14px 18px',
                    borderRadius: '0 6px 6px 0',
                  }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{
                        background: WORLD_IMPORTANCE_COLORS[r.importance_level],
                        color: '#fff', fontSize: 9, fontWeight: 700,
                        padding: '1px 7px', borderRadius: 3,
                      }}>
                        {WORLD_IMPORTANCE_LABELS[r.importance_level]}
                      </span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                        {r.region} · {r.city}
                      </span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                        {formatDate(r.date)}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: '0 0 6px', lineHeight: 1.7 }}>
                      {r.summary_ja}
                    </p>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                        🐻 {r.bear_type}
                      </span>
                      {r.source_name && (
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                          出典：{r.source_name}
                        </span>
                      )}
                      {r.title_en && (
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>
                          {r.title_en}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Related guides */}
        {meta?.relatedGuides && meta.relatedGuides.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10,
            padding: '20px 24px',
            marginTop: 40,
          }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 14, letterSpacing: '0.08em' }}>
              関連する対策ガイド
            </h3>
            {meta.relatedGuides.map((g) => (
              <Link key={g.href} href={g.href} style={{
                display: 'block',
                fontSize: 13,
                color: '#60A5FA',
                textDecoration: 'none',
                padding: '6px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                lineHeight: 1.5,
              }}>
                → {g.label}
              </Link>
            ))}
          </div>
        )}

        {/* Back link */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Link href="/world" style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
          }}>
            ← WORLD BEAR REPORT トップへ
          </Link>
        </div>
      </div>
    </main>
  )
}
