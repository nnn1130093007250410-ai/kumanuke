import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'KUMANUKE（BUBUWORKS合同会社）のプライバシーポリシーです。',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. 事業者情報',
      content: (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          {[
            ['事業者名', 'BUBUWORKS合同会社'],
            ['所在地', '福島県郡山市安積荒井1-169 C102'],
            ['メールアドレス', 'info@bubuworks.co.jp'],
            ['運営サービス', 'KUMANUKE 公式サイト（https://kumanuke.bubuworks.co.jp）'],
          ].map(([k, v]) => (
            <tr key={k} style={{ borderBottom: '1px solid #EFEFED' }}>
              <td style={{ padding: '10px 0', color: '#5A5A55', fontWeight: 600, width: '40%', verticalAlign: 'top' }}>{k}</td>
              <td style={{ padding: '10px 0', color: '#1A1A16' }}>{v}</td>
            </tr>
          ))}
        </table>
      ),
    },
    {
      title: '2. 収集する個人情報',
      content: (
        <div>
          <p style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.85, marginBottom: 12 }}>
            当サイトでは、以下の情報を収集することがあります。
          </p>
          <ul style={{ fontSize: 14, color: '#5A5A55', lineHeight: 2, paddingLeft: 20 }}>
            <li>卸・法人お問い合わせフォームに入力された会社名・担当者名・メールアドレス・電話番号・お問い合わせ内容</li>
            <li>お問い合わせへの返信に必要な連絡先情報</li>
          </ul>
        </div>
      ),
    },
    {
      title: '3. 個人情報の利用目的',
      content: (
        <ul style={{ fontSize: 14, color: '#5A5A55', lineHeight: 2, paddingLeft: 20 }}>
          <li>お問い合わせへの返信および商談・取引の進行</li>
          <li>卸・法人取引に関する連絡・資料送付</li>
          <li>サービス改善のための分析（個人を特定しない形での利用）</li>
        </ul>
      ),
    },
    {
      title: '4. 個人情報の第三者提供',
      content: (
        <p style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.85 }}>
          当社は、以下の場合を除き、取得した個人情報を第三者に提供しません。
        </p>
      ),
    },
    {
      title: '5. Cookieの使用について',
      content: (
        <p style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.85 }}>
          当サイトでは、サービス改善のためCookieを使用する場合があります。ブラウザの設定によりCookieを無効にすることが可能ですが、一部機能が利用できなくなる場合があります。
        </p>
      ),
    },
    {
      title: '6. 個人情報の管理・安全対策',
      content: (
        <p style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.85 }}>
          当社は、個人情報の紛失・破壊・改ざん・不正アクセス等を防止するために適切な安全管理措置を講じます。フォーム送信にはSSL暗号化通信を使用しております。
        </p>
      ),
    },
    {
      title: '7. 個人情報の開示・訂正・削除',
      content: (
        <p style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.85 }}>
          ご本人からの個人情報の開示・訂正・削除のご要望については、下記の連絡先にご連絡ください。合理的な範囲で速やかに対応いたします。
        </p>
      ),
    },
    {
      title: '8. プライバシーポリシーの変更',
      content: (
        <p style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.85 }}>
          本ポリシーは必要に応じて改定することがあります。改定した場合は当ページにて公表します。
        </p>
      ),
    },
    {
      title: '9. お問い合わせ窓口',
      content: (
        <p style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.85 }}>
          プライバシーポリシーに関するお問い合わせは、<a href="mailto:info@bubuworks.co.jp" style={{ color: '#143D1E', fontWeight: 700 }}>info@bubuworks.co.jp</a> までご連絡ください。
        </p>
      ),
    },
  ]

  return (
    <>
      {/* Simple nav */}
      <nav style={{ background: '#143D1E', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-en, sans-serif)', fontSize: 18, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.08em' }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
          ← トップに戻る
        </Link>
      </nav>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 700, color: '#1A1A16', marginBottom: 8 }}>
          プライバシーポリシー
        </h1>
        <p style={{ fontSize: 13, color: '#9A9A95', marginBottom: 40 }}>
          制定日：2025年1月1日　最終改定：2025年5月
        </p>

        <p style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.85, marginBottom: 40, padding: '16px 20px', background: '#F8F8F6', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          BUBUWORKS合同会社（以下「当社」）は、KUMANUKE公式サイトにおける個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {sections.map((sec) => (
            <section key={sec.title}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#143D1E', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #EFEFED' }}>
                {sec.title}
              </h2>
              {sec.content}
            </section>
          ))}
        </div>

        <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid #EFEFED', textAlign: 'center' }}>
          <Link
            href="/"
            style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 4, textDecoration: 'none' }}
          >
            トップページへ戻る
          </Link>
        </div>
      </main>

      <footer style={{ background: '#1A1A16', padding: '20px 24px', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
        © 2025 BUBUWORKS合同会社. All rights reserved.
      </footer>
    </>
  )
}
