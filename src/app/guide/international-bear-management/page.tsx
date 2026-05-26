import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '海外のクマ対策研究・管理事例｜北米・ヨーロッパの知見から学ぶ | KUMANUKE',
  description: 'カナダ・米国・スウェーデン・スロベニアなど、クマとの共存に先行する海外の管理手法・研究事例を紹介。Bear Smartプログラム、電気柵支援、行動管理研究など国際的な知見と日本への示唆を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/international-bear-management' },
  openGraph: {
    title: '海外のクマ対策研究・管理事例｜北米・ヨーロッパの知見 | KUMANUKE',
    description: 'カナダ・米国・北欧のBear Smart・電気柵支援・行動管理研究など国際的なクマ対策の知見と日本への示唆を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/international-bear-management',
  },
}

const cases = [
  {
    region: 'カナダ・ブリティッシュコロンビア州',
    bearType: 'ブラックベア・グリズリー',
    program: 'Bear Smart Community Program',
    summary: 'ブリティッシュコロンビア州は、自治体が「Bear Smart」認定を受けるためのプログラムを導入しました。認定取得には、誘引物管理条例の制定・施行、地域住民への啓発活動、問題個体の対処計画策定、官民の協力体制構築といった要件を満たす必要があります。認定コミュニティでは非認定地域に比べ、クマとの軋轢件数が有意に低下したと報告されています。',
    keyPoints: [
      '誘引物管理（ゴミ・果実・BBQ残渣）の徹底が最重要施策',
      '認定コミュニティ制度で住民・行政・企業が一体的に取り組む',
      '問題個体はまず移送、繰り返す個体は処分という段階的対応',
      'クマが食料を得た場合と得なかった場合を記録・分析して対策を改善',
    ],
    color: '#1E40AF',
  },
  {
    region: '米国・イエローストーン国立公園周辺',
    bearType: 'グリズリーベア（ハイイログマ）',
    program: 'Greater Yellowstone Ecosystem 保全管理',
    summary: 'イエローストーン周辺のグリズリーは1970年代に絶滅危機に瀕していましたが、個体数管理・生息地保護・農業者支援プログラムにより個体数が回復（現在800頭以上）。電気柵設置への補助金プログラム（Wildlife Conservation Society等が支援）や、養蜂場・家畜農場への無償支援が奏功しています。',
    keyPoints: [
      '電気柵設置補助金プログラム：農業者が申請すれば費用の大部分を負担',
      'GIS・GPSを活用した個体のモニタリングと行動範囲の追跡',
      '公園外での被害農家への経済的補償制度（Wildlife Compensation Program）',
      '観光エコシステムとの両立：エコツーリズム収益がクマ保全資金に',
    ],
    color: '#D97706',
  },
  {
    region: 'スウェーデン',
    bearType: 'ブラウンベア（ヒグマ）',
    program: '国家ブラウンベア管理計画',
    summary: 'スウェーデンではブラウンベアが1930年代に約130頭まで激減しましたが、保護政策と個体数管理により現在3,000頭以上に回復。同時に農業・牧畜被害を一定水準に抑えているのは、ハンターによる科学的個体数管理・農業者への被害補償・市民教育の三本柱が機能しているためとされています。',
    keyPoints: [
      '国が定めた許容個体数上限（ハーベストクォータ）に基づくハンティング管理',
      '家畜・農業被害への政府補償プログラムで農業者の経済的打撃を緩和',
      '電気柵の普及：羊・ヤギなどの小家畜への電気柵設置費用を補助',
      '大学・研究機関と猟友会が連携したモニタリングプログラム',
    ],
    color: '#059669',
  },
  {
    region: 'スロベニア・クロアチア',
    bearType: 'ブラウンベア（ヨーロッパヒグマ）',
    program: 'LIFE DINALP BEAR プロジェクト（EU支援）',
    summary: 'ディナルアルプス地域のブラウンベアを対象にしたEU支援の保全・共存プロジェクト。人の多い農業地帯と隣接した生息地でのクマとの共存モデルを研究・実践しています。電気柵普及支援・養蜂場保護・家畜保護犬の活用・農業者への補償など多面的なアプローチが特徴です。',
    keyPoints: [
      'EU LIFE資金による電気柵・防護柵の設置補助',
      '養蜂場の電気柵化で蜂蜜被害を90%以上削減した報告',
      'グレートピレニーズなど牧羊犬・保護犬の配布プログラム',
      '観光・環境教育を組み合わせた地域住民の理解促進策',
    ],
    color: '#6B21A8',
  },
  {
    region: '米国・アラスカ州（学術研究）',
    bearType: 'グリズリー・ポーラーベア・ブラックベア',
    program: 'ブリガムヤング大学・トム・スミス博士ほかの研究群',
    summary: '野生動物研究者トム・スミス博士らを中心に、クマとの遭遇事例の体系的分析が行われています。2008年のJournal of Wildlife Management掲載論文では、熊スプレー使用事例の分析を実施。また音刺激実験・誘引物の種類と引き付け距離の研究・夜間出没パターンの分析など、対策の科学的根拠形成に貢献しています。',
    keyPoints: [
      '熊スプレーの有効性研究（遭遇事例の96%で攻撃阻止または被害軽減）',
      '食料臭の引き付け距離実験：クマは数km先からでも誘引物の匂いを検知する可能性',
      '音刺激実験：低音（60-70dB）には反応薄、高音（110dB超）には反応あり',
      'ナイトカメラ・GPS追跡を組み合わせた行動圏研究',
    ],
    color: '#DC2626',
  },
]

export default function InternationalBearManagementPage() {
  return (
    <main style={{ background: '#fff' }}>
      {/* Hero */}
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            科学・研究
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            海外のクマ対策研究・管理事例<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>北米・ヨーロッパの知見から学ぶ</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：科学・研究
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* 導入 */}
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマと人間の共存という課題は日本だけのものではありません。カナダ・米国・スウェーデン・スロベニアなど、クマが生息する多くの国でも、農業被害・人身被害・個体数管理といった問題に直面してきました。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          日本と比べて先行したこれらの国々では、数十年にわたる試行錯誤の結果、科学的データに基づいた管理手法・住民教育プログラム・経済的支援制度が整備されつつあります。その知見は日本のクマ問題に対しても多くの示唆を与えています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、海外の主要なクマ管理プログラム・研究事例を紹介し、日本の状況への応用可能性を考察します。
        </p>

        {/* 事例紹介 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 24 }}>
          主要な海外事例・研究
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {cases.map((c, i) => (
            <div key={i} style={{ border: '1px solid #DDDDD8', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ background: c.color, padding: '14px 20px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{c.region}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: 0 }}>対象：{c.bearType} ／ {c.program}</p>
              </div>
              <div style={{ padding: '20px', background: '#fff' }}>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: '#2A2A26', marginBottom: 16 }}>{c.summary}</p>
                <div style={{ background: '#F8F8F6', borderRadius: 4, padding: '12px 16px' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#5A5A55', marginBottom: 8 }}>主要ポイント</p>
                  <ul style={{ paddingLeft: 20, margin: 0 }}>
                    {c.keyPoints.map((point, pi) => (
                      <li key={pi} style={{ fontSize: 13, lineHeight: 1.8, color: '#2A2A26' }}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 日本への示唆 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          日本への示唆：共通する「成功要因」
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          海外の成功事例を横断的に見ると、いくつかの共通要素が浮かび上がります。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 32 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>成功要因</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>日本での現状・課題</th>
              </tr>
            </thead>
            <tbody>
              {[
                { factor: '誘引物管理の法的義務化', current: '自主的対応が主。条例での義務化はまだ少ない' },
                { factor: '農業者・牧畜業者への補償制度', current: '都道府県レベルの制度あり。制度の認知・利用率が課題' },
                { factor: '電気柵設置への公的補助', current: '農林水産省・都道府県の補助制度あり。普及率はまだ低い地域も' },
                { factor: 'GPS・ナイトカメラ等を使った科学的モニタリング', current: '研究機関・一部自治体で導入。データの共有・活用に課題' },
                { factor: 'コミュニティ単位の一体的取り組み', current: '集落・自治体レベルの取り組みが増加中。担い手不足が課題' },
                { factor: '問題個体への段階的対応（移送→処分）', current: '移送より捕殺が多い現状。専門的なトランスロケーション体制が課題' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.factor}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.current}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 忌避研究 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          嗅覚忌避研究：国際的な研究動向
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの行動に影響を与える化学物質の研究は、化学生態学（Chemical Ecology）の分野で進んでいます。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {[
            {
              journal: 'Journal of Chemical Ecology',
              findings: '植物由来の揮発性有機化合物（VOC）が哺乳類の忌避行動をもたらす可能性を示す複数の研究を掲載。特定のモノテルペン・セスキテルペン類がクマ類の行動変化に関与しているとする研究が報告されています。',
            },
            {
              journal: 'Washington State University（WSU）野生動物研究部門',
              findings: 'グリズリーの嗅覚能力の詳細な研究。嗅球の発達・嗅覚受容体の多様性・食料探索における嗅覚依存度について、野外実験とサンプル分析を組み合わせた研究成果が蓄積されています。',
            },
            {
              journal: 'USDA National Wildlife Research Center',
              findings: '農業害獣としてのクマ類に対する忌避剤の有効性評価を実施。カプサイシン系・アンモニア系・動物由来匂い物質の各種成分のフィールドテスト結果を公表。特定条件下での忌避効果と限界を整理しています。',
            },
          ].map((r, i) => (
            <div key={i} style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 6, padding: '16px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 6 }}>{r.journal}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: '#5A5A55', margin: 0 }}>{r.findings}</p>
            </div>
          ))}
        </div>

        {/* まとめ */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          まとめ：科学・政策・地域の三位一体
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          海外の成功事例に共通するのは、「科学的データに基づく管理」「農業者・住民への経済的サポート」「地域コミュニティの参加」の三位一体の体制です。単純な「駆除強化」でも「保護一辺倒」でもなく、データと利害関係者の連携に基づいた現実的な共存管理が機能していることがわかります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          日本でも近年、環境省・農林水産省・都道府県・大学・NPO・地域コミュニティが連携した取り組みが増えています。国際的な知見を取り入れながら、日本固有の里山環境・社会構造に合った共存管理モデルの構築が求められています。
        </p>

        {/* KUMANUKE CTA */}
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40, marginTop: 32 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>日本の状況に合わせた予防型対策として</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            海外の事例でも「誘引物管理」と「物理的・嗅覚的忌避対策の組み合わせ」が基本とされています。KUMANUKEは植物由来成分を活用したエリア散布型忌避スプレーで、農地・自治体・アウトドア施設など幅広いシーンへの活用を想定しています。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        {/* Related */}
        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { href: '/guide/satoyama-bear-human-coexistence', label: '里山と人獣共存問題｜クマ被害が増える構造的背景と共存への道' },
              { href: '/guide/bear-olfactory-science', label: '熊が匂いで近づかない理由｜科学的メカニズムを解説' },
              { href: '/guide/preventive-bear-approach', label: '予防型クマ対策とは何か｜事前接近抑制の考え方' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
