const cautions = [
  '本製品は護身用品・武器ではありません。野生動物に接近・遭遇した際の護身目的では使用できません。',
  '人・動物・農作物に直接噴射しないでください。目・皮膚・粘膜への接触を避けてください。',
  '植物由来の精油を高濃度に配合しています。アレルギー体質の方・敏感肌の方は、ご使用前に成分をご確認ください。異常を感じた場合は使用を中止してください。',
  'すべての状況・野生動物の個体において効果を保証するものではありません。使用環境により効果は異なります。',
  '熊が出没した場所での単独行動・登山・キャンプは、行政・地元機関の指示に従ってください。本製品は公的な安全指示の代替となりません。',
  '子供の手の届かない場所で保管してください。誤飲・誤用の場合は医療機関へご相談ください。',
  '火気・高温の場所での使用・保管を避けてください。密閉された空間での大量散布は避けてください。',
  '品質保持期限の目安は製造から約3年です（保管状況・使用環境により変動）。製造日は製品底面をご確認ください。',
]

export default function Caution() {
  return (
    <section
      id="caution"
      className="fade-up"
      style={{ background: '#FEF9E7', borderTop: '4px solid #D97706', padding: '64px 24px' }}
    >
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 700, color: '#92400E', marginBottom: 20 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L2 16h16L10 2z" fill="#D97706" fillOpacity="0.3" stroke="#D97706" strokeWidth="1.5" />
            <rect x="9" y="8" width="2" height="5" rx="1" fill="#D97706" />
            <circle cx="10" cy="14.5" r="1" fill="#D97706" />
          </svg>
          重要事項・注意事項
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 12, marginTop: 24 }}>
          {cautions.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#fff', border: '1px solid #FDE68A', borderRadius: 6, padding: '14px 16px', fontSize: 13, color: '#78350F' }}>
              <span style={{ color: '#D97706', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>▶</span>
              <span>{c}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, background: '#fff', border: '1px solid #DDDDD8', borderRadius: 6, padding: '20px 20px', fontSize: 12, color: '#5A5A55', lineHeight: 1.85 }}>
          <strong>【免責事項】</strong><br />
          本製品は野生動物の寄り付き対策・遭遇予防を目的としたエリア散布型スプレーです。使用環境・天候・野生動物の個体差等により、効果の程度は異なります。本製品の使用により生じた損害・事故について、当社は合理的範囲を超える責任を負いかねます。熊の出没情報が発令されている地域での屋外活動については、行政・自治体の指示を最優先にしてください。本製品は「熊撃退スプレー」「護身用スプレー」とは異なる製品カテゴリです。
        </div>
      </div>
    </section>
  )
}
