import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '山菜採り・野山作業中の熊対策｜春の最危険期を安全に | KUMANUKE',
  description: '山菜採りはクマ事故の最多場面のひとつ。冬眠明けクマとの行動圏重複・沢音による熊鈴の無効化・身を隠す植生。統計・チェックリスト・遭遇時行動まで完全ガイド。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/sansai-bear-safety' },
  openGraph: {
    title: '山菜採り・野山作業中の熊対策｜春の最危険期を安全に',
    description: '山菜採り中のクマ事故統計・危険環境の特徴・入山前チェックリスト・遭遇時行動を完全解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/sansai-bear-safety',
  },
}

export default function SansaiBearSafetyPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 12 }}>
            <span style={{ background: '#1F5C2E', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 3, letterSpacing: '0.1em' }}>GUIDE</span>
            <span style={{ background: '#1F5C2E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, opacity: 0.85 }}>農業・山仕事</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            山菜採り・野山作業中の熊対策｜<br />春の最危険期を安全に
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2026年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F0FDF4', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          山菜採りはクマ被害が発生する場面の中で最も件数が多い活動のひとつです。冬眠明けの食料探索期と山菜の最盛期が重なる4〜6月は「最危険期」です。沢沿いの水音・膝丈以上の草むら・集中して下を向く作業姿勢という環境的条件が、クマとの「近距離突然遭遇」を生みやすくします。本記事では山菜採り特有のリスクと具体的な安全行動を解説します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          なぜ山菜採りが危険なのか
        </h2>
        <p>
          クマ被害統計（環境省・各都道府県）を分析すると、<strong>農業・山菜採り等の野山作業中</strong>が人身事故の中で最も多い場面のひとつです。その理由は単純な「山にいるから」ではなく、以下の複合的な条件が重なるためです。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20, marginBottom: 24 }}>
          {[
            {
              icon: '🗓',
              title: '時期の重複：冬眠明けクマ × 山菜シーズン',
              body: 'コシアブラ・タラノメ・ワラビなど人気山菜の最盛期は4月下旬〜6月。この時期はクマの冬眠明け後の食料探索期と完全に重なります。空腹・興奮状態の冬眠明けクマが最も活発に動き回る時期です。',
            },
            {
              icon: '👁',
              title: '場所の重複：クマが好む採食地 = 山菜の群生地',
              body: 'コシアブラ・タラノメ・ウルイなどの山菜は、日当たりの良い沢沿い・林縁・伐採地に多く生えます。これはクマが春に採食するフキノトウ・オオバキャビなどと完全に同じ場所です。',
            },
            {
              icon: '🔇',
              title: '環境的ハンディ：熊鈴が機能しにくい環境',
              body: '沢の水音・風の音・草むらの摩擦音が重なり、熊鈴の音が届かない状況が生まれます。また草丈1m以上の植生では互いの視認性が極端に低下します。',
            },
            {
              icon: '🧍',
              title: '作業姿勢：注意が下を向く',
              body: '山菜採りの姿勢は必然的に下を向きます。前方・周囲の確認頻度が登山より格段に低くなります。集中しているため音への反応も遅れます。',
            },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, border: '1px solid #DDDDD8', borderRadius: 8, padding: '16px 20px', background: i === 0 ? '#FFF7F0' : '#F8F8F6' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ fontWeight: 700, color: '#143D1E', marginBottom: 6, fontSize: 14 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: '#5A5A55', margin: 0, lineHeight: 1.7 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          特に危険な植生・地形
        </h2>
        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#143D1E', color: '#fff' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>条件</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>なぜ危険か</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>対策</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['沢沿いの草むら（フキ・オオバキャビ）', '水音でクマの接近音が消え、草丈で視認性が低下。互いに存在に気づかず「至近遭遇」が起きやすい。', '数歩ごとに立ち止まって周囲を確認。声を出す。'],
                ['伐採地・林縁', 'クマが好む日当たり良好地。タラノメ・コシアブラが多い場所はクマも食べに来ている。', '入る前に周辺で声を出す。出没情報を事前確認。'],
                ['急斜面の下', 'クマが上方から急に現れる。しかも人間は斜面を登っているため逃げにくい。', '急斜面の上を確認してから移動。上方向への注意を怠らない。'],
                ['倒木・岩陰の近辺', '休憩中のクマを突然刺激しやすい場所。特に倒木の裏は死角。', '倒木に接近する際は必ず声を出す。'],
              ].map(([condition, reason, measure], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #EFEFED', background: i % 2 === 0 ? '#F8F8F6' : '#fff', verticalAlign: 'top' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600 }}>{condition}</td>
                  <td style={{ padding: '10px 14px', lineHeight: 1.6 }}>{reason}</td>
                  <td style={{ padding: '10px 14px', lineHeight: 1.6, color: '#143D1E', fontWeight: 500 }}>{measure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          入山前チェックリスト
        </h2>
        <div style={{ background: '#F0FDF4', border: '1px solid #143D1E', borderRadius: 8, padding: '20px 24px', marginTop: 16 }}>
          <p style={{ fontWeight: 700, color: '#143D1E', marginBottom: 14, fontSize: 15 }}>✅ 入山前に必ず確認・準備</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
            {[
              ['情報収集', '地域の最新クマ出没情報を確認（市町村HP・農業委員会・猟友会）'],
              ['行先の共有', '行先・戻り時刻を家族・知人に必ず伝える'],
              ['複数人行動', '可能な限り一人での入山を避ける'],
              ['服装', '派手な色（オレンジ・黄色）で視認性を上げる。迷彩色は避ける'],
              ['装備：熊鈴', '複数個・高音タイプを装着。但し沢では「声」を優先'],
              ['装備：熊よけ', '忌避スプレーを取り出せる位置に携行'],
              ['携帯電話', 'GPSをONにして電波確認。充電満タンで'],
              ['入山時間', '早朝（日の出直後）・夕方の入山は避ける（クマが最も活発）'],
            ].map(([category, content], i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: i < 7 ? '1px solid #D1FAE5' : 'none' }}>
                <span style={{ background: '#143D1E', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3, flexShrink: 0, height: 'fit-content', marginTop: 2 }}>{category}</span>
                <span style={{ fontSize: 13, lineHeight: 1.6 }}>{content}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          作業中の安全習慣
        </h2>
        <ul style={{ paddingLeft: 20, lineHeight: 2.2, marginTop: 12 }}>
          <li><strong>2〜3分ごとに立ち上がって周囲を確認する</strong>（下を向き続けない）</li>
          <li>移動する際は必ず<strong>声を出す・手を叩く</strong>（「よーし」「ここだー」など）</li>
          <li>草むらに入る前に<strong>棒で叩くか声で存在を知らせる</strong></li>
          <li>沢沿いでは特に<strong>風上から近づく</strong>（クマに先に気づかせる）</li>
          <li>採取した山菜を<strong>袋に入れる</strong>（食料の匂いが出続けないように）</li>
          <li>クマの痕跡（爪痕・糞・踏み跡・食痕）を発見したら<strong>即退出</strong></li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          クマの痕跡の見分け方
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12, marginTop: 16 }}>
          {[
            { name: '爪痕', desc: '木の幹や地面についた深い傷。スギの皮剥ぎも要注意（春の食痕）', danger: '高' },
            { name: '糞', desc: '人間の拳大〜大きめ。果実の種・草の繊維を含む。新鮮なものは特に危険', danger: '高' },
            { name: '食跡', desc: 'タラノメ・コシアブラが根元から折られている。ハチの巣が破壊されている', danger: '中' },
            { name: '足跡', desc: '後足25〜35cm（ツキノワグマ）・35cm以上（ヒグマ）。前足は小さい', danger: '中' },
          ].map((item) => (
            <div key={item.name} style={{ border: '1px solid #DDDDD8', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ background: item.danger === '高' ? '#EF4444' : '#F59E0B', color: '#fff', padding: '6px 12px', fontSize: 12, fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                <span>🐾 {item.name}</span>
                <span>危険度：{item.danger}</span>
              </div>
              <div style={{ padding: '10px 12px', fontSize: 12, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#FEE2E2', border: '1px solid #EF4444', borderRadius: 6, padding: '12px 16px', marginTop: 12, fontSize: 13 }}>
          <strong>⚠️ 重要：</strong>痕跡を発見したら<strong>その場から静かに引き返してください</strong>。写真撮影のために留まることは危険です。
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          遭遇してしまったときの行動
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 16, marginTop: 16 }}>
          <div style={{ background: '#F0FDF4', border: '1px solid #0C5C3E', borderRadius: 8, padding: '18px' }}>
            <p style={{ fontWeight: 700, color: '#0C5C3E', marginBottom: 10, fontSize: 14 }}>✅ 遠距離発見（30m以上）</p>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, lineHeight: 1.9 }}>
              <li>目を合わせすぎない</li>
              <li>クマに正面を向けたまま、ゆっくり後退</li>
              <li>静かに話しかける声のトーンで「大きな声」を出す</li>
              <li>来た道を戻り、その地点を避ける</li>
            </ul>
          </div>
          <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 8, padding: '18px' }}>
            <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 10, fontSize: 14 }}>⚠️ 近距離発見（10〜30m）</p>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, lineHeight: 1.9 }}>
              <li>急な動作・大声を出さない</li>
              <li>熊よけスプレーを手に取る</li>
              <li>ゆっくり後退しながら距離を作る</li>
              <li>視線を完全には外さない</li>
            </ul>
          </div>
          <div style={{ background: '#FEE2E2', border: '1px solid #EF4444', borderRadius: 8, padding: '18px' }}>
            <p style={{ fontWeight: 700, color: '#B91C1C', marginBottom: 10, fontSize: 14 }}>🚨 突進・攻撃時</p>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, lineHeight: 1.9 }}>
              <li>熊よけスプレーを噴射（クマの顔面方向に）</li>
              <li>ウェアブルの場合3〜5m手前から噴射開始</li>
              <li>噴射中はできれば後退を継続</li>
              <li>倒れても防御姿勢を維持</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 56, background: '#F0F7F2', border: '1px solid #C8DDD0', borderRadius: 8, padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 16 }}>関連記事</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/bear-hibernation', label: 'クマの冬眠メカニズム｜目覚め直後が最も危険な理由' },
              { href: '/guide/bear-reproduction-cubs', label: 'クマの繁殖と母子行動｜なぜ母グマは最も危険なのか' },
              { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン｜季節ごとのリスクカレンダー' },
              { href: '/guide/hiking-bear-prevention', label: '登山・トレッキングでの熊対策' },
              { href: '/guide/bear-bell-effectiveness', label: '熊鈴の効果と限界' },
              { href: '/guide/how-to-choose-bear-repellent', label: '熊よけスプレーの種類と選び方' },
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
