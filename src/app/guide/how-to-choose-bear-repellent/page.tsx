import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '熊よけスプレーの種類と選び方｜護身用と事前散布型の違い | KUMANUKE',
  description: '護身用の熊撃退スプレー（カプサイシン系）とエリア散布型の熊忌避剤は目的が全く異なります。用途・場面別に正しい製品の選び方を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/how-to-choose-bear-repellent' },
  openGraph: {
    title: '熊よけスプレーの種類と選び方｜護身用と事前散布型の違い | KUMANUKE',
    description: '護身用の熊撃退スプレーとエリア散布型の熊忌避剤の違いを解説。用途に合った製品の正しい選び方。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/how-to-choose-bear-repellent',
  },
}

export default function HowToChoosePage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#6B21A8', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            製品知識
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            熊よけスプレーの種類と選び方｜護身用と事前散布型の違い
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2025年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F8F8F6', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          「熊よけスプレー」と一口に言っても、目的・用途が全く異なる2種類の製品があります。間違った製品を購入すると、必要な場面で役に立たないことがあります。このガイドでは、それぞれの特徴と正しい選び方を解説します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          熊対策スプレーの2種類
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20, marginTop: 8 }}>
          {[
            {
              type: '護身用 熊撃退スプレー',
              timing: '遭遇時に使用',
              ingredient: 'カプサイシン（OC）・唐辛子成分',
              target: '目前の熊に直接噴射',
              range: '至近距離（数メートル）',
              note: '登山・山岳ガイド・山仕事向け',
              color: '#DC2626',
              icon: '🆘',
            },
            {
              type: 'エリア散布型 熊忌避スプレー',
              timing: '事前に散布',
              ingredient: '植物由来成分（KUMANUKEの場合）',
              target: 'エリア全体に散布し侵入を抑制',
              range: '広範囲（テントサイト・農地外周等）',
              note: 'キャンプ・農業・施設管理向け',
              color: '#143D1E',
              icon: '🌿',
            },
          ].map((item) => (
            <div key={item.type} style={{ border: `2px solid ${item.color}`, borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ background: item.color, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>{item.type}</h3>
              </div>
              <div style={{ padding: '16px 20px' }}>
                {[
                  ['使用タイミング', item.timing],
                  ['主成分', item.ingredient],
                  ['使い方', item.target],
                  ['有効範囲', item.range],
                  ['主な用途', item.note],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #F0F0EE', fontSize: 13 }}>
                    <span style={{ color: '#9A9A95', flexShrink: 0, width: 100 }}>{k}</span>
                    <span style={{ color: '#1A1A16', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FEF9E7', border: '1px solid #FDE68A', borderRadius: 8, padding: '20px 20px', marginTop: 24 }}>
          <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 8 }}>⚠️ 重要：混同に注意</p>
          <p style={{ fontSize: 14, color: '#78350F', lineHeight: 1.8 }}>
            KUMANUKEは<strong>護身用ではありません</strong>。熊に遭遇してから使用するものではなく、事前に場所に散布しておくものです。登山・山仕事など、熊と直接遭遇するリスクがある場合は、護身用の熊撃退スプレーを別途携帯してください。
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          場面別・おすすめの組み合わせ
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
          {[
            { scene: '登山・バックカントリー', recommend: '護身用スプレー（必携）＋ 野営地での事前散布（KUMANUKE）', level: '高リスク' },
            { scene: 'キャンプ場・オートキャンプ', recommend: 'テントサイト周辺の事前散布（KUMANUKE）', level: '中リスク' },
            { scene: '農地・畑の管理', recommend: '農地外周の定期散布（KUMANUKE）＋電気柵', level: '中リスク' },
            { scene: 'ゴミ置き場の管理', recommend: 'ゴミ置き場周辺の定期散布（KUMANUKE）＋防護コンテナ', level: '中リスク' },
            { scene: '山間部の住宅地', recommend: '庭・敷地外周の散布（KUMANUKE）', level: '低〜中リスク' },
          ].map((item) => (
            <div key={item.scene} style={{ display: 'flex', gap: 16, background: '#F8F8F6', border: '1px solid #EFEFED', borderRadius: 6, padding: '14px 16px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, minWidth: 120 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A16' }}>{item.scene}</div>
                <div style={{ fontSize: 11, color: '#9A9A95', marginTop: 2 }}>{item.level}</div>
              </div>
              <div style={{ fontSize: 13, color: '#4A4A45', lineHeight: 1.7 }}>→ {item.recommend}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          KUMANUKEの特徴
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12 }}>
          {[
            { title: '植物由来成分', body: 'OCガス・カプサイシン不使用。植物由来成分を主体とした処方。' },
            { title: 'エリア散布型', body: 'テントサイト・農地外周など広範囲に散布して使用。' },
            { title: '多様な場所に対応', body: 'キャンプ・農業・ゴミ置き場・施設管理など幅広く使用可能。' },
            { title: '品質保持期限3年', body: '製造から約3年が目安。直射日光・高温を避けて保管。' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 6, padding: '16px 16px' }}>
              <div style={{ fontWeight: 700, color: '#143D1E', fontSize: 13, marginBottom: 6 }}>✓ {item.title}</div>
              <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.7 }}>{item.body}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, background: '#143D1E', borderRadius: 8, padding: '32px 28px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>KUMANUKEを購入する</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>
            農地・キャンプ・施設管理など幅広い場所での野生動物対策に。卸・法人のお取引も承っています。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 4, textDecoration: 'none' }}>
            製品詳細・ご購入はこちら
          </Link>
        </div>

        <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #EFEFED' }}>
          <p style={{ fontSize: 13, color: '#9A9A95', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            <Link href="/guide/camping-bear-prevention" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ キャンプ場・野営地での熊対策</Link>
            <Link href="/guide/farm-bear-prevention" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ 農地・畑を熊から守る方法</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
