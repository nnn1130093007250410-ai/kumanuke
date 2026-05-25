import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '農地・畑を熊から守る方法｜農家のための熊対策 | KUMANUKE',
  description: '農作物被害を防ぐための農地外周散布・収穫前の熊忌避対策を解説。農業組合・JA・農業従事者向けの実践的な熊対策ガイドです。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/farm-bear-prevention' },
  openGraph: {
    title: '農地・畑を熊から守る方法｜農家のための熊対策 | KUMANUKE',
    description: '農作物被害を防ぐための農地外周散布・収穫前の熊忌避対策を解説。農業従事者向けの実践的な熊対策ガイド。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/farm-bear-prevention',
  },
}

export default function FarmBearPreventionPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#92400E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            農業・農地
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            農地・畑を熊から守る方法｜農家のための熊対策
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2025年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F8F8F6', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          熊による農作物被害は全国的に増加しており、特にトウモロコシ・果樹・野菜などの被害が深刻です。電気柵の設置が最も効果的ですが、コストや設置手間の問題から、エリア散布型の忌避剤を補助的に使用するケースが増えています。このガイドでは、農地・畑での実践的な熊対策を解説します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          農地で熊が出る原因
        </h2>
        <p>熊が農地に侵入する主な理由は食料の匂いです。特に以下の農作物は熊を強く引き寄せます。</p>
        <ul style={{ paddingLeft: 24, marginTop: 12 }}>
          <li style={{ marginBottom: 8 }}><strong>トウモロコシ</strong>：甘い匂いが遠くまで漂う。収穫直前に被害が集中しやすい</li>
          <li style={{ marginBottom: 8 }}><strong>果樹（リンゴ・ナシ・ブドウ等）</strong>：熟した果実の匂いが強い</li>
          <li style={{ marginBottom: 8 }}><strong>野菜全般</strong>：収穫後の残渣（茎・葉）も匂いの発生源になる</li>
          <li style={{ marginBottom: 8 }}><strong>蜂の巣（養蜂）</strong>：ハチミツを好む熊に特に注意が必要</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          農地での熊対策：3つのアプローチ
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            {
              title: '① 物理的な防護（最も効果的）',
              color: '#143D1E',
              items: [
                '電気柵の設置：最も確実な方法。農地外周をしっかり囲む',
                '防護ネット・金属柵の設置：コスト面で電気柵より有利な場合も',
                '農地周辺の除草・ヤブ刈り：熊の潜伏場所を減らす',
              ]
            },
            {
              title: '② 忌避剤の散布（補助的対策）',
              color: '#1F5C2E',
              items: [
                '農地外周・農道沿いにエリア散布',
                '電気柵と組み合わせることで効果を高める',
                '収穫前の時期に特に重点的に散布',
                '農作物への直接散布は避け、農地の外周・周囲のみに使用',
              ]
            },
            {
              title: '③ 環境整備（中長期対策）',
              color: '#92400E',
              items: [
                '収穫後の残渣・落果はすぐに処理・埋設する',
                '農地周辺の倒木・ヤブを定期的に除去する',
                '見通しの良い環境を維持し、熊が隠れにくくする',
                '地域の農業組合・行政との情報共有を行う',
              ]
            },
          ].map((section) => (
            <div key={section.title} style={{ border: '1px solid #EFEFED', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ background: section.color, padding: '14px 20px' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>{section.title}</h3>
              </div>
              <ul style={{ padding: '16px 20px 16px 36px', margin: 0 }}>
                {section.items.map((item, i) => (
                  <li key={i} style={{ marginBottom: 8, fontSize: 14, color: '#4A4A45', lineHeight: 1.7 }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          忌避スプレーの効果的な散布箇所
        </h2>
        <p>農地への忌避スプレー散布は、農作物に直接かからないよう注意しながら以下の箇所に行います。</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12, marginTop: 16 }}>
          {[
            { place: '農地外周の境界線', note: '熊の侵入ルートに沿って散布' },
            { place: '農道・林道との境目', note: '熊が農地に近づく動線を遮断' },
            { place: '林縁部・ヤブ際', note: '熊の隠れ場所からの侵入を抑制' },
            { place: '電気柵の外側', note: '物理的防護との併用で効果向上' },
          ].map((item) => (
            <div key={item.place} style={{ background: '#F8F8F6', border: '1px solid #EFEFED', borderRadius: 6, padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, color: '#143D1E', fontSize: 13, marginBottom: 4 }}>✓ {item.place}</div>
              <div style={{ fontSize: 12, color: '#5A5A55' }}>{item.note}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          散布頻度と管理スケジュール
        </h2>
        <p>農地での忌避スプレー管理は、農作物の生育スケジュールと合わせて計画的に行いましょう。</p>
        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#143D1E', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>時期</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>対応</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['定期散布', '1〜2週間ごとに農地外周を散布'],
                ['降雨後', 'すみやかに再散布（成分が流れるため）'],
                ['収穫前1〜2ヶ月', '散布頻度を上げ、特に夜間の対策を強化'],
                ['収穫後', '残渣処理と合わせて散布し、匂いを抑制'],
              ].map(([t, d], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #EFEFED', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>
                  <td style={{ padding: '12px 16px', color: '#1A1A16', fontWeight: 600 }}>{t}</td>
                  <td style={{ padding: '12px 16px', color: '#5A5A55' }}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          農業組合・JAでの一括導入について
        </h2>
        <p>KUMANUKEでは、農業組合・JA・農業法人向けの卸販売を行っています。地域全体での一括導入により、コストを抑えながら広範囲の農地を保護することができます。</p>
        <p style={{ marginTop: 12 }}>数量・条件等については、お気軽にお問い合わせください。</p>

        <div style={{ marginTop: 32, background: '#143D1E', borderRadius: 8, padding: '32px 28px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>農業組合・法人の方へ</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>
            卸・大量購入のご相談はフォームまたはメールにてお問い合わせください。数量による価格条件をご案内いたします。
          </p>
          <Link href="/#wholesale" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 4, textDecoration: 'none' }}>
            卸・法人のお問い合わせはこちら
          </Link>
        </div>

        <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #EFEFED' }}>
          <p style={{ fontSize: 13, color: '#9A9A95', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/guide/garbage-bear-prevention" style={{ color: '#143D1E', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>→ ゴミ置き場・住宅地の熊対策</Link>
            <Link href="/guide/how-to-choose-bear-repellent" style={{ color: '#143D1E', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>→ 熊よけスプレーの種類と選び方</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
