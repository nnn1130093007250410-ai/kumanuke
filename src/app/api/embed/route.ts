/**
 * 埋め込みウィジェット用APIエンドポイント
 *
 * GET /api/embed?pref=akita&limit=5
 *   → 都道府県の最新出没情報をJSONで返す（CORS対応）
 *
 * 利用例（外部サイトからiframe埋め込み）:
 *   <iframe src="https://kumanuke.bubuworks.co.jp/embed?pref=akita" width="400" height="500"></iframe>
 *
 * または JSONデータとして:
 *   fetch('https://kumanuke.bubuworks.co.jp/api/embed?pref=akita&limit=5')
 */

import { NextRequest, NextResponse } from 'next/server'
import { loadBearData } from '@/lib/bear-data'
import { PREFECTURES, getPrefectureBySlug } from '@/lib/prefectures'

export const revalidate = 3600 // 1時間キャッシュ

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const prefSlug  = searchParams.get('pref') ?? ''
  const limitStr  = searchParams.get('limit') ?? '10'
  const format    = searchParams.get('format') ?? 'json'
  const limit     = Math.min(Math.max(1, parseInt(limitStr) || 10), 50)

  const allData = loadBearData()

  // 都道府県フィルタ
  let filtered = allData
  let prefInfo = prefSlug ? getPrefectureBySlug(prefSlug) : null
  if (prefInfo) {
    filtered = allData.filter((s) => s.prefecture === prefInfo!.name)
  }

  // 日付降順ソート・件数制限
  const sorted = [...filtered]
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    .slice(0, limit)

  // 統計情報
  const totalForPref = filtered.length
  const cy = new Date().getFullYear()
  const thisYear = filtered.filter((s) => s.date?.startsWith(String(cy))).length

  const responseData = {
    meta: {
      source: 'KUMANUKE - kumanuke.bubuworks.co.jp',
      prefecture: prefInfo?.name ?? '全国',
      total: totalForPref,
      this_year: thisYear,
      current_year: cy,
      updated: new Date().toISOString(),
      embed_code: prefSlug
        ? `<iframe src="https://kumanuke.bubuworks.co.jp/embed?pref=${prefSlug}" width="420" height="520" frameborder="0" style="border-radius:8px"></iframe>`
        : `<iframe src="https://kumanuke.bubuworks.co.jp/embed" width="420" height="520" frameborder="0" style="border-radius:8px"></iframe>`,
    },
    sightings: sorted.map((s) => ({
      id:         s.id,
      date:       s.date,
      prefecture: s.prefecture,
      city:       s.city,
      type:       s.type,
      bear_type:  s.bear_type,
      title:      s.title,
      lat:        s.lat,
      lng:        s.lng,
      danger_level: s.danger_level,
    })),
  }

  return NextResponse.json(responseData, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
