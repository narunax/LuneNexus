export interface NumberResult {
  value: number
  isMaster: boolean
  hasKarmicDebt: boolean
  karmicNumber?: number
  interpretation: {
    title: string
    description: string
    keywords: string[]
    positiveTraits: string[]
    negativeTraits: string[]
    advice: string
  }
}

export interface KabbalahInput {
  birthDate: string // YYYY-MM-DD
  fullName: string
  language: 'ja' | 'en'
  romanizedName?: string
}

export interface KabbalahResult {
  coreNumbers: {
    lifePath: NumberResult
    expression: NumberResult
    soulUrge: NumberResult
    personality: NumberResult
    birthday: NumberResult
  }
  summary: {
    strengths: string[]
    challenges: string[]
    purpose: string
    advice: string
  }
}
