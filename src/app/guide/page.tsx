import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '熊・野生動物対策ガイド | KUMANUKE',
  description: 'キャンプ・登山・農地・ゴミ置き場など場所別の熊・野生動物対策を解説。KUMANUKEが提供する実践的な対策ガイドです。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide' },
}

const articles = [
  {
    slug: 'camping-bear-prevention',
    title: 'キャンプ場・野営地での熊対策完全ガイド',
    description: 'テントサイト周辺への事前散布から食料管理まで、キャンプ中の熊遭遇リスクを下げる実践的な方法を解説します。',
    tag: 'キャンプ・登山',
    tagColor: '#1F5C2E',
  },
  {
    slug: 'farm-bear-prevention',
    title: '農地・畑を熊から守る方法｜農家のための熊対策',
    description: '農作物被害を防ぐための農地外周散布・収穫前の対策など、農業従事者向けの熊忌避対策を詳しく解説します。',
    tag: '農業・農地',
    tagColor: '#92400E',
  },
  {
    slug: 'garbage-bear-prevention',
    title: 'ゴミ置き場・住宅地の熊対策｜自治体・集合住宅向け',
    description: 'ゴミの匂いに誘引される熊への対策。自治体・マンション管理組合・集合住宅向けのエリア散布型対策を解説します。',
    tag: '住宅・自治体',
    tagColor: '#1E40AF',
  },
  {
    slug: 'how-to-choose-bear-repellent',
    title: '熊よけスプレーの種類と選び方｜護身用と事前散布型の違い',
    description: '護身用の熊撃退スプレーとエリア散布型の忌避スプレーは目的が異なります。用途に合った製品の選び方を解説します。',
    tag: '製品知識',
    tagColor: '#6B21A8',
  },
  {
    slug: 'hiking-bear-prevention',
    title: '登山・トレッキングでの熊対策｜山でのリスクを下げる方法',
    description: '登山道・野営地・山小屋周辺での熊遭遇リスク低減策。入山前にできる事前対策とKUMANUKEの活用方法を解説します。',
    tag: 'キャンプ・登山',
    tagColor: '#1F5C2E',
  },
]

export default function GuidePage() {
  return (
    <main style={{ background: '#F8F8F6', minHeight: '60vh' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', marginBottom: 10 }}>KUMANUKE GUIDE</p>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.4 }}>
            熊・野生動物対策ガイド
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, maxWidth: 560 }}>
            場所・用途別の対策方法をわかりやすく解説します。
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/guide/${a.slug}`}
              style={{ textDecoration: 'none', display: 'block', background: '#fff', border: '1px solid #DDDDD8', borderRadius: 8, padding: '24px 28px', transition: 'box-shadow 0.2s' }}
            >
              <span style={{ display: 'inline-block', background: a.tagColor, color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginBottom: 10, letterSpacing: '0.05em' }}>
                {a.tag}
              </span>
              <h2 style={{ fontSize: 'clamp(15px,2vw,18px)', fontWeight: 700, color: '#1A1A16', marginBottom: 8, lineHeight: 1.5 }}>
                {a.title}
              </h2>
              <p style={{ fontSize: 13, color: '#5A5A55', lineHeight: 1.75 }}>{a.description}</p>
              <span style={{ display: 'inline-block', marginTop: 14, fontSize: 13, color: '#143D1E', fontWeight: 700 }}>
                読む →
              </span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48, background: '#143D1E', borderRadius: 8, padding: '32px 28px', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>卸・法人でのご購入</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 20 }}>農業組合・自治体・アウトドアショップなど法人・卸のお取引を承っています。</p>
          <Link href="/#wholesale" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 4, textDecoration: 'none' }}>
            お問い合わせはこちら
          </Link>
        </div>
      </div>
    </main>
  )
}
