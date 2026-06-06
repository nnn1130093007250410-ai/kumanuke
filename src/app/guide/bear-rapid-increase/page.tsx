import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '6年で6倍。クマが急増した3つの理由 | KUMANUKE',
  description: '2020年6,667件→2025年42,031件。KUMANUKEのデータが示す衝撃の急増。なぜここまで増えたのか、3つの理由を数字と共に解説します。',
  keywords: ['クマ 増加 理由', 'クマ 急増', 'クマ なぜ増えた', '熊出没 増加', 'クマ 個体数'],
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-rapid-increase' },
}

const YEAR_DATA = [
  { year: '2020', count: 6667 },
  { year: '2021', count: 3380 },
  { year: '2022', count: 4059 },
  { year: '2023', count: 11747 },
  { year: '2024', count: 9537 },
  { year: '2025', count: 42031 },
]
const MAX_COUNT = 42031

export default function BearRapidIncreasePage() {
  return (
    <main style={{ background: '#0A0F1E', minHeight: '100vh', color: '#fff' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #0A0F1E 100%)',
        padding: '60px 24px 52px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: 16 }}>
          KUMANUKE DATA｜2020〜2025年の実データ
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 'clamp(52px,12vw,96px)', fontWeight: 900, color: '#818CF8', fontFamily: 'var(--font-dm-sans)', lineHeight: 1 }}>6.3</span>
          <span style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 700, color: '#818CF8' }}>倍</span>
        </div>
        <div style={{ fontSize: 'clamp(18px,3.5vw,28px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          6年でクマは急増した
        </div>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          2020年 <strong style={{ color: '#818CF8' }}>6,667件</strong> → 2025年 <strong style={{ color: '#EF4444' }}>42,031件</strong><br/>
          これは偶然ではありません。
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* 年別チャート */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 24 }}>
            出没件数の推移（全国）
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {YEAR_DATA.map((d) => {
              const isPeak = d.year === '2025'
              const color = isPeak ? '#EF4444' : '#818CF8'
              return (
                <div key={d.year} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    width: 40, fontSize: 13, fontWeight: isPeak ? 700 : 400,
                    color: isPeak ? '#EF4444' : 'rgba(255,255,255,0.5)',
                    flexShrink: 0,
                  }}>{d.year}</span>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 6, height: 32, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(d.count / MAX_COUNT) * 100}%`,
                      background: color,
                      opacity: isPeak ? 1 : 0.6,
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 10,
                      minWidth: 80,
                    }}>
                      <span style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>
                        {d.count.toLocaleString()}件
                      </span>
                    </div>
                  </div>
                  {isPeak && (
                    <span style={{ fontSize: 11, color: '#EF4444', fontWeight: 700, flexShrink: 0 }}>← 過去最多</span>
                  )}
                </div>
              )
            })}
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>
            ※ KUMANUKEデータベース（ArcGIS・自治体公開データより）
          </p>
        </section>

        {/* 3つの理由 */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 32 }}>
            なぜ急増したのか？3つの理由
          </h2>

          {[
            {
              num: '01',
              color: '#818CF8',
              title: '個体数が回復・増加している',
              stat: 'ツキノワグマ推定：約4〜5万頭',
              body: '20〜30年前と比べ生息域が大きく拡大しました。かつて「クマのいない」エリアだった里山近辺でも頻繁に目撃されるようになっています。保護政策の成果でもありますが、人間との衝突リスクが上がっています。',
            },
            {
              num: '02',
              color: '#34D399',
              title: '耕作放棄地が緩衝帯を消した',
              stat: '全国の耕作放棄地：約43万ha（農水省）',
              body: '山と集落の間にあった農地が管理されなくなり、クマが人里まで降りやすい環境が整ってしまいました。藪が茂り、人間の匂いがしない空白地帯が日本全国に広がっています。',
            },
            {
              num: '03',
              color: '#F59E0B',
              title: 'クマが人を怖がらなくなった',
              stat: '山に入る人口：過去30年で激減',
              body: '山仕事・狩猟・林業に携わる人が減り、クマが「人間と会う機会」がなくなりました。人を見ても逃げないクマの世代交代が進み、市街地への侵入を躊躇わない個体が増えています。',
            },
          ].map((item) => (
            <div key={item.num} style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${item.color}33`,
              borderRadius: 16,
              padding: '24px 24px',
              marginBottom: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{
                  fontSize: 32, fontWeight: 900, color: item.color,
                  fontFamily: 'var(--font-dm-sans)', lineHeight: 1, flexShrink: 0,
                }}>{item.num}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>{item.title}</p>
                  <p style={{
                    fontSize: 11, color: item.color, fontWeight: 700,
                    background: `${item.color}18`, display: 'inline-block',
                    padding: '2px 10px', borderRadius: 20, margin: '0 0 10px',
                  }}>{item.stat}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.8 }}>{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* これからどうなるか */}
        <section style={{
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.25)',
          borderRadius: 16,
          padding: '28px 28px',
          marginBottom: 48,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#EF4444', marginBottom: 16 }}>
            📊 これからどうなるのか
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: 16 }}>
            KUMANUKEのデータでは<strong style={{ color: '#fff' }}>2026年春の東北6県だけで2,584件</strong>を記録し、前年同期比2倍超。個体数増加の勢いは止まっていません。
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>
            秋の出没規模を左右する「どんぐり豊凶予測」は<strong style={{ color: '#F59E0B' }}>環境省が7〜8月に公表予定</strong>。凶作が重なれば、2025年を超える可能性もあります。
          </p>
        </section>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
          <Link href="/map" style={{
            display: 'inline-block',
            background: '#818CF8',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            padding: '13px 24px',
            borderRadius: 8,
            textDecoration: 'none',
          }}>
            🗺 全国出没マップで確認
          </Link>
          <Link href="/guide/bear-october-danger" style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            padding: '13px 24px',
            borderRadius: 8,
            textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            ⚠️ 最も危険な月を見る
          </Link>
        </div>

        {/* 次に読む */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 16 }}>次に読む</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { href: '/guide/bear-october-danger', label: '最も危険な月は10月', sub: '年間出没23%・人身被害26%が集中' },
              { href: '/guide/bear-prefecture-ranking', label: '都道府県ランキング', sub: '全国TOP20とその背景' },
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか', sub: '里山変化・食料不足・学習行動' },
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
                <span style={{ fontSize: 11, color: '#818CF8', fontWeight: 700 }}>読む →</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
