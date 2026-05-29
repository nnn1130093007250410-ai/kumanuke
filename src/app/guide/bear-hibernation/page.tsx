import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマの冬眠メカニズム｜生理学・脂肪代謝・目覚めの危険性を解説 | KUMANUKE',
  description: 'クマの冬眠は「本当の冬眠」ではない。心拍数・体温・脂肪代謝の変化、目覚め直後の危険性、近年の冬眠短縮と気候変動との関係を最新研究をもとに解説します。',
  alternates: { canonical: 'https://kumanuke.vercel.app/guide/bear-hibernation' },
  openGraph: {
    title: 'クマの冬眠メカニズム｜生理学・脂肪代謝・目覚めの危険性',
    description: 'クマの冬眠は「本当の冬眠」ではない。脂肪代謝・心拍変化・目覚め後の危険期を研究データで解説。',
    url: 'https://kumanuke.vercel.app/guide/bear-hibernation',
  },
}

export default function BearHibernationPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 12 }}>
            <span style={{ background: '#0C5C3E', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 3, letterSpacing: '0.1em' }}>LAB</span>
            <span style={{ background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, letterSpacing: '0.05em', opacity: 0.85 }}>生態・行動</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            クマの冬眠メカニズム｜<br />生理学・脂肪代謝・目覚めの危険性を解説
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2026年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#F0FDF4', borderLeft: '3px solid #143D1E', borderRadius: 4 }}>
          クマの冬眠は「深い眠り」ではありません。心拍数は10〜15bpm程度まで落ちますが体温は4〜6℃しか下がらず、外部刺激に反応できる状態を維持しています。この「不完全な冬眠」が、冬眠穴を刺激したときの突然の攻撃性を生む一因です。本記事では、クマの冬眠の生理学・脂肪代謝・目覚めのタイミングと、それに伴う危険性を解説します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          クマの冬眠は「本当の冬眠」ではない
        </h2>
        <p>
          生物学的に「真の冬眠（true hibernation）」とは、体温が環境温度に近づくまで低下し、心拍・代謝が極端に抑制される状態を指します。コウモリ・ハリネズミ・ジリスなどがこれにあたります。
        </p>
        <p style={{ marginTop: 16 }}>
          一方クマの冬眠は「<strong>torpor（とろ眠）</strong>」または「<strong>winter lethargy（冬季無活動）</strong>」と呼ばれ、厳密には真の冬眠とは区別されます。最大の違いは体温低下の程度です。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 16, marginTop: 24 }}>
          {[
            { label: '通常体温', value: '38〜39℃', sub: '活動期', color: '#143D1E' },
            { label: '冬眠中体温', value: '32〜34℃', sub: '低下幅4〜6℃のみ', color: '#1F5C2E' },
            { label: '冬眠中心拍数', value: '10〜15 bpm', sub: '通常40〜70 bpmから低下', color: '#0C5C3E' },
            { label: '代謝抑制率', value: '約25%', sub: '真の冬眠動物は75%以上', color: '#166534' },
          ].map((item) => (
            <div key={item.label} style={{ background: item.color, borderRadius: 8, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>{item.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 20 }}>
          このため冬眠中でも外部刺激（特に穴の入口付近への接触）に反応でき、驚かされた場合は素早く攻撃に転じることができます。スキーのオフピステや山岳地帯での雪崩捜索でクマの冬眠穴を刺激した事故は、北米・北欧でも複数記録されています。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          冬眠前の「超食期（ハイパーファジア）」と脂肪蓄積
        </h2>
        <p>
          冬眠の準備として、クマは秋に「<strong>ハイパーファジア（Hyperphagia：超食期）</strong>」と呼ばれる異常食欲期に入ります。北海道大学・帯広畜産大学の研究では、この時期の一日摂取カロリーは最大20,000kcalに達するとされています。
        </p>

        <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 8, padding: '20px 24px', marginTop: 20, marginBottom: 20 }}>
          <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 8, fontSize: 14 }}>📊 ハイパーファジア期の行動変化</p>
          <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 14, color: '#1A1A16', lineHeight: 1.9 }}>
            <li>期間：8月下旬〜11月（北日本は10月中旬まで）</li>
            <li>摂取カロリー：8,000〜20,000 kcal/日（活動期の3〜5倍）</li>
            <li>体重増加量：30〜50%（体重100kgのクマなら150kg前後まで）</li>
            <li>睡眠時間：大幅に短縮（採食優先）</li>
            <li>主食：ドングリ・ブナ実・山葡萄・アケビ・蜂蜜・魚類</li>
          </ul>
        </div>

        <p>
          この時期のクマは人間との距離感が通常より縮まりやすいため、秋の山でのクマ事故リスクが高まります。特にドングリの凶作年は食料不足から人里・農地への依存が強まります（詳細：<Link href="/guide/why-bears-come-to-towns" style={{ color: '#143D1E', fontWeight: 700 }}>クマはなぜ人里に来るのか</Link>）。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          冬眠穴の選択と場所
        </h2>
        <p>
          クマは土中・岩の隙間・倒木の根元・急斜面の掘削穴など多様な場所を冬眠穴に使用します。ツキノワグマは樹洞（木の空洞）を好む傾向があり、ブナ・ミズナラ・スギなどの大径木が利用されます。
        </p>

        <div style={{ overflowX: 'auto', marginTop: 20, marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#143D1E', color: '#fff' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>種</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>好む冬眠穴タイプ</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>冬眠開始時期</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>冬眠終了時期</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['ツキノワグマ（本州）', '樹洞・岩の隙間・急斜面掘削', '11月中旬〜12月', '3月下旬〜4月'],
                ['ヒグマ（北海道）', '土中掘削・岩穴・倒木', '11月〜12月上旬', '3月中旬〜4月下旬'],
                ['アメリカクロクマ', '樹洞・岩穴・人工構造物', '11月〜12月', '3月〜4月'],
                ['グリズリー', '斜面掘削穴（主）', '10月下旬〜11月', '4月〜5月'],
              ].map(([species, type, start, end], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #EFEFED', background: i % 2 === 0 ? '#F8F8F6' : '#fff' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600 }}>{species}</td>
                  <td style={{ padding: '10px 14px' }}>{type}</td>
                  <td style={{ padding: '10px 14px' }}>{start}</td>
                  <td style={{ padding: '10px 14px' }}>{end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          目覚め直後が最も危険なタイミング
        </h2>
        <p>
          冬眠明けのクマは複数の理由から<strong>攻撃性が高い</strong>状態にあります。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16, marginBottom: 16 }}>
          {[
            { title: '① 極度の空腹状態', body: '冬眠中は体脂肪のみで生存。目覚め後は即座に食料探索を始める。食料への執着が強く、異常接近しやすい。' },
            { title: '② 生理機能の回復段階', body: '筋肉・神経系は正常に機能するが、消化器系・体温調節はまだ回復途中。短時間で激しい行動が可能な「危険な移行状態」。' },
            { title: '③ 縄張り意識の高まり', body: '越冬後の採食エリアへの執着。他個体や人間の接近に過敏に反応する。' },
            { title: '④ 母クマは子連れ', body: '出産は冬眠中の1〜2月。目覚め時は生後2〜3ヶ月の子グマを連れており、保護本能が極めて強い（詳細：繁殖と母子行動の記事参照）。' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#FFF7F0', border: '1px solid #FBBF24', borderRadius: 6, padding: '14px 18px' }}>
              <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 6, fontSize: 14 }}>{item.title}</p>
              <p style={{ fontSize: 13, color: '#5A5A55', margin: 0, lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <p>
          環境省・北海道のデータでは、クマ事故の件数は4〜5月（冬眠明け）に急増します。山菜採りの季節と重なるため、この時期の入山には特に注意が必要です（<Link href="/guide/sansai-bear-safety" style={{ color: '#143D1E', fontWeight: 700 }}>山菜採り・野山作業中の熊対策</Link>）。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          気候変動と冬眠の変化
        </h2>
        <p>
          近年、クマの冬眠期間が短縮しているという報告が増えています。東京農工大学・野生動物管理学研究室の調査では、本州ツキノワグマの冬眠入りが10〜20年前と比較して平均2〜3週間遅くなっている地域があることが示されています。
        </p>

        <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: 8, padding: '20px 24px', marginTop: 20, marginBottom: 24 }}>
          <p style={{ fontWeight: 700, color: '#1E3A5F', marginBottom: 12, fontSize: 15 }}>冬眠短縮の影響</p>
          <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 14, color: '#1A1A16', lineHeight: 2 }}>
            <li><strong>冬季の人里出没増加</strong>：積雪が少ない温暖な年は冬眠に入らず晩秋〜初冬に農地・集落へ</li>
            <li><strong>目覚め前の人間との遭遇リスク増加</strong>：春先の入山シーズンとのオーバーラップ拡大</li>
            <li><strong>秋のハイパーファジア期の長期化</strong>：食料探索期間の延長 = 出没リスク増加期間の延長</li>
            <li><strong>個体ごとの冬眠不一致</strong>：雄・若個体は冬眠しない年も増加</li>
          </ul>
        </div>

        <p>
          スウェーデン農業科学大学の長期研究では、ヨーロッパオオカミと同様に北欧のクマも年間活動期間が伸び続けていることが示されており、「通年危険期」への移行が世界的課題となっています（<Link href="/guide/climate-change-bears" style={{ color: '#143D1E', fontWeight: 700 }}>気候変動とクマ出没</Link>）。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          冬眠に関するよくある誤解
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          {[
            { myth: '「冬眠中は絶対に動かない」', fact: '誤り。刺激を与えれば即座に反応・攻撃できる。冬眠穴の近くに近づくことは危険。' },
            { myth: '「雪が積もればクマは冬眠している」', fact: '誤り。雄・若い個体は暖冬の年に冬眠しないことがある。雪が少ない年ほど冬季出没が増える。' },
            { myth: '「冬眠明けのクマは弱っている」', fact: '誤り。筋肉量は保たれており運動能力に低下はない。空腹で攻撃的という意味でむしろ危険。' },
            { myth: '「春に出会ったクマは穏やかだ」', fact: '誤り。冬眠明けは最も攻撃性が高い時期のひとつ。特に母クマは子グマを守るために激しく防衛する。' },
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #DDDDD8', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ background: '#EF4444', padding: '8px 16px', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                ❌ 誤解：{item.myth}
              </div>
              <div style={{ background: '#F0FDF4', padding: '10px 16px', fontSize: 13, color: '#1A1A16', lineHeight: 1.7 }}>
                ✅ 正しくは：{item.fact}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginTop: 56, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          対策への示唆
        </h2>
        <p>
          冬眠メカニズムの理解は、具体的な安全行動につながります。
        </p>
        <ul style={{ paddingLeft: 20, lineHeight: 2.2, marginTop: 12 }}>
          <li><strong>3〜5月の入山は冬眠明けクマに最大注意</strong>：特に4月は要警戒</li>
          <li><strong>秋の山（9〜11月）はハイパーファジア期クマが活発</strong>：果樹・ドングリ林近辺では距離を置く</li>
          <li><strong>暖冬の年は冬季の集落出没にも備える</strong>：自治体の出没情報を継続確認</li>
          <li><strong>ドングリ凶作年の翌春は特に警戒</strong>：栄養不足のまま冬眠入りし、目覚め後の食料探索が激しくなる</li>
        </ul>

        {/* Related articles */}
        <div style={{ marginTop: 56, background: '#F0F7F2', border: '1px solid #C8DDD0', borderRadius: 8, padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 16 }}>関連記事</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン｜季節ごとの行動変化とリスクカレンダー' },
              { href: '/guide/bear-diet-ecology', label: 'クマの食性と採食生態｜季節別食料戦略と出没リスクの関係' },
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動' },
              { href: '/guide/bear-reproduction-cubs', label: 'クマの繁殖と母子行動｜なぜ母グマは最も危険なのか' },
              { href: '/guide/sansai-bear-safety', label: '山菜採り・野山作業中の熊対策｜春の最危険期を安全に' },
              { href: '/guide/climate-change-bears', label: '気候変動とクマ出没｜温暖化が熊の行動・生息域・冬眠に与える影響' },
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
