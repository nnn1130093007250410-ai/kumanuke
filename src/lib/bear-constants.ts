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

// ── WORLD BEAR REPORT V2 (新スキーマ) ─────────────────────────────
export type WorldEventType =
  | 'sighting'
  | 'attack'
  | 'policy'
  | 'warning'
  | 'park_closure'
  | 'research'
  | 'spray_incident'
  | 'coexistence'
  | 'wildlife_management'

export interface WorldBearReportV2 {
  id: string
  country: string           // English (e.g. "USA", "Canada")
  region: string            // English
  city: string
  date: string              // YYYY-MM-DD
  event_type: WorldEventType
  importance_level: 1 | 2 | 3
  bear_type: string         // English (e.g. "Grizzly", "Black bear")
  title_en: string
  summary_ja: string        // Japanese summary (1–2 sentences)
  source_name: string
  source_url: string
  lat: number
  lng: number
  created_at: string        // ISO 8601
  // ── V2.1 enriched fields (optional) ───────────────────────────
  detail_ja?: string        // 詳細解説 300–500文字
  lessons_ja?: string       // 教訓・対策ポイント
  official_response_ja?: string  // 当局・機関の対応・措置
  casualties?: {
    killed?: number
    injured?: number
  }
  bear_population?: string  // 地域の推定個体数（例: "約1,700頭（2024年推定）"）
}

export const WORLD_EVENT_TYPE_CONFIG: Record<WorldEventType, { label: string; icon: string; color: string }> = {
  sighting:            { label: '目撃・出没',   icon: '🐻', color: '#5A7A5A' },
  attack:              { label: '人身被害',     icon: '⚠️', color: '#DC2626' },
  policy:              { label: '政策・管理',   icon: '🌍', color: '#1D4ED8' },
  warning:             { label: '行政警告',     icon: '🚨', color: '#EA580C' },
  park_closure:        { label: '公園閉鎖',     icon: '🚫', color: '#7C3AED' },
  research:            { label: '調査・研究',   icon: '🔬', color: '#0891B2' },
  spray_incident:      { label: 'スプレー事故', icon: '💨', color: '#B45309' },
  coexistence:         { label: '人獣共存',     icon: '🤝', color: '#16A34A' },
  wildlife_management: { label: '個体数管理',   icon: '📊', color: '#6B7280' },
}

// Country slug → English name mapping (for /world/[country] routing)
export const WORLD_COUNTRY_SLUGS: Record<string, string> = {
  usa: 'USA',
  canada: 'Canada',
  finland: 'Finland',
  sweden: 'Sweden',
  norway: 'Norway',
  russia: 'Russia',
  romania: 'Romania',
  italy: 'Italy',
  spain: 'Spain',
  france: 'France',
  india: 'India',
  malaysia: 'Malaysia',
}

// English country name → Japanese display name
export const WORLD_COUNTRY_JA: Record<string, string> = {
  USA: 'アメリカ', Canada: 'カナダ', Finland: 'フィンランド', Sweden: 'スウェーデン',
  Norway: 'ノルウェー', Russia: 'ロシア', Romania: 'ルーマニア', Italy: 'イタリア',
  Spain: 'スペイン', France: 'フランス', India: 'インド', Malaysia: 'マレーシア',
  Indonesia: 'インドネシア', Croatia: 'クロアチア', Slovakia: 'スロバキア',
  Poland: 'ポーランド', Slovenia: 'スロベニア', Bosnia: 'ボスニア',
  Bulgaria: 'ブルガリア', Greece: 'ギリシャ', Ukraine: 'ウクライナ',
  Belarus: 'ベラルーシ', Estonia: 'エストニア', Latvia: 'ラトビア',
  China: '中国', 'South Korea': '韓国', Nepal: 'ネパール',
  Pakistan: 'パキスタン', Kazakhstan: 'カザフスタン', Mongolia: 'モンゴル',
  Iran: 'イラン', Turkey: 'トルコ', Thailand: 'タイ', Vietnam: 'ベトナム',
  Myanmar: 'ミャンマー', 'Sri Lanka': 'スリランカ', Taiwan: '台湾',
  Mexico: 'メキシコ', Peru: 'ペルー', Ecuador: 'エクアドル',
  Colombia: 'コロンビア', Venezuela: 'ベネズエラ', Bolivia: 'ボリビア',
  Greenland: 'グリーンランド', Japan: '日本',
}
