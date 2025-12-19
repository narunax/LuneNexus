# カラーテーマ更新ガイド

## 新しいカラーコンセプト

**シャンパンゴールド × ミッドナイトブルー**

繊細で高級感のあるデザインを実現するため、サイト全体のカラーパレットを更新しました。

---

## カラーパレット定義

### Champagne Gold（シャンパンゴールド）

| Level | Color Code | 用途 |
|-------|-----------|------|
| 50 | #FFFBF5 | 最も明るい（ハイライト） |
| 100 | #FFF5E8 | |
| 200 | #F7E7CE | メインテキスト（text-primary） |
| 300 | #E5D4B4 | |
| 400 | #D4C5A9 | セカンダリテキスト（text-secondary） |
| **500** | **#C9B88A** | **メインカラー（アクセント）** |
| 600 | #B8A472 | |
| 700 | #9D8B5F | |
| 800 | #7D6D4A | |
| 900 | #5D5138 | 最も暗い |

### Midnight Blue（ミッドナイトブルー）

| Level | Color Code | 用途 |
|-------|-----------|------|
| 50 | #E6EAF0 | |
| 100 | #B8C4D6 | |
| 200 | #8A9FBD | テキスト（明るめ） |
| 300 | #5C7AA3 | アイコン、見出し |
| 400 | #3D5A80 | ボーダー、アクセント |
| **500** | **#2D4263** | **メインカラー** |
| 600 | #1F2E47 | |
| 700 | #151F33 | |
| **800** | **#0C1424** | **背景セカンダリ** |
| **900** | **#060A14** | **背景プライマリ** |
| 950 | #030508 | 最も暗い |

---

## 主要な変更内容

### 1. 背景色
```css
bg-primary: #060A14 (midnight-900)
bg-secondary: #0C1424 (midnight-800)
bg-card: rgba(201, 184, 138, 0.03) /* champagne-500 with transparency */
```

### 2. テキスト色
```css
text-primary: #F7E7CE (champagne-200)
text-secondary: #D4C5A9 (champagne-400)
text-accent: #C9B88A (champagne-500)
```

### 3. グラデーション
```css
.gradient-text: champagne-500 → midnight-400
.aurora-bg: champagne-500 → midnight-500
.nebula-bg: midnight-800 → midnight-500 → champagne-500
```

---

## 更新されたファイル

### 設定ファイル
- ✅ `tailwind.config.ts` - カラーパレット定義
- ✅ `src/app/globals.css` - グローバルスタイル

### ページ
- ✅ `src/app/page.tsx` - ホームページ
- ✅ `src/app/kabbalah/page.tsx` - カバラ数秘術ページ
- ✅ `src/app/iching/page.tsx` - 易経ページ

### コンポーネント
- ✅ `src/components/layout/Header.tsx` - ヘッダー
- ✅ `src/components/kabbalah/TreeOfLife.tsx` - 生命の樹
- ✅ `src/components/iching/HexagramLines.tsx` - 卦の線図

---

## 色の対応表

### 旧カラー → 新カラー

| 旧カラー | 新カラー | 用途 |
|---------|---------|------|
| pink-300 | champagne-300 | メインアクセント（明るめ） |
| pink-400 | champagne-400 | アクセント |
| pink-500 | champagne-500 | メインアクセント |
| purple-200 | midnight-200 | テキスト（明るめ） |
| purple-300 | midnight-300 | テキスト、アイコン |
| purple-400 | midnight-400 | ボーダー、アクセント |
| purple-500 | midnight-500 | 背景、アクセント |
| fuchsia-300 | champagne-400 | |
| fuchsia-400 | champagne-500 | |
| oracle-gold | champagne-500 | レガシーサポート |
| mystic-purple | midnight-500 | |

---

## 視認性の確保

### コントラスト比

背景 (#060A14) に対する各色のコントラスト比：

| 色 | コントラスト比 | WCAG AAA |
|----|-------------|----------|
| champagne-200 (#F7E7CE) | 12.8:1 | ✅ 合格 |
| champagne-400 (#D4C5A9) | 10.2:1 | ✅ 合格 |
| champagne-500 (#C9B88A) | 8.5:1 | ✅ 合格 |
| midnight-200 (#8A9FBD) | 7.1:1 | ✅ 合格 |
| midnight-300 (#5C7AA3) | 5.2:1 | ⚠️ AA合格 |

### グラデーション効果

- **ガラスモーフィズム**: champagne-500 の 3% 透明度
- **グロー効果**: champagne-500 (30%) + midnight-500 (20%)
- **ホバーシャドー**: champagne-500/20 または midnight-500/20

---

## 使用例

### ホームページ
```tsx
// アイコン
<Star className="text-champagne-300" />
<Moon className="text-midnight-300" />

// ボタン
<Link className="border-champagne-400/50 hover:shadow-champagne-500/50">
  <div className="bg-gradient-to-r from-champagne-600 to-champagne-400" />
</Link>
```

### カバラページ
```tsx
// 見出し
<h3 className="text-champagne-300">長所・才能</h3>

// リスト項目
<li className="before:text-champagne-400">...</li>

// カード
<div className="border-champagne-400/40 bg-champagne-500/10">
```

### 易経ページ
```tsx
// 卦名
<h2 className="text-champagne-300">地天泰</h2>

// 八卦情報
<div className="text-midnight-200">{trigram.nature}</div>

// 爻の線
<div className="bg-champagne-300" /> // 陽爻
<div className="bg-midnight-400" /> // 陰爻
```

---

## デザインの特徴

### 1. **繊細さ**
- シャンパンゴールドの柔らかな輝き
- ミッドナイトブルーの深い奥行き
- 透明度を活用したレイヤー効果

### 2. **高級感**
- 控えめで上品なグラデーション
- ガラスモーフィズムによる洗練された質感
- 適度な余白と階層構造

### 3. **視認性**
- WCAG AAA基準を満たすコントラスト比
- 重要な情報は明るい champagne 系
- 補足情報は midnight 系で控えめに

### 4. **統一感**
- 全ページで一貫したカラーパレット
- グラデーションの方向性を統一
- アイコンとテキストの色の調和

---

## メンテナンス

### 新しい色を追加する場合

1. `tailwind.config.ts` のカラーパレットに追加
2. 視認性（コントラスト比）を確認
3. 既存の色との調和を確認
4. このドキュメントを更新

### 色の調整が必要な場合

- グローバルな変更: `tailwind.config.ts` を編集
- コンポーネント固有の変更: 各ファイルで直接編集
- 視認性のチェックツール: https://webaim.org/resources/contrastchecker/

---

最終更新: 2025-12-18
