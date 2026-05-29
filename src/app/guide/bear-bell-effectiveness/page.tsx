import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '熊鈴の効果と限界｜科学的研究が示す正しい使い方と補完すべき対策 | KUMANUKE',
  description: '熊鈴（クマ鈴）は本当に効果があるのか。米国の野生動物研究者トム・スミス博士のフィールド実験や環境省のガイドラインをもとに、科学的な知見と正しい使い方、そして熊鈴だけでは対応しきれない場面を解説します。',
  alternates: { canonical: 'https://kumanuke.bubuworks.co.jp/guide/bear-bell-effectiveness' },
  openGraph: {
    title: '熊鈴の効果と限界｜科学的研究が示す正しい使い方 | KUMANUKE',
    description: '熊鈴は本当に効くのか。研究者の実験データと環境省ガイドラインをもとに、科学的な効果と限界を解説します。',
    url: 'https://kumanuke.bubuworks.co.jp/guide/bear-bell-effectiveness',
  },
}

export default function BearBellEffectivenessPage() {
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
            熊鈴の効果と限界<br />
            <span style={{ fontSize: '0.7em', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>科学的研究が示す正しい使い方と補完すべき対策</span>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            更新日：2026年5月 ／ カテゴリ：科学・研究
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Summary Box */}
        <div style={{ background: '#F0F7F2', border: '1px solid #C8E0CF', borderLeft: '4px solid #143D1E', borderRadius: 8, padding: '20px 24px', marginBottom: 40 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>この記事のポイント</p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {[
              '熊鈴は「人の存在をクマに知らせる」ための手段であり、一定の有効性が認められている',
              '米国の研究では、70デシベル程度の音では反応しなかったクマが、110デシベル超の音には反応した事例がある',
              '風向き・水音・地形によって音が届かない場合があり、熊鈴単体の信頼性には限界がある',
              '環境省は熊鈴をはじめとした「存在を知らせる」対策を推奨しつつ、他の対策との組み合わせを求めている',
            ].map((p, i) => (
              <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 4 }}>{p}</li>
            ))}
          </ul>
        </div>

        {/* 導入 */}
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          「熊鈴をつけていれば大丈夫」と考える登山者・ハイカーは少なくありません。実際に登山用品店でも定番アイテムとして販売されており、環境省の公式ガイドラインにも「鈴やラジオなど音の出るものを携帯する」ことが記載されています。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          一方で、熊鈴をつけていたにもかかわらずクマと遭遇したという事例は国内外で報告されており、「熊鈴の効果はどの程度か」という疑問は登山者の間でも根強く存在します。本稿では、学術研究とフィールドデータをもとに、熊鈴の効果と限界を整理します。
        </p>

        {/* Section 1 仕組み */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          1. 熊鈴が機能するメカニズム
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          熊鈴の基本的な機能は<strong>「人間が近くにいることをクマに事前に知らせる」</strong>ことです。ツキノワグマ・ヒグマとも、人の存在に気づいた場合は多くのケースで逃げる行動を取るとされています。問題となるのは、クマが気づかないうちに至近距離まで近づいてしまう「バッタリ遭遇」で、こうした場合に母グマが子グマを守ろうとして攻撃に転じることがあります。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          熊鈴はこうした「バッタリ遭遇」を防ぐために人の存在を継続的にアナウンスするツールです。声を出して歩く、ラジオを鳴らすなども同じ目的の手段であり、環境省はこれらを総称して「自分の存在をクマに知らせる」手段として推奨しています。
        </p>

        {/* Section 2 研究 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, marginTop: 56, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          2. 科学的研究：音の種類とクマの反応
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          米国の野生動物研究者トム・スミス博士（Tom S. Smith、ブリガムヤング大学）はアラスカ州においてグリズリーベア（ハイイログマ）を対象にした音刺激実験を実施しています。この研究では、異なる音量・種類の音源に対するクマの反応を観察したフィールドデータが収集されました。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>音の種類・音量</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>クマの反応</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>備考</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sound: '人の話し声レベル（約60〜70dB）', reaction: '多くの場合で無反応または反応薄', note: '鈴の音と同等レベル' },
                { sound: '爆竹・大きな金属音（約110dB超）', reaction: 'クマが反応・回避行動を示した', note: 'より強い刺激では効果あり' },
                { sound: 'ホイッスル（鋭い高音）', reaction: '状況・個体により異なる', note: '反応は一貫しない' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.sound}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.reaction}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          この研究から示唆されることは、熊鈴程度の音量（一般的なクマ鈴は40〜60dB程度）ではクマが必ずしも明確に反応するとは言えず、<strong>「確実にクマを追い払う」手段ではない</strong>という点です。ただし、この研究は北米のグリズリーを対象としており、日本のツキノワグマ・ヒグマとは行動特性が異なる場合があることに留意が必要です。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 48 }}>
          北海道立総合研究機構の研究員らは、ヒグマが一般的に人の存在に気づくと逃げることのほうが多く、鈴などの音は「先にこちらの存在を知らせることでバッタリ遭遇を防ぐ効果がある」と位置づけています。つまり熊鈴の主な機能は「追い払い」ではなく<strong>「事前通知による近接回避」</strong>という理解が適切とされています。
        </p>

        {/* Section 3 限界 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          3. 熊鈴が機能しにくい状況
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          熊鈴の効果が期待通りに発揮されない状況がいくつか知られています。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {[
            {
              title: '①風や水音が音をかき消す環境',
              body: '川沿い・滝付近・強風時は熊鈴の音が周囲のノイズにかき消される可能性があります。川の上流方向にいるクマには特に音が届きにくいとされています。',
            },
            {
              title: '②習慣化した個体への効果低下',
              body: '人里に慣れた「習慣化個体」は音への警戒心が薄れており、熊鈴の音に対して反応しなくなるケースが報告されています。こうした個体には通常の音刺激が通じにくいとされます。',
            },
            {
              title: '③食料に集中しているクマ',
              body: '採食行動に集中しているクマは感覚への注意が分散し、音への反応が遅れることがあります。特に秋の過食期には食料への執着が強く、接近に気づきにくい個体も報告されています。',
            },
            {
              title: '④夜間・明け方の活動時',
              body: 'クマは早朝・夕方・夜間にも活動します。視界の悪い時間帯はクマ側も音への依存度が高まりますが、人間側も状況把握が困難になります。',
            },
            {
              title: '⑤地形による音の遮断',
              body: '谷地形・密林・岩場など音が回り込みにくい地形では、熊鈴の音が届く範囲が著しく制限されることがあります。',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#F8F8F6', border: '1px solid #DDDDD8', borderRadius: 6, padding: '16px 20px' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A16', marginBottom: 6 }}>{item.title}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#5A5A55', margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* Section 4 使い方 */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          4. 正しい熊鈴の使い方と選び方
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          熊鈴を使用する際は、以下の点に留意することで効果を高めることができます。
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 32 }}>
          {[
            '音量の大きいものを選ぶ：小さいベル型より振動音が大きいカウベル型・チャイム型が推奨されることが多い',
            '常に鳴らし続ける：リュックにぶら下げるだけでなく、歩行中に継続して鳴る位置・取り付け方を工夫する',
            '見通しの悪い場所では声を出す：藪・沢沿い・カーブの手前では声を出す・手を叩くなど補助的な音を加える',
            '川沿い・水音のある場所では意識的に大きな音を出す：水音で熊鈴が聞こえにくい環境では追加の音刺激が有効',
            '他の対策と組み合わせる：熊鈴は複数の対策の一部として位置づける（後述）',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 15, lineHeight: 1.85, color: '#2A2A26', marginBottom: 8 }}>{item}</li>
          ))}
        </ul>

        {/* Section 5 組み合わせ */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          5. 熊鈴と組み合わせるべき対策
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          環境省は「熊鈴・ラジオ等による存在の通知」を推奨しつつも、単一の手段に頼らず複数の対策を組み合わせることを強調しています。山の専門家やクマ研究者の多くも同様の見解を持っています。
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>対策手段</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>役割・機能</th>
                <th style={{ background: '#143D1E', color: '#fff', padding: '10px 14px', textAlign: 'left' }}>補完性</th>
              </tr>
            </thead>
            <tbody>
              {[
                { method: '熊鈴・声かけ', role: '存在を音で通知、バッタリ遭遇防止', complement: '音が届かない環境では効果が下がる' },
                { method: '忌避スプレー（エリア散布型）', role: '嗅覚への刺激で近接を抑制', complement: '音が届かない場所・夜間・無人時も機能する' },
                { method: '熊撃退スプレー（護身用）', role: '至近距離での緊急撃退', complement: '最終手段。携行リスクも伴う（誤噴射等）' },
                { method: '複数人での行動', role: '話し声・複数の気配で存在をアナウンス', complement: '最もリスクが低い基本的な対策' },
                { method: '出没情報の事前確認', role: 'クマが目撃された場所・時間帯の回避', complement: '最も根本的なリスク回避手段' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontWeight: 700, background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.method}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.role}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E0E0DC', fontSize: 13, color: '#5A5A55', background: i % 2 === 0 ? '#fff' : '#F8F8F6' }}>{r.complement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 6 まとめ */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#143D1E', borderLeft: '5px solid #5EC97C', paddingLeft: 16, paddingTop: 12, paddingBottom: 12, marginBottom: 28, background: '#F0F7F2', borderRadius: '0 8px 8px 0' }}>
          6. まとめ：熊鈴は「対策の一部」として活用する
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          熊鈴は「音でクマに人の存在を伝え、バッタリ遭遇のリスクを低減する」手段として一定の有効性が認められています。環境省も推奨しており、登山・山作業時の基本装備として位置づけることは合理的です。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#2A2A26', marginBottom: 16 }}>
          ただし、熊鈴を装着していることが安全を保証するわけではありません。音が届かない環境、習慣化個体、過食期のクマなど、熊鈴が機能しにくい状況は存在します。研究者・専門家が強調するのは、熊鈴を含む複数の手段を組み合わせ、<strong>「出会わないための多層的な対策」を構築すること</strong>です。
        </p>

        {/* KUMANUKE CTA */}
        <div style={{ background: '#F0F7F2', border: '2px solid #5EC97C', borderRadius: 12, padding: '28px 28px', marginBottom: 40, marginTop: 40 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#143D1E', marginBottom: 8 }}>音以外のアプローチ：嗅覚への忌避刺激</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#2A2A26', marginBottom: 16 }}>
            熊鈴が補完する「音による通知」に対して、嗅覚への刺激を活用した忌避アプローチも注目されています。クマの嗅覚は人間の約2100倍ともされており、特定の植物由来成分がクマの行動変化をもたらす可能性が研究されています。KUMANUKEは植物由来成分を活用したエリア散布型の忌避スプレーです。
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
              { href: '/guide/bear-olfactory-science', label: '熊が匂いで近づかない理由｜科学的メカニズムを解説' },
              { href: '/guide/hiking-bear-prevention', label: '登山・トレッキングでの熊対策｜山でのリスクを下げる方法' },
              { href: '/guide/how-to-choose-bear-repellent', label: '熊よけスプレーの種類と選び方｜護身用と事前散布型の違い' },
            ].map((r) => (
              <Link key={r.href} href={r.href} style={{ display: 'block', background: '#F3F7F4', border: '1px solid #D4E5D9', borderRadius: 6, padding: '12px 16px', color: '#143D1E', fontWeight: 600, fontSize: 13, textDecoration: 'none', lineHeight: 1.5 }}>→ {r.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
