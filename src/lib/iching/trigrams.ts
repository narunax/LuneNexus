/**
 * 八卦（Eight Trigrams）データ
 * 易経の基本構成要素
 */

export interface TrigramData {
  number: number
  binary: string
  symbol: string
  name: {
    chinese: string
    pinyin: string
    english: string
    japanese: string
  }
  nature: string
  attribute: string
  family: string
  image: string
  symbolism: string
}

export const trigrams: TrigramData[] = [
  {
    number: 1,
    binary: '111',
    symbol: '☰',
    name: {
      chinese: '乾',
      pinyin: 'qián',
      english: 'Heaven',
      japanese: '天（てん）',
    },
    nature: '剛健',
    attribute: '健',
    family: '父',
    image: '天',
    symbolism: '創造力、強さ、リーダーシップ、父性',
  },
  {
    number: 2,
    binary: '011',
    symbol: '☱',
    name: {
      chinese: '兌',
      pinyin: 'duì',
      english: 'Lake',
      japanese: '沢（たく）',
    },
    nature: '喜悦',
    attribute: '説',
    family: '少女',
    image: '沢',
    symbolism: '喜び、開放、コミュニケーション、若々しさ',
  },
  {
    number: 3,
    binary: '101',
    symbol: '☲',
    name: {
      chinese: '離',
      pinyin: 'lí',
      english: 'Fire',
      japanese: '火（か）',
    },
    nature: '光明',
    attribute: '麗',
    family: '中女',
    image: '火',
    symbolism: '知性、明晰さ、美、情熱',
  },
  {
    number: 4,
    binary: '001',
    symbol: '☳',
    name: {
      chinese: '震',
      pinyin: 'zhèn',
      english: 'Thunder',
      japanese: '雷（らい）',
    },
    nature: '奮起',
    attribute: '動',
    family: '長男',
    image: '雷',
    symbolism: '行動、衝撃、目覚め、活力',
  },
  {
    number: 5,
    binary: '110',
    symbol: '☴',
    name: {
      chinese: '巽',
      pinyin: 'xùn',
      english: 'Wind',
      japanese: '風（ふう）',
    },
    nature: '柔順',
    attribute: '入',
    family: '長女',
    image: '風',
    symbolism: '浸透、柔軟性、影響力、優しさ',
  },
  {
    number: 6,
    binary: '010',
    symbol: '☵',
    name: {
      chinese: '坎',
      pinyin: 'kǎn',
      english: 'Water',
      japanese: '水（すい）',
    },
    nature: '険難',
    attribute: '陥',
    family: '中男',
    image: '水',
    symbolism: '危険、深さ、流動性、知恵',
  },
  {
    number: 7,
    binary: '100',
    symbol: '☶',
    name: {
      chinese: '艮',
      pinyin: 'gèn',
      english: 'Mountain',
      japanese: '山（さん）',
    },
    nature: '静止',
    attribute: '止',
    family: '少男',
    image: '山',
    symbolism: '静止、安定、瞑想、境界',
  },
  {
    number: 8,
    binary: '000',
    symbol: '☷',
    name: {
      chinese: '坤',
      pinyin: 'kūn',
      english: 'Earth',
      japanese: '地（ち）',
    },
    nature: '柔順',
    attribute: '順',
    family: '母',
    image: '地',
    symbolism: '受容、育成、母性、大地',
  },
]

/**
 * バイナリから八卦を取得
 */
export function getTrigramByBinary(binary: string): TrigramData | undefined {
  return trigrams.find((t) => t.binary === binary)
}

/**
 * 六爻から上卦・下卦を取得
 */
export function getTrigramsFromHexagram(hexagramBinary: string): {
  upper: TrigramData | undefined
  lower: TrigramData | undefined
} {
  const upper = hexagramBinary.slice(0, 3)
  const lower = hexagramBinary.slice(3, 6)

  return {
    upper: getTrigramByBinary(upper),
    lower: getTrigramByBinary(lower),
  }
}
