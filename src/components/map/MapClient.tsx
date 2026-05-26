'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import Map, { Popup, Source, Layer, NavigationControl } from 'react-map-gl/mapbox'
import type { LayerProps, MapRef, MapMouseEvent } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { BearSighting, WorldBearReport } from '@/lib/bear-constants'
import { DANGER_COLORS, DANGER_LABELS, WORLD_IMPORTANCE_COLORS, WORLD_IMPORTANCE_LABELS } from '@/lib/bear-constants'

// ── Types ─────────────────────────────────────────────────────────────────
type ViewMode = 'japan' | 'world' | 'heat' | 'all'
type TimeFilter = '7d' | '30d' | '90d' | '1y' | 'all'

interface MapClientProps {
  sightings: BearSighting[]
  historySightings?: BearSighting[]
  worldSightings?: WorldBearReport[]
  centerLng?: number
  centerLat?: number
  zoom?: number
}

// ── Constants ─────────────────────────────────────────────────────────────
const TIME_FILTERS: { key: TimeFilter; label: string }[] = [
  { key: '7d',  label: '7日' },
  { key: '30d', label: '30日' },
  { key: '90d', label: '90日' },
  { key: '1y',  label: '1年' },
  { key: 'all', label: '全期間' },
]

const VIEW_MODES: { key: ViewMode; label: string }[] = [
  { key: 'japan', label: '🇯🇵 日本' },
  { key: 'world', label: '🌍 WORLD' },
  { key: 'all',   label: '🗺 全表示' },
  { key: 'heat',  label: '🔥 ヒート' },
]

const COUNTRY_FLAGS: Record<string, string> = {
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
}

function getCutoffDate(filter: TimeFilter): Date {
  const now = new Date()
  switch (filter) {
    case '7d':  return new Date(now.getTime() - 7  * 86400 * 1000)
    case '30d': return new Date(now.getTime() - 30 * 86400 * 1000)
    case '90d': return new Date(now.getTime() - 90 * 86400 * 1000)
    case '1y':  return new Date(now.getTime() - 365 * 86400 * 1000)
    case 'all': return new Date(0)
  }
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
const enhancedHeatmapLayer: LayerProps = {
  id: 'bears-heat',
  type: 'heatmap',
  paint: {
    'heatmap-weight': ['interpolate', ['linear'], ['get', 'heat_weight'], 0, 0.3, 3, 1.0],
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1.0, 9, 3.5],
    'heatmap-color': [
      'interpolate', ['linear'], ['heatmap-density'],
      0,   'rgba(0,0,0,0)',
      0.1, 'rgba(94,201,124,0.5)',
      0.3, 'rgba(245,203,92,0.75)',
      0.55,'rgba(249,115,22,0.88)',
      0.8, 'rgba(239,68,68,0.95)',
      1.0, 'rgba(127,29,29,1)',
    ],
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 20, 5, 38, 9, 60],
    'heatmap-opacity': 0.82,
  },
}

// ── Component ─────────────────────────────────────────────────────────────
export default function MapClient({
  sightings,
  historySightings = [],
  worldSightings = [],
  centerLng = 137.0,
  centerLat = 36.5,
  zoom = 5,
}: MapClientProps) {
  const [viewMode, setViewMode]       = useState<ViewMode>('japan')
  const [timeFilter, setTimeFilter]   = useState<TimeFilter>('all')
  const [selectedId, setSelectedId]   = useState<string | null>(null)
  const [mapZoom, setMapZoom]         = useState(zoom)
  const [showWorldPanel, setShowWorldPanel] = useState(true)
  const mapRef = useRef<MapRef>(null)
  const token  = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  // ── Derived data ──────────────────────────────────────────────────────
  const allJapanData = useMemo(
    () => [...sightings, ...historySightings],
    [sightings, historySightings],
  )

  const filteredJapanData = useMemo(() => {
    const cutoff = getCutoffDate(timeFilter)
    return allJapanData.filter((s) => new Date(s.date) >= cutoff)
  }, [allJapanData, timeFilter])

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

  const worldGeoJSON = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: worldSightings.map((w) => ({
      type: 'Feature' as const,
      properties: { id: w.id, importance_level: w.importance_level, country: w.country },
      geometry: { type: 'Point' as const, coordinates: [w.lng, w.lat] },
    })),
  }), [worldSightings])

  // Combined for heatmap (uses `heat_weight` property)
  const heatGeoJSON = useMemo(() => {
    const jFeatures = filteredJapanData.map((s) => ({
      type: 'Feature' as const,
      properties: { heat_weight: s.danger_level },
      geometry: { type: 'Point' as const, coordinates: [s.lng, s.lat] },
    }))
    const wFeatures = worldSightings.map((w) => ({
      type: 'Feature' as const,
      properties: { heat_weight: w.importance_level },
      geometry: { type: 'Point' as const, coordinates: [w.lng, w.lat] },
    }))
    return { type: 'FeatureCollection' as const, features: [...jFeatures, ...wFeatures] }
  }, [filteredJapanData, worldSightings])

  // Country count table (Japan full count + World country counts)
  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = { '日本': allJapanData.length }
    worldSightings.forEach((w) => { counts[w.country] = (counts[w.country] || 0) + 1 })
    return Object.entries(counts).sort(([, a], [, b]) => b - a)
  }, [allJapanData.length, worldSightings])

  const selectedJapan = useMemo(
    () => filteredJapanData.find((s) => s.id === selectedId) ?? null,
    [filteredJapanData, selectedId],
  )
  const selectedWorld = useMemo(
    () => worldSightings.find((w) => w.id === selectedId) ?? null,
    [worldSightings, selectedId],
  )

  const showJapanData = viewMode === 'japan' || viewMode === 'all'
  const showWorldData = viewMode === 'world' || viewMode === 'all'
  const showHeatmap   = viewMode === 'heat'

  const interactiveLayerIds = useMemo(() => {
    const ids: string[] = []
    if (showJapanData) ids.push('clusters', 'unclustered-point')
    if (showWorldData) ids.push('world-clusters', 'world-point')
    return ids
  }, [showJapanData, showWorldData])

  // ── Event handlers ────────────────────────────────────────────────────
  const handleMapClick = useCallback((event: MapMouseEvent) => {
    const features = event.features
    if (!features?.length) { setSelectedId(null); return }
    const f = features[0]
    const layerId = f.layer?.id

    if (layerId === 'clusters' || layerId === 'world-clusters') {
      const map = mapRef.current?.getMap()
      if (!map || !f.geometry) return
      const coords = (f.geometry as GeoJSON.Point).coordinates as [number, number]
      const clusterId = f.properties?.cluster_id
      const sourceId  = layerId === 'clusters' ? 'japan-data' : 'world-data'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const src = map.getSource(sourceId) as any
      if (!src?.getClusterExpansionZoom) return
      src.getClusterExpansionZoom(clusterId)
        .then((z: number) => { map.flyTo({ center: coords, zoom: z + 0.3, duration: 600 }) })
        .catch(() => {})
    } else if (layerId === 'unclustered-point' || layerId === 'world-point') {
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

  // Camera on mode switch
  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map) return
    if (viewMode === 'world') {
      map.flyTo({ center: [20, 30], zoom: 1.8, duration: 1200 })
    } else if (viewMode === 'all') {
      map.flyTo({ center: [80, 25], zoom: 1.5, duration: 1200 })
    } else if (viewMode === 'heat') {
      map.flyTo({ center: [20, 30], zoom: 1.8, duration: 1200 })
    } else {
      map.flyTo({ center: [centerLng, centerLat], zoom, duration: 1000 })
    }
    setSelectedId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode])

  // World panel: fly to clicked item
  const flyToWorld = useCallback((w: WorldBearReport) => {
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
    if (viewMode === 'world') return `🌍 世界 ${worldSightings.length}件 · ${countryCounts.length - 1}カ国`
    if (viewMode === 'all') return `📍 日本 ${filteredJapanData.length}件 ＋ 世界 ${worldSightings.length}件`
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

        {/* Time filter row */}
        <div style={{
          display: 'flex', background: '#fff', borderRadius: 6,
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)', overflow: 'hidden',
        }}>
          {TIME_FILTERS.map((tf) => (
            <button
              key={tf.key}
              onClick={() => setTimeFilter(tf.key)}
              style={{
                padding: '5px 9px', fontSize: 10, fontWeight: 700,
                border: 'none', cursor: 'pointer',
                borderRight: '1px solid #F0F0EE',
                background: timeFilter === tf.key ? '#143D1E' : '#fff',
                color: timeFilter === tf.key ? '#fff' : '#9A9A95',
                transition: 'all 0.15s',
              }}
            >{tf.label}</button>
          ))}
        </div>
      </div>

      {/* ── Bottom-left: hint text ── */}
      <div style={{
        position: 'absolute', bottom: 48, left: 12, zIndex: 20,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
        borderRadius: 5, padding: '5px 10px', fontSize: 10,
        color: 'rgba(255,255,255,0.85)', letterSpacing: '0.03em',
        pointerEvents: 'none',
      }}>
        {hintText}
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
          {timeFilter !== 'all' && (
            <div style={{
              borderTop: '1px solid #EFEFED', paddingTop: 6, marginTop: 2,
              fontSize: 10, color: '#9A9A95', fontWeight: 600,
            }}>
              🕐 {TIME_FILTERS.find(t => t.key === timeFilter)?.label}フィルター中
            </div>
          )}
        </div>
      )}

      {/* ── World panel toggle button ── */}
      {(viewMode === 'world' || viewMode === 'all') && (
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
      )}

      {/* ── World news side panel ── */}
      {(viewMode === 'world' || viewMode === 'all') && showWorldPanel && (
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 290, height: '100%',
          zIndex: 15, background: 'rgba(10,20,35,0.93)', backdropFilter: 'blur(10px)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
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
            {worldSightings.map((w) => (
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{
                    background: WORLD_IMPORTANCE_COLORS[w.importance_level],
                    color: '#fff', fontSize: 9, fontWeight: 700,
                    padding: '1px 6px', borderRadius: 3,
                  }}>
                    {WORLD_IMPORTANCE_LABELS[w.importance_level]}
                  </span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                    {COUNTRY_FLAGS[w.country] || '🌐'} {w.country}
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
                {/* Bear type */}
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                  🐻 {w.bear_type}
                </p>
              </div>
            ))}
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

        {/* Japan sighting popup */}
        {selectedJapan && (
          <Popup
            latitude={selectedJapan.lat}
            longitude={selectedJapan.lng}
            onClose={() => setSelectedId(null)}
            closeButton
            closeOnClick={false}
            maxWidth="290px"
            anchor="bottom"
          >
            <div style={{ fontFamily: 'var(--font-noto-sans, sans-serif)', padding: '2px 0' }}>
              <div style={{ display: 'flex', gap: 5, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{
                  background: DANGER_COLORS[selectedJapan.danger_level], color: '#fff',
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                }}>
                  {DANGER_LABELS[selectedJapan.danger_level]}・{selectedJapan.type}
                </span>
              </div>
              <p style={{ fontWeight: 700, fontSize: 13, margin: '0 0 4px', color: '#1A1A16', lineHeight: 1.4 }}>
                {selectedJapan.title}
              </p>
              <p style={{ fontSize: 11, color: '#888', margin: '0 0 6px' }}>
                📍 {selectedJapan.prefecture} {selectedJapan.city}　{formatDate(selectedJapan.date)}
              </p>
              <p style={{ fontSize: 12, color: '#444', margin: 0, lineHeight: 1.65 }}>
                {selectedJapan.description}
              </p>
              <p style={{ fontSize: 10, color: '#AAA', margin: '6px 0 0' }}>
                情報源：{selectedJapan.source_name}
              </p>
            </div>
          </Popup>
        )}

        {/* World sighting popup */}
        {selectedWorld && (
          <Popup
            latitude={selectedWorld.lat}
            longitude={selectedWorld.lng}
            onClose={() => setSelectedId(null)}
            closeButton
            closeOnClick={false}
            maxWidth="300px"
            anchor="bottom"
          >
            <div style={{ fontFamily: 'var(--font-noto-sans, sans-serif)', padding: '2px 0' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{
                  background: WORLD_IMPORTANCE_COLORS[selectedWorld.importance_level],
                  color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                }}>
                  🌍 {WORLD_IMPORTANCE_LABELS[selectedWorld.importance_level]}
                </span>
                <span style={{ fontSize: 11, color: '#888' }}>{selectedWorld.type}</span>
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#1E3A5F', margin: '0 0 4px' }}>
                {COUNTRY_FLAGS[selectedWorld.country] || '🌐'} {selectedWorld.country} · {selectedWorld.region}
                　{formatDate(selectedWorld.date)}
              </p>
              {selectedWorld.title_en && (
                <p style={{ fontSize: 10, color: '#888', margin: '0 0 6px', fontStyle: 'italic', lineHeight: 1.4 }}>
                  {selectedWorld.title_en}
                </p>
              )}
              <p style={{
                fontSize: 12, color: '#333', margin: '0 0 8px', lineHeight: 1.7,
                borderTop: '1px solid #F0F0EE', paddingTop: 8,
              }}>
                {selectedWorld.summary_ja}
              </p>
              <p style={{ fontSize: 10, color: '#888', margin: '0 0 2px' }}>🐻 {selectedWorld.bear_type}</p>
              {selectedWorld.source_name && (
                <p style={{ fontSize: 10, color: '#AAA', margin: 0 }}>出典：{selectedWorld.source_name}</p>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  )
}
