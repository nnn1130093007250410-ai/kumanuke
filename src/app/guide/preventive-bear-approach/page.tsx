import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '予防型クマ対策とは何か｜事後対応ではなく事前接近抑制の考え方 | KUMANUKE',
  description: 'クマ対策には「出会った後に対処する」護身型と「そもそも近づけない」予防型があります。農地・住宅地・アウトドアシーンで実践できる予防型アプローチの考え方と具体的な手法を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/preventive-bear-approach' },
  openGraph: {
    title: '予防型クマ対策とは何か｜事後対応ではなく事前接近抑制の考え方 | KUMANUKE',
    description: '護身型ではなく「近づけない」予防型対策の考え方と実践手法を解説。農地・住宅・アウトドア全シーンに対応。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/preventive-bear-approach',
  },
}

export default function PreventiveBearApproachPage() {
  return (
    <main style={{ background: '#fff' }}>
      {/* Hero */}
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1F5C2E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            対策・予防
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            予防型クマ対策とは何か<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>事後対応ではなく事前接近抑制の考え方</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：対策・予防
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* 導入 */}
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマ対策というと、多くの人が最初に思い浮かべるのは「熊スプレー」や「クマ除け鈴」といった、クマと遭遇した際や遭遇前後に使う道具です。しかしこれらは本質的に「クマが来てしまった後」または「来そうな状況での対応」を想定した手段であり、クマ対策の一部に過ぎません。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマ対策を考える上でより根本的な問いは、<strong>「そもそもクマが来ない環境を作れないか」</strong>という視点です。野生動物管理の専門家や農業・林業従事者の間では、こうした「事前接近抑制」を中心に置く考え方を「予防型アプローチ」と呼び、事後対応手段との使い分けを重視しています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、予防型クマ対策の概念と具体的な手法を、農地・住宅地・アウトドアの各シーンに分けて解説します。
        </p>

        {/* Section 1 2種類の対策 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          1. 「護身型」と「予防型」：2種類の対策の違い
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '20px' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#DC2626', marginBottom: 12 }}>護身型（Reactive）</p>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {[
                '熊撃退スプレー（護身用）',
                '熊鈴・ラジオ',
                'ホイッスル・爆音機',
                '撃退用爆竹',
                'カウンターアサルト',
              ].map((i, idx) => (
                <li key={idx} style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>{i}</li>
              ))}
            </ul>
            <p style={{ fontSize: 12, color: '#888', marginTop: 10, marginBottom: 0 }}>クマが来た/来そうな状況での対応手段</p>
          </div>
          <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '20px' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 12 }}>予防型（Proactive）</p>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {[
                '誘引物（食料・生ごみ）の管理',
                '電気柵の設置・維持',
                'エリア散布型忌避スプレー',
                '緩衝帯の整備・草刈り',
                '出没情報の収集・共有',
              ].map((i, idx) => (
                <li key={idx} style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>{i}</li>
              ))}
            </ul>
            <p style={{ fontSize: 12, color: '#888', marginTop: 10, marginBottom: 0 }}>そもそもクマが来ない環境を作る手段</p>
          </div>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          護身型対策が有効なのは「クマとの遭遇が避けられない場面」や「すでに目撃情報がある場所での活動」に限定されます。一方、予防型対策は<strong>クマが来る前から効果を発揮し、リスクそのものを低下させる</strong>ことを目的としています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          専門家の多くは、護身型対策だけに依存することの危険性を指摘しており、「最善のクマ対策は、クマと出会わないことだ」という原則を強調しています。この原則を実現するのが予防型アプローチです。
        </p>

        {/* Section 2 誘引物管理 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          2. 最も重要な予防策：誘引物の徹底管理
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマが人里へやって来る主な動機のひとつは、農作物・生ごみ・果実などの「誘引物」の存在です。一度食料を入手した場所にクマは繰り返し来る傾向があるため、誘引物の管理は予防型対策の中で最も費用対効果が高い手段とされています。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {[
            { scene: '農地・果樹園', items: ['収穫後の果実を放置しない。特に柿・りんご・梅は落果後すぐに回収', '農産物の収穫残渣（茎・実の端材）を農地に放置しない', '堆肥・肥料を野外に積みっぱなしにしない（腐敗臭がクマを誘引することがある）'] },
            { scene: 'ゴミ置き場・住宅', items: ['生ごみを屋外に放置しない。金属製・防獣ゴミ箱の活用', '収集日前夜にゴミを出さない運用（早朝出しが基本）', 'ペットのエサを屋外に放置しない', 'BBQの後の食べ残し・油脂をその場に捨てない'] },
            { scene: 'キャンプサイト', items: ['食料・調理器具・においのあるものはすべてベアキャニスターや車内に保管', '食事後はテントから離れた場所で残飯を処理', '調理・食事エリアとテント設営エリアを分ける（トライアングル設営）', '化粧品・歯磨き粉・石鹸なども匂いが強い場合はベアキャニスターへ'] },
          ].map((section, si) => (
            <div key={si} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '16px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 10 }}>【{section.scene}】</p>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {section.items.map((item, i) => (
                  <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Section 3 電気柵 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          3. 物理的バリア：電気柵の効果と設置のポイント
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          電気柵はクマに対して最も実証されている物理的な予防手段のひとつです。農地・果樹園・養蜂場・ゴミ収集所などに設置することで、クマの侵入リスクを大幅に低減できることが複数の研究・実証事例から報告されています。
        </p>
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '20px 24px', marginBottom: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>電気柵設置の基本ポイント</p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {[
              'クマは鼻先が敏感なため、地面から15〜20cmの高さにも一本設ける（鼻先への刺激が特に有効）',
              '電圧は6,000〜10,000V程度が推奨（クマの厚い毛皮を通す十分な電圧が必要）',
              '草が触れると電圧が低下するため、柵周辺の草刈りを定期的に行う',
              '侵入歴のあるクマには誘引トラップ（フックにマリネ済みベーコンなど）で学習させる手法がある',
              '農林水産省・各都道府県の農業被害対策補助金が活用できる場合がある',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26' }}>{item}</li>
            ))}
          </ul>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          電気柵の弱点は設置・維持にコストがかかること、広範囲の対応が難しいこと、そして誤って人や家畜が触れるリスクがある点です。そのため、電気柵と他の手段（誘引物管理・忌避剤散布など）を組み合わせることが推奨されています。
        </p>

        {/* Section 4 忌避剤 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          4. 嗅覚忌避アプローチ：エリア散布型スプレーの役割
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの高度な嗅覚特性を逆用した「嗅覚忌避アプローチ」は、予防型対策のひとつとして注目されています。特定の植物由来成分をエリアに散布することで、クマがその場所への接近を避けようとする行動変化を促すことが期待されます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          護身用の熊スプレーと異なり、エリア散布型の忌避スプレーは<strong>「クマが来る前に・広い範囲に・事前に使用する」</strong>点が特徴です。直接クマに向けて噴射するものではないため、誤噴射のリスクも異なります。農地の外周・ゴミ置き場周辺・テントサイト周辺・山小屋の周囲などへの使用が想定されています。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>比較項目</th>
                <th style={{ background: '#DC2626', color: '#fff', padding: '10px 14px', textAlign: 'center' }}>護身用スプレー</th>
                <th style={{ background: '#1F5C2E', color: '#fff', padding: '10px 14px', textAlign: 'center' }}>エリア散布型忌避剤</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: '使用タイミング', reactive: '遭遇時・至近距離', preventive: '事前・広いエリアに' },
                { item: '使用目的', reactive: '攻撃の阻止（緊急）', preventive: '接近抑制（予防）' },
                { item: 'カテゴリ', reactive: '護身型（Reactive）', preventive: '予防型（Proactive）' },
                { item: '誤噴射リスク', reactive: '高い（高圧ガス・強刺激）', preventive: '低い（事前散布）' },
                { item: '効果の持続', reactive: '即効性・短時間', preventive: '持続性・定期再散布が必要' },
                { item: '無人環境での効果', reactive: '使用者不在では使えない', preventive: '設置後は無人でも機能' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: '#F8F8F6' }}>{r.item}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'center', background: i % 2 === 0 ? '#FFF5F5' : '#FEF2F2' }}>{r.reactive}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'center', background: i % 2 === 0 ? '#F5FBF5' : '#F0F7F2' }}>{r.preventive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 5 緩衝帯 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          5. 環境整備：緩衝帯・視認性の確保
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          農地・集落の周辺に繁茂した藪・草木は、クマが身を隠しながら接近する「侵入路」になりやすいとされています。定期的な草刈り・下草刈り・不要な低木の除去により、視認性を確保し人の活動の気配を維持することが、クマの接近抑制に寄与するとされています。
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 48 }}>
          {[
            '農地・果樹園の周辺50m以内は草刈りを定期的に行う',
            '耕作放棄地は可能な限り管理し、クマの隠れ場・移動路にしない',
            '集落内の柿・栗・梅など野生動物を誘引する植物は適切に管理（収穫・剪定）',
            '農地への入口に「人が管理している」ことを示す人工的な音や光を活用する',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 15, lineHeight: 1.85, color: '#2A2A26', marginBottom: 8 }}>{item}</li>
          ))}
        </ul>

        {/* まとめ */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          まとめ：予防型対策を基盤にした多層的アプローチ
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          効果的なクマ対策は、護身型手段だけに依存するのではなく、予防型対策を基盤とした多層的なアプローチを構築することで実現します。誘引物の管理、電気柵、嗅覚忌避スプレー、環境整備、出没情報の活用を組み合わせることで、クマが来る環境そのものを変えることを目指します。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          護身用スプレーや熊鈴は、予防対策を実施した上でなお遭遇リスクが残る場合の「最終手段」として位置づけるのが、専門家や野生動物管理の現場における共通認識となっています。
        </p>

        {/* KUMANUKE CTA */}
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>予防型対策の一手段として</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            KUMANUKEは植物由来成分を活用したエリア散布型の忌避スプレーです。農地・ゴミ置き場・キャンプサイトなどへの事前散布による接近抑制を目的とした「予防型」の製品として設計されています。護身用スプレーとの違いを理解した上での活用をお勧めします。
          </p>
          <Link href="/products/kumanuke" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        {/* Related */}
        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { href: '/guide/smells-bears-dislike', label: 'クマが嫌いな匂いとは｜忌避成分の種類・作用と研究事例' },
              { href: '/guide/how-to-choose-bear-repellent', label: '熊よけスプレーの種類と選び方｜護身用と事前散布型の違い' },
              { href: '/guide/farm-bear-prevention', label: '農地・畑を熊から守る方法｜農家のための熊対策' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
