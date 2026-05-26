import fs from 'fs'
import path from 'path'

// Re-export types and constants for server components
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
