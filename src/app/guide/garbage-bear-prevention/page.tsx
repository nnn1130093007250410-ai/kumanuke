import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ゴミ置き場・住宅地の熊対策｜自治体・集合住宅向けガイド | KUMANUKE',
  description: 'ゴミの匂いに誘引される熊への対策。自治体・マンション管理組合・集合住宅・観光施設向けのエリア散布型熊忌避対策を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/garbage-bear-prevention' },
  openGraph: {
    title: 'ゴミ置き場・住宅地の熊対策｜自治体・集合住宅向けガイド | KUMANUKE',
    description: 'ゴミの匂いに誘引される熊への対策。自治体・マンション管理組合向けのエリア散布型熊忌避対策ガイド。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/garbage-bear-prevention',
  },
}

export default function GarbageBearPreventionPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1E40AF', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            住宅・自治体
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            ゴミ置き場・住宅地の熊対策｜自治体・集合住宅向けガイド
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2025年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F8F8F6', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          住宅地や観光地でのゴミ置き場は、熊にとって「安定した食料供給場所」になりやすい危険な場所です。一度ゴミ置き場に来た熊は繰り返し訪れるようになるため、早期の対策が重要です。このガイドでは、自治体・マンション管理組合・観光施設向けの実践的な熊対策を解説します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          ゴミ置き場に熊が来る理由
        </h2>
        <p>熊は嗅覚が非常に優れており、数キロ先の匂いを嗅ぎ分けます。ゴミ置き場の生ゴミ・食品残渣の匂いは熊を強く引きつけます。</p>
        <ul style={{ paddingLeft: 24, marginTop: 12 }}>
          <li style={{ marginBottom: 8 }}>生ゴミ・食品残渣の匂いが広範囲に漂う</li>
          <li style={{ marginBottom: 8 }}>ゴミ回収日の前夜に匂いがピークになりやすい</li>
          <li style={{ marginBottom: 8 }}>山沿い・森林に近い住宅地・観光地では特にリスクが高い</li>
          <li style={{ marginBottom: 8 }}>一度来た熊は「ここに食料がある」と学習し、繰り返し来訪する</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          ゴミ置き場の熊対策：基本方針
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { step: 'STEP 1', title: 'ゴミ置き場を金属製コンテナ・防護ネットで囲う', body: '最も根本的な対策は物理的な防護です。熊が侵入できない頑丈なコンテナや防護ネットの設置を優先してください。これだけで多くの被害を防げます。', bg: '#F0FDF4' },
            { step: 'STEP 2', title: 'ゴミ回収後に忌避スプレーを散布する', body: 'ゴミ回収後、空になったゴミ置き場の周囲に忌避スプレーを散布します。匂いの残留を抑制し、熊が近づきにくい環境を作ります。', bg: '#F8F8F6' },
            { step: 'STEP 3', title: 'ゴミ出しルールの周知徹底', body: '前日夜のゴミ出しを禁止し、回収当日の朝に出すルールを設けることが効果的です。匂いが発生する時間を最短にすることが重要です。', bg: '#F0FDF4' },
            { step: 'STEP 4', title: '行政・警察への報告と連携', body: '熊の目撃情報はすぐに市区町村・警察に報告し、地域全体での対応に繋げましょう。個人・個別施設での対応だけでなく、地域連携が不可欠です。', bg: '#F8F8F6' },
          ].map((item) => (
            <div key={item.step} style={{ background: item.bg, border: '1px solid #EFEFED', borderRadius: 8, padding: '20px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#143D1E', letterSpacing: '0.1em', marginBottom: 6 }}>{item.step}</div>
              <div style={{ fontWeight: 700, color: '#1A1A16', marginBottom: 8, fontSize: 15 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.8 }}>{item.body}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          施設・用途別の対策ポイント
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 16, marginTop: 16 }}>
          {[
            {
              type: '自治体・公共施設',
              points: ['公園・道の駅のゴミ箱に鍵付きコンテナを導入', 'ゴミ収集場所への定期的な忌避剤散布', '住民向けのゴミ出しルール啓発'],
            },
            {
              type: 'マンション・集合住宅',
              points: ['管理組合として防護ネット・コンテナを整備', '回収後のゴミ置き場周辺に散布', '住民へのゴミ出しマナー周知'],
            },
            {
              type: 'キャンプ場・観光施設',
              points: ['ゴミステーション周辺への毎日散布', '来場者向けのゴミ管理案内の設置', 'スタッフによる巡回点検の実施'],
            },
            {
              type: '宿泊施設・旅館',
              points: ['食事残渣の保管場所周辺への散布', '調理場・厨房のゴミ管理の徹底', '裏口・搬入口周辺の定期散布'],
            },
          ].map((item) => (
            <div key={item.type} style={{ border: '1px solid #DDDDD8', borderRadius: 8, padding: '16px 16px', background: '#fff' }}>
              <div style={{ fontWeight: 700, color: '#143D1E', fontSize: 14, marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #EFEFED' }}>{item.type}</div>
              <ul style={{ paddingLeft: 16, margin: 0 }}>
                {item.points.map((p, i) => (
                  <li key={i} style={{ fontSize: 13, color: '#4A4A45', lineHeight: 1.7, marginBottom: 4 }}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          自治体・団体での一括導入
        </h2>
        <p>KUMANUKEでは、自治体・廃棄物処理事業者・観光施設向けの卸販売を行っています。広範囲にわたるゴミ置き場管理や、地域全体での熊対策として一括導入いただいている事例があります。</p>
        <p style={{ marginTop: 12 }}>数量・価格条件等については、お気軽にお問い合わせください。</p>

        <div style={{ marginTop: 32, background: '#143D1E', borderRadius: 8, padding: '32px 28px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>自治体・法人でのご購入</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>
            自治体・廃棄物処理事業者・観光施設・集合住宅管理組合等への卸販売を承っています。まずはお問い合わせください。
          </p>
          <Link href="/#wholesale" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 4, textDecoration: 'none' }}>
            卸・法人のお問い合わせはこちら
          </Link>
        </div>

        <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #EFEFED' }}>
          <p style={{ fontSize: 13, color: '#9A9A95', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/guide/farm-bear-prevention" style={{ color: '#143D1E', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>→ 農地・畑を熊から守る方法</Link>
            <Link href="/guide/how-to-choose-bear-repellent" style={{ color: '#143D1E', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>→ 熊よけスプレーの種類と選び方</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
