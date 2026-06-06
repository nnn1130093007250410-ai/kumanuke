import type { Metadata } from 'next'
import Link from 'next/link'
import { loadBearData, getPrefectureStats } from '@/lib/bear-data'
import { PREFECTURES, getSlugByName } from '@/lib/prefectures'

export const metadata: Metadata = {
  title: 'クマ出没 都道府県ランキング｜秋田1位・意外な3位は京都府 | KUMANUKE',
  description: 'KUMANUKEの11万件超のデータによるクマ出没都道府県ランキング。秋田県が断トツ1位。なぜその県が多いのか、背景と特徴も解説。',
  keywords: ['クマ 多い 都道府県', 'クマ 秋田 なぜ', 'クマ 都道府県 ランキング', 'クマ 多い 地域'],
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-prefecture-ranking' },
}

export const revalidate = 3600

// 意外な特徴コメント
const PREFECTURE_NOTES: Record<string, string> = {
  '秋田県':  'ツキノワグマ密度が日本最高水準。奥羽山脈のブナ林が広大。',
  '新潟県':  '山地面積が広く、農村部への侵入が多い。米どころゆえ農業被害も深刻。',
  '京都府':  '意外にも3位。丹後・山陰沿いの山岳地帯に大きな個体群が存在。',
  '宮城県':  '仙台近郊での出没も増加。奥羽・出羽山地の個体群が南下傾向。',
  '福井県':  '面積あたりの出没密度が全国最高クラス。越前・嶺南地方で頻発。',
  '青森県':  '白神山地のブナ原生林に大個体群。八甲田・十和田周辺も多発地帯。',
  '岐阜県':  '飛騨・美濃の山岳地帯に広大な生息域。観光地（白川郷等）近くでも出没。',
  '富山県':  '立山連峰〜里山まで多様な生息環境。農業県ゆえ農作物被害も多い。',
  '山形県':  '朝日・蔵王・飯豊連峰に大個体群。山菜採り中の人身被害も多い。',
  '福島県':  '2026年6月の市街地連続被害で注目。阿武隈・奥羽山脈に広い生息域。',
}

export default async function BearPrefectureRankingPage() {
  const allData = loadBearData()
  const stats = getPrefectureStats(allData)
  const top20 = stats.slice(0, 20)
  const maxCount = top20[0]?.count ?? 1

  return (
    <main style={{ background: '#0A1628', minHeight: '100vh', color: '#fff' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0F2E16 0%, #0A1628 100%)',
        padding: '56px 24px 48px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: 14 }}>
          KUMANUKE DATA｜都道府県別全データ集計
        </p>
        <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          🐻 クマ出没 都道府県ランキング
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto' }}>
          全国 <strong style={{ color: '#5EC97C' }}>110,751件</strong> のデータをもとに集計。
          あなたの地域は何位？
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* TOP3 ハイライト */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 48 }}>
          {top20.slice(0, 3).map((p, i) => {
            const medals = ['🥇', '🥈', '🥉']
            const colors = ['#F59E0B', '#9CA3AF', '#B45309']
            const slug = getSlugByName(p.prefecture)
            return (
              <Link key={p.prefecture} href={slug ? `/map/${slug}` : '/map'} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: `${colors[i]}18`,
                  border: `2px solid ${colors[i]}`,
                  borderRadius: 16,
                  padding: '20px 16px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 28 }}>{medals[i]}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '6px 0 4px' }}>{p.prefecture}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: colors[i], fontFamily: 'var(--font-dm-sans)' }}>
                    {p.count.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>件</div>
                  {PREFECTURE_NOTES[p.prefecture] && (
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 8, lineHeight: 1.5 }}>
                      {PREFECTURE_NOTES[p.prefecture].slice(0, 30)}…
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* 全ランキング */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
          全国ランキング（TOP20）
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 48 }}>
          {top20.map((p, i) => {
            const slug = getSlugByName(p.prefecture)
            const pct = (p.count / maxCount) * 100
            const isTop3 = i < 3
            return (
              <Link key={p.prefecture} href={slug ? `/map/${slug}` : '/map'} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: isTop3 ? 'rgba(94,201,124,0.06)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isTop3 ? 'rgba(94,201,124,0.15)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 8,
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <span style={{
                    width: 28, fontSize: 12, fontWeight: 700, textAlign: 'center', flexShrink: 0,
                    color: isTop3 ? '#5EC97C' : 'rgba(255,255,255,0.3)',
                  }}>{i + 1}</span>
                  <span style={{ width: 80, fontSize: 13, fontWeight: 600, color: '#fff', flexShrink: 0 }}>
                    {p.prefecture}
                  </span>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 18, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: isTop3 ? '#5EC97C' : '#3B5BDB',
                      opacity: 0.7,
                      borderRadius: 4,
                      minWidth: 6,
                    }} />
                  </div>
                  <span style={{
                    width: 64, fontSize: 12, fontWeight: 700, textAlign: 'right',
                    color: isTop3 ? '#5EC97C' : 'rgba(255,255,255,0.55)', flexShrink: 0,
                  }}>{p.count.toLocaleString()}件</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* 県別解説 */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            各県の特徴
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(PREFECTURE_NOTES).map(([pref, note]) => (
              <div key={pref} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10,
                padding: '14px 18px',
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#5EC97C', flexShrink: 0, minWidth: 60 }}>{pref}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Link href="/map" style={{
            display: 'inline-block',
            background: '#5EC97C',
            color: '#0F2E16',
            fontWeight: 700,
            fontSize: 15,
            padding: '14px 32px',
            borderRadius: 8,
            textDecoration: 'none',
          }}>
            🗺 あなたの地域のデータを見る →
          </Link>
        </div>

        {/* 次に読む */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 16 }}>次に読む</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { href: '/guide/bear-october-danger', label: '最も危険な月は10月', sub: '年間出没の23%が集中する理由' },
              { href: '/guide/bear-rapid-increase', label: '6年で6.3倍に増えた理由', sub: '急増の3つの構造的原因' },
              { href: '/guide/japan-regional-bear-data', label: '都道府県別傾向分析（詳細版）', sub: '地域ごとの詳細な出没傾向' },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '16px 16px',
                display: 'block',
              }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>{link.label}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '0 0 10px' }}>{link.sub}</p>
                <span style={{ fontSize: 11, color: '#5EC97C', fontWeight: 700 }}>読む →</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
