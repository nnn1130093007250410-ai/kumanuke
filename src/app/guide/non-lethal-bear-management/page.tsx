import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '非致死型クマ対策の体系｜移送・条件付け嫌悪・忌避・電気柵の科学 | KUMANUKE',
  description: 'クマを殺さずに管理する「非致死型（Non-lethal）対策」の体系を解説。トランスロケーション（移送）、条件付け嫌悪、ラバーバレット、威嚇犬、電気柵、忌避剤など各手法の原理・効果・限界を国際的研究とともに紹介します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/non-lethal-bear-management' },
  openGraph: {
    title: '非致死型クマ対策の体系｜移送・条件付け嫌悪・忌避・電気柵の科学 | KUMANUKE',
    description: 'トランスロケーション・条件付け嫌悪・電気柵・忌避剤など非致死型クマ管理の全手法を国際研究とともに解説。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/non-lethal-bear-management',
  },
}

export default function NonLethalBearManagementPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1E40AF', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            Wildlife Management
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            非致死型クマ対策の体系<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>移送・条件付け嫌悪・忌避・電気柵の科学</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：Wildlife Management
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          野生動物管理において、クマとの軋轢（Human-Bear Conflict）に対処する手段は大きく「致死型」と「非致死型」に分けられます。致死型管理（捕獲・駆除）は即効性がありますが、個体数の維持・生態系への影響・社会的受容性などの観点から、非致死型の手段との組み合わせが重要とされています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、国際的な野生動物管理の文脈で用いられる非致死型（Non-lethal）クマ対策の手法を体系的に整理し、各手法の原理・有効性・限界・実施条件を解説します。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          1. なぜ非致死型管理が注目されるか
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          日本を含む多くの国で、致死型管理だけに依存したクマ問題の解決は困難であることが認識されています。主な理由は以下のとおりです。
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
          {[
            '個体数が回復するにつれ、捕獲・処分の数だけでは被害増加に追いつかなくなる',
            '社会的受容性の問題：一般市民・動物保護団体からの反発がある',
            '生態系への影響：局所的な個体数減少が種の分布や生態バランスに影響する場合がある',
            'ハンター・専門家の不足により、致死型管理の実施体制が追いつかない地域がある',
            '根本的な問題（誘引物管理・生息地管理）を解決しないと、除去後に他の個体が来る',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 15, lineHeight: 1.85, color: '#2A2A26', marginBottom: 8 }}>{item}</li>
          ))}
        </ul>
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '20px 24px', marginBottom: 40 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>国際的なコンセンサス</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            国際自然保護連合（IUCN）の野生動物管理ガイドラインや、北米クマ学会（IBA: International Bear Association）の提言では、非致死型手段を優先的に検討し、それでも解決しない場合に限り致死型管理に移行する「段階的対応（graduated response）」が推奨されています。
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          2. トランスロケーション（移送・生体移送）
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          トランスロケーションとは、問題を起こした個体を捕獲して遠隔地に放逐する手法です。個体を殺すことなく人里から遠ざけることができるため、非致死型管理の代表的手段として北米・ヨーロッパで広く実施されています。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 6, padding: '16px' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>有効な条件</p>
            <ul style={{ paddingLeft: 16, margin: 0 }}>
              {['習慣化が浅い個体（初期段階）', '移送先に十分な食料・生息地がある', '移送距離が十分に長い（最低50km以上が推奨されることが多い）', '個体識別・追跡モニタリングが可能'].map((i, idx) => (
                <li key={idx} style={{ fontSize: 13, lineHeight: 1.8, color: '#2A2A26' }}>{i}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '16px' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#DC2626', marginBottom: 8 }}>限界・課題</p>
            <ul style={{ paddingLeft: 16, margin: 0 }}>
              {['習慣化した個体は移送後に元の場所（または別の人里）へ戻ることがある', '移送先地域の既存個体との競争リスク', 'コストが高い（麻酔・輸送・追跡）', '日本では移送後の追跡体制が不十分なケースも'].map((i, idx) => (
                <li key={idx} style={{ fontSize: 13, lineHeight: 1.8, color: '#2A2A26' }}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          日本では現状、問題個体は捕殺されるケースが多く、移送の体制整備は遅れているとされています。四国のツキノワグマ保全では、希少性から移送・放獣の試みも行われており、その成果が蓄積されています。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          3. 条件付け嫌悪（Aversive Conditioning）
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          特定の場所や行動に対して嫌悪刺激を与えることで、「その場所・行動は不快・危険」という連想を学習させる手法です。条件付け嫌悪は学習理論に基づいており、クマの高い認知能力を「対策のために」利用するアプローチです。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {[
            { method: 'ゴム弾・ビーンバッグ弾', detail: '専用の散弾銃で非致死性のゴム弾を発射。痛みは与えるが傷は負わせない。管理機関の64%が何らかの形で採用（複数のサーベイより）。', training: '専門的な訓練が必要。無許可での使用は問題が生じる場合あり' },
            { method: '爆音器・クラッカー弾', detail: '大音量の爆発音でクマを驚かせ逃走させる。音と場所の連想を形成させる目的で反復使用する。', training: '誘引物を除去しながら使用しないと効果が薄れる' },
            { method: '威嚇犬（ベアドッグ）', detail: 'カレリアン・ベアドッグなど、クマを追うよう訓練された犬を活用する手法。スカンジナビア・北米で実績あり。', training: '訓練・管理に専門知識が必要。日本での導入事例は限られる' },
            { method: '嗅覚・接触型嫌悪剤', detail: '特定の誘引物（食料・ゴミ）に吐き気を催す成分を添加し、食べると不快になる学習をさせる手法。', training: 'ターゲット以外の動物への影響・法規制に注意が必要' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '14px 20px' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 4 }}>{item.method}</p>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: '#2A2A26', marginBottom: 4 }}>{item.detail}</p>
              <p style={{ fontSize: 13, color: '#888', margin: 0 }}>注意：{item.training}</p>
            </div>
          ))}
        </div>
        <div style={{ background: '#FFF8F0', border: '1px solid #FED7AA', borderLeft: '4px solid #E07A30', borderRadius: 8, padding: '20px 24px', marginBottom: 40 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#C05A1A', marginBottom: 8 }}>条件付け嫌悪の限界（研究知見）</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            PubMed掲載の研究（PMC10760891など）によれば、条件付け嫌悪は短期的には警戒行動を高める効果があるものの、長期的な生息地利用パターンの変化は限定的とする報告があります。また、習慣化が進んだ個体や食料への依存が強い個体では効果が低く、早期介入が重要とされています。単独での使用より、誘引物除去との組み合わせで効果が高まる傾向があるとされています。
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          4. 物理的障壁：電気柵・防護柵
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          電気柵は非致死型管理の中で、最も実証された手法のひとつです。農地・果樹園・養蜂場・ゴミ収集所などへの設置により、クマの侵入を物理的に防ぐことができます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          北米・ヨーロッパの研究では、適切に設置・維持された電気柵により農業被害を80〜90%以上削減した事例が複数報告されています。スロベニアの養蜂場対策では電気柵化後に被害が90%超削減されたというEU支援プロジェクトのデータもあります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          日本でも農林水産省・各都道府県の補助金制度を活用した電気柵の普及が進んでいます。ただし、設置後の草刈り・電圧確認などの維持管理が継続的に必要なことと、広大な農地全体をカバーするにはコストがかかる点が課題です。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          5. 嗅覚忌避剤（Olfactory Repellent）
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの高度な嗅覚特性を利用した忌避剤の散布は、非致死型管理の中でも「予防型（Proactive）」に分類される手段です。特定の化学物質（カプサイシン誘導体・木酢液・精油成分など）を農地・集落周辺・キャンプサイトに散布することで、クマがその場所への接近を避ける行動変化を促すことが期待されます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          USDA（米国農務省）の研究部門や複数の大学研究機関が、各種植物由来成分のクマへの忌避効果をフィールドテストしており、条件によっては有効な接近抑制が確認されています。ただし、降雨・気温・個体差などによる効果の変動があり、単独での使用より他の手段との組み合わせが推奨されています。
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          6. 手法の比較と組み合わせ
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>手法</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'center' }}>即効性</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'center' }}>持続性</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'center' }}>コスト</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>最も有効な場面</th>
              </tr>
            </thead>
            <tbody>
              {[
                { method: 'トランスロケーション', instant: '高', persist: '中（戻る場合あり）', cost: '高', scene: '習慣化前の初期段階' },
                { method: '条件付け嫌悪', instant: '中', persist: '中（慣れの問題あり）', cost: '中', scene: '誘引物除去との組み合わせ' },
                { method: '電気柵', instant: '高', persist: '高（維持管理要）', cost: '中〜高', scene: '農地・果樹園・養蜂場の保護' },
                { method: '嗅覚忌避剤', instant: '中', persist: '中（再散布要）', cost: '低〜中', scene: '予防・エリア的な接近抑制' },
                { method: '威嚇犬', instant: '高', persist: '中（訓練維持要）', cost: '高', scene: '現場対応・山林内での追払い' },
                { method: '誘引物管理', instant: '低', persist: '高', cost: '低', scene: '全場面の前提・最も根本的' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.method}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'center', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.instant}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'center', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.persist}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', textAlign: 'center', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.cost}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.scene}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#143D1E', borderLeft: '4px solid #143D1E', paddingLeft: 14, marginBottom: 20 }}>
          まとめ：非致死型管理は「誘引物管理」が大前提
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          あらゆる非致死型管理手法に共通する前提は、<strong>誘引物（食料・生ごみ・放任果樹）の徹底管理</strong>です。クマが食料へのアクセスに成功し続ける限り、いかなる嫌悪刺激や忌避手段も、長期的には効果が薄れる可能性があります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          非致死型管理は一つの手段に頼るのではなく、誘引物管理・物理的障壁・嗅覚忌避・条件付け嫌悪などを組み合わせた多層的なアプローチとして実施されるとき、最も高い効果を発揮するとされています。日本でも、こうした体系的な非致死型管理の普及が今後の課題のひとつとなっています。
        </p>

        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>嗅覚忌避アプローチとして</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            KUMANUKEは植物由来成分を活用したエリア散布型の忌避スプレーです。電気柵・誘引物管理と組み合わせることで、農地・集落・アウトドア施設周辺への接近抑制対策として活用いただけます。
          </p>
          <Link href="/" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/guide/bear-learning-behavior', label: 'クマの学習能力と認知行動｜なぜ同じ場所に繰り返し来るのか' },
              { href: '/guide/electric-fence-bear-prevention', label: '電気柵によるクマ対策｜設置の科学と実効性の研究' },
              { href: '/guide/international-bear-management', label: '海外のクマ対策研究・管理事例｜北米・ヨーロッパの知見' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ fontSize: 14, color: '#143D1E', fontWeight: 600, textDecoration: 'none' }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
