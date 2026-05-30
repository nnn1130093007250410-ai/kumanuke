import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマの繁殖と母子行動｜なぜ母グマは最も危険なのか | KUMANUKE',
  description: 'クマの繁殖期・遅延着床・子グマの成長と行動変化。人身事故統計が示す「母グマとの遭遇リスク」を生態・行動学の観点から解説。繁殖シーズン中の安全行動も紹介。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-reproduction-cubs' },
  openGraph: {
    title: 'クマの繁殖と母子行動｜なぜ母グマは最も危険なのか',
    description: '遅延着床・子グマの成長・母親防衛行動の統計。人身被害の多くは母子グマとの遭遇から。研究データで解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-reproduction-cubs',
  },
}

export default function BearReproductionCubsPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 12 }}>
            <span style={{ background: '#0C5C3E', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 3, letterSpacing: '0.1em' }}>LAB</span>
            <span style={{ background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, opacity: 0.85 }}>生態・行動</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            クマの繁殖と母子行動｜<br />なぜ母グマは最も危険なのか
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2026年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F0FDF4', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          クマの人身事故研究において一貫して示される結論があります。「<strong>母クマと子グマの組み合わせが、最も高いリスクをもたらす</strong>」ということです。北米での致死的クマ攻撃の分析では、ツキノワグマ相当種（アメリカクロクマ）の死亡事故の多くに母子クマが関与しています。本記事では、クマの繁殖生態から母親防衛行動のメカニズムまでを解説します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          繁殖期と交尾行動
        </h2>
        <p>
          ツキノワグマの交尾期は主に<strong>5月〜7月</strong>です。この時期はちょうど登山・ハイキング・山菜採りのシーズンと重なります。
        </p>
        <p style={{ marginTop: 16 }}>
          繁殖期の雄グマは広い行動圏を移動し、複数の雌の縄張りを巡回します。この移動中は通常より警戒心が低く、人との遭遇確率が上がります。また交尾をめぐる雄同士の競争行動（追いかけ・衝突）により、森の中での急速な移動・騒音が増えます。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 16, marginTop: 20, marginBottom: 24 }}>
          {[
            { label: 'ツキノワグマ交尾期', value: '5〜7月', sub: '登山シーズンと重複', color: '#DC2626' },
            { label: 'ヒグマ交尾期', value: '5〜7月', sub: '同様に危険期', color: '#B91C1C' },
            { label: '出産時期', value: '1〜2月', sub: '冬眠中に産まれる', color: '#143D1E' },
            { label: '独立時期', value: '1.5〜2.5年後', sub: '母親離れまでの期間', color: '#1F5C2E' },
          ].map((item) => (
            <div key={item.label} style={{ background: item.color, borderRadius: 8, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>{item.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          遅延着床（胚の発育停止）という特殊メカニズム
        </h2>
        <p>
          クマの繁殖において特筆すべきは「<strong>embryonic diapause（遅延着床）</strong>」という現象です。
        </p>
        <p style={{ marginTop: 16 }}>
          交尾後に受精卵は形成されますが、すぐには子宮壁に着床しません。受精卵は「胚盤胞」の状態のまま子宮に浮遊し、母親の栄養状態・体脂肪量が十分かどうかを「待ちます」。
        </p>

        <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: 8, padding: '20px 24px', marginTop: 20, marginBottom: 20 }}>
          <p style={{ fontWeight: 700, color: '#1E3A5F', marginBottom: 12, fontSize: 15 }}>遅延着床のプロセス</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#1A1A16' }}>
            {[
              ['5〜7月', '交尾・受精', '受精卵は胚盤胞状態で発育停止'],
              ['8〜10月', 'ハイパーファジア期', '母親の体脂肪評価。脂肪が不十分なら着床しない（出産中止）'],
              ['10〜11月', '冬眠入り後に着床', '体脂肪が十分な場合のみ子宮壁に着床・発育開始'],
              ['1〜2月', '冬眠中に出産', '未成熟な状態（体重300〜500g）で誕生'],
              ['春（3〜4月）', '母子で冬眠穴を出る', 'この時点で体重2〜3kg程度'],
            ].map(([time, event, note], i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < 4 ? '1px solid #DBEAFE' : 'none' }}>
                <span style={{ background: '#1E3A5F', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3, whiteSpace: 'nowrap', flexShrink: 0 }}>{time}</span>
                <div>
                  <span style={{ fontWeight: 700 }}>{event}</span>
                  <span style={{ color: '#5A5A55', marginLeft: 8, fontSize: 12 }}>{note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p>
          この仕組みにより、食料不足の年はクマの出産数が自然に減少します。一方、十分な食料が確保できた年は双子・三つ子での出産率が上がります。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          なぜ母グマは「最も危険」なのか
        </h2>
        <p>
          母グマは子グマを守るために、通常のクマでは考えられないほどの攻撃性を示すことがあります。これは哺乳類全般に共通する「母性防衛本能」ですが、クマの場合はその体力・速度・爪の威力から人間に対して致命的な結果をもたらしやすいです。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20, marginBottom: 20 }}>
          {[
            {
              title: '① 先制攻撃のリスク',
              body: '人間が近づいたことに気づいた母グマは、まず威嚇なしに突進することがあります。特に子グマが人間と母グマの間に入ったような状況では、即座に攻撃に転じます。',
              color: '#FEE2E2',
              border: '#EF4444',
            },
            {
              title: '② 逃走より攻撃を選びやすい',
              body: '成熟した単独雄グマは多くの場合「逃げる」選択をします。しかし母グマは子グマを連れているため逃走が困難で、防衛攻撃を選びやすい状況に追い込まれます。',
              color: '#FEF3C7',
              border: '#F59E0B',
            },
            {
              title: '③ 子グマの独立まで続くリスク',
              body: '母子の組み合わせは約1.5〜2.5年間続きます。この間は通年でリスクが高い状態が維持されます。',
              color: '#FEF3C7',
              border: '#F59E0B',
            },
            {
              title: '④ 子グマの人への「近づき」',
              body: '子グマは時に好奇心から人間に接近することがあります。これは危険なサインです。母グマが必ず近くにいます。子グマを見たらただちにその場から静かに距離を置いてください。',
              color: '#FEE2E2',
              border: '#EF4444',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: item.color, border: `1px solid ${item.border}`, borderRadius: 6, padding: '14px 18px' }}>
              <p style={{ fontWeight: 700, color: '#1A1A16', marginBottom: 6, fontSize: 14 }}>{item.title}</p>
              <p style={{ fontSize: 13, color: '#5A5A55', margin: 0, lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          子グマの成長段階と行動変化
        </h2>
        <p>
          子グマは生まれてから約2年かけて独立します。成長段階ごとに行動特性が変わり、それに伴うリスクも変化します。
        </p>
        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#143D1E', color: '#fff' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>段階</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>月齢・体重</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>特徴と人間へのリスク</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['新生児', '0〜3ヶ月 / 0.3〜2kg', '目・耳が未発達。母乳のみ。冬眠穴の外にはでない。このシーズン母グマは穴を離れにくい。'],
                ['幼獣期', '3〜12ヶ月 / 2〜15kg', '初めて外の世界へ。好奇心旺盛で人間に近づく可能性。母グマが極めて神経質。'],
                ['若獣期', '12〜24ヶ月 / 15〜40kg', '採食行動を学ぶ期間。母グマと行動範囲を共有。農地・集落付近での目撃も。'],
                ['独立期', '24〜30ヶ月', '母グマから追い払われる時期。単独行動開始。この時の若グマは不安定で予測不能。'],
              ].map(([stage, size, desc], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #EFEFED', background: i % 2 === 0 ? '#F8F8F6' : '#fff', verticalAlign: 'top' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600 }}>{stage}</td>
                  <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>{size}</td>
                  <td style={{ padding: '10px 14px', lineHeight: 1.6 }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          母子グマに遭遇したときの行動指針
        </h2>
        <div style={{ background: '#F0FDF4', border: '1px solid #143D1E', borderRadius: 8, padding: '20px 24px', marginTop: 16 }}>
          <p style={{ fontWeight: 700, color: '#143D1E', marginBottom: 12, fontSize: 15 }}>✅ 正しい対応</p>
          <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 14, color: '#1A1A16', lineHeight: 2.2 }}>
            <li>子グマを見たら<strong>絶対に近づかない</strong>（「かわいい」という感情を抑制する）</li>
            <li>静かに・ゆっくりと・クマに正面を向けたまま後退する</li>
            <li>走って逃げない（追いかけ本能を刺激する）</li>
            <li>大声を出す・急な動作をしない</li>
            <li>熊よけスプレーを取り出せる位置に準備</li>
            <li>十分な距離（最低50m以上）が確保できたら、速やかにその場を離れる</li>
          </ul>
        </div>
        <div style={{ background: '#FEE2E2', border: '1px solid #EF4444', borderRadius: 8, padding: '20px 24px', marginTop: 16 }}>
          <p style={{ fontWeight: 700, color: '#B91C1C', marginBottom: 12, fontSize: 15 }}>❌ してはいけないこと</p>
          <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 14, color: '#1A1A16', lineHeight: 2.2 }}>
            <li>子グマに近づく・触れる（母グマが必ず近くにいる）</li>
            <li>子グマを「迷子」だと思って助けようとする</li>
            <li>背中を向けて走る</li>
            <li>スマートフォンで撮影しながら接近する</li>
          </ul>
        </div>

        <div style={{ marginTop: 56, background: '#F0F7F2', border: '1px solid #C8DDD0', borderRadius: 8, padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 16 }}>関連記事</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/bear-hibernation', label: 'クマの冬眠メカニズム｜生理学・脂肪代謝・目覚めの危険性' },
              { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン｜季節ごとの行動変化とリスクカレンダー' },
              { href: '/guide/bear-learning-behavior', label: 'クマの学習能力と認知行動' },
              { href: '/guide/sansai-bear-safety', label: '山菜採り・野山作業中の熊対策' },
              { href: '/guide/hiking-bear-prevention', label: '登山・トレッキングでの熊対策' },
              { href: '/guide/tsuki-no-wa-kuma-vs-higuma', label: 'ツキノワグマとヒグマの違い' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ fontSize: 13, color: '#143D1E', textDecoration: 'none', padding: '5px 0', borderBottom: '1px solid rgba(20,61,30,0.1)', lineHeight: 1.5 }}>
                → {item.label}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
