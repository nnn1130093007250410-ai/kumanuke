import type { Metadata } from 'next'
import Link from 'next/link'
import MonitorForm from './MonitorForm'

export const metadata: Metadata = {
  title: '野生動物対策モニター施設募集 | KUMANUKE',
  description: 'キャンプ場・RVパーク・グランピング施設・山小屋など、KUMANUKEをモニター利用いただける施設を募集しています。実際の現場での使用データ収集にご協力ください。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/monitor' },
}

const FACILITIES = [
  { icon: '🏕️', label: 'キャンプ場', desc: '場内・周辺エリアへの散布' },
  { icon: '🚐', label: 'RVパーク',   desc: 'サイト周辺・ゴミ置き場' },
  { icon: '✨', label: 'グランピング施設', desc: 'テント・グランピングサイト' },
  { icon: '⛰️', label: '山小屋',     desc: '登山道・施設周辺' },
  { icon: '🌾', label: '農園・農地', desc: '畑・圃場の周辺散布' },
  { icon: '🏔️', label: '観光施設',   desc: '山岳・自然系観光スポット' },
  { icon: '🗑️', label: 'ゴミ集積所', desc: '集積所周辺の野生動物対策' },
  { icon: '🏗️', label: '倉庫・工場', desc: '山間・郊外施設の対策' },
]

const FAQS = [
  {
    q: '費用はかかりますか？',
    a: 'モニタープログラムへのご参加に費用は一切かかりません。詳細はお問い合わせいただいた後にご案内いたします。',
  },
  {
    q: 'モニター利用後に購入義務はありますか？',
    a: 'ございません。ご利用いただいた感想や写真のご提供をお願いするのみで、継続購入・追加注文のご要望は一切いたしません。',
  },
  {
    q: 'コメントの提供は必須ですか？',
    a: '簡単な感想（数行程度）をお願いしておりますが、詳細なレポートは不要です。「実際に使ってみてどうだったか」を率直にお聞かせいただければ十分です。',
  },
  {
    q: '写真の提供は必須ですか？',
    a: '写真は任意です。施設・場所・動物が特定されるような写真の提供は不要です。利用シーンのイメージが伝わる程度のお写真があれば大変ありがたいですが、なくてもご応募いただけます。',
  },
  {
    q: '施設名や場所は公開されますか？',
    a: '施設名・場所の掲載は必ず事前にご確認の上、同意いただいた場合のみ掲載します。「匿名でのご紹介のみ」「一切掲載不可」のご要望にも対応いたします。',
  },
  {
    q: '効果は保証されますか？',
    a: '本製品は野生動物との遭遇予防を目的としたエリア散布型スプレーです。すべての状況における効果を保証するものではありません。実際の利用環境や動物の個体差により効果は異なります。',
  },
  {
    q: '応募すれば全員に提供されますか？',
    a: '応募多数の場合は、利用環境・用途・地域などを考慮した上で弊社にて選考いたします。選考結果はメールにてご連絡します。ご了承ください。',
  },
  {
    q: '複数の利用場所がある場合はどうすればよいですか？',
    a: '応募フォームの「利用予定場所・状況」欄に詳しくご記載ください。内容を確認した上で、別途ご相談させていただきます。',
  },
  {
    q: 'どのような動物に効果がありますか？',
    a: '主にクマ（ツキノワグマ・ヒグマ）を対象とした野生動物対策スプレーですが、イノシシ・シカ・タヌキなど他の野生動物対策としての利用も想定しています。',
  },
  {
    q: '応募から提供まで、どのくらいかかりますか？',
    a: '選考通過後、弊社よりメールにてご連絡。ご住所確認後、1〜2週間を目安に発送いたします。',
  },
]

export default function MonitorPage() {
  return (
    <main style={{ background: '#F8F8F6', minHeight: '100vh', fontFamily: 'var(--font-noto-sans, sans-serif)' }}>

      {/* ── Nav ── */}
      <nav style={{ background: '#0F2E16', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 17, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.08em' }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <Link href="#form" style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: '#E07A30', padding: '7px 16px', borderRadius: 4, textDecoration: 'none' }}>
          応募する
        </Link>
      </nav>

      {/* ════════════════════════════════════
          1. FIRST VIEW
      ════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(160deg, #0B2410 0%, #143D1E 60%, #1A4D25 100%)', padding: 'clamp(64px,10vw,120px) 24px clamp(56px,8vw,100px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.2em', marginBottom: 20, border: '1px solid rgba(255,255,255,0.15)', padding: '4px 14px', borderRadius: 20 }}>
            KUMANUKE × モニタープログラム 2026
          </span>

          <h1 style={{ fontSize: 'clamp(24px,5vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 20, fontFamily: 'var(--font-noto-serif, serif)' }}>
            野生動物対策スプレー<br />
            <span style={{ color: '#5EC97C' }}>モニター施設を募集しています</span>
          </h1>

          <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.85, maxWidth: 580, margin: '0 auto 16px' }}>
            KUMANUKEを実際の現場でご利用いただける施設様を募集しています。<br />
            ご利用後の購入義務・継続契約は一切ありません。
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 40 }}>
            多様な環境・現場での実使用データの収集にご協力ください
          </p>

          <Link href="#form" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 800, fontSize: 16, padding: '18px 48px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.04em' }}>
            モニターに応募する →
          </Link>

          <div style={{ marginTop: 48, display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { value: '0円', label: '参加費用' },
              { value: '不要', label: '購入義務' },
              { value: '任意', label: '写真提供' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#5EC97C', fontFamily: 'var(--font-dm-sans)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          2. なぜ募集するのか
      ════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: 'clamp(56px,8vw,96px) 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.2em', marginBottom: 12 }}>WHY WE'RE ASKING</p>
          <h2 style={{ fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 700, color: '#0F2E16', marginBottom: 32, lineHeight: 1.4 }}>
            実際の現場の声を、<br />製品改善に活かしたい。
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,280px), 1fr))', gap: 20, marginBottom: 40 }}>
            {[
              {
                icon: '📈',
                title: 'クマ出没は過去最多水準',
                body: '2025年のクマ人身被害は238人・13人死亡と統計史上最多を記録。2026年も東北を中心に前年比2倍以上のペースで出没が続いています。',
              },
              {
                icon: '🏕️',
                title: '屋外施設での対策ニーズが高まっている',
                body: 'キャンプ場・農園・観光施設など、野外で事業を行う施設では野生動物対策が急務です。一方で、現場に合った「予防型」の対策グッズは普及していません。',
              },
              {
                icon: '🔬',
                title: '実際の現場データが必要',
                body: 'KUMANUKEは植物由来成分を使用したエリア散布型スプレーです。開発・改善には、多様な環境・利用シーンでの実使用データが不可欠です。',
              },
            ].map(item => (
              <div key={item.title} style={{ background: '#F8F8F6', border: '1px solid #EBEBEA', borderRadius: 10, padding: '22px 20px' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F2E16', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: '#5A5A55', lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#F0F7F2', border: '1px solid #C8DDD0', borderRadius: 10, padding: '20px 24px' }}>
            <p style={{ fontSize: 13, color: '#143D1E', lineHeight: 1.85, margin: 0 }}>
              <strong>このモニタープログラムは販売促進が目的ではありません。</strong><br />
              実際の施設・現場でKUMANUKEをご利用いただき、利用シーン・使い勝手・現場の声を収集することが目的です。
              いただいたご意見は製品改善・使い方ガイドの充実に活用させていただきます。
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          3. モニター内容
      ════════════════════════════════════ */}
      <section style={{ background: '#F8F8F6', padding: 'clamp(56px,8vw,96px) 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.2em', marginBottom: 12 }}>MONITOR DETAILS</p>
          <h2 style={{ fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 700, color: '#0F2E16', marginBottom: 40, lineHeight: 1.4 }}>
            モニター内容
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,340px), 1fr))', gap: 16 }}>
            {/* 弊社からご提供 */}
            <div style={{ background: '#fff', border: '2px solid #5EC97C', borderRadius: 12, padding: '28px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ background: '#5EC97C', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>弊社からご提供</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '🐻', text: 'KUMANUKE（200ml）のご提供' },
                  { icon: '📄', text: '利用方法・散布ガイドのご案内' },
                  { icon: '✉️', text: '利用前後のサポート対応' },
                ].map(item => (
                  <li key={item.text} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#333', lineHeight: 1.6 }}>
                    <span style={{ flexShrink: 0 }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* お願いしたいこと */}
            <div style={{ background: '#fff', border: '1px solid #DDDDD8', borderRadius: 12, padding: '28px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ background: '#E07A30', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>お願いしたいこと</span>
                <span style={{ fontSize: 11, color: '#888' }}>（負担を最小限にしています）</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '📍', text: '利用場所（施設名・エリア）の共有', required: true },
                  { icon: '💬', text: '簡単な感想（数行程度）', required: true },
                  { icon: '📷', text: '利用シーンのお写真（任意・匿名可）', required: false },
                  { icon: '✅', text: '施設名の掲載可否のご回答', required: true },
                ].map(item => (
                  <li key={item.text} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#333', lineHeight: 1.6, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0 }}>{item.icon}</span>
                    <span>
                      {item.text}
                      {!item.required && (
                        <span style={{ marginLeft: 6, fontSize: 10, background: '#F0F0EE', color: '#888', padding: '1px 6px', borderRadius: 3 }}>任意</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 注意事項 */}
          <div style={{ marginTop: 24, background: '#FFF9F0', border: '1px solid #F5C87A', borderRadius: 10, padding: '16px 20px' }}>
            <p style={{ fontSize: 12, color: '#7A5A00', lineHeight: 1.8, margin: 0 }}>
              <strong>ご注意</strong>｜本製品はすべての状況における効果を保証するものではありません。
              応募多数の場合は選考いたします。施設名の掲載は必ず事前にご確認・ご同意いただいた上で行います。
              ご利用後の継続購入・追加注文のご要望は一切いたしません。
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          4. 対象施設
      ════════════════════════════════════ */}
      <section style={{ background: '#0F2E16', padding: 'clamp(56px,8vw,96px) 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.2em', marginBottom: 12 }}>TARGET FACILITIES</p>
          <h2 style={{ fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.4 }}>
            このような施設を募集しています
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 40 }}>
            野生動物との共存が必要な環境であれば、業種は問いません。
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))', gap: 12 }}>
            {FACILITIES.map(f => (
              <div key={f.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '18px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{f.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              上記以外でも、野生動物対策を必要とする施設であればご相談ください。
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          5. よくある質問
      ════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: 'clamp(56px,8vw,96px) 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.2em', marginBottom: 12 }}>FAQ</p>
          <h2 style={{ fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 700, color: '#0F2E16', marginBottom: 40, lineHeight: 1.4 }}>
            よくあるご質問
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid #EBEBEA', padding: '22px 0' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, fontWeight: 800, color: '#5EC97C', fontSize: 16, lineHeight: 1, marginTop: 2 }}>Q</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0F2E16', margin: '0 0 8px', lineHeight: 1.5 }}>{faq.q}</p>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, fontWeight: 800, color: '#E07A30', fontSize: 14, lineHeight: 1, marginTop: 2 }}>A</span>
                      <p style={{ fontSize: 13, color: '#555', lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          6. 応募フォーム
      ════════════════════════════════════ */}
      <section id="form" style={{ background: '#F8F8F6', padding: 'clamp(56px,8vw,96px) 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.2em', marginBottom: 12 }}>APPLICATION</p>
          <h2 style={{ fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 700, color: '#0F2E16', marginBottom: 12, lineHeight: 1.4 }}>
            モニター応募フォーム
          </h2>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 36, lineHeight: 1.7 }}>
            以下のフォームよりご応募ください。内容を確認の上、弊社よりメールにてご連絡いたします。
            応募多数の場合は選考となります。あらかじめご了承ください。
          </p>

          <MonitorForm />

          <p style={{ fontSize: 11, color: '#AAA', marginTop: 20, textAlign: 'center', lineHeight: 1.7 }}>
            ご応募いただいた個人情報は、モニタープログラムの運営・連絡にのみ使用します。<br />
            第三者への提供は行いません。<Link href="/privacy" style={{ color: '#5EC97C' }}>プライバシーポリシー</Link>
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#0F2E16', padding: '32px 24px', textAlign: 'center' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 18, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.1em' }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>
          © 2026 BUBUWORKS合同会社　｜　<Link href="/privacy" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>プライバシーポリシー</Link>
        </p>
      </footer>

    </main>
  )
}
