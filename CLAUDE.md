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
