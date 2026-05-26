import fs from 'fs'
import path from 'path'

export interface BearSighting {
  id: string
  date: string
  prefecture: string
  city: string
  type: string
  bear_type: string
  title: string
  description: string
  source_name: string
  source_url: string
  danger_level: 1 | 2 | 3
  lat: number
  lng: number
}

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

export const DANGER_LABELS: Record<number, string> = {
  1: '注意',
  2: '警戒',
  3: '高警戒',
}

export const DANGER_COLORS: Record<number, string> = {
  1: '#F59E0B',
  2: '#F97316',
  3: '#EF4444',
}

export const TYPE_LABELS: Record<string, string> = {
  '目撃': '目撃',
  '被害': '被害',
  '人身被害': '人身被害',
  '住宅侵入': '侵入',
  '痕跡': '痕跡',
}
