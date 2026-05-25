import { NextRequest, NextResponse } from 'next/server'

const TO = 'kumanuke@bubuworks.co.jp'

function buildHtml(body: Record<string, string>) {
  const rows = [
    ['会社名・団体名',     body['会社名・団体名'] ?? ''],
    ['ご担当者名',         body['ご担当者名'] ?? ''],
    ['メールアドレス',     body['メールアドレス'] ?? ''],
    ['電話番号',           body['電話番号'] || '未入力'],
    ['お問い合わせ種別',   body['お問い合わせ種別'] ?? ''],
    ['ご要望・ご質問',     (body['ご要望・ご質問'] || '未入力').replace(/\n/g, '<br>')],
  ]
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="background:#143D1E;color:#fff;padding:16px 20px;border-radius:6px 6px 0 0;margin:0">
        【KUMANUKE】卸・法人お問い合わせ
      </h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #ddd;border-top:none">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:10px 16px;background:#f8f8f6;font-weight:700;font-size:13px;width:36%;border-bottom:1px solid #eee;color:#333">${k}</td>
            <td style="padding:10px 16px;font-size:14px;border-bottom:1px solid #eee;color:#222">${v}</td>
          </tr>`).join('')}
      </table>
      <p style="font-size:12px;color:#999;margin-top:16px">
        このメールは KUMANUKE 公式サイトのお問い合わせフォームから送信されました。
      </p>
    </div>`
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json({ success: false }, { status: 500 })
  }

  try {
    const body: Record<string, string> = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'KUMANUKE フォーム <onboarding@resend.dev>',
        to: [TO],
        reply_to: body['メールアドレス'] ?? '',
        subject: `【KUMANUKE】卸・法人お問い合わせ - ${body['会社名・団体名'] ?? ''}`,
        html: buildHtml(body),
      }),
    })

    if (!res.ok) {
      const errJson = await res.json().catch(() => null)
      const errText = errJson ? JSON.stringify(errJson) : ''
      console.error('Resend error:', res.status, errText)
      return NextResponse.json({ success: false, resendError: errJson ?? errText }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
