import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Olfactory Repellent研究の最前線｜嗅覚忌避を科学する国際的アプローチ | KUMANUKE',
  description: '「Olfactory Repellent（嗅覚忌避剤）」として野生動物行動学・化学生態学の分野で進む国際的研究を解説。カプサイシン誘導体・植物由来VOC・USDA研究・TRPV1受容体の役割など、嗅覚忌避の科学的基盤を体系的に紹介します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/olfactory-repellent-research' },
  openGraph: {
    title: 'Olfactory Repellent研究の最前線｜嗅覚忌避を科学する国際的アプローチ | KUMANUKE',
    description: '化学生態学・野生動物行動学から見た嗅覚忌避研究の最前線。VOC・カプサイシン・TRPV1受容体など科学的基盤を解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/olfactory-repellent-research',
  },
}

export default function OlfactoryRepellentResearchPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            海外研究・論文解説
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            Olfactory Repellent研究の最前線<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>嗅覚忌避を科学する国際的アプローチ</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：海外研究・論文解説
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          野生動物管理において、動物の嗅覚に作用して特定の場所・物質・行動を回避させる「Olfactory Repellent（嗅覚忌避剤）」の研究は、化学生態学・行動神経科学・野生動物管理学が交差する学際的な分野として国際的な注目を集めています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマ類は哺乳類の中でも嗅覚が高度に発達しており、嗅覚刺激への反応が行動に与える影響が大きいため、Olfactory Repellent研究のモデル動物として位置づけられています。米国・カナダ・ヨーロッパを中心に、複数の研究機関がこのアプローチの科学的基盤を構築してきました。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、Olfactory Repellentの概念・作用メカニズム・国際的研究事例・課題と展望を体系的に解説します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. Olfactory Repellentとは何か
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          Olfactory Repellentは、動物の嗅覚受容体（olfactory receptor）に作用し、接近回避・採食回避・テリトリー回避などの行動変化を引き起こすことを目的とした化学物質の総称です。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          農業害虫管理の分野では「忌避剤（Repellent）」として古くから使われてきた概念ですが、大型哺乳類・クマ類への応用は近年の研究で急速に発展してきました。植物が害食動物から身を守るために進化させた揮発性化合物（VOC: Volatile Organic Compounds）が、動物の行動を制御する可能性に着目した研究が増えています。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 40 }}>
          {[
            { type: '1次的刺激（Primary repellent）', desc: '嗅覚受容体への直接的な不快刺激。カプサイシンのTRPV1受容体刺激などが代表例', color: '#DC2626' },
            { type: '2次的忌避（Secondary repellent）', desc: '危険・脅威のシグナルとして機能する匂い。捕食者の尿・燃焼臭・特定アルデヒド類など', color: '#D97706' },
            { type: '条件付き忌避（Conditioned repellent）', desc: '過去の嫌悪経験と特定の匂いが結びつくことで生じる学習性の回避行動', color: '#059669' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: `1px solid #DDDDD8`, borderLeft: `4px solid ${c.color}`, borderRadius: 6, padding: '14px' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: c.color, marginBottom: 6 }}>{c.type}</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#5A5A55', margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          2. カプサイシンとTRPV1受容体：最もよく研究された嗅覚忌避メカニズム
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          嗅覚忌避研究の中で最も科学的な蓄積があるのがカプサイシン（Capsaicin）です。カプサイシンはトウガラシ属植物が産生するバニロイド系化合物で、哺乳類の痛覚・温覚受容体である<strong>TRPV1（Transient Receptor Potential Vanilloid 1）</strong>を活性化します。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          TRPV1は熱・酸・化学的刺激に反応するポリモーダル受容体で、鼻腔粘膜・口腔・眼球などに高密度に分布しています。クマの嗅覚器官のTRPV1は人間のものより感受性が高い可能性があるとする研究者もおり、微量のカプサイシンでも強烈な刺激が生じる可能性があります。
        </p>
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>熊スプレーの科学的根拠</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            1980年代にキャリー・ハント氏（Carrie Hunt）の研究がきっかけで開発されたクマ撃退スプレーは、カプサイシン系化合物を高濃度で用いた至近距離用の護身製品です。トム・スミス博士らの2010年の研究（Journal of Wildlife Management）では、熊スプレー使用事例の92%でクマが攻撃を止めるか退避したと報告されており、これはカプサイシンのTRPV1刺激による行動応答として理解されています。
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          3. 植物由来VOCとクマ行動への影響
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          近年の化学生態学分野では、植物が産生する<strong>揮発性有機化合物（VOC）</strong>が動物の行動に及ぼす影響の研究が活発です。植物は草食動物の食害から身を守るために、揮発性テルペン類・アルデヒド類・エステル類などを産生し、これらが動物の採食行動を抑制する「植物の化学的防衛」として機能することが知られています。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>化合物分類</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>代表成分</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>研究された作用・可能性</th>
              </tr>
            </thead>
            <tbody>
              {[
                { class: 'モノテルペン', compound: 'α-ピネン・リモネン・カンファー', action: 'マツ科・シソ科植物由来。嗅覚受容体への刺激。特定の哺乳類の採食抑制効果が報告されている' },
                { class: 'フェノール系化合物', compound: 'チモール・カルバクロール（オレガノ・タイム）', action: '抗菌性・強刺激臭。木酢液に含まれるクレオゾール類も同分類' },
                { class: 'バニロイド類', compound: 'カプサイシン・ジンゲロン（生姜）', action: 'TRPV1受容体の直接刺激。嗅覚的・痛覚的忌避の両面からアプローチ' },
                { class: 'アルデヒド類', compound: 'シンナムアルデヒド（シナモン）', action: '強い揮発性刺激臭。接触忌避・嗅覚忌避の可能性が研究されている' },
                { class: 'サルファー化合物', compound: 'アリシン（ニンニク）', action: '強烈な刺激臭。動物忌避剤として農業分野で活用事例あり' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.class}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.compound}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20, marginTop: 48 }}>
          4. 主要な研究機関と研究成果
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {[
            {
              org: 'USDA National Wildlife Research Center（米国農務省）',
              content: '農業被害動物に対するOlfactory Repellentの実用研究を長年にわたり実施。カプサイシン系・アンモニア系・腐卵系化合物の各種野生動物（クマ・アライグマ・鹿など）への効果をフィールドテストし、条件別の有効性と限界を整理した報告書を公表しています。',
            },
            {
              org: 'Journal of Chemical Ecology（化学生態学誌）',
              content: '植物の化学的防衛と草食動物行動の関係を扱う国際誌。植物由来VOCと哺乳類の採食抑制に関する査読付き研究を多数掲載。特定のモノテルペン・フェノール系化合物が野生動物の接近回避行動を変化させる可能性を示す論文が継続的に発表されています。',
            },
            {
              org: 'Washington State University（WSU）・野生動物研究部門',
              content: 'グリズリーの嗅覚能力・食料探索行動・化学的刺激への反応に関する研究を実施。クマの嗅覚系（嗅球の解剖・嗅覚受容体の多様性）と行動応答の関係を分析した研究が、嗅覚忌避アプローチの科学的基盤形成に貢献しています。',
            },
            {
              org: '東京大学・谷田貝光克名誉教授（国内）',
              content: '超高辛度成分（ブート・ジョロキア由来カプサイシン）と木酢液を組み合わせた忌避剤の実地試験を監修。青森県内での試験で高い接近抑制効果が認められたと報告されています。全国自治体との連携実地データとして蓄積されています。',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '16px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 6 }}>{item.org}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#5A5A55', margin: 0 }}>{item.content}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          5. 研究上の課題と展望
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          Olfactory Repellent研究は発展しつつある一方で、いくつかの課題が残されています。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {[
            { issue: '個体差・状況依存性', detail: '同一の成分でも個体・空腹状態・食料誘引の強さによって効果が大きく変動する。一般化可能な「効果量」の測定が困難。' },
            { issue: '野外環境での検証', detail: '実験室・ペン試験での結果が必ずしも野外フィールドに外挿できない。天候・地形・植生・競合する匂いなど変数が多い。' },
            { issue: '慣れ（習慣化）の問題', detail: '同一成分の長期継続使用で効果が低下する可能性がある。複合成分・成分の定期変更による慣れ防止策の研究が必要。' },
            { issue: '生態毒性・非標的生物への影響', detail: '散布した忌避成分が他の野生動物・植物・土壌微生物に与える影響の評価が不十分な場合がある。植物由来成分の生分解性は優位点とされる。' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '14px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#C05A1A', marginBottom: 4 }}>{item.issue}</p>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: '#5A5A55', margin: 0 }}>{item.detail}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          今後の研究の方向性として、複数成分の組み合わせによる相乗効果の検証・マイクロカプセル化による長期徐放技術・AIを活用した個体行動パターン分析との統合などが期待されています。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          まとめ：嗅覚忌避は「科学が支える非致死型対策」
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          Olfactory Repellent研究は、クマの嗅覚特性・化学的受容メカニズム・行動生態学が交わる学際的な分野です。カプサイシンのTRPV1刺激作用から植物由来VOCの行動変化誘発まで、科学的な基盤が着実に構築されています。ただし、野外での実効性は条件依存性が高く、単独で用いるより誘引物管理・電気柵・生息地管理と組み合わせた多層的なアプローチの一部として活用されることが、現在の科学的コンセンサスに近い見解です。
        </p>

        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>植物由来成分を活用した忌避アプローチ</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            KUMANUKEは、植物由来の忌避成分を配合したエリア散布型スプレーです。上記の研究が示す嗅覚忌避の科学的知見を参照しながら設計された製品で、農地・ゴミ置き場・キャンプサイトなどへの事前散布による接近抑制を目的としています。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/bear-olfactory-science', label: '熊が匂いで近づかない理由｜科学的メカニズムを解説' },
              { href: '/guide/smells-bears-dislike', label: 'クマが嫌いな匂いとは｜忌避成分の種類・作用と研究事例' },
              { href: '/guide/non-lethal-bear-management', label: '非致死型クマ対策の体系｜移送・条件付け嫌悪・忌避の科学' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ fontSize: 14, color: '#143D1E', fontWeight: 600, textDecoration: 'none' }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
