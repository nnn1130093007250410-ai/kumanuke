import Image from 'next/image'
import Link from 'next/link'

const TAGS = ['OCガス不使用', 'カプサイシン不使用', '植物由来成分', 'エリア散布型', '200ml']

export default function Hero() {
  return (
    <section
      className="mt-[92px]"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2,1fr)',
        background: '#0C2914',
        minHeight: '88vh',
      }}
      aria-label="ヒーローセクション"
    >
      {/* ===== Left: Copy ===== */}
      <div
        className="flex flex-col justify-center relative z-10"
        style={{ padding: 'clamp(40px,6vw,64px) clamp(20px,5vw,56px)' }}
      >
        {/* Badge */}
        <div
          className="flex items-center gap-2 w-fit mb-6 text-xs font-bold"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: 'rgba(255,255,255,0.7)',
            padding: '5px 12px',
            borderRadius: '2px',
            letterSpacing: '0.14em',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E07A30', display: 'inline-block', flexShrink: 0 }} />
          植物由来成分 ／ 国内企画・品質管理
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(20px,2.8vw,36px)',
            color: '#fff',
            lineHeight: 1.5,
            marginBottom: 8,
          }}
        >
          熊との遭遇を防ぐ、<br />
          <em style={{ fontStyle: 'normal', color: '#E07A30' }}>予防型対策</em>を。
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-en)',
            fontSize: 'clamp(28px,4.5vw,54px)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.08em',
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          KUMANUKE
        </p>

        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(12px,1.2vw,14px)',
            lineHeight: 1.85,
            marginBottom: 28,
            maxWidth: 400,
          }}
        >
          エリア散布型の野生動物対策スプレー。<br />
          植物由来成分を使用し、OCガス・カプサイシン不使用。<br />
          キャンプ・登山・農業・ゴミ置き場管理など<br />
          幅広い場面での事前対策としてご活用いただけます。
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((t) => (
            <span
              key={t}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.11)',
                color: 'rgba(255,255,255,0.65)',
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 2,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <a
            href="#wholesale"
            style={{
              background: '#E07A30',
              color: '#fff',
              fontWeight: 700,
              fontSize: 'clamp(12px,1.1vw,14px)',
              padding: '13px 24px',
              borderRadius: 4,
              textDecoration: 'none',
            }}
          >
            卸・法人向けお問い合わせ
          </a>
          <a
            href="#about"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 500,
              fontSize: 'clamp(12px,1.1vw,14px)',
              padding: '13px 20px',
              borderRadius: 4,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            製品詳細を見る
          </a>
        </div>

        {/* ④ MAP誘導 ── CTAの下に配置 */}
        <Link
          href="/map"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 20,
            paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            textDecoration: 'none',
            maxWidth: 'fit-content',
          }}
        >
          {/* ライブドット */}
          <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#5EC97C',
                animation: 'ping 1.6s cubic-bezier(0,0,0.2,1) infinite',
                opacity: 0.6,
              }}
            />
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#5EC97C',
              }}
            />
          </span>
          <span style={{ fontSize: 'clamp(11px,1vw,13px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
            📍 北海道・東北・北陸で出没急増中 —{' '}
            <span style={{ color: '#5EC97C', fontWeight: 700 }}>あなたの地域の状況を確認 →</span>
          </span>
        </Link>
      </div>

      {/* ===== Right: 使用シーン写真（フルブリード） ===== */}
      <div
        className="relative hidden md:block"
        style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', minHeight: 480 }}
        aria-hidden="true"
      >
        <Image
          src="/hero-scene.jpg"
          alt="田んぼ道でKUMANUKEを散布する場面"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        {/* グラデーションオーバーレイ（左端をなじませる） */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #0C2914 0%, transparent 18%)',
            pointerEvents: 'none',
          }}
        />
        {/* 下部グラデーション */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(12,41,20,0.5) 0%, transparent 40%)',
            pointerEvents: 'none',
          }}
        />
        {/* キャプション */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            color: 'rgba(255,255,255,0.75)',
            fontSize: 10,
            padding: '5px 10px',
            borderRadius: 3,
            letterSpacing: '0.08em',
          }}
        >
          農地・里山での使用イメージ
        </div>
      </div>

      {/* モバイル対応 */}
      <style>{`
        @media (max-width: 767px) {
          section[aria-label="ヒーローセクション"] {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
