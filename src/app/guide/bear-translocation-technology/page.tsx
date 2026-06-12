import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマを殺さず共存する——学習放獣・GPS追跡・ベアドッグの最前線 | KUMANUKE',
  description: '「捕獲＝駆除」ではない。学習放獣・GPS首輪による行動追跡・ベアドッグによる追払いなど、クマを殺さずに共存を目指す技術の実例と効果データを解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-translocation-technology' },
  openGraph: {
    title: 'クマを殺さず共存する——学習放獣・GPS追跡・ベアドッグの最前線 | KUMANUKE',
    description: '学習放獣・GPS首輪・ベアドッグなど、クマを殺さずに共存を目指す技術の実例と効果データを解説します。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-translocation-technology',
  },
}

export default function BearTranslocationPage() {
  return (
    <main style={{ background: '#fff' }}>

      {/* Hero */}
      <div style={{ background: '#0F2E16', padding: '64px 24px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 260, height: 260, borderRadius: '50%', background: 'rgba(94,201,124,0.06)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#1A5C2E', color: '#5EC97C', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 3, marginTop: 20, marginBottom: 16, letterSpacing: '0.06em' }}>
            技術・最前線
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3.2vw,32px)', fontWeight: 800, color: '#fff', lineHeight: 1.45, marginBottom: 16 }}>
            クマを殺さず共存する技術の最前線<br />
            <span style={{ fontSize: '0.72em', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>学習放獣・GPS追跡・ベアドッグ——日本と世界の非致死的管理</span>
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>更新日：2026年6月 ／ カテゴリ：技術・最前線</p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 96px' }}>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          クマが捕獲されると、多くの場合「駆除」が選択されます。しかし近年、「捕まえる＝殺す」ではない選択肢が、研究者・自治体・NPOによって広がっています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 48 }}>
          <strong>学習放獣・GPS首輪による行動追跡・ベアドッグを使った追払い。</strong>これらは実際に数値として成果が記録されており、日本各地で試みられています。
        </p>

        {/* 実績BOX */}
        <div style={{ background: '#0F2E16', borderRadius: 12, padding: '32px', marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.1em', margin: '0 0 20px' }}>REAL DATA</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { num: '945頭', label: '2001〜2006年の6年間に全国27都道府県で実施された非捕殺措置（学習放獣・移動放獣等）の累計', src: '環境省' },
              { num: '18%', label: '島根県で学習放獣を受けたクマの再捕獲率（受けていない個体より大幅に低い）', src: '島根県調査' },
              { num: '9件', label: '長野県軽井沢でNPOの取り組み後に減少したクマ目撃件数（2016年）。2006年は36件だった', src: 'NPOピッキオ' },
            ].map(({ num, label, src }) => (
              <div key={num} style={{ borderTop: '2px solid rgba(94,201,124,0.4)', paddingTop: 16 }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#5EC97C', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginTop: 8 }}>{label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>出典：{src}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1 学習放獣 */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>
            学習放獣——「人間は怖い」と教える
          </h2>
        </div>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 28, marginTop: 8 }}>Chapter 01</p>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          学習放獣とは、捕獲したクマに「人間の近くに来ると嫌なことが起きる」と学習させてから放す手法です。麻酔で眠らせた後、ドラム缶を叩く・爆竹・花火などで強いストレス刺激を与え、人の気配と不快感を結びつける「嫌悪条件付け」を行います。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          日本では<strong>1991年に広島県が最初に実用化</strong>しました。1991〜1998年の間に広島県で64頭を対象に学習放獣が行われています（うち56頭は捕殺対象外として放獣）。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 24 }}>
          特に成果が記録されているのが島根県です。島根県は2003年度から錯誤捕獲（クマ以外を狙った罠にかかった場合）の放獣をほぼ100%実施する体制を整え、鳥獣専門指導員による技術指導を導入。学習放獣を受けた個体の再捕獲率はわずか18%という結果が報告されています。
        </p>

        <div style={{ background: '#F5FBF6', border: '1px solid #C8E0CF', borderRadius: 10, padding: '22px 24px', marginBottom: 48 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0F2E16', marginBottom: 10 }}>学習放獣の課題</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#444', margin: 0 }}>
            効果には個体差があり、すべてのクマに有効ではありません。また、麻酔管理には獣医師・専門技術者が必要で、実施コストが高い点が全国普及の壁になっています。環境省は「人身被害を起こしたクマへの学習放獣は効果が低い」とも指摘しており、あくまで錯誤捕獲や初期段階での対応に向いているとされています。
          </p>
        </div>

        {/* Section 2 GPS */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>
            GPS首輪——クマの「今」を把握する
          </h2>
        </div>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 28, marginTop: 8 }}>Chapter 02</p>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          GPS首輪をクマに装着し、リアルタイムで位置情報を追跡する技術が普及しつつあります。これにより「いつ・どこにいるか」が把握でき、集落への接近を事前に検知して住民に警告を出すことが可能になります。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {[
            {
              org: '知床財団（北海道）',
              detail: 'ヒグマにGPS首輪を装着し、知床半島内での行動域・季節移動を継続調査。北海道大学と連携し25年以上の長期追跡データを蓄積。',
            },
            {
              org: 'NPOピッキオ（長野県軽井沢町）',
              detail: 'GPS首輪装着個体の行動を追跡しながら、集落への接近をリアルタイムで把握。ベアドッグ出動のタイミング判断にも活用されている。',
            },
            {
              org: '四国ツキノワグマ保護プログラム',
              detail: '絶滅が危惧される四国のツキノワグマ（推定約20頭）にGPS首輪を装着。約150台のカメラトラップ・毛髪トラップ（DNA同定）と組み合わせて生息域を把握。',
            },
          ].map(({ org, detail }) => (
            <div key={org} style={{ background: '#FAFAF8', border: '1px solid #E8E8E4', borderRadius: 10, padding: '20px 22px' }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#0F2E16', margin: '0 0 8px' }}>📡 {org}</p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: '#444', margin: 0 }}>{detail}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          近年はLTE-M通信でクラウドに直接データを送信できる次世代GPS首輪の実証実験も始まっています。森林環境下でのGPS測位成功率95〜98%、ソーラー電池による長期稼働が可能で、従来のように電波受信機を持った研究者が現地に入る必要がなくなりつつあります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 48 }}>
          位置情報の蓄積は「どのルートで集落に近づくか」「どの季節にどのエリアを使うか」という行動パターンの解明にもつながり、<strong>対策の精度を上げる基盤データ</strong>として機能しています。
        </p>

        {/* Section 3 ベアドッグ */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>
            ベアドッグ——犬がクマを山に帰す
          </h2>
        </div>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 28, marginTop: 8 }}>Chapter 03</p>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          ベアドッグとは、クマを追いかけて山に追い返す訓練を受けた犬のことです。カレリアン・ベア・ドッグ（カレリアン・ベアドッグ）という犬種が多く使われ、北米では野生動物管理の現場で実績があります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          日本では<strong>NPO法人ピッキオ（長野県軽井沢町）</strong>が国内で先駆的にベアドッグを導入しています。軽井沢の住宅街に出没するクマをベアドッグで追い払い、同時にGPS首輪追跡・住民への出没情報発信・ゴミ管理の指導を組み合わせた複合的な管理を実施。
        </p>

        <div style={{ background: '#0F2E16', borderRadius: 10, padding: '28px 28px', marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#5EC97C', letterSpacing: '0.08em', margin: '0 0 16px' }}>NPOピッキオの成果（軽井沢町・実測値）</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { before: '36件', after: '9件', label: 'クマ目撃件数（2006年→2016年）' },
              { before: '年100件超', after: 'ほぼゼロ', label: 'ゴミ荒らし件数' },
            ].map(({ before, after, label }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>{before}</span>
                  <span style={{ color: '#5EC97C' }}>→</span>
                  <span style={{ fontSize: 22, fontWeight: 900, color: '#5EC97C' }}>{after}</span>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>{label}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '16px 0 0' }}>出典：NPO法人ピッキオ 公式サイト</p>
        </div>

        {/* Section 4 課題と展望 */}
        <div style={{ borderLeft: '4px solid #5EC97C', paddingLeft: 20, marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F2E16', lineHeight: 1.4, margin: 0 }}>
            課題と展望——技術だけでは解決しない
          </h2>
        </div>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 28, marginTop: 8 }}>Chapter 04</p>

        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          これらの非致死的管理技術は確かに成果を上げています。しかし、いずれも「専門家・設備・継続的な資金」が必要であり、すべての地域に普及するには大きな壁があります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 16 }}>
          環境省の指針も「学習放獣はすべての状況に有効ではない」と明記しており、人身被害を起こした個体への適用は効果が低いとされています。技術はあくまで手段であり、<strong>誘引物の除去・里山管理・住民教育</strong>という根本的な対策と組み合わせて初めて機能します。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.95, color: '#333', marginBottom: 48 }}>
          「技術で解決できる」という過信も禁物ですが、「駆除しかない」という諦めも正確ではありません。日本各地で積み重ねられている実績が、その証拠です。
        </p>

        {/* まとめ */}
        <div style={{ borderTop: '2px solid #E8E8E4', paddingTop: 40, marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F2E16', marginBottom: 16 }}>まとめ</h2>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              '学習放獣は1991年から国内で実施。島根県では再捕獲率18%という効果が記録されている',
              'GPS首輪技術の進化により、クマの行動をリアルタイムで把握できる環境が整いつつある',
              'NPOピッキオの軽井沢での取り組みは、ベアドッグ＋GPS＋住民連携の複合モデルとして国内の先進事例',
              '非致死的管理は誘引物除去・里山管理などの根本対策と組み合わせることで効果を発揮する',
            ].map((text) => (
              <li key={text} style={{ fontSize: 15, lineHeight: 1.8, color: '#333' }}>{text}</li>
            ))}
          </ul>
        </div>

        {/* 関連記事 */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F2E16', marginBottom: 14, paddingBottom: 8, borderBottom: '2px solid #E8E8E4' }}>関連ガイド</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { href: '/guide/bear-not-the-enemy', label: 'クマは悪くない。環境変化が生んだ「共存の危機」と私たちにできること' },
              { href: '/guide/people-facing-bears', label: 'クマと向き合う人たち——研究者・NPO・農家の現場' },
              { href: '/guide/non-lethal-bear-management', label: '非致死的クマ管理——駆除に頼らない共存の手法' },
              { href: '/guide/international-bear-management', label: '海外のクマ対策研究・管理事例' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#FAFAF8', borderRadius: 8, textDecoration: 'none', border: '1px solid #E8E8E4', fontSize: 14, color: '#0F2E16', fontWeight: 500 }}>
                <span style={{ color: '#5EC97C', flexShrink: 0 }}>→</span>{label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
