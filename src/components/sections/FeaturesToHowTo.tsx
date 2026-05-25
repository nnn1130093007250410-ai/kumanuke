/* Features */
const features = [
  { icon: '🛡', title: 'OCガス・カプサイシン不使用', text: '強刺激成分を使用しない処方。目や粘膜への過度な刺激を避けた植物由来成分を採用しています。' },
  { icon: '⏱', title: '事前散布で時間・場所を選ばず対策', text: '農地・ゴミ置き場・テントサイト周辺に事前に散布。人がいない時間帯でも対策を維持できます。' },
  { icon: '🌿', title: '植物由来成分・香りベース', text: '自然由来の香気成分を活用した処方。環境への影響を考慮した成分構成を採用しています。' },
  { icon: '📍', title: '多目的エリア対応', text: 'テントサイト・農地周辺・ゴミ置き場・倉庫・通学路など、広範囲のエリアに対応します。' },
  { icon: '🧴', title: 'コンパクト200mlボトル', text: '持ち運びやすい200mlサイズ。バックパックに入れてキャンプや登山にも携帯できます。' },
  { icon: '✅', title: '国内企画・品質管理', text: '国内における企画・品質管理の体制のもと製造。成分と製造プロセスの安全性を重視しています。' },
]

export function Features() {
  return (
    <section className="fade-up" style={{ background: '#0C2914', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E07A30', marginBottom: 12 }}>FEATURES</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px,3vw,30px)', color: '#fff', lineHeight: 1.4, marginBottom: 12 }}>KUMANUKEの特徴</h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 580, lineHeight: 1.85, marginBottom: 40 }}>
          従来型対策とは異なる「エリアを守る」アプローチで、場所・時間を問わず事前対策を実現します。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 16 }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, padding: '24px 20px' }}
            >
              <div style={{ width: 44, height: 44, background: 'rgba(224,122,48,0.14)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, fontSize: 20 }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'

/* Scenes — 各シーン専用のストック写真を使用 */
const scenes: { label: string; title: string; text: string; src: string; pos: string; alt: string }[] = [
  {
    label: 'キャンプ', title: 'キャンプ・野営地',
    text: 'テントサイト周辺・食料保管エリアへの事前散布。就寝前のエリア対策として。',
    src: '/scene-camp.jpg', pos: 'center center',
    alt: 'テント内から森を見るキャンプシーン',
  },
  {
    label: '登山・山道', title: '登山・ハイキング',
    text: '登山口・休憩ポイント周辺への散布。山行前の事前対策として活用。',
    src: '/scene-hike.jpg', pos: 'center 40%',
    alt: '山岳トレイルを歩くハイカー',
  },
  {
    label: '農業・畑', title: '農地・畑の周囲',
    text: '農地外周・入口付近への定期散布。作物へのアクセス対策を目的とした継続使用に。',
    src: '/scene-farm.jpg', pos: 'center center',
    alt: '夕日の麦畑・農地',
  },
  {
    label: 'ゴミ置き場', title: 'ゴミ集積所・置き場',
    text: 'ゴミ置き場の周囲への定期散布。収集日前日など特に対策が必要な時間帯に。',
    src: '/scene-trash.jpg', pos: 'center center',
    alt: '山に隣接する住宅地・夜間の動物侵入対策',
  },
  {
    label: '倉庫・施設', title: '倉庫・農業施設',
    text: '倉庫の出入口・換気口周辺への散布。食品・農産物を保管する施設の対策として。',
    src: '/scene-warehouse.jpg', pos: 'center center',
    alt: '農産物を保管する農業施設',
  },
  {
    label: '通学路・生活道路', title: '通学路・山間道路',
    text: '山沿いの通学路や生活道路の周辺への散布。行政・自治会での活用にも。',
    src: '/scene-road.jpg', pos: 'center center',
    alt: '山林を抜ける山間道路',
  },
]

export function Scenes() {
  return (
    <section id="scenes" style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="section-label">USE CASES</div>
        <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,30px)', marginBottom: 14 }}>使用シーン</h2>
        <p style={{ fontSize: 15, color: '#5A5A55', lineHeight: 1.85, marginBottom: 36 }}>
          幅広いシーンでの野生動物の寄り付き対策・遭遇予防の事前散布としてご活用いただけます。
        </p>

        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {scenes.map((s) => (
            <div key={s.title} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #DDDDD8', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              {/* 写真エリア */}
              <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  style={{ objectFit: 'cover', objectPosition: s.pos }}
                />
                {/* ラベルオーバーレイ */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
                  pointerEvents: 'none',
                }} />
                <span style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 12,
                  background: '#143D1E',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 9px',
                  borderRadius: 3,
                }}>
                  {s.label}
                </span>
              </div>
              {/* テキスト */}
              <div style={{ padding: '14px 16px', background: '#fff' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1A1A16', marginBottom: 5 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: '#5A5A55', lineHeight: 1.7 }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Ingredients */
const ingredients = [
  { name: '植物由来香気成分（主成分）', text: '天然植物から抽出・精製した香気成分を主体としています。野生動物の忌避反応に関連するとされる植物由来の成分を活用しています。' },
  { name: '分散安定化補助成分', text: '主成分の揮散・拡散を補助するための成分を配合。エリア全体への均一な散布をサポートします。' },
  { name: '溶媒・精製水', text: '成分を安定させるための溶媒と精製水を使用。製品の品質安定性を確保します。' },
]
const noUse = ['OCガス（オレオレジンカプシカム）', 'カプサイシン・唐辛子系成分', '化学合成の強刺激忌避剤']
const specs = [
  ['内容量', '200ml'],
  ['タイプ', 'エリア散布型スプレー'],
  ['主な対象動物', '熊・猪・鹿等 野生動物'],
  ['成分', '植物由来成分（香気系）'],
  ['企画・品質管理', '国内'],
]

export function Ingredients() {
  return (
    <section className="fade-up" style={{ background: '#F8F8F6', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="section-label">INGREDIENTS</div>
        <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,30px)', marginBottom: 14 }}>成分について</h2>
        <p style={{ fontSize: 15, color: '#5A5A55', maxWidth: 600, lineHeight: 1.85, marginBottom: 40 }}>
          KUMANUKEは植物由来の香気成分を主体とした処方を採用。刺激の強い化学合成成分の使用を避け、エリア対策に特化した配合設計です。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 48, alignItems: 'start' }}>
          <div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {ingredients.map((it) => (
                <li key={it.name} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '1px solid #EFEFED', alignItems: 'flex-start' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1F5C2E', marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: 14, color: '#1A1A16', marginBottom: 4 }}>{it.name}</strong>
                    <p style={{ fontSize: 13, color: '#5A5A55', lineHeight: 1.75 }}>{it.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ background: '#EFF5F0', border: '1px solid #C8DFC9', borderLeft: '3px solid #1F5C2E', borderRadius: '0 6px 6px 0', padding: '18px 18px', marginTop: 20 }}>
              <p style={{ fontSize: 13, color: '#143D1E', lineHeight: 1.8 }}>
                <strong>研究・参考情報：</strong>野生動物の忌避に関する研究において、特定の植物由来揮発性成分が動物の行動に影響を与える可能性が示唆されています（各国研究機関による文献より参考）。KUMANUKEはこれらの研究知見を参考に開発されていますが、すべての状況・個体において同等の効果を保証するものではありません。
              </p>
            </div>
          </div>
          <div>
            <div style={{ background: '#fff', border: '1px solid #DDDDD8', borderRadius: 8, padding: '24px 20px', marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1A1A16', marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid #EFEFED' }}>
                ⚠ 以下の成分は使用していません
              </h3>
              {noUse.map((n) => (
                <div key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #EFEFED', fontSize: 13 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FEF2F2', border: '1px solid #FCA5A5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#DC2626', fontWeight: 700, flexShrink: 0 }}>✕</div>
                  <span style={{ color: '#5A5A55' }}>{n}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', border: '1px solid #DDDDD8', borderRadius: 8, padding: '20px' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 12 }}>製品仕様</h3>
              <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                <tbody>
                  {specs.map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: '1px solid #EFEFED' }}>
                      <td style={{ padding: '8px 0', color: '#5A5A55', width: '45%' }}>{k}</td>
                      <td style={{ padding: '8px 0', fontWeight: 600, color: '#1A1A16' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Comparison */
type Row = { label: string; kumanuke: boolean; area: string; stim: string; prev: string; carry: string; cost: string }
const rows: Row[] = [
  { label: 'KUMANUKE',       kumanuke: true,  area: '○',           stim: '植物由来のみ',  prev: '○',          carry: '高い（200ml）', cost: '低〜中' },
  { label: '熊鈴・音対策',   kumanuke: false, area: '△',           stim: 'なし',          prev: '△（同行者のみ）', carry: '高い',    cost: '低い' },
  { label: '唐辛子系忌避剤', kumanuke: false, area: '○',           stim: 'あり（強）',    prev: '○',          carry: '中程度',       cost: '中程度' },
  { label: 'OCガス系スプレー', kumanuke: false, area: '△（接触型）', stim: 'あり（強）',   prev: '✕（護身用）', carry: '高い',        cost: '中程度' },
  { label: '電気柵',         kumanuke: false, area: '◎（固定区域）', stim: 'なし',         prev: '◎',          carry: '低い',         cost: '高い' },
  { label: '一般的化学忌避剤', kumanuke: false, area: '○',          stim: 'あり（中）',    prev: '○',          carry: '中程度',       cost: '中程度' },
]
const heads = ['対策の種類', 'エリア散布', '刺激成分', '事前対策', '携帯性', 'コスト']

export function Comparison() {
  return (
    <section className="fade-up" style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="section-label">COMPARISON</div>
        <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,30px)', marginBottom: 14 }}>他の野生動物対策との比較</h2>
        <p style={{ fontSize: 15, color: '#5A5A55', maxWidth: 600, lineHeight: 1.85, marginBottom: 40 }}>
          各種対策の特性を参考として整理しています。使用環境・目的に応じてご検討ください。
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', fontSize: 13, minWidth: 560 }}>
            <thead>
              <tr>
                {heads.map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: '11px 14px',
                      textAlign: i === 0 ? 'left' : 'center',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.label}
                  style={r.kumanuke ? {
                    background: '#EFF7F0',
                    outline: '2px solid #143D1E',
                    outlineOffset: '-2px',
                  } : {}}
                >
                  <td style={{
                    padding: '11px 14px',
                    fontWeight: 700,
                    color: r.kumanuke ? '#143D1E' : '#1A1A16',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    {r.kumanuke && (
                      <span style={{
                        background: '#143D1E',
                        color: '#fff',
                        fontSize: 9,
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: 3,
                        letterSpacing: '0.05em',
                        flexShrink: 0,
                      }}>当製品</span>
                    )}
                    {r.label}
                  </td>
                  {[r.area, r.stim, r.prev, r.carry, r.cost].map((v, i) => {
                    const good = v === '○' || v === '◎' || v === 'なし' || v === '高い' || v === '高い（200ml）' || v === '低い' || v === '低〜中' || v === '植物由来のみ'
                    const bad = v === '✕（護身用）' || v === 'あり（強）' || v === '△（接触型）'
                    return (
                      <td
                        key={i}
                        style={{
                          padding: '11px 14px',
                          textAlign: 'center',
                          color: good ? '#16a34a' : bad ? '#dc2626' : '#5A5A55',
                          fontWeight: (good || bad) ? 700 : 400,
                        }}
                      >
                        {v}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: '#9A9A95', marginTop: 10 }}>
          ※上記は一般的な特性の参考比較です。使用環境・個体差により効果は異なります。当社調べ。
        </p>
      </div>
    </section>
  )
}

/* HowToUse */
const steps = [
  { num: '01', title: 'エリアを確認', text: '対策したいエリアの範囲・面積を確認します。テントサイト・農地周辺・ゴミ置き場など。' },
  { num: '02', title: '境界ラインに散布', text: 'エリアの外周・入口・侵入経路となりやすい場所に重点的にスプレーします。' },
  { num: '03', title: '地面・草木へも散布', text: '地面・草木・柵など、動物が接触しやすい箇所にもムラなく散布します。' },
  { num: '04', title: '定期的に再散布', text: '雨や時間経過により効果が薄れる場合があります。定期的な再散布をお勧めします。' },
]

export function HowToUse() {
  return (
    <section className="fade-up" style={{ background: '#0C2914', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-en)', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E07A30', marginBottom: 12 }}>HOW TO USE</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px,3vw,30px)', color: '#fff', lineHeight: 1.4, marginBottom: 14 }}>使用方法</h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 580, lineHeight: 1.85, marginBottom: 40 }}>
          事前にエリアへ散布することで、野生動物の寄り付き対策を行います。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ padding: '28px 20px', position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-en)', fontSize: 38, fontWeight: 700, color: 'rgba(255,255,255,0.05)', lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
              <div style={{ width: 44, height: 44, background: 'rgba(224,122,48,0.14)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 20 }}>
                {['📍', '💨', '🌿', '🔄'][i]}
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{s.text}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '18px 22px', marginTop: 32, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          <strong style={{ color: 'rgba(255,255,255,0.75)' }}>散布のポイント：</strong>
          風向きを考慮してエリア外周に散布。降雨前後・定期的（目安：1〜2週間ごと）の再散布により対策を維持してください。使用環境・天候により効果の持続時間は異なります。
        </div>

        {/* 使い方 3STEP 画像 */}
        <div className="fade-up" style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', marginTop: 40 }}>
          <Image
            src="/howto.jpg"
            alt="KUMANUKEの使い方3ステップ：振る・地面に向けて構える・シュッと吹く"
            width={1040}
            height={520}
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </section>
  )
}
