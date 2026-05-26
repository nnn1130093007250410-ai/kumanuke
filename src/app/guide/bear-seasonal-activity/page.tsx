import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマの年間活動パターン｜季節ごとの行動変化と出没リスクカレンダー | KUMANUKE',
  description: 'クマは冬眠明けの春から秋の過食期まで、季節によって行動パターンが大きく変わります。月別の活動特性・出没リスク・被害の多い状況を解説し、季節ごとの対策の重点ポイントを紹介します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-seasonal-activity' },
  openGraph: {
    title: 'クマの年間活動パターン｜季節ごとの行動変化と出没リスクカレンダー | KUMANUKE',
    description: '春の冬眠明けから秋の過食期まで、クマの月別活動と出没リスクを解説。季節ごとの対策のポイントも紹介。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-seasonal-activity',
  },
}

const seasons = [
  {
    period: '12月〜2月（冬）',
    phase: '冬眠期',
    activity: '低',
    activityColor: '#6B7280',
    behavior: 'ツキノワグマは樹洞や岩穴で冬眠。ヒグマも同様。ただし暖冬や個体によっては冬眠が浅く、早期に目覚める場合がある。この時期に出産・哺育を行う。',
    risk: '低（通常は出没しない）',
    riskLevel: 1,
    caution: '暖冬の年は早期に冬眠を中断する個体がいるため、1月でも出没情報がある地域では注意が必要',
  },
  {
    period: '3月〜4月（春・冬眠明け）',
    phase: '冬眠明け・空腹期',
    activity: '中〜高',
    activityColor: '#D97706',
    behavior: '冬眠から目覚めた直後は体重が大幅に低下しており、食料を求めて積極的に移動する。草本類・フキノトウ・タケノコの新芽などを採食。',
    risk: '中〜高（空腹で活発）',
    riskLevel: 3,
    caution: '春の山菜採りのシーズンと重なる。早朝・夕方の山林での山菜採り・農作業は特に注意が必要',
  },
  {
    period: '5月〜6月（春〜初夏）',
    phase: '繁殖期・食料探索',
    activity: '高',
    activityColor: '#DC2626',
    behavior: 'オスがメスを求めて広範囲を移動する繁殖期。行動範囲が拡大し、人里への接近リスクが高まる。タケノコ・草本類の採食が継続。',
    risk: '中〜高（行動範囲拡大）',
    riskLevel: 3,
    caution: '繁殖期のオスは通常より攻撃的になる傾向がある。タケノコ採りのシーズンとも重なるため、竹林周辺は特に注意',
  },
  {
    period: '7月〜8月（夏）',
    phase: '夏期採食',
    activity: '中',
    activityColor: '#059669',
    behavior: '比較的落ち着く時期だが食料探索は継続。高山帯のハイマツの実・コケモモ・ブルーベリー類を採食。登山道沿いの出没が増える時期。',
    risk: '中（登山シーズンと重なる）',
    riskLevel: 2,
    caution: '夏山登山・テント泊のシーズン。高山帯・亜高山帯でクマと遭遇する事例が報告されている',
  },
  {
    period: '9月〜11月（秋・過食期）',
    phase: '冬眠前過食期（Hyperphagia）',
    activity: '最高',
    activityColor: '#DC2626',
    behavior: '冬眠前に体重を30〜50%増やすために昼夜問わず採食行動が活発化。ドングリ・クリ・ブナの実が主食。里山・農地・果樹園への接近が急増。出没件数・被害件数ともに年間最多の時期。',
    risk: '最高（年間で最も危険な時期）',
    riskLevel: 5,
    caution: '農作業・山菜採り・登山のすべてで最高レベルの注意が必要。ドングリ凶作年は特に里山・農村部への接近が増加する',
  },
  {
    period: '11月中旬〜12月（初冬）',
    phase: '冬眠移行期',
    activity: '中〜低',
    activityColor: '#D97706',
    behavior: '採食活動が徐々に低下し、冬眠場所を探して移動。まだ活動している個体が多く、里山での出没も継続する。',
    risk: '中（まだ活動中の個体あり）',
    riskLevel: 2,
    caution: '「もう冬眠したはず」という思い込みが危険。気温が高い年は11月末まで活発に活動する個体がいる',
  },
]

export default function BearSeasonalActivityPage() {
  return (
    <main style={{ background: '#fff' }}>
      {/* Hero */}
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            生態・行動
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            クマの年間活動パターン<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>季節ごとの行動変化と出没リスクカレンダー</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：生態・行動
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* 導入 */}
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマは「冬眠する動物」として知られていますが、冬眠以外の時期の行動は季節によって大きく変化します。春の冬眠明けから秋の過食期、そして再び冬眠に入るまでの間、クマの活動強度・行動範囲・人里への接近リスクは季節によって異なります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          農業・登山・アウトドア・農村居住など、クマとの接触リスクがある活動をする方にとって、「いつが最もリスクが高いか」を理解することは効果的な対策につながります。本稿では、ツキノワグマを中心に、クマの年間活動パターンを季節別に解説します。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          なお、ヒグマ（北海道）も基本的な季節パターンはツキノワグマと類似していますが、活動開始時期や終了時期が若干異なる場合があります。
        </p>

        {/* リスクカレンダー */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          年間リスクカレンダー
        </h2>
        <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
          {['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'].map((m, i) => {
            const riskByMonth = [1, 1, 2, 4, 3, 3, 2, 2, 4, 5, 3, 1]
            const risk = riskByMonth[i]
            const color = risk >= 5 ? '#DC2626' : risk >= 4 ? '#D97706' : risk >= 3 ? '#CA8A04' : risk >= 2 ? '#16A34A' : '#9CA3AF'
            return (
              <div key={m} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: `${risk * 16}px`, background: color, borderRadius: '2px 2px 0 0', marginBottom: 4 }} />
                <p style={{ fontSize: 10, color: '#5A5A55', margin: 0 }}>{m}</p>
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 48, flexWrap: 'wrap' }}>
          {[
            { color: '#DC2626', label: '最高リスク（秋・過食期）' },
            { color: '#D97706', label: '高リスク（冬眠明け・秋冬移行期）' },
            { color: '#16A34A', label: '中リスク（夏・春繁殖期）' },
            { color: '#9CA3AF', label: '低リスク（冬眠期）' },
          ].map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, background: l.color, borderRadius: 2 }} />
              <span style={{ fontSize: 12, color: '#5A5A55' }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* 季節別解説 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 24 }}>
          季節別・行動パターンと対策のポイント
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {seasons.map((s, i) => (
            <div key={i} style={{ border: '1px solid #DDDDD8', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ background: s.activityColor, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{s.period}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginLeft: 12 }}>【{s.phase}】</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.2)', padding: '3px 10px', borderRadius: 20 }}>
                  活動：{s.activity}
                </span>
              </div>
              <div style={{ padding: '16px 20px', background: '#fff' }}>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 12 }}>{s.behavior}</p>
                <div style={{ background: '#F8F8F6', borderRadius: 4, padding: '10px 14px', marginBottom: 8 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#5A5A55', marginBottom: 4 }}>出没リスク</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: s.activityColor, margin: 0 }}>{s.risk}</p>
                </div>
                <div style={{ background: '#FFF8F0', border: '1px solid #FED7AA', borderRadius: 4, padding: '10px 14px' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#C05A1A', marginBottom: 4 }}>この時期の注意点</p>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: '#2A2A26', margin: 0 }}>{s.caution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 過食期の深掘り */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          秋の「過食期（Hyperphagia）」を深く理解する
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの行動パターンで特に注意が必要なのが、冬眠前の過食期（英語でHyperphagia：高食欲状態）です。この時期はクマが1日あたり20,000kcal以上を摂取することもあるとされており、通常の食料探索をはるかに超えた採食行動が見られます。
        </p>
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderLeft: '4px solid #DC2626', borderRadius: 8, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#DC2626', marginBottom: 8 }}>過食期の特徴（9〜11月）</p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {[
              '昼夜を問わず採食行動が継続（通常は薄明薄暮型だが夜間も活発に移動）',
              '行動範囲が通常の2〜3倍に拡大することがある',
              '食料さえあれば人を恐れる傾向が薄れる個体がいる',
              'ドングリ凶作年は農地・果樹園・ゴミ置き場への依存度が高まる',
              '秋田・岩手などでは10月の被害件数が他の月の3〜5倍になる年もある',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>{item}</li>
            ))}
          </ul>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          環境省の被害統計でも、2025年度の月別データでは10月が89人と突出して多く、この時期がいかに高リスクかを数字が示しています。農業・山菜採り・登山のいずれの活動でも、10月前後は最高レベルの注意と対策が求められます。
        </p>

        {/* 対策まとめ */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          季節別の対策重点ポイント
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>時期</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>対策の重点</th>
              </tr>
            </thead>
            <tbody>
              {[
                { period: '3〜4月（冬眠明け）', points: '山菜採り・農作業前の出没情報確認。単独行動の回避。早朝・夕方の山林立入に注意' },
                { period: '5〜6月（繁殖期）', points: '行動範囲拡大に注意。竹林・河川沿いのタケノコ採りに要注意。声出し・熊鈴の徹底' },
                { period: '7〜8月（夏山）', points: '登山道沿いの出没情報確認。テント設営時の食料管理。早朝・夕方の行動に注意' },
                { period: '9〜11月（過食期）', points: '全シーン最高警戒。農地・果樹園への事前忌避対策。ゴミ管理の徹底。電気柵の活用。単独外出の回避' },
                { period: '11〜12月（冬眠移行期）', points: '「もう冬眠した」という思い込みを避ける。暖冬年は活動継続個体に注意' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6', whiteSpace: 'nowrap' }}>{r.period}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* KUMANUKE CTA */}
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>秋の過食期前に：エリア散布型忌避対策</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            出没リスクが最も高まる9〜11月の前に、農地・果樹園・ゴミ置き場周辺にエリア散布型忌避スプレーを施しておくことで、クマの接近抑制が期待できます。KUMANUKEは植物由来成分を配合した事前散布型の製品です。
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
              { href: '/guide/japan-bear-damage-statistics', label: '日本のクマ被害統計2025-2026｜過去最多238人の実態' },
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説' },
              { href: '/guide/tsuki-no-wa-kuma-vs-higuma', label: 'ツキノワグマとヒグマの違い｜分布・体格・生態・危険性を徹底比較' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
