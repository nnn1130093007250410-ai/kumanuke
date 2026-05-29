import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'カナダBear Smartプログラム｜人と熊の共存政策モデルを解説 | KUMANUKE',
  description: 'カナダBC州のBear Smartプログラムはなぜ機能するのか。コミュニティ認証制度・ゴミ管理条例・山岳リゾートの共存モデル・日本への示唆を具体的データとともに解説。',
  alternates: { canonical: 'https://kumanuke.vercel.app/guide/canada-bear-smart' },
  openGraph: {
    title: 'カナダBear Smartプログラム｜人と熊の共存政策モデル',
    description: 'BC州Bear Smart認証・ウィスラーの事例・日本との比較。共存を実現した政策の具体的な中身を解説。',
    url: 'https://kumanuke.vercel.app/guide/canada-bear-smart',
  },
}

export default function CanadaBearSmartPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#1E3A5F', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 12 }}>
            <span style={{ background: '#7C3AED', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 3, letterSpacing: '0.1em' }}>WORLD</span>
            <span style={{ background: '#7C3AED', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, opacity: 0.85 }}>海外政策・共存</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            カナダ Bear Smart プログラム｜<br />人と熊の共存を実現した政策モデル
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2026年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#EFF6FF', borderLeft: '3px solid #1E3A5F', borderRadius: 4 }}>
          カナダBC（ブリティッシュコロンビア）州は、クロクマ・グリズリーの高密度生息地と人間の居住地が隣接する北米有数の地域です。1990年代から増加し続けたクマとの衝突を「駆除」ではなく「環境管理と教育」で解決するために開発されたのが<strong>Bear Smart Community Program</strong>です。この政策は今や北米の熊共存政策の標準モデルとなっています。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          Bear Smartが生まれた背景
        </h2>
        <p>
          1990年代のBC州では、クマの「問題個体（problem bear）」として報告される件数が急増し、殺処分数が年間600〜800頭に達することもありました。州政府の調査が導いた衝撃的な結論は「<strong>問題の80%以上が人間側の食料管理の失敗に起因する</strong>」というものでした。
        </p>
        <p style={{ marginTop: 16 }}>
          つまりクマを「管理」するのではなく、<strong>人間のコミュニティを「クマを引き寄せない環境」に変える</strong>ことが解決策であると認識が転換したのです。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 16, marginTop: 24, marginBottom: 24 }}>
          {[
            { label: 'Bear Smart導入前の殺処分数', value: '600〜800頭/年', sub: 'BC州ピーク時', color: '#B91C1C' },
            { label: '問題の原因（人間由来）', value: '80%以上', sub: 'ゴミ・農作物・ペットフード', color: '#1E3A5F' },
            { label: 'ウィスラーの殺処分削減', value: '90%以上', sub: 'プログラム導入後', color: '#0C5C3E' },
            { label: 'Bear Smart認証コミュニティ', value: '20以上', sub: 'BC州全体（2024年時点）', color: '#143D1E' },
          ].map((item) => (
            <div key={item.label} style={{ background: item.color, borderRadius: 8, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>{item.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          Bear Smart認証の5要件
        </h2>
        <p>
          コミュニティがBear Smart認証を取得するには、BC州政府が定める以下の5要件を充足する必要があります。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
          {[
            {
              num: '01',
              title: 'ゴミ管理の徹底（Waste Management）',
              body: '収集日当日の朝まで屋内保管、またはBear-proof容器の使用を義務化。コンポストも蓋付きの耐熊容器に限定。全住民・施設への適用が必要。',
            },
            {
              num: '02',
              title: 'コミュニティ教育プログラム（Education）',
              body: '学校・地域向けの定期的なクマ共存教育の実施。「クマに食料を与えてはいけない理由」から「遭遇時の行動」まで体系的カリキュラム。',
            },
            {
              num: '03',
              title: '誘引源の除去（Attractant Removal）',
              body: '果樹・ベリー類の適切な収穫と管理。野鳥用餌台・ペットフードの屋外放置禁止。BBQグリルの清掃義務化。',
            },
            {
              num: '04',
              title: 'クマの移動経路管理（Habitat Connectivity）',
              body: 'クマの自然な移動経路を分断せず、緑地帯・コリドーを保全。コミュニティ周辺の茂みを適切に管理して人間とクマの視認性を確保。',
            },
            {
              num: '05',
              title: '対応プロトコルの確立（Response Protocol）',
              body: 'クマの報告・対応に関する明確な手順。地元コンサベーションオフィサーとの連携体制。地域住民が報告できるホットラインの設置。',
            },
          ].map((item) => (
            <div key={item.num} style={{ display: 'flex', gap: 16, border: '1px solid #DBEAFE', borderRadius: 8, padding: '16px 20px', background: '#F8FAFF' }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#1E3A5F', minWidth: 32, flexShrink: 0 }}>{item.num}</span>
              <div>
                <p style={{ fontWeight: 700, color: '#1E3A5F', marginBottom: 6, fontSize: 14 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: '#5A5A55', margin: 0, lineHeight: 1.7 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          ウィスラーの成功事例
        </h2>
        <p>
          世界的なスキーリゾートとして知られるウィスラー（Whistler, BC）は、Bear Smartの最も成功した事例のひとつです。
        </p>
        <p style={{ marginTop: 16 }}>
          1990年代のウィスラーは年間数十頭ものクマを「問題個体」として処分していました。しかし2000年代にBear Smart認証を取得し、<strong>ゴミ管理の完全刷新（全コンテナをBear-proof型に交換）</strong>・地域教育の強化・コンサベーションオフィサーの増員を実施。
        </p>
        <div style={{ background: '#F0FDF4', border: '1px solid #143D1E', borderRadius: 8, padding: '20px 24px', marginTop: 20, marginBottom: 20 }}>
          <p style={{ fontWeight: 700, color: '#143D1E', marginBottom: 10, fontSize: 15 }}>ウィスラーの変化（10年間）</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13 }}>
            <div>
              <p style={{ fontWeight: 700, color: '#B91C1C', marginBottom: 6 }}>導入前（1990年代）</p>
              <ul style={{ margin: 0, padding: '0 0 0 18px', lineHeight: 1.9 }}>
                <li>年間クマ殺処分：数十頭</li>
                <li>クマ関連苦情：数百件/年</li>
                <li>ゴミ由来の誘引事故多発</li>
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: 700, color: '#0C5C3E', marginBottom: 6 }}>導入後（2010年代）</p>
              <ul style={{ margin: 0, padding: '0 0 0 18px', lineHeight: 1.9 }}>
                <li>殺処分：90%以上削減</li>
                <li>クマ関連苦情：大幅減少</li>
                <li>観光資源として活用（クマウォッチング）</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          Bear-proof ゴミ容器：インフラとしての整備
        </h2>
        <p>
          Bear Smartの根幹のひとつは<strong>Bear-proof（耐熊）ゴミ容器の標準化</strong>です。BC州では承認されたモデルの一覧が公開されており、クマが開けられない特殊ラッチ・頑丈な素材・重量設計が要件として定められています。
        </p>
        <p style={{ marginTop: 16 }}>
          コスト（容器1台あたり200〜500カナダドル）は高いですが、<strong>クマ処分コスト・人身事故対応コストと比較すれば大幅に安価</strong>という費用便益分析がプログラム採用を後押しします。自治体が補助金で容器を提供するコミュニティも多数あります。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          日本への示唆
        </h2>
        <p>
          Bear Smartの成功から日本が学べることは何でしょうか。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          {[
            {
              title: '食料管理は「個人のモラル」ではなく「インフラ」で解決する',
              body: 'カナダの成功の鍵は、個人の意識改革に頼らず「物理的にクマがアクセスできないゴミ容器」を標準化したことです。日本でも地域ごとの耐熊ゴミ収集インフラ整備が有効です。',
            },
            {
              title: '問題行動クマの「早期対応」が殺処分を減らす',
              body: '初めて集落に現れたクマへの対応が重要です。この段階で誘引源を完全除去すれば依存化を防げます。「1〜2回なら大丈夫」という放置が最悪の結果を招きます。',
            },
            {
              title: '観光・経済と共存は両立できる',
              body: 'ウィスラーはクマを「脅威」から「観光資源」に変えました。日本の里山でも同様の発想の転換が可能です。クマウォッチングツアーは北海道・長野でもすでに始まっています。',
            },
            {
              title: '行政・住民・観光業の協働が不可欠',
              body: 'Bear Smartは行政単独でも個人単独でも機能しません。コミュニティ全体の参加と責任の共有が成功の条件です。',
            },
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #DBEAFE', borderRadius: 6, padding: '14px 18px', background: '#F8FAFF' }}>
              <p style={{ fontWeight: 700, color: '#1E3A5F', marginBottom: 6, fontSize: 14 }}>▶ {item.title}</p>
              <p style={{ fontSize: 13, color: '#5A5A55', margin: 0, lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: 8, padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E3A5F', marginBottom: 16 }}>関連記事</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/north-america-bear-spray', label: '北米のベアスプレー文化｜義務化・研究・効果の科学' },
              { href: '/guide/international-bear-management', label: '海外のクマ対策研究・管理事例｜北米・ヨーロッパの知見' },
              { href: '/guide/non-lethal-bear-management', label: '非致死型クマ対策の体系｜移送・条件付け嫌悪・忌避・電気柵の科学' },
              { href: '/guide/garbage-bear-prevention', label: 'ゴミ置き場・住宅地の熊対策' },
              { href: '/guide/satoyama-bear-human-coexistence', label: '里山と人獣共存問題' },
              { href: '/guide/bear-diet-ecology', label: 'クマの食性と採食生態' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ fontSize: 13, color: '#1E3A5F', textDecoration: 'none', padding: '5px 0', borderBottom: '1px solid rgba(30,58,95,0.1)', lineHeight: 1.5 }}>
                → {item.label}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
