const SOURCE_BADGES = [
  { icon: '🏛', label: '政府機関' },
  { icon: '📡', label: 'ArcGIS REST API' },
  { icon: '🗺', label: '公式KMLデータ' },
] as const

export default function TrustBadge() {
  return (
    <details
      style={{
        display: 'inline-block',
        fontSize: 11,
        color: '#555',
        lineHeight: 1.5,
      }}
    >
      <summary
        style={{
          cursor: 'pointer',
          listStyle: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '2px 8px',
          border: '1px solid #d0d7de',
          borderRadius: 12,
          background: '#f6f8fa',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: 10, opacity: 0.7 }}>ℹ</span>
        このデータについて
      </summary>

      <div
        style={{
          marginTop: 6,
          padding: '8px 12px',
          border: '1px solid #d0d7de',
          borderRadius: 8,
          background: '#fafafa',
          minWidth: 220,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <p
          style={{
            margin: '0 0 6px',
            fontSize: 11,
            color: '#333',
            fontWeight: 500,
          }}
        >
          全国ArcGIS・自治体公開データから自動収集
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {SOURCE_BADGES.map(({ icon, label }) => (
            <span
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                padding: '2px 7px',
                border: '1px solid #d0d7de',
                borderRadius: 10,
                background: '#fff',
                fontSize: 11,
                color: '#444',
                whiteSpace: 'nowrap',
              }}
            >
              {icon} {label}
            </span>
          ))}
        </div>
      </div>
    </details>
  )
}
