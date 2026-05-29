import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '熊スプレーの誤噴射事故と法的リスク｜正しい熊対策の選び方 | KUMANUKE',
  description: '2026年・JR多度津駅での8名負傷事故など、熊撃退スプレーの誤噴射事故が相次いでいます。護身用スプレーとエリア散布型の違い、法的リスクと正しい対策を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-spray-accidents' },
  openGraph: {
    title: '熊スプレーの誤噴射事故と法的リスク｜正しい熊対策の選び方 | KUMANUKE',
    description: '2026年・JR多度津駅での8名負傷事故など、熊撃退スプレーの誤噴射事故が相次いでいます。法的リスクと正しい対策を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-spray-accidents',
  },
}

const accidents = [
  {
    year: '2026年（直近）',
    place: '香川県・JR多度津駅',
    detail: '男性のバックパックのサイドポケットに入っていた熊撃退スプレーが、ホーム上で誤噴射。周囲にいた乗客・通行人8名が目や唇の痛みを訴え医療機関を受診。列車が約34分遅延する事態となった。',
    severity: '8名負傷・列車遅延',
    color: '#DC2626',
  },
  {
    year: '2023年12月',
    place: '東海道新幹線（浜松駅〜東京間）',
    detail: '登山帰りの男性が荷棚にリュックを置いた際、サイドポケット内の熊よけスプレーの発射レバーに力が加わり誤噴射。付近にいた乗客5名が目やのどの痛みを訴え、うち2名が病院に搬送。安全クリップが正しく装着されていなかったことが原因とされた。',
    severity: '5名負傷・2名搬送',
    color: '#D97706',
  },
  {
    year: '2023年',
    place: '滋賀県内の小学校',
    detail: '教室内で児童が熊撃退スプレーを誤噴射。密閉された空間に成分が充満し、複数の児童が目や喉の痛みを訴えた。',
    severity: '児童複数名が症状',
    color: '#D97706',
  },
  {
    year: '2008年',
    place: '北海道・山間温泉旅館',
    detail: '宿泊客が室内で熊よけスプレーの使用方法を確認していたところ誤噴射。成分が館内に広がり、宿泊客24名が目の痛みを訴えて救急搬送、1名が入院。',
    severity: '24名搬送・1名入院',
    color: '#6B7280',
  },
  {
    year: '2007年',
    place: '北海道・大雪山系黒岳ロープウェー',
    detail: 'ゴンドラ内で登山客が持っていた熊よけスプレーの安全ピンが外れて噴射。密閉されたゴンドラ内に成分が充満し、外国人2名が目や鼻の痛みを訴えて救急搬送された。',
    severity: '2名搬送',
    color: '#6B7280',
  },
]

export default function BearSprayAccidentsPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#DC2626', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            安全・リスク
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            熊スプレーの誤噴射事故と法的リスク｜<br />正しい熊対策の選び方
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2026年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#FEF2F2', borderLeft: '3px solid #DC2626', borderRadius: 4 }}>
          2026年5月、香川県のJR多度津駅で熊撃退スプレーが誤噴射し、8名が負傷する事故が発生しました。同様の誤噴射事故は新幹線・小学校・旅館など密閉空間でも相次いでおり、「熊から身を守るための道具」が「人を傷つける原因」になるケースが増えています。本記事では、近年の事故事例と法的リスク、そして目的に合った熊対策の選び方を解説します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          近年の熊スプレー誤噴射・事故事例
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {accidents.map((a, i) => (
            <div key={i} style={{ border: `1px solid #EFEFED`, borderLeft: `4px solid ${a.color}`, borderRadius: 8, padding: '20px 20px', background: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: a.color }}>{a.year}</span>
                  <span style={{ fontSize: 13, color: '#5A5A55', marginLeft: 12 }}>{a.place}</span>
                </div>
                <span style={{ background: a.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 3, flexShrink: 0 }}>
                  {a.severity}
                </span>
              </div>
              <p style={{ fontSize: 14, color: '#4A4A45', lineHeight: 1.8, margin: 0 }}>{a.detail}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13, color: '#9A9A95', marginTop: 12 }}>
          ※各事例は報道・公開情報をもとに当社が整理したものです。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          なぜ誤噴射事故が起きるのか
        </h2>
        <p>熊撃退スプレー（OC・カプサイシン系）は、野生動物との遭遇時に至近距離で噴射するために設計された高圧エアロゾル製品です。その強い噴射力ゆえに、以下のような状況で誤噴射が発生しています。</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12, marginTop: 16 }}>
          {[
            { cause: 'バックパックへの収納', detail: 'サイドポケットに入れたまま移動中、発射レバーに圧力がかかる' },
            { cause: '安全クリップの未装着', detail: '安全装置を外したまま携帯し、わずかな衝撃で誤作動' },
            { cause: '密閉空間での取り扱い', detail: '電車・旅館・教室など換気の悪い場所での取り出しや確認作業' },
            { cause: '廃棄・処分時', detail: '使用期限切れのスプレーを不適切に処分しようとした際の誤噴射' },
          ].map((item) => (
            <div key={item.cause} style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, color: '#991B1B', fontSize: 13, marginBottom: 6 }}>▶ {item.cause}</div>
              <div style={{ fontSize: 12, color: '#7F1D1D', lineHeight: 1.7 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          法的リスク：みだりな携帯・人への使用は違法になる可能性
        </h2>
        <div style={{ background: '#FEF9E7', border: '1px solid #FDE68A', borderRadius: 8, padding: '20px 20px' }}>
          <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 12 }}>⚠️ 熊撃退スプレーの法的位置づけ</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { law: '軽犯罪法', risk: 'OC・カプサイシン系スプレーをみだりに携帯した場合、「人の身体に重大な害を加える器具」として軽犯罪法違反に問われる可能性があります。' },
              { law: '傷害罪・過失傷害罪', risk: '誤噴射により他者が負傷した場合、過失傷害罪に問われるリスクがあります。護身目的で人に向けて使用した場合は傷害罪となる可能性があります。' },
              { law: '公共交通機関でのルール', risk: '航空機・新幹線等でのスプレー類の取り扱いには各社の規定があります。誤った持ち込み・取り扱いが事故を招いています。' },
            ].map((item) => (
              <div key={item.law} style={{ background: '#fff', border: '1px solid #FDE68A', borderRadius: 6, padding: '14px 16px' }}>
                <div style={{ fontWeight: 700, color: '#78350F', fontSize: 13, marginBottom: 4 }}>{item.law}</div>
                <div style={{ fontSize: 13, color: '#92400E', lineHeight: 1.75 }}>{item.risk}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          「護身用スプレー」と「エリア散布型」の違い
        </h2>
        <p>熊対策のスプレーには、目的と使い方が根本的に異なる2種類があります。誤った製品を選ぶと、必要な場面で役に立たないだけでなく、事故のリスクも生じます。</p>

        <div style={{ overflowX: 'auto', marginTop: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#143D1E', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}></th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>護身用 熊撃退スプレー</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', background: '#1F5C2E' }}>KUMANUKE（エリア散布型）</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['主成分', 'OC（カプサイシン）', '植物由来成分'],
                ['使用タイミング', '遭遇時（事後対応）', '事前散布（予防）'],
                ['使い方', '熊に向けて直接噴射', 'エリア外周に散布'],
                ['誤噴射リスク', '高い（強力な刺激成分）', '低い（植物由来）'],
                ['携帯法上の注意', 'みだりな携帯は違法リスク', '対象外'],
                ['密閉空間での危険', 'あり', 'なし（エリア散布型）'],
              ].map(([label, spray, kumanuke], i) => (
                <tr key={label} style={{ borderBottom: '1px solid #EFEFED', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>
                  <td style={{ padding: '11px 16px', fontWeight: 600, color: '#4A4A45', fontSize: 13 }}>{label}</td>
                  <td style={{ padding: '11px 16px', textAlign: 'center', color: '#5A5A55', fontSize: 13 }}>{spray}</td>
                  <td style={{ padding: '11px 16px', textAlign: 'center', fontWeight: 700, color: '#143D1E', fontSize: 13, background: i % 2 === 0 ? '#EFF7F0' : '#E8F4EA' }}>{kumanuke}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          正しい熊対策の考え方
        </h2>
        <p>熊対策は「遭遇してから対処する」よりも「遭遇しない環境をつくる」ことが基本です。</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
          {[
            { step: '予防（第一優先）', body: 'テントサイト・農地・ゴミ置き場など熊が近づく可能性のある場所にあらかじめ忌避剤を散布。KUMANUKEはこの「事前対策」に特化した製品です。', color: '#143D1E' },
            { step: '回避（行動対策）', body: '熊の出没情報を事前に確認し、出没エリアへの不要な立ち入りを避ける。熊鈴の使用や複数人での行動も効果的です。', color: '#1F5C2E' },
            { step: '護身（最終手段）', body: '万が一の遭遇に備え、登山・山仕事などリスクの高い場面では護身用の熊撃退スプレーを携帯する。ただし取り扱いに十分注意が必要です。', color: '#5A5A55' },
          ].map((item) => (
            <div key={item.step} style={{ display: 'flex', gap: 16, border: '1px solid #EFEFED', borderRadius: 8, padding: '18px 20px', background: '#FAFAFA' }}>
              <div style={{ background: item.color, color: '#fff', fontWeight: 700, fontSize: 12, padding: '4px 10px', borderRadius: 4, flexShrink: 0, alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>
                {item.step}
              </div>
              <p style={{ fontSize: 14, color: '#4A4A45', lineHeight: 1.8, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, background: '#143D1E', borderRadius: 8, padding: '32px 28px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>KUMANUKEについて</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>
            KUMANUKEはOCガス・カプサイシン不使用の植物由来成分を用いたエリア散布型スプレーです。護身用ではなく「事前に場所を守る」製品のため、誤噴射による対人事故のリスクがありません。テントサイト・農地・ゴミ置き場などの外周散布にお使いください。
          </p>
          <Link href="/products/kumanuke" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 4, textDecoration: 'none' }}>
            製品詳細を見る
          </Link>
        </div>

        <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #EFEFED' }}>
          <p style={{ fontSize: 13, color: '#9A9A95', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            <Link href="/guide/how-to-choose-bear-repellent" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ 熊よけスプレーの種類と選び方</Link>
            <Link href="/guide/camping-bear-prevention" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ キャンプ場・野営地での熊対策</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
