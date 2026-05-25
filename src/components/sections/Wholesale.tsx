'use client'

import { useState } from 'react'

const wholesaleTargets = [
  '農業資材店・JA・農業組合',
  'ホームセンター・工具販売店',
  'アウトドア・登山用品店',
  '自治体・官公庁・学校',
  '観光・宿泊施設',
  '通販・EC事業者',
  '廃棄物処理・清掃業者',
]

export default function Wholesale() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="wholesale" className="fade-up" style={{ background: '#fff', padding: '80px 24px', borderTop: '1px solid #EFEFED' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="section-label">FOR BUSINESS</div>
        <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,30px)', marginBottom: 14 }}>卸・法人向けご案内</h2>
        <p style={{ fontSize: 15, color: '#5A5A55', maxWidth: 600, lineHeight: 1.85, marginBottom: 40 }}>
          自治体・農業組合・アウトドア事業者・小売店など、法人・卸のお取引を積極的にご案内しています。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 40, alignItems: 'start' }}>
          {/* Info side */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#143D1E', marginBottom: 12 }}>取引をご検討の方へ</h3>
            <p style={{ fontSize: 14, color: '#5A5A55', lineHeight: 1.85, marginBottom: 20 }}>
              KUMANUKEは卸・法人販売に積極的に対応しています。農業資材店・ホームセンター・アウトドアショップ・自治体・農業組合・観光施設など、幅広い業種でのお取り扱いを歓迎しています。
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {wholesaleTargets.map((t) => (
                <li key={t} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #EFEFED', fontSize: 13, color: '#4A4A45' }}>
                  <span style={{ color: '#1F5C2E', fontWeight: 700 }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 20, fontSize: 13, color: '#5A5A55' }}>
              数量・価格条件・販売エリア等についてはお問い合わせください。OEM・PB対応についても別途ご相談承ります。
            </p>
            <a href="mailto:info@kumanuke.jp" style={{ display: 'inline-block', marginTop: 16, color: '#143D1E', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              📧 info@kumanuke.jp
            </a>
          </div>

          {/* Form side */}
          <div style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 8, padding: '28px 24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A16', marginBottom: 20 }}>卸・法人お問い合わせ</h3>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <p style={{ fontWeight: 700, color: '#1A1A16', marginBottom: 8 }}>送信しました</p>
                <p style={{ fontSize: 13, color: '#5A5A55' }}>2営業日以内にご返信いたします。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {[
                  { label: '会社名・団体名', placeholder: '株式会社〇〇 / 〇〇農業組合', required: true, type: 'text' },
                  { label: 'ご担当者名', placeholder: '山田 太郎', required: true, type: 'text' },
                  { label: 'メールアドレス', placeholder: 'info@example.co.jp', required: true, type: 'email' },
                  { label: '電話番号', placeholder: '03-0000-0000', required: false, type: 'tel' },
                ].map((f) => (
                  <div key={f.label} style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A45', marginBottom: 5 }}>
                      {f.label} {f.required && <span style={{ color: '#dc2626' }}>*</span>}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      required={f.required}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #DDDDD8', borderRadius: 4, fontSize: 14, fontFamily: 'inherit', background: '#fff', outline: 'none' }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A45', marginBottom: 5 }}>お問い合わせ種別</label>
                  <select style={{ width: '100%', padding: '10px 12px', border: '1px solid #DDDDD8', borderRadius: 4, fontSize: 14, fontFamily: 'inherit', background: '#fff' }}>
                    <option>卸販売について</option>
                    <option>大量購入について</option>
                    <option>OEM・PB対応について</option>
                    <option>その他</option>
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A4A45', marginBottom: 5 }}>ご要望・ご質問</label>
                  <textarea
                    placeholder="ご希望数量・販売チャネル・ご質問等をご記入ください"
                    rows={4}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #DDDDD8', borderRadius: 4, fontSize: 14, fontFamily: 'inherit', background: '#fff', resize: 'vertical', outline: 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{ width: '100%', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 15, padding: 14, borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  送信する
                </button>
                <p style={{ fontSize: 11, color: '#9A9A95', marginTop: 10, textAlign: 'center' }}>通常2営業日以内にご返信いたします</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
