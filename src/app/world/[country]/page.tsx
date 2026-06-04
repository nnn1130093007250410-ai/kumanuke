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
  Norway: {
    flag: '🇳🇴',
    nameJa: 'ノルウェー',
    bears: ['Brown bear（ヒグマ）'],
    overviewJa: 'ノルウェーのヒグマ個体数は2020年のDNA調査で150頭（メス65・オス85）が個体識別されています。政府機関Rovdataが毎年、糞・毛サンプルを用いた非侵襲的DNA調査を実施しており、個体レベルの精密なモニタリングは世界のモデルとなっています。1990年代の最低水準から緩やかな回復が続いており、科学的根拠に基づく狩猟クオータ（年間30〜50頭）が設定されています。',
    relatedGuides: [
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
      { href: '/guide/non-lethal-bear-management', label: '非致死型クマ対策の体系' },
    ],
  },
  Slovenia: {
    flag: '🇸🇮',
    nameJa: 'スロベニア',
    bears: ['Brown bear（ヒグマ）'],
    overviewJa: 'スロベニアは北部ディナル山脈を中心にヒグマが生息しており、2023年のDNA調査で737頭が推定されました（2025年4月公表）。EU LIFE DINALP BEARプロジェクト（2014〜2019年）の主幹国として、道路・鉄道によるクマ交通死を25%削減した先進的な取り組みで知られます。後継プロジェクトLIFE DinPin Bear（2026〜、9か国）でも中心的な役割を担っています。',
    relatedGuides: [
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
      { href: '/guide/electric-fence-bear-prevention', label: '電気柵によるクマ対策' },
    ],
  },
  Croatia: {
    flag: '🇭🇷',
    nameJa: 'クロアチア',
    bears: ['Brown bear（ヒグマ）'],
    overviewJa: 'クロアチアのヒグマはディナル山脈のゴルスキ・コタル地方とリカ地方に生息します。2023年秋に個体数調査が実施されましたが、DNA分析費用の資金不足により結果の公表が2025〜2026年まで遅延しています。EU LIFE DINALP BEARプロジェクトに参加国として名を連ね、後継プロジェクトLIFE DinPin Bearでも参加予定です。EU保護指令と国内狩猟管理の両立を巡る政策的な議論が続いています。',
    relatedGuides: [
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
    ],
  },
  Malaysia: {
    flag: '🇲🇾',
    nameJa: 'マレーシア',
    bears: ['Sun bear（マレーグマ / サンベア）'],
    overviewJa: 'マレーシア・ボルネオはIUCN危急種（Vulnerable）に指定されたマレーグマ（サンベア、Helarctos malayanus）の主要生息地です。サバ州サンダカンに拠点を置くBSBCC（ボルネオ・サンベア保全センター）が世界唯一のサンベア専門保全機関として41頭を救護・保護しています。主な脅威は熱帯雨林の消失・違法狩猟・ペット目的の幼獣密猟であり、過去30年で30%以上の個体数減少が推定されています。',
    relatedGuides: [
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
    ],
  },
  Pakistan: {
    flag: '🇵🇰',
    nameJa: 'パキスタン',
    bears: ['Himalayan brown bear（ヒマラヤヒグマ）'],
    overviewJa: 'パキスタン北部のギルギット=バルティスタン州には、ヒグマの亜種であるヒマラヤヒグマ（Ursus arctos isabellinus）が生息します。2022年の政府公式調査でデオサイ国立公園（約4,000km²）に66頭（95%CI: 58〜77頭）が確認されており、パキスタン北部全体では約150〜200頭が推定されています。密猟・家畜捕食による報復殺害・生息地の放牧圧が課題となっています。',
    relatedGuides: [
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
    ],
  },
  'South Korea': {
    flag: '🇰🇷',
    nameJa: '韓国',
    bears: ['Asiatic black bear（ツキノワグマ）'],
    overviewJa: '韓国では1990年代に野生絶滅したツキノワグマの復元プログラムが2004年から智異山（ジリサン）国立公園で実施されています。ロシア沿海州から6頭を放獣して開始し、2024年には個体数が約80頭に到達。第4世代の自然繁殖も確認されており、長期的な野生復帰成功事例として国際的に評価されています。',
    relatedGuides: [
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
      { href: '/guide/satoyama-bear-human-coexistence', label: '里山における熊との共存' },
    ],
  },
  India: {
    flag: '🇮🇳',
    nameJa: 'インド',
    bears: ['Sloth bear（ナマケグマ）'],
    overviewJa: 'インドにはナマケグマ（Melursus ursinus）をはじめ複数のクマ種が生息します。ナマケグマはインドで最も人身被害件数が多い熊種で、年間数百人が負傷しています。ScienceDirect・PLOS ONE掲載の査読済み研究によって、オリッサ州・マディヤ・プラデーシュ州での攻撃パターン・被害者属性・予防策が詳細に分析されています。コミュニティベースの早期警告システムが効果を上げています。',
    relatedGuides: [
      { href: '/guide/international-bear-management', label: '海外の熊対策研究・管理事例' },
      { href: '/guide/non-lethal-bear-management', label: '非致死型クマ対策の体系' },
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
    alternates: { canonical: `https://kumanuke.bubuworks.co.jp/world/${params.country}` },
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {reports.map((r) => (
                  <div key={r.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderLeft: `3px solid ${cfg.color}`,
                    padding: '16px 18px',
                    borderRadius: '0 6px 6px 0',
                  }}>
                    {/* ── Header row ── */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{
                        background: WORLD_IMPORTANCE_COLORS[r.importance_level],
                        color: '#fff', fontSize: 9, fontWeight: 700,
                        padding: '1px 7px', borderRadius: 3,
                      }}>
                        {WORLD_IMPORTANCE_LABELS[r.importance_level]}
                      </span>
                      {/* Casualties badge */}
                      {r.casualties && (
                        <>
                          {(r.casualties.killed ?? 0) > 0 && (
                            <span style={{
                              background: '#7F1D1D', color: '#FCA5A5',
                              fontSize: 9, fontWeight: 700,
                              padding: '1px 7px', borderRadius: 3,
                            }}>
                              死亡 {r.casualties.killed}
                            </span>
                          )}
                          {(r.casualties.injured ?? 0) > 0 && (
                            <span style={{
                              background: '#7C2D12', color: '#FED7AA',
                              fontSize: 9, fontWeight: 700,
                              padding: '1px 7px', borderRadius: 3,
                            }}>
                              負傷 {r.casualties.injured}
                            </span>
                          )}
                        </>
                      )}
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                        {r.region} · {r.city}
                      </span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                        {formatDate(r.date)}
                      </span>
                    </div>

                    {/* ── Summary ── */}
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: '0 0 10px', lineHeight: 1.75, fontWeight: 500 }}>
                      {r.summary_ja}
                    </p>

                    {/* ── Detail ── */}
                    {r.detail_ja && (
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: '0 0 10px', lineHeight: 1.85, borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: 10 }}>
                        {r.detail_ja}
                      </p>
                    )}

                    {/* ── Lessons ── */}
                    {r.lessons_ja && (
                      <div style={{
                        background: 'rgba(16,185,129,0.08)',
                        border: '1px solid rgba(16,185,129,0.2)',
                        borderRadius: 5,
                        padding: '8px 12px',
                        marginBottom: 8,
                      }}>
                        <p style={{ fontSize: 11, color: '#34D399', fontWeight: 700, margin: '0 0 3px', letterSpacing: '0.03em' }}>
                          📌 教訓・対策ポイント
                        </p>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.7 }}>
                          {r.lessons_ja}
                        </p>
                      </div>
                    )}

                    {/* ── Official response ── */}
                    {r.official_response_ja && (
                      <div style={{
                        background: 'rgba(59,130,246,0.07)',
                        border: '1px solid rgba(59,130,246,0.18)',
                        borderRadius: 5,
                        padding: '8px 12px',
                        marginBottom: 8,
                      }}>
                        <p style={{ fontSize: 11, color: '#93C5FD', fontWeight: 700, margin: '0 0 3px', letterSpacing: '0.03em' }}>
                          🏛 当局・機関の対応
                        </p>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.7 }}>
                          {r.official_response_ja}
                        </p>
                      </div>
                    )}

                    {/* ── Bear population ── */}
                    {r.bear_population && (
                      <div style={{ marginBottom: 8 }}>
                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                          📊 個体数推定：<span style={{ color: 'rgba(255,255,255,0.55)' }}>{r.bear_population}</span>
                        </p>
                      </div>
                    )}

                    {/* ── Footer ── */}
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 4, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                        🐻 {r.bear_type}
                      </span>
                      {r.source_name && (
                        <a
                          href={r.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: 10, color: 'rgba(96,165,250,0.6)', textDecoration: 'none' }}
                        >
                          出典：{r.source_name} →
                        </a>
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
