import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマの食性と採食生態｜季節別食料戦略と出没リスクの関係 | KUMANUKE',
  description: 'クマは何を食べているのか。春の草本類から秋のドングリまで、月別の主要食料と採食行動を解説。ドングリ凶作との出没増加の関係、人間由来の食料が引き起こす依存行動も詳述。',
  alternates: { canonical: 'https://kumanuke.vercel.app/guide/bear-diet-ecology' },
  openGraph: {
    title: 'クマの食性と採食生態｜季節別食料戦略と出没リスクの関係',
    description: '月別食料カレンダー・ドングリ凶作と出没増加の関係・人間由来食料への依存メカニズムを研究データで解説。',
    url: 'https://kumanuke.vercel.app/guide/bear-diet-ecology',
  },
}

export default function BearDietEcologyPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 12 }}>
            <span style={{ background: '#0C5C3E', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 3, letterSpacing: '0.1em' }}>LAB</span>
            <span style={{ background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, opacity: 0.85 }}>生態・行動</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            クマの食性と採食生態｜<br />季節別食料戦略と出没リスクの関係
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2026年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F0FDF4', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          クマは「雑食性」ですが、その食生活は季節によって劇的に変化します。春は草本類・昆虫で代謝を回復させ、秋は一日20,000 kcalを摂取するために動き続けます。「クマが人里に来る理由の80%は食料」という研究もあります。食性を知ることは、出没リスクの予測と予防に直結します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          クマは「雑食」だが実態は「植物食寄り」
        </h2>
        <p>
          ツキノワグマの年間食事割合（カロリーベース）を複数の胃内容物分析・フィールド研究が示す典型的な数値で見ると、植物由来が<strong>約70〜85%</strong>を占めます。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: 12, marginTop: 20, marginBottom: 24 }}>
          {[
            { label: '植物（果実・堅果・草本）', value: '70〜85%', color: '#0C5C3E' },
            { label: '昆虫・幼虫・蜂蜜', value: '10〜20%', color: '#1F5C2E' },
            { label: '脊椎動物（魚・小動物）', value: '3〜8%', color: '#143D1E' },
            { label: '腐肉・その他', value: '1〜3%', color: '#166534' },
          ].map((item) => (
            <div key={item.label} style={{ background: item.color, borderRadius: 8, padding: '16px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{item.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <p>
          ヒグマ（北海道）はツキノワグマより動物食の割合が高く、鮭の遡上シーズン（9〜10月）には川魚が重要な栄養源になります。鮭から得る高タンパク・高脂肪の栄養は、冬眠前の体重増加に大きく貢献します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          月別・季節別食料カレンダー
        </h2>
        <p>
          クマの食性は月単位で大きく変化します。以下は本州ツキノワグマの典型的な採食カレンダーです。
        </p>

        <div style={{ marginTop: 20, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#143D1E', color: '#fff' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', minWidth: 80 }}>時期</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>主要食料</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', minWidth: 120 }}>出没リスク</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['3〜4月（冬眠明け）', 'オオバキャビ・ネコノメソウ等の草本類、昆虫幼虫、腐肉。消化器回復期のため柔らかい食物中心。', '🔴 高（空腹・興奮状態）'],
                ['5〜6月', '山菜類（コシアブラ・タラノメ・ワラビ）、樹皮・形成層（スギ食害も）、蜂の巣', '🟡 中〜高（山菜採り人との重複）'],
                ['7〜8月', '初夏の果実（マタタビ・サルナシ・オオカメノキ）、アリ・スズメバチの幼虫、魚類（沢）', '🟡 中（食料豊富でリスクやや低下）'],
                ['9〜10月（ハイパーファジア期）', 'ドングリ・ブナ実（最重要）・山葡萄・アケビ・キノコ・農作物（果樹園・水田）', '🔴 非常に高（食料探索圧力最大）'],
                ['11月（冬眠準備）', 'ドングリの最後の拾い食い・残存果実', '🟡 中（個体差大）'],
                ['12〜2月（冬眠中）', 'なし（脂肪のみ）', '⚪ 低（ただし暖冬年は出没あり）'],
              ].map(([period, food, risk], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #EFEFED', background: i % 2 === 0 ? '#F8F8F6' : '#fff', verticalAlign: 'top' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, whiteSpace: 'nowrap' }}>{period}</td>
                  <td style={{ padding: '12px 14px', lineHeight: 1.6 }}>{food}</td>
                  <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>{risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          ドングリ凶作と出没急増のメカニズム
        </h2>
        <p>
          日本の熊出没件数が年によって大きく変動する最大の要因は、<strong>ブナ・コナラ・ミズナラなどの堅果類の豊凶サイクル</strong>です。
        </p>
        <p style={{ marginTop: 16 }}>
          広葉樹は数年に一度「凶作年」を迎え、林内の堅果が激減します。この年、クマは秋になっても冬眠に必要な体脂肪を蓄えられず、食料を求めて人里・農地・集落に大挙して現れます。環境省のデータでは、ドングリ凶作年の翌年〜同年に出没件数が<strong>1.5〜3倍</strong>に急増するパターンが繰り返し確認されています。
        </p>

        <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 8, padding: '20px 24px', marginTop: 20, marginBottom: 20 }}>
          <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 10, fontSize: 14 }}>凶作年のサイクル（代表的なパターン）</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, fontSize: 12 }}>
            {[
              { year: '2010年', label: 'ドングリ凶作', outcome: '全国出没3,000件超' },
              { year: '2014年', label: 'ブナ凶作', outcome: '出没急増' },
              { year: '2020年', label: '広範囲凶作', outcome: '出没5,995件' },
              { year: '2023年', label: '部分凶作', outcome: '出没11,215件' },
              { year: '2025年', label: '秋に凶作傾向', outcome: '出没41,134件' },
            ].map((item) => (
              <div key={item.year} style={{ background: '#fff', border: '1px solid #FBBF24', borderRadius: 6, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#92400E', fontSize: 13 }}>{item.year}</div>
                <div style={{ color: '#DC2626', fontSize: 11, marginTop: 2 }}>{item.label}</div>
                <div style={{ color: '#5A5A55', fontSize: 10, marginTop: 3 }}>{item.outcome}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#92400E', marginTop: 10, margin: '10px 0 0' }}>※ KUMANUKE DATAベース。出没件数は捕捉率により実態より低い可能性あり。</p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          「人間由来の食料」への依存が最も危険
        </h2>
        <p>
          クマが一度「人間の食料・ゴミ・農作物」の味を覚えると、その行動は根本的に変容します。研究者はこの状態のクマを<strong>「food-conditioned bear（フードコンディショニング）」</strong>と呼びます。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16, marginBottom: 16 }}>
          {[
            { title: '依存サイクル', body: '人間由来食料は天然食料より高カロリー密度で簡単に入手できる。一度成功すると学習により繰り返すようになる。（詳細：クマの学習能力と認知行動）' },
            { title: '警戒心の低下', body: '採食報酬が繰り返されると、人間への警戒心が「脱感作」されていく。最終的には人の存在を無視して接近するようになる。' },
            { title: '管理困難化', body: 'フードコンディショニングされたクマは通常の忌避手法が効きにくくなる。捕獲・移送後も同じ行動に戻るケースが多い。' },
            { title: '最終的な結末', body: '人身被害リスクが極端に高まり、多くの場合「有害駆除」の対象となる。北米では年間の安楽死件数の50%以上がfood-conditionedクマとされる。' },
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #DDDDD8', borderRadius: 6, padding: '14px 18px' }}>
              <p style={{ fontWeight: 700, color: '#143D1E', marginBottom: 6, fontSize: 14 }}>▶ {item.title}</p>
              <p style={{ fontSize: 13, color: '#5A5A55', margin: 0, lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <p>
          このことが、<strong>「食料を与えない・ゴミを管理する・放置果樹を除去する」</strong>ことが最重要の予防策である理由です（<Link href="/guide/garbage-bear-prevention" style={{ color: '#143D1E', fontWeight: 700 }}>ゴミ置き場・住宅地の熊対策</Link>・<Link href="/guide/abandoned-fruit-trees-bear-damage" style={{ color: '#143D1E', fontWeight: 700 }}>放置果樹が熊を呼ぶ</Link>）。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          農業・林業被害との接続
        </h2>
        <p>
          食性の理解は農業被害予防にも直結します。被害を受けやすい農作物・時期を知ることで、効果的な対策を講じられます。
        </p>
        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#143D1E', color: '#fff' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>農作物・対象</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>被害時期</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>理由</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['スギ・ヒノキ（樹皮剥ぎ）', '4〜6月', '春、形成層の甘い樹液を求めて。近年被害拡大中。'],
                ['トウモロコシ・水稲', '8〜9月', '高糖度・高カロリー。収穫前の8月が最リスク期。'],
                ['柿・リンゴ・梨（果樹）', '9〜11月', 'ハイパーファジア期の高カロリー源。未収穫果実は特に誘引。'],
                ['養蜂（蜂蜜）', '4〜10月', '蜂蜜は天然食料の中で最高カロリー密度の一つ（約300 kcal/100g）。'],
                ['養殖魚（ヤマメ等）', '5〜9月', 'タンパク質・脂肪が豊富。柵のない施設は繰り返し来訪。'],
              ].map(([crop, period, reason], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #EFEFED', background: i % 2 === 0 ? '#F8F8F6' : '#fff' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{crop}</td>
                  <td style={{ padding: '10px 12px' }}>{period}</td>
                  <td style={{ padding: '10px 12px', lineHeight: 1.5 }}>{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 56, background: '#F0F7F2', border: '1px solid #C8DDD0', borderRadius: 8, padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 16 }}>関連記事</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン｜季節ごとの行動変化とリスクカレンダー' },
              { href: '/guide/bear-hibernation', label: 'クマの冬眠メカニズム｜生理学・脂肪代謝・目覚めの危険性' },
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか' },
              { href: '/guide/abandoned-fruit-trees-bear-damage', label: '放置果樹・放任果樹が熊を呼ぶ' },
              { href: '/guide/garbage-bear-prevention', label: 'ゴミ置き場・住宅地の熊対策' },
              { href: '/guide/farm-bear-prevention', label: '農地・畑を熊から守る方法' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ fontSize: 13, color: '#143D1E', textDecoration: 'none', padding: '5px 0', borderBottom: '1px solid rgba(20,61,30,0.1)', lineHeight: 1.5 }}>
                → {item.label}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
