'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import Map, { Popup, Source, Layer, NavigationControl } from 'react-map-gl/mapbox'
import type { LayerProps, MapRef, MapMouseEvent } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { BearSighting, WorldBearReport, WorldBearReportV2, GbifSighting } from '@/lib/bear-constants'
import {
  DANGER_COLORS, DANGER_LABELS,
  WORLD_IMPORTANCE_COLORS, WORLD_IMPORTANCE_LABELS,
  WORLD_EVENT_TYPE_CONFIG, WORLD_COUNTRY_JA,
} from '@/lib/bear-constants'

// ── Types ─────────────────────────────────────────────────────────────────
type ViewMode = 'japan' | 'world' | 'heat' | 'all'

interface MapClientProps {
  sightings: BearSighting[]
  historySightings?: BearSighting[]
  worldSightings?: WorldBearReport[]   // legacy (bear-world.json)
  worldReports?: WorldBearReportV2[]   // V2 (world-bear-report.json)
  centerLng?: number
  centerLat?: number
  zoom?: number
}

// ── Constants ─────────────────────────────────────────────────────────────
const VIEW_MODES: { key: ViewMode; label: string }[] = [
  { key: 'japan', label: '🇯🇵 日本' },
  { key: 'world', label: '🌍 WORLD' },
  { key: 'all',   label: '🗺 全表示' },
  { key: 'heat',  label: '🔥 ヒート' },
]

const COUNTRY_FLAGS: Record<string, string> = {
  // Japanese
  '日本': '🇯🇵', 'アメリカ': '🇺🇸', 'カナダ': '🇨🇦', 'ルーマニア': '🇷🇴',
  'ロシア': '🇷🇺', 'インド': '🇮🇳', '中国': '🇨🇳', '韓国': '🇰🇷',
  'イタリア': '🇮🇹', 'スウェーデン': '🇸🇪', 'フランス': '🇫🇷', 'スペイン': '🇪🇸',
  'ノルウェー': '🇳🇴', 'フィンランド': '🇫🇮', 'スイス': '🇨🇭', 'ポーランド': '🇵🇱',
  'ブルガリア': '🇧🇬', 'クロアチア': '🇭🇷', 'スロベニア': '🇸🇮',
  'スロバキア': '🇸🇰', 'チェコ': '🇨🇿', 'オーストリア': '🇦🇹', 'ギリシャ': '🇬🇷',
  'セルビア': '🇷🇸', 'トルコ': '🇹🇷', 'イラン': '🇮🇷', 'パキスタン': '🇵🇰',
  'ネパール': '🇳🇵', 'マレーシア': '🇲🇾', 'インドネシア': '🇮🇩', 'ブータン': '🇧🇹',
  'メキシコ': '🇲🇽', 'コロンビア': '🇨🇴', 'ペルー': '🇵🇪', 'ボリビア': '🇧🇴',
  'アルゼンチン': '🇦🇷',
  // English (V2)
  'Japan': '🇯🇵', 'USA': '🇺🇸', 'Canada': '🇨🇦', 'Romania': '🇷🇴',
  'Russia': '🇷🇺', 'India': '🇮🇳', 'China': '🇨🇳', 'South Korea': '🇰🇷',
  'Italy': '🇮🇹', 'Sweden': '🇸🇪', 'France': '🇫🇷', 'Spain': '🇪🇸',
  'Norway': '🇳🇴', 'Finland': '🇫🇮', 'Switzerland': '🇨🇭', 'Poland': '🇵🇱',
  'Bulgaria': '🇧🇬', 'Croatia': '🇭🇷', 'Slovenia': '🇸🇮',
  'Slovakia': '🇸🇰', 'Czech Republic': '🇨🇿', 'Austria': '🇦🇹', 'Greece': '🇬🇷',
  'Serbia': '🇷🇸', 'Turkey': '🇹🇷', 'Iran': '🇮🇷', 'Pakistan': '🇵🇰',
  'Nepal': '🇳🇵', 'Malaysia': '🇲🇾', 'Indonesia': '🇮🇩', 'Bhutan': '🇧🇹',
  'Mexico': '🇲🇽', 'Colombia': '🇨🇴', 'Peru': '🇵🇪', 'Bolivia': '🇧🇴',
  'Argentina': '🇦🇷', 'Ecuador': '🇪🇨', 'Venezuela': '🇻🇪', 'Greenland': '🇬🇱',
  'Estonia': '🇪🇪', 'Latvia': '🇱🇻', 'Belarus': '🇧🇾', 'Ukraine': '🇺🇦',
  'Bosnia': '🇧🇦', 'Kazakhstan': '🇰🇿', 'Mongolia': '🇲🇳', 'Thailand': '🇹🇭',
  'Vietnam': '🇻🇳', 'Myanmar': '🇲🇲', 'Sri Lanka': '🇱🇰', 'Taiwan': '🇹🇼',
  'Germany': '🇩🇪', 'United Kingdom': '🇬🇧',
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

// ── Mapbox Layer definitions ──────────────────────────────────────────────

// Japan — cluster bubbles
const clusterCircleLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step', ['get', 'point_count'],
      '#F59E0B', 5,
      '#F97316', 20,
      '#EF4444',
    ],
    'circle-radius': [
      'step', ['get', 'point_count'],
      20, 5, 26, 20, 34,
    ],
    'circle-stroke-width': 2.5,
    'circle-stroke-color': '#fff',
    'circle-opacity': 0.92,
  },
}

const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
  paint: { 'text-color': '#fff' },
}

// Japan — individual pins (danger_level colors for all, including history)
const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': [
      'match', ['get', 'danger_level'],
      3, '#EF4444',
      2, '#F97316',
      '#F59E0B',
    ],
    'circle-radius': [
      'match', ['get', 'danger_level'],
      3, 9,
      6,
    ],
    'circle-opacity': 0.9,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#fff',
  },
}

// World — cluster bubbles
const worldClusterLayer: LayerProps = {
  id: 'world-clusters',
  type: 'circle',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step', ['get', 'point_count'],
      '#3B82F6', 3,
      '#1E3A5F', 8,
      '#7C3AED',
    ],
    'circle-radius': [
      'step', ['get', 'point_count'],
      20, 3, 26, 8, 32,
    ],
    'circle-stroke-width': 2,
    'circle-stroke-color': 'rgba(255,255,255,0.8)',
    'circle-opacity': 0.9,
  },
}

const worldClusterCountLayer: LayerProps = {
  id: 'world-cluster-count',
  type: 'symbol',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 11,
  },
  paint: { 'text-color': '#fff' },
}

// World — individual points
const worldPointLayer: LayerProps = {
  id: 'world-point',
  type: 'circle',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': [
      'match', ['get', 'importance_level'],
      3, '#7C3AED',
      2, '#3B82F6',
      '#6B7280',
    ],
    'circle-radius': [
      'match', ['get', 'importance_level'],
      3, 10,
      2, 8,
      6,
    ],
    'circle-stroke-width': 2,
    'circle-stroke-color': '#fff',
    'circle-opacity': 0.92,
  },
}

// Enhanced heatmap (global — Japan + World combined)
// 半径・強度を小さくし、赤は本当の高密度エリアにのみ表示
const enhancedHeatmapLayer: LayerProps = {
  id: 'bears-heat',
  type: 'heatmap',
  paint: {
    'heatmap-weight': ['interpolate', ['linear'], ['get', 'heat_weight'], 0, 0.1, 3, 0.6],
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 0.4, 5, 1.0, 9, 2.0],
    'heatmap-color': [
      'interpolate', ['linear'], ['heatmap-density'],
      0,    'rgba(0,0,0,0)',
      0.1,  'rgba(33,102,172,0.55)',   // 青：極低密度
      0.3,  'rgba(94,201,124,0.7)',    // 緑：低密度
      0.5,  'rgba(245,203,92,0.82)',   // 黄：中密度
      0.7,  'rgba(249,115,22,0.9)',    // 橙：高密度
      0.88, 'rgba(239,68,68,0.95)',    // 赤：非常に高密度
      1.0,  'rgba(127,29,29,1)',       // 暗赤：極高密度（真のホットスポット）
    ],
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 6, 5, 16, 9, 32],
    'heatmap-opacity': 0.85,
  },
}

// ── Component ─────────────────────────────────────────────────────────────
export default function MapClient({
  sightings,
  historySightings = [],
  worldSightings = [],
  worldReports = [],
  centerLng = 137.0,
  centerLat = 36.5,
  zoom = 5,
}: MapClientProps) {
  // GBIFデータをクライアント側でフェッチ（RSCシリアライズ問題を回避）
  const [gbifSightings, setGbifSightings] = useState<GbifSighting[]>([])
  // V2 データを優先。なければ legacy にフォールバック
  const activeWorldReports = worldReports.length > 0 ? worldReports : null
  const [viewMode, setViewMode]       = useState<ViewMode>('japan')
  const [selectedId, setSelectedId]   = useState<string | null>(null)
  const [mapZoom, setMapZoom]         = useState(zoom)
  const [showWorldPanel, setShowWorldPanel] = useState(false)
  const [geocodedAddress, setGeocodedAddress] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geoCache = useRef<Record<string, string>>({})
  const mapRef = useRef<MapRef>(null)
  const token  = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  // モバイル判定
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // GBIFデータのフェッチ（WORLDモードに入った時点でロード）
  useEffect(() => {
    if (viewMode !== 'world' && viewMode !== 'all') return
    if (gbifSightings.length > 0) return  // 既にロード済み
    fetch('/data/bear-gbif.json')
      .then(r => r.ok ? r.json() : [])
      .then((d: GbifSighting[]) => setGbifSightings(d))
      .catch(() => {/* 取得失敗時は空のまま */})
  }, [viewMode, gbifSightings.length])

  // ── Derived data ──────────────────────────────────────────────────────
  const allJapanData = useMemo(
    () => [...sightings, ...historySightings],
    [sightings, historySightings],
  )

  const filteredJapanData = useMemo(() => allJapanData, [allJapanData])

  const historyIds = useMemo(
    () => new Set(historySightings.map((h) => h.id)),
    [historySightings],
  )

  const japanGeoJSON = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: filteredJapanData.map((s) => ({
      type: 'Feature' as const,
      properties: {
        id: s.id,
        danger_level: s.danger_level,
        is_history: historyIds.has(s.id) ? 1 : 0,
      },
      geometry: { type: 'Point' as const, coordinates: [s.lng, s.lat] },
    })),
  }), [filteredJapanData, historyIds])

  const worldGeoJSON = useMemo(() => {
    if (activeWorldReports) {
      return {
        type: 'FeatureCollection' as const,
        features: activeWorldReports.map((w) => ({
          type: 'Feature' as const,
          properties: {
            id: w.id,
            importance_level: w.importance_level,
            country: w.country,
            event_type: w.event_type,
          },
          geometry: { type: 'Point' as const, coordinates: [w.lng, w.lat] },
        })),
      }
    }
    return {
      type: 'FeatureCollection' as const,
      features: worldSightings.map((w) => ({
        type: 'Feature' as const,
        properties: { id: w.id, importance_level: w.importance_level, country: w.country },
        geometry: { type: 'Point' as const, coordinates: [w.lng, w.lat] },
      })),
    }
  }, [activeWorldReports, worldSightings])

  // Combined for heatmap (uses `heat_weight` property)
  // historySightings は除外 — 年フィルター済みの sightings のみ使用してホットスポットを明確化
  const heatGeoJSON = useMemo(() => {
    const jFeatures = sightings.map((s) => ({
      type: 'Feature' as const,
      properties: { heat_weight: s.danger_level },
      geometry: { type: 'Point' as const, coordinates: [s.lng, s.lat] },
    }))
    const worldSource = activeWorldReports ?? worldSightings
    const wFeatures = worldSource.map((w) => ({
      type: 'Feature' as const,
      properties: { heat_weight: w.importance_level },
      geometry: { type: 'Point' as const, coordinates: [w.lng, w.lat] },
    }))
    return { type: 'FeatureCollection' as const, features: [...jFeatures, ...wFeatures] }
  }, [sightings, activeWorldReports, worldSightings])

  // GBIF グローバル出現記録 GeoJSON（world/allモードで表示）
  const gbifGeoJSON = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: gbifSightings.map((g) => ({
      type: 'Feature' as const,
      properties: {
        id:           g.id,
        bear_type_ja: g.bear_type_ja,
        country_ja:   g.country_ja,
        date:         g.date,
      },
      geometry: { type: 'Point' as const, coordinates: [g.lng, g.lat] },
    })),
  }), [gbifSightings])

  // Country count table (Japan full count + World country counts)
  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = { '日本': allJapanData.length }
    const worldSource = activeWorldReports ?? worldSightings
    worldSource.forEach((w) => {
      const display = (WORLD_COUNTRY_JA[w.country] ?? w.country)
      counts[display] = (counts[display] || 0) + 1
    })
    return Object.entries(counts).sort(([, a], [, b]) => b - a)
  }, [allJapanData.length, activeWorldReports, worldSightings])

  const worldCount = activeWorldReports ? activeWorldReports.length : worldSightings.length

  const selectedJapan = useMemo(
    () => filteredJapanData.find((s) => s.id === selectedId) ?? null,
    [filteredJapanData, selectedId],
  )
  const selectedWorldV2 = useMemo(
    () => activeWorldReports?.find((w) => w.id === selectedId) ?? null,
    [activeWorldReports, selectedId],
  )
  const selectedWorldLegacy = useMemo(
    () => (activeWorldReports ? null : worldSightings.find((w) => w.id === selectedId) ?? null),
    [activeWorldReports, worldSightings, selectedId],
  )
  const selectedGbif = useMemo(
    () => gbifSightings.find((g) => g.id === selectedId) ?? null,
    [gbifSightings, selectedId],
  )

  const showJapanData = viewMode === 'japan' || viewMode === 'all'
  const showWorldData = viewMode === 'world' || viewMode === 'all'
  const showHeatmap   = viewMode === 'heat'

  const interactiveLayerIds = useMemo(() => {
    const ids: string[] = []
    if (showJapanData) ids.push('clusters', 'unclustered-point')
    if (showWorldData) ids.push('world-clusters', 'world-point')
    if (showWorldData && gbifSightings.length > 0) ids.push('gbif-cluster', 'gbif-point')
    return ids
  }, [showJapanData, showWorldData])

  // ── Event handlers ────────────────────────────────────────────────────
  const handleMapClick = useCallback((event: MapMouseEvent) => {
    const features = event.features
    if (!features?.length) { setSelectedId(null); return }
    const f = features[0]
    const layerId = f.layer?.id

    if (layerId === 'clusters' || layerId === 'world-clusters' || layerId === 'gbif-cluster') {
      const map = mapRef.current?.getMap()
      if (!map || !f.geometry) return
      const coords = (f.geometry as GeoJSON.Point).coordinates as [number, number]
      const clusterId = f.properties?.cluster_id
      const sourceId  = layerId === 'clusters' ? 'japan-data'
                      : layerId === 'gbif-cluster' ? 'gbif-data'
                      : 'world-data'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const src = map.getSource(sourceId) as any
      if (!src?.getClusterExpansionZoom) return
      src.getClusterExpansionZoom(clusterId)
        .then((z: number) => { map.flyTo({ center: coords, zoom: z + 0.3, duration: 600 }) })
        .catch(() => {})
    } else if (layerId === 'unclustered-point' || layerId === 'world-point' || layerId === 'gbif-point') {
      setSelectedId(f.properties?.id ?? null)
    }
  }, [])

  const handleMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap()
    if (!map) return
    map.getStyle()?.layers?.forEach((layer) => {
      if (layer.type === 'symbol') {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          map.setLayoutProperty(layer.id, 'text-field', ['coalesce', ['get', 'name_ja'], ['get', 'name']] as any)
        } catch { /* skip */ }
      }
    })
  }, [])

  // ── Reverse geocoding (住所精細化) ──────────────────────────────────────
  useEffect(() => {
    if (!selectedJapan || !token) {
      setGeocodedAddress(null)
      return
    }
    // キャッシュヒット確認（小数点4桁で丸めてキー）
    const key = `${selectedJapan.lat.toFixed(4)},${selectedJapan.lng.toFixed(4)}`
    if (key in geoCache.current) {
      setGeocodedAddress(geoCache.current[key] || null)
      return
    }
    setGeocodedAddress(null)
    // Mapbox reverse geocoding API
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${selectedJapan.lng},${selectedJapan.lat}.json?access_token=${token}&language=ja&types=neighborhood,locality,place&limit=1`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const feat = data?.features?.[0]
        if (!feat) return
        // contextから「neighborhood」か「locality」を取り出す
        const ctx: { id: string; text_ja?: string; text?: string }[] = feat.context ?? []
        const hood = ctx.find((c) => c.id.startsWith('neighborhood'))
        const local = ctx.find((c) => c.id.startsWith('locality'))
        const target = hood ?? local
        const name = target?.text_ja || target?.text
        // 既知の市名と重複しない場合のみ採用
        if (name && name !== selectedJapan.city && !selectedJapan.city.includes(name)) {
          geoCache.current[key] = name
          setGeocodedAddress(name)
        } else {
          // neighborhood がなければ place レベルのテキストを試みる
          const placeName = feat.text_ja || feat.text || ''
          if (placeName && placeName !== selectedJapan.city) {
            geoCache.current[key] = placeName
            setGeocodedAddress(placeName)
          } else {
            geoCache.current[key] = ''
          }
        }
      })
      .catch(() => setGeocodedAddress(null))
  }, [selectedJapan, token])

  // Camera on mode switch
  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map) return
    if (viewMode === 'world') {
      map.flyTo({ center: [-20, 30], zoom: 1.5, duration: 1200 })
    } else if (viewMode === 'all') {
      map.flyTo({ center: [80, 25], zoom: 1.5, duration: 1200 })
    } else if (viewMode === 'heat') {
      map.flyTo({ center: [centerLng, centerLat], zoom: 5, duration: 1200 })
    } else {
      map.flyTo({ center: [centerLng, centerLat], zoom, duration: 1000 })
    }
    setSelectedId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode])

  // World panel: fly to clicked item
  const flyToWorld = useCallback((w: WorldBearReport | WorldBearReportV2) => {
    setSelectedId(w.id)
    mapRef.current?.getMap().flyTo({ center: [w.lng, w.lat], zoom: 4, duration: 800 })
  }, [])

  // ── No token ──────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', background: '#F0F7F2',
        border: '2px dashed #A7C4B0', borderRadius: 8, gap: 12, padding: 32, textAlign: 'center',
      }}>
        <div style={{ fontSize: 40 }}>🗺</div>
        <p style={{ fontWeight: 700, fontSize: 16, color: '#143D1E', margin: 0 }}>
          地図を表示するにはMapboxトークンが必要です
        </p>
        <p style={{ fontSize: 13, color: '#5A5A55', margin: 0, maxWidth: 420, lineHeight: 1.7 }}>
          Vercel環境変数に{' '}
          <code style={{ background: '#E8F0EA', padding: '2px 6px', borderRadius: 3, fontSize: 12 }}>
            NEXT_PUBLIC_MAPBOX_TOKEN
          </code>{' '}
          を設定してください。
        </p>
      </div>
    )
  }

  // ── Hint text ─────────────────────────────────────────────────────────
  const hintText = (() => {
    if (viewMode === 'japan') {
      return mapZoom < 5
        ? '🔍 拡大するとクラスターが展開されます'
        : `📍 日本 ${filteredJapanData.length}件 表示中`
    }
    if (viewMode === 'world') return `🌍 世界 ${worldCount}件 ＋ 🔵GBIF ${gbifSightings.length.toLocaleString()}件 · ${countryCounts.length - 1}カ国`
    if (viewMode === 'all') return `📍 日本 ${filteredJapanData.length}件 ＋ 世界 ${worldCount}件 ＋ 🔵GBIF ${gbifSightings.length.toLocaleString()}件`
    return `🔥 ヒートマップ — ${heatGeoJSON.features.length}件`
  })()

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* ── Top-left: view mode + time filter ── */}
      <div style={{
        position: 'absolute', top: 12, left: 12, zIndex: 20,
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {/* View mode row */}
        <div style={{
          display: 'flex', background: '#fff', borderRadius: 6,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)', overflow: 'hidden',
        }}>
          {VIEW_MODES.map((mode) => (
            <button
              key={mode.key}
              onClick={() => setViewMode(mode.key)}
              style={{
                padding: '7px 11px', fontSize: 11, fontWeight: 700,
                border: 'none', cursor: 'pointer',
                borderRight: '1px solid #EFEFED',
                background: viewMode === mode.key
                  ? (mode.key === 'world' || mode.key === 'all' ? '#1E3A5F' : '#143D1E')
                  : '#fff',
                color: viewMode === mode.key ? '#fff' : '#5A5A55',
                transition: 'all 0.15s',
              }}
            >{mode.label}</button>
          ))}
        </div>

      </div>

      {/* ── Bottom-left: live count badge ── */}
      <div style={{
        position: 'absolute', bottom: 48, left: 12, zIndex: 20,
        display: 'flex', flexDirection: 'column', gap: 4, pointerEvents: 'none',
      }}>
        {/* Main count badge */}
        <div style={{
          background: 'rgba(15,46,22,0.88)', backdropFilter: 'blur(6px)',
          borderRadius: 6, padding: '6px 12px',
          border: '1px solid rgba(94,201,124,0.3)',
          display: 'flex', alignItems: 'baseline', gap: 5,
        }}>
          <span style={{
            fontSize: 18, fontWeight: 800, color: '#5EC97C',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            letterSpacing: '-0.02em', lineHeight: 1,
          }}>
            {(showJapanData ? filteredJapanData.length : 0) + (showWorldData ? worldCount : 0)}
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>件表示中</span>
        </div>
        {/* Sub hint */}
        <div style={{
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          borderRadius: 4, padding: '3px 8px', fontSize: 10,
          color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em',
        }}>
          {hintText}
        </div>
      </div>

      {/* ── Top-right: Legend (Japan / Heat mode) ── */}
      {(viewMode === 'japan' || viewMode === 'heat') && (
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 20,
          background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          {([1, 2, 3] as const).map((level) => (
            <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: DANGER_COLORS[level],
                border: '1.5px solid #fff', boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
              }} />
              <span style={{ fontSize: 11, color: '#333', fontWeight: 600 }}>
                {DANGER_LABELS[level]}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── World panel toggle button ── */}
      {(viewMode === 'world' || viewMode === 'all') && (
        isMobile ? (
          /* スマホ: 下部中央のピルボタン */
          <button
            onClick={() => setShowWorldPanel((v) => !v)}
            style={{
              position: 'absolute',
              bottom: showWorldPanel ? 'calc(60% + 8px)' : 52,
              left: '50%', transform: 'translateX(-50%)',
              zIndex: 25,
              background: showWorldPanel ? 'rgba(30,58,95,0.95)' : '#1E3A5F',
              color: '#fff', border: 'none', cursor: 'pointer',
              borderRadius: 20, padding: '8px 20px', fontSize: 12, fontWeight: 700,
              boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
              display: 'flex', alignItems: 'center', gap: 6,
              whiteSpace: 'nowrap',
              transition: 'bottom 0.3s',
            }}
          >
            {showWorldPanel ? '✕ 閉じる' : '🌍 ニュース一覧'}
          </button>
        ) : (
          /* PC: 右上ボタン（現行） */
          <button
            onClick={() => setShowWorldPanel((v) => !v)}
            style={{
              position: 'absolute', top: 12, right: showWorldPanel ? 298 : 12, zIndex: 25,
              background: '#1E3A5F', color: '#fff', border: 'none', cursor: 'pointer',
              borderRadius: 6, padding: '8px 12px', fontSize: 11, fontWeight: 700,
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)', transition: 'right 0.3s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {showWorldPanel ? '✕ 閉じる' : '🌍 ニュース一覧'}
          </button>
        )
      )}

      {/* ── World news side panel ── */}
      {(viewMode === 'world' || viewMode === 'all') && showWorldPanel && (
        <div style={isMobile ? {
          /* スマホ: ボトムシート（下から60%） */
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          zIndex: 15, background: 'rgba(10,20,35,0.97)', backdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          borderRadius: '14px 14px 0 0',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.5)',
        } : {
          /* PC: 右サイドパネル（現行） */
          position: 'absolute', top: 0, right: 0, width: 290, height: '100%',
          zIndex: 15, background: 'rgba(10,20,35,0.93)', backdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* スマホ用ドラッグハンドル */}
          {isMobile && (
            <div
              onClick={() => setShowWorldPanel(false)}
              style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                padding: '10px 0 4px', cursor: 'pointer', flexShrink: 0,
              }}
            >
              <div style={{
                width: 36, height: 4, borderRadius: 2,
                background: 'rgba(255,255,255,0.25)',
              }} />
            </div>
          )}
          {/* Panel header */}
          <div style={{
            padding: '14px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', marginBottom: 4 }}>
              WORLD BEAR REPORT
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              🌍 世界の熊情報データベース
            </div>
            {/* Country counts grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 6px' }}>
              {countryCounts.map(([country, count]) => (
                <div
                  key={country}
                  style={{
                    fontSize: 10, fontWeight: 700,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4, padding: '2px 7px',
                    color: 'rgba(255,255,255,0.75)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {COUNTRY_FLAGS[country] || '🌐'} {country} <span style={{ color: '#7DD3FC' }}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* World legend inside panel */}
          <div style={{
            padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', gap: 10,
          }}>
            {([1, 2, 3] as const).map((level) => (
              <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 2,
                  background: WORLD_IMPORTANCE_COLORS[level],
                }} />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
                  {WORLD_IMPORTANCE_LABELS[level]}
                </span>
              </div>
            ))}
          </div>

          {/* News list (scrollable) */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
            {(activeWorldReports
              ? [...activeWorldReports].sort((a, b) =>
                  b.importance_level !== a.importance_level
                    ? b.importance_level - a.importance_level
                    : b.date.localeCompare(a.date))
              : worldSightings
            ).map((w) => {
              const ev = 'event_type' in w ? WORLD_EVENT_TYPE_CONFIG[w.event_type] : null
              const displayCountry = WORLD_COUNTRY_JA[w.country] ?? w.country
              return (
                <div
                  key={w.id}
                  onClick={() => flyToWorld(w)}
                  style={{
                    padding: '10px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                    background: selectedId === w.id ? 'rgba(59,130,246,0.15)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedId !== w.id)
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    if (selectedId !== w.id)
                      (e.currentTarget as HTMLDivElement).style.background = 'transparent'
                  }}
                >
                  {/* Meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4, flexWrap: 'wrap' }}>
                    {ev && (
                      <span style={{
                        background: ev.color, color: '#fff', fontSize: 9, fontWeight: 700,
                        padding: '1px 6px', borderRadius: 3, whiteSpace: 'nowrap',
                      }}>
                        {ev.icon} {ev.label}
                      </span>
                    )}
                    <span style={{
                      background: WORLD_IMPORTANCE_COLORS[w.importance_level],
                      color: '#fff', fontSize: 9, fontWeight: 700,
                      padding: '1px 5px', borderRadius: 3,
                    }}>
                      {'❗'.repeat(w.importance_level)}
                    </span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                      {COUNTRY_FLAGS[w.country] || '🌐'} {displayCountry}
                    </span>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>
                      {formatDate(w.date)}
                    </span>
                  </div>
                  {/* Summary */}
                  <p style={{
                    fontSize: 11, color: 'rgba(255,255,255,0.82)', margin: '0 0 3px',
                    lineHeight: 1.5, display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {w.summary_ja}
                  </p>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                    🐻 {w.bear_type}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Map ── */}
      <Map
        ref={mapRef}
        mapboxAccessToken={token}
        initialViewState={{ longitude: centerLng, latitude: centerLat, zoom }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        onClick={handleMapClick}
        onLoad={handleMapLoad}
        onMove={(evt) => setMapZoom(evt.viewState.zoom)}
        interactiveLayerIds={interactiveLayerIds}
      >
        <NavigationControl position="bottom-right" />

        {/* Heatmap (Japan+World combined) */}
        {showHeatmap && (
          <Source id="heat-source" type="geojson" data={heatGeoJSON}>
            <Layer {...enhancedHeatmapLayer} />
          </Source>
        )}

        {/* Japan data — Mapbox native clustering */}
        {showJapanData && (
          <Source
            id="japan-data"
            type="geojson"
            data={japanGeoJSON}
            cluster
            clusterRadius={50}
            clusterMaxZoom={6}
          >
            <Layer {...clusterCircleLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
        )}

        {/* World data — Mapbox native clustering */}
        {showWorldData && (
          <Source
            id="world-data"
            type="geojson"
            data={worldGeoJSON}
            cluster
            clusterRadius={40}
            clusterMaxZoom={3}
          >
            <Layer {...worldClusterLayer} />
            <Layer {...worldClusterCountLayer} />
            <Layer {...worldPointLayer} />
          </Source>
        )}

        {/* GBIF グローバル出現記録（world/allモードで表示） */}
        {(viewMode === 'world' || viewMode === 'all') && gbifSightings.length > 0 && (
          <Source
            id="gbif-data"
            type="geojson"
            data={gbifGeoJSON}
            cluster
            clusterRadius={40}
            clusterMaxZoom={5}
          >
            {/* クラスター円（大きめ・明るい青） */}
            <Layer
              id="gbif-cluster"
              type="circle"
              source="gbif-data"
              filter={['has', 'point_count']}
              paint={{
                'circle-color': [
                  'step', ['get', 'point_count'],
                  '#3B82F6',   // 1〜9件: 青
                  10, '#1D4ED8', // 10〜: 濃い青
                  100, '#1E40AF', // 100〜: さらに濃い青
                ],
                'circle-radius': ['step', ['get', 'point_count'], 14, 10, 20, 100, 28],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#93C5FD',
                'circle-opacity': 0.9,
              }}
            />
            <Layer
              id="gbif-cluster-count"
              type="symbol"
              source="gbif-data"
              filter={['has', 'point_count']}
              layout={{
                'text-field': '{point_count_abbreviated}',
                'text-size': 11,
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              }}
              paint={{ 'text-color': '#fff' }}
            />
            {/* 単体の点 */}
            <Layer
              id="gbif-point"
              type="circle"
              source="gbif-data"
              filter={['!', ['has', 'point_count']]}
              paint={{
                'circle-color': '#60A5FA',
                'circle-radius': 5,
                'circle-stroke-width': 1.5,
                'circle-stroke-color': '#BFDBFE',
                'circle-opacity': 0.85,
              }}
            />
          </Source>
        )}

        {/* Japan sighting popup */}
        {selectedJapan && (() => {
          const gmapsUrl = `https://www.google.com/maps?q=${selectedJapan.lat},${selectedJapan.lng}&z=15`
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const raw = selectedJapan as any
          const sourceName = (raw.source_name || raw.source || '') as string
          const sourceUrl = selectedJapan.source_url || ''

          // 住所の組み立て: 都道府県 → 市区町村 → 逆ジオコーディング結果（より詳細な地名）
          const locationParts = [
            selectedJapan.prefecture,
            selectedJapan.city,
            geocodedAddress ?? undefined,
          ].filter(Boolean)
          const locationText = locationParts.join(' ')

          // タイトル: データにあれば使用、なければ場所＋種別のみ
          const displayTitle = selectedJapan.title
            || (selectedJapan.city
              ? `${selectedJapan.city}でクマ${selectedJapan.type}`
              : `${selectedJapan.prefecture} クマ${selectedJapan.type}`)

          return (
            <Popup
              latitude={selectedJapan.lat}
              longitude={selectedJapan.lng}
              onClose={() => setSelectedId(null)}
              closeButton
              closeOnClick={false}
              maxWidth="320px"
              anchor="bottom"
            >
              <div style={{ fontFamily: 'var(--font-noto-sans, sans-serif)', padding: '2px 0 4px' }}>

                {/* ── バッジ行 ── */}
                <div style={{ display: 'flex', gap: 5, marginBottom: 7, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{
                    background: DANGER_COLORS[selectedJapan.danger_level], color: '#fff',
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                  }}>
                    {DANGER_LABELS[selectedJapan.danger_level]}・{selectedJapan.type}
                  </span>
                  {selectedJapan.bear_type && (
                    <span style={{
                      background: '#F0F7F2', color: '#143D1E',
                      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                      border: '1px solid #C8E0CF',
                    }}>
                      🐻 {selectedJapan.bear_type}
                    </span>
                  )}
                </div>

                {/* ── タイトル ── */}
                <p style={{ fontWeight: 700, fontSize: 13, margin: '0 0 5px', color: '#1A1A16', lineHeight: 1.4 }}>
                  {displayTitle}
                </p>

                {/* ── 場所（逆ジオコード含む）＋日付 ── */}
                <p style={{ fontSize: 11, color: '#555', margin: '0 0 8px', lineHeight: 1.5 }}>
                  📍 {locationText}
                  {geocodedAddress === null && selectedJapan && (
                    // 取得中はドット表示
                    <span style={{ color: '#CCC', marginLeft: 4 }}>…</span>
                  )}
                  <br />
                  <span style={{ color: '#999', fontSize: 10 }}>{formatDate(selectedJapan.date)}</span>
                </p>

                {/* ── 状況説明（データにある場合のみ表示） ── */}
                {selectedJapan.description ? (
                  <p style={{
                    fontSize: 12, color: '#333', margin: '0 0 10px', lineHeight: 1.75,
                    borderTop: '1px solid #F0F0EE', paddingTop: 8,
                  }}>
                    {selectedJapan.description}
                  </p>
                ) : (
                  <div style={{ marginBottom: 8 }} />
                )}

                {/* ── アクションボタン ── */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <a
                    href={gmapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      background: '#F0F7F2', border: '1px solid #C8E0CF',
                      color: '#143D1E', fontSize: 10, fontWeight: 700,
                      padding: '5px 10px', borderRadius: 4, textDecoration: 'none',
                      flex: 1, justifyContent: 'center',
                    }}
                  >
                    🗺 地図で確認
                  </a>
                </div>

                {/* ── 情報源クレジット ── */}
                {sourceName && (
                  <p style={{ fontSize: 9, color: '#CCC', margin: '6px 0 0', textAlign: 'right' }}>
                    情報源：{sourceName}
                  </p>
                )}
              </div>
            </Popup>
          )
        })()}

        {/* World popup — V2 */}
        {selectedWorldV2 && (() => {
          const ev = WORLD_EVENT_TYPE_CONFIG[selectedWorldV2.event_type]
          const displayCountry = WORLD_COUNTRY_JA[selectedWorldV2.country] ?? selectedWorldV2.country
          return (
            <Popup
              latitude={selectedWorldV2.lat}
              longitude={selectedWorldV2.lng}
              onClose={() => setSelectedId(null)}
              closeButton closeOnClick={false}
              maxWidth="300px" anchor="bottom"
            >
              <div style={{ fontFamily: 'var(--font-noto-sans, sans-serif)', padding: '2px 0' }}>
                <div style={{ display: 'flex', gap: 5, marginBottom: 7, flexWrap: 'wrap' }}>
                  <span style={{
                    background: ev.color, color: '#fff',
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                  }}>
                    {ev.icon} {ev.label}
                  </span>
                  <span style={{
                    background: WORLD_IMPORTANCE_COLORS[selectedWorldV2.importance_level],
                    color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                  }}>
                    {WORLD_IMPORTANCE_LABELS[selectedWorldV2.importance_level]}
                  </span>
                </div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#1E3A5F', margin: '0 0 4px' }}>
                  {COUNTRY_FLAGS[selectedWorldV2.country] || '🌐'} {displayCountry} · {selectedWorldV2.region}
                  　{formatDate(selectedWorldV2.date)}
                </p>
                {selectedWorldV2.title_en && (
                  <p style={{ fontSize: 10, color: '#888', margin: '0 0 6px', fontStyle: 'italic', lineHeight: 1.4 }}>
                    {selectedWorldV2.title_en}
                  </p>
                )}
                <p style={{
                  fontSize: 12, color: '#333', margin: '0 0 8px', lineHeight: 1.7,
                  borderTop: '1px solid #F0F0EE', paddingTop: 8,
                }}>
                  {selectedWorldV2.summary_ja}
                </p>
                <p style={{ fontSize: 10, color: '#888', margin: '0 0 2px' }}>🐻 {selectedWorldV2.bear_type}</p>
                {selectedWorldV2.source_name && (
                  <p style={{ fontSize: 10, color: '#AAA', margin: 0 }}>出典：{selectedWorldV2.source_name}</p>
                )}
              </div>
            </Popup>
          )
        })()}

        {/* World popup — Legacy */}
        {/* GBIF 出現記録ポップアップ（GBIFデータの実フィールドのみ表示） */}
        {selectedGbif && (() => {
          const BASIS_LABELS: Record<string, string> = {
            HUMAN_OBSERVATION:   '人による目撃・観察',
            MACHINE_OBSERVATION: '機器による観測',
            OBSERVATION:         '観察記録',
            PRESERVED_SPECIMEN:  '標本記録',
            MATERIAL_SAMPLE:     'サンプル記録',
          }
          const basisLabel = BASIS_LABELS[selectedGbif.basis] ?? selectedGbif.basis
          const flag = COUNTRY_FLAGS[selectedGbif.country_ja] ?? '🌐'
          const dateStr = selectedGbif.date && selectedGbif.date !== '2000-01-01'
            ? selectedGbif.date.replace(/-/g, '/')
            : '日付不明'
          return (
            <Popup
              latitude={selectedGbif.lat}
              longitude={selectedGbif.lng}
              onClose={() => setSelectedId(null)}
              closeButton closeOnClick={false}
              maxWidth="280px" anchor="bottom"
            >
              <div style={{ fontFamily: 'var(--font-noto-sans, sans-serif)', padding: '4px 0' }}>
                {/* ヘッダー */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'center' }}>
                  <span style={{
                    background: '#1D4ED8', color: '#fff',
                    fontSize: 10, fontWeight: 700,
                    padding: '2px 8px', borderRadius: 3,
                  }}>
                    🌍 GBIF記録
                  </span>
                  <span style={{ fontSize: 11, color: '#555' }}>
                    🐻 {selectedGbif.bear_type_ja}
                  </span>
                </div>
                {/* 場所 */}
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1E3A5F', margin: '0 0 4px' }}>
                  {flag} {selectedGbif.country_ja}
                  {selectedGbif.region ? ` · ${selectedGbif.region}` : ''}
                </p>
                {/* 日付 */}
                <p style={{ fontSize: 11, color: '#888', margin: '0 0 8px' }}>
                  📅 {dateStr}
                </p>
                {/* 記録種別 */}
                <div style={{
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: 5, padding: '6px 10px',
                  marginBottom: 8,
                }}>
                  <p style={{ fontSize: 11, color: '#1E40AF', margin: 0 }}>
                    📋 {basisLabel}
                  </p>
                </div>
                {/* 出典リンク */}
                <a
                  href={selectedGbif.source_url}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 11, color: '#2563EB', textDecoration: 'none' }}
                >
                  GBIF詳細ページを見る →
                </a>
              </div>
            </Popup>
          )
        })()}

        {selectedWorldLegacy && (
          <Popup
            latitude={selectedWorldLegacy.lat}
            longitude={selectedWorldLegacy.lng}
            onClose={() => setSelectedId(null)}
            closeButton closeOnClick={false}
            maxWidth="300px" anchor="bottom"
          >
            <div style={{ fontFamily: 'var(--font-noto-sans, sans-serif)', padding: '2px 0' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{
                  background: WORLD_IMPORTANCE_COLORS[selectedWorldLegacy.importance_level],
                  color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                }}>
                  🌍 {WORLD_IMPORTANCE_LABELS[selectedWorldLegacy.importance_level]}
                </span>
                <span style={{ fontSize: 11, color: '#888' }}>{selectedWorldLegacy.type}</span>
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#1E3A5F', margin: '0 0 4px' }}>
                {COUNTRY_FLAGS[selectedWorldLegacy.country] || '🌐'} {selectedWorldLegacy.country} · {selectedWorldLegacy.region}
                　{formatDate(selectedWorldLegacy.date)}
              </p>
              <p style={{ fontSize: 12, color: '#333', margin: '0 0 8px', lineHeight: 1.7, borderTop: '1px solid #F0F0EE', paddingTop: 8 }}>
                {selectedWorldLegacy.summary_ja}
              </p>
              <p style={{ fontSize: 10, color: '#AAA', margin: 0 }}>出典：{selectedWorldLegacy.source_name}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  )
}
