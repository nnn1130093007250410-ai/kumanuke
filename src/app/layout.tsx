import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP, DM_Sans } from 'next/font/google'
import Script from 'next/script'
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
  metadataBase: new URL('https://kumanuke.bubuworks.co.jp'),
  title: {
    default: 'KUMANUKE | 熊・野生動物情報ポータル',
    template: '%s | KUMANUKE',
  },
  description:
    '全国の熊・野生動物の出没データ110,000件超を集約し、マップ・ランキング・統計で可視化。対策ガイド35本・世界の熊情報も網羅した情報サイト。熊よけスプレーKUMANUKEも販売。',
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
    url: 'https://kumanuke.bubuworks.co.jp',
    siteName: 'KUMANUKE',
    title: 'KUMANUKE | 熊・野生動物情報ポータル',
    description:
      '全国の熊・野生動物の出没データ110,000件超を集約し、マップ・ランキング・統計で可視化した情報サイト。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KUMANUKE | 熊・野生動物情報ポータル',
    description: '全国110,000件超の熊出没データをマップ・統計で可視化。対策ガイド25本・世界情報も。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp' },
  verification: { google: ['59t4CPVWs5pqhP2kXA31OTvt18MMUrvsXVCm0UuoH78', 'gxUV_ke8-IuvsLbvhKFbtZOBI6l0wX3QJ7XBXV-DAwU'] },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Product',
      name: 'KUMANUKE 野生動物対策スプレー',
      image: 'https://kumanuke.bubuworks.co.jp/product-og.jpg',
      description:
        '植物由来成分を使用したエリア散布型の野生動物対策スプレー。熊との遭遇予防を目的とした事前散布型対策。OCガス・カプサイシン不使用。',
      brand: {
        '@type': 'Brand',
        '@id': 'https://kumanuke.bubuworks.co.jp/#brand',
        name: 'KUMANUKE',
        alternateName: ['クマヌケ', 'クマヌケ 熊よけスプレー'],
        url: 'https://kumanuke.bubuworks.co.jp',
        logo: 'https://kumanuke.bubuworks.co.jp/product-og.jpg',
        sameAs: [
          'https://www.instagram.com/kumanuke2026/',
          'https://www.amazon.co.jp/dp/B0H5L7CLK4',
          'https://search.rakuten.co.jp/search/mall/KUMANUKE/',
        ],
      },
      offers: {
        '@type': 'Offer',
        price: '3980',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'BUBUWORKS合同会社',
          url: 'https://kumanuke.bubuworks.co.jp',
        },
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://kumanuke.bubuworks.co.jp/#website',
      url: 'https://kumanuke.bubuworks.co.jp',
      name: 'KUMANUKE',
      alternateName: ['クマヌケ', 'KUMANUKE 公式', '熊よけスプレー KUMANUKE'],
      inLanguage: 'ja',
      publisher: { '@id': 'https://kumanuke.bubuworks.co.jp/#organization' },
      description: '熊・野生動物情報ポータル — 全国出没データ・対策ガイド・世界情報を集約',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://kumanuke.bubuworks.co.jp/map/{prefecture}' },
        'query-input': 'required name=prefecture',
      },
    },
    {
      '@type': 'Dataset',
      '@id': 'https://kumanuke.bubuworks.co.jp/map#dataset',
      name: '日本全国クマ出没データベース',
      description: 'ArcGIS REST API・自治体オープンデータから収集した日本全国のクマ（ツキノワグマ・ヒグマ）出没情報。目撃・人身被害・捕獲を含む110,000件超のデータを毎週自動更新。',
      url: 'https://kumanuke.bubuworks.co.jp/map',
      creator: { '@type': 'Organization', name: 'BUBUWORKS合同会社', url: 'https://kumanuke.bubuworks.co.jp' },
      keywords: ['クマ出没', 'ヒグマ', 'ツキノワグマ', '野生動物', '出没情報', '人身被害', '熊対策'],
      license: 'https://kumanuke.bubuworks.co.jp/privacy',
      temporalCoverage: '2000/..',
      spatialCoverage: {
        '@type': 'Place',
        name: '日本',
        geo: { '@type': 'GeoShape', box: '24 122 46 154' },
      },
      measurementTechnique: '自治体公開ArcGISデータ・Google My Maps KMLデータの自動収集',
      variableMeasured: 'クマ目撃・人身被害・捕獲件数',
      isAccessibleForFree: true,
      inLanguage: 'ja',
    },
    {
      '@type': 'Organization',
      '@id': 'https://kumanuke.bubuworks.co.jp/#organization',
      name: 'BUBUWORKS合同会社',
      alternateName: 'KUMANUKE',
      url: 'https://kumanuke.bubuworks.co.jp',
      logo: 'https://kumanuke.bubuworks.co.jp/product-og.jpg',
      email: 'kumanuke@bubuworks.co.jp',
      sameAs: [
        'https://www.instagram.com/kumanuke2026/',
        'https://www.amazon.co.jp/dp/B0H5L7CLK4',
        'https://search.rakuten.co.jp/search/mall/KUMANUKE/',
      ],
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
      <body style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
        {children}
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L7NV60Z443"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L7NV60Z443');
          `}
        </Script>
      </body>
    </html>
  )
}
