# CLAUDE.md — NextGrow LP 開発ルール

## グリッドカードの高さ統一（必須）

複数カードを横並びグリッドに並べる場合、コンテンツ量の差でカード高さがバラバラになる。
**毎回以下を徹底すること。**

```tsx
// ✅ 正しい構造
<FadeUp delay={delay} className="h-full">          // ← h-full 必須
  <div className="h-full flex flex-col ...">        // ← h-full + flex-col
    <div className="min-h-[Xrem] mb-4">             // タイトル等 → min-h で高さ確保
      <h3 ...>{title}</h3>
    </div>
    <p className="line-clamp-4 mb-4">{description}</p>  // 本文 → line-clamp で行数統一
    <div className="mt-auto">                        // メトリクス + ボタン → mt-auto で底部固定
      {metrics}
      <button ...>CTA</button>
    </div>
  </div>
</FadeUp>
```

**やってはいけないこと：**
- `FadeUp` に `h-full` を付けない → グリッドセルを埋めずカードが縮む
- 説明文を `line-clamp` しない → 文字量でカード高さが変わる
- CTAに `mt-auto` を付けない → ボタンが各カードで違う高さに出る

---

## メトリクスセルの縦位置ズレ防止

3カラム等分割のメトリクス行で、ラベルの文字数が違うと数値の縦位置がズレる。

```tsx
// ✅ ラベルに min-h + flex items-center でズレを防ぐ
<p className="text-[11px] text-gray-500 leading-tight min-h-[2rem] flex items-center justify-center">
  {label}
</p>
<p className="text-lg font-black text-blue-600 leading-none">{value}</p>
```

---

## カードホバーアニメーション（Framer Motion）

カードにスケールアニメーションを付ける場合、バッジ等の装飾が `motion.div` の外にあると
ズーム時に位置がずれる。**バッジは必ず motion.div の内部に入れる。**

```tsx
// ✅ 正しい構造
<motion.div
  animate={{ scale: isHovered ? 1.04 : 1 }}
  style={{ transformOrigin: 'bottom center' }}
>
  {badge && <div>バッジ</div>}   // ← motion.div の中
  <div className="card-body">...</div>
</motion.div>

// ❌ バッジが外にある → ズーム時に分離する
<div>
  {badge && <div>バッジ</div>}   // ← 外
  <motion.div animate={{ scale: ... }}>
    <div className="card-body">...</div>
  </motion.div>
</div>
```

バッジなしカードには代わりに同じ高さの `<div className="h-[30px]" />` スペーサーを入れて
全カードの top を揃えること。

---

## 比較テーブルのデフォルト強調禁止

「おすすめ」カラムに常時青背景 (`bg-blue-50`) を入れると、ページ読み込み時から
そのカラムに視線が引っ張られ「ホバーしている」ように見える。
デフォルト状態は白（`bg-white`）にし、ホバー時のみ色を付けること。

```tsx
// ✅ ホバー時のみ青
animate={{ backgroundColor: isHovered ? 'rgb(219 234 254)' : 'rgb(255 255 255)' }}

// ❌ デフォルトで青
className="bg-blue-50"
```

---

## アイコンの品質基準

絵文字（🙋 📝 など）をそのままアイコンとして使うのは「しょぼく見える」。
**以下のいずれかを使うこと：**

1. `react-icons/fi` を大きめ（size 28〜36）の白背景円の中に配置
2. カスタム PNG イラスト（GPT 生成等）を `<Image>` で表示
3. 絶対に絵文字を使う場合は `text-3xl` 以上 + 背景円でしっかりフレームに入れる

```tsx
// ✅ react-icons を白円に入れた例
<div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto">
  <FiMail size={32} className="text-blue-500" />
</div>
```

---

## アコーディオン（FAQ等）の縦揃えルール

アコーディオンのボタン行で `items-start` を使うと、開閉に関係なく**アイコン・Q記号・テキスト・矢印が上端揃え**になり、人間が不均一さを認識して違和感を覚える。

**毎回以下を徹底すること：**

```tsx
// ✅ 正しい構造
<div className="overflow-hidden">
  {/* 質問ボタン：items-center で縦中央揃え。高さは常に固定 */}
  <button className="w-full flex items-center gap-4 px-6 py-5 ...">
    <div className="flex-shrink-0 w-11 h-11 ..."><Icon /></div>   {/* mt-* 不要 */}
    <div className="flex-1 flex items-center gap-2.5">            {/* items-center */}
      <span className="w-6 h-6 rounded-full ...">Q</span>        {/* mt-* 不要 */}
      <span className="font-black ...">{q}</span>                 {/* pt-* 不要 */}
    </div>
    <motion.span animate={{ rotate: open ? 180 : 0 }}>           {/* mt-* 不要 */}
      <FiChevronDown />
    </motion.span>
  </button>

  {/* 回答：ボタンの外・下に展開。ボタン内に入れてはいけない */}
  <AnimatePresence initial={false}>
    {open && (
      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
        <div className="flex items-start gap-4 px-6 pb-5 pt-0 border-t border-gray-100">
          <div className="flex-shrink-0 w-11 h-11" /> {/* 左アイコンと幅を揃えるスペーサー */}
          <div className="flex items-start gap-2.5 pt-4 flex-1">
            <span className="w-6 h-6 rounded-full bg-emerald-500 ...">A</span>
            <p className="text-gray-500 text-sm ...">{a}</p>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
```

**やってはいけないこと：**
- `button` に `items-start` を使う → 高さ可変で各要素が上端揃えになる
- `AnimatePresence` をボタンの内部に入れる → 開いたとき矢印・アイコンが中央からズレる
- `mt-*` / `pt-*` で手動調整する → コンテンツ量が変わるとズレが再発する

---

## レスポンシブ対応の必須ルール

### 1. 背景画像の上に暗い/黒いテキストを置く場合

`linear-gradient(to right, ...)` はデスクトップ（左テキスト/右画像）で機能するが、
モバイルでは画像が全面に広がりテキストが読めなくなる。

```tsx
// ✅ モバイルとデスクトップで別のオーバーレイを使う
<div className="absolute inset-0 bg-white/80 lg:hidden" />          {/* モバイル：全面に白オーバーレイ */}
<div className="absolute inset-0 hidden lg:block" style={{          {/* デスクトップ：左→右グラデーション */}
  background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, ... )'
}} />

// ❌ グラデーションのみ → モバイルで文字が背景と同化して消える
<div className="absolute inset-0" style={{ background: 'linear-gradient(to right, ...)' }} />
```

### 2. カード内アイコンの左寄れ

`flex flex-col` のデフォルトは `items-start`。1カラムのモバイルでは左端に寄り、
アイコンが「ぽつん」と置かれたように見える。

```tsx
// ✅ モバイル中央・デスクトップ左寄せ
<div className="flex flex-col gap-4 items-center sm:items-start text-center sm:text-left">

// ❌ デフォルトのまま → モバイルで左上端にアイコンが浮く
<div className="flex flex-col gap-4">
```

### 3. モバイルでの数値・コンテンツ左寄れ

1カラム全幅カードで数値や指標が左寄せだと読みにくい。デスクトップは左寄せでOKでも
モバイルでは中央揃えにする。

```tsx
// ✅
<div className="text-center sm:text-left">
<div className="flex justify-center sm:justify-start">

// ❌ どちらも left のまま → 全幅カードで左隅にしか情報がない
```

### 4. ステップ/プロセスの縦並びレイアウト（モバイル）

デスクトップ：横並びグリッド + 接続線  
モバイル：縦タイムライン（左に点・線、右にカード）

```tsx
{/* デスクトップ */}
<div className="hidden lg:grid grid-cols-5 ...">...</div>

{/* モバイル：左タイムライン + カード */}
<div className="lg:hidden">
  {steps.map((step, i) => (
    <div className="flex gap-4">
      {/* タイムライン（ドット＋縦線＋矢印） */}
      <div className="flex flex-col items-center w-4 pt-5">
        <div className="w-3.5 h-3.5 rounded-full bg-blue-600" />
        {i < last && <div className="w-0.5 flex-1 bg-blue-200 my-1.5" />}
        {i < last && <div className="text-blue-400 text-sm">↓</div>}
      </div>
      {/* カード（左アイコン + 中テキスト + 右イラスト） */}
      <div className="flex-1 bg-white rounded-2xl p-4 flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center"><Icon /></div>
        <div className="flex-1"><span className="num" /><h3 /><p /></div>
        <div className="w-16 h-16 rounded-xl bg-slate-100 relative overflow-hidden">
          {/* イラスト風の2アイコン構成 */}
          <MainIcon size={36} className="text-slate-300 absolute top-1.5 left-1.5" />
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center absolute bottom-1.5 right-1.5">
            <SubIcon size={12} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
```

**やってはいけないこと：**
- デスクトップ用の横並びグリッドをモバイルで縦積みにするだけ → 接続関係が消える
- 接続線を `hidden lg:block` だけにする → モバイルで各ステップが孤立して見える
