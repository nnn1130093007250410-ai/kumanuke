import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '都道府県別クマ出没傾向分析｜116,000件のデータが語ること | KUMANUKE',
  description: 'KUMANUKEが独自収集した116,000件超の出没データから見えてくる地域別傾向を解説。なぜ秋田・新潟が多いのか、急増地域の背景、北海道と本州の違いを多角的に分析。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/japan-regional-bear-data' },
  openGraph: {
    title: '都道府県別クマ出没傾向分析｜116,000件のデータが語ること',
    description: '独自収集116,000件超のデータで読み解く地域別傾向。秋田・新潟トップの背景・急増地域・北海道vs本州の違い。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/japan-regional-bear-data',
  },
}

export default function JapanRegionalBearDataPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#1E40AF', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 12 }}>
            <span style={{ background: '#1E40AF', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 3, letterSpacing: '0.1em', border: '1px solid rgba(255,255,255,0.3)' }}>DATA</span>
            <span style={{ background: '#1E40AF', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, opacity: 0.85, border: '1px solid rgba(255,255,255,0.25)' }}>地域分析</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            都道府県別クマ出没傾向分析｜<br />116,000件のデータが語ること
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2026年5月 / データ出典：KUMANUKE独自収集</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: 8, padding: '16px 20px', marginBottom: 32, fontSize: 13, color: '#1E3A5F' }}>
          <p style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>📊 本記事のデータについて</p>
          <p style={{ margin: 0, lineHeight: 1.7 }}>
            本記事はKUMANUKEが全国の自治体オープンデータ・ArcGIS公開データ・報道情報等から独自に収集・統合した<strong>116,542件（2026年8月時点）</strong>の出没記録を分析したものです。自治体ごとに収集体制が異なるため、件数は「実際の出没数」ではなく「報告・捕捉された件数」を反映しています。過小報告の可能性を念頭に置いてください。
            <br /><Link href="/map" style={{ color: '#1E3A5F', fontWeight: 700 }}>→ 全データをマップで確認する</Link>
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E40AF', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          全国ランキング Top10
        </h2>
        <p>
          KUMANUKEデータベースにおける都道府県別件数（全期間合算）のトップ10です。
        </p>

        <div style={{ marginTop: 16, border: '1px solid #DBEAFE', borderRadius: 8, overflow: 'hidden' }}>
          {[
            { rank: 1, pref: '秋田県', count: '21,483', highlight: true, note: 'クマダス・警察ArcGIS・報道データ統合' },
            { rank: 2, pref: '新潟県', count: '17,274', highlight: false, note: 'ArcGIS全市町村・Survey123・CKAN統合' },
            { rank: 4, pref: '京都府', count: '9,958', highlight: false, note: '上智大学予測マップ含む' },
            { rank: 3, pref: '宮城県', count: '11,964', highlight: false, note: 'Google Maps KML + ArcGIS' },
            { rank: 5, pref: '福井県', count: '9,429', highlight: false, note: '福井クマ情報サイト全期間（2004〜2026）' },
            { rank: 6, pref: '青森県', count: '8,812', highlight: false, note: 'Google Maps KML全期間' },
            { rank: 7, pref: '岐阜県', count: '6,931', highlight: false, note: 'ArcGIS全年（2018〜2026）' },
            { rank: 8, pref: '富山県', count: '4,687', highlight: false, note: 'ArcGIS全市町村' },
            { rank: 9, pref: '山形県', count: '4,212', highlight: false, note: 'Google Maps KML' },
            { rank: 10, pref: '福島県', count: '3,549', highlight: false, note: '県警察Excel + ArcGIS' },
          ].map((item) => (
            <div key={item.rank} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 20px',
              borderBottom: '1px solid #DBEAFE',
              background: item.highlight ? '#EFF6FF' : '#fff',
              position: 'relative', overflow: 'hidden',
            }}>
              <span style={{
                fontSize: item.rank <= 3 ? 16 : 13,
                fontWeight: 800,
                color: item.rank === 1 ? '#E07A30' : item.rank === 2 ? '#9CA3AF' : item.rank === 3 ? '#92400E' : '#9A9A95',
                minWidth: 24, textAlign: 'center',
              }}>{item.rank}</span>
              <span style={{ fontWeight: 700, fontSize: 15, flex: 1 }}>{item.pref}</span>
              <span style={{ fontWeight: 800, fontSize: 17, color: '#1E40AF', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                {item.count}<span style={{ fontSize: 12, fontWeight: 400, color: '#9A9A95', marginLeft: 3 }}>件</span>
              </span>
              <span style={{ fontSize: 10, color: '#9A9A95', display: 'none' }} className="note-cell">{item.note}</span>
            </div>
          ))}
          <div style={{ padding: '8px 20px', background: '#F8FAFF', fontSize: 11, color: '#6B7280' }}>
            ※ 件数はデータ収集源・収集期間により異なります。実際の出没数とは異なる場合があります。
          </div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E40AF', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          なぜ秋田県がトップなのか
        </h2>
        <p>
          秋田県の出没件数の多さには複数の要因が絡み合っています。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          {[
            {
              factor: '① 森林面積と生息密度',
              content: '秋田県の森林率は約71%と全国有数の高水準。奥羽山脈・太平山地系を中心としたブナ・ミズナラ林がツキノワグマの良質な生息地を形成。推定生息数は全国トップクラス。',
            },
            {
              factor: '② 系統的なデータ収集体制',
              content: '秋田県は「クマダス」システムにより市町村レベルの詳細な出没報告を一元管理。他県より収集率が高く、件数の多さはデータ整備の成熟度も反映している。',
            },
            {
              factor: '③ 里山の急速な変化',
              content: '農村人口の減少・耕作放棄地の増加・果樹園の管理不足により、クマが採食しやすい環境が拡大。山との境界が曖昧になっている地域が多い。',
            },
            {
              factor: '④ ドングリ凶作との連動性',
              content: '奥羽山脈系はブナ・ミズナラの豊凶サイクルが激しく、凶作年には秋田全域で出没が急増するパターンが繰り返されている。',
            },
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #DBEAFE', borderRadius: 6, padding: '14px 18px' }}>
              <p style={{ fontWeight: 700, color: '#1E40AF', marginBottom: 6, fontSize: 14 }}>{item.factor}</p>
              <p style={{ fontSize: 13, color: '#5A5A55', margin: 0, lineHeight: 1.7 }}>{item.content}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E40AF', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          地域タイプ別パターン分析
        </h2>
        <p>
          日本の熊出没は地域の地形・文化・データ収集体制によって異なる「タイプ」を示します。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 16, marginTop: 20 }}>
          {[
            {
              type: '山岳ブナ帯型',
              prefs: '秋田・新潟・山形・福島・岐阜・富山',
              feature: 'ブナ・ミズナラ林の豊凶サイクルが出没を左右。凶作年に大量出没。農業被害よりも山岳地帯での目撃が多い。',
              color: '#0C5C3E',
            },
            {
              type: '里山人里接触型',
              prefs: '福井・京都・宮城・青森',
              feature: '集落隣接エリアへの出没が特徴的。住宅地・学校区での目撃が多く、都市近接ゾーンとの境界問題が顕著。',
              color: '#1F5C2E',
            },
            {
              type: '北海道ヒグマ型',
              prefs: '北海道',
              feature: 'ヒグマは行動圏が広く、1頭あたりの行動範囲がツキノワグマの数倍。特に春（冬眠明け）と鮭遡上期の秋に活発。人身事故の致死率が本州より高い。',
              color: '#B91C1C',
            },
            {
              type: '低密度分散型',
              prefs: '広島・兵庫・神奈川・千葉',
              feature: '生息密度は低いが、孤立した個体による突発的出没。「まさか都市部近郊に」というケースが多く、住民の警戒意識が低い地域に出没する。',
              color: '#7C3AED',
            },
          ].map((item) => (
            <div key={item.type} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ background: item.color, color: '#fff', padding: '10px 16px' }}>
                <p style={{ fontWeight: 800, fontSize: 14, marginBottom: 2 }}>{item.type}</p>
                <p style={{ fontSize: 11, opacity: 0.8, margin: 0 }}>{item.prefs}</p>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, padding: '12px 16px', margin: 0 }}>{item.feature}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E40AF', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          データが少ない地域の解釈
        </h2>
        <p>
          KUMANUKEデータベースでは、兵庫・広島・神奈川などの件数が極端に少ない地域があります。これは「クマが少ない」ことを必ずしも意味しません。
        </p>
        <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 8, padding: '20px 24px', marginTop: 16, marginBottom: 20 }}>
          <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 10, fontSize: 14 }}>⚠️ データが少ない理由</p>
          <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 14, lineHeight: 2, color: '#1A1A16' }}>
            <li>公開オープンデータが整備されていない都道府県</li>
            <li>ArcGIS等のGISシステムを使用していない市町村</li>
            <li>報告収集を紙・電話で行っており電子化されていない</li>
            <li>個人情報保護等の理由で位置情報を非公開とする自治体</li>
          </ul>
          <p style={{ fontSize: 12, color: '#92400E', marginTop: 10, margin: '10px 0 0' }}>
            ＊ KUMANUKEは今後もデータ収集範囲を拡大予定です。最新データは<Link href="/map" style={{ color: '#92400E' }}>出没マップ</Link>で確認できます。
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E40AF', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          2025年の急増地域と背景
        </h2>
        <p>
          KUMANUKEデータでは2025年に41,134件と全期間最多の記録があります。主な急増地域と背景を整理します。
        </p>
        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#1E40AF', color: '#fff' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>地域</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>2025年の状況</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>背景要因</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['秋田・東北全般', '2024年対比で出没増加傾向', 'ドングリ豊凶の周期的変動・個体数回復'],
                ['新潟県', '山間部・平野部問わず出没増加', '奥山から人里への移行が進む里山構造の変化'],
                ['京都・近畿', '丹波・南山城など里山地域での出没増', '竹林の拡大・集落の過疎化・農地管理の低下'],
                ['北海道（道央）', '農地・住宅地への出没継続', '個体数増加と生息域の拡大'],
              ].map(([region, situation, background], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #DBEAFE', background: i % 2 === 0 ? '#F8FAFF' : '#fff', verticalAlign: 'top' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600 }}>{region}</td>
                  <td style={{ padding: '10px 14px', lineHeight: 1.6 }}>{situation}</td>
                  <td style={{ padding: '10px 14px', lineHeight: 1.6 }}>{background}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 32, background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: 8, padding: '16px 20px', fontSize: 13 }}>
          <p style={{ fontWeight: 700, color: '#1E3A5F', marginBottom: 8, fontSize: 14 }}>🗺 地図で詳細を確認する</p>
          <p style={{ margin: 0, color: '#1A1A16' }}>
            都道府県別・年別の出没データはKUMANUKEマップでインタラクティブに確認できます。年フィルター（2023/2024/2025/2026）・都道府県別ページも利用可能です。
          </p>
          <Link href="/map" style={{ display: 'inline-block', marginTop: 12, background: '#1E3A5F', color: '#fff', fontWeight: 700, fontSize: 13, padding: '8px 20px', borderRadius: 4, textDecoration: 'none' }}>
            出没マップを開く →
          </Link>
        </div>

        <div style={{ marginTop: 56, background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: 8, padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E3A5F', marginBottom: 16 }}>関連記事・データ</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/japan-bear-damage-statistics', label: '日本のクマ被害統計2025-2026｜過去最多238人の実態と背景' },
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか' },
              { href: '/guide/satoyama-bear-human-coexistence', label: '里山と人獣共存問題' },
              { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン' },
              { href: '/guide/bear-diet-ecology', label: 'クマの食性と採食生態' },
              { href: '/map', label: '全国熊出没マップ（データビジュアライゼーション）' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ fontSize: 13, color: '#1E3A5F', textDecoration: 'none', padding: '5px 0', borderBottom: '1px solid rgba(30,64,175,0.1)', lineHeight: 1.5 }}>
                → {item.label}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
