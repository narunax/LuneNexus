import type { HexagramJSON } from '@/types/iching-json'

/**
 * JSONファイルから卦データを動的にフェッチ
 * @param id 卦番号 (1-64)
 * @returns HexagramJSON
 */
export async function fetchHexagramData(id: number): Promise<HexagramJSON> {
  if (id < 1 || id > 64) {
    throw new Error(`Invalid hexagram ID: ${id}. Must be between 1 and 64.`)
  }

  const paddedId = String(id).padStart(2, '0')
  const path = `/data/iching/hexagram_${paddedId}.json`

  try {
    const response = await fetch(path)

    if (!response.ok) {
      throw new Error(`Failed to fetch hexagram data: ${response.status} ${response.statusText}`)
    }

    const data: HexagramJSON = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching hexagram ${id}:`, error)
    throw error
  }
}

/**
 * クライアントサイドでのキャッシュ対応フェッチ（オプション）
 */
const hexagramCache = new Map<number, HexagramJSON>()

export async function fetchHexagramDataCached(id: number): Promise<HexagramJSON> {
  if (hexagramCache.has(id)) {
    return hexagramCache.get(id)!
  }

  const data = await fetchHexagramData(id)
  hexagramCache.set(id, data)
  return data
}
