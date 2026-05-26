export interface PrefectureInfo {
  name: string
  slug: string
  center: [number, number] // [lng, lat]
  zoom: number
  bearType: string
}

export const PREFECTURES: PrefectureInfo[] = [
  { name: '北海道', slug: 'hokkaido',   center: [142.8, 43.5],  zoom: 6,   bearType: 'ヒグマ' },
  { name: '青森県', slug: 'aomori',     center: [140.7, 40.7],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '岩手県', slug: 'iwate',      center: [141.1, 39.7],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '宮城県', slug: 'miyagi',     center: [140.9, 38.5],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '秋田県', slug: 'akita',      center: [140.3, 39.7],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '山形県', slug: 'yamagata',   center: [140.3, 38.5],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '福島県', slug: 'fukushima',  center: [140.2, 37.5],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '茨城県', slug: 'ibaraki',    center: [140.4, 36.4],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '栃木県', slug: 'tochigi',    center: [139.9, 36.6],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '群馬県', slug: 'gunma',      center: [138.9, 36.6],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '埼玉県', slug: 'saitama',    center: [139.6, 35.9],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '千葉県', slug: 'chiba',      center: [140.2, 35.5],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '東京都', slug: 'tokyo',      center: [139.4, 35.7],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '神奈川県', slug: 'kanagawa', center: [139.4, 35.4],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '新潟県', slug: 'niigata',    center: [138.9, 37.4],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '富山県', slug: 'toyama',     center: [137.2, 36.7],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '石川県', slug: 'ishikawa',   center: [136.7, 36.6],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '福井県', slug: 'fukui',      center: [136.2, 36.0],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '山梨県', slug: 'yamanashi',  center: [138.6, 35.7],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '長野県', slug: 'nagano',     center: [138.0, 36.3],  zoom: 7,   bearType: 'ツキノワグマ' },
  { name: '静岡県', slug: 'shizuoka',   center: [138.4, 35.0],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '愛知県', slug: 'aichi',      center: [137.2, 35.1],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '三重県', slug: 'mie',        center: [136.5, 34.5],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '滋賀県', slug: 'shiga',      center: [136.2, 35.1],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '京都府', slug: 'kyoto',      center: [135.5, 35.2],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '大阪府', slug: 'osaka',      center: [135.5, 34.7],  zoom: 8.5, bearType: 'ツキノワグマ' },
  { name: '兵庫県', slug: 'hyogo',      center: [134.9, 35.0],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '奈良県', slug: 'nara',       center: [135.8, 34.4],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '和歌山県', slug: 'wakayama', center: [135.6, 33.9],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '鳥取県', slug: 'tottori',    center: [134.2, 35.4],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '島根県', slug: 'shimane',    center: [132.6, 35.2],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '岡山県', slug: 'okayama',    center: [133.9, 34.9],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '広島県', slug: 'hiroshima',  center: [132.7, 34.6],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '山口県', slug: 'yamaguchi',  center: [131.5, 34.2],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '徳島県', slug: 'tokushima',  center: [134.2, 33.9],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '香川県', slug: 'kagawa',     center: [134.0, 34.3],  zoom: 8.5, bearType: 'ツキノワグマ' },
  { name: '愛媛県', slug: 'ehime',      center: [132.8, 33.8],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '高知県', slug: 'kochi',      center: [133.5, 33.5],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '福岡県', slug: 'fukuoka',    center: [130.8, 33.6],  zoom: 8,   bearType: 'ツキノワグマ' },
  { name: '佐賀県', slug: 'saga',       center: [130.3, 33.3],  zoom: 8.5, bearType: 'ツキノワグマ' },
  { name: '長崎県', slug: 'nagasaki',   center: [129.9, 32.9],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '熊本県', slug: 'kumamoto',   center: [130.9, 32.7],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '大分県', slug: 'oita',       center: [131.6, 33.2],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '宮崎県', slug: 'miyazaki',   center: [131.4, 32.0],  zoom: 7.5, bearType: 'ツキノワグマ' },
  { name: '鹿児島県', slug: 'kagoshima',center: [130.6, 31.6],  zoom: 7,   bearType: 'ツキノワグマ' },
  { name: '沖縄県', slug: 'okinawa',    center: [127.7, 26.2],  zoom: 8,   bearType: '–' },
]

export const SLUG_TO_PREFECTURE: Record<string, PrefectureInfo> = Object.fromEntries(
  PREFECTURES.map((p) => [p.slug, p])
)

export const NAME_TO_SLUG: Record<string, string> = Object.fromEntries(
  PREFECTURES.map((p) => [p.name, p.slug])
)

export function getPrefectureBySlug(slug: string): PrefectureInfo | undefined {
  return SLUG_TO_PREFECTURE[slug]
}

export function getSlugByName(name: string): string | undefined {
  return NAME_TO_SLUG[name]
}
