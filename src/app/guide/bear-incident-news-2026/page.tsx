import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '2026年春のクマ出没動向｜急増地域と背景要因の解説 | KUMANUKE',
  description: '2026年春（3〜5月）のクマ出没動向を分析。冬眠明けの行動変化、急増が見られる地域と背景要因、今後の見通しを生態学的視点から解説。単なるニュース転載ではない編集記事。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-incident-news-2026' },
  openGraph: {
    title: '2026年春のクマ出没動向｜急増地域と背景要因の解説',
    description: '2026年春クマ出没の地域傾向・背景要因・今後の見通しを生態学的視点で解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-incident-news-2026',
  },
}

export default function BearIncidentNews2026Page() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#2D2D28', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 12, alignItems: 'center' }}>
            <span style={{ background: '#E07A30', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 3, letterSpacing: '0.1em' }}>NEWS</span>
            <span style={{ background: '#5A5A55', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, opacity: 0.85 }}>編集解説</span>
            <span style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: 10, padding: '2px 8px', borderRadius: 3 }}>2026年5月更新</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            2026年春のクマ出没動向｜<br />急増地域と背景要因の解説
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 12, lineHeight: 1.7 }}>
            本記事は個別ニュースの転載ではなく、KUMANUKEが収集するデータと生態学的知見をもとに2026年春の動向を解説する編集記事です。
          </p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#FFF8F4', borderLeft: '3px solid #E07A30', borderRadius: 4 }}>
          2026年春は全国各地でクマ出没の報告が相次いでいます。KUMANUKEのデータ（116,820件収録・2026年9月時点）では、2025年の急増に続き2026年も春先から活発な出没が続いています。単なる「今年もクマが出た」ではなく、この現象の構造的背景を理解することが重要です。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          2026年春の特徴：冬眠明けが早まった年
        </h2>
        <p>
          気象庁のデータによると、2025〜2026年冬は暖冬傾向が続き、東北・北陸・関東山間部で例年より少雪・高温の日が続きました。クマの冬眠期間は気温・積雪量に敏感であり、暖冬の年は冬眠終了が早まる傾向があります（<Link href="/guide/bear-hibernation" style={{ color: '#E07A30', fontWeight: 700 }}>クマの冬眠メカニズム</Link>）。
        </p>
        <p style={{ marginTop: 16 }}>
          2026年の出没報告は例年より2〜3週間早く増加し始めており、これが3〜4月の報告件数増加の主要因のひとつです。
        </p>

        <div style={{ background: '#FFF8F4', border: '1px solid #E07A30', borderRadius: 8, padding: '20px 24px', marginTop: 20, marginBottom: 24 }}>
          <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 12, fontSize: 15 }}>📊 2026年春（3〜5月）KUMANUKEデータ概況</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: 12 }}>
            {[
              { label: '2026年収録件数', value: '7,801件', note: '（5月末時点、収集継続中）' },
              { label: '前年同期比', value: '増加傾向', note: '（2025年同期との比較）' },
              { label: '報告多数エリア', value: '東北・北陸', note: '秋田・新潟・富山' },
              { label: '早期出没確認', value: '2〜3週間前倒し', note: '例年比' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#fff', border: '1px solid #FBBF24', borderRadius: 6, padding: '12px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#92400E', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontWeight: 800, color: '#E07A30', fontSize: 16 }}>{item.value}</div>
                <div style={{ fontSize: 10, color: '#9A9A95', marginTop: 2 }}>{item.note}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#92400E', marginTop: 10, margin: '10px 0 0' }}>※ KUMANUKEデータは自治体・報道の公開情報をベースとした推計値です。実際の出没総数とは異なります。</p>
        </div>

        <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 8, padding: '20px 24px', marginTop: 24, marginBottom: 8 }}>
          <p style={{ fontWeight: 700, color: '#B91C1C', marginBottom: 12, fontSize: 15 }}>⚠️ 2026年春：死亡事故の発生（5/25時点 3件）</p>
          <p style={{ fontSize: 13, color: '#7F1D1D', lineHeight: 1.7, marginBottom: 10 }}>
            環境省の速報（令和8年5月25日時点）によると、2026年はすでに3件の死亡事故が確認されています。いずれも東北での発生です。
          </p>
          <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 13, color: '#991B1B', lineHeight: 2 }}>
            <li>① 4月21日 岩手県紫波町（ツキノワグマ・1名死亡）</li>
            <li>② 5月5日 山形県酒田市（ツキノワグマ・1名死亡）</li>
            <li>③ 5月7日 岩手県八幡平市（ツキノワグマ・1名死亡）</li>
          </ul>
          <p style={{ fontSize: 11, color: '#B91C1C', marginTop: 10, margin: '10px 0 0' }}>
            ※ 出典：環境省「令和8年のクマによる死亡事故件数等について（令和8年5月25日時点）」
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          注目地域①：東北（秋田・岩手・山形）
        </h2>
        <p>
          東北は例年クマ出没の最多地域です。2026年春も冬眠明けの個体が林縁・農地周辺に現れる報告が続いています。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16, marginBottom: 16 }}>
          {[
            {
              title: '秋田県：里山近接農地への出没が継続',
              body: '農地・河川敷周辺への出没が4月上旬から報告。例年より10〜14日早い冬眠明けの個体が確認されている地域もある。山菜採りシーズンと重なるため入山者への注意喚起が各市町村で出ている。',
            },
            {
              title: '岩手県：内陸市町村での目撃増加',
              body: '奥羽山脈沿いの市町村で冬眠明け後の目撃が増加。農地への侵入よりも集落近接の林縁や道路横断が多く報告されている。',
            },
            {
              title: '山形県：2025年高水準からの継続',
              body: '2025年の出没急増（4,212件収録）が2026年も続く傾向。庄内・最上地方での目撃が多い。',
            },
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #DDDDD8', borderRadius: 6, padding: '14px 18px' }}>
              <p style={{ fontWeight: 700, color: '#2D2D28', marginBottom: 6, fontSize: 14 }}>▶ {item.title}</p>
              <p style={{ fontSize: 13, color: '#5A5A55', margin: 0, lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          注目地域②：北陸・甲信越（新潟・富山・長野）
        </h2>
        <p>
          北陸は2025年に新潟で大量のArcGISデータが整備されたことで詳細が明らかになった地域です。2026年も継続的な出没が報告されています。
        </p>
        <p style={{ marginTop: 16 }}>
          特に新潟県は山地から平野への地形的移行帯が多く、クマが水田・果樹園地帯まで進出するケースが増えています。越後山脈系のブナ林状況が今秋の出没規模を左右します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          背景要因：なぜ2026年も出没が多いのか
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          {[
            {
              title: '① 個体数の回復（本質的背景）',
              body: '1990年代の乱獲からの回復が続いており、特に東北・北陸の個体群は増加傾向。環境省の推定ではツキノワグマの生息数は1990年代の2〜3倍に回復した地域もある。',
              level: 'LONG_TERM',
            },
            {
              title: '② 里山の管理放棄（構造的背景）',
              body: '農業者・林業者の高齢化・離農により、かつて人の手が入っていた里山の緩衝帯が消滅。クマにとって安全に移動・採食できるエリアが拡大している。',
              level: 'STRUCTURAL',
            },
            {
              title: '③ 暖冬による冬眠短縮（今年特有）',
              body: '2025〜2026年冬の温暖化傾向が冬眠期間を短縮。春先の出没開始が例年より早まっている可能性が高い。',
              level: 'THIS_YEAR',
            },
            {
              title: '④ データ収集・報告体制の改善',
              body: 'ArcGIS等のGISシステムを活用した出没報告体制が整備された自治体では、従来見えなかった出没が可視化されている。件数増加の一部はデータ収集精度向上の反映でもある。',
              level: 'DATA',
            },
          ].map((item, i) => {
            const colors: Record<string, string> = { LONG_TERM: '#B91C1C', STRUCTURAL: '#92400E', THIS_YEAR: '#0C5C3E', DATA: '#1E40AF' }
            const labels: Record<string, string> = { LONG_TERM: '長期構造的', STRUCTURAL: '構造的', THIS_YEAR: '今年特有', DATA: 'データ要因' }
            return (
              <div key={i} style={{ border: '1px solid #DDDDD8', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ background: colors[item.level], color: '#fff', padding: '6px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</span>
                  <span style={{ fontSize: 10, opacity: 0.85 }}>{labels[item.level]}</span>
                </div>
                <div style={{ padding: '12px 16px', fontSize: 13, lineHeight: 1.7, color: '#5A5A55' }}>{item.body}</div>
              </div>
            )
          })}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          今後の見通し：2026年秋に向けて
        </h2>
        <p>
          春の出没が多い年が必ずしも秋も多いとは限りません。秋の出没規模を大きく左右するのは<strong>ドングリ（ブナ・ミズナラ・コナラ）の豊凶</strong>です。
        </p>
        <div style={{ background: '#F0FDF4', border: '1px solid #143D1E', borderRadius: 8, padding: '20px 24px', marginTop: 20 }}>
          <p style={{ fontWeight: 700, color: '#143D1E', marginBottom: 12, fontSize: 15 }}>2026年秋を見通すチェックポイント</p>
          <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 14, lineHeight: 2.1, color: '#1A1A16' }}>
            <li>各地の森林機関・研究機関による<strong>ブナ・ミズナラの結実予測</strong>（例年8月頃発表）</li>
            <li>環境省・各都道府県の<strong>夏〜初秋の出没動向</strong></li>
            <li>自治体からの<strong>早期警戒情報</strong>（出没急増エリアの告知）</li>
          </ul>
        </div>
        <p style={{ marginTop: 16 }}>
          KUMANUKEは随時データを更新しています。<Link href="/map" style={{ color: '#E07A30', fontWeight: 700 }}>出没マップ</Link>で最新の地域動向を確認してください。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          今すぐできる対策
        </h2>
        <p>出没情報の増加を受け、今すぐ実践できる予防行動を確認しましょう。</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12, marginTop: 16 }}>
          {[
            { icon: '🏠', title: '住宅地・集落', action: 'ゴミの屋内保管・果樹の適切な収穫・ペットフードの屋外放置禁止', link: '/guide/garbage-bear-prevention' },
            { icon: '🌲', title: '山菜採り・農作業', action: '出没情報確認・熊鈴携行・複数人行動・入山時間の調整', link: '/guide/sansai-bear-safety' },
            { icon: '🏕', title: 'キャンプ・登山', action: '食料密封・テントサイト周辺管理・野営地選定', link: '/guide/camping-bear-prevention' },
            { icon: '🌾', title: '農地', action: '収穫後の残渣除去・放置果樹の管理・電気柵の活用', link: '/guide/farm-bear-prevention' },
          ].map((item) => (
            <Link key={item.title} href={item.link} style={{ display: 'block', background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 8, padding: '16px', textDecoration: 'none' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#1A1A16', fontSize: 14, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: '#5A5A55', lineHeight: 1.6 }}>{item.action}</div>
              <div style={{ fontSize: 12, color: '#E07A30', fontWeight: 700, marginTop: 8 }}>詳細ガイドを見る →</div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 56, background: '#F2F2F0', border: '1px solid #DDDDD8', borderRadius: 8, padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#2D2D28', marginBottom: 16 }}>関連記事</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/japan-bear-damage-statistics', label: '日本のクマ被害統計2025-2026｜過去最多238人の実態と背景' },
              { href: '/guide/japan-regional-bear-data', label: '都道府県別クマ出没傾向分析｜116,000件のデータが語ること' },
              { href: '/guide/bear-hibernation', label: 'クマの冬眠メカニズム｜目覚めの危険性' },
              { href: '/guide/bear-diet-ecology', label: 'クマの食性と採食生態｜ドングリ凶作と出没の関係' },
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか' },
              { href: '/map', label: '全国熊出没マップ（リアルタイムデータ）' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ fontSize: 13, color: '#2D2D28', textDecoration: 'none', padding: '5px 0', borderBottom: '1px solid #EFEFED', lineHeight: 1.5 }}>
                → {item.label}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
