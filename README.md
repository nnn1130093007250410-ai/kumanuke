# KUMANUKE ブランドサイト

植物由来成分を使用したエリア散布型野生動物対策スプレー「KUMANUKE」の公式ブランドサイトです。

## 技術構成

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + インラインスタイル
- **生成方式**: Static Generation (out/ ディレクトリに書き出し)
- **デプロイ**: Vercel

## ディレクトリ構成

```
kumanuke/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/           ← 実際の商品画像を配置
│       └── og-image.png  ← OGP画像（1200×630px）
├── src/
│   ├── app/
│   │   ├── layout.tsx    ← SEO・OGP・JSON-LD・フォント読み込み
│   │   ├── page.tsx      ← メインページ（全セクション組み立て）
│   │   └── globals.css   ← グローバルCSS・Tailwind設定
│   └── components/
│       ├── ui/
│       │   └── ScrollObserver.tsx  ← スクロールアニメーション
│       └── sections/
│           ├── Nav.tsx             ← ナビゲーション
│           ├── Hero.tsx            ← ヒーローセクション
│           ├── Problem.tsx         ← 問題提起
│           ├── WhatIs.tsx          ← KUMANUKEとは
│           ├── FeaturesToHowTo.tsx ← 特徴/シーン/成分/比較/使い方
│           ├── Features.tsx        ← 特徴
│           ├── Scenes.tsx          ← 使用シーン
│           ├── Ingredients.tsx     ← 成分説明
│           ├── Comparison.tsx      ← 比較表
│           ├── HowToUse.tsx        ← 使用方法
│           ├── FAQ.tsx             ← FAQ（アコーディオン）
│           ├── Caution.tsx         ← 注意事項
│           ├── Wholesale.tsx       ← 卸向け案内・お問い合わせフォーム
│           ├── CTAFooter.tsx       ← CTA + Footer
│           ├── CTA.tsx
│           └── Footer.tsx
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

## セットアップ・ローカル開発

```bash
# 1. 依存パッケージをインストール
npm install

# 2. 開発サーバー起動
npm run dev
# → http://localhost:3000 で確認

# 3. 本番ビルド（静的書き出し）
npm run build
# → /out ディレクトリに出力
```

## Vercelへのデプロイ

### 方法①：Vercel CLIを使う
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 方法②：GitHubと連携（推奨）
1. GitHubにリポジトリを作成してプッシュ
2. [vercel.com](https://vercel.com) でNew Project
3. リポジトリを選択 → Deploy
4. 自動でビルド・デプロイが完了

### 環境変数（必要に応じて）
お問い合わせフォームの送信先を実装する場合、以下を設定：
```
NEXT_PUBLIC_CONTACT_EMAIL=info@kumanuke.jp
```

## 画像の配置

以下の画像を `public/images/` に配置してください：

| ファイル名 | サイズ | 用途 |
|---|---|---|
| `og-image.png` | 1200×630px | OGP・SNSシェア用 |
| `product-main.jpg` | 600×600px | 商品メイン画像 |
| `favicon.ico` | 32×32px | ファビコン |
| `apple-touch-icon.png` | 180×180px | iOS ホーム画面アイコン |

### 商品画像の置き換え
現在はSVGによるイラストをプレースホルダーとして使用しています。
実際の商品写真に差し替える場合は `Hero.tsx` の SVG 部分を `<Image>` コンポーネントに変更してください：

```tsx
import Image from 'next/image'

// SVGの代わりに:
<Image
  src="/images/product-main.jpg"
  alt="KUMANUKE 野生動物対策スプレー 200ml"
  fill
  style={{ objectFit: 'cover' }}
  priority
/>
```

## SEO設定

`src/app/layout.tsx` の `metadata` オブジェクトで以下を設定できます：

- `metadataBase`: 本番URLに変更 (`https://kumanuke.jp`)
- `openGraph.images`: OGP画像パスの確認
- JSON-LD構造化データ（Product・WebSite・FAQPage）は自動挿入済み

## お問い合わせフォームの本番対応

現在のフォームはフロントエンドのみの実装です。
実際に送信するには以下のいずれかで対応してください：

### A. Resend + Next.js API Route
```bash
npm install resend
```
`src/app/api/contact/route.ts` を作成してメール送信処理を実装。

### B. Formspree（ノーコード）
フォームの `action` 属性に Formspree のエンドポイントを指定。

### C. netlify Forms
Netlifyを使う場合は `<form data-netlify="true">` を追加するだけ。

## カスタマイズポイント

| 場所 | 変更内容 |
|---|---|
| `tailwind.config.js` | カラーパレットの調整 |
| `globals.css` | フォント・アニメーションの変更 |
| `Hero.tsx` | ヒーローコピー・ボタン文言 |
| `WhatIs.tsx` | 価格・製品仕様の更新 |
| `FAQ.tsx` | FAQ内容の追加・変更 |
| `Wholesale.tsx` | 問い合わせ先メールアドレス |
| `layout.tsx` | SEOキーワード・OGP設定 |

## 法律表現について

本サイトは以下の表現ルールに従って実装しています：
- ✅ 「遭遇予防」「事前対策」「寄り付き対策」「エリア散布」
- ❌ 「熊撃退」「100%防止」「完全対策」「護身用」「攻撃用途」

変更・追記時は同様の表現ルールを守ってください。
