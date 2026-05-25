import { NextRequest, NextResponse } from 'next/server'

const TO_EMAIL = 'kumanuke@bubuworks.co.jp'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // サーバーサイドからFormSubmitへ送信（CORSなし）
    const res = await fetch(`https://formsubmit.co/ajax/${TO_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        _subject: '【KUMANUKE】卸・法人お問い合わせ',
        _captcha: 'false',
        _template: 'table',
        _replyto: body['メールアドレス'] ?? '',
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('FormSubmit error:', res.status, text)
      return NextResponse.json({ success: false }, { status: 502 })
    }

    const data = await res.json().catch(() => ({ success: 'true' }))
    return NextResponse.json({ success: data.success === 'true' || data.success === true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
