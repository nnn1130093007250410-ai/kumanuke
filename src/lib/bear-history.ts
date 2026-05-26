import fs from 'fs'
import path from 'path'
import type { BearSighting } from './bear-constants'

// Historical bear sightings (2023-2024) — same shape as BearSighting
export type BearHistoryEntry = BearSighting

export function loadBearHistory(): BearHistoryEntry[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'bear-history.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as BearHistoryEntry[]
}

export function getHistoryByPrefecture(
  history: BearHistoryEntry[],
  prefecture: string
): BearHistoryEntry[] {
  return history
    .filter((h) => h.prefecture === prefecture)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getAllPrefecturesWithHistory(
  history: BearHistoryEntry[]
): string[] {
  return Array.from(new Set(history.map((h) => h.prefecture)))
}
