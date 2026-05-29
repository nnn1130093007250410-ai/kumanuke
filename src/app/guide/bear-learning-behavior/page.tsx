import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'クマの学習能力と認知行動｜なぜ同じ場所に繰り返し来るのか | KUMANUKE',
  description: 'クマは哺乳類でも高水準の認知・学習能力を持ちます。空間記憶・問題解決・報酬学習など行動科学の観点から、クマが「人里依存」になるメカニズムと、学習を利用した対策の考え方を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-learning-behavior' },
  openGraph: {
    title: 'クマの学習能力と認知行動｜なぜ同じ場所に繰り返し来るのか | KUMANUKE',
    description: '空間記憶・報酬学習・問題解決など行動科学の視点からクマの認知能力を解説。人里依存化のメカニズムと対策への示唆。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-learning-behavior',
  },
}

export default function BearLearningBehaviorPage() {
  return (
    <main style={{ background: '#fff' }}>
      <div style={{ background: '#143D1E', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/guide" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← 対策ガイド一覧</Link>
          <div style={{ display: 'inline-block', background: '#0C5C3E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 3, marginTop: 16, marginBottom: 12, letterSpacing: '0.05em' }}>
            野生動物行動学
          </div>
          <h1 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 16 }}>
            クマの学習能力と認知行動<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>なぜ同じ場所に繰り返し来るのか</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：野生動物行動学
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          「一度追い払ったのに、また来た」──農業従事者や山間集落の住民からよく聞かれる言葉です。クマは単純に食料を探して彷徨う動物ではありません。高度な記憶力と学習能力を持ち、「ここに行けば食料が得られる」という経験を長期間保持します。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          本稿では、野生動物行動学の視点からクマの認知能力を解説し、なぜクマが繰り返し人里へ来るのか、そしてその学習メカニズムを理解することが対策設計にどう役立つかを考察します。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          1. クマの脳：高い大脳比率が示す認知能力
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマは体重に対する大脳皮質の比率（脳化指数）が、哺乳類の中でも比較的高水準にあるとされています。犬と同等またはそれ以上の認知能力を持つ可能性があるとする研究者もおり、野外での問題解決行動・道具的使用の観察事例も報告されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          カナダや米国の飼育下・半野生状態のクマを対象にした認知実験では、複数のシンボルを用いた連想学習課題や、透明容器の中の食料を取り出すパズル課題を短期間で解決する事例が記録されています。こうした実験的知見は、クマが「観察→記憶→応用」という認知プロセスを実行できることを示唆しています。
        </p>
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '20px 24px', marginBottom: 40 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>認知能力が対策に与える示唆</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            クマが高い認知能力を持つということは、単純な刺激（音・光・匂い）への長期的な依存だけでは効果が薄れる可能性があることを意味します。同一の対策を繰り返すことで「慣れ（habituation）」が生じ、効果が低下するメカニズムは、この認知能力の高さと直結しています。
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          2. 空間記憶：クマはどれほど「場所」を覚えるか
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          野生動物の行動研究で特に注目されているのが<strong>空間記憶（spatial memory）</strong>です。クマは数百平方キロメートルにわたる行動圏の中で、食料源・水場・危険箇所・休息場所などの位置情報を精度よく記憶していると考えられています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          ペンシルバニア州立大学などの研究グループが行ったGPS追跡調査では、クマが前年に食料を得た場所に翌年の同時期に戻るパターンが繰り返し確認されています。ブルーベリーやドングリの豊富な林・果樹のある農地・特定のゴミ捨て場を「記憶地点」として持ち、シーズンが来るたびに同じルートをたどる行動が観察されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          この空間記憶の能力は、冬眠前の秋の過食期（Hyperphagia）に特に重要な役割を果たします。限られた時間の中で最大量の食料を摂取するため、クマは過去の経験に基づいて食料が豊富な場所を効率よく巡る「採食ルート」を形成すると考えられています。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          3. 報酬学習：「ここに来れば食料がある」という強化
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの繰り返し侵入を理解する上で重要な概念が<strong>報酬学習（reward learning）</strong>です。ある行動が食料という「報酬」に結びついた場合、その行動は強化され繰り返されます。これはスキナーの行動強化理論に基づく古典的な学習メカニズムで、哺乳類全般に広く見られます。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {[
            { step: '第1段階', title: '初めての訪問・食料獲得', body: 'クマが初めて農地・ゴミ置き場・果樹園を訪れ、食料を得る。この初回の成功体験が記憶される。' },
            { step: '第2段階', title: '再訪と習慣化', body: '同じ場所への再訪が成功を重ねると、「この場所＝食料源」という強固な連想が形成される。この時点でクマは「問題個体」への移行を始める。' },
            { step: '第3段階', title: '人里依存型行動の固定', body: '奥山の食料が不足した際も、すでに学習した人里の食料源へ向かうことが優先されるようになる。対策を施しても別の侵入口を探すなど、問題解決行動を見せることがある。' },
            { step: '第4段階', title: '次世代への伝達', body: '子グマは母グマと共に行動する間、人里への侵入行動を学習する。こうして習得した行動は成長後も継続され、さらに次世代に伝達される可能性がある。' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '14px 20px' }}>
              <div style={{ minWidth: 80, textAlign: 'center' }}>
                <span style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 3 }}>{s.step}</span>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A16', marginBottom: 4 }}>{s.title}</p>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: '#5A5A55', margin: 0 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          4. 慣れ（Habituation）：対策が効かなくなるメカニズム
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマが対策に「慣れる」ことは、野生動物管理の現場で最も頭を悩ませる問題のひとつです。<strong>慣れ（Habituation）</strong>とは、繰り返し提示された刺激に対して反応が徐々に低下する現象で、刺激が脅威ではないと学習された結果として生じます。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          爆音機・センサーライト・音声威嚇などの対策が「最初は効いたが次第に効かなくなった」という事例は、この慣れによるものと考えられます。クマは刺激を受けても実害がないと認識すると、警戒反応を示さなくなります。
        </p>
        <div style={{ background: '#FFF8F0', border: '1px solid #FED7AA', borderLeft: '4px solid #E07A30', borderRadius: 8, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#C05A1A', marginBottom: 8 }}>慣れを防ぐための「変化」の重要性</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', margin: 0 }}>
            野生動物管理の専門家は、慣れを防ぐために対策手段を定期的に変更・組み合わせることを推奨しています。同一の刺激を予測可能なパターンで使い続けることは慣れを促進します。音・光・匂い・物理的障壁などを組み合わせた「不予測刺激」の提示が、より持続的な効果を生む可能性があるとされています。
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, marginTop: 56, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          5. 問題解決行動：クマが障壁を乗り越えるとき
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの問題解決能力は野外でも観察されています。電気柵の絶縁部分を嗅ぎ当てて通過する、ゴミ箱の蓋の開け方を学習する、柵の下を掘って侵入するなど、食料へのアクセスを妨げる障壁に対して試行錯誤的なアプローチを繰り返す行動が報告されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          これは「道具的条件づけ（operant conditioning）」の文脈で理解されており、問題（障壁）を解決する行動が報酬（食料）によって強化されるプロセスです。北米のグリズリーや黒クマでは、キャンプ用のフードキャニスターやベアボックスを開ける方法を学習した個体の事例も記録されています。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, marginTop: 56, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          6. 学習の逆利用：条件付け嫌悪（Aversive Conditioning）
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマの学習能力は「対策の効果を薄める」だけでなく、「忌避行動を学習させる」方向にも利用できます。これが<strong>条件付け嫌悪（Aversive Conditioning）</strong>の考え方です。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          特定の場所や行動に対して、嫌悪刺激（非致死的なゴム弾・爆音・威嚇犬など）を組み合わせることで、「その場所・行動＝不快・危険」という連想を形成させる手法です。北米の野生動物管理機関では管理機関の64%が何らかの形でこの手法を採用しているとされています（複数の管理機関サーベイより）。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          ただし、条件付け嫌悪の効果は個体差・実施タイミング・強度によって大きく変わります。すでに強く習慣化した個体（人里での採食経験が豊富な個体）への効果は限定的であるとする研究報告もあり、早期介入が重要とされています。
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, marginTop: 56, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          7. 対策設計への示唆：「クマの学習を先回りする」発想
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>学習メカニズム</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>対策への応用</th>
              </tr>
            </thead>
            <tbody>
              {[
                { mech: '空間記憶（場所の記憶）', app: '「ここは安全で食料がある」と学習させない。初回からアクセスを遮断することが最重要' },
                { mech: '報酬学習（成功体験の強化）', app: '食料を一度でも得させないことが最優先。一度成功したクマへの対応は困難になる' },
                { mech: '慣れ（習慣化）', app: '同一刺激を繰り返さない。対策手段を定期的に変更・組み合わせる' },
                { mech: '問題解決行動', app: '単一の物理的障壁だけに頼らない。複数層の対策（物理＋嗅覚＋音）を組み合わせる' },
                { mech: '条件付け嫌悪の可能性', app: '早期介入が重要。習慣化前に「ここは危険・不快」という連想を与えられれば効果が高い可能性がある' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.mech}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.app}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          まとめ
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          クマは「単純な本能で動く動物」ではなく、高度な空間記憶・報酬学習・問題解決能力を持つ認知的動物です。人里依存型のクマが生まれるのは、食料を得られた経験の積み重ねによる学習の結果であり、その行動は容易には変わりません。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          「一度来た個体を追い払う」よりも「最初に来させない」ことが、行動科学の観点から最も合理的な戦略です。複数の忌避手段を組み合わせ、予測不可能性を維持し、食料へのアクセスを完全に遮断する──こうした多層的な予防アプローチが、クマの学習能力に対応するための基本設計として重視されています。
        </p>

        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderRadius: 8, padding: '28px 28px', marginBottom: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>「初回から来させない」ための嗅覚忌避アプローチ</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            近年では、クマの高感度な嗅覚に働きかける忌避成分を事前に散布することで、「この場所は不快」という初期印象を与えることを目的とした予防型対策が注目されています。KUMANUKEは植物由来成分を配合したエリア散布型の忌避スプレーです。
          </p>
          <Link href="/products/kumanuke" style={{ display: 'inline-block', background: '#143D1E', color: '#fff', fontWeight: 700, fontSize: 14, padding: '10px 24px', borderRadius: 4, textDecoration: 'none' }}>
            KUMANUKEの詳細を見る →
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #DDDDD8', paddingTop: 32 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#5A5A55', marginBottom: 16 }}>関連ガイド</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { href: '/guide/non-lethal-bear-management', label: '非致死型クマ対策の体系｜移送・条件付け嫌悪・忌避の科学' },
              { href: '/guide/why-bears-come-to-towns', label: 'クマはなぜ人里に来るのか｜里山変化・食料不足・学習行動を解説' },
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
