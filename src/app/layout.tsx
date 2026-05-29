import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP, DM_Sans } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
})
const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-noto-serif',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kumanuke.vercel.app'),
  title: {
    default: 'KUMANUKE | 熊・野生動物情報ポータル',
    template: '%s | KUMANUKE',
  },
  description:
    '日本最大級の熊・野生動物情報インフラ。全国102,000件超の出没データをマップ・ランキング・統計で可視化。対策ガイド25本・世界の熊情報も網羅。熊よけスプレーKUMANUKEも販売。',
  keywords: [
    '熊出没マップ', 'クマ出没情報', '熊情報ポータル', '野生動物情報',
    '全国熊出没', '熊対策ガイド', '熊よけスプレー', '熊被害統計',
    '熊対策', '野生動物対策', 'キャンプ 熊対策', '登山 熊対策',
  ],
  authors: [{ name: 'BUBUWORKS合同会社' }],
  creator: 'BUBUWORKS合同会社',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://kumanuke.vercel.app',
    siteName: 'KUMANUKE',
    title: 'KUMANUKE | 熊・野生動物情報ポータル',
    description:
      '日本最大級の熊・野生動物情報インフラ。全国102,000件超の出没データをマップ・ランキング・統計で可視化。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KUMANUKE | 熊・野生動物情報ポータル',
    description: '全国102,000件超の熊出没データをマップ・統計で可視化。対策ガイド25本・世界情報も。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: 'https://kumanuke.vercel.app' },
  verification: { google: ['59t4CPVWs5pqhP2kXA31OTvt18MMUrvsXVCm0UuoH78', 'gxUV_ke8-IuvsLbvhKFbtZOBI6l0wX3QJ7XBXV-DAwU'] },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'KUMANUKE 野生動物対策スプレー',
      description:
        '植物由来成分を使用したエリア散布型の野生動物対策スプレー。熊との遭遇予防を目的とした事前散布型対策。OCガス・カプサイシン不使用。',
      brand: { '@type': 'Brand', name: 'KUMANUKE' },
      offers: {
        '@type': 'Offer',
        price: '3980',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'WebSite',
      url: 'https://kumanuke.vercel.app',
      name: 'KUMANUKE',
      description: '熊・野生動物情報ポータル — 全国出没データ・対策ガイド・世界情報を集約',
    },
    {
      '@type': 'Organization',
      name: 'BUBUWORKS合同会社',
      url: 'https://kumanuke.vercel.app',
      email: 'kumanuke@bubuworks.co.jp',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '安積荒井1-169 C102',
        addressLocality: '郡山市',
        addressRegion: '福島県',
        postalCode: '963-0201',
        addressCountry: 'JP',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'KUMANUKEは熊を確実に撃退・駆除できますか？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KUMANUKEは熊の撃退・駆除を目的とした製品ではありません。野生動物の寄り付き対策・遭遇予防を目的とした事前散布型の対策スプレーです。すべての状況において効果を保証するものではありません。',
          },
        },
        {
          '@type': 'Question',
          name: 'どのくらいの頻度で散布すればよいですか？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '使用環境・天候により異なりますが、目安として1〜2週間ごとの再散布をお勧めします。降雨後や強風の後は早めの再散布をお勧めします。',
          },
        },
        {
          '@type': 'Question',
          name: '卸・法人での大量購入は可能ですか？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'はい、卸・法人向けのご注文を承っています。自治体・農業組合・アウトドア関連事業者・ホームセンター等への卸販売を積極的に行っています。',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
