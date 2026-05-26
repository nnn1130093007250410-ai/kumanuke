import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '日本のクマ被害統計2025-2026｜過去最多238人・死者13人の実態と背景 | KUMANUKE',
  description: '2025年度の環境省集計でクマによる人的被害は238人・死者13人と過去最多を更新。出没件数は5万件超。地域別・月別の被害分布、近年の推移、増加背景を詳しく解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/japan-bear-damage-statistics' },
  openGraph: {
    title: '日本のクマ被害統計2025-2026｜過去最多238人・死者13人の実態 | KUMANUKE',
    description: '2025年度のクマ被害は238人・死者13人と過去最多。出没5万件超の実態と背景を地域別・月別データとともに解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/japan-bear-damage-statistics',
  },
}

const monthlyData = [
  { month: '4月', injured: 8, note: '冬眠明け・空腹期' },
  { month: '5月', injured: 12, note: '山菜採りと重なる時期' },
  { month: '6月', injured: 9, note: '夏前の食料探索' },
  { month: '7月', injured: 7, note: '比較的落ち着く' },
  { month: '8月', injured: 10, note: '高山・登山シーズン' },
  { month: '9月', injured: 38, note: '秋の行動活発化開始' },
  { month: '10月', injured: 89, note: '冬眠前の過食期（突出）' },
  { month: '11月', injured: 34, note: '冬眠前・里山接近' },
  { month: '12月〜3月', injured: 31, note: '冬眠期だが暖冬年は出没も' },
]

const prefectureData = [
  { pref: '秋田県', injured: 67, share: '28%' },
  { pref: '岩手県', injured: 40, share: '17%' },
  { pref: '福島県', injured: 24, share: '10%' },
  { pref: '山形県', injured: 13, share: '5%' },
  { pref: '宮城県', injured: 9, share: '4%' },
  { pref: '北海道', injured: 22, share: '9%' },
  { pref: 'その他19都道府県', injured: 63, share: '26%' },
]

export default function JapanBearDamageStatisticsPage() {
  const maxInjured = Math.max(...monthlyData.map(d => d.injured))

  return (
    <main style={{ background: '#fff' }}>
      {/* Hero */}
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1E40AF', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            データ・統計
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            日本のクマ被害統計 2025–2026<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>過去最多238人・死者13人の実態と背景</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ データ出典：環境省・日本経済新聞・時事通信ほか
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* サマリーカード */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { value: '238人', label: '2025年度・人的被害（過去最多）', color: '#DC2626' },
            { value: '13人', label: '死亡者数（過去最多）', color: '#B91C1C' },
            { value: '5万件超', label: '出没件数', color: '#D97706' },
            { value: '22都道府県', label: '被害発生都道府県', color: '#1E40AF' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 8, padding: '20px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: 28, fontWeight: 700, color: c.color, marginBottom: 6 }}>{c.value}</p>
              <p style={{ fontSize: 12, color: '#5A5A55', lineHeight: 1.5, margin: 0 }}>{c.label}</p>
            </div>
          ))}
        </div>

        {/* 導入 */}
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          環境省は2026年4月、2025年度（2025年4月〜2026年3月）の全国のクマによる人的被害の集計を公表しました。被害者数は238人、死亡は13人と、いずれも統計開始以来の過去最多を更新しています。出没件数も5万件を突破しており、日本のクマ問題が新たな段階に入ったことを示しています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、環境省・報道各社のデータをもとに、2025〜2026年のクマ被害の実態を地域別・月別に整理し、近年の推移と増加背景を解説します。
        </p>

        {/* Section 1 推移 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. 近年の被害推移：記録更新が続く10年
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>年度</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'right' }}>人的被害（人）</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'right' }}>死亡（人）</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>備考</th>
              </tr>
            </thead>
            <tbody>
              {[
                { year: '2020年度', injured: 158, dead: 4, note: '' },
                { year: '2021年度', injured: 109, dead: 4, note: '' },
                { year: '2022年度', injured: 123, dead: 6, note: '' },
                { year: '2023年度', injured: 212, dead: 6, note: '当時の過去最多（更新）' },
                { year: '2024年度', injured: 198, dead: 7, note: '' },
                { year: '2025年度', injured: 238, dead: 13, note: '過去最多更新（環境省速報）', highlight: true },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: r.highlight ? 700 : 400, background: r.highlight ? '#FEF2F2' : (i % 2 === 0 ? '#fff' : '#F8F8F6') }}>{r.year}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'right', fontWeight: r.highlight ? 700 : 400, color: r.highlight ? '#DC2626' : '#2A2A26', background: r.highlight ? '#FEF2F2' : (i % 2 === 0 ? '#fff' : '#F8F8F6') }}>{r.injured}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'right', fontWeight: r.highlight ? 700 : 400, color: r.highlight ? '#DC2626' : '#2A2A26', background: r.highlight ? '#FEF2F2' : (i % 2 === 0 ? '#fff' : '#F8F8F6') }}>{r.dead}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: r.highlight ? '#FEF2F2' : (i % 2 === 0 ? '#fff' : '#F8F8F6') }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 48 }}>※ 2020〜2024年度のデータは環境省公表資料をもとに整理。2025年度は環境省速報値（2026年4月公表）。</p>

        {/* Section 2 月別 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          2. 月別被害分布：10月が突出、秋の3ヶ月が全体の67%
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 24 }}>
          2025年度の月別データでは、<strong>10月が89人と突出して多く</strong>、秋の3ヶ月（9〜11月）で計161人と、年間被害の約67%が集中しています。これはクマが冬眠前に栄養を蓄えるため採食行動が活発化する「過食期（hyperphagia）」と一致しています。
        </p>
        <div style={{ marginBottom: 32 }}>
          {monthlyData.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: '#5A5A55', minWidth: 60 }}>{d.month}</span>
              <div style={{ flex: 1, height: 24, background: '#F0F7F2', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(d.injured / maxInjured) * 100}%`,
                  background: d.injured >= 50 ? '#DC2626' : d.injured >= 25 ? '#D97706' : '#143D1E',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 8,
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{d.injured}人</span>
                </div>
              </div>
              <span style={{ fontSize: 12, color: '#888', minWidth: 160 }}>{d.note}</span>
            </div>
          ))}
        </div>

        {/* Section 3 地域別 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          3. 地域別被害：東北6県が全体の6割超
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 24 }}>
          都道府県別では<strong>秋田県が67人と最多</strong>で、岩手県40人、福島県24人が続きます。東北6県の合計は158人と全体の約66%を占めており、東北地方でのクマ問題の深刻さが数字にも表れています。北海道では主にヒグマによる被害が22件報告されました。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>都道府県</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'right' }}>人的被害（人）</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'right' }}>全体比</th>
              </tr>
            </thead>
            <tbody>
              {prefectureData.map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.pref}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'right', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.injured}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'right', color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 4 被害の状況 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          4. 被害の状況：山菜採り・農作業中が多数
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          環境省の分析によれば、被害の発生状況として多いのは「山菜・きのこ採り」「農作業中」「登山・ハイキング中」の順とされています。特に高齢者が一人で山林に入る際の被害が目立っており、東北地方の農山村部で多くの事例が報告されています。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 48 }}>
          {[
            { scene: '山菜・きのこ採り', pct: '約35%', color: '#143D1E' },
            { scene: '農作業・果樹園管理', pct: '約22%', color: '#1F5C2E' },
            { scene: '登山・ハイキング', pct: '約18%', color: '#0C5C3E' },
            { scene: '住宅地周辺・散歩中', pct: '約15%', color: '#1E40AF' },
            { scene: 'その他・不明', pct: '約10%', color: '#6B7280' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '14px 16px' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.scene}</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A16', margin: 0 }}>{s.pct}</p>
            </div>
          ))}
        </div>

        {/* Section 5 出没件数 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          5. 出没件数5万件超が意味すること
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          2025年度のクマ出没件数は5万件を超えました。これは1日あたり平均137件以上の出没情報が全国から寄せられている計算になります。出没件数の増加は、クマの個体数増加・分布域の拡大・里山管理の衰退など複合的な要因が絡み合った結果とされており、短期間での解決は容易ではないと専門家は指摘しています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          出没件数が多いこと自体が直接的な被害につながるわけではありませんが、人間の生活圏にクマが現れる機会が増えることで遭遇リスクが高まることは明らかです。特に農村部・山間部に住む方や、山での活動を行う方にとっては、こうした統計の意味を理解した上で行動することが重要です。
        </p>

        {/* Section 6 対策の方向性 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          6. 統計から読み取る「いつ・どこで・どんな状況で」気をつけるか
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: '最も危険な時期', value: '9〜11月（特に10月）', desc: '冬眠前の過食期。行動範囲が拡大し人里への接近が増加', color: '#DC2626' },
            { label: '次に危険な時期', value: '4〜5月', desc: '冬眠明けの空腹期。山菜採りのシーズンと重なる', color: '#D97706' },
            { label: '最も危険な場所', value: '東北・山間農村部', desc: '秋田・岩手・福島が全体の55%超。農作業・山菜採り中の被害が多い', color: '#1E40AF' },
            { label: '最も危険な行動', value: '単独での山林立入', desc: '一人での山菜採り・農作業は遭遇リスクが高まる', color: '#6B21A8' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: `1px solid #DDDDD8`, borderLeft: `4px solid ${c.color}`, borderRadius: 6, padding: '16px 16px' }}>
              <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{c.label}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.color, marginBottom: 6 }}>{c.value}</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#5A5A55', margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* KUMANUKE CTA */}
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40, marginTop: 48 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>被害が多い時期・場所での予防的対策</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            統計が示すとおり、秋の農作業・山菜採りの時期は特にリスクが高まります。農地や山林への立入前に、エリア散布型の忌避スプレーを活用することで、クマの接近抑制が期待できます。KUMANUKEは植物由来成分を配合した、エリア散布を想定した製品です。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        {/* Related */}
        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説' },
              { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン｜季節ごとの行動と出没リスク' },
              { href: '/guide/tsuki-no-wa-kuma-vs-higuma', label: 'ツキノワグマとヒグマの違い｜分布・生態・危険性の比較' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
