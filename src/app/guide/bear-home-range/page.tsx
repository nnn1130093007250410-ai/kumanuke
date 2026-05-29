import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマの行動圏・ホームレンジとは｜GPS追跡が明かす移動距離と出没パターン | KUMANUKE',
  description: 'クマは1頭でどれほどの範囲を動くのか。GPS首輪調査で明らかになったツキノワグマのホームレンジデータ、オス・メスの違い、季節による変化、地域差などを解説。出没予測と対策計画への応用も紹介。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-home-range' },
  openGraph: {
    title: 'クマの行動圏・ホームレンジとは｜GPS追跡が明かす移動距離と出没パターン | KUMANUKE',
    description: 'GPS追跡調査によるツキノワグマのホームレンジデータ。オス・メス・地域差・季節変動を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-home-range',
  },
}

export default function BearHomeRangePage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            野生動物行動学
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            クマの行動圏・ホームレンジとは<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>GPS追跡が明かす移動距離と出没パターン</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：野生動物行動学
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          「クマが来た」という情報を聞いたとき、多くの人は「どこから来たのか」「どこまで移動するのか」を疑問に思います。野生動物の行動研究において、特定の個体が日常的に利用する空間の広さを<strong>「行動圏（ホームレンジ）」</strong>と呼びます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          GPS首輪によるテレメトリー調査の普及により、ツキノワグマのホームレンジの実態が詳しくわかってきました。本稿では、国内外の調査データをもとに、クマの移動範囲・オスとメスの違い・季節変化・地域差を解説し、対策への応用について考察します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          1. ホームレンジとは何か
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          ホームレンジとは、一定期間内に動物が移動・採食・繁殖などの活動のために利用する空間の範囲を指します。縄張り（テリトリー）とは異なり、他個体と重複することもあります。一般にkm²（平方キロメートル）で表され、動物の体サイズ・食性・生息地の質によって大きく変動します。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 40 }}>
          クマのホームレンジ研究は、VHFラジオテレメトリー法（電波発信器）から始まり、現在ではGPS首輪を用いた高精度追跡が主流になっています。近年の機器では1日96回（15分間隔）の位置データ取得も可能となり、個体の詳細な移動パターンが明らかになってきています。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          2. ツキノワグマのホームレンジ：国内調査データ
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 20 }}>
          国内各地で行われたツキノワグマのGPS追跡調査から、以下のようなデータが報告されています。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>調査地域</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'right' }}>オス成獣（km²）</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'right' }}>メス成獣（km²）</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>特記事項</th>
              </tr>
            </thead>
            <tbody>
              {[
                { region: '栃木県・日光足尾山地', male: 256, female: 205, note: '山岳・森林地帯。食料豊富' },
                { region: '東京都・奥多摩山地', male: 46, female: 23, note: '比較的狭い山域。行動圏も小さい傾向' },
                { region: '長野県・北アルプス周辺', male: 93, female: 55, note: '標高変動が大きく季節移動が顕著' },
                { region: '石川県・白山周辺', male: 120, female: 60, note: '環境省・石川県の共同調査データ' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.region}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'right', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.male}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'right', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.female}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>※ 各調査の研究機関・測定手法・調査期間によって値が異なります。参考値としてご利用ください。</p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          データから明らかなのは、<strong>オスのホームレンジはメスより概ね2〜5倍広い</strong>こと、そして地域の地形・食料環境によって同一種でも大きな差があることです。食料が豊富で広大な森林地帯ではより広い範囲を使い、食料が乏しい環境では食料を求めてさらに移動距離が拡大する傾向があります。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          3. オスとメスの違い：なぜオスのホームレンジが広いか
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          オスがより広い行動圏を持つ理由のひとつは<strong>繁殖戦略</strong>にあります。オスは交尾の機会を最大化するために複数のメスの行動圏を内包する広い範囲を移動します。これが繁殖期（5〜7月）になるとより顕著になり、メスを探して普段より長距離を移動する個体が観察されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          メスは子育て中（春〜夏）に子グマを抱えた状態では行動圏が縮小します。安全な育児場所・子グマが登れる大木・外敵から身を隠せる地形など、子育てに適した環境を中心に比較的狭い範囲を利用する傾向があります。逆に、授乳期を終えた秋の過食期には行動圏が拡大する事例も報告されています。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          4. 季節による行動圏の変化
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>季節・時期</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>行動圏の変化</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>出没パターンへの影響</th>
              </tr>
            </thead>
            <tbody>
              {[
                { season: '春（3〜4月）冬眠明け', change: '拡大する傾向。空腹で広範囲を移動', pattern: '山菜・タケノコの採食で低山帯・里山に降りてくる' },
                { season: '春〜夏（5〜6月）繁殖期', change: 'オスが大幅に拡大。数十km移動も', pattern: '普段来ない地域に出没することがある' },
                { season: '夏（7〜8月）', change: '比較的安定。食料のある場所を定期的に巡回', pattern: '登山道・高山帯への出没が増える' },
                { season: '秋（9〜11月）過食期', change: 'さらに拡大する個体も。食料を求めて行動', pattern: '農地・果樹園・里山への侵入が急増' },
                { season: '初冬（11〜12月）', change: '冬眠場所を探して移動後に縮小', pattern: '冬眠直前まで里山周辺に残る個体もいる' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6', whiteSpace: 'nowrap' }}>{r.season}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.change}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.pattern}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          5. ヒグマのホームレンジ：ツキノワグマとの比較
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          北海道のヒグマはツキノワグマより大型で、ホームレンジも一般的に大きい傾向があります。国内の調査データでは、道東のヒグマでオス成獣が500〜1000km²以上に達する事例も報告されており、北米のグリズリーでは1個体の年間移動距離が数百kmに達する事例も記録されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          ヒグマのホームレンジが広いということは、知床や大雪山系など広大な自然環境が必要なことを示すと同時に、農業地帯と生息地が隣接する道東・道北地域では日常的に農地との境界が問題になることを意味します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          6. ホームレンジの知識を対策に活かす
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマのホームレンジを理解することは、対策の「範囲設計」に役立ちます。
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 48 }}>
          {[
            '一頭のクマが数十〜数百km²を移動することを前提に、「点」ではなく「面」での対策を設計する必要がある',
            '出没情報が複数地点で出ている場合、同一個体が移動している可能性がある。行政・地域間の情報共有が重要',
            '繁殖期（春〜夏）はオスが広範囲を移動するため、普段出没しない地域でも警戒が必要',
            '「去年来なかったから今年も来ない」とは言えない。食料環境の変化や繁殖期の移動で突然出没することがある',
            '誘引物（果実・生ごみ）の管理は、一件の対策効果が近隣地域全体のリスクに影響する',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 15, lineHeight: 1.85, color: '#2A2A26', marginBottom: 8 }}>{item}</li>
          ))}
        </ul>

        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>広い行動圏への対応：エリア散布型の活用</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            クマが広い範囲を移動することを考えると、特定の農地・ゴミ置き場・キャンプサイトなど「来てほしくない場所」への事前の予防的対策が重要です。KUMANUKEは植物由来成分を用いたエリア散布型の忌避スプレーで、行動範囲が広いクマに対して、特定エリアへの接近を抑制する目的での使用を想定しています。
          </p>
          <Link href="/products/kumanuke" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン｜季節ごとの行動変化と出没リスクカレンダー' },
              { href: '/guide/bear-learning-behavior', label: 'クマの学習能力と認知行動｜なぜ同じ場所に繰り返し来るのか' },
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
