import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ツキノワグマとヒグマの違い｜分布・体格・生態・危険性を徹底比較 | KUMANUKE',
  description: '日本に生息する2種のクマ、ツキノワグマ（本州・四国）とヒグマ（北海道）の違いを徹底比較。体格・食性・習性・危険性・出没傾向など、対策に役立つ知識をわかりやすく解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/tsuki-no-wa-kuma-vs-higuma' },
  openGraph: {
    title: 'ツキノワグマとヒグマの違い｜分布・体格・生態・危険性を徹底比較 | KUMANUKE',
    description: 'ツキノワグマ（本州・四国）とヒグマ（北海道）の違いを体格・食性・危険性など多角的に比較解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/tsuki-no-wa-kuma-vs-higuma',
  },
}

export default function TsukinowaKumaVsHigumaPage() {
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
            ツキノワグマとヒグマの違い<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>分布・体格・生態・危険性を徹底比較</span>
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
          日本に生息するクマは2種類です。本州・四国に生息する<strong>ツキノワグマ（Ursus thibetanus）</strong>と、北海道にのみ生息する<strong>ヒグマ（Ursus arctos）</strong>。同じ「クマ」と呼ばれますが、体格・生態・食性・危険性など多くの点で異なる特徴を持っています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          クマ対策を正しく行うためには、自分が生活・行動する地域にどちらのクマが生息するかを理解し、それぞれの特性に合った対策を講じることが重要です。本稿では、ツキノワグマとヒグマの主要な違いを体系的に解説します。
        </p>

        {/* 比較表 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. 基本比較：一目でわかる2種の違い
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>項目</th>
                <th style={{ background: '#1F5C2E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>ツキノワグマ</th>
                <th style={{ background: '#0C4A2A', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>ヒグマ</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: '分布域', tsuki: '本州・四国（四国は絶滅危惧）', higu: '北海道のみ' },
                { item: '体長（成獣）', tsuki: '約1.2〜1.5m', higu: '約1.7〜2.3m' },
                { item: '体重（成獣オス）', tsuki: '約60〜100kg', higu: '約150〜250kg（大型個体は400kg超も）' },
                { item: '毛色', tsuki: '黒色（稀に茶褐色）', higu: '茶褐色〜黒褐色（個体差あり）' },
                { item: '外見上の特徴', tsuki: '胸に白〜淡黄色の三日月模様', higu: '肩に盛り上がった筋肉（肩こぶ）' },
                { item: '主な食性', tsuki: '草食性が強い（ドングリ・果実・草本類）', higu: '雑食（植物・サケ・昆虫・動物）' },
                { item: '冬眠', tsuki: 'あり（12月〜3月頃）', higu: 'あり（11月〜4月頃）' },
                { item: '主な活動時間', tsuki: '夜明けと夕暮れ、夜間（薄明薄暮型）', higu: '薄明薄暮型だが日中も活動する個体あり' },
                { item: '人身被害の傾向', tsuki: '逃げるケースが多いが驚いた際・母グマは攻撃的', higu: '体格差が大きく、攻撃時の被害が深刻になりやすい' },
                { item: '推定個体数（日本）', tsuki: '約2〜3万頭（環境省推計）', higu: '約1万頭（北海道環境省推計）' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: '#F8F8F6' }}>{r.item}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F0F9F2' }}>{r.tsuki}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#FFF8F5' : '#FFF2EC' }}>{r.higu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 2 分布 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          2. 分布域と生息環境
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          <strong>ツキノワグマ</strong>は本州（北海道を除く）と四国に生息しています。かつては九州にも生息していましたが、20世紀中頃に絶滅したとされています。四国でも現在は絶滅危惧IA類（環境省レッドリスト）に指定されており、生息確認数が非常に少ない状況です。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          主な生息環境は落葉広葉樹林帯で、ブナ・ナラ・クリなど堅果類の豊富な森林を好みます。繁殖期や採食期には山地から里山・農村部へ下りてくることがあります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          <strong>ヒグマ</strong>は北海道のみに生息する日本最大の陸上動物です。道東（知床・根釧地区）に多く生息し、亜高山帯から海岸線近くまで幅広い環境に適応しています。アリューシャン列島からユーラシア大陸・北米大陸に広く分布するUrsus arctosの日本亜種とされています。
        </p>

        {/* Section 3 食性 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          3. 食性の違いが行動に与える影響
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          両種の食性の違いは、それぞれの行動パターンと人との関わり方に大きく影響しています。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '20px' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 12 }}>ツキノワグマの主な食物</p>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {['ブナ・ナラ・クリなどの堅果類（特に秋）', '果実（リンゴ・柿・ブルーベリーなど）', 'タケノコ・草本類（春〜夏）', '昆虫・幼虫・蜂蜜', '動物性食物は副次的'].map((f, i) => (
                <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>{f}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#FFF8F0', border: '1px solid #FED7AA', borderRadius: 8, padding: '20px' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#C05A1A', marginBottom: 12 }}>ヒグマの主な食物</p>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {['植物性（草本・球根・根茎・果実）が中心', '秋はサケ・マス（ヒグマ独自の重要な食料）', '昆虫・小型哺乳類', '死骸（腐肉）', 'まれに大型哺乳類を捕食する場合も'].map((f, i) => (
                <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          ツキノワグマが農地に接近する主な動機は「果樹・農作物・生ごみ」などの食料誘引であることが多く、これらの管理が対策の基本となります。ヒグマも農作物被害は起こしますが、サケ類が豊富な時期は河川付近に集まる傾向があり、知床などの観光地ではサケ遡上期の遭遇リスクが高まります。
        </p>

        {/* Section 4 危険性 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          4. 危険性と攻撃パターン
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          両種とも基本的には人を避ける傾向がありますが、特定の状況では攻撃に転じることがあります。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {[
            {
              title: 'ツキノワグマが攻撃的になる状況',
              items: [
                '子グマを連れた母グマが子を守ろうとする場合（防衛攻撃）',
                '驚いた際・逃げ場がない状況での威嚇・攻撃',
                '人里に慣れた個体が食料をめぐって接近する場合',
                '傷ついた・病気の個体（通常より警戒心が低い）',
              ],
              color: '#1F5C2E',
            },
            {
              title: 'ヒグマが攻撃的になる状況',
              items: [
                '子グマを持つ母グマの防衛行動（ツキノワグマと同様だが規模が大きい）',
                '死骸・食料を守る際の「食物防衛」行動',
                '至近距離での突然の遭遇',
                '捕食を目的とした攻撃（ごく稀だが記録あり）',
              ],
              color: '#C05A1A',
            },
          ].map((section, si) => (
            <div key={si} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderLeft: `4px solid ${section.color}`, borderRadius: 6, padding: '16px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: section.color, marginBottom: 10 }}>{section.title}</p>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {section.items.map((item, i) => (
                  <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          ヒグマは体格が大きく筋肉量も多いため、攻撃を受けた場合の被害がより深刻になりやすい傾向があります。北海道では農作業中・登山中・釣り中の遭遇による重篤な被害事例が毎年報告されています。
        </p>

        {/* Section 5 対策の違い */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          5. 地域別の対策の違い
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          基本的な対策（誘引物の除去・複数人での行動・出没情報の確認など）は両種に共通ですが、生息地の違いにより重点を置くべき対策が異なります。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>対策項目</th>
                <th style={{ background: '#1F5C2E', color: '#fff', padding: '10px 14px', textAlign: 'center' }}>本州・四国<br />（ツキノワグマ）</th>
                <th style={{ background: '#0C4A2A', color: '#fff', padding: '10px 14px', textAlign: 'center' }}>北海道<br />（ヒグマ）</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: '熊鈴・声かけ', tsuki: '有効（推奨）', higu: '有効（推奨）' },
                { item: '熊スプレー携行', tsuki: '推奨（特に登山時）', higu: '強く推奨（必携とされる）' },
                { item: '果樹・農作物管理', tsuki: '特に重要', higu: '重要' },
                { item: 'ゴミ管理', tsuki: '重要', higu: '重要' },
                { item: '電気柵の設置', tsuki: '農地・果樹園に有効', higu: 'キャンプ場・農地に有効' },
                { item: '忌避スプレー散布', tsuki: 'エリア対策として有効', higu: 'エリア対策として活用可' },
                { item: 'デッドアニマル管理', tsuki: '副次的', higu: '重要（食物防衛行動の誘因）' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: '#F8F8F6' }}>{r.item}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'center', background: i % 2 === 0 ? '#fff' : '#F0F9F2' }}>{r.tsuki}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'center', background: i % 2 === 0 ? '#FFF8F5' : '#FFF2EC' }}>{r.higu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* KUMANUKE CTA */}
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>エリア散布型忌避スプレーについて</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            ツキノワグマ・ヒグマどちらの生息地でも、農地・ゴミ置き場・キャンプサイト周辺などへの事前散布による接近抑制対策が活用されています。KUMANUKEは植物由来成分を用いたエリア散布型の製品です。
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
              { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン｜季節ごとの行動と出没リスク' },
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説' },
              { href: '/guide/japan-bear-damage-statistics', label: '日本のクマ被害統計2025-2026｜過去最多238人の実態' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
