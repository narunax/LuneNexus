export interface Trigram {
  number: number
  symbol: string
  binary: string
  name: {
    chinese: string
    pinyin?: string
    english: string
    japanese: string
  }
  element?: string
  nature: string
  attribute?: string
  family: string
  body?: string
  animal?: string
  image?: string
  symbolism?: string
}

export interface HexagramLine {
  position: number
  text: string
  meaning: string
}

export interface Hexagram {
  number: number
  unicode: string
  binary: string
  name: {
    chinese: string
    pinyin: string
    english: string
    japanese: string
  }
  trigrams: {
    upper: { name: string; element: string }
    lower: { name: string; element: string }
  }
  judgment: string
  interpretation: {
    general: string
    advice: string
    warning: string
    keywords: string[]
  }
  lines?: HexagramLine[]
}

export interface IChingInput {
  method: 'coins' | 'yarrow' | 'random'
  question?: string
  context?: string
}

export interface IChingResult {
  primary: Hexagram
  changing?: Hexagram
  changingLines: number[]
  interpretation: {
    situation: string
    advice: string
    warning?: string
    timeline?: string
  }
  reading: {
    question: string
    context: string
    method: string
    timestamp: string
  }
}
