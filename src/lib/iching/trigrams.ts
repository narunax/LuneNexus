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
  imagePath?: string      // 八卦画像パス
  symbolism: string
  // 追加情報
  direction?: string        // 方位
  season?: string          // 季節
  time?: string           // 時間
  color?: string          // 色
  bodyPart?: string       // 身体部位
  animal?: string         // 動物
  virtue?: string         // 徳性
  element?: string        // 五行
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
    imagePath: '/images/trigram/trigram-qian.png',
    symbolism: '創造力、強さ、リーダーシップ、父性',
    direction: '南（または北西）',
    season: '初冬',
    time: '夜半から早朝',
    color: '金色、白',
    bodyPart: '頭',
    animal: '馬、龍',
    virtue: '剛健不息',
    element: '金',
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
    imagePath: '/images/trigram/trigram-dui.png',
    symbolism: '喜び、開放、コミュニケーション、若々しさ',
    direction: '西',
    season: '秋',
    time: '収穫の時',
    color: '白',
    bodyPart: '口、舌',
    animal: '羊',
    virtue: '喜悦和説',
    element: '金',
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
    imagePath: '/images/trigram/trigram-li.png',
    symbolism: '知性、明晰さ、美、情熱',
    direction: '南',
    season: '夏',
    time: '正午',
    color: '赤、紫',
    bodyPart: '目、心臓',
    animal: '雉、孔雀',
    virtue: '光明麗正',
    element: '火',
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
    imagePath: '/images/trigram/trigram-zhen.png',
    symbolism: '行動、衝撃、目覚め、活力',
    direction: '東',
    season: '春',
    time: '日の出',
    color: '青、緑',
    bodyPart: '足',
    animal: '龍（若い）',
    virtue: '奮発動震',
    element: '木',
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
    imagePath: '/images/trigram/trigram-xun.png',
    symbolism: '浸透、柔軟性、影響力、優しさ',
    direction: '東南',
    season: '初夏',
    time: '朝',
    color: '緑',
    bodyPart: '股、呼吸器',
    animal: '鶏',
    virtue: '柔順謙入',
    element: '木',
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
    imagePath: '/images/trigram/trigram-kan.png',
    symbolism: '危険、深さ、流動性、知恵',
    direction: '北',
    season: '冬',
    time: '真夜中',
    color: '黒、紺',
    bodyPart: '耳、腎臓',
    animal: '豚',
    virtue: '険陥智謀',
    element: '水',
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
    imagePath: '/images/trigram/trigram-gen.png',
    symbolism: '静止、安定、瞑想、境界',
    direction: '北東',
    season: '晩冬から早春',
    time: '夜明け前',
    color: '黄',
    bodyPart: '手、背中',
    animal: '犬',
    virtue: '静止安定',
    element: '土',
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
    imagePath: '/images/trigram/trigram-kun.png',
    symbolism: '受容、育成、母性、大地',
    direction: '南西',
    season: '晩夏',
    time: '午後',
    color: '黄、茶',
    bodyPart: '腹',
    animal: '牛',
    virtue: '柔順厚載',
    element: '土',
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
