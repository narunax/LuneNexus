'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { HexagramLines } from '@/components/iching/HexagramLines'
import { getTrigramsFromHexagram } from '@/lib/iching/trigrams'
import { fetchHexagramDataCached } from '@/lib/iching/fetchHexagram'
import type { HexagramJSON, DiagnosisKey } from '@/types/iching-json'
import { GENRE_BUTTONS } from '@/types/iching-json'

interface HexagramResultProps {
  hexagramNumber: number
  changingLines: number[]
  lineValues?: (6 | 7 | 8 | 9)[]
  binary: string
  selectedDiagnosis: DiagnosisKey | null // null = 全方向性表示
}

export function HexagramResult({ hexagramNumber, changingLines, lineValues, binary, selectedDiagnosis }: HexagramResultProps) {
  const [hexagramData, setHexagramData] = useState<HexagramJSON | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const trigrams = getTrigramsFromHexagram(binary)

  useEffect(() => {
    async function loadHexagramData() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchHexagramDataCached(hexagramNumber)
        setHexagramData(data)
      } catch (err) {
        console.error('Failed to load hexagram data:', err)
        setError('卦データの読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }

    loadHexagramData()
  }, [hexagramNumber])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-champagne-300 text-lg">卦データを読み込み中...</div>
      </div>
    )
  }

  if (error || !hexagramData) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-negative text-lg">{error || 'データが見つかりません'}</div>
      </div>
    )
  }

  // 表示する診断の方向性を決定
  const diagnosisKeys: DiagnosisKey[] = selectedDiagnosis
    ? [selectedDiagnosis]
    : ['time_and_mandate', 'virtue_and_conduct', 'contemplation_and_cultivation', 'field_and_foundation']

  return (
    <div className="space-y-8">
      {/* 卦の基本情報 */}
      <div className="mb-8">
        {/* 卦名と線図 */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          {/* 左列：卦名情報 */}
          <div className="flex justify-center items-center">
            <div className="text-left">
              <div className="mb-4">
                <span className="inline-block px-6 py-2 bg-champagne-500/20 text-champagne-300 rounded-full text-base font-display border border-champagne-400/30">
                  第{hexagramData.id}卦
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl text-champagne-300 mb-2 drop-shadow-lg leading-tight">
                {hexagramData.kanji}
              </h2>
              <p className="text-sm md:text-base text-midnight-200 font-body mb-3">
                ({hexagramData.reading})
              </p>
              <p className="text-2xl md:text-3xl text-champagne-300 font-display mb-3">
                {hexagramData.gua_name}
              </p>
              <p className="text-xl md:text-2xl text-gray-300 font-display italic">
                {hexagramData.english_title}
              </p>
            </div>
          </div>

          {/* 中央：縦の区切りライン */}
          <div className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-champagne-500/30 to-transparent"></div>

          {/* 右列：爻の視覚表示 */}
          <div className="flex justify-center items-center">
            <HexagramLines
              binary={binary}
              changingLines={changingLines}
              lineValues={lineValues}
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* 卦辞・中心概念 */}
      <div className="w-full p-6 glass rounded-xl">
        <h4 className="text-center text-sm font-display text-champagne-400 mb-4 uppercase tracking-wide">卦辞</h4>
        <p className="text-center text-lg md:text-xl text-text-primary font-display italic leading-relaxed mb-4">
          {hexagramData.oracle_text}
        </p>
        <div className="border-t border-midnight-400/30 pt-4">
          <p className="text-center text-base md:text-lg text-text-secondary font-body leading-relaxed">
            {hexagramData.core_description}
          </p>
        </div>
      </div>

      {/* 診断結果 */}
      <div className="w-full space-y-6">
        {diagnosisKeys.map((key) => {
          const diagnosis = hexagramData.diagnoses[key]
          const genreButton = GENRE_BUTTONS.find(g => g.key === key)

          return (
            <div key={key} className="space-y-4">
              {/* 方向性が複数ある場合はセクション見出しを表示 */}
              {diagnosisKeys.length > 1 && genreButton && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{genreButton.icon}</div>
                  <h3 className="text-xl font-heading text-champagne-300">{genreButton.label}</h3>
                </div>
              )}

              {/* 状況 */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-champagne-300">状況</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary leading-relaxed">{diagnosis.situation}</p>
                </CardContent>
              </Card>

              {/* アドバイス */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-champagne-300">アドバイス</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary leading-relaxed">{diagnosis.advice}</p>
                </CardContent>
              </Card>

              {/* 警告 */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-negative">注意点</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary leading-relaxed">{diagnosis.warning}</p>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      {/* インスピレーション */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-champagne-300">インスピレーション</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* キーワード */}
            <div>
              <div className="text-sm text-champagne-400 mb-2 font-heading">キーワード</div>
              <div className="flex flex-wrap gap-2">
                {hexagramData.inspiration.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-midnight-500/30 border border-champagne-400/20 text-text-secondary text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* シンボル */}
            <div>
              <div className="text-sm text-champagne-400 mb-2 font-heading">シンボル</div>
              <div className="flex flex-wrap gap-2">
                {hexagramData.inspiration.symbols.map((symbol, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-400/30 text-champagne-200 text-sm"
                  >
                    {symbol}
                  </span>
                ))}
              </div>
            </div>

            {/* 学術的ノート */}
            {hexagramData.inspiration.academic_note && (
              <div className="mt-4 pt-4 border-t border-midnight-400/20">
                <p className="text-sm text-gray-400 italic">
                  {hexagramData.inspiration.academic_note}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 上卦・下卦の構成（八卦画像付き） */}
      <div className="w-full glass rounded-xl p-6">
        <h4 className="text-center text-lg font-heading text-champagne-300 mb-6">卦の構成</h4>
        <div className="grid md:grid-cols-2 gap-8">
          {/* 上卦 */}
          <div className="border-b md:border-b-0 md:border-r border-midnight-400/20 pb-6 md:pb-0 md:pr-6">
            <div className="text-center mb-4">
              {/* 八卦画像 */}
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-champagne-400/30">
                {trigrams.upper?.imagePath ? (
                  <img
                    src={trigrams.upper.imagePath}
                    alt={trigrams.upper.name.japanese}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-champagne-500/20 to-midnight-500/20 flex items-center justify-center">
                    <div className="text-4xl">{trigrams.upper?.symbol}</div>
                  </div>
                )}
              </div>
              <div className="text-sm text-champagne-300 font-heading mb-1">上卦</div>
              <div className="text-2xl text-midnight-200 font-bold mb-1">
                {hexagramData.trigrams.upper.name}
              </div>
              <div className="text-sm text-gray-400 mb-3">
                {hexagramData.trigrams.upper.nature} / {hexagramData.trigrams.upper.element}
              </div>
            </div>

            {/* 詳細情報 */}
            <div className="text-sm text-midnight-200 leading-relaxed">
              {[
                hexagramData.trigrams.upper.direction,
                hexagramData.trigrams.upper.season,
                hexagramData.trigrams.upper.animal,
                hexagramData.trigrams.upper.body_part,
                ...hexagramData.trigrams.upper.attributes
              ].filter(Boolean).join(' | ')}
            </div>
          </div>

          {/* 下卦 */}
          <div className="md:pl-6">
            <div className="text-center mb-4">
              {/* 八卦画像 */}
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-champagne-400/30">
                {trigrams.lower?.imagePath ? (
                  <img
                    src={trigrams.lower.imagePath}
                    alt={trigrams.lower.name.japanese}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-champagne-500/20 to-midnight-500/20 flex items-center justify-center">
                    <div className="text-4xl">{trigrams.lower?.symbol}</div>
                  </div>
                )}
              </div>
              <div className="text-sm text-champagne-300 font-heading mb-1">下卦</div>
              <div className="text-2xl text-midnight-200 font-bold mb-1">
                {hexagramData.trigrams.lower.name}
              </div>
              <div className="text-sm text-gray-400 mb-3">
                {hexagramData.trigrams.lower.nature} / {hexagramData.trigrams.lower.element}
              </div>
            </div>

            {/* 詳細情報 */}
            <div className="text-sm text-midnight-200 leading-relaxed">
              {[
                hexagramData.trigrams.lower.direction,
                hexagramData.trigrams.lower.season,
                hexagramData.trigrams.lower.animal,
                hexagramData.trigrams.lower.body_part,
                ...hexagramData.trigrams.lower.attributes
              ].filter(Boolean).join(' | ')}
            </div>
          </div>
        </div>
      </div>

      {/* 爻の解釈（変爻がある場合のみ表示） */}
      {changingLines.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-center text-lg font-heading text-champagne-300 mb-4">変爻の解釈</h4>
          {changingLines.map((lineNum) => {
            const lineData = hexagramData.lines[lineNum - 1] // 1-indexed to 0-indexed
            if (!lineData) return null

            return (
              <Card key={lineNum} variant="floating">
                <CardHeader>
                  <CardTitle className="text-champagne-300">{lineData.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-xs text-champagne-400 mb-1">卦辞</div>
                    <p className="text-text-primary font-display italic">{lineData.meaning}</p>
                  </div>
                  <div>
                    <div className="text-xs text-champagne-400 mb-1">解釈</div>
                    <p className="text-text-secondary">{lineData.advice}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
