import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '熊スプレーは飛行機・新幹線に持ち込めるか｜国内外の運搬ルール完全ガイド | KUMANUKE',
  description: '熊よけスプレーは飛行機に持ち込めるか。国内線・国際線とも機内持込み・受託手荷物いずれも不可。新幹線・鉄道・宅配便の扱いも詳しく解説。現地調達の方法と代替策も紹介します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-spray-transportation-rules' },
  openGraph: {
    title: '熊スプレーは飛行機・新幹線に持ち込めるか｜運搬ルール完全ガイド | KUMANUKE',
    description: '飛行機は機内持込み・受託とも不可。新幹線・宅配便の扱いと現地調達の方法を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-spray-transportation-rules',
  },
}

export default function BearSprayTransportationRulesPage() {
  return (
    <main style={{ background: '#fff' }}>
      {/* Hero */}
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#92400E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            実用・ルール
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            熊スプレーは飛行機・新幹線に<br />持ち込めるか<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>国内外の運搬ルール完全ガイド</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：実用・ルール
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* 結論ボックス */}
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderLeft: '4px solid #DC2626', borderRadius: 8, padding: '20px 24px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#DC2626', marginBottom: 8 }}>結論：熊スプレーは飛行機に持ち込めません</p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>国内線・国際線とも、機内持込み・受託手荷物いずれも<strong>不可</strong></li>
            <li style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>郵便（通常）での発送も基本的に不可</li>
            <li style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>新幹線・鉄道は手荷物検査がないが旅客営業規則上はNG扱い</li>
            <li style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>宅急便・宅配便は会社により「危険物」として取り扱い不可の場合あり（要事前確認）</li>
          </ul>
        </div>

        {/* 導入 */}
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          北海道や東北など、クマの多い地域への登山・釣り・アウトドア旅行を計画する際、「熊スプレーは飛行機に持ち込めるの？」という疑問は多くの旅行者から寄せられます。特に飛行機移動が必要な北海道遠征では、事前にルールを把握しておかなければ空港で没収されるリスクがあります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、熊スプレーの運搬に関する国内・海外のルールを交通手段別に整理し、現地調達や事前送付の代替手段も紹介します。
        </p>

        {/* Section 1 飛行機 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. 飛行機での持ち込み：なぜNGなのか
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          熊スプレーが飛行機に持ち込めない理由は、その構造と成分が航空法に定める「危険物」に該当するためです。具体的には以下の2点が問題となります。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            {
              title: '①噴射剤（高圧ガス）',
              body: 'LPガス（液化石油ガス）などの可燃性ガスが噴射剤として使用されています。高圧状態にある可燃性ガスは航空法施行規則で定める「高圧ガス（可燃性）」に分類され、貨物・旅客機への搭載が禁止されています。',
            },
            {
              title: '②カプサイシン（毒性物質）',
              body: '主成分であるカプサイシン類は、国際民間航空機関（ICAO）の危険物規則上、「毒性物質」に分類されます。人体への影響が大きく、機内での誤噴射は乗員・乗客全員に危険を及ぼします。',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '14px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#DC2626', marginBottom: 6 }}>{item.title}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>航空会社・機関</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'center' }}>機内持込み</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'center' }}>受託手荷物</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>備考</th>
              </tr>
            </thead>
            <tbody>
              {[
                { carrier: 'JAL（日本航空）', cabin: '不可 ✗', checked: '不可 ✗', note: '危険物として全面禁止' },
                { carrier: 'ANA（全日本空輸）', cabin: '不可 ✗', checked: '不可 ✗', note: '危険物として全面禁止' },
                { carrier: 'Peach Aviation', cabin: '不可 ✗', checked: '不可 ✗', note: '危険品リストに明記' },
                { carrier: '米国TSA（USA国内線）', cabin: '不可 ✗', checked: '不可 ✗', note: 'Bear spray: No/No' },
                { carrier: 'ICAO国際基準', cabin: '不可 ✗', checked: '不可 ✗', note: '毒性物質・高圧可燃性ガスとして禁止' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.carrier}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'center', color: '#DC2626', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.cabin}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'center', color: '#DC2626', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.checked}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 2 新幹線・鉄道 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          2. 新幹線・鉄道での持ち込み
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          新幹線・JRをはじめとする鉄道については、手荷物検査制度は現時点では一般化していませんが、旅客営業規則では「爆発物・引火性物質などの危険品の持ち込みは禁止」と定められています。熊スプレーはこの「危険品」に該当するため、<strong>規則上は持ち込みNGとされています</strong>。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          2023年12月の東海道新幹線でのカプサイシンスプレー誤噴射事故（5名負傷・2名搬送）を受け、JR各社はスプレー類の取り扱いについて注意喚起を強化しています。安全クリップが外れた状態での持ち込みは特にリスクが高く、仮に規則上の確認が行われなかったとしても、誤噴射による被害が生じた場合には携行者の責任が問われる可能性があります。
        </p>
        <div style={{ background: '#FFF8F0', border: '1px solid #FED7AA', borderLeft: '4px solid #E07A30', borderRadius: 8, padding: '20px 24px', marginBottom: 48 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#C05A1A', marginBottom: 8 }}>鉄道での誤噴射事故の記録（2023年）</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            2023年12月の東海道新幹線での事故では、登山帰りの男性が荷棚にリュックを置いた際にサイドポケット内の熊スプレーが誤噴射。付近の乗客5名が目やのどの痛みを訴え、うち2名が病院搬送されました。安全クリップが正しく装着されていなかったことが原因とされました。このような事故を受け、スプレー類の車内持ち込みに対する社会的関心が高まっています。
          </p>
        </div>

        {/* Section 3 宅配便 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          3. 宅配便・郵便での発送
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          宅配便各社の取り扱いは会社・商品によって異なります。一般的に以下の傾向があります。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>輸送手段</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>可否</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>条件・注意点</th>
              </tr>
            </thead>
            <tbody>
              {[
                { method: '宅急便（ヤマト運輸）', ok: '要確認', note: '「危険品」に該当する可能性あり。発送前に要問い合わせ' },
                { method: '佐川急便', ok: '要確認', note: '高圧ガス・可燃性液体は原則発送不可。詳細は確認が必要' },
                { method: '日本郵便（ゆうパック）', ok: '要確認', note: '危険物は発送不可。スプレー缶は内容物要確認' },
                { method: '陸送（トラック貨物）', ok: '条件付き可', note: '毒劇物・高圧ガスの輸送規定に準拠した方法であれば可能な場合あり' },
                { method: '郵便（通常便）', ok: '不可', note: '航空機輸送を含むため危険品は送付不可' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.method}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6', color: r.ok === '不可' ? '#DC2626' : r.ok === '条件付き可' ? '#059669' : '#D97706', fontWeight: 700 }}>{r.ok}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 48 }}>※ 各社の規定は変更される場合があります。発送前に必ず各社に確認してください。</p>

        {/* Section 4 代替手段 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          4. 飛行機利用時の代替手段
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {[
            {
              title: '① 現地調達（最も一般的）',
              body: '北海道・東北などクマが多い地域では、登山用品店・ホームセンター・道の駅などで熊スプレーを購入できる場合があります。旅行・登山前に現地の登山用品店で調達するのが最もシンプルな方法です。ただし在庫がない場合もあるため、事前に問い合わせることを推奨します。',
            },
            {
              title: '② 陸路での事前移送',
              body: '出発地から目的地まで自動車（マイカー・レンタカー）で移動できる場合は、車に乗せた状態で持参できます。鉄道・バスは規則上NGとされているため、自動車移動が最も確実な手段です。',
            },
            {
              title: '③ 宿泊施設・山小屋でのレンタル',
              body: '一部の宿泊施設・登山拠点では熊スプレーのレンタルサービスを提供しています。北海道の知床・大雪山系などの主要登山口には対応している施設もあります。事前に予約確認が必要です。',
            },
            {
              title: '④ エリア散布型忌避スプレーの活用',
              body: '護身用スプレーとは別に、エリア散布型の忌避スプレーの中には、高圧ガスを使用せずに植物由来成分を主体としたものがあります。こうした製品は持ち運び規制の対象外となる場合があります。ただし、個々の製品の成分・容量に応じて判断が必要です。',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 6, padding: '16px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>{item.title}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* Section 5 まとめ */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          5. まとめ：計画段階でのルール確認が重要
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          熊スプレーの運搬ルールは「安全」の観点から厳格に定められており、特に飛行機での持ち込みは国内外問わず全面的に禁止されています。旅行・登山計画の段階でこのルールを把握し、現地調達・事前問い合わせ・代替手段の活用を検討しておくことが重要です。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 32 }}>
          なお、熊スプレーを購入・携行する際は、安全クリップの装着状態を常に確認し、リュックのポケットではなく専用ホルスターに収納するなど、誤噴射防止の取り扱いを徹底してください。
        </p>

        {/* KUMANUKE CTA */}
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>持ち運びやすいエリア散布型忌避スプレー</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            KUMANUKEは植物由来成分を活用したエリア散布型の忌避スプレーです。護身用の熊撃退スプレーとは目的が異なり、テントサイト・農地・ゴミ置き場周辺への事前散布を想定した製品です。携行・保管に際しての条件についてはお問い合わせください。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        {/* Related */}
        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/bear-spray-accidents', label: '熊スプレーの誤噴射事故と法的リスク' },
              { href: '/guide/how-to-choose-bear-repellent', label: '熊よけスプレーの種類と選び方｜護身用と事前散布型の違い' },
              { href: '/guide/hiking-bear-prevention', label: '登山・トレッキングでの熊対策｜山でのリスクを下げる方法' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ fontSize: 14, color: '#143D1E', fontWeight: 600, textDecoration: 'none' }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
