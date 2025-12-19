# 易経画像ファイル一覧

このドキュメントは、luneNexusプロジェクトで使用する易経関連の画像ファイル名とその仕様を定義します。

## 画像の配置先

すべての画像は以下のディレクトリに配置してください：
```
/public/images/iching/
├── trigrams/     # 八卦画像（8枚）
└── hexagrams/    # 64卦画像（64枚）
```

---

## 八卦画像（8枚）

**仕様:**
- 解像度: 512x512px（正方形）
- 形式: PNG（透過推奨）またはJPG
- 用途: 上卦・下卦の視覚表現

| No. | 八卦名 | 拼音 | 象徴 | ファイル名 | パス |
|-----|--------|------|------|-----------|------|
| 1 | 乾（天） | qián | 天 | `trigram-qian.png` | `/public/images/iching/trigrams/trigram-qian.png` |
| 2 | 兌（沢） | duì | 沢 | `trigram-dui.png` | `/public/images/iching/trigrams/trigram-dui.png` |
| 3 | 離（火） | lí | 火 | `trigram-li.png` | `/public/images/iching/trigrams/trigram-li.png` |
| 4 | 震（雷） | zhèn | 雷 | `trigram-zhen.png` | `/public/images/iching/trigrams/trigram-zhen.png` |
| 5 | 巽（風） | xùn | 風 | `trigram-xun.png` | `/public/images/iching/trigrams/trigram-xun.png` |
| 6 | 坎（水） | kǎn | 水 | `trigram-kan.png` | `/public/images/iching/trigrams/trigram-kan.png` |
| 7 | 艮（山） | gèn | 山 | `trigram-gen.png` | `/public/images/iching/trigrams/trigram-gen.png` |
| 8 | 坤（地） | kūn | 地 | `trigram-kun.png` | `/public/images/iching/trigrams/trigram-kun.png` |

---

## 64卦画像（64枚）

**仕様:**
- 解像度: 1920x1080px（16:9）
- 形式: JPG, PNG, WebP
- 用途: 各卦のイメージ画像

| No. | 卦名 | 拼音 | 英語名 | ファイル名 | パス |
|-----|------|------|--------|-----------|------|
| 1 | 天（乾為天） | qián | The Creative | `hexagram-01.jpg` | `/public/images/iching/hexagrams/hexagram-01.jpg` |
| 2 | 地（坤為地） | kūn | The Receptive | `hexagram-02.jpg` | `/public/images/iching/hexagrams/hexagram-02.jpg` |
| 3 | 水雷屯 | zhūn | Difficulty at the Beginning | `hexagram-03.jpg` | `/public/images/iching/hexagrams/hexagram-03.jpg` |
| 4 | 山水蒙 | méng | Youthful Folly | `hexagram-04.jpg` | `/public/images/iching/hexagrams/hexagram-04.jpg` |
| 5 | 水天需 | xū | Waiting | `hexagram-05.jpg` | `/public/images/iching/hexagrams/hexagram-05.jpg` |
| 6 | 天水訟 | sòng | Conflict | `hexagram-06.jpg` | `/public/images/iching/hexagrams/hexagram-06.jpg` |
| 7 | 地水師 | shī | The Army | `hexagram-07.jpg` | `/public/images/iching/hexagrams/hexagram-07.jpg` |
| 8 | 水地比 | bǐ | Holding Together | `hexagram-08.jpg` | `/public/images/iching/hexagrams/hexagram-08.jpg` |
| 9 | 風天小畜 | xiǎo xù | Small Accumulating | `hexagram-09.jpg` | `/public/images/iching/hexagrams/hexagram-09.jpg` |
| 10 | 天沢履 | lǚ | Treading | `hexagram-10.jpg` | `/public/images/iching/hexagrams/hexagram-10.jpg` |
| 11 | 地天泰 | tài | Peace | `hexagram-11.jpg` | `/public/images/iching/hexagrams/hexagram-11.jpg` |
| 12 | 天地否 | pǐ | Standstill | `hexagram-12.jpg` | `/public/images/iching/hexagrams/hexagram-12.jpg` |
| 13 | 天火同人 | tóng rén | Fellowship | `hexagram-13.jpg` | `/public/images/iching/hexagrams/hexagram-13.jpg` |
| 14 | 火天大有 | dà yǒu | Great Possessing | `hexagram-14.jpg` | `/public/images/iching/hexagrams/hexagram-14.jpg` |
| 15 | 地山謙 | qiān | Modesty | `hexagram-15.jpg` | `/public/images/iching/hexagrams/hexagram-15.jpg` |
| 16 | 雷地豫 | yù | Enthusiasm | `hexagram-16.jpg` | `/public/images/iching/hexagrams/hexagram-16.jpg` |
| 17 | 沢雷随 | suí | Following | `hexagram-17.jpg` | `/public/images/iching/hexagrams/hexagram-17.jpg` |
| 18 | 山風蠱 | gǔ | Work on Decay | `hexagram-18.jpg` | `/public/images/iching/hexagrams/hexagram-18.jpg` |
| 19 | 地沢臨 | lín | Approach | `hexagram-19.jpg` | `/public/images/iching/hexagrams/hexagram-19.jpg` |
| 20 | 風地観 | guān | Contemplation | `hexagram-20.jpg` | `/public/images/iching/hexagrams/hexagram-20.jpg` |
| 21 | 火雷噬嗑 | shì hé | Biting Through | `hexagram-21.jpg` | `/public/images/iching/hexagrams/hexagram-21.jpg` |
| 22 | 山火賁 | bì | Grace | `hexagram-22.jpg` | `/public/images/iching/hexagrams/hexagram-22.jpg` |
| 23 | 山地剥 | bō | Splitting Apart | `hexagram-23.jpg` | `/public/images/iching/hexagrams/hexagram-23.jpg` |
| 24 | 地雷復 | fù | Return | `hexagram-24.jpg` | `/public/images/iching/hexagrams/hexagram-24.jpg` |
| 25 | 天雷无妄 | wú wàng | Innocence | `hexagram-25.jpg` | `/public/images/iching/hexagrams/hexagram-25.jpg` |
| 26 | 山天大畜 | dà xù | Great Accumulating | `hexagram-26.jpg` | `/public/images/iching/hexagrams/hexagram-26.jpg` |
| 27 | 山雷頤 | yí | Nourishment | `hexagram-27.jpg` | `/public/images/iching/hexagrams/hexagram-27.jpg` |
| 28 | 沢風大過 | dà guò | Great Exceeding | `hexagram-28.jpg` | `/public/images/iching/hexagrams/hexagram-28.jpg` |
| 29 | 坎為水 | kǎn | The Abysmal Water | `hexagram-29.jpg` | `/public/images/iching/hexagrams/hexagram-29.jpg` |
| 30 | 離為火 | lí | The Clinging Fire | `hexagram-30.jpg` | `/public/images/iching/hexagrams/hexagram-30.jpg` |
| 31 | 沢山咸 | xián | Influence | `hexagram-31.jpg` | `/public/images/iching/hexagrams/hexagram-31.jpg` |
| 32 | 雷風恒 | héng | Duration | `hexagram-32.jpg` | `/public/images/iching/hexagrams/hexagram-32.jpg` |
| 33 | 天山遯 | dùn | Retreat | `hexagram-33.jpg` | `/public/images/iching/hexagrams/hexagram-33.jpg` |
| 34 | 雷天大壮 | dà zhuàng | Great Power | `hexagram-34.jpg` | `/public/images/iching/hexagrams/hexagram-34.jpg` |
| 35 | 火地晋 | jìn | Progress | `hexagram-35.jpg` | `/public/images/iching/hexagrams/hexagram-35.jpg` |
| 36 | 地火明夷 | míng yí | Darkening of Light | `hexagram-36.jpg` | `/public/images/iching/hexagrams/hexagram-36.jpg` |
| 37 | 風火家人 | jiā rén | The Family | `hexagram-37.jpg` | `/public/images/iching/hexagrams/hexagram-37.jpg` |
| 38 | 火沢睽 | kuí | Opposition | `hexagram-38.jpg` | `/public/images/iching/hexagrams/hexagram-38.jpg` |
| 39 | 水山蹇 | jiǎn | Obstruction | `hexagram-39.jpg` | `/public/images/iching/hexagrams/hexagram-39.jpg` |
| 40 | 雷水解 | xiè | Deliverance | `hexagram-40.jpg` | `/public/images/iching/hexagrams/hexagram-40.jpg` |
| 41 | 山沢損 | sǔn | Decrease | `hexagram-41.jpg` | `/public/images/iching/hexagrams/hexagram-41.jpg` |
| 42 | 風雷益 | yì | Increase | `hexagram-42.jpg` | `/public/images/iching/hexagrams/hexagram-42.jpg` |
| 43 | 沢天夬 | guài | Breakthrough | `hexagram-43.jpg` | `/public/images/iching/hexagrams/hexagram-43.jpg` |
| 44 | 天風姤 | gòu | Coming to Meet | `hexagram-44.jpg` | `/public/images/iching/hexagrams/hexagram-44.jpg` |
| 45 | 沢地萃 | cuì | Gathering Together | `hexagram-45.jpg` | `/public/images/iching/hexagrams/hexagram-45.jpg` |
| 46 | 地風升 | shēng | Pushing Upward | `hexagram-46.jpg` | `/public/images/iching/hexagrams/hexagram-46.jpg` |
| 47 | 沢水困 | kùn | Oppression | `hexagram-47.jpg` | `/public/images/iching/hexagrams/hexagram-47.jpg` |
| 48 | 水風井 | jǐng | The Well | `hexagram-48.jpg` | `/public/images/iching/hexagrams/hexagram-48.jpg` |
| 49 | 沢火革 | gé | Revolution | `hexagram-49.jpg` | `/public/images/iching/hexagrams/hexagram-49.jpg` |
| 50 | 火風鼎 | dǐng | The Caldron | `hexagram-50.jpg` | `/public/images/iching/hexagrams/hexagram-50.jpg` |
| 51 | 震為雷 | zhèn | The Arousing Thunder | `hexagram-51.jpg` | `/public/images/iching/hexagrams/hexagram-51.jpg` |
| 52 | 艮為山 | gèn | Keeping Still Mountain | `hexagram-52.jpg` | `/public/images/iching/hexagrams/hexagram-52.jpg` |
| 53 | 風山漸 | jiàn | Development | `hexagram-53.jpg` | `/public/images/iching/hexagrams/hexagram-53.jpg` |
| 54 | 雷沢帰妹 | guī mèi | The Marrying Maiden | `hexagram-54.jpg` | `/public/images/iching/hexagrams/hexagram-54.jpg` |
| 55 | 雷火豊 | fēng | Abundance | `hexagram-55.jpg` | `/public/images/iching/hexagrams/hexagram-55.jpg` |
| 56 | 火山旅 | lǚ | The Wanderer | `hexagram-56.jpg` | `/public/images/iching/hexagrams/hexagram-56.jpg` |
| 57 | 巽為風 | xùn | The Gentle Wind | `hexagram-57.jpg` | `/public/images/iching/hexagrams/hexagram-57.jpg` |
| 58 | 兌為沢 | duì | The Joyous Lake | `hexagram-58.jpg` | `/public/images/iching/hexagrams/hexagram-58.jpg` |
| 59 | 風水渙 | huàn | Dispersion | `hexagram-59.jpg` | `/public/images/iching/hexagrams/hexagram-59.jpg` |
| 60 | 水沢節 | jié | Limitation | `hexagram-60.jpg` | `/public/images/iching/hexagrams/hexagram-60.jpg` |
| 61 | 風沢中孚 | zhōng fú | Inner Truth | `hexagram-61.jpg` | `/public/images/iching/hexagrams/hexagram-61.jpg` |
| 62 | 雷山小過 | xiǎo guò | Small Exceeding | `hexagram-62.jpg` | `/public/images/iching/hexagrams/hexagram-62.jpg` |
| 63 | 水火既済 | jì jì | After Completion | `hexagram-63.jpg` | `/public/images/iching/hexagrams/hexagram-63.jpg` |
| 64 | 火水未済 | wèi jì | Before Completion | `hexagram-64.jpg` | `/public/images/iching/hexagrams/hexagram-64.jpg` |

---

## ファイル名命名規則

### 八卦画像
- パターン: `trigram-{pinyin}.png`
- 例: `trigram-qian.png`, `trigram-kun.png`
- 小文字の拼音（ピンイン）を使用

### 64卦画像
- パターン: `hexagram-{番号2桁}.jpg`
- 例: `hexagram-01.jpg`, `hexagram-64.jpg`
- 番号は必ず2桁（01, 02, ..., 64）

---

## 画像作成のガイドライン

### 八卦画像
- **スタイル**: シンボリックで抽象的なデザイン
- **配色**: 各八卦の象徴色を参考に
  - 乾（天）: 金色、白
  - 兌（沢）: 白
  - 離（火）: 赤、紫
  - 震（雷）: 青、緑
  - 巽（風）: 緑
  - 坎（水）: 黒、紺
  - 艮（山）: 黄
  - 坤（地）: 黄、茶
- **透過**: PNG形式の場合、背景を透過推奨

### 64卦画像
- **スタイル**: 各卦の意味を象徴する風景やシーン
- **配色**: ピンク〜紫のグラデーション系と調和するトーン
- **構図**: 16:9の横長画像、中央にフォーカス
- **テキスト**: 画像内にテキストは含めない（システム側で表示）

---

## 実装時の参照先

画像を配置した後、以下のファイルを編集してパスを設定します：

1. **八卦画像**: `src/lib/iching/trigrams.ts`
   ```typescript
   imagePath: '/images/iching/trigrams/trigram-qian.png'
   ```

2. **64卦画像**: `src/lib/iching/hexagrams-full.ts`
   ```typescript
   imagePath: '/images/iching/hexagrams/hexagram-01.jpg'
   ```

---

## チェックリスト

### 八卦画像（8枚）
- [ ] trigram-qian.png（乾・天）
- [ ] trigram-dui.png（兌・沢）
- [ ] trigram-li.png（離・火）
- [ ] trigram-zhen.png（震・雷）
- [ ] trigram-xun.png（巽・風）
- [ ] trigram-kan.png（坎・水）
- [ ] trigram-gen.png（艮・山）
- [ ] trigram-kun.png（坤・地）

### 64卦画像（64枚）
- [ ] hexagram-01.jpg 〜 hexagram-64.jpg（全64枚）

---

最終更新: 2025-12-18
