const problemCards = [
  {
    bg: '#FEF3C7',
    iconColor: '#D97706',
    title: '出没件数の増加',
    text: '全国各地で熊や猪などの野生動物が集落・農地・ゴミ置き場へ出没する事案が増加しています。',
  },
  {
    bg: '#ECFDF5',
    iconColor: '#059669',
    title: '従来対策の限界',
    text: '熊鈴や唐辛子系対策は使用条件が限られ、すでに接近された後の対応では間に合わない場面も。',
  },
  {
    bg: '#EFF6FF',
    iconColor: '#2563EB',
    title: 'エリア管理の必要性',
    text: '農地・ゴミ置き場・倉庫・通学路など、人が常時立ち会えないエリアへの対策が求められています。',
  },
  {
    bg: '#FEF2F2',
    iconColor: '#DC2626',
    title: '環境・安全への配慮',
    text: '強刺激成分（OCガス・カプサイシン）は環境や人体への影響が懸念されることがあります。',
  },
]

const stats = [
  { num: '全国', label: '都道府県での出没報告あり' },
  { num: '3業種', label: '農業・林業・観光業で被害報告' },
  { num: '通年', label: '春〜秋を中心に年間を通じたリスク' },
  { num: '多用途', label: '屋外・農地・住宅周辺等で活用可能' },
]

export default function Problem() {
  return (
    <section
      className="fade-up"
      style={{ padding: '80px 24px', background: '#F8F8F6', borderTop: '3px solid #143D1E' }}
    >
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="section-label">PROBLEM</div>
        <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,30px)', marginBottom: 12 }}>
          野生動物との遭遇リスクは<br />身近なところに潜んでいます
        </h2>
        <p style={{ fontSize: 15, color: '#5A5A55', maxWidth: 600, lineHeight: 1.85 }}>
          近年、熊をはじめとした野生動物の人里への出没件数は増加傾向にあります。
          従来の対策の課題を踏まえ、KUMANUKEは「事前にエリアを守る」アプローチを提案します。
        </p>

        <div
          className="grid gap-5 mt-10"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))' }}
        >
          {problemCards.map((c) => (
            <div key={c.title} style={{ background: '#fff', border: '1px solid #DDDDD8', borderRadius: 6, padding: '24px 20px' }}>
              <div style={{ width: 40, height: 40, borderRadius: 6, background: c.bg, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke={c.iconColor} strokeWidth="1.5" />
                  <rect x="8.25" y="5.5" width="1.5" height="5" rx="0.75" fill={c.iconColor} />
                  <circle cx="9" cy="12.5" r="0.9" fill={c.iconColor} />
                </svg>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: '#1A1A16' }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: '#5A5A55', lineHeight: 1.75 }}>{c.text}</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          className="flex flex-wrap gap-8 mt-10 items-center justify-around"
          style={{ background: '#143D1E', borderRadius: 8, padding: '32px 36px' }}
        >
          {stats.map((s, i) => (
            <div key={s.num} className="flex items-center gap-8">
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-en)', fontSize: 32, fontWeight: 700, color: '#E07A30', display: 'block', lineHeight: 1 }}>
                  {s.num}
                </span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4, display: 'block' }}>{s.label}</span>
              </div>
              {i < stats.length - 1 && (
                <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.1)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
