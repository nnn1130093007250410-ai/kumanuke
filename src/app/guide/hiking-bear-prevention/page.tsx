import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '登山・トレッキングでの熊対策｜山でのリスクを下げる方法 | KUMANUKE',
  description: '登山道・野営地・山小屋周辺での熊遭遇リスク低減策を解説。入山前にできる事前対策とKUMANUKEの活用方法、万が一の対応まで網羅したガイドです。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/hiking-bear-prevention' },
  openGraph: {
    title: '登山・トレッキングでの熊対策｜山でのリスクを下げる方法 | KUMANUKE',
    description: '登山道・野営地での熊遭遇リスク低減策。入山前にできる事前対策とKUMANUKEの活用方法を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/hiking-bear-prevention',
  },
}

export default function HikingBearPreventionPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1F5C2E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            キャンプ・登山
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            登山・トレッキングでの熊対策｜山でのリスクを下げる方法
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2025年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F8F8F6', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          日本では毎年、登山中の熊との接触事故が報告されています。特にツキノワグマは低山域から高山帯まで広く生息しており、登山者が注意を払うべき野生動物です。このガイドでは、入山前・行動中・野営時のそれぞれの段階でできる熊対策を解説します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          登山中の熊リスクが高い状況
        </h2>
        <p>以下の条件が重なる場合は特に注意が必要です。事前に情報収集し、対策を十分に行った上で入山してください。</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12, marginTop: 16 }}>
          {[
            { title: '秋の食欲旺盛期', body: '9〜11月は冬眠前の採食行動が活発。ドングリ・山菜が豊富な低山で注意。' },
            { title: '早朝・薄暮の時間帯', body: '熊は明け方と夕暮れ時に活動することが多い。この時間帯の単独行動は避ける。' },
            { title: '笹薮・渓谷沿い', body: '熊が隠れやすい地形。視界が悪い場所では特に声を出して存在を知らせる。' },
            { title: '単独登山', body: '複数人の方が音も大きく、熊が気づいて退避しやすい。単独時は特に対策を。' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#FEF9E7', border: '1px solid #FDE68A', borderRadius: 6, padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, color: '#92400E', fontSize: 13, marginBottom: 6 }}>▶ {item.title}</div>
              <div style={{ fontSize: 12, color: '#78350F', lineHeight: 1.7 }}>{item.body}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          入山前の準備
        </h2>
        <ul style={{ paddingLeft: 24 }}>
          <li style={{ marginBottom: 10 }}><strong>熊の目撃情報を確認する</strong>：市区町村・登山道管理者・山岳会のウェブサイト等で最新情報を確認</li>
          <li style={{ marginBottom: 10 }}><strong>熊鈴を複数装備する</strong>：鈴の音で存在を知らせることが最も基本的な対策</li>
          <li style={{ marginBottom: 10 }}><strong>護身用スプレーを携帯する</strong>：カプサイシン系の熊撃退スプレーを腰ベルトに装着して素早く取り出せるようにする</li>
          <li style={{ marginBottom: 10 }}><strong>食料を密閉容器に入れる</strong>：匂いが外に漏れないベアキャニスターや密閉袋を使用</li>
          <li style={{ marginBottom: 10 }}><strong>登山計画書を提出する</strong>：万が一の事故に備え、警察・山岳会への届出を忘れずに</li>
        </ul>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          野営・テント泊での熊対策
        </h2>
        <p>テント泊・バックカントリーでの野営は熊との遭遇リスクが特に高まります。キャンプ場と違い、周囲に管理者がいないため、自己責任での対策が不可欠です。</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
          {[
            { title: '設営前にエリア散布を行う', body: 'テントを張る前に、KUMANUKEをサイト外周（半径5〜10m）に散布します。特に草むら・沢沿いなど熊が近づきやすい方向に重点的に散布してください。' },
            { title: '食料・ゴミは必ずベアキャニスターへ', body: 'テント内に食料・ゴミを置かないことが鉄則です。木に吊るすか、ベアキャニスターに入れてテントから離れた場所に保管します。' },
            { title: '調理はテントから離れた場所で', body: '調理の匂いがテントに残らないよう、調理場所はテントから10〜20m以上離れた場所にします。調理後の器具はすぐに洗い、テント内に持ち込みません。' },
            { title: '就寝前に再散布する', body: '就寝前に食料保管エリア周辺を中心に再散布します。夜間の熊の行動が活発になる時間帯の侵入抑制に効果的です。' },
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

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          熊に遭遇した場合の対処法
        </h2>
        <div style={{ background: '#FEF3F2', border: '1px solid #FECACA', borderRadius: 8, padding: '20px 20px' }}>
          <p style={{ fontWeight: 700, color: '#991B1B', marginBottom: 12 }}>緊急時の行動指針</p>
          <ol style={{ paddingLeft: 20, color: '#7F1D1D', fontSize: 14, lineHeight: 1.85 }}>
            <li style={{ marginBottom: 8 }}><strong>慌てて走らない</strong>：熊の追跡本能を刺激する。ゆっくり後退する</li>
            <li style={{ marginBottom: 8 }}><strong>目を離さない</strong>：熊から目を離さず、視線を合わせたまま後退する</li>
            <li style={{ marginBottom: 8 }}><strong>大きな声を出さない</strong>：突発的な大声は攻撃を誘発することがある</li>
            <li style={{ marginBottom: 8 }}><strong>熊撃退スプレーを構える</strong>：熊が近づいてくる場合は護身用スプレーを取り出して構える</li>
            <li style={{ marginBottom: 8 }}><strong>グループで固まる</strong>：複数人の場合は固まり、大きく見せる</li>
          </ol>
        </div>
        <p style={{ marginTop: 16, fontSize: 14, color: '#5A5A55' }}>
          ※KUMANUKEは護身用ではありません。遭遇時の対処にはカプサイシン系の熊撃退スプレーを別途携帯してください。
        </p>

        <div style={{ marginTop: 48, background: '#143D1E', borderRadius: 8, padding: '32px 28px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>KUMANUKEについて</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>
            植物由来成分を使用したエリア散布型の野生動物対策スプレー。野営地・テントサイトの外周散布に。OCガス・カプサイシン不使用。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 4, textDecoration: 'none' }}>
            製品詳細を見る
          </Link>
        </div>

        <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #EFEFED' }}>
          <p style={{ fontSize: 13, color: '#9A9A95', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            <Link href="/guide/camping-bear-prevention" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ キャンプ場・野営地での熊対策</Link>
            <Link href="/guide/how-to-choose-bear-repellent" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ 熊よけスプレーの種類と選び方</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
