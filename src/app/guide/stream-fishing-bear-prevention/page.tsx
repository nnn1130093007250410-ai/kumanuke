import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '渓流釣り・湖釣りでの熊対策｜釣り場のリスクと事前散布のポイント | KUMANUKE',
  description: '渓流・源流・湖畔は熊の生息域と重なり、釣り人の遭遇事故が報告されています。水音・早朝薄暮・単独釣行など釣り場特有のリスクと、釣行前・釣り座周辺でできる事前対策、KUMANUKEの活用方法を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/stream-fishing-bear-prevention' },
  openGraph: {
    title: '渓流釣り・湖釣りでの熊対策｜釣り場のリスクと事前散布のポイント | KUMANUKE',
    description: '渓流・源流・湖畔は熊の生息域と重なります。釣り場特有のリスクと、釣行前・釣り座周辺でできる事前対策を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/stream-fishing-bear-prevention',
  },
}

export default function StreamFishingBearPreventionPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1F5C2E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            アウトドア・レジャー
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            渓流釣り・湖釣りでの熊対策｜釣り場のリスクと事前散布のポイント
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2026年7月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F8F8F6', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          渓流・源流域や山あいの湖・ダム湖は、ツキノワグマやヒグマの生息域とそのまま重なります。釣りは水辺で長時間・静かに過ごすうえ、釣果に集中して周囲への注意が散漫になりやすく、近年は釣り人が熊と遭遇する事例も報告されています。このガイドでは、釣り場特有のリスクと、釣行前・釣り座周辺でできる事前対策を解説します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          釣り場で熊リスクが高まる理由
        </h2>
        <p>釣り場には、他のアウトドアシーンにはない特有のリスク要因があります。次の条件が重なる場所・時間帯では特に注意してください。</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12, marginTop: 16 }}>
          {[
            { title: '生息域と重なる', body: '源流・沢沿い・山あいの湖畔は、熊の行動圏そのもの。人里から離れるほど遭遇確率は上がる。' },
            { title: '水音で気配が消える', body: '渓流の流れの音で、人と熊がお互いの足音・気配に気づきにくい。至近距離での鉢合わせに注意。' },
            { title: '早朝・夕まずめの釣行', body: '釣りの好時合は、熊の活動が活発になる明け方・夕暮れと重なる。薄暗い時間帯の単独行動は避ける。' },
            { title: '藪こぎ・単独入渓', body: '入渓時の藪こぎは視界が悪く、単独釣行では音も小さい。存在を知らせる工夫が欠かせない。' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#FEF9E7', border: '1px solid #FDE68A', borderRadius: 6, padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, color: '#92400E', fontSize: 13, marginBottom: 6 }}>▶ {item.title}</div>
              <div style={{ fontSize: 12, color: '#78350F', lineHeight: 1.7 }}>{item.body}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          釣行前の準備
        </h2>
        <ul style={{ paddingLeft: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>出没情報を確認する</strong>：漁協・自治体・釣り場管理者・SNSなどで、その河川・湖の最新の熊出没情報をチェック</li>
          <li style={{ marginBottom: 10 }}><strong>熊鈴・ラジオで存在を知らせる</strong>：水音に負けないよう、複数の鈴やラジオを併用して人の気配を出す</li>
          <li style={{ marginBottom: 10 }}><strong>護身用スプレーを携帯する</strong>：万一の遭遇に備え、カプサイシン系の熊撃退スプレーをベスト・腰に装着して素早く取り出せるように</li>
          <li style={{ marginBottom: 10 }}><strong>できるだけ複数人で入る</strong>：単独釣行は避け、入渓・退渓の時間と場所を家族や仲間に伝えておく</li>
          <li style={{ marginBottom: 10 }}><strong>エサ・釣果の匂い対策</strong>：練りエサ・魚の匂いは熊を引き寄せる要因。密閉容器・クーラーに入れ、身につけたまま藪で仮眠しない</li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          釣り座・ベース周辺のエリア対策
        </h2>
        <p>釣り座や車・テントなどのベースは、長時間とどまる拠点です。到着時に周辺へ事前散布しておくことで、滞在中の侵入リスクを下げられます。</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
          {[
            { title: '入渓点・釣り座の周辺に事前散布する', body: '釣りを始める前に、釣り座やその周辺（草むら・藪際・獣道になりやすい方向）にKUMANUKEを散布します。長く粘るポイントほど重点的に。' },
            { title: '駐車場・ベースキャンプの外周にも散布する', body: '車を停める林道脇や、テント・タープを張るベース周辺の外周にも散布します。荷物・食料を置く拠点は特に匂い対策とあわせて。' },
            { title: '釣った魚・エサは匂いを閉じ込めて離す', body: 'ビクやクーラーは密閉し、休憩場所から少し離して置きます。内臓処理で出た匂いを拠点に残さないよう注意します。' },
            { title: '長時間の休憩・仮眠前に再散布する', body: '時間経過や増水・雨で効果は薄れます。昼寝や場所移動のあと滞在を続ける場合は、周辺へ再散布してください。' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, background: '#F8F8F6', border: '1px solid #EFEFED', borderRadius: 8, padding: '18px 18px' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', opacity: 0.3, flexShrink: 0, fontFamily: 'var(--font-dm-sans, sans-serif)', minWidth: 28 }}>{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#1A1A16', marginBottom: 6, fontSize: 15 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.8 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          熊に遭遇した場合の対処法
        </h2>
        <div style={{ background: '#FEF3F2', border: '1px solid #FECACA', borderRadius: 8, padding: '20px 20px' }}>
          <p style={{ fontWeight: 700, color: '#991B1B', marginBottom: 12 }}>緊急時の行動指針</p>
          <ol style={{ paddingLeft: 20, color: '#7F1D1D', fontSize: 14, lineHeight: 1.85 }}>
            <li style={{ marginBottom: 8 }}><strong>慌てて走らない</strong>：熊の追跡本能を刺激する。ゆっくり後退する</li>
            <li style={{ marginBottom: 8 }}><strong>目を離さない</strong>：熊から目を離さず、視線を意識したまま後退する</li>
            <li style={{ marginBottom: 8 }}><strong>川に背を向けて逃げ込まない</strong>：増水・滑落の二次事故に注意。足元を確保しながら距離をとる</li>
            <li style={{ marginBottom: 8 }}><strong>熊撃退スプレーを構える</strong>：近づいてくる場合は護身用スプレーを取り出して構える</li>
            <li style={{ marginBottom: 8 }}><strong>釣果・エサは置いて離れる</strong>：匂いのある荷物に執着せず、その場を離れることを優先する</li>
          </ol>
        </div>
        <p style={{ marginTop: 16, fontSize: 14, color: '#5A5A55' }}>
          ※KUMANUKEは護身用ではありません。遭遇時の対処にはカプサイシン系の熊撃退スプレーを別途携帯してください。
        </p>

        <div style={{ marginTop: 48, background: '#143D1E', borderRadius: 8, padding: '32px 28px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>KUMANUKEについて</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>
            植物由来成分を使用したエリア散布型の野生動物対策スプレー。釣り座・ベース周辺の外周散布に。OCガス・カプサイシン不使用の200mlボトルで、バックパックやベストに入れて携帯できます。
          </p>
          <Link href="/products/kumanuke" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 4, textDecoration: 'none' }}>
            製品詳細を見る
          </Link>
        </div>

        <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #EFEFED' }}>
          <p style={{ fontSize: 13, color: '#9A9A95', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            <Link href="/guide/camping-bear-prevention" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ キャンプ場・野営地での熊対策</Link>
            <Link href="/guide/hiking-bear-prevention" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ 登山・トレッキングでの熊対策</Link>
            <Link href="/guide/sansai-bear-safety" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ 山菜採り・きのこ狩りの熊対策</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
