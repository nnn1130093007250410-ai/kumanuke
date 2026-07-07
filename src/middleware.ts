import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 正規（本番）ホスト。これ以外のホスト（kumanuke.vercel.app / プレビューURL 等）での
// アクセスはすべて本番ドメインへ 308 恒久リダイレクトし、重複コンテンツを解消する。
//
// ⚠️ デプロイ前提: Search Console の「削除（一時的な削除）」に本番ドメインへ効いている
//    申請が残っていないことを必ず確認・キャンセルしてから公開すること。
//    （過去、削除申請が本番を抑制した状態でリダイレクトを重ね、除外が発生した経緯あり。
//     twin→本番の 308 リダイレクト自体はリダイレクト先=本番を除外しない。）
const CANONICAL_HOST = 'kumanuke.bubuworks.co.jp'

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase()

  // ローカル開発・正規ホスト・ホスト不明はそのまま通す
  if (host === CANONICAL_HOST || host.startsWith('localhost') || host.startsWith('127.0.0.1') || host === '') {
    return NextResponse.next()
  }

  // それ以外（*.vercel.app など）は本番ドメインへ恒久リダイレクト（パス・クエリ保持）
  const url = new URL(request.url)
  url.protocol = 'https:'
  url.host = CANONICAL_HOST
  url.port = ''
  return NextResponse.redirect(url, 308)
}

export const config = {
  // API routes・静的ファイルは除外
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
