import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '電気柵によるクマ対策｜設置の科学・有効性の研究・補助金制度 | KUMANUKE',
  description: '電気柵はクマ対策として最も実証された非致死型手段のひとつです。動作原理・設置要件・維持管理・費用と補助制度・国内外の有効性データを解説。農地・果樹園・養蜂場・ゴミ置き場への活用方法も紹介します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/electric-fence-bear-prevention' },
  openGraph: {
    title: '電気柵によるクマ対策｜設置の科学・有効性データ・補助金制度 | KUMANUKE',
    description: 'クマ対策として実証された電気柵の動作原理・設置要件・維持管理・補助金制度を徹底解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/electric-fence-bear-prevention',
  },
}

export default function ElectricFenceBearPreventionPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1F5C2E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            対策・予防
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            電気柵によるクマ対策<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>設置の科学・有効性の研究・補助金制度</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：対策・予防
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          電気柵（Electric fence）は、農地・果樹園・養蜂場・ゴミ収集所などへのクマの侵入を物理的に防ぐ手段として、国内外で広く利用されています。クマを傷つけることなく「接近すると不快な刺激がある」という学習を促す、非致死型管理の中で最も実証データが豊富な手法のひとつです。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、電気柵がどのような原理で機能するか、効果的な設置条件、維持管理の要点、費用と補助金制度、そして国内外の有効性データを詳しく解説します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. 電気柵の動作原理：なぜクマに効くか
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          電気柵は高電圧（通常5,000〜10,000V）・低電流のパルス電気を通電した導線により構成されます。動物が触れると回路が完成し、瞬間的に電気ショックが与えられます。電流値は低く設定されているため、通常は致死的な危険はなく、強烈な痛みと驚きを与えることが目的です。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマへの電気柵が特に有効な理由は、<strong>クマの鼻先が感受性の高い部位</strong>であることです。クマは鼻で匂いを確認しながら障壁に近づく習性があるため、鼻先が導線に触れた瞬間に強烈な電気刺激を受けます。これが「この場所に近づくと痛い」という条件付け学習として機能するとされています。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          2. 有効性データ：国内外の研究・実証事例
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
          {[
            { source: 'スロベニア・EU支援プロジェクト（LIFE DINALP BEAR）', data: '養蜂場に電気柵を設置した結果、ブラウンベアによる被害件数が90%超削減されたと報告。EU LIFE資金を活用した設置支援プログラムで、スロベニア・クロアチア両国に普及。', effect: '90%超削減', color: '#059669' },
            { source: '米国・Wildlife Conservation Society', data: 'イエローストーン周辺農家への電気柵設置補助プログラムで、グリズリーによる農業被害が設置農家で大幅に低減。設置コストの90%以上を補助する制度が農家の参加率を向上させた。', effect: '被害件数大幅低減', color: '#1E40AF' },
            { source: '日本国内・各都道府県の実証', data: '農林水産省および各都道府県の調査では、適切に設置・維持された電気柵により農作物被害が80%以上削減された農家の事例が報告されている。ただし草が当たる・電圧低下などメンテナンス不足の場合は効果が著しく低下する。', effect: '80%以上削減（適切維持の場合）', color: '#D97706' },
          ].map((r, i) => (
            <div key={i} style={{ border: `1px solid #DDDDD8`, borderLeft: `4px solid ${r.color}`, borderRadius: 6, padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: r.color, margin: 0 }}>{r.source}</p>
                <span style={{ display: 'inline-block', background: r.color, color: '#fff', fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>効果：{r.effect}</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: '#5A5A55', margin: 0 }}>{r.data}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          3. 設置の要点：クマに効く配線設計
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          電気柵の効果は設置方法に大きく左右されます。クマに対して特に重要なポイントは以下のとおりです。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {[
            { point: '①地面からの高さ：低い位置の導線が鍵', detail: '一般的なシカ・イノシシ向け電気柵と異なり、クマ用は鼻先に当たる高さの導線が重要です。地面から15〜20cmの高さに1本、その上に40〜50cm・70〜80cmに各1本の計3段が推奨される設置例です。低い導線が鼻先に触れることで効果が高まります。' },
            { point: '②電圧：6,000〜10,000Vが目安', detail: 'クマは厚い毛皮と皮下脂肪があるため、一般農業用の電圧では効果が不十分なことがあります。6,000〜10,000Vのパルス電圧が確保できる電気柵器（エネルギッシャー）を選択することが推奨されます。' },
            { point: '③アース（接地）の質が効果を決める', detail: 'アース棒の設置が不十分な場合、電気回路が完成しにくく電撃力が大幅に低下します。湿った土壌に十分な長さのアース棒を複数本設置することが重要です。乾燥地・岩盤の多い場所では特に注意が必要です。' },
            { point: '④草刈り：最重要の維持管理', detail: '導線に草が接触すると短絡（ショート）が生じ、電圧が急低下します。電気柵周辺の草は定期的（夏場は2〜3週間に一度が目安）に刈り払う必要があります。これが電気柵管理で最も手間がかかる作業です。' },
            { point: '⑤電圧モニタリング', detail: '電圧計を設置し、定期的に電圧を測定することで異常を早期発見できます。降雨・草の繁茂・バッテリー消耗などにより電圧が低下することがあります。' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '14px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 6 }}>{item.point}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#5A5A55', margin: 0 }}>{item.detail}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          4. 費用の目安と補助金制度
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          電気柵の費用は設置規模・製品仕様によって異なりますが、一般的な農地（100m×100m程度）への設置で材料費・工事費あわせて20〜50万円程度が目安とされています（設置業者・地域によって変動）。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>補助制度の種類</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>概要・対象</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>問い合わせ先</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: '農林水産省・鳥獣被害防止総合対策事業', detail: '市区町村が策定する「鳥獣被害防止計画」に基づく防護柵設置への国庫補助。農業者が対象。', contact: '地元市区町村農林担当課' },
                { type: '都道府県独自補助', detail: '各都道府県が独自に実施する電気柵設置補助。補助率・上限額は都道府県により異なる。', contact: '都道府県農業振興部局' },
                { type: '農業共済・農業保険との組み合わせ', detail: '電気柵設置と農作物共済の組み合わせにより、設置費用・被害時の補償を両立する方法。', contact: 'NOSAI（農業共済組合）' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.type}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.detail}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          5. 電気柵の弱点と補完すべき対策
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          電気柵は有効な手段ですが、以下の弱点があります。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 48 }}>
          {[
            { weak: '維持管理が必要', detail: '草刈り・電圧確認・断線チェックを怠ると急激に効果が低下する' },
            { weak: '問題解決されたクマ', detail: '賢いクマは絶縁部を嗅ぎ当てる・下を掘るなど回避策を学習することがある' },
            { weak: '誤接触リスク', detail: '人・家畜・ペットが触れると危険。設置場所・案内表示に注意が必要' },
            { weak: '広大な農地', detail: '数ヘクタール以上の広い農地を囲うには相当なコストと管理労力が必要' },
          ].map((w, i) => (
            <div key={i} style={{ background: '#FFF8F0', border: '1px solid #FED7AA', borderRadius: 6, padding: '12px 14px' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#C05A1A', marginBottom: 4 }}>{w.weak}</p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#5A5A55', margin: 0 }}>{w.detail}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>電気柵と嗅覚忌避の組み合わせ</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            電気柵の周辺にエリア散布型の忌避スプレーを使用することで、クマが柵に近づく前の段階で接近抑制を図る多層的な対策が可能です。KUMANUKEは植物由来成分を用いた事前散布型の忌避スプレーで、電気柵との組み合わせ活用を推奨しています。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { href: '/guide/non-lethal-bear-management', label: '非致死型クマ対策の体系｜移送・条件付け嫌悪・忌避の科学' },
              { href: '/guide/farm-bear-prevention', label: '農地・畑を熊から守る方法｜農家のための熊対策' },
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
