import fs from 'fs'
import path from 'path'
import type { BearSighting } from './bear-constants'

// Re-export everything that server components need from one place
export type { BearSighting } from './bear-constants'
export { DANGER_LABELS, DANGER_COLORS, TYPE_LABELS } from './bear-constants'

export interface UpdateLog {
  date: string
  added: number
  duplicates_removed: number
  sources_checked: number
  note?: string
}

export function loadBearData(): BearSighting[] {
  // bear-japan.json（全国ArcGIS一括取得データ）を優先して読み込む
  const japanPath = path.join(process.cwd(), 'public', 'data', 'bear-japan.json')
  const raw = fs.existsSync(japanPath)
    ? fs.readFileSync(japanPath, 'utf-8')
    : fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'bear-data.json'), 'utf-8')

  const all = JSON.parse(raw) as BearSighting[]

  // 未来日付のレコード（データ入力ミス）を除外する
  const today = new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"
  return all.filter((s) => s.date <= today)
}

export function loadUpdateLog(): UpdateLog[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'update-log.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as UpdateLog[]
}

export function getSightingsByPrefecture(sightings: BearSighting[], prefecture: string): BearSighting[] {
  return sightings.filter((s) => s.prefecture === prefecture)
}

export function getLatestSightings(sightings: BearSighting[], limit = 20): BearSighting[] {
  return [...sightings].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit)
}

/** 都道府県ごとに最新1件ずつ取得（トップページ用：地域の多様性を確保） */
export function getLatestByPrefecture(sightings: BearSighting[], limit = 8): BearSighting[] {
  const sorted = [...sightings].sort((a, b) => b.date.localeCompare(a.date))
  const seen = new Set<string>()
  const result: BearSighting[] = []
  for (const s of sorted) {
    if (!seen.has(s.prefecture)) {
      seen.add(s.prefecture)
      result.push(s)
      if (result.length >= limit) break
    }
  }
  return result
}

export function getMonthlyCounts(sightings: BearSighting[]): { month: string; label: string; count: number }[] {
  const counts: Record<string, number> = {}
  for (const s of sightings) {
    const month = s.date.substring(0, 7)
    counts[month] = (counts[month] || 0) + 1
  }
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, count]) => ({
      month,
      label: `${parseInt(month.split('-')[1])}月`,
      count,
    }))
}

export function getPrefectureStats(sightings: BearSighting[]): { prefecture: string; count: number; maxLevel: number }[] {
  const stats: Record<string, { count: number; maxLevel: number }> = {}
  for (const s of sightings) {
    if (!stats[s.prefecture]) stats[s.prefecture] = { count: 0, maxLevel: 0 }
    stats[s.prefecture].count++
    if (s.danger_level > stats[s.prefecture].maxLevel) {
      stats[s.prefecture].maxLevel = s.danger_level
    }
  }
  return Object.entries(stats)
    .map(([prefecture, data]) => ({ prefecture, ...data }))
    .sort((a, b) => b.count - a.count)
}
