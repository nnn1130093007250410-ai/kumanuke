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
  const filePath = path.join(process.cwd(), 'public', 'data', 'bear-data.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as BearSighting[]
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
