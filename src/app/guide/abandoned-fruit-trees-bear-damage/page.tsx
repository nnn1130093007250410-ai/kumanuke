import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '放置果樹・放任果樹が熊を呼ぶ｜農村の誘引源管理と対策 | KUMANUKE',
  description: '管理されない柿・リンゴ・栗などの「放任果樹」はクマの強力な誘引源です。農村部の人口減少・高齢化が生む放置果樹問題の実態と、自治体の補助制度・具体的な管理対策を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/abandoned-fruit-trees-bear-damage' },
  openGraph: {
    title: '放置果樹・放任果樹が熊を呼ぶ｜農村の誘引源管理と対策 | KUMANUKE',
    description: '柿・リンゴ・栗などの放任果樹がクマの誘引源になるメカニズムと、管理対策・自治体補助制度を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/abandoned-fruit-trees-bear-damage',
  },
}

export default function AbandonedFruitTreesBearDamagePage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#92400E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            農業・農地
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            放置果樹・放任果樹が熊を呼ぶ<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>農村の誘引源管理と具体的な対策</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：農業・農地
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          農村部でクマ被害が増加している背景のひとつとして、研究者・行政が一致して指摘するのが「放任果樹」の問題です。収穫されずに木についたまま、あるいは落果したまま放置された柿・栗・リンゴ・梅などの果実は、クマにとって大量の糖質・カロリーを提供する「人工的な食料源」として機能します。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、放任果樹がなぜクマの誘引源になるのか、農村部の社会的背景との関係、そして個人・自治体レベルでの対策と補助制度を解説します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. 「放任果樹」とは何か
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          「放任果樹」（「放置果樹」とも呼ばれる）とは、農業従事者が高齢化・離農などにより適切に管理・収穫できなくなった果樹を指します。もともと農産物として生産されていたものが、後継者不足や採算悪化などにより放置状態になったものが多く含まれます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          日本の農村部では特に、<strong>柿・栗・梅・リンゴ・桃・プラム</strong>などが集落周辺の民家や農地跡に残されているケースが多く見られます。これらは意図的に植えられたものでも、鳥が種を運んで自生したものでも、管理されていなければ同様に誘引源となります。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
          {[
            { fruit: '柿（カキ）', risk: '最高', timing: '10〜12月', note: '秋の過食期と完全に重なる。糖度が高く遠距離からも匂う' },
            { fruit: '栗（クリ）', risk: '高', timing: '9〜10月', note: '山のドングリ代替として利用される。落果後も長期間残る' },
            { fruit: 'リンゴ', risk: '高', timing: '8〜10月', note: '果実が大きく高カロリー。腐敗後も発酵臭で誘引し続ける' },
            { fruit: '梅（ウメ）', risk: '中', timing: '6〜7月', note: '早い時期に落果するため初夏のリスク。農地周辺に多い' },
            { fruit: '桃（モモ）', risk: '中〜高', timing: '7〜9月', note: '甘い香りが強く誘引性が高い。栽培農地での被害事例多数' },
            { fruit: 'クルミ', risk: '高', timing: '9〜10月', note: '脂質・カロリーが高く冬眠前の重要な食料源になる' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '12px 14px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A16', marginBottom: 4 }}>{f.fruit}</p>
              <p style={{ fontSize: 12, color: f.risk === '最高' ? '#DC2626' : f.risk === '高' ? '#D97706' : '#059669', fontWeight: 700, marginBottom: 4 }}>誘引リスク：{f.risk}</p>
              <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>時期：{f.timing}</p>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: '#5A5A55', margin: 0 }}>{f.note}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          2. なぜ農村部で放任果樹が増えるのか
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          放任果樹の増加は、農村部が抱える社会構造的問題の表れです。農林水産省の統計では、農業就業人口は1990年代から一貫して減少を続けており、農業従事者の平均年齢は70歳を超えています。高齢化・後継者不足により、労力の要る果樹の収穫・剪定・管理が困難になった農家が増加しています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          また、中山間地域では一部の農地が耕作放棄されても、そこにある果樹はそのまま残ります。民家が空き家化しても庭の柿の木はそのまま実をつけ続けます。「管理する人がいない」状態で食料が供給され続けるという皮肉な状況が生まれています。
        </p>
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderLeft: '4px solid #DC2626', borderRadius: 8, padding: '20px 24px', marginBottom: 40 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#DC2626', marginBottom: 8 }}>「柿一本でクマを呼ぶ」</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            環境省・各都道府県の野生動物対策担当者の間では「柿一本あれば集落にクマが来る」という認識が広まっています。特に10月・11月の柿の熟成期は、クマの過食期（Hyperphagia）と完全に重なります。山のドングリが凶作だった年には、集落の柿がクマにとって最重要の食料源になります。放任された柿の木一本が、複数のクマを繰り返し集落に誘引するトリガーになりうると指摘されています。
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          3. 匂いによる長距離誘引：クマはどこから察知するか
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの嗅覚は人間の約2100倍と言われており、熟した果実・腐敗した果実の発する揮発性有機化合物（エステル類・アルコール類）を数キロメートル離れた場所からでも検知できる可能性があるとされています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          特に問題となるのが<strong>腐敗・発酵した果実</strong>です。落果して時間が経過した果実は発酵が進み、アルコールや強烈な甘臭が発生します。この匂いはさらに遠距離までクマを引き寄せる可能性があり、「落果したらすぐに回収する」ことが重要な理由のひとつです。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          4. 自治体の補助制度：放任果樹の伐採・除去を支援
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          放任果樹問題の深刻さを受け、全国の自治体が独自の補助制度を設けています。以下はその代表的な事例です。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {[
            { pref: '神奈川県・松田町', detail: '「クマ誘引放任果樹伐採補助金」制度を設置。放任された果樹の伐採費用の一部を補助。伐採の条件・対象樹種・補助額を条例で規定。' },
            { pref: '京都府・綾部市', detail: '「集落内の放任果樹の伐採補助」制度。集落内に残された果樹の伐採について費用補助を実施。' },
            { pref: '環境省・農林水産省（連名ガイドライン）', detail: '「令和6年度クマ被害対策等に関する関係省庁連絡会議」において、放任果樹等の誘引物の除去・管理を重点対策として位置づけ。全国自治体へ対策推進を促している。' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 6, padding: '14px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 6 }}>{item.pref}</p>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: '#5A5A55', margin: 0 }}>{item.detail}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          お住まいの自治体に同様の補助制度があるかどうかは、市区町村の農林担当課や鳥獣被害対策担当窓口に問い合わせることで確認できます。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          5. 個人・地域でできる具体的な対策
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 48 }}>
          {[
            { priority: '最優先', title: '収穫・落果の徹底回収', body: '柿・栗・リンゴなど果実が実る木は、収穫時期になったら速やかに収穫する。落果した果実は放置せずに回収・廃棄する。特に10月前後は毎日の確認が望ましい。', color: '#DC2626' },
            { priority: '高優先', title: '不要な果樹の伐採・撤去', body: '収穫する意思がなく、今後も管理できない果樹は根本から伐採することが最も根本的な対策。伐採費用は自治体の補助制度を活用できる場合がある。', color: '#D97706' },
            { priority: '高優先', title: '空き家・廃農地の果樹管理', body: '自分の所有地でなくても、隣接する空き家や廃農地の果樹が誘引源になっている場合は、土地所有者と連絡を取るか、自治体に相談する。', color: '#D97706' },
            { priority: '中優先', title: '残渣（落ち葉・腐果）の定期清掃', body: '収穫後も地面に残る落果・腐果を定期的に清掃する。腐敗した果実は特に強い匂いを発し、遠距離からの誘引源になりやすい。', color: '#059669' },
            { priority: '中優先', title: '果樹周辺への忌避対策の組み合わせ', body: '伐採・収穫だけでは対応しきれない場合、果樹周辺に電気柵を設置したり、嗅覚忌避スプレーを定期散布することで接近を抑制する対策を組み合わせる。', color: '#059669' },
          ].map((item, i) => (
            <div key={i} style={{ border: `1px solid #DDDDD8`, borderLeft: `4px solid ${item.color}`, borderRadius: 6, padding: '14px 20px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ display: 'inline-block', background: item.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 3 }}>{item.priority}</span>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A16', margin: 0 }}>{item.title}</p>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#5A5A55', margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          6. 地域全体での取り組みが鍵
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          放任果樹問題は個人の努力だけでは解決が難しいケースも多く、地域全体での取り組みが必要です。一軒の民家が丁寧に管理していても、隣の空き家に柿の木があれば、その集落全体にクマが来続けます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          農業集落・自治会・市区町村の農林担当課と連携し、集落単位での調査・管理計画を作ることが、持続的な対策の基盤となります。近年は農業被害対策と絡めて、地域ぐるみの放任果樹マッピング・管理計画策定を支援する事業を展開する自治体も増えてきています。
        </p>

        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40, marginTop: 32 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>果樹・農地周辺の忌避対策として</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            果樹の管理と並行して、収穫期前から果樹周辺にエリア散布型の忌避スプレーを使用することで、クマの接近を抑制する対策を組み合わせることができます。KUMANUKEは植物由来成分を用いた事前散布型の製品です。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { href: '/guide/farm-bear-prevention', label: '農地・畑を熊から守る方法｜農家のための熊対策' },
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説' },
              { href: '/guide/bear-seasonal-activity', label: 'クマの年間活動パターン｜季節ごとの行動変化と出没リスクカレンダー' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
