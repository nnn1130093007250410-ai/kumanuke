import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PRODUCTION_HOST = 'kumanuke.bubuworks.co.jp'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''

  // Vercel の .vercel.app URL や preview URL へのアクセスは
  // 本番ドメインにリダイレクト（SEO重複コンテンツを防ぐ）
  if (!host.includes(PRODUCTION_HOST) && !host.includes('localhost')) {
    const url = request.nextUrl.clone()
    url.host   = PRODUCTION_HOST
    url.port   = ''
    url.protocol = 'https:'
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  // API routes・静的ファイルは除外
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
