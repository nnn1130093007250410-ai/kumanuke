import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '取扱店舗一覧｜KUMANUKE 熊よけスプレー 販売店',
  description: 'KUMANUKE（熊よけスプレー）を店頭でお求めいただける全国の取扱店舗一覧です。北海道・東北を中心に、釣具店・アウトドア専門店で取り扱い。都道府県別に住所・電話番号を掲載しています。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/stores' },
  openGraph: {
    title: '取扱店舗一覧｜KUMANUKE 熊よけスプレー 販売店',
    description: 'KUMANUKEを店頭でお求めいただける全国の取扱店舗一覧。都道府県別に住所・電話番号を掲載。',
    url: 'https://kumanuke.bubuworks.co.jp/stores',
  },
}

type Store = { name: string; addr: string; tel: string }
const AREAS: { pref: string; stores: Store[] }[] = [
  {
    pref: '北海道',
    stores: [
      { name: 'つり具センター 伏古店', addr: '〒007-0874 札幌市東区伏古14条5丁目1-30', tel: '011-768-7763' },
      { name: 'つり具センター 屯田店', addr: '〒002-0858 札幌市北区屯田8条2丁目8-25', tel: '011-775-3703' },
      { name: 'つり具センター 西岡店', addr: '〒062-0034 札幌市豊平区西岡4条1丁目2', tel: '011-853-3700' },
      { name: 'つり具センター 新札幌店', addr: '〒004-0002 札幌市厚別区厚別東2条1丁目2-26', tel: '011-898-3700' },
      { name: 'つり具センター 岩見沢店', addr: '〒068-0029 岩見沢市9条西17丁目2-22', tel: '0126-25-4433' },
      { name: 'つり具センター 苫小牧店', addr: '〒053-0042 苫小牧市三光町2丁目1-3', tel: '0144-35-1130' },
      { name: 'つり具センター 旭川店', addr: '〒070-0039 旭川市9条通16丁目24-231', tel: '0166-29-0030' },
      { name: 'つり具センター 釧路店', addr: '〒085-0014 釧路市末広町11丁目1', tel: '0154-23-1401' },
      { name: 'つり具センター 中標津店', addr: '〒086-1080 標津郡中標津町東40条南1丁目1-6', tel: '0153-72-3559' },
      { name: 'キャンパーズアンドアングラーズ 北広島店', addr: '〒061-1131 北広島市美沢5丁目1-1', tel: '011-375-8702' },
      { name: 'FISHING & OUTDOOR コルソ 札幌店', addr: '〒006-0013 札幌市手稲区富丘3条4丁目11-1', tel: '011-590-0992' },
      { name: 'FISHING & OUTDOOR コルソ 旭川店', addr: '〒070-0902 旭川市春光町10丁目2（イオン旭川春光SC内）', tel: '0166-73-3558' },
      { name: 'OUTDOOR & TROUT My Loch サッポロファクトリー店', addr: '〒060-0032 札幌市中央区北2条東4丁目 サッポロファクトリー2条館1F', tel: '011-590-4649' },
    ],
  },
  {
    pref: '青森県',
    stores: [
      { name: '萬屋 八戸城下店', addr: '〒031-0072 八戸市城下4-25-15', tel: '0178-22-8702' },
    ],
  },
  {
    pref: '岩手県',
    stores: [
      { name: 'つり具の上州屋 一関店', addr: '〒021-0063 一関市山目大槻109-1', tel: '0191-21-0020' },
      { name: '萬屋 盛岡店', addr: '〒020-0045 盛岡市盛岡駅西通1-27-1 コジマ×ビックカメラ盛岡店3F', tel: '019-681-1188' },
    ],
  },
  {
    pref: '宮城県',
    stores: [
      { name: 'つり具の上州屋 仙台新港店', addr: '〒985-0845 多賀城市町前2-7-38', tel: '022-363-6160' },
      { name: '釣具のキャスティング 泉バイパス店', addr: '〒981-3105 仙台市泉区天神沢1-1-27', tel: '022-772-6388' },
    ],
  },
  {
    pref: '秋田県',
    stores: [
      { name: 'スーパーセンターアマノ 井川店', addr: '〒018-1512 南秋田郡井川町北川尻新坂90-1', tel: '018-874-4222' },
      { name: 'スーパーセンターアマノ 男鹿店', addr: '〒010-0341 男鹿市船越字内子156', tel: '0185-35-2225' },
    ],
  },
  {
    pref: '山形県',
    stores: [
      { name: 'つり具の上州屋 鶴岡店', addr: '〒997-0051 鶴岡市荒井京田字荒田248-6', tel: '0235-25-6731' },
      { name: 'つり具の上州屋 酒田店', addr: '〒998-0878 酒田市こあら2-1-1', tel: '0234-23-7833' },
    ],
  },
  {
    pref: '福島県',
    stores: [
      { name: 'アングラーズプラザ岸波 郡山卸町店', addr: '〒963-0547 郡山市喜久田町卸一丁目47-1', tel: '024-959-5211' },
      { name: 'アングラーズプラザ岸波 南福島店', addr: '〒960-8152 福島市鳥谷野字宮畑69-1', tel: '024-544-3511' },
      { name: 'アングラーズプラザ岸波 北福島店', addr: '〒960-0112 福島市南矢野目字菅原51-27', tel: '024-559-0166' },
    ],
  },
  {
    pref: '長野県',
    stores: [
      { name: 'TREKVOGEL 安曇野店', addr: '〒399-8303 安曇野市穂高5968-3', tel: '080-2046-6095' },
    ],
  },
  {
    pref: '千葉県',
    stores: [
      { name: 'ヨシキ＆P2 習志野本店', addr: '〒275-0026 習志野市谷津1-13-17', tel: '047-471-8090' },
    ],
  },
]

const TOTAL = AREAS.reduce((n, a) => n + a.stores.length, 0)

export default function StoresPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <Link href="/" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← トップへ</Link>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.2em', marginTop: 16, marginBottom: 10 }}>STORE LIST</p>
          <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>取扱店舗一覧</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 16, lineHeight: 1.8 }}>
            KUMANUKE（熊よけスプレー）を店頭でお求めいただける取扱店舗です。現在 <strong style={{ color: '#fff' }}>全国{TOTAL}店舗</strong>（北海道・東北ほか）で取り扱いいただいています。
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 24px 80px' }}>
        <p style={{ fontSize: 13, color: '#6A6A64', background: '#F8F8F6', border: '1px solid #EFEFED', borderRadius: 8, padding: '14px 18px', lineHeight: 1.8, marginBottom: 40 }}>
          ※ 店頭在庫は各店舗により異なります。ご来店前に在庫状況を店舗へお問い合わせいただくと確実です。<br />
          ※ 掲載情報は変更される場合があります。最新の営業時間・所在地は各店舗の公式情報をご確認ください。
        </p>

        {AREAS.map((area) => (
          <section key={area.pref} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 14, marginBottom: 18, display: 'flex', alignItems: 'baseline', gap: 10 }}>
              {area.pref}
              <span style={{ fontSize: 12, fontWeight: 500, color: '#9A9A95' }}>{area.stores.length}店舗</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {area.stores.map((s) => (
                <div key={s.name} style={{ background: '#F8F8F6', border: '1px solid #EFEFED', borderRadius: 8, padding: '16px 18px' }}>
                  <div style={{ fontWeight: 700, color: '#1A1A16', fontSize: 15, lineHeight: 1.5, marginBottom: 8 }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: '#5A5A55', lineHeight: 1.7, marginBottom: 8 }}>{s.addr}</div>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 13 }}>
                    <a href={`tel:${s.tel.replace(/-/g, '')}`} style={{ color: '#143D1E', fontWeight: 700, textDecoration: 'none' }}>☎ {s.tel}</a>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + ' ' + s.addr)}`} target="_blank" rel="noopener noreferrer" style={{ color: '#E07A30', fontWeight: 600, textDecoration: 'none' }}>地図 ↗</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div style={{ marginTop: 48, background: '#143D1E', borderRadius: 8, padding: '32px 28px', textAlign: 'center' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>取扱店舗 随時募集中</h3>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>
            KUMANUKEの店頭でのお取り扱いをご検討の小売店・卸の皆さまからのお問い合わせをお待ちしています。
          </p>
          <Link href="/products/kumanuke#wholesale" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 4, textDecoration: 'none' }}>
            卸・お取り扱いのお問い合わせ
          </Link>
        </div>
      </div>
    </main>
  )
}
