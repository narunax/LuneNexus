/**
 * Kabbalah Numerology Calculator
 * 本格的なカバラ数秘術計算エンジン
 */

// マスターナンバー
const MASTER_NUMBERS = [11, 22, 33]

// カルミックデットナンバー
const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19]

/**
 * 数字を単一桁に還元する（マスターナンバーは保持）
 */
export function reduceToSingleDigit(num: number): number {
  while (num > 9 && !MASTER_NUMBERS.includes(num)) {
    num = sumDigits(num)
  }
  return num
}

/**
 * 数値の各桁を合計する
 */
export function sumDigits(num: number): number {
  return num
    .toString()
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0)
}

/**
 * マスターナンバーかどうかを判定
 */
export function isMasterNumber(num: number): boolean {
  return MASTER_NUMBERS.includes(num)
}

/**
 * カルミックデットナンバーかどうかを判定
 */
export function hasKarmicDebt(num: number): boolean {
  return KARMIC_DEBT_NUMBERS.includes(num)
}

/**
 * ライフパスナンバーを計算
 */
export function calculateLifePath(birthDate: string): number {
  const date = new Date(birthDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // 各要素を還元
  const yearReduced = reduceToSingleDigit(year)
  const monthReduced = reduceToSingleDigit(month)
  const dayReduced = reduceToSingleDigit(day)

  // 合計して最終的に還元
  const total = yearReduced + monthReduced + dayReduced
  return reduceToSingleDigit(total)
}

/**
 * 文字を数値に変換（ピタゴラス方式）
 */
export function letterToNumber(letter: string): number {
  const chart: { [key: string]: number } = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  }

  return chart[letter.toUpperCase()] || 0
}

/**
 * 名前から数値を計算
 */
export function calculateNameNumber(name: string): number {
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase()
  const sum = cleanName
    .split('')
    .reduce((total, letter) => total + letterToNumber(letter), 0)

  return reduceToSingleDigit(sum)
}

/**
 * 母音のみから計算（ソウルナンバー）
 */
export function calculateSoulUrge(name: string): number {
  const vowels = 'AEIOU'
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase()
  const sum = cleanName
    .split('')
    .filter(letter => vowels.includes(letter))
    .reduce((total, letter) => total + letterToNumber(letter), 0)

  return reduceToSingleDigit(sum)
}

/**
 * 子音のみから計算（パーソナリティナンバー）
 */
export function calculatePersonality(name: string): number {
  const vowels = 'AEIOU'
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase()
  const sum = cleanName
    .split('')
    .filter(letter => !vowels.includes(letter))
    .reduce((total, letter) => total + letterToNumber(letter), 0)

  return reduceToSingleDigit(sum)
}

/**
 * バースデーナンバーを計算
 */
export function calculateBirthday(birthDate: string): number {
  const date = new Date(birthDate)
  const day = date.getDate()
  return reduceToSingleDigit(day)
}

/**
 * エクスプレッションナンバーを計算（名前全体）
 */
export function calculateExpression(name: string): number {
  return calculateNameNumber(name)
}
