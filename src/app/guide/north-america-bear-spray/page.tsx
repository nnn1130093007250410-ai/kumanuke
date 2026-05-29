import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '北米のベアスプレー文化｜義務化・研究・効果の科学 | KUMANUKE',
  description: '北米でベアスプレーはなぜ文化として定着したのか。トム・スミス博士の97.9%有効率研究・国立公園での義務化経緯・銃との効果比較・日本との規制の違いを詳解。',
  alternates: { canonical: 'https://kumanuke.vercel.app/guide/north-america-bear-spray' },
  openGraph: {
    title: '北米のベアスプレー文化｜義務化・研究・効果の科学',
    description: '97.9%有効率の研究・グレイシャー国立公園の義務化・銃との比較。北米ベアスプレー文化の全体像。',
    url: 'https://kumanuke.vercel.app/guide/north-america-bear-spray',
  },
}

export default function NorthAmericaBearSprayPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#1E3A5F', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 12 }}>
            <span style={{ background: '#7C3AED', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 3, letterSpacing: '0.1em' }}>WORLD</span>
            <span style={{ background: '#7C3AED', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, opacity: 0.85 }}>海外研究・文化</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            北米のベアスプレー文化｜<br />義務化・研究・効果の科学
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>更新日：2026年5月</p>
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px', fontSize: 15, color: '#333', lineHeight: 1.9 }}>

        <p style={{ fontSize: 16, color: '#1A1A16', fontWeight: 500, lineHeight: 1.85, marginBottom: 32, padding: '20px 24px', background: '#EFF6FF', borderLeft: '3px solid #1E3A5F', borderRadius: 4 }}>
          北米でハイキングをすれば、登山者のほぼ全員がベアスプレー缶をベルトホルスターに装着しています。この文化は1980年代に科学的研究と痛ましい事故の積み重ねの中から生まれました。「銃より有効」「97.9%の使用成功率」という研究成果が、今日の北米ベアスプレー文化の科学的基盤です。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          ベアスプレー文化の起源
        </h2>
        <p>
          北米でのベアスプレー開発は1980年代のアメリカ・モンタナ州グレイシャー国立公園での事故増加がきっかけです。1967年の「ナイト・オブ・グリズリー」と呼ばれる夜間の致死的事故など、複数の深刻な被害が社会的議論を呼びました。
        </p>
        <p style={{ marginTop: 16 }}>
          1980年代後半、ウィリアム・ロジャース博士（William Rogers）らが<strong>カプサイシン系スプレー</strong>のクマへの効果を研究し始め、1990年代にはUSDA（米国農務省）森林局が使用を推奨。2000年代には国立公園での「必携品」化が急速に広まりました。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          トム・スミス博士の研究：97.9%の有効率
        </h2>
        <p>
          ベアスプレー研究の最重要論文は、ブリガム・ヤング大学（BYU）のトム・スミス博士（Tom Smith）とスティーブン・ヘロー博士による研究です。
        </p>
        <p style={{ marginTop: 16 }}>
          この研究では1985〜2006年にアラスカで記録された<strong>83件のベアスプレー使用事例</strong>を分析し、以下の結論を導きました。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 16, marginTop: 20, marginBottom: 24 }}>
          {[
            { label: '攻撃を阻止した割合', value: '97.9%', sub: '83件中81件で有効', color: '#0C5C3E' },
            { label: '人身被害なし（ゼロ）', value: '84%', sub: 'スプレー使用時', color: '#143D1E' },
            { label: 'グリズリーに有効', value: '93%', sub: '最も危険な種でも', color: '#1F5C2E' },
            { label: '調査期間', value: '21年間', sub: '1985〜2006年', color: '#1E3A5F' },
          ].map((item) => (
            <div key={item.label} style={{ background: item.color, borderRadius: 8, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>{item.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <p>
          同研究では同期間の<strong>銃器使用事例（261件）</strong>も分析し、ベアスプレーは銃より有効という衝撃的な結論を示しました。
        </p>

        <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 8, padding: '20px 24px', marginTop: 20, marginBottom: 24 }}>
          <p style={{ fontWeight: 700, color: '#92400E', marginBottom: 12, fontSize: 14 }}>📊 ベアスプレー vs 銃（Smith et al. 2008）</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#92400E', color: '#fff' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>指標</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>ベアスプレー</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>銃器</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['攻撃阻止率', '97.9%', '76%'],
                  ['人身被害ゼロの割合', '84%', '50%'],
                  ['重篤被害率', '2%未満', '약 8%'],
                  ['誤使用リスク', '低（自傷少）', '高（誤射等）'],
                  ['精神的負担', '低', '高'],
                ].map(([metric, spray, gun], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #FEE8A0', background: i % 2 === 0 ? '#FFFBF0' : '#fff' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{metric}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'center', color: '#0C5C3E', fontWeight: 700 }}>{spray}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'center', color: '#B91C1C' }}>{gun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 11, color: '#92400E', marginTop: 8, margin: '8px 0 0' }}>出典：Smith, T.S., Herrero, S., DeBruyn, T.D., Wilder, J.M. (2008). Efficacy of Bear Deterrent Spray in Alaska. Journal of Wildlife Management.</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          国立公園での義務化・推奨の広がり
        </h2>
        <p>
          米国では複数の国立公園・保護区がベアスプレーの携帯を義務化または強く推奨しています。
        </p>
        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#1E3A5F', color: '#fff' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>地域・施設</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>規制内容</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['グレイシャー国立公園（モンタナ）', '携帯強く推奨。レンジャーが積極的に指導。入口でレンタル可能。'],
                ['デナリ国立公園（アラスカ）', '荒野エリアへの入山許可条件として実質必携。'],
                ['イエローストーン国立公園', 'バックカントリー利用者へ必携推奨。ビジターセンターで販売・教育実施。'],
                ['BC州全域（カナダ）', '国立公園・州立公園では「推奨」から「必携」に移行中。'],
                ['アラスカ州漁業・野生動物局', 'ベアカントリーへの入山者に事実上必携とみなす指針。'],
              ].map(([location, rule], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #DBEAFE', background: i % 2 === 0 ? '#F8FAFF' : '#fff' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600 }}>{location}</td>
                  <td style={{ padding: '10px 14px', lineHeight: 1.6 }}>{rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          北米ベアスプレーと日本の「熊撃退スプレー」の違い
        </h2>
        <p>
          北米のベアスプレーと日本で流通している製品では、<strong>用途・設計思想・規制の枠組み</strong>が異なります。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16, marginBottom: 20 }}>
          {[
            {
              title: '射程距離',
              na: '最大9〜11m（連続噴射対応）',
              jp: '3〜5m程度（短距離）',
              note: '北米基準は実際の攻撃を想定した長距離設計',
            },
            {
              title: '濃度規制',
              na: 'EPA登録必須（カプサイシン1〜2%）',
              jp: '護身スプレー≒催涙スプレー（法的グレーゾーン）',
              note: '日本での「熊撃退スプレー」の法的位置づけは曖昧',
            },
            {
              title: '使用文化',
              na: '入山者全員の「必携品」として定着',
              jp: '「護身用」として販売だが携帯は少数',
              note: '誤噴射事故が問題になっている（2026年JR駅構内事故等）',
            },
            {
              title: 'トレーニング',
              na: '国立公園で使用法訓練を提供',
              jp: '訓練機会がほぼない',
              note: '日本でも正しい訓練体制の整備が課題',
            },
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #DBEAFE', borderRadius: 6, overflow: 'hidden', fontSize: 13 }}>
              <div style={{ background: '#1E3A5F', padding: '6px 14px', color: '#fff', fontWeight: 700, fontSize: 12 }}>{item.title}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #DBEAFE' }}>
                <div style={{ padding: '10px 14px', background: '#F0FDF4', borderRight: '1px solid #DBEAFE' }}>
                  <div style={{ fontSize: 10, color: '#0C5C3E', fontWeight: 700, marginBottom: 3 }}>🇺🇸🇨🇦 北米</div>
                  <div>{item.na}</div>
                </div>
                <div style={{ padding: '10px 14px' }}>
                  <div style={{ fontSize: 10, color: '#B91C1C', fontWeight: 700, marginBottom: 3 }}>🇯🇵 日本</div>
                  <div>{item.jp}</div>
                </div>
              </div>
              <div style={{ padding: '8px 14px', background: '#FFF7F0', fontSize: 11, color: '#92400E' }}>
                ⚠️ {item.note}
              </div>
            </div>
          ))}
        </div>

        <p>
          なお、日本では<strong>「エリア散布型」</strong>の事前予防スプレーという別アプローチも存在します。遭遇後の護身ではなく、事前に人間の存在を知らせ近づかせないという設計思想の製品です（<Link href="/guide/how-to-choose-bear-repellent" style={{ color: '#1E3A5F', fontWeight: 700 }}>熊よけスプレーの種類と選び方</Link>）。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #DBEAFE' }}>
          日本での「ベアスプレー文化」確立への課題
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          {[
            '銃刀法・火薬類取締法との整合性：カプサイシン製品の製造・流通・携帯に関する明確な法的位置づけが必要',
            '使用訓練の体制整備：使い方を知らずに携帯しても誤噴射・効果不足につながる',
            '製品品質の標準化：射程・濃度・容量の最低基準策定',
            '社会的認知の形成：「スプレーを持って山に入る」が当たり前になる文化形成',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: '#F8FAFF', border: '1px solid #DBEAFE', borderRadius: 6 }}>
              <span style={{ fontSize: 14, color: '#1E3A5F', fontWeight: 700, flexShrink: 0 }}>0{i + 1}</span>
              <p style={{ fontSize: 13, color: '#1A1A16', margin: 0, lineHeight: 1.7 }}>{item}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: 8, padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E3A5F', marginBottom: 16 }}>関連記事</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/canada-bear-smart', label: 'カナダBear Smartプログラム｜人と熊の共存政策モデル' },
              { href: '/guide/how-to-choose-bear-repellent', label: '熊よけスプレーの種類と選び方' },
              { href: '/guide/bear-spray-accidents', label: '熊スプレーの誤噴射事故と法的リスク' },
              { href: '/guide/bear-spray-transportation-rules', label: '熊スプレーは飛行機・新幹線に持ち込めるか' },
              { href: '/guide/olfactory-repellent-research', label: 'Olfactory Repellent研究の最前線' },
              { href: '/guide/international-bear-management', label: '海外のクマ対策研究・管理事例' },
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
