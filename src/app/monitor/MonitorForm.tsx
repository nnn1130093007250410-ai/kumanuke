'use client'
import { useState } from 'react'

type FormData = {
  facilityName: string
  contactName: string
  email: string
  address: string
  useLocation: string
  comment: string
  publishConsent: string
}

const initialForm: FormData = {
  facilityName: '',
  contactName: '',
  email: '',
  address: '',
  useLocation: '',
  comment: '',
  publishConsent: '',
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  fontSize: 14,
  border: '1px solid #DDDDD8',
  borderRadius: 6,
  outline: 'none',
  background: '#fff',
  color: '#1A1A16',
  boxSizing: 'border-box' as const,
  fontFamily: 'var(--font-noto-sans, sans-serif)',
}

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 700,
  color: '#0F2E16',
  marginBottom: 6,
}

const requiredBadge = (
  <span style={{ background: '#EF4444', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 3, marginLeft: 6, verticalAlign: 'middle' }}>
    必須
  </span>
)

export default function MonitorForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.facilityName || !form.contactName || !form.email || !form.address || !form.useLocation || !form.publishConsent) {
      setError('必須項目をすべて入力してください。')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('正しいメールアドレスを入力してください。')
      return
    }

    // メール送信（mailto: でフォールバック）
    const subject = encodeURIComponent(`【KUMANUKEモニター応募】${form.facilityName}`)
    const body = encodeURIComponent(
      `施設名: ${form.facilityName}\n` +
      `担当者名: ${form.contactName}\n` +
      `メールアドレス: ${form.email}\n` +
      `所在地: ${form.address}\n` +
      `利用予定場所・状況: ${form.useLocation}\n` +
      `掲載可否: ${form.publishConsent}\n\n` +
      `コメント・ご質問:\n${form.comment}`
    )
    window.location.href = `mailto:kumanuke@bubuworks.co.jp?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ background: '#F0F7F2', border: '2px solid #5EC97C', borderRadius: 12, padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F2E16', marginBottom: 12 }}>ご応募ありがとうございます</h3>
        <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8 }}>
          メールアプリが開きます。内容を確認の上、送信してください。<br />
          選考結果は1〜2週間以内にメールにてご連絡いたします。
        </p>
        <p style={{ fontSize: 12, color: '#888', marginTop: 16 }}>
          メールアプリが開かない場合は <strong>kumanuke@bubuworks.co.jp</strong> まで直接ご連絡ください。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* 施設名 */}
      <div>
        <label style={labelStyle}>施設名{requiredBadge}</label>
        <input type="text" value={form.facilityName} onChange={set('facilityName')}
          placeholder="例：〇〇キャンプ場、〇〇農園" style={inputStyle} />
      </div>

      {/* 担当者名 */}
      <div>
        <label style={labelStyle}>担当者名{requiredBadge}</label>
        <input type="text" value={form.contactName} onChange={set('contactName')}
          placeholder="例：山田 太郎" style={inputStyle} />
      </div>

      {/* メールアドレス */}
      <div>
        <label style={labelStyle}>メールアドレス{requiredBadge}</label>
        <input type="email" value={form.email} onChange={set('email')}
          placeholder="例：info@example.com" style={inputStyle} />
      </div>

      {/* 所在地 */}
      <div>
        <label style={labelStyle}>施設の所在地（都道府県・市区町村）{requiredBadge}</label>
        <input type="text" value={form.address} onChange={set('address')}
          placeholder="例：秋田県大館市〇〇" style={inputStyle} />
      </div>

      {/* 利用予定場所 */}
      <div>
        <label style={labelStyle}>利用予定場所・状況{requiredBadge}</label>
        <textarea value={form.useLocation} onChange={set('useLocation')}
          placeholder="例：キャンプサイト周辺、ゴミ置き場の近く、農地の外周など。過去に野生動物の出没があった場所など、詳しく教えていただけると選考の参考になります。"
          rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      {/* 掲載可否 */}
      <div>
        <label style={labelStyle}>施設名・利用コメントの掲載可否{requiredBadge}</label>
        <select value={form.publishConsent} onChange={set('publishConsent')}
          style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">選択してください</option>
          <option value="施設名・コメントともに掲載可">施設名・コメントともに掲載可</option>
          <option value="匿名（施設種別のみ）での掲載は可">匿名（施設種別のみ）での掲載は可</option>
          <option value="一切掲載不可">一切掲載不可</option>
          <option value="応募後に相談したい">応募後に相談したい</option>
        </select>
      </div>

      {/* コメント（任意） */}
      <div>
        <label style={labelStyle}>
          コメント・ご質問
          <span style={{ fontSize: 11, fontWeight: 400, color: '#888', marginLeft: 8 }}>任意</span>
        </label>
        <textarea value={form.comment} onChange={set('comment')}
          placeholder="ご不明な点、応募の背景など、ご自由にお書きください。"
          rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#DC2626' }}>
          {error}
        </div>
      )}

      <button type="submit" style={{
        background: '#E07A30',
        color: '#fff',
        fontWeight: 800,
        fontSize: 15,
        padding: '16px',
        borderRadius: 6,
        border: 'none',
        cursor: 'pointer',
        letterSpacing: '0.04em',
        marginTop: 8,
      }}>
        モニターに応募する
      </button>

      <p style={{ fontSize: 11, color: '#AAA', textAlign: 'center', lineHeight: 1.6 }}>
        送信後、担当者よりメールにてご連絡いたします（1〜2週間以内）。<br />
        応募多数の場合は選考となります。あらかじめご了承ください。
      </p>
    </form>
  )
}
