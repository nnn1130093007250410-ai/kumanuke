import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '環境省クマ被害データ＆発表まとめ | KUMANUKE',
  description:
    '環境省が公表するクマによる人身被害件数・出没情報・捕獲数の統計データ、対策パッケージ・ロードマップ、最新お知らせを分かりやすく整理したページ。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/data' },
  openGraph: {
    title: '環境省クマ被害データ＆発表まとめ | KUMANUKE',
    description: '環境省公式データをもとにクマ被害の推移・対策・最新情報を整理。',
    url: 'https://kumanuke.bubuworks.co.jp/data',
  },
}

// ═══════════════════════════════════════════════════════════
//  ★ 更新ガイド
//  ・LAST_UPDATED   → 更新した日付に変更
//  ・LATEST_DOCS    → PDFの日付とサイズを最新に
//  ・ANNUAL_INJURY  → 各年度の人身被害件数（確定後に数値を入力）
//  ・ANNOUNCEMENTS  → 新しいお知らせを先頭に追加
//  ・CABINET_MEETINGS → 閣僚会議を追加
//  ・POLICY_DOCS    → 対策文書を追加
// ═══════════════════════════════════════════════════════════

const LAST_UPDATED = '令和8年5月25日'
const SOURCE_URL = 'https://www.env.go.jp/nature/choju/effort/effort12/effort12.html'

// ── 最新速報値ドキュメント ─────────────────────────────────────
const LATEST_DOCS = [
  {
    id: 'deaths',
    icon: '⚠️',
    label: '死亡事故件数等',
    asOf: '令和8年5月25日時点',
    note: '令和8年の事故概要・緊急銃猟状況',
    pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r08jiko-gaiyo.pdf',
    pdfDate: 'R8.5.25',
    pdfSize: '116KB',
    color: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
    summary: [
      '令和8年の死亡事故：3件（5/25時点）',
      '① 4/21 岩手県紫波町（ツキノワグマ・1名死亡）',
      '② 5/5 山形県酒田市（ツキノワグマ・1名死亡）',
      '③ 5/7 岩手県八幡平市（ツキノワグマ・1名死亡）',
    ],
  },
  {
    id: 'injury',
    icon: '🩺',
    label: '人身被害件数',
    asOf: '令和8年4月まで速報値',
    note: '都道府県別・月別の被害状況',
    pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r08injury-qe.pdf',
    pdfDate: 'R8.5.15',
    pdfSize: '878KB',
    color: '#EA580C',
    bg: '#FFF7ED',
    border: '#FED7AA',
    summary: [
      '令和8年4月累計：6件・被害者6人・死亡1人',
      '4月の都道府県別：北海道1・岩手2（死亡1含む）・福島2・富山1',
    ],
  },
  {
    id: 'sighting',
    icon: '👁️',
    label: '出没情報',
    asOf: '令和8年3月まで速報値',
    note: '都道府県別・月別の出没件数',
    pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/syutubotu.pdf',
    pdfDate: 'R8.5.11',
    pdfSize: '995KB',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
    summary: [
      '令和8年3月までの都道府県別・月別出没件数を収録',
      '詳細は各都道府県ごとの表で確認可能',
    ],
  },
  {
    id: 'capture',
    icon: '🐻',
    label: '許可捕獲数',
    asOf: '令和8年3月まで速報値',
    note: '都道府県別の許可捕獲頭数',
    pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/capture-qe.pdf',
    pdfDate: 'R8.5.11',
    pdfSize: '806KB',
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    summary: [
      '平成20年〜令和7年の都道府県別許可捕獲数を収録',
      '令和7年度は速報値として掲載',
    ],
  },
  {
    id: 'emergency',
    icon: '🔫',
    label: '緊急銃猟実施状況',
    asOf: '令和8年5月25日時点',
    note: '都道府県別の緊急銃猟実績',
    pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r08kinkyu-jishi.pdf',
    pdfDate: 'R8.5.25',
    pdfSize: '377KB',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    summary: [
      '令和8年の緊急銃猟：計10件（5/25時点）',
      '主にツキノワグマ（東北・北陸中心）、1件ヒグマ（北海道）',
      '最新：5/24 北海道士別市（ヒグマ）',
    ],
  },
]

// ── 年別人身被害件数（環境省PDFより） ──────────────────────────
// ※ null の年度は速報中・未確定。PDFを確認後に数値を入力してください。
const ANNUAL_INJURY: {
  year: string
  yearEn: string
  count: number | null
  status: 'confirmed' | 'provisional' | 'pending'
  pdfUrl: string
  note?: string
}[] = [
  { year: 'H29', yearEn: '2017', count: 50,  status: 'confirmed',   pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/h29injury-qe.pdf' },
  { year: 'H30', yearEn: '2018', count: 90,  status: 'confirmed',   pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/h30injury-qe.pdf' },
  { year: 'R1',  yearEn: '2019', count: 158, status: 'confirmed',   pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r01injury-qe.pdf' },
  { year: 'R2',  yearEn: '2020', count: 86,  status: 'confirmed',   pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r02injury-qe.pdf' },
  { year: 'R3',  yearEn: '2021', count: 97,  status: 'confirmed',   pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r03injury-qe.pdf' },
  { year: 'R4',  yearEn: '2022', count: 109, status: 'confirmed',   pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r04injury-qe.pdf' },
  { year: 'R5',  yearEn: '2023', count: 219, status: 'confirmed',   pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r05injury-qe.pdf', note: '過去最多' },
  { year: 'R6',  yearEn: '2024', count: 163, status: 'confirmed',   pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r06injury-qe.pdf' },
  { year: 'R7',  yearEn: '2025', count: 238, status: 'confirmed',   pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r07injury-qe.pdf', note: '過去最多' },
  { year: 'R8',  yearEn: '2026', count: null, status: 'pending',     pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/r08injury-qe.pdf', note: '速報中' },
]

// ── 最新お知らせ ───────────────────────────────────────────────
// ※ 新しいものを先頭に追加してください
const ANNOUNCEMENTS = [
  {
    date: 'R8.5.25',
    title: 'クマ被害対策等関係情報のお知らせ（令和8年5月25日）',
    url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-oshirase-r080525.html',
    isNew: true,
  },
  {
    date: 'R8.2.12',
    title: '猟銃購入に関する財政支援について（令和8年2月12日）',
    url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-oshirase-r080212.html',
    isNew: false,
  },
  {
    date: 'R7.12.23',
    title: 'クマ被害対策等関係情報のお知らせ（令和7年12月23日）',
    url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-oshirase-r071223.html',
    isNew: false,
  },
  {
    date: 'R7.12.19',
    title: 'クマ被害対策等関係情報のお知らせ（令和7年12月19日）',
    url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-oshirase-r071219.html',
    isNew: false,
  },
  {
    date: 'R7.11.28',
    title: 'クマ被害対策等関係情報のお知らせ（令和7年11月28日）',
    url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-oshirase-r071128.html',
    isNew: false,
  },
  {
    date: 'R7.11.14',
    title: 'クマ被害対策パッケージ決定・関係閣僚会議（令和7年11月14日）',
    url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-oshirase-r071114.html',
    isNew: false,
  },
  {
    date: 'R7.11.1',
    title: 'クマ被害対策等関係情報のお知らせ（令和7年11月1日）',
    url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-oshirase-r071031.html',
    isNew: false,
  },
]

// ── 対策・方針文書 ─────────────────────────────────────────────
const POLICY_DOCS = [
  {
    date: 'R8.3.27',
    title: 'クマ被害対策ロードマップ',
    desc: '令和8年3月の閣僚会議で策定。中長期的な被害ゼロに向けた工程表。',
    pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-counter-roadmap-r080327.pdf',
    isHighlight: true,
    summary: [
      '目標：2030年度までに「人とクマのすみ分け」の実現',
      '捕獲目標：北海道12,540頭・東北3,800頭・中部3,500頭など地域別に設定',
      '資機材目標（2030）：専門職員2,500名・はこわな10,000基・スプレー20,000本',
      '現状（R8.3）：生息市町村849・職員784名・はこわな5,527基・スプレー7,093本',
    ],
  },
  {
    date: 'R7.11.14',
    title: 'クマ被害対策パッケージ',
    desc: '令和7年11月に閣僚会議で決定。緊急対策・人材育成・財政支援を網羅。',
    pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-counterplan-r071114.pdf',
    isHighlight: true,
    summary: [
      '緊急捕獲・担い手育成・財政支援の3本柱で構成',
      '猟銃購入への財政支援・ハンター確保策を明記',
      '住民向け普及啓発・被害防止行動の徹底も盛り込む',
    ],
  },
  {
    date: 'R7.11.14',
    title: 'クマ被害対策パッケージ（概要版）',
    desc: 'パッケージの要点を1ページに整理した概要版。',
    pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-counterplan-summary-r071114.pdf',
    isHighlight: false,
  },
  {
    date: 'R6.2.8',
    title: '特定鳥獣保護管理計画作成のためのガイドライン（クマ類編）改定版',
    desc: '都道府県がクマ保護管理計画を策定する際の基本方針。',
    pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-prevention-all.pdf',
    isHighlight: false,
  },
  {
    date: '—',
    title: 'クマ被害防止のための支援メニュー',
    desc: '自治体・団体が活用できる国の財政支援・補助制度をまとめた一覧。',
    pdfUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-shienmenu.pdf',
    isHighlight: false,
  },
]

// ── 関係閣僚会議 ───────────────────────────────────────────────
const CABINET_MEETINGS = [
  { date: 'R8.5.19', title: 'クマ被害対策関係閣僚会議（令和8年5月）', url: 'https://www.cas.go.jp/jp/seisaku/kumahigai_taisaku/index.html', docUrl: '' },
  { date: 'R8.3.27', title: 'クマ被害対策関係閣僚会議（令和8年3月）― ロードマップ策定', url: 'https://www.cas.go.jp/jp/seisaku/kumahigai_taisaku/index.html', docUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-counter-roadmap-r080327.pdf' },
  { date: 'R7.11.14', title: 'クマ被害対策関係閣僚会議（令和7年11月）― 対策パッケージ決定', url: 'https://www.cas.go.jp/jp/seisaku/kumahigai_taisaku/index.html', docUrl: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-counterplan-r071114.pdf' },
  { date: 'R7.10.30', title: 'クマ被害対策関係閣僚会議（第1回）', url: 'https://www.cas.go.jp/jp/seisaku/kumahigai_taisaku/index.html', docUrl: '' },
]

// ── 参考・分析資料 ─────────────────────────────────────────────
const REFERENCE_DOCS = [
  { title: 'クマ被害分析（令和4年版）', url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-bunseki-r0804.pdf', date: 'R4.4' },
  { title: '箱わな等の活用ポイント', url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-hakowana-r0804.pdf', date: 'R4.4' },
  { title: 'クマ類の生息状況', url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-situation.pdf', date: '—' },
  { title: 'クマ類の生息域情報', url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-habitat.pdf', date: '—' },
  { title: '連絡会議資料（R8.5.1）', url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-docu-r080501.pdf', date: 'R8.5.1' },
  { title: '連絡会議資料（R7.11.6）', url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-docu-r071106.pdf', date: 'R7.11.6' },
  { title: '連絡会議資料（R7.9.11）', url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-docu-r070911.pdf', date: 'R7.9.11' },
  { title: '連絡会議資料（R6.9.12）', url: 'https://www.env.go.jp/nature/choju/effort/effort12/kuma-docu-r060912.pdf', date: 'R6.9.12' },
]

// ── helpers ────────────────────────────────────────────────────
const MAX_COUNT = Math.max(...ANNUAL_INJURY.map((d) => d.count ?? 0))

export default function MoeDataPage() {
  return (
    <main style={{ background: '#F4F6F9', minHeight: '100vh' }}>

      {/* ── ヘッダーナビ ── */}
      <nav style={{
        background: '#1A2D4E',
        padding: '0 24px',
        height: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 14, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>|</span>
        <span style={{ fontSize: 12, color: '#7DD3FC', fontWeight: 700, whiteSpace: 'nowrap' }}>環境省データ</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/map"   style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', whiteSpace: 'nowrap' }}>🗺 MAP</Link>
          <Link href="/guide" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', whiteSpace: 'nowrap' }}>対策ガイド</Link>
          <Link href="/world" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', whiteSpace: 'nowrap' }}>🌍 WORLD</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg, #1A2D4E 0%, #0F1C33 100%)', padding: '48px 24px 44px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}>
              環境省 自然環境局
            </span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
              クマに関する各種情報・取組
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>
            📊 環境省クマ被害データ＆発表まとめ
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 680, marginBottom: 24 }}>
            環境省が公表するクマによる人身被害・出没・捕獲の統計データ、対策パッケージ・ロードマップ、
            最新お知らせを一覧化したページです。原典PDFへのリンクを各所に設けています。
          </p>

          {/* Meta row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <div style={{
              background: 'rgba(125,211,252,0.12)',
              border: '1px solid rgba(125,211,252,0.25)',
              borderRadius: 6, padding: '6px 14px',
              fontSize: 12, color: '#7DD3FC', fontWeight: 600,
            }}>
              最終更新：{LAST_UPDATED}
            </div>
            <a
              href={SOURCE_URL}
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              🔗 環境省公式ページ →
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* ── 速報値ドキュメントカード ── */}
        <section style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A2D4E' }}>令和8年（2026年）速報値</h2>
            <span style={{ fontSize: 12, color: '#888' }}>環境省PDFへのリンク</span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 14,
          }}>
            {LATEST_DOCS.map((doc) => (
              <a
                key={doc.id}
                href={doc.pdfUrl}
                target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: doc.bg,
                  border: `1.5px solid ${doc.border}`,
                  borderRadius: 10,
                  padding: '18px 16px 16px',
                  height: '100%',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 22, marginBottom: 8, lineHeight: 1 }}>{doc.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: doc.color, marginBottom: 4, lineHeight: 1.3 }}>
                    {doc.label}
                  </div>
                  <div style={{ fontSize: 11, color: '#666', lineHeight: 1.6, marginBottom: 8 }}>
                    {doc.note}
                    <br />
                    <span style={{ fontSize: 10, color: '#999' }}>{doc.asOf}</span>
                  </div>
                  {doc.summary.length > 0 && (
                    <div style={{ marginBottom: 10, paddingTop: 8, borderTop: `1px solid ${doc.border}` }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: doc.color, marginBottom: 5, letterSpacing: '0.06em' }}>
                        📋 概要
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {doc.summary.map((s, si) => (
                          <li key={si} style={{ fontSize: 10, color: '#555', lineHeight: 1.5, display: 'flex', gap: 4 }}>
                            <span style={{ color: doc.color, flexShrink: 0, marginTop: 1 }}>▸</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: doc.color,
                      background: `${doc.color}18`, padding: '2px 7px', borderRadius: 3,
                    }}>
                      PDF
                    </span>
                    <span style={{ fontSize: 10, color: '#AAA' }}>{doc.pdfDate} · {doc.pdfSize}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#AAA', marginTop: 10, lineHeight: 1.7 }}>
            ※ 数値の詳細は各PDFをご確認ください。データは環境省公式サイトにて随時更新されます。
          </p>
        </section>

        {/* ── 人身被害件数 推移グラフ ── */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A2D4E', marginBottom: 6 }}>
            🩺 人身被害件数の推移
          </h2>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 20, lineHeight: 1.7 }}>
            環境省公表の年度別人身被害件数（確定値）。H29〜R8。
          </p>
          <div style={{
            background: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: '28px 24px 20px',
            overflowX: 'auto',
          }}>
            {/* Bar chart */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', minWidth: 480, height: 180, paddingBottom: 8, borderBottom: '2px solid #F1F5F9' }}>
              {ANNUAL_INJURY.map((d) => {
                const isRecord = d.count === MAX_COUNT
                const pct = d.count != null ? (d.count / MAX_COUNT) * 160 : 0
                return (
                  <div key={d.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 3, minWidth: 0 }}>
                    {/* Count label */}
                    {d.count != null ? (
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        color: isRecord ? '#DC2626' : '#1A2D4E',
                        lineHeight: 1,
                      }}>
                        {d.count}
                      </span>
                    ) : (
                      <span style={{ fontSize: 9, color: '#CCC', lineHeight: 1 }}>
                        {d.note ?? '—'}
                      </span>
                    )}
                    {/* Bar */}
                    <a href={d.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ width: '100%', display: 'block', textDecoration: 'none' }}>
                      <div style={{
                        width: '100%',
                        height: d.count != null ? `${pct}px` : 12,
                        borderRadius: '3px 3px 0 0',
                        background: d.status === 'pending'
                          ? '#E2E8F0'
                          : d.status === 'provisional'
                          ? 'repeating-linear-gradient(45deg, #FED7AA, #FED7AA 4px, #FFF7ED 4px, #FFF7ED 8px)'
                          : isRecord
                          ? 'linear-gradient(to top, #DC2626, #F87171)'
                          : 'linear-gradient(to top, #1A2D4E, #3B6CB7)',
                        transition: 'opacity 0.15s',
                        position: 'relative',
                      }} />
                    </a>
                  </div>
                )
              })}
            </div>
            {/* X axis labels */}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {ANNUAL_INJURY.map((d) => (
                <div key={d.year} style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
                  <div style={{ fontSize: 9, color: '#888', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {d.year}
                  </div>
                  <div style={{ fontSize: 8, color: '#AAA', lineHeight: 1 }}>{d.yearEn}</div>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
              {[
                { color: 'linear-gradient(to right,#1A2D4E,#3B6CB7)', label: '確定値' },
                { color: '#DC2626', label: '過去最多' },
                { color: 'repeating-linear-gradient(45deg,#FED7AA,#FED7AA 4px,#FFF7ED 4px,#FFF7ED 8px)', label: '速報値' },
                { color: '#E2E8F0', label: '集計中' },
              ].map((l) => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 12, height: 8, borderRadius: 2, background: l.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: '#666' }}>{l.label}</span>
                </div>
              ))}
              <span style={{ fontSize: 10, color: '#AAA', marginLeft: 'auto' }}>各棒をクリック → 当該年度PDF</span>
            </div>
          </div>

          {/* Data table */}
          <div style={{ marginTop: 16, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#1A2D4E', color: '#fff' }}>
                  {['年度', '年（西暦）', '人身被害件数', '状態', '原典PDF'].map((h) => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...ANNUAL_INJURY].reverse().map((d, i) => {
                  const isRecord = d.count === MAX_COUNT
                  return (
                    <tr key={d.year} style={{ background: i % 2 === 0 ? '#fff' : '#F8FAFC', borderBottom: '1px solid #EEF2F7' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1A2D4E' }}>{d.year}</td>
                      <td style={{ padding: '10px 14px', color: '#666' }}>{d.yearEn}</td>
                      <td style={{ padding: '10px 14px' }}>
                        {d.count != null ? (
                          <span style={{ fontWeight: 700, fontSize: 16, color: isRecord ? '#DC2626' : '#1A2D4E' }}>
                            {d.count}<span style={{ fontSize: 11, fontWeight: 400, color: '#888', marginLeft: 2 }}>件</span>
                            {isRecord && (
                              <span style={{ marginLeft: 6, background: '#FEF2F2', color: '#DC2626', fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 2, border: '1px solid #FECACA' }}>
                                過去最多
                              </span>
                            )}
                          </span>
                        ) : (
                          <span style={{ fontSize: 12, color: '#AAA' }}>{d.note ?? '—'}</span>
                        )}
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700,
                          padding: '2px 8px', borderRadius: 3,
                          background: d.status === 'confirmed' ? '#ECFDF5' : d.status === 'provisional' ? '#FFF7ED' : '#F8FAFC',
                          color: d.status === 'confirmed' ? '#059669' : d.status === 'provisional' ? '#EA580C' : '#AAA',
                          border: `1px solid ${d.status === 'confirmed' ? '#A7F3D0' : d.status === 'provisional' ? '#FED7AA' : '#E2E8F0'}`,
                        }}>
                          {d.status === 'confirmed' ? '確定値' : d.status === 'provisional' ? '速報値' : '集計中'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <a href={d.pdfUrl} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 11, color: '#3B6CB7', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                          📄 PDF
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 最新お知らせ ── */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A2D4E', marginBottom: 18 }}>
            🔔 最新お知らせ（自治体向け等）
          </h2>
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
            {ANNOUNCEMENTS.map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={{
                  padding: '14px 20px',
                  borderBottom: i < ANNOUNCEMENTS.length - 1 ? '1px solid #F1F5F9' : 'none',
                  display: 'flex', alignItems: 'center', gap: 14,
                  transition: 'background 0.12s',
                  background: 'transparent',
                }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: '#3B6CB7',
                    background: '#EFF6FF', border: '1px solid #BFDBFE',
                    borderRadius: 4, padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    {a.date}
                  </span>
                  {a.isNew && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: '#DC2626',
                      background: '#FEF2F2', border: '1px solid #FECACA',
                      borderRadius: 3, padding: '1px 6px', flexShrink: 0,
                    }}>
                      NEW
                    </span>
                  )}
                  <span style={{ fontSize: 13, color: '#334155', flex: 1, lineHeight: 1.5 }}>
                    {a.title}
                  </span>
                  <span style={{ fontSize: 11, color: '#CBD5E1', flexShrink: 0 }}>→</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── 対策・方針文書 ── */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A2D4E', marginBottom: 6 }}>
            📋 対策パッケージ・方針文書
          </h2>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>
            環境省・内閣官房が策定したクマ被害対策の方針・ロードマップ。
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {POLICY_DOCS.map((doc, i) => (
              <a key={i} href={doc.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: doc.isHighlight ? 'linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)' : '#fff',
                  border: doc.isHighlight ? '1.5px solid #BFDBFE' : '1px solid #E2E8F0',
                  borderRadius: 8,
                  padding: '16px 20px',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '4px 16px',
                  alignItems: 'center',
                  transition: 'box-shadow 0.15s',
                }}>
                  <span style={{
                    gridRow: '1 / 3',
                    fontSize: 10, fontWeight: 700, color: '#3B6CB7',
                    background: '#EFF6FF', border: '1px solid #BFDBFE',
                    borderRadius: 4, padding: '2px 8px', whiteSpace: 'nowrap',
                    alignSelf: 'start', marginTop: 2,
                  }}>
                    {doc.date}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1A2D4E', lineHeight: 1.4 }}>
                      {doc.title}
                    </span>
                    {doc.isHighlight && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#2563EB', background: '#DBEAFE', border: '1px solid #BFDBFE', borderRadius: 3, padding: '1px 5px', flexShrink: 0 }}>
                        重要
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: '#94A3B8', gridRow: '1 / 3', alignSelf: 'center', flexShrink: 0 }}>
                    📄 PDF →
                  </span>
                  <div>
                    <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.6 }}>
                      {doc.desc}
                    </p>
                    {'summary' in doc && Array.isArray((doc as typeof doc & { summary?: string[] }).summary) && (
                      <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {((doc as typeof doc & { summary: string[] }).summary).map((s, si) => (
                          <li key={si} style={{ fontSize: 11, color: '#475569', lineHeight: 1.5, display: 'flex', gap: 5 }}>
                            <span style={{ color: '#3B6CB7', flexShrink: 0, marginTop: 1 }}>▸</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── 関係閣僚会議 ── */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A2D4E', marginBottom: 18 }}>
            🏛 関係閣僚会議
          </h2>
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 8, top: 8, bottom: 8, width: 2, background: '#E2E8F0', borderRadius: 1 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {CABINET_MEETINGS.map((m, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: 20 }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute', left: -24, top: 4,
                    width: 12, height: 12, borderRadius: '50%',
                    background: i === 0 ? '#1A2D4E' : '#CBD5E1',
                    border: `2px solid ${i === 0 ? '#3B6CB7' : '#E2E8F0'}`,
                  }} />
                  <div style={{
                    background: i === 0 ? '#EFF6FF' : '#fff',
                    border: `1px solid ${i === 0 ? '#BFDBFE' : '#E2E8F0'}`,
                    borderRadius: 8, padding: '12px 16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#3B6CB7', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 4, padding: '1px 7px', whiteSpace: 'nowrap' }}>
                        {m.date}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#1A2D4E', flex: 1, lineHeight: 1.4 }}>
                        {m.title}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                      <a href={m.url} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 11, color: '#3B6CB7', textDecoration: 'none', fontWeight: 600 }}>
                        🏛 内閣官房ページ →
                      </a>
                      {m.docUrl && (
                        <a href={m.docUrl} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 11, color: '#64748B', textDecoration: 'none' }}>
                          📄 資料PDF →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 参考・分析資料 ── */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A2D4E', marginBottom: 18 }}>
            📚 参考・分析資料・連絡会議資料
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 10,
          }}>
            {REFERENCE_DOCS.map((doc, i) => (
              <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: 8, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  transition: 'border-color 0.12s',
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>📄</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#334155', lineHeight: 1.4, marginBottom: 3 }}>
                      {doc.title}
                    </div>
                    <div style={{ fontSize: 10, color: '#94A3B8' }}>{doc.date}</div>
                  </div>
                  <span style={{ fontSize: 10, color: '#CBD5E1', flexShrink: 0 }}>→</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── 原典リンク・免責 ── */}
        <section>
          <div style={{
            background: '#1A2D4E',
            borderRadius: 10,
            padding: '24px 28px',
            display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center',
          }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: 6 }}>
                DATA SOURCE
              </p>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                環境省自然環境局　クマに関する各種情報・取組
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                本ページは環境省の公式ページを元に、KUMANUKEが整理・編集したものです。
                最新情報・正確な数値は必ず原典サイトをご確認ください。
              </p>
            </div>
            <a
              href={SOURCE_URL}
              target="_blank" rel="noopener noreferrer"
              style={{
                background: '#3B6CB7', color: '#fff', fontWeight: 700, fontSize: 13,
                padding: '10px 20px', borderRadius: 6, textDecoration: 'none',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              🔗 環境省公式ページを開く
            </a>
          </div>
        </section>

        {/* ── 関連リンク ── */}
        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/map" style={{
            background: '#fff', border: '1px solid #E2E8F0', borderRadius: 6,
            padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#1A2D4E',
            textDecoration: 'none',
          }}>
            🗺 全国出没マップを見る
          </Link>
          <Link href="/guide/japan-bear-damage-statistics" style={{
            background: '#fff', border: '1px solid #E2E8F0', borderRadius: 6,
            padding: '8px 16px', fontSize: 12, color: '#64748B',
            textDecoration: 'none',
          }}>
            📊 熊被害統計ガイドを読む
          </Link>
          <Link href="/world" style={{
            background: '#fff', border: '1px solid #E2E8F0', borderRadius: 6,
            padding: '8px 16px', fontSize: 12, color: '#64748B',
            textDecoration: 'none',
          }}>
            🌍 世界のクマ情報
          </Link>
        </div>
      </div>

      {/* ── フッター ── */}
      <footer style={{
        background: '#1A2D4E', padding: '28px 24px', textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 16,
          fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.1em',
        }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 8, lineHeight: 1.7 }}>
          データは環境省公式情報をもとに整理・編集しています。正確な数値は各PDFをご確認ください。
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', marginTop: 6 }}>
          © 2026 BUBUWORKS合同会社. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
