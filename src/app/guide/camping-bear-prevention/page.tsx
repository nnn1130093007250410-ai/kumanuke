import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'キャンプ場・野営地での熊対策完全ガイド | KUMANUKE',
  description: 'テントサイト周辺への事前散布から食料管理まで、キャンプ中の熊遭遇リスクを下げる実践的な方法を解説。植物由来の忌避スプレーKUMANUKEの活用法も紹介。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/camping-bear-prevention' },
  openGraph: {
    title: 'キャンプ場・野営地での熊対策完全ガイド | KUMANUKE',
    description: 'テントサイト周辺への事前散布から食料管理まで、キャンプ中の熊遭遇リスクを下げる実践的な方法を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/camping-bear-prevention',
  },
}

export default function CampingBearPreventionPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1F5C2E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, marginLeft: 0, letterSpacing: '0.05em' }}>
            キャンプ・登山
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            キャンプ場・野営地での熊対策完全ガイド
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2025年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F8F8F6', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          近年、登山・キャンプ中の熊との遭遇事故が増加しています。「熊鈴を鳴らす」「食料をしっかり管理する」といった基本的な対策に加えて、テントサイト周辺にあらかじめ忌避剤を散布しておく「エリア散布」という方法が注目されています。このガイドでは、キャンプ・野営地での熊対策を体系的に解説します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          なぜキャンプ場で熊が出るのか
        </h2>
        <p>熊はもともと山林の奥に生息していますが、食料を求めて人間の生活圏に近づくケースが増えています。特にキャンプ場では、食料の匂いや調理の煙が広範囲に漂い、熊を引き寄せる原因となります。</p>
        <ul style={{ paddingLeft: 24, marginTop: 12 }}>
          <li style={{ marginBottom: 8 }}>食料・調味料の匂いがテント周辺に残っている</li>
          <li style={{ marginBottom: 8 }}>生ゴミや食べ残しを適切に処理していない</li>
          <li style={{ marginBottom: 8 }}>人の少ない野営地・バックカントリーでの宿泊</li>
          <li style={{ marginBottom: 8 }}>ドングリ・山菜など熊の餌が豊富なエリアでのキャンプ</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          キャンプ場での熊対策：基本の5つ
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
          {[
            { num: '01', title: '設営前にエリア散布を行う', body: 'テントを張る前に、サイト外周（半径5〜10m程度）に忌避スプレーを散布します。特に草むら・茂み・沢沿いなど熊が侵入しやすいルートに重点的に散布しましょう。' },
            { num: '02', title: '食料は密閉・吊り下げ保管', body: '食料・調味料・ゴミ袋はにおいが漏れない袋に入れ、木に吊るすか専用のベアキャニスター（熊缶）に保管します。テント内に食料を置かないことが鉄則です。' },
            { num: '03', title: '熊鈴・ラジオで存在を知らせる', body: '行動中は熊鈴を鳴らし、自分の存在を熊に知らせましょう。熊は基本的に人間を恐れるため、気配を感じると自ら離れます。' },
            { num: '04', title: '調理後はすぐに清掃する', body: '調理後の食器・調理器具はすぐに洗い、匂いを残さないようにします。油汚れが残った調理道具をテント内に持ち込まないことも重要です。' },
            { num: '05', title: '撤収前に再散布する', body: '翌日の撤収前に再度エリア散布を行い、次の利用者への配慮も含めたサイト管理を意識しましょう。降雨後は成分が薄まるため、早めの再散布をお勧めします。' },
          ].map((item) => (
            <div key={item.num} style={{ display: 'flex', gap: 16, background: '#F8F8F6', border: '1px solid #EFEFED', borderRadius: 8, padding: '20px 20px' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', opacity: 0.4, flexShrink: 0, fontFamily: 'var(--font-dm-sans, sans-serif)', minWidth: 32 }}>{item.num}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#1A1A16', marginBottom: 6, fontSize: 15 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.8 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          エリア散布型スプレーの使い方
        </h2>
        <p>KUMANUKEは護身用の「熊撃退スプレー」ではなく、テントサイト・野営地の外周に事前散布することで熊の侵入を抑制する「エリア散布型」の忌避スプレーです。</p>
        <div style={{ background: '#FEF9E7', border: '1px solid #FDE68A', borderRadius: 8, padding: '20px 20px', marginTop: 16 }}>
          <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 8 }}>⚠️ 重要な使い方の注意</p>
          <ul style={{ paddingLeft: 20, color: '#78350F', fontSize: 14, lineHeight: 1.8 }}>
            <li>熊と遭遇してから使用するものではありません。必ず<strong>事前に散布</strong>してください</li>
            <li>人・動物・農作物に直接噴射しないでください</li>
            <li>風向きを確認してから散布してください</li>
            <li>降雨後は効果が薄まるため、再散布をお勧めします</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          散布のタイミングと目安
        </h2>
        <p>効果的な散布のタイミングと頻度は以下の通りです。</p>
        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#143D1E', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>タイミング</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>散布箇所</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>目的</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['設営前（入場時）', 'サイト外周・草むら・茂み', '最初の侵入抑制'],
                ['就寝前', '設営時と同じ箇所 ＋ 食料保管エリア付近', '夜間の侵入抑制'],
                ['降雨後', '全体を再散布', '効果の維持'],
                ['撤収前', 'サイト全体', '次の利用者への配慮'],
              ].map(([t, p, m], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #EFEFED', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>
                  <td style={{ padding: '12px 16px', color: '#1A1A16', fontWeight: 600 }}>{t}</td>
                  <td style={{ padding: '12px 16px', color: '#5A5A55' }}>{p}</td>
                  <td style={{ padding: '12px 16px', color: '#5A5A55' }}>{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          熊遭遇時の対処法
        </h2>
        <p>万が一、熊と遭遇してしまった場合の基本的な対処法です。KUMANUKEはあくまで事前対策用であり、以下の行動指針も必ず確認しておきましょう。</p>
        <ul style={{ paddingLeft: 24, marginTop: 12 }}>
          <li style={{ marginBottom: 8 }}><strong>慌てて走って逃げない</strong>（熊の追跡本能を刺激する）</li>
          <li style={{ marginBottom: 8 }}><strong>目を離さずゆっくり後退する</strong></li>
          <li style={{ marginBottom: 8 }}><strong>大きな声を出さない</strong>（驚かせると攻撃される場合がある）</li>
          <li style={{ marginBottom: 8 }}>万が一の護身用として「熊撃退スプレー（OC・カプサイシン系）」を別途携帯することを推奨します</li>
        </ul>

        <div style={{ marginTop: 56, background: '#143D1E', borderRadius: 8, padding: '32px 28px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>KUMANUKEについて</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>
            KUMANUKEは植物由来成分を使用したエリア散布型の野生動物対策スプレーです。OCガス・カプサイシン不使用で、テントサイト・農地外周・ゴミ置き場など幅広い場所での使用に対応しています。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 4, textDecoration: 'none' }}>
            製品詳細を見る
          </Link>
        </div>

        <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #EFEFED' }}>
          <p style={{ fontSize: 13, color: '#9A9A95', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/guide/hiking-bear-prevention" style={{ color: '#143D1E', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>→ 登山・トレッキングでの熊対策</Link>
            <Link href="/guide/how-to-choose-bear-repellent" style={{ color: '#143D1E', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>→ 熊よけスプレーの種類と選び方</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
