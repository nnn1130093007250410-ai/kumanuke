/**
 * 最新クマ出没情報ページ
 * X（Twitter）投稿からの流入に対応した一覧ページ
 * /recent
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { loadBearData, DANGER_COLORS, DANGER_LABELS } from '@/lib/bear-data'
import { getSlugByName } from '@/lib/prefectures'

export const metadata: Metadata = {
  title: '最新クマ出没情報【直近100件】| KUMANUKE',
  description: '日本全国の最新クマ出没情報を新着順に表示。人身被害・目撃情報・農業被害を日付・都道府県・危険度で確認できます。毎週月曜自動更新。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/recent' },
  openGraph: {
    title: '最新クマ出没情報【直近100件】| KUMANUKE',
    description: '日本全国の最新クマ出没情報を新着順に表示。人身被害・目撃情報・農業被害を日付・都道府県・危険度で確認できます。',
    url: 'https://kumanuke.bubuworks.co.jp/recent',
  },
}

export const revalidate = 3600

const INJURY_TYPES = ['人身被害', '人身']

function fmtDate(d: string) {
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${m[1]}年${+m[2]}月${+m[3]}日` : d
}

export default function RecentPage({
  searchParams,
}: {
  searchParams?: { filter?: string }
}) {
  const filter = searchParams?.filter ?? 'all'
  const allData = loadBearData()

  const sorted = [...allData].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))

  const filtered = filter === 'injury'
    ? sorted.filter((s) => INJURY_TYPES.includes(s.type ?? ''))
    : sorted

  const recent = filtered.slice(0, 100)
  const injuryCount = sorted.filter((s) => INJURY_TYPES.includes(s.type ?? '')).length
  const cy = new Date().getFullYear()
  const thisYearCount = sorted.filter((s) => s.date?.startsWith(String(cy))).length

  return (
    <main style={{ background: '#F5F7F5', minHeight: '100vh' }}>

      {/* ナビ */}
      <nav style={{
        background: '#0F2E16', padding: '0 24px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        height: 52, position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 16,
            fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.08em',
          }}>
            KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>|</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#5EC97C' }}>
            📋 最新情報
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/map" style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontWeight: 600 }}>
            🗺 マップ
          </Link>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            対策ガイド
          </Link>
        </div>
      </nav>

      {/* ヒーロー */}
      <div style={{ background: '#0F2E16', padding: '28px 24px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: 6 }}>
            LATEST BEAR SIGHTINGS
          </p>
          <h1 style={{
            fontSize: 'clamp(20px,3vw,28px)', fontWeight: 700,
            color: '#fff', marginBottom: 12, lineHeight: 1.3,
          }}>
            最新クマ出没情報
          </h1>

          {/* 統計バッジ */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              { label: '総件数', value: allData.length.toLocaleString('ja-JP') + '件', color: '#5EC97C' },
              { label: `${cy}年`, value: thisYearCount.toLocaleString('ja-JP') + '件', color: '#E07A30' },
              { label: '人身被害（累計）', value: injuryCount.toLocaleString('ja-JP') + '件', color: '#EF4444' },
            ].map((b) => (
              <div key={b.label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 6, padding: '8px 14px' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{b.label}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: b.color }}>{b.value}</div>
              </div>
            ))}
          </div>

          {/* フィルター */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { key: 'all', label: 'すべて' },
              { key: 'injury', label: '⚠️ 人身被害のみ' },
            ].map((f) => (
              <Link
                key={f.key}
                href={f.key === 'all' ? '/recent' : `/recent?filter=${f.key}`}
                style={{
                  padding: '5px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                  background: filter === f.key ? '#5EC97C' : 'rgba(255,255,255,0.1)',
                  color: filter === f.key ? '#0F2E16' : 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  border: `1.5px solid ${filter === f.key ? '#5EC97C' : 'rgba(255,255,255,0.2)'}`,
                }}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* リスト */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 20px 80px' }}>

        {/* マップ誘導 */}
        <Link href="/map" style={{ textDecoration: 'none', display: 'block', marginBottom: 20 }}>
          <div style={{
            background: 'linear-gradient(135deg, #143D1E, #1A5C2A)',
            border: '1.5px solid rgba(94,201,124,0.3)',
            borderRadius: 8, padding: '12px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>🗺</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>マップで場所を確認する</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>全{allData.length.toLocaleString()}件を地図上で表示</div>
              </div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#5EC97C', whiteSpace: 'nowrap' }}>マップを見る →</span>
          </div>
        </Link>

        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', margin: 0 }}>
            {filter === 'injury' ? '人身被害情報' : '最新出没情報'}
            <span style={{ fontSize: 12, fontWeight: 400, color: '#888', marginLeft: 8 }}>
              新着{recent.length}件表示
            </span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {recent.map((s) => {
            const slug = getSlugByName(s.prefecture ?? '')
            const isInjury = INJURY_TYPES.includes(s.type ?? '')
            return (
              <div
                key={s.id}
                style={{
                  background: '#fff',
                  border: `1px solid ${isInjury ? '#FCA5A5' : '#DDDDD8'}`,
                  borderLeft: `4px solid ${DANGER_COLORS[s.danger_level] ?? '#5EC97C'}`,
                  borderRadius: 6,
                  padding: '12px 16px',
                }}
              >
                {/* 上段：バッジ・日付・種別 */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{
                    background: DANGER_COLORS[s.danger_level] ?? '#5EC97C',
                    color: '#fff', fontSize: 9, fontWeight: 700,
                    padding: '2px 7px', borderRadius: 3,
                  }}>
                    {DANGER_LABELS[s.danger_level] ?? '情報'}
                  </span>
                  {isInjury && (
                    <span style={{
                      background: '#FEF2F2', color: '#EF4444',
                      fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 3,
                      border: '1px solid #FCA5A5',
                    }}>
                      ⚠️ 人身被害
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: '#888' }}>{fmtDate(s.date ?? '')}</span>
                  <span style={{ fontSize: 10, color: '#AAA' }}>{s.type}・{s.bear_type}</span>
                </div>

                {/* タイトル */}
                <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A16', margin: '0 0 6px', lineHeight: 1.5 }}>
                  {s.title}
                </p>

                {/* 場所 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12 }}>📍</span>
                  {slug ? (
                    <Link
                      href={`/map/${slug}`}
                      style={{ fontSize: 12, color: '#143D1E', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {s.prefecture} {s.city}
                    </Link>
                  ) : (
                    <span style={{ fontSize: 12, color: '#555' }}>{s.prefecture} {s.city}</span>
                  )}
                  {slug && (
                    <Link
                      href={`/map/${slug}`}
                      style={{
                        fontSize: 10, color: '#5EC97C', fontWeight: 700,
                        textDecoration: 'none', marginLeft: 4,
                        background: '#F0F7F2', padding: '2px 8px', borderRadius: 10,
                        border: '1px solid #C8DDD0',
                      }}
                    >
                      {s.prefecture}の出没データ →
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* もっと見る */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
            全{allData.length.toLocaleString()}件のデータはマップで確認できます
          </p>
          <Link
            href="/map"
            style={{
              display: 'inline-block',
              background: '#143D1E', color: '#fff',
              fontWeight: 700, fontSize: 13,
              padding: '12px 28px', borderRadius: 6, textDecoration: 'none',
            }}
          >
            🗺 全件マップで見る →
          </Link>
        </div>

        {/* 免責 */}
        <div style={{
          marginTop: 32, background: '#fff', border: '1px solid #DDDDD8',
          borderRadius: 8, padding: '14px 18px',
        }}>
          <p style={{ fontSize: 11, color: '#888', lineHeight: 1.9, margin: 0 }}>
            ⚠️ <strong>免責事項</strong>：本ページは自治体・報道機関等の公開情報をもとにした参考情報です。
            情報の正確性・完全性・最新性を保証するものではありません。
            野外活動の判断は必ず各都道府県・市町村の最新発表をご確認ください。
          </p>
        </div>
      </div>

      {/* フッター */}
      <footer style={{ background: '#0F2E16', padding: '28px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 18,
          fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.1em',
        }}>
          KUMA<span style={{ color: '#E07A30' }}>NUKE</span>
        </Link>
        <div style={{ marginTop: 14, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/map" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>出没マップ</Link>
          <Link href="/recent" style={{ fontSize: 12, color: '#5EC97C', textDecoration: 'none' }}>最新情報</Link>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>対策ガイド</Link>
          <Link href="/privacy" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>プライバシー</Link>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 16 }}>
          © 2026 BUBUWORKS合同会社. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
