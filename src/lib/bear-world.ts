import fs from 'fs'
import path from 'path'

// ── Legacy (bear-world.json) ──────────────────────────────────────
export type { WorldBearReport } from './bear-constants'
export { WORLD_IMPORTANCE_LABELS, WORLD_IMPORTANCE_COLORS } from './bear-constants'

import type { WorldBearReport } from './bear-constants'

export function loadWorldBearData(): WorldBearReport[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'bear-world.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as WorldBearReport[]
}

export function getLatestWorldReports(reports: WorldBearReport[], limit = 20): WorldBearReport[] {
  return [...reports]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
}

// ── V2 (world-bear-report.json — 新スキーマ) ─────────────────────
export type { WorldBearReportV2, WorldEventType } from './bear-constants'
export {
  WORLD_EVENT_TYPE_CONFIG,
  WORLD_COUNTRY_SLUGS,
  WORLD_COUNTRY_JA,
} from './bear-constants'

import type { WorldBearReportV2 } from './bear-constants'

export function loadWorldBearReports(): WorldBearReportV2[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'world-bear-report.json')
  if (!fs.existsSync(filePath)) return []
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as WorldBearReportV2[]
}

/** 最新N件（importance_levelでソートし、同じ場合は日付降順） */
export function getTopWorldReports(
  reports: WorldBearReportV2[],
  limit = 20,
): WorldBearReportV2[] {
  return [...reports]
    .sort((a, b) =>
      b.importance_level !== a.importance_level
        ? b.importance_level - a.importance_level
        : b.date.localeCompare(a.date),
    )
    .slice(0, limit)
}

/** 国別に絞り込む */
export function getReportsByCountry(
  reports: WorldBearReportV2[],
  country: string,
): WorldBearReportV2[] {
  return reports
    .filter((r) => r.country === country)
    .sort((a, b) => b.date.localeCompare(a.date))
}

/** event_type 別件数を返す */
export function countByEventType(
  reports: WorldBearReportV2[],
): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const r of reports) {
    counts[r.event_type] = (counts[r.event_type] || 0) + 1
  }
  return counts
}

/** 国別件数ランキング（上位N件） */
export function getCountryCounts(
  reports: WorldBearReportV2[],
  limit = 20,
): { country: string; count: number }[] {
  const counts: Record<string, number> = {}
  for (const r of reports) {
    counts[r.country] = (counts[r.country] || 0) + 1
  }
  return Object.entries(counts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}
