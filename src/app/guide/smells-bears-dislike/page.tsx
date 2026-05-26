import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマが嫌いな匂いとは｜忌避成分の種類・作用と研究事例 | KUMANUKE',
  description: 'クマが嫌う匂い・忌避成分について、カプサイシン・木酢液・精油成分など科学的な観点から解説。東京大学名誉教授の監修による実地試験の結果や、嗅覚特性を利用した忌避アプローチの原理を紹介します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/smells-bears-dislike' },
  openGraph: {
    title: 'クマが嫌いな匂いとは｜忌避成分の種類・作用と研究事例 | KUMANUKE',
    description: 'カプサイシン・木酢液・精油成分など、クマの嗅覚特性を利用した忌避アプローチの原理と研究事例を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/smells-bears-dislike',
  },
}

export default function SmellsBearsDislikePage() {
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
            クマが嫌いな匂いとは<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>忌避成分の種類・作用メカニズムと研究事例</span>
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
          クマの嗅覚は犬の7倍、人間の約2100倍の能力を持つとされており、微量の匂い分子を遠距離から検知することができます（ワシントン州立大学・野生動物研究部門の報告など複数の研究が示す推定値）。クマはこの卓越した嗅覚を主に食料探索・危険の察知・コミュニケーションに用いています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          この嗅覚特性の逆を利用したのが「忌避アプローチ」です。特定の成分の匂いがクマにとって強い刺激・不快感をもたらし、その場所への接近を抑制する行動変化をもたらす可能性があることが、複数の研究や実地試験から報告されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、クマが忌避すると考えられている主要な成分・匂いの種類と、そのメカニズム・研究背景を解説します。
        </p>

        {/* Section 1 嗅覚解剖 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. クマの嗅覚：なぜ匂いによるアプローチが有効か
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの嗅覚器官は哺乳類の中でも特に発達しています。嗅上皮（匂い分子を受容する粘膜組織）の面積は人間の約100倍ともされており、嗅球（匂いを処理する脳の領域）が脳全体に占める比率も犬と同等かそれ以上と推定されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマはこの嗅覚を活用して、数十キロメートル先の食料の匂いを検知するとも言われており（アラスカ・グリズリー研究の事例報告より）、視覚・聴覚が劣る環境でも嗅覚で周囲の状況を把握しています。
        </p>
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '20px 24px', marginBottom: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>嗅覚が高度に発達しているがゆえの逆説</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            嗅覚が高度に発達しているということは、強烈な臭気刺激に対して人間が感じる以上の不快感を受ける可能性を意味します。ヒトにとっては微量でも感じる刺激臭・揮発性成分は、クマにとってはその数百〜数千倍の強度で受容される可能性があります。この原理が嗅覚忌避アプローチの理論的根拠となっています。
          </p>
        </div>

        {/* Section 2 カプサイシン */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          2. カプサイシン：最もよく研究された忌避成分
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          <strong>カプサイシン（Capsaicin）</strong>は唐辛子に含まれる辛味成分で、哺乳類の痛覚受容体（TRPV1）を強く刺激する化合物です。熊撃退スプレー（護身用）の主成分として広く使用されており、クマが至近距離でこれを吸引・目に浴びると強烈な刺激により一時的に退避行動を取るとされています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          護身用スプレーとしてのカプサイシン効果については、米国のトム・スミス博士らによる研究（2008年、Journal of Wildlife Management掲載）で、クマとの遭遇事例を分析した結果、熊スプレー使用により96%の事例で攻撃が止まった、または被害軽減が認められたと報告されています。ただし、これは至近距離での直接噴射による結果であり、距離を置いたエリア散布とは状況が異なります。
        </p>

        {/* カプサイシン忌避実験 */}
        <div style={{ background: '#FFF8F0', border: '1px solid #FED7AA', borderLeft: '4px solid #E07A30', borderRadius: 8, padding: '20px 24px', marginBottom: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#C05A1A', marginBottom: 8 }}>東京大学名誉教授の監修による国内実地試験</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            国内では、東京大学名誉教授・谷田貝光克先生の指導のもと、超高辛度唐辛子成分（ブート・ジョロキア由来カプサイシン）と木酢液を組み合わせた忌避剤の実地試験が実施されています。青森県内に出没するクマを対象とした試験では高い接近抑制効果が認められたと報告されており、全国の自治体との連携による実地データも蓄積されています。ただし、忌避効果は条件や個体差によりばらつきがあることも報告されており、「行動変化の可能性」として評価されています。
          </p>
        </div>

        {/* Section 3 木酢液 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          3. 木酢液：煙臭・刺激臭による忌避効果
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          木酢液は木材を炭化させる際に生じる揮発性成分を含む液体で、酢酸・フェノール・クレオソール・グアイアコールなど数百種類の化合物を含んでいます。動物忌避剤として古くから農業・林業分野で使用されており、イノシシ・シカなどへの忌避効果も報告されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマへの作用については、煙や燃焼に関連した匂いが「危険のサイン」として認識される可能性があること、フェノール系化合物の強烈な刺激臭が嗅覚への強い不快刺激になりうることが考えられています。カプサイシンとの組み合わせにより相乗的な忌避効果が期待されるとして、国内の忌避製品に多く採用されています。
        </p>

        {/* Section 4 精油・植物成分 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          4. 精油・植物由来成分：研究が進む嗅覚忌避物質
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          近年、農業・環境科学の分野では、野生動物の行動に影響を与える植物由来の揮発性有機化合物（VOC）の研究が活発化しています。Journal of Chemical Ecology（化学生態学誌）に掲載された複数の研究は、特定の植物成分が哺乳類の行動変化をもたらす可能性を示しており、その知見がクマ忌避への応用研究にも影響を与えています。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>成分・物質</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>由来</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>想定される忌避メカニズム</th>
              </tr>
            </thead>
            <tbody>
              {[
                { substance: 'カプサイシン', source: '唐辛子（ナス科）', mechanism: 'TRPV1受容体への直接刺激、強烈な痛覚・刺激感' },
                { substance: '木酢液成分（酢酸・フェノール類）', source: '木材の炭化副産物', mechanism: '煙・燃焼臭による危険シグナル的認識の可能性、刺激臭による忌避' },
                { substance: 'α-ピネン・β-ピネン（テルペン類）', source: 'マツ科精油', mechanism: '特定の揮発性テルペンが食料探索行動を抑制する可能性（研究途上）' },
                { substance: 'ユーカリプトール（1,8-シネオール）', source: 'ユーカリ精油', mechanism: '強い刺激臭による嗅覚への忌避刺激、粘膜への刺激性' },
                { substance: 'ハッカ・メントール', source: 'ハッカソウ精油', mechanism: '冷感刺激（TRPM8受容体）への作用、強い揮発性による忌避' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.substance}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.source}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.mechanism}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 48 }}>※ 上記の成分はいずれも動物行動研究の対象であり、実用的忌避効果については研究継続中のものを含みます。</p>

        {/* Section 5 効果の条件 */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          5. 忌避効果に影響する条件
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          忌避成分の効果は、使用環境・天候・散布方法・クマの個体差などによって大きく変動します。現時点の研究データから整理できる主要な影響因子は以下のとおりです。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {[
            { factor: '揮発量・散布量', detail: '忌避成分は揮発することで効果を発揮します。散布量が少なすぎる場合や揮発が進んだ後は効果が低下します。定期的な再散布が推奨されます。' },
            { factor: '降雨・降雪', detail: '雨によって成分が流れ落ちることがあります。雨天後は再散布が必要なケースがあります。耐水性の高い製剤では持続性が改善されています。' },
            { factor: '気温・風向き', detail: '高温時には揮発が促進され効果範囲が広がる可能性がある一方、揮発が早すぎると持続時間が短くなります。風向きによって効果が偏ることもあります。' },
            { factor: 'クマの個体差・学習', detail: '人里に慣れた個体ほど忌避刺激への感受性が下がる場合があります。長期間同じ成分を使い続けると、慣れが生じる可能性もあり、成分の組み合わせや変更が有効な場合があります。' },
            { factor: '食料誘引と忌避刺激のバランス', detail: '強い食料誘引（農作物・生ごみ）がある環境では、忌避刺激よりも食料への誘引が上回ることがあります。誘引物の管理と組み合わせて使用することが重要です。' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '14px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 6 }}>{item.factor}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#5A5A55', margin: 0 }}>{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Section 6 まとめ */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          6. まとめ：嗅覚忌避は「接近抑制」のアプローチ
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの高度な嗅覚特性を逆用した忌避アプローチは、クマを「追い払う」ものではなく、特定の場所への接近を避ける行動変化を促すことを目的としています。カプサイシン・木酢液・精油成分などの複合的な活用により、農地・ゴミ置き場・キャンプサイトなどへの接近抑制効果が期待されており、国内外の複数の実地試験で一定の有効性が報告されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          ただし、忌避効果は環境条件・個体差・誘引物の状況によって変動します。電気柵・誘引物の除去・出没情報の活用など、複数の対策を組み合わせることが実効的なクマ対策の基本とされています。
        </p>

        {/* KUMANUKE CTA */}
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40, marginTop: 32 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>植物由来成分を活用した忌避アプローチ</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            KUMANUKEは植物由来の忌避成分を配合したエリア散布型のスプレーです。農地・ゴミ置き場・キャンプサイトなど、クマの接近が懸念される場所への事前散布を想定しています。護身用スプレーとは異なり、広いエリアへの散布で接近抑制効果を期待する「予防型」の忌避アプローチ製品です。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        {/* Related */}
        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/bear-olfactory-science', label: '熊が匂いで近づかない理由｜科学的メカニズムを解説' },
              { href: '/guide/how-to-choose-bear-repellent', label: '熊よけスプレーの種類と選び方｜護身用と事前散布型の違い' },
              { href: '/guide/bear-spray-accidents', label: '熊スプレーの誤噴射事故と法的リスク' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ fontSize: 14, color: '#143D1E', fontWeight: 600, textDecoration: 'none' }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
