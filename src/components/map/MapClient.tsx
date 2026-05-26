'use client'

import { useState, useCallback } from 'react'
import Map, { Marker, Popup, Source, Layer, NavigationControl } from 'react-map-gl/mapbox'
import type { LayerProps, MapLayerMouseEvent } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { BearSighting } from '@/lib/bear-constants'
import { DANGER_COLORS, DANGER_LABELS } from '@/lib/bear-constants'

interface MapClientProps {
  sightings: BearSighting[]
  centerLng?: number
  centerLat?: number
  zoom?: number
}

const heatmapLayer: LayerProps = {
  id: 'bears-heat',
  type: 'heatmap',
  paint: {
    'heatmap-weight': [
      'interpolate', ['linear'], ['get', 'danger_level'],
      1, 0.4,
      3, 1.0,
    ],
    'heatmap-intensity': 1.2,
    'heatmap-color': [
      'interpolate', ['linear'], ['heatmap-density'],
      0,   'rgba(0,0,0,0)',
      0.2, 'rgba(245,158,11,0.6)',
      0.5, 'rgba(249,115,22,0.8)',
      0.8, 'rgba(239,68,68,0.9)',
      1,   'rgba(185,28,28,1)',
    ],
    'heatmap-radius': 45,
    'heatmap-opacity': 0.75,
  },
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

export default function MapClient({
  sightings,
  centerLng = 137.0,
  centerLat = 36.5,
  zoom = 5,
}: MapClientProps) {
  const [viewMode, setViewMode] = useState<'pins' | 'heat'>('pins')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const selectedSighting = sightings.find((s) => s.id === selectedId) ?? null

  const geojson = {
    type: 'FeatureCollection' as const,
    features: sightings.map((s) => ({
      type: 'Feature' as const,
      properties: { id: s.id, danger_level: s.danger_level },
      geometry: { type: 'Point' as const, coordinates: [s.lng, s.lat] },
    })),
  }

  const handleMarkerClick = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedId((prev) => (prev === id ? null : id))
    },
    []
  )

  // 地図ロード後にすべてのシンボルレイヤーを日本語表示に切り替える
  const handleMapLoad = useCallback((event: { target: { getStyle: () => { layers?: { id: string; type: string }[] }; setLayoutProperty: (id: string, prop: string, value: unknown) => void } }) => {
    const map = event.target
    const layers = map.getStyle()?.layers
    if (!layers) return
    for (const layer of layers) {
      if (layer.type === 'symbol') {
        try {
          map.setLayoutProperty(layer.id, 'text-field', [
            'coalesce', ['get', 'name_ja'], ['get', 'name'],
          ])
        } catch {
          // text-field を持たないレイヤーはスキップ
        }
      }
    }
  }, [])

  if (!token) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F0F7F2',
          border: '2px dashed #A7C4B0',
          borderRadius: 8,
          gap: 12,
          padding: 32,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 40 }}>🗺</div>
        <p style={{ fontWeight: 700, fontSize: 16, color: '#143D1E', margin: 0 }}>
          地図を表示するにはMapboxトークンが必要です
        </p>
        <p style={{ fontSize: 13, color: '#5A5A55', margin: 0, maxWidth: 420, lineHeight: 1.7 }}>
          Vercel環境変数に <code style={{ background: '#E8F0EA', padding: '2px 6px', borderRadius: 3, fontSize: 12 }}>NEXT_PUBLIC_MAPBOX_TOKEN</code> を設定してください。
          <br />
          無料アカウント：
          <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" style={{ color: '#143D1E' }}>
            mapbox.com
          </a>
        </p>
        <p style={{ fontSize: 12, color: '#888', margin: 0 }}>
          ※ 下部の一覧から出没情報は確認できます
        </p>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* View mode toggle */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 10,
          display: 'flex',
          background: '#fff',
          borderRadius: 6,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          overflow: 'hidden',
        }}
      >
        {(['pins', 'heat'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            style={{
              padding: '7px 16px',
              fontSize: 12,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              background: viewMode === mode ? '#143D1E' : '#fff',
              color: viewMode === mode ? '#fff' : '#5A5A55',
              transition: 'all 0.2s',
            }}
          >
            {mode === 'pins' ? '📍 ピン' : '🔥 ヒートマップ'}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          background: '#fff',
          borderRadius: 6,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {([1, 2, 3] as const).map((level) => (
          <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: DANGER_COLORS[level],
                border: '1.5px solid #fff',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
              }}
            />
            <span style={{ fontSize: 11, color: '#333', fontWeight: 600 }}>
              {DANGER_LABELS[level]}
            </span>
          </div>
        ))}
      </div>

      <Map
        mapboxAccessToken={token}
        initialViewState={{ longitude: centerLng, latitude: centerLat, zoom }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        onClick={() => setSelectedId(null)}
        onLoad={handleMapLoad}
      >
        <NavigationControl position="bottom-right" />

        {/* Heatmap layer */}
        {viewMode === 'heat' && (
          <Source id="bears-source" type="geojson" data={geojson}>
            <Layer {...heatmapLayer} />
          </Source>
        )}

        {/* Pin markers */}
        {viewMode === 'pins' &&
          sightings.map((s) => (
            <Marker
              key={s.id}
              latitude={s.lat}
              longitude={s.lng}
              anchor="center"
            >
              <div
                onClick={(e) => handleMarkerClick(s.id, e)}
                title={s.title}
                style={{
                  width: s.danger_level === 3 ? 16 : 12,
                  height: s.danger_level === 3 ? 16 : 12,
                  borderRadius: '50%',
                  background: DANGER_COLORS[s.danger_level],
                  border: '2px solid #fff',
                  boxShadow: `0 0 0 1px ${DANGER_COLORS[s.danger_level]}88, 0 2px 6px rgba(0,0,0,0.3)`,
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.4)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)' }}
              />
            </Marker>
          ))}

        {/* Popup */}
        {selectedSighting && (
          <Popup
            latitude={selectedSighting.lat}
            longitude={selectedSighting.lng}
            onClose={() => setSelectedId(null)}
            closeButton
            closeOnClick={false}
            maxWidth="280px"
            anchor="bottom"
          >
            <div style={{ fontFamily: 'var(--font-noto-sans, sans-serif)', padding: '2px 0' }}>
              <div
                style={{
                  display: 'inline-block',
                  background: DANGER_COLORS[selectedSighting.danger_level],
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 3,
                  marginBottom: 6,
                }}
              >
                {DANGER_LABELS[selectedSighting.danger_level]}・{selectedSighting.type}
              </div>
              <p style={{ fontWeight: 700, fontSize: 13, margin: '0 0 4px', color: '#1A1A16', lineHeight: 1.4 }}>
                {selectedSighting.title}
              </p>
              <p style={{ fontSize: 11, color: '#888', margin: '0 0 6px' }}>
                📍 {selectedSighting.prefecture} {selectedSighting.city}
                　{formatDate(selectedSighting.date)}
              </p>
              <p style={{ fontSize: 12, color: '#444', margin: 0, lineHeight: 1.6 }}>
                {selectedSighting.description}
              </p>
              <p style={{ fontSize: 10, color: '#AAA', margin: '6px 0 0' }}>
                情報源：{selectedSighting.source_name}
              </p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  )
}
