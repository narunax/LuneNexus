# カバラ数秘術 AI占いシステム実装仕様書

## Kabbalah Numerology AI Fortune-Telling System Specification

**Version:** 1.0  
**作成日:** 2025年12月16日

---

## 目次

1. [歴史的背景と発展](#1-歴史的背景と発展)
2. [占術方法の詳細](#2-占術方法の詳細)
3. [生命の樹（セフィロト）との関係](#3-生命の樹セフィロトとの関係)
4. [解釈方法の体系](#4-解釈方法の体系)
5. [AI実装のための技術仕様](#5-ai実装のための技術仕様)
6. [奥義的・秘教的側面](#6-奥義的秘教的側面)
7. [サンプルコード](#7-サンプルコード)
8. [データベーススキーマ](#8-データベーススキーマ)

---

## 1. 歴史的背景と発展

### 1.1 ユダヤ神秘主義カバラの起源

カバラ（קַבָּלָה、「受け取ること」の意）は、ユダヤ教神秘主義の伝統であり、宇宙の構造、創造の神秘、人間と神の関係を探求する。**12-13世紀の南フランス（オクシタニア）とスペイン**で体系化された。

#### 主要原典

| 原典名 | 成立年代 | 著者 | 主要内容 |
|--------|----------|------|----------|
| **セフェル・イェツィラー（形成の書）** | 200-600年頃 | 不詳（伝統的にアブラハムに帰属） | 32の知恵の道（22文字+10セフィロト）による創造論 |
| **ゾーハル（光輝の書）** | 1270-1300年 | モーゼス・デ・レオン | トーラー神秘解釈、セフィロト体系、四層解釈法 |
| **エツ・ハイーム（生命の樹）** | 16世紀後半 | ハイイム・ヴィタル | ルリア派カバラの集大成 |

#### セフェル・イェツィラーの核心概念

セフェル・イェツィラーは、ヘブライ文字22字が創造の基本要素であると説く。文字は以下の3カテゴリーに分類される：

```
【母音字（イモット）】3文字 - 原初的要素
  א (Aleph) = 空気    מ (Mem) = 水    ש (Shin) = 火

【二重字（ケフラウト）】7文字 - 惑星対応
  ב ג ד כ פ ר ת (Beth, Gimel, Daleth, Kaph, Peh, Resh, Tav)

【単純字（ペシュトット）】12文字 - 黄道十二宮対応
  ה ו ז ח ט י ל נ ס ע צ ק
```

#### 主要人物と歴史的発展

| 人物 | 生没年 | 貢献 |
|------|--------|------|
| **モーゼス・デ・レオン** | c.1240-1305 | ゾーハルの著者（学術的見解） |
| **イサク・ルリア（アリ）** | 1534-1572 | ルリア派カバラの創始者、ツィムツム理論 |
| **モーゼス・コルドベロ** | 1522-1570 | ゾーハル体系化、パルデス・リモニム著 |
| **ハイイム・ヴィタル** | 1542-1620 | ルリア派の記録者、エツ・ハイーム著 |

### 1.2 ゲマトリア（文字と数の対応システム）

ゲマトリア（גימטריה）は、ヘブライ文字に数値を割り当て、言葉の隠された意味を探る手法である。

#### 標準ゲマトリア対応表

| 文字 | 名称 | 数値 | 終止形 | 象徴的意味 |
|------|------|------|--------|------------|
| א | Aleph | 1 | - | 牡牛、一性、創造主の統一 |
| ב | Bet | 2 | - | 家、二元性、容器 |
| ג | Gimel | 3 | - | ラクダ、運動、施与 |
| ד | Dalet | 4 | - | 扉、謙虚、構造 |
| ה | He | 5 | - | 窓、神の息吹、生命の本質 |
| ו | Vav | 6 | - | 釘、結合、創造の6日間 |
| ז | Zayin | 7 | - | 剣、精神、安息日 |
| ח | Chet | 8 | - | 柵、生命（חיים）、超越 |
| ט | Tet | 9 | - | 蛇、善（טוב）、女性性 |
| י | Yod | 10 | - | 手、神聖な火花、基礎 |
| כ | Kaf | 20 | ך=500 | 手のひら、形、王冠 |
| ל | Lamed | 30 | - | 牛突き棒、学習、心 |
| מ | Mem | 40 | ם=600 | 水、知恵、顕現 |
| נ | Nun | 50 | ן=700 | 魚、魂、忠実 |
| ס | Samekh | 60 | - | 支柱、保護 |
| ע | Ayin | 70 | - | 目、視覚、時間 |
| פ | Pe | 80 | ף=800 | 口、言葉、創造の力 |
| צ | Tzade | 90 | ץ=900 | 釣り針、義、正義 |
| ק | Qoph | 100 | - | 後頭部、周期 |
| ר | Resh | 200 | - | 頭、指導力 |
| ש | Shin | 300 | - | 歯、火、変容 |
| ת | Tav | 400 | - | 印、真理、完成 |

#### ゲマトリア計算方法

| 方法名 | 説明 | 例 |
|--------|------|-----|
| **ミスパル・ガドル** | 標準値 | אמת = 1+40+400 = 441 |
| **ミスパル・カタン** | 各桁を1-9に縮約 | Yod(10)→1 |
| **ミスパル・シドリ** | アルファベット順位 | Aleph=1...Tav=22 |
| **アトバシュ** | 文字の鏡像変換 | א↔ת |
| **ミルイ** | 文字名を綴って計算 | Aleph(אלף)=111 |

### 1.3 現代数秘術への発展

| 流派 | 特徴 | 主要人物 |
|------|------|----------|
| **伝統的ユダヤ・カバラ** | トーラー解釈 | イサク・ルリア |
| **ヘルメス的カバラ** | タロット統合 | マザース |
| **ピタゴラス数秘術** | 生年月日基準 | キロ（1866-1936） |
| **カルデア数秘術** | 1-8使用 | 古代バビロニア |

---

## 2. 占術方法の詳細

### 2.1 主要数値の計算方法

#### ライフパスナンバー（Life Path Number）

**最重要の数値**。人生の目的と使命を示す。

```
計算方法：
1. 生年月日の各要素（月、日、年）を個別に一桁に縮約
2. マスターナンバー（11, 22, 33）は縮約しない
3. 3つの数値を合計し、再度縮約

例：1980年10月22日
  月: 10 → 1+0 = 1
  日: 22 → マスターナンバーなので維持 = 22
  年: 1980 → 1+9+8+0 = 18 → 1+8 = 9
  合計: 1 + 22 + 9 = 32 → 3+2 = 5
  ライフパスナンバー: 5
```

#### その他の主要数値

| 数値名 | 計算元 | 意味 |
|--------|--------|------|
| **デスティニー** | 名前全文字 | 才能と能力 |
| **ソウルアージ** | 名前の母音 | 内なる欲求 |
| **パーソナリティ** | 名前の子音 | 外部への印象 |
| **バースデー** | 誕生日のみ | 特別な才能 |

### 2.2 英語アルファベット数値対応表

#### ピタゴラス方式

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|
| A | B | C | D | E | F | G | H | I |
| J | K | L | M | N | O | P | Q | R |
| S | T | U | V | W | X | Y | Z | |

#### カルデア方式（9を除外）

```
1: A, I, J, Q, Y    5: E, H, N, X
2: B, K, R          6: U, V, W
3: C, G, L, S       7: O, Z
4: D, M, T          8: F, P
```

### 2.3 日本語名の数値化

```
手順:
1. 漢字 → ひらがな変換（読み）
2. ひらがな → ローマ字変換（ヘボン式）
3. ローマ字にピタゴラス方式適用

例: 山田太郎 → やまだたろう → YAMADA TARO
  Y=7, A=1, M=4, A=1, D=4, A=1 = 18 → 9
  T=2, A=1, R=9, O=6 = 18 → 9
  合計: 9 + 9 = 18 → 9
```

### 2.4 マスターナンバー

| 数値 | 別名 | 意味 |
|------|------|------|
| **11** | 直感の使者 | 霊的洞察、高い感受性 |
| **22** | マスタービルダー | 大規模ビジョンの実現 |
| **33** | マスターティーチャー | 無条件の愛、霊的指導 |

### 2.5 カルミックデットナンバー

| 数値 | 縮約後 | カルマの種類 |
|------|--------|--------------|
| **13/4** | 4 | 怠惰の負債 |
| **14/5** | 5 | 自由の乱用 |
| **16/7** | 7 | エゴの負債 |
| **19/1** | 1 | 利己主義 |

### 2.6 人生周期の計算

#### ピナクルナンバー

```
第1ピナクル = 月 + 日（縮約）
第2ピナクル = 日 + 年（縮約）
第3ピナクル = 第1 + 第2（縮約）
第4ピナクル = 月 + 年（縮約）

期間:
第1: 誕生 ～ (36 - ライフパス)歳
第2-3: 各9年間
第4: それ以降
```

#### チャレンジナンバー

```
第1チャレンジ = |月 - 日|
第2チャレンジ = |日 - 年|
第3チャレンジ = |第1 - 第2|
第4チャレンジ = |月 - 年|
```

---

## 3. 生命の樹（セフィロト）との関係

### 3.1 10のセフィラ

| # | 名称 | 意味 | 柱 | 惑星 | キーワード |
|---|------|------|-----|------|------------|
| 1 | ケテル | 王冠 | 中央 | 海王星 | 神意、統一 |
| 2 | コクマー | 知恵 | 右 | 天王星 | 創造力、男性性 |
| 3 | ビナー | 理解 | 左 | 土星 | 受容、女性性 |
| 4 | ケセド | 慈悲 | 右 | 木星 | 拡張、恩寵 |
| 5 | ゲブラー | 峻厳 | 左 | 火星 | 審判、力 |
| 6 | ティファレト | 美 | 中央 | 太陽 | 調和、意識 |
| 7 | ネツァク | 勝利 | 右 | 金星 | 感情、芸術 |
| 8 | ホド | 栄光 | 左 | 水星 | 知性、論理 |
| 9 | イェソド | 基礎 | 中央 | 月 | 無意識、夢 |
| 10 | マルクト | 王国 | 中央 | 地球 | 物質界 |

### 3.2 三本の柱

```
【峻厳の柱】     【均衡の柱】      【慈悲の柱】
  ビナー(3)        ケテル(1)        コクマー(2)
  ゲブラー(5)      ティファレト(6)  ケセド(4)
  ホド(8)          イェソド(9)      ネツァク(7)
                   マルクト(10)
```

### 3.3 22のパスとタロット対応

| パス | 文字 | タロット | 占星術 |
|------|------|----------|--------|
| 11 | Aleph | 愚者 | 空気 |
| 12 | Beth | 魔術師 | 水星 |
| 13 | Gimel | 女教皇 | 月 |
| 14 | Daleth | 女帝 | 金星 |
| 15 | He | 皇帝 | 牡羊座 |
| 16 | Vav | 教皇 | 牡牛座 |
| 17 | Zayin | 恋人 | 双子座 |
| 18 | Cheth | 戦車 | 蟹座 |
| 19 | Teth | 力 | 獅子座 |
| 20 | Yod | 隠者 | 乙女座 |
| 21 | Kaph | 運命の輪 | 木星 |
| 22 | Lamed | 正義 | 天秤座 |
| 23 | Mem | 吊るされた男 | 水 |
| 24 | Nun | 死神 | 蠍座 |
| 25 | Samekh | 節制 | 射手座 |
| 26 | Ayin | 悪魔 | 山羊座 |
| 27 | Peh | 塔 | 火星 |
| 28 | Tzaddi | 星 | 水瓶座 |
| 29 | Qoph | 月 | 魚座 |
| 30 | Resh | 太陽 | 太陽 |
| 31 | Shin | 審判 | 火 |
| 32 | Tav | 世界 | 土星 |

---

## 4. 解釈方法の体系

### 4.1 各数字の意味

#### 数字1-9

| 数 | 名称 | キーワード | 惑星 | ポジティブ | ネガティブ |
|----|------|------------|------|------------|------------|
| 1 | リーダー | 独立、主導 | 太陽 | 創造性、勇気 | 利己、頑固 |
| 2 | 調停者 | 協力、調和 | 月 | 外交、直感 | 依存、優柔不断 |
| 3 | 表現者 | 創造、喜び | 木星 | 楽観、魅力 | 散漫、浪費 |
| 4 | 建設者 | 安定、秩序 | 土星 | 信頼、組織 | 頑固、退屈 |
| 5 | 自由人 | 変化、冒険 | 水星 | 適応、進歩 | 無責任、衝動 |
| 6 | 養育者 | 責任、家庭 | 金星 | 愛情、支援 | 心配、干渉 |
| 7 | 探求者 | 分析、霊性 | 海王星 | 賢明、哲学 | 孤立、皮肉 |
| 8 | 達成者 | 力、成功 | 土星 | 野心、効率 | 物質主義、支配 |
| 9 | 人道主義者 | 完成、慈悲 | 火星 | 寛大、理想 | 恨み、非現実 |

### 4.2 相性診断マトリックス

```
相性スコア（0-100）:
      1    2    3    4    5    6    7    8    9
 1 | 65 | 85 | 80 | 70 | 75 | 85 | 70 | 80 | 75 |
 2 | 85 | 70 | 85 | 75 | 60 | 90 | 85 | 75 | 85 |
 3 | 80 | 85 | 75 | 60 | 90 | 80 | 65 | 70 | 85 |
 4 | 70 | 75 | 60 | 80 | 55 | 75 | 85 | 90 | 65 |
 5 | 75 | 60 | 90 | 55 | 70 | 65 | 80 | 60 | 90 |
 6 | 85 | 90 | 80 | 75 | 65 | 85 | 70 | 80 | 95 |
 7 | 70 | 85 | 65 | 85 | 80 | 70 | 85 | 75 | 80 |
 8 | 80 | 75 | 70 | 90 | 60 | 80 | 75 | 75 | 70 |
 9 | 75 | 85 | 85 | 65 | 90 | 95 | 80 | 70 | 80 |
```

#### 総合相性計算式

```
総合相性 = (ライフパス × 0.35) + (エクスプレッション × 0.25)
         + (ソウルアージ × 0.20) + (パーソナリティ × 0.20)
```

---

## 5. AI実装のための技術仕様

### 5.1 入力データ形式

```typescript
interface NumerologyInput {
  birthdate: {
    year: number;    // 1900-2100
    month: number;   // 1-12
    day: number;     // 1-31
  };
  name: {
    fullName: string;
    language: 'en' | 'ja';
    kanjiName?: string;
    kanaName?: string;
  };
}
```

### 5.2 出力データ形式

```typescript
interface NumerologyReading {
  coreNumbers: {
    lifePath: NumberResult;
    expression: NumberResult;
    soulUrge: NumberResult;
    personality: NumberResult;
  };
  cycles: {
    pinnacles: PinnacleResult[];
    challenges: ChallengeResult[];
    personalYear: number;
  };
  interpretation: {
    summary: string;
    strengths: string[];
    challenges: string[];
    advice: string;
  };
}

interface NumberResult {
  value: number;
  isMaster: boolean;
  hasKarmicDebt: boolean;
  karmicNumber?: number;
  interpretation: string;
}
```

---

## 6. 奥義的・秘教的側面

### 6.1 数字と宇宙法則

| 数字 | 宇宙法則 | 象徴 |
|------|----------|------|
| 0 | 虚空（エイン・ソフ） | 無限の可能性 |
| 1 | 統一の法則 | 全ては一つ |
| 2 | 極性の法則 | 対極の存在 |
| 3 | 三角形の法則 | 創造の三力 |
| 4 | 顕現の法則 | 四大元素 |
| 5 | 変化の法則 | 進化と変容 |
| 6 | 調和の法則 | 美と秩序 |
| 7 | 周期の法則 | 7の循環 |
| 8 | カルマの法則 | 因果応報 |
| 9 | 完成の法則 | サイクル完了 |

### 6.2 神聖幾何学

```
テトラクティス（ピタゴラスの神聖図形）:
       1           ← 一性
      2 3          ← 二元性
     4 5 6         ← 三界
    7 8 9 10       ← 四大

合計: 1+2+3+4 = 10 = 完成
```

### 6.3 タロット小アルカナ対応

| セフィラ | 数 | ワンド(火) | カップ(水) | ソード(空) | ペンタクル(地) |
|----------|---|------------|------------|------------|----------------|
| ケテル | A | 火の根源 | 水の根源 | 空の根源 | 地の根源 |
| コクマー | 2 | 支配 | 愛 | 平和 | 変化 |
| ビナー | 3 | 徳 | 豊穣 | 悲哀 | 仕事 |
| ケセド | 4 | 完成 | 贅沢 | 休戦 | 力 |
| ゲブラー | 5 | 争い | 失望 | 敗北 | 心配 |
| ティファレト | 6 | 勝利 | 快楽 | 科学 | 成功 |
| ネツァク | 7 | 勇気 | 堕落 | 無益 | 失敗 |
| ホド | 8 | 迅速 | 怠惰 | 干渉 | 慎重 |
| イェソド | 9 | 力 | 幸福 | 残酷 | 利得 |
| マルクト | 10 | 抑圧 | 満足 | 破滅 | 富 |

---

## 7. サンプルコード

### 7.1 Python実装

```python
"""
Kabbalah Numerology Calculator
カバラ数秘術計算モジュール
"""

from typing import Dict, Optional, Tuple
from dataclasses import dataclass
from enum import Enum

# ピタゴラス方式の文字-数値対応
PYTHAGOREAN_MAP = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
}

VOWELS = set('AEIOU')
MASTER_NUMBERS = {11, 22, 33}
KARMIC_DEBT_NUMBERS = {13, 14, 16, 19}


@dataclass
class NumberResult:
    """数値計算結果"""
    value: int
    is_master: bool
    has_karmic_debt: bool
    karmic_number: Optional[int] = None
    raw_value: Optional[int] = None


def sum_digits(num: int) -> int:
    """数字の各桁を合計"""
    return sum(int(d) for d in str(num))


def reduce_to_digit(num: int, preserve_masters: bool = True) -> NumberResult:
    """
    数字を一桁またはマスターナンバーに縮約
    
    Args:
        num: 入力数値
        preserve_masters: マスターナンバーを保持するか
    
    Returns:
        NumberResult: 縮約結果
    """
    original = num
    karmic = num if num in KARMIC_DEBT_NUMBERS else None
    
    while num > 9:
        if preserve_masters and num in MASTER_NUMBERS:
            break
        num = sum_digits(num)
        if num in KARMIC_DEBT_NUMBERS:
            karmic = num
    
    return NumberResult(
        value=num,
        is_master=num in MASTER_NUMBERS,
        has_karmic_debt=karmic is not None,
        karmic_number=karmic,
        raw_value=original
    )


def calculate_life_path(year: int, month: int, day: int) -> NumberResult:
    """
    ライフパスナンバーを計算
    
    Args:
        year: 生年
        month: 生月
        day: 生日
    
    Returns:
        NumberResult: ライフパスナンバー
    """
    # 各要素を個別に縮約
    month_result = reduce_to_digit(month)
    day_result = reduce_to_digit(day)
    year_sum = sum_digits(year)
    year_result = reduce_to_digit(year_sum)
    
    # 合計
    total = month_result.value + day_result.value + year_result.value
    
    return reduce_to_digit(total)


def normalize_name(name: str) -> str:
    """名前を正規化（大文字アルファベットのみ）"""
    return ''.join(c.upper() for c in name if c.isalpha())


def calculate_expression(name: str) -> NumberResult:
    """デスティニー/エクスプレッションナンバーを計算"""
    clean = normalize_name(name)
    total = sum(PYTHAGOREAN_MAP.get(c, 0) for c in clean)
    return reduce_to_digit(total)


def calculate_soul_urge(name: str) -> NumberResult:
    """ソウルアージナンバーを計算（母音のみ）"""
    clean = normalize_name(name)
    total = sum(PYTHAGOREAN_MAP.get(c, 0) for c in clean if c in VOWELS)
    return reduce_to_digit(total)


def calculate_personality(name: str) -> NumberResult:
    """パーソナリティナンバーを計算（子音のみ）"""
    clean = normalize_name(name)
    total = sum(PYTHAGOREAN_MAP.get(c, 0) for c in clean if c not in VOWELS)
    return reduce_to_digit(total)


def calculate_pinnacles(year: int, month: int, day: int, life_path: int) -> Dict[int, NumberResult]:
    """ピナクルナンバーを計算"""
    m = reduce_to_digit(month).value
    d = reduce_to_digit(day).value
    y = reduce_to_digit(sum_digits(year)).value
    
    return {
        1: reduce_to_digit(m + d),
        2: reduce_to_digit(d + y),
        3: reduce_to_digit(reduce_to_digit(m + d).value + reduce_to_digit(d + y).value),
        4: reduce_to_digit(m + y)
    }


def calculate_challenges(year: int, month: int, day: int) -> Dict[int, int]:
    """チャレンジナンバーを計算"""
    m = reduce_to_digit(month, preserve_masters=False).value
    d = reduce_to_digit(day, preserve_masters=False).value
    y = reduce_to_digit(sum_digits(year), preserve_masters=False).value
    
    c1 = abs(m - d)
    c2 = abs(d - y)
    
    return {
        1: c1,
        2: c2,
        3: abs(c1 - c2),
        4: abs(m - y)
    }


def calculate_personal_year(birth_month: int, birth_day: int, current_year: int) -> NumberResult:
    """パーソナルイヤーを計算"""
    m = reduce_to_digit(birth_month).value
    d = reduce_to_digit(birth_day).value
    y = reduce_to_digit(sum_digits(current_year)).value
    return reduce_to_digit(m + d + y)


def calculate_compatibility(lp1: int, lp2: int) -> int:
    """相性スコアを計算（ライフパス基準）"""
    COMPATIBILITY_MATRIX = {
        (1,1): 65, (1,2): 85, (1,3): 80, (1,4): 70, (1,5): 75,
        (1,6): 85, (1,7): 70, (1,8): 80, (1,9): 75,
        (2,2): 70, (2,3): 85, (2,4): 75, (2,5): 60,
        (2,6): 90, (2,7): 85, (2,8): 75, (2,9): 85,
        (3,3): 75, (3,4): 60, (3,5): 90, (3,6): 80, (3,7): 65, (3,8): 70, (3,9): 85,
        (4,4): 80, (4,5): 55, (4,6): 75, (4,7): 85, (4,8): 90, (4,9): 65,
        (5,5): 70, (5,6): 65, (5,7): 80, (5,8): 60, (5,9): 90,
        (6,6): 85, (6,7): 70, (6,8): 80, (6,9): 95,
        (7,7): 85, (7,8): 75, (7,9): 80,
        (8,8): 75, (8,9): 70,
        (9,9): 80
    }
    key = (min(lp1, lp2), max(lp1, lp2))
    return COMPATIBILITY_MATRIX.get(key, 50)


class NumerologyCalculator:
    """数秘術計算クラス"""
    
    def __init__(self, name: str, year: int, month: int, day: int):
        self.name = name
        self.year = year
        self.month = month
        self.day = day
        self._calculate_all()
    
    def _calculate_all(self):
        """全ての数値を計算"""
        self.life_path = calculate_life_path(self.year, self.month, self.day)
        self.expression = calculate_expression(self.name)
        self.soul_urge = calculate_soul_urge(self.name)
        self.personality = calculate_personality(self.name)
        self.pinnacles = calculate_pinnacles(
            self.year, self.month, self.day, self.life_path.value
        )
        self.challenges = calculate_challenges(self.year, self.month, self.day)
    
    def get_personal_year(self, year: int) -> NumberResult:
        """指定年のパーソナルイヤーを取得"""
        return calculate_personal_year(self.month, self.day, year)
    
    def get_compatibility(self, other: 'NumerologyCalculator') -> Dict:
        """他者との相性を計算"""
        scores = {
            'life_path': calculate_compatibility(
                self.life_path.value, other.life_path.value
            ),
            'expression': calculate_compatibility(
                self.expression.value, other.expression.value
            ),
            'soul_urge': calculate_compatibility(
                self.soul_urge.value, other.soul_urge.value
            ),
            'personality': calculate_compatibility(
                self.personality.value, other.personality.value
            )
        }
        overall = (
            scores['life_path'] * 0.35 +
            scores['expression'] * 0.25 +
            scores['soul_urge'] * 0.20 +
            scores['personality'] * 0.20
        )
        return {'scores': scores, 'overall': round(overall, 1)}
    
    def to_dict(self) -> Dict:
        """結果を辞書形式で出力"""
        return {
            'name': self.name,
            'birthdate': f"{self.year}-{self.month:02d}-{self.day:02d}",
            'core_numbers': {
                'life_path': {
                    'value': self.life_path.value,
                    'is_master': self.life_path.is_master,
                    'has_karmic_debt': self.life_path.has_karmic_debt,
                    'karmic_number': self.life_path.karmic_number
                },
                'expression': {
                    'value': self.expression.value,
                    'is_master': self.expression.is_master
                },
                'soul_urge': {
                    'value': self.soul_urge.value,
                    'is_master': self.soul_urge.is_master
                },
                'personality': {
                    'value': self.personality.value,
                    'is_master': self.personality.is_master
                }
            },
            'pinnacles': {k: v.value for k, v in self.pinnacles.items()},
            'challenges': self.challenges
        }


# 使用例
if __name__ == "__main__":
    # 計算例
    calc = NumerologyCalculator("Yamada Taro", 1990, 5, 15)
    print(calc.to_dict())
    
    # 相性計算
    calc2 = NumerologyCalculator("Suzuki Hanako", 1992, 8, 22)
    print(calc.get_compatibility(calc2))
```

### 7.2 日本語名ローマ字変換

```python
"""
Japanese Name Romanization Module
日本語名ローマ字変換モジュール
"""

# ひらがな→ローマ字変換表（ヘボン式）
HIRAGANA_TO_ROMAJI = {
    'あ': 'A', 'い': 'I', 'う': 'U', 'え': 'E', 'お': 'O',
    'か': 'KA', 'き': 'KI', 'く': 'KU', 'け': 'KE', 'こ': 'KO',
    'さ': 'SA', 'し': 'SHI', 'す': 'SU', 'せ': 'SE', 'そ': 'SO',
    'た': 'TA', 'ち': 'CHI', 'つ': 'TSU', 'て': 'TE', 'と': 'TO',
    'な': 'NA', 'に': 'NI', 'ぬ': 'NU', 'ね': 'NE', 'の': 'NO',
    'は': 'HA', 'ひ': 'HI', 'ふ': 'FU', 'へ': 'HE', 'ほ': 'HO',
    'ま': 'MA', 'み': 'MI', 'む': 'MU', 'め': 'ME', 'も': 'MO',
    'や': 'YA', 'ゆ': 'YU', 'よ': 'YO',
    'ら': 'RA', 'り': 'RI', 'る': 'RU', 'れ': 'RE', 'ろ': 'RO',
    'わ': 'WA', 'を': 'WO', 'ん': 'N',
    'が': 'GA', 'ぎ': 'GI', 'ぐ': 'GU', 'げ': 'GE', 'ご': 'GO',
    'ざ': 'ZA', 'じ': 'JI', 'ず': 'ZU', 'ぜ': 'ZE', 'ぞ': 'ZO',
    'だ': 'DA', 'ぢ': 'JI', 'づ': 'ZU', 'で': 'DE', 'ど': 'DO',
    'ば': 'BA', 'び': 'BI', 'ぶ': 'BU', 'べ': 'BE', 'ぼ': 'BO',
    'ぱ': 'PA', 'ぴ': 'PI', 'ぷ': 'PU', 'ぺ': 'PE', 'ぽ': 'PO',
    'きゃ': 'KYA', 'きゅ': 'KYU', 'きょ': 'KYO',
    'しゃ': 'SHA', 'しゅ': 'SHU', 'しょ': 'SHO',
    'ちゃ': 'CHA', 'ちゅ': 'CHU', 'ちょ': 'CHO',
    'にゃ': 'NYA', 'にゅ': 'NYU', 'にょ': 'NYO',
    'ひゃ': 'HYA', 'ひゅ': 'HYU', 'ひょ': 'HYO',
    'みゃ': 'MYA', 'みゅ': 'MYU', 'みょ': 'MYO',
    'りゃ': 'RYA', 'りゅ': 'RYU', 'りょ': 'RYO',
    'ぎゃ': 'GYA', 'ぎゅ': 'GYU', 'ぎょ': 'GYO',
    'じゃ': 'JA', 'じゅ': 'JU', 'じょ': 'JO',
    'びゃ': 'BYA', 'びゅ': 'BYU', 'びょ': 'BYO',
    'ぴゃ': 'PYA', 'ぴゅ': 'PYU', 'ぴょ': 'PYO',
    'っ': '',  # 促音（次の子音を重ねる）
    'ー': ''   # 長音
}

def hiragana_to_romaji(text: str) -> str:
    """ひらがなをローマ字に変換"""
    result = []
    i = 0
    while i < len(text):
        # 2文字の拗音をチェック
        if i + 1 < len(text) and text[i:i+2] in HIRAGANA_TO_ROMAJI:
            result.append(HIRAGANA_TO_ROMAJI[text[i:i+2]])
            i += 2
        # 促音の処理
        elif text[i] == 'っ' and i + 1 < len(text):
            next_char = hiragana_to_romaji(text[i+1])
            if next_char:
                result.append(next_char[0])  # 次の子音を重ねる
            i += 1
        # 1文字の変換
        elif text[i] in HIRAGANA_TO_ROMAJI:
            result.append(HIRAGANA_TO_ROMAJI[text[i]])
            i += 1
        else:
            i += 1
    
    return ''.join(result)


def japanese_name_to_numerology(kana_name: str) -> int:
    """日本語名（かな）から数秘術数値を計算"""
    romaji = hiragana_to_romaji(kana_name)
    result = calculate_expression(romaji)
    return result.value
```

---

## 8. データベーススキーマ

### 8.1 解釈データJSON構造

```json
{
  "numbers": {
    "1": {
      "name_ja": "リーダー",
      "name_en": "The Leader",
      "keywords": ["独立", "主導", "野心", "独自性", "開拓"],
      "planet": "太陽",
      "element": "火",
      "tarot": "魔術師",
      "sephirah": "ケテル",
      "meanings": {
        "life_path": "あなたの人生の目的は...",
        "expression": "あなたの才能は...",
        "soul_urge": "内なる欲求は...",
        "personality": "外部に対して...",
        "pinnacle": "この時期は...",
        "challenge": "この課題は...",
        "personal_year": "新しいサイクルの始まり..."
      },
      "traits": {
        "positive": ["リーダーシップ", "勇気", "創造性"],
        "negative": ["利己主義", "攻撃性", "頑固"],
        "careers": ["起業家", "経営者", "発明家"]
      }
    }
  },
  "master_numbers": {
    "11": { "...": "..." },
    "22": { "...": "..." },
    "33": { "...": "..." }
  },
  "karmic_debts": {
    "13": { "lesson": "怠惰の克服", "advice": "..." },
    "14": { "lesson": "自由の正しい使い方", "advice": "..." },
    "16": { "lesson": "エゴの手放し", "advice": "..." },
    "19": { "lesson": "利己主義の克服", "advice": "..." }
  },
  "compatibility": {
    "1-1": { "score": 65, "description": "..." },
    "1-2": { "score": 85, "description": "..." }
  },
  "sephirot": {
    "1": { "name": "ケテル", "meaning": "王冠", "planet": "海王星" },
    "2": { "name": "コクマー", "meaning": "知恵", "planet": "天王星" }
  },
  "paths": {
    "11": { "letter": "Aleph", "tarot": "愚者", "astrology": "空気" }
  }
}
```

### 8.2 SQLデータベース設計

```sql
-- 数字の意味テーブル
CREATE TABLE number_meanings (
    number INTEGER PRIMARY KEY,
    is_master BOOLEAN DEFAULT FALSE,
    name_ja VARCHAR(50),
    name_en VARCHAR(50),
    keywords JSON,
    planet VARCHAR(20),
    element VARCHAR(20),
    tarot VARCHAR(50),
    sephirah VARCHAR(20)
);

-- コンテキスト別解釈テーブル
CREATE TABLE interpretations (
    id SERIAL PRIMARY KEY,
    number INTEGER REFERENCES number_meanings(number),
    context VARCHAR(20), -- life_path, expression, etc.
    interpretation_ja TEXT,
    interpretation_en TEXT
);

-- 相性マトリックステーブル
CREATE TABLE compatibility (
    number1 INTEGER,
    number2 INTEGER,
    score INTEGER,
    description_ja TEXT,
    PRIMARY KEY (number1, number2)
);

-- セフィロトテーブル
CREATE TABLE sephirot (
    number INTEGER PRIMARY KEY,
    name_hebrew VARCHAR(50),
    name_ja VARCHAR(50),
    meaning VARCHAR(100),
    pillar VARCHAR(20),
    planet VARCHAR(20),
    color VARCHAR(50),
    body_part VARCHAR(50)
);

-- パステーブル
CREATE TABLE paths (
    path_number INTEGER PRIMARY KEY,
    hebrew_letter VARCHAR(10),
    letter_name VARCHAR(20),
    letter_value INTEGER,
    tarot_card VARCHAR(50),
    astrology VARCHAR(50),
    connects_from INTEGER REFERENCES sephirot(number),
    connects_to INTEGER REFERENCES sephirot(number)
);
```

---

## 付録A: クイックリファレンス

### 計算チートシート

```
【ライフパス】月+日+年 → 縮約（マスター保持）
【エクスプレッション】名前全文字 → 縮約
【ソウルアージ】母音のみ → 縮約
【パーソナリティ】子音のみ → 縮約

【ピナクル】
P1=月+日, P2=日+年, P3=P1+P2, P4=月+年

【チャレンジ】
C1=|月-日|, C2=|日-年|, C3=|C1-C2|, C4=|月-年|

【パーソナルイヤー】月+日+当年
```

### 重要数値一覧

```
マスターナンバー: 11, 22, 33
カルミックデット: 13, 14, 16, 19
母音: A, E, I, O, U
```

---

**仕様書 終了**

本仕様書に基づき、カバラ数秘術のAI占いシステムを実装することができます。計算ロジック、解釈データベース、入出力形式を組み合わせることで、包括的な数秘術リーディングを提供するシステムの構築が可能です。