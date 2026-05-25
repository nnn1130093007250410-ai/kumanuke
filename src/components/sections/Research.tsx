const RESEARCH_ITEMS = [
  {
    icon: '🌿',
    tag: '植物由来成分の研究知見',
    title: '天然由来の臭気成分と野生動物の行動変容',
    body: [
      '野生動物の嗅覚は人間の数百倍〜数千倍ともいわれており、特定の臭気刺激がその移動・生息域の選択に影響を与える可能性が、国内外の研究で報告されています。',
      'クマ類（ツキノワグマ・ヒグマ）は高度な嗅覚を持ち、食物探索や危険回避において臭気情報を優先的に活用するとされています。このような嗅覚特性に着目した忌避アプローチは、動物・人双方への負荷が低い対策手段として研究対象となっています。',
      'KUMANUKEは、こうした研究背景を参考に、植物由来成分をベースとした処方設計を行っています。ただし、製品の効果・安全性は使用状況・環境・個体差によって異なります。',
    ],
  },
  {
    icon: '🐻',
    tag: '野生動物対策の現状',
    title: '農業・山林・市街地における人獣共存の課題',
    body: [
      '農林水産省の統計によれば、野生鳥獣による農業被害額は毎年数百億円規模にのぼっています。クマ類については近年、里山への出没頻度が増加傾向にあり、農業被害・人身事故の双方が懸念される状況が続いています。',
      '従来の対策としては電気柵・猟・花火等の追い払い手法が主流でしたが、コスト・維持管理・倫理面での課題も指摘されています。こうした背景から、より導入しやすく環境負荷の低い予防型対策へのニーズが高まっています。',
      'エリア散布型の忌避アプローチは、事前に対象エリアに施用することで動物の侵入そのものを抑制しようとするコンセプトであり、捕獲・駆除に依存しない対策の選択肢として注目されています。',
    ],
  },
  {
    icon: '🌱',
    tag: '環境への配慮',
    title: '生態系・環境負荷を考慮した処方設計',
    body: [
      'OCガス（催涙性物質）やカプサイシン系成分は即効性が高い一方、散布エリアの生態系や土壌・水質への影響、施用者自身へのリスクも考慮する必要があります。',
      'KUMANUKEでは、植物由来成分を主体とした処方を採用し、直接的な刺激物質の使用を避ける設計としています。臭気による行動変容アプローチは、動物への物理的ストレスを最小化しつつ対策を試みる手法の一つです。',
      '製品の使用にあたっては、周辺の動植物・水源・土壌環境への影響を十分にご確認のうえ、用途・用量を守って適切にご使用ください。',
    ],
  },
]

export default function Research() {
  return (
    <section
      id="research"
      className="fade-up"
      style={{
        background: '#F8F7F2',
        padding: 'clamp(56px,8vw,96px) 0',
      }}
      aria-label="研究・科学的背景"
    >
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label" style={{ justifyContent: 'center' }}>
            SCIENTIFIC BACKGROUND
          </p>
          <h2 className="section-title" style={{ marginTop: 10 }}>
            研究知見・科学的背景
          </h2>
          <p style={{ color: '#888', fontSize: 13, marginTop: 12, lineHeight: 1.8 }}>
            ※ 以下の内容は、国内外の学術研究・公的機関の報告等を参考に記載しています。<br />
            製品の効果を保証するものではありません。
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {RESEARCH_ITEMS.map((item) => (
            <article
              key={item.tag}
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: '28px 24px',
                border: '1px solid #EAEAE6',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#143D1E',
                    background: 'rgba(20,61,30,0.07)',
                    padding: '3px 8px',
                    borderRadius: 2,
                  }}
                >
                  {item.tag}
                </span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A2D1C', lineHeight: 1.55, margin: 0 }}>
                {item.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {item.body.map((para, i) => (
                  <p key={i} style={{ fontSize: 13, color: '#555', lineHeight: 1.85, margin: 0 }}>
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            marginTop: 32,
            fontSize: 11,
            color: '#AAA',
            lineHeight: 1.8,
            textAlign: 'center',
            borderTop: '1px solid #E8E8E4',
            paddingTop: 24,
          }}
        >
          本ページに記載の研究関連情報は、一般的な学術情報の紹介を目的としたものです。
          特定の効果・効能を標榜・保証するものではありません。
          薬事法・景品表示法等の関係法令に基づき、適正な範囲での情報提供を心がけています。
        </p>
      </div>
    </section>
  )
}
