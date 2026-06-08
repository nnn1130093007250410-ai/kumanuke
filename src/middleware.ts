import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// NOTE: Vercel URLへの301リダイレクトは一時無効化
// （Search Console削除申請との組み合わせでインデックス除外が発生したため）
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  // API routes・静的ファイルは除外
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
