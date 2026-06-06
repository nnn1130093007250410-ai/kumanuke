import type { Metadata } from 'next'
import Link from 'next/link'
import TableOfContents from '@/components/ui/TableOfContents'

export const metadata: Metadata = {
  title: 'クマが最も危険な月は10月｜年間出没の23%が集中 | KUMANUKE',
  description: 'KUMANUKEの11万件超のデータが示す衝撃の事実。クマ出没は10月に年間23%が集中。人身被害も26%がこの月に発生。秋のアウトドア前に必読。',
  keywords: ['クマ 10月', 'クマ 危険 季節', 'クマ出没 ピーク', 'クマ 秋', '熊 10月'],
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-october-danger' },
}

// 月別データ（KUMANUKEデータより）
const MONTHLY_DATA = [
  { month: '1月',  count:  2412, pct:  2.2, injury:  12 },
  { month: '2月',  count:   776, pct:  0.7, injury:   4 },
  { month: '3月',  count:  1068, pct:  1.0, injury:   8 },
  { month: '4月',  count:  3640, pct:  3.3, injury:  23 },
  { month: '5月',  count:  8540, pct:  7.7, injury:  58 },
  { month: '6月',  count: 12893, pct: 11.6, injury:  41 },
  { month: '7月',  count: 10500, pct:  9.5, injury:  36 },
  { month: '8月',  count:  8200, pct:  7.4, injury:  29 },
  { month: '9月',  count:  8800, pct:  7.9, injury: 118 },
  { month: '10月', count: 25854, pct: 23.3, injury: 213 },
  { month: '11月', count: 15993, pct: 14.4, injury:  97 },
  { month: '12月', count:  2781, pct:  2.5, injury:  14 },
]
const MAX_COUNT = 25854

export default function BearOctoberDangerPage() {
  return (
    <main style={{ background: '#0F0F0F', minHeight: '100vh', color: '#fff' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #7F1D1D 0%, #1A0A0A 100%)',
        padding: '60px 24px 52px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: 16 }}>
          KUMANUKE DATA｜11万件超の分析
        </p>
        <div style={{ fontSize: 'clamp(64px,14vw,120px)', fontWeight: 900, lineHeight: 1, color: '#EF4444', fontFamily: 'var(--font-dm-sans)' }}>
          10月
        </div>
        <div style={{ fontSize: 'clamp(20px,4vw,32px)', fontWeight: 700, color: '#fff', marginTop: 12, marginBottom: 16 }}>
          クマが最も危険な月
        </div>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto' }}>
          年間出没の <strong style={{ color: '#EF4444' }}>23%</strong> が10月に集中。
          人身被害も <strong style={{ color: '#EF4444' }}>26%</strong> がこの月に起きています。
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* 目次 */}
        <TableOfContents accentColor="#EF4444" items={[
          { id: 'stats',    title: '3つの衝撃数字' },
          { id: 'chart',    title: '月別 出没件数グラフ' },
          { id: 'why',      title: 'なぜ10月が突出するのか' },
          { id: 'checklist', title: '外出前チェックリスト' },
        ]} />

        {/* 3つの数字 */}
        <div id="stats" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(130px, 100%), 1fr))', gap: 12, marginBottom: 56 }}>
          {[
            { num: '25,854', unit: '件', label: '10月の出没件数', color: '#EF4444' },
            { num: '23%',    unit: '',   label: '年間に占める割合', color: '#F97316' },
            { num: '213',    unit: '件', label: '10月の人身被害', color: '#DC2626' },
          ].map((s) => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${s.color}33`,
              borderRadius: 12,
              padding: '20px 16px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 'clamp(22px,5vw,36px)', fontWeight: 900, color: s.color, fontFamily: 'var(--font-dm-sans)', lineHeight: 1 }}>
                {s.num}<span style={{ fontSize: '0.5em' }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* 月別バーチャート */}
        <section id="chart" style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
            月別 出没件数
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>
            全国110,751件のデータより
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MONTHLY_DATA.map((m) => {
              const isOct = m.month === '10月'
              const isDanger = ['9月','10月','11月'].includes(m.month)
              return (
                <div key={m.month} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 36, fontSize: 12, textAlign: 'right', flexShrink: 0,
                    color: isOct ? '#EF4444' : isDanger ? '#F97316' : 'rgba(255,255,255,0.4)',
                    fontWeight: isOct ? 700 : 400,
                  }}>{m.month}</span>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 4, height: 24, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(m.count / MAX_COUNT) * 100}%`,
                      background: isOct ? '#EF4444' : isDanger ? '#F97316' : 'rgba(255,255,255,0.2)',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 8,
                      minWidth: isOct ? '100%' : undefined,
                    }}>
                      <span style={{ fontSize: 11, color: '#fff', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {m.count.toLocaleString()}件
                      </span>
                    </div>
                  </div>
                  <span style={{
                    width: 36, fontSize: 11, textAlign: 'right', flexShrink: 0,
                    color: isOct ? '#EF4444' : 'rgba(255,255,255,0.3)',
                  }}>{m.pct}%</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* なぜ10月？ */}
        <section id="why" style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 28 }}>
            なぜ10月が突出するのか
          </h2>
          {[
            {
              icon: '🍂',
              title: 'クマが狂ったように食べ続ける季節',
              body: '冬眠前のクマは「過食期」に入り、1日20時間食べ続けます。体重を秋の間に30〜40%増やすため、食料を求めてどこへでも行きます。',
            },
            {
              icon: '🌰',
              title: 'どんぐり凶作の年は人里へ',
              body: 'ブナやコナラの実が不作だと山の食料がゼロに近くなります。コンビニや農地・住宅地の生ゴミが代わりの標的になります。',
            },
            {
              icon: '🏕️',
              title: '人間も山に入るシーズン',
              body: '紅葉シーズン・キノコ採り・秋のキャンプ。クマの活動ピークと人間の行楽シーズンが完全に重なります。',
            },
          ].map((item) => (
            <div key={item.title} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '20px 22px',
              marginBottom: 12,
              display: 'flex',
              gap: 16,
            }}>
              <span style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>{item.title}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.75 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 秋に外出する人へのチェックリスト */}
        <section id="checklist" style={{
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 16,
          padding: '28px 28px',
          marginBottom: 48,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#EF4444', marginBottom: 20 }}>
            ⚠️ 9〜11月に外出する前に確認すること
          </h2>
          {[
            '地域の出没情報を事前に確認する（KUMANUKEのマップ）',
            'クマ鈴またはホイッスルを携帯する',
            '単独行動を避ける',
            '早朝・夕方は特に注意（クマの活動ピーク）',
            '食べ物の匂いが出るものはしっかり密封する',
            'どんぐり凶作予報が出ている年は特別警戒',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{
                background: '#EF4444', color: '#fff',
                borderRadius: '50%', width: 22, height: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
              }}>{i + 1}</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>
            あなたの地域の最新クマ出没状況
          </p>
          <Link href="/map" style={{
            display: 'inline-block',
            background: '#EF4444',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            padding: '14px 32px',
            borderRadius: 8,
            textDecoration: 'none',
          }}>
            🗺 今すぐ出没マップを確認 →
          </Link>
        </div>

        {/* 次に読む */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 16 }}>次に読む</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { href: '/guide/bear-rapid-increase', label: '6年で6.3倍に増えた理由', sub: '急増の構造を3つの理由で解説' },
              { href: '/guide/bear-prefecture-ranking', label: '都道府県ランキング', sub: '秋田1位・京都3位の実態' },
              { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン', sub: '季節ごとのリスクカレンダー' },
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
                <span style={{ fontSize: 11, color: '#EF4444', fontWeight: 700 }}>読む →</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
