// Client-safe constants — no Node.js imports here.
// Used by both server components (bear-data.ts) and client components (MapClient.tsx).

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

// ── WORLD BEAR REPORT ──────────────────────────────────────────
export interface WorldBearReport {
  id: string
  date: string
  country: string
  region: string
  city: string
  type: string
  bear_type: string
  title_en: string
  summary_ja: string
  source_name: string
  source_url: string
  importance_level: 1 | 2 | 3
  lat: number
  lng: number
}

export const WORLD_IMPORTANCE_LABELS: Record<number, string> = {
  1: '参考情報',
  2: '重要',
  3: '重大',
}

export const WORLD_IMPORTANCE_COLORS: Record<number, string> = {
  1: '#6B7280',
  2: '#3B82F6',
  3: '#7C3AED',
}
