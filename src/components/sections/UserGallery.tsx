import Image from 'next/image'

/* みんなの使用シーン — お客様提供の実使用写真（掲載許可取得済み） */
const photos: { src: string; label: string; alt: string; pos?: string }[] = [
  { src: '/ugc/ugc-fishing-1.jpg', label: '渓流釣りにて', alt: '渓流釣りのタックルとKUMANUKE' },
  { src: '/ugc/ugc-hike-spray.jpg', label: '登山｜装備にスプレー', alt: '登山で装備にKUMANUKEをスプレーする様子', pos: 'center 30%' },
  { src: '/ugc/ugc-group-1.jpg', label: 'グループ登山での使用', alt: 'グループ登山でKUMANUKEを使用する様子' },
  { src: '/ugc/ugc-group-2.jpg', label: '登山｜仲間と使用', alt: '登山で仲間とKUMANUKEを装備に使用する様子' },
  { src: '/ugc/ugc-stream-1.jpg', label: '渓流フィールドにて', alt: '渓流の岩の上に置かれたKUMANUKE' },
  { src: '/ugc/ugc-sign.jpg', label: '登山口での携行（山梨・南アルプス）', alt: '熊出没注意の看板前でKUMANUKEを携行' },
  { src: '/ugc/ugc-fishing-2.jpg', label: '渓流釣りの携行品と', alt: '渓流釣りのロッドとKUMANUKE' },
  { src: '/ugc/ugc-stream-3.jpg', label: '沢沿いでの携行', alt: '沢沿いの緑の中に置かれたKUMANUKE' },
  { src: '/ugc/ugc-stream-2.jpg', label: '渓流での使用', alt: '渓流の岩の上に置かれたKUMANUKE' },
]

export default function UserGallery() {
  return (
    <section id="gallery" className="fade-up" style={{ background: '#F8F8F6', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="section-label">USER PHOTOS</div>
        <h2 className="section-title" style={{ fontSize: 'clamp(20px,3vw,30px)', marginBottom: 14 }}>みんなの使用シーン</h2>
        <p style={{ fontSize: 15, color: '#5A5A55', lineHeight: 1.85, marginBottom: 36 }}>
          実際にKUMANUKEをご愛用いただいている、渓流釣り・登山でのお客様提供写真です。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
          {photos.map((p) => (
            <div
              key={p.src}
              style={{
                position: 'relative',
                aspectRatio: '3 / 4',
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid #DDDDD8',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 600px) 50vw, 25vw"
                style={{ objectFit: 'cover', objectPosition: p.pos || 'center center' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  right: 10,
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                }}
              >
                {p.label}
              </span>
            </div>
          ))}
        </div>

        {/* Instagram 投稿導線 */}
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <p style={{ fontSize: 14, color: '#5A5A55', marginBottom: 14 }}>
            あなたの使用シーンも <strong style={{ color: '#1A1A16' }}>#KUMANUKE</strong> で教えてください
          </p>
          <a
            href="https://www.instagram.com/kumanuke2026/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(90deg, #F58529 0%, #DD2A7B 52%, #8134AF 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              padding: '11px 26px',
              borderRadius: 999,
              textDecoration: 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="#fff" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="1.7" />
              <circle cx="17.4" cy="6.6" r="1.3" fill="#fff" />
            </svg>
            Instagram ＠kumanuke2026
          </a>
        </div>

        <p style={{ fontSize: 11, color: '#9A9A95', lineHeight: 1.7, marginTop: 26, textAlign: 'center' }}>
          ※掲載写真はお客様よりご提供・掲載許可をいただいたものです。使用状況を紹介するもので、製品の効果・安全性を保証するものではありません。
        </p>
      </div>
    </section>
  )
}
