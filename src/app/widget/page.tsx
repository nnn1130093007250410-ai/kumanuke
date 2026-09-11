import type { Metadata } from 'next'
import Link from 'next/link'
import { loadBearData } from '@/lib/bear-data'
import { PREFECTURES } from '@/lib/prefectures'
import WidgetBuilder from '@/components/WidgetBuilder'

export const metadata: Metadata = {
  title: 'クマ出没マップを自分のサイトに貼る｜無料ウィジェット',
  description:
    '最新のクマ出没情報を、ブログ・自治体サイト・登山/釣り関連ページに無料で掲載できる埋め込みウィジェット。全国・都道府県別に対応、データは毎週自動更新。コードを貼るだけで設置できます。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/widget' },
  openGraph: {
    title: 'クマ出没マップを自分のサイトに貼る｜無料ウィジェット',
    description: '最新のクマ出没情報を無料で掲載できる埋め込みウィジェット。全国・都道府県別対応、毎週自動更新。',
    url: 'https://kumanuke.bubuworks.co.jp/widget',
  },
}

export const revalidate = 3600

export default function WidgetPage() {
  const data = loadBearData()
  const withData = new Set(data.map((s) => s.prefecture))
  const prefectures = PREFECTURES
    .filter((p) => withData.has(p.name))
    .map((p) => ({ name: p.name, slug: p.slug }))

  return (
    <main style={{ background: '#F5F7F5', minHeight: '80vh' }}>
      {/* Hero */}
      <div style={{ background: '#0F2E16', padding: '40px 24px 34px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Link href="/map" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
            ← 全国マップへ戻る
          </Link>
          <p style={{ fontSize: 12, color: '#5EC97C', fontWeight: 700, letterSpacing: '0.1em', margin: '10px 0 6px' }}>
            FREE WIDGET
          </p>
          <h1 style={{ fontSize: 'clamp(22px,3.4vw,34px)', fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.3 }}>
            クマ出没マップを、あなたのサイトに。
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, maxWidth: 720 }}>
            KUMANUKEの最新クマ出没情報を、ブログ・自治体サイト・登山／釣り関連ページに
            <strong style={{ color: '#fff' }}>無料で掲載</strong>できます。全国・都道府県別に対応し、
            データは<strong style={{ color: '#fff' }}>毎週自動更新</strong>。コードを貼るだけで設置完了です。
          </p>
        </div>
      </div>

      {/* Builder */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px 24px' }}>
        <WidgetBuilder prefectures={prefectures} />
      </div>

      {/* 説明セクション（SEO兼用） */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '8px 20px 72px' }}>
        <section
          style={{ background: '#fff', border: '1px solid #DDDDD8', borderRadius: 12, padding: 'clamp(20px,4vw,32px)' }}
        >
          <h2 style={{ fontSize: 19, fontWeight: 700, color: '#143D1E', marginBottom: 18 }}>
            設置方法と、ご利用について
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 28 }}>
            {[
              { n: '1', t: '地域を選ぶ', d: '全国、または掲載したい都道府県を選択します。' },
              { n: '2', t: 'コードをコピー', d: '「コードをコピー」を押して、表示されたコードをコピーします。' },
              { n: '3', t: 'サイトに貼る', d: 'ブログや自治体サイトのHTMLに貼り付けるだけで設置完了です。' },
            ].map((s) => (
              <div key={s.n} style={{ background: '#F0F7F2', border: '1px solid #C8DDD0', borderRadius: 10, padding: '18px' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#143D1E', color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  {s.n}
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', margin: '0 0 6px' }}>{s.t}</h3>
                <p style={{ fontSize: 13, color: '#5A5A55', lineHeight: 1.75, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', margin: '0 0 10px' }}>ご利用条件（無料）</h3>
          <ul style={{ fontSize: 14, color: '#333', lineHeight: 2, paddingLeft: '1.2em', margin: '0 0 24px' }}>
            <li>個人・法人・自治体を問わず、無料でご利用いただけます。</li>
            <li>ウィジェットに含まれる<strong>出典リンク（KUMANUKEへのリンク）はそのまま残して</strong>ご利用ください。</li>
            <li>掲載情報は自治体・報道等を参考にした参考情報です。避難・立入判断は必ず各自治体の公式発表に従ってください。</li>
          </ul>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', margin: '0 0 10px' }}>こんな方におすすめ</h3>
          <p style={{ fontSize: 14, color: '#333', lineHeight: 1.9, margin: 0 }}>
            登山・トレッキング・渓流釣り・キャンプ情報を扱うブログやメディア、地域の防災・鳥獣害対策を発信する自治体・団体、
            アウトドア用品店やペンション・観光施設のサイトなど、来訪者にクマ出没への注意を促したいすべてのサイトでご活用いただけます。
          </p>
        </section>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link
            href="/map"
            style={{ display: 'inline-block', padding: '12px 28px', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: 'none' }}
          >
            🗺 全国のクマ出没マップを見る →
          </Link>
        </div>
      </div>
    </main>
  )
}
