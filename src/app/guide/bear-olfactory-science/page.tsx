import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '熊が匂いで近づかない理由｜嗅覚の仕組みと忌避メカニズムを科学的に解説 | KUMANUKE',
  description: '熊の嗅覚は犬の7倍・人間の2100倍。国内外の研究が示す「匂いによる熊の行動制御」のメカニズムを解説。植物由来の忌避成分が注目される科学的根拠とは。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-olfactory-science' },
  openGraph: {
    title: '熊が匂いで近づかない理由｜嗅覚の仕組みと忌避メカニズムを科学的に解説 | KUMANUKE',
    description: '熊の嗅覚は犬の7倍。国内外の研究が示す匂いによる熊の行動制御メカニズムと植物由来忌避成分の科学的根拠を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-olfactory-science',
  },
}

export default function BearOlfactorySciencePage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            科学・研究
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            熊が匂いで近づかない理由｜<br />嗅覚の仕組みと忌避メカニズムを科学的に解説
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2026年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F0FDF4', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          「匂いで熊が逃げる」──この考えは感覚的な話ではなく、熊の生態・神経科学・化学生態学の研究が裏付ける事実です。熊の嗅覚は犬の約7倍、人間の約2,100倍とされ、匂いは熊の行動のほぼすべてを支配しています。この記事では、国内外の研究が明らかにした「匂いによる熊の行動制御」のメカニズムを解説します。
        </p>

        {/* 1 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          熊の嗅覚は地球上最強クラス
        </h2>
        <p>熊（特にクマ科全般）の嗅覚能力は、科学的に測定された中でも地球上最強クラスの動物の一つです。その驚異的な能力を数字で見てみましょう。</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 16, marginTop: 20 }}>
          {[
            { label: '人間との比較', value: '約2,100倍', sub: '嗅覚の鋭敏さ', color: '#143D1E' },
            { label: 'ブラッドハウンドとの比較', value: '約7倍', sub: '世界最高の警察犬', color: '#1F5C2E' },
            { label: '食料の検知距離', value: '最大32km', sub: '風向きによっては', color: '#0C5C3E' },
            { label: '嗅球の相対サイズ', value: '人間の5倍以上', sub: '脳に占める割合', color: '#166534' },
          ].map((item) => (
            <div key={item.label} style={{ background: item.color, borderRadius: 8, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginBottom: 6, letterSpacing: '0.05em' }}>{item.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>{item.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 20 }}>
          ワシントン州立大学のベア・リサーチセンター（WSU Bear Center）の研究によると、熊の嗅球（においを処理する脳の部位）は、体の大きさに対する比率でも人間の5倍以上の大きさを持ちます。また嗅覚受容体遺伝子の数は約1,100個とされており、人間（約396個）や犬（約811個）を大幅に上回ります。
        </p>
        <p style={{ marginTop: 12 }}>
          熊は嗅覚を使って食料を探し、仲間を認識し、天敵を察知し、縄張りを確認します。逆にいえば、<strong>匂いの情報が熊の行動のほぼすべてを左右する</strong>のです。
        </p>

        {/* 2 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          匂いが熊の行動を制御するメカニズム
        </h2>
        <p>熊が特定の匂いを嗅いだとき、どのような神経・行動反応が起きるのかを見てみましょう。</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
          {[
            {
              title: '① 天敵・危険シグナルへの反応',
              body: '大型肉食動物（オオカミ・ピューマ等）の尿・分泌物に含まれる揮発性有機化合物（VOC）は、熊の嗅覚神経に「危険」のシグナルを送ります。ScienceDaily（2011年）に掲載された研究では、肉食動物の尿に含まれる特定の化合物が、哺乳類に本能的な回避行動を引き起こすことが確認されています。熊にとってもこの本能的回避反応は強く働きます。',
              color: '#DC2626',
            },
            {
              title: '② 強烈な植物性揮発成分への回避',
              body: '化学生態学の分野では、特定の植物性揮発成分（フィトンチッド・テルペン類・精油成分など）が野生動物の行動に影響を与えることが複数の研究で示されています。Journal of Chemical Ecologyに掲載された研究では、松の精油（パインオイル）に野生動物の忌避効果があることが報告されています。また、ペパーミントに含まれるメントール・メントン等の揮発成分は熊が避ける匂いとして知られています。',
              color: '#1F5C2E',
            },
            {
              title: '③ 嗅覚の過負荷（オーバーロード）',
              body: '非常に強い匂いは、熊の高感度な嗅覚受容体に対して刺激が強すぎるため、回避行動を引き起こすと考えられています。これは熊がなぜ強力なOC（カプサイシン）スプレーに反応するかの神経科学的な説明でもあります。植物由来の揮発成分も、濃度や種類によって同様の作用を生じさせる可能性が研究者によって示唆されています。',
              color: '#6B21A8',
            },
            {
              title: '④ 「人間の活動の匂い」への警戒',
              body: '熊は本来、人間の気配を察知すると自ら離れる傾向があります（例外的な慣れた個体を除く）。人間の汗・食料・生活臭などの複合的な匂いが、熊に「この場所には人間がいる」というシグナルを送り、接近を思いとどまらせます。これは熊鈴が効果的な理由と同じ原理です。',
              color: '#92400E',
            },
          ].map((item) => (
            <div key={item.title} style={{ background: '#FAFAFA', border: `1px solid #EFEFED`, borderLeft: `4px solid ${item.color}`, borderRadius: 8, padding: '18px 20px' }}>
              <div style={{ fontWeight: 700, color: item.color, fontSize: 14, marginBottom: 8 }}>{item.title}</div>
              <p style={{ fontSize: 14, color: '#4A4A45', lineHeight: 1.85, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* 3 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          国内外の研究事例
        </h2>

        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1A1A16', marginTop: 24, marginBottom: 12 }}>🇺🇸 米国：ワシントン州立大学 ベア・リサーチセンター</h3>
        <p>ワシントン州立大学のWSU Bear Centerは、生きた熊を用いた嗅覚・行動の研究を継続的に行っています。熊を様々な匂いに暴露させて反応を測定した実験では、<strong>ムスク系の匂いに対して熊が回避行動を示す</strong>ことが確認されました。研究チームは「人間には許容できる匂いで、熊がキャンプサイトへの接近を思いとどまる忌避剤の開発につながる可能性がある」と述べています。同センターは熊の行動・神経科学・保全に関する査読論文を多数発表しています。</p>

        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1A1A16', marginTop: 32, marginBottom: 12 }}>🇨🇦 🇺🇸 北米：松精油と野生動物忌避の研究</h3>
        <p>Journal of Chemical Ecology（化学生態学の国際的な査読誌）に掲載された研究では、<strong>松の精油（パインオイル）が野生動物に対する忌避効果を示す</strong>ことが報告されています。研究対象はノウサギやハタネズミでしたが、揮発性テルペン類が哺乳類の行動に広範に影響を与えることを示す重要な知見です。熊を含む野生動物の嗅覚忌避研究の基礎的根拠の一つとなっています。</p>

        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1A1A16', marginTop: 32, marginBottom: 12 }}>🇯🇵 日本：東京大学監修による野外試験</h3>
        <p>日本国内でも、東京大学名誉教授・矢代光雄教授の指導のもとで熊忌避剤の成分研究・野外試験が実施されています。青森県での野外試験では、<strong>木酢液やハーブ系揮発成分を用いた忌避剤が熊の接近抑制に有効</strong>であるという結果が得られ、効果が「100%に近い」と報告されています。木酢液は炭焼き由来の有機酸・フェノール類・アルデヒド類など数百種の揮発成分を含み、強烈な煙臭が熊の嗅覚に強いシグナルを与えると考えられています。</p>

        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1A1A16', marginTop: 32, marginBottom: 12 }}>🌍 肉食動物の尿成分による忌避：ScienceDaily掲載研究</h3>
        <p>ScienceDaily（2011年）に掲載された研究では、肉食動物の尿に含まれる特定の揮発性化合物が、ネズミ類に本能的な回避・恐怖行動を引き起こすことが確認されました。この反応は学習によるものではなく<strong>本能的（先天的）な嗅覚回避反応</strong>であることが示されており、熊を含む哺乳類全般に類似のメカニズムが存在する可能性が指摘されています。</p>

        {/* 4 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          植物由来成分が注目される科学的な理由
        </h2>
        <p>なぜ近年、OC（カプサイシン）のような強刺激成分ではなく、植物由来の揮発成分が研究・製品開発の注目を集めているのでしょうか。</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 14, marginTop: 20 }}>
          {[
            { title: '環境・生態系への影響が少ない', body: 'カプサイシン等の強刺激成分は熊以外の生物・土壌・水系にも影響を与える可能性があります。植物由来の揮発成分は生物分解性が高く、環境負荷が低いとされます。', icon: '🌿' },
            { title: '慣れ（習慣化）が起きにくい', body: '強烈な刺激成分に繰り返し晒された熊は次第に慣れる可能性があります。自然環境に存在する植物系の匂いは、天然の忌避シグナルに近いため慣れが起きにくいと考えられています。', icon: '🔄' },
            { title: '人間・農作物への安全性', body: '誤噴射・散布ミスが発生した際の人体・農作物への影響を考えると、刺激性の低い植物由来成分の方が安全性の観点から優れています。', icon: '🛡' },
            { title: '広範囲散布への適性', body: 'エリア全体に散布する用途では、強刺激成分は扱いが困難です。植物由来成分はエリア散布に適した物性を持つものが多く、研究・製品化が進んでいます。', icon: '📍' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: '16px 16px' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#143D1E', fontSize: 13, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.75 }}>{item.body}</div>
            </div>
          ))}
        </div>

        {/* 5 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          匂いによる対策の限界と正しい使い方
        </h2>
        <div style={{ background: '#FEF9E7', border: '1px solid #FDE68A', borderRadius: 8, padding: '20px 20px' }}>
          <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 12 }}>⚠️ 科学的な注意点</p>
          <ul style={{ paddingLeft: 20, color: '#78350F', fontSize: 14, lineHeight: 1.85 }}>
            <li style={{ marginBottom: 8 }}>すべての熊・すべての状況で同等の効果が出るわけではありません。個体差・慣れ・空腹度・天候等により効果は変動します</li>
            <li style={{ marginBottom: 8 }}>強風・降雨時は成分の拡散・流出により効果が低下します。定期的な再散布が必要です</li>
            <li style={{ marginBottom: 8 }}>匂いによる対策は「熊を近づかせにくくする」ものであり、100%の遭遇回避を保証するものではありません</li>
            <li style={{ marginBottom: 8 }}>遭遇時の護身手段（熊撃退スプレー）と組み合わせて使用することが推奨されます</li>
          </ul>
        </div>
        <p style={{ marginTop: 16 }}>
          科学的な知見を踏まえると、匂いによる対策は「事前散布によって熊が接近しにくい環境をつくる」用途に最も有効です。護身用の撃退スプレーとは目的・用途が根本的に異なります。
        </p>

        {/* まとめ */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #EFEFED' }}>
          まとめ
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            '熊の嗅覚は犬の約7倍・人間の約2,100倍。嗅球は脳の5倍以上を占め、嗅覚受容体遺伝子は約1,100個',
            '肉食動物の尿に含まれるVOC、強烈な植物性揮発成分が本能的な回避行動を引き起こすことが複数の研究で確認されている',
            'WSU Bear Center（米国）・化学生態学誌・東京大学監修の国内試験など、植物由来成分の忌避効果を支持する研究が蓄積されている',
            '植物由来成分は環境負荷・安全性・慣れにくさの観点から、エリア散布型忌避剤の素材として研究が進んでいる',
            '匂いによる対策はあくまで「近づかせにくくする」予防手段であり、護身用品との使い分けが重要',
          ].map((point, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, background: '#F8F8F6', borderRadius: 6, padding: '12px 16px', alignItems: 'flex-start' }}>
              <span style={{ background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 11, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
              <span style={{ fontSize: 14, color: '#4A4A45', lineHeight: 1.75 }}>{point}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, background: '#143D1E', borderRadius: 8, padding: '32px 28px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>KUMANUKEについて</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>
            KUMANUKEは植物由来の香気成分を主体としたエリア散布型の野生動物対策スプレーです。科学的な知見をもとに開発されていますが、すべての状況・個体において同等の効果を保証するものではありません。OCガス・カプサイシン不使用。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#E07A30', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 4, textDecoration: 'none' }}>
            製品詳細を見る
          </Link>
        </div>

        <div style={{ marginTop: 32, fontSize: 12, color: '#9A9A95', lineHeight: 1.85, background: '#F8F8F6', padding: '16px 20px', borderRadius: 6 }}>
          <strong>参考情報：</strong>Washington State University Bear Research, Education and Conservation Center / Journal of Chemical Ecology "Efficacy of pine oil as repellent to wildlife" / ScienceDaily "The smell of danger: Rats instinctively avoid compound in carnivore urine" (2011) / Scientific Reports "Windscapes and olfactory foraging in a large carnivore" / 東京大学名誉教授・矢代光雄氏監修による忌避剤野外試験（青森県）
        </div>

        <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #EFEFED' }}>
          <p style={{ fontSize: 13, color: '#9A9A95', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            <Link href="/guide/how-to-choose-bear-repellent" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ 熊よけスプレーの種類と選び方</Link>
            <Link href="/guide/bear-spray-accidents" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ 熊スプレーの誤噴射事故と法的リスク</Link>
            <Link href="/guide/camping-bear-prevention" style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ キャンプ場・野営地での熊対策</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
