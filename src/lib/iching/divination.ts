/**
 * I Ching Divination Methods
 * 易経占い実装
 */

/**
 * コイン投げ法
 * 3枚のコインを6回投げて卦を立てる
 */
export function coinMethod(): {
  lines: number[]
  hexagramNumber: number
  changingLines: number[]
} {
  const lines: number[] = []
  const changingLines: number[] = []

  for (let i = 0; i < 6; i++) {
    // 3枚のコインを投げる（表=3、裏=2）
    const coin1 = Math.random() < 0.5 ? 3 : 2
    const coin2 = Math.random() < 0.5 ? 3 : 2
    const coin3 = Math.random() < 0.5 ? 3 : 2
    const sum = coin1 + coin2 + coin3

    // 6: 老陰（変爻の陰）、7: 少陽、8: 少陰、9: 老陽（変爻の陽）
    if (sum === 6) {
      lines.push(0) // 陰爻
      changingLines.push(i + 1) // 変爻
    } else if (sum === 7) {
      lines.push(1) // 陽爻
    } else if (sum === 8) {
      lines.push(0) // 陰爻
    } else if (sum === 9) {
      lines.push(1) // 陽爻
      changingLines.push(i + 1) // 変爻
    }
  }

  // バイナリから卦番号を計算
  const binary = lines.join('')
  const hexagramNumber = binaryToHexagramNumber(binary)

  return {
    lines,
    hexagramNumber,
    changingLines,
  }
}

/**
 * ランダム法
 * シンプルにランダムな卦を生成
 */
export function randomMethod(): {
  lines: number[]
  hexagramNumber: number
  changingLines: number[]
} {
  const lines: number[] = []

  for (let i = 0; i < 6; i++) {
    lines.push(Math.random() < 0.5 ? 0 : 1)
  }

  const binary = lines.join('')
  const hexagramNumber = binaryToHexagramNumber(binary)

  return {
    lines,
    hexagramNumber,
    changingLines: [],
  }
}

/**
 * バイナリから卦番号に変換
 * 六爻のバイナリから64卦の番号を得る
 */
function binaryToHexagramNumber(binary: string): number {
  // バイナリを数値に変換（0-63の範囲）
  const decimal = parseInt(binary, 2)

  // 1-64の範囲に変換（易経の卦番号は1から始まる）
  return (decimal % 64) + 1
}

/**
 * 変爻を適用して之卦を取得
 */
export function getChangingHexagram(
  originalLines: number[],
  changingLinePositions: number[]
): number[] {
  const newLines = [...originalLines]

  changingLinePositions.forEach((pos) => {
    const index = pos - 1
    newLines[index] = newLines[index] === 0 ? 1 : 0
  })

  return newLines
}

/**
 * 爻（line）の説明を取得
 */
export function getLineDescription(
  position: number,
  isYang: boolean,
  isChanging: boolean
): string {
  const lineType = isChanging
    ? isYang
      ? '老陽（変爻）'
      : '老陰（変爻）'
    : isYang
    ? '少陽'
    : '少陰'

  return `第${position}爻: ${lineType}`
}
