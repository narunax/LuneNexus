'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CircleDot, HelpCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { TaijiIcon } from '@/components/icons/TaijiIcon'
import { HexagramLines } from '@/components/iching/HexagramLines'
import { coinMethod, randomMethod } from '@/lib/iching/divination'
import { getHexagram, getHexagramByBinary } from '@/lib/iching/hexagrams'
import { getTrigramsFromHexagram } from '@/lib/iching/trigrams'
import type { Hexagram } from '@/types/iching'

type DivinationStep = 'question' | 'casting' | 'manual-input' | 'result'
type LineValue = 6 | 7 | 8 | 9 | null

export default function IChingPage() {
  const [step, setStep] = useState<DivinationStep>('question')
  const [question, setQuestion] = useState('')
  const [method, setMethod] = useState<'coins' | 'random'>('coins')
  const [primaryHexagram, setPrimaryHexagram] = useState<Hexagram | null>(null)
  const [changingLines, setChangingLines] = useState<number[]>([])
  const [isCasting, setIsCasting] = useState(false)

  // 手動入力用の状態
  const [manualLines, setManualLines] = useState<LineValue[]>([null, null, null, null, null, null])
  // 結果表示用の6-9の値を保持
  const [resultLineValues, setResultLineValues] = useState<(6 | 7 | 8 | 9)[] | undefined>(undefined)

  const handleStartDivination = () => {
    if (question.trim() && method === 'random') {
      handleCast()
    } else if (question.trim() && method === 'coins') {
      setStep('manual-input')
    }
  }

  const handleCast = async () => {
    setStep('casting')
    setIsCasting(true)

    // アニメーション用のディレイ
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const result = randomMethod()
    const hexagram = getHexagram(result.hexagramNumber)

    if (hexagram) {
      setPrimaryHexagram(hexagram)
      setChangingLines(result.changingLines)
      setStep('result')
    }

    setIsCasting(false)
  }

  const handleManualLineSelect = (lineIndex: number, value: LineValue) => {
    const newLines = [...manualLines]
    newLines[lineIndex] = value
    setManualLines(newLines)
  }

  const handleManualComplete = () => {
    // 6-9の値を陰陽のバイナリに変換
    // 6: 老陰(変爻) → 0, 7: 少陽 → 1, 8: 少陰 → 0, 9: 老陽(変爻) → 1
    // manualLines[0] = 初爻（下）, manualLines[5] = 上爻（上）
    // binaryは上から下の順なので反転が必要
    const binary = manualLines
      .map(v => {
        if (v === 7 || v === 9) return '1' // 陽
        return '0' // 陰
      })
      .reverse() // 下から上 → 上から下に反転
      .join('')

    const changing: number[] = []
    manualLines.forEach((v, i) => {
      if (v === 6 || v === 9) {
        changing.push(i + 1) // 1-indexed (1=初爻)
      }
    })

    // バイナリから卦を検索
    const hexagram = getHexagramByBinary(binary)

    if (hexagram) {
      setPrimaryHexagram(hexagram)
      setChangingLines(changing)
      // 6-9の値を結果表示用に保存（下から上の順、そのまま）
      const validLines = manualLines.filter((v): v is 6 | 7 | 8 | 9 => v !== null)
      setResultLineValues(validLines)
      setStep('result')
    }
  }

  const handleReset = () => {
    setStep('question')
    setQuestion('')
    setPrimaryHexagram(null)
    setChangingLines([])
    setManualLines([null, null, null, null, null, null])
    setResultLineValues(undefined)
  }

  const isManualInputComplete = manualLines.every(v => v !== null)

  const HexagramDisplay: React.FC<{
    hexagram: Hexagram
    lineValues?: (6 | 7 | 8 | 9)[]
    showComposition?: boolean
    className?: string
  }> = ({
    hexagram,
    lineValues,
    showComposition = true,
    className,
  }) => {
    const trigrams = getTrigramsFromHexagram(hexagram.binary)

    return (
      <div className={`${className}`}>
        {/* 卦の基本情報 - 2列レイアウト */}
        <div className="mb-8">
          {/* 卦のイメージ画像スペース（16:9） */}
          <div className="w-full max-w-4xl mx-auto mb-6 aspect-video bg-gradient-to-br from-midnight-500/20 to-champagne-500/20 rounded-xl border-2 border-midnight-400/30 flex items-center justify-center">
            <span className="text-midnight-300/50 text-sm font-heading">
              卦イメージ画像 (推奨: 1920x1080px, 16:9)
            </span>
          </div>

          {/* 卦名と線図 - 2列レイアウト */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            {/* 左列：卦名情報 */}
            <div className="flex justify-center items-center">
              <div className="text-left">
                <div className="mb-4">
                  <span className="inline-block px-6 py-2 bg-champagne-500/20 text-champagne-300 rounded-full text-base font-display border border-champagne-400/30">
                    第{hexagram.number}卦
                  </span>
                </div>
                {(() => {
                  // 日本語名をパース: "沢山咸(たくざんかん)" -> ["沢山咸", "たくざんかん"]
                  const match = hexagram.name.japanese.match(/^(.+?)\((.+?)\)$/)
                  const fullName = match ? match[1] : hexagram.name.japanese
                  const reading = match ? match[2] : ''

                  return (
                    <>
                      <h2 className="font-display text-4xl md:text-6xl text-champagne-300 mb-2 drop-shadow-lg leading-tight">
                        {fullName}
                      </h2>
                      {reading && (
                        <p className="text-sm md:text-base text-midnight-200 font-body mb-3">
                          ({reading})
                        </p>
                      )}
                      <p className="text-2xl md:text-3xl text-champagne-300 font-display mb-3">
                        {hexagram.name.chinese}
                      </p>
                    </>
                  )
                })()}
                <p className="text-xl md:text-2xl text-gray-300 font-display italic">
                  {hexagram.name.english}
                </p>
              </div>
            </div>

            {/* 中央：縦の区切りライン */}
            <div className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-champagne-500/30 to-transparent"></div>

            {/* 右列：爻の視覚表示 */}
            <div className="flex justify-center items-center">
              <HexagramLines
                binary={hexagram.binary}
                changingLines={changingLines}
                lineValues={lineValues}
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* 卦辞 - 2列の下、大きめに表示 */}
        <div className="w-full p-6 glass rounded-xl">
          <h4 className="text-center text-sm font-display text-champagne-400 mb-4 uppercase tracking-wide">卦辞</h4>
          <p className="text-center text-lg md:text-xl text-text-primary font-display italic leading-relaxed mb-4">
            {hexagram.judgment}
          </p>
          {hexagram.judgmentReading && (
            <p className="text-center text-base md:text-lg text-midnight-200 font-body leading-relaxed mb-4">
              {hexagram.judgmentReading}
            </p>
          )}
          <div className="border-t border-midnight-400/30 pt-4">
            <p className="text-center text-base md:text-lg text-text-secondary font-body leading-relaxed">
              {hexagram.interpretation.general}
            </p>
          </div>
        </div>

        {/* 上卦・下卦の構成 */}
        {showComposition && (
        <div className="w-full glass rounded-xl p-6 mt-8">
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
                  {trigrams.upper?.name.japanese}
                </div>
                <div className="text-sm text-gray-400 mb-3">
                  {trigrams.upper?.name.chinese} ({trigrams.upper?.name.english})
                </div>
              </div>

              {/* 詳細情報 - シンプルな羅列形式 */}
              <div className="text-sm text-midnight-200 leading-relaxed">
                {[
                  trigrams.upper?.nature,
                  trigrams.upper?.attribute,
                  trigrams.upper?.element,
                  trigrams.upper?.direction,
                  trigrams.upper?.season,
                  trigrams.upper?.time,
                  trigrams.upper?.color,
                  trigrams.upper?.family,
                  trigrams.upper?.bodyPart,
                  trigrams.upper?.animal,
                  trigrams.upper?.virtue,
                ].filter(Boolean).join(' | ')}
              </div>
              <div className="mt-3 text-sm text-gray-300 italic border-t border-midnight-400/20 pt-3">
                {trigrams.upper?.symbolism}
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
                  {trigrams.lower?.name.japanese}
                </div>
                <div className="text-sm text-gray-400 mb-3">
                  {trigrams.lower?.name.chinese} ({trigrams.lower?.name.english})
                </div>
              </div>

              {/* 詳細情報 - シンプルな羅列形式 */}
              <div className="text-sm text-midnight-200 leading-relaxed">
                {[
                  trigrams.lower?.nature,
                  trigrams.lower?.attribute,
                  trigrams.lower?.element,
                  trigrams.lower?.direction,
                  trigrams.lower?.season,
                  trigrams.lower?.time,
                  trigrams.lower?.color,
                  trigrams.lower?.family,
                  trigrams.lower?.bodyPart,
                  trigrams.lower?.animal,
                  trigrams.lower?.virtue,
                ].filter(Boolean).join(' | ')}
              </div>
              <div className="mt-3 text-sm text-gray-300 italic border-t border-midnight-400/20 pt-3">
                {trigrams.lower?.symbolism}
              </div>
            </div>
          </div>

          {/* 卦の成り立ち・総合解釈 */}
          <div className="mt-6 pt-6 border-t border-midnight-400/30">
            <h5 className="text-base font-heading text-champagne-400 mb-3 flex items-center gap-2">
              <span className="text-lg">🔮</span>
              卦の成り立ちと意味
            </h5>
            <div className="text-sm text-gray-200 leading-relaxed space-y-2">
              <p>
                <span className="text-champagne-300 font-semibold">上卦の{trigrams.upper?.name.japanese}</span>
                （{trigrams.upper?.name.chinese}）は<span className="text-midnight-200">{trigrams.upper?.nature}</span>を表し、
                <span className="text-champagne-300 font-semibold">下卦の{trigrams.lower?.name.japanese}</span>
                （{trigrams.lower?.name.chinese}）は<span className="text-midnight-200">{trigrams.lower?.nature}</span>を象徴します。
              </p>
              <p className="text-gray-300">
                この組み合わせから、{hexagram.name.japanese}（{hexagram.name.chinese}）という卦が成り立ち、
                「{hexagram.name.english}」という本質を示しています。
                {trigrams.upper?.attribute && trigrams.lower?.attribute && (
                  <>上の{trigrams.upper.attribute}と下の{trigrams.lower.attribute}が重なることで、この卦独自の意味が生まれます。</>
                )}
              </p>
            </div>
          </div>
        </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TaijiIcon size={32} />
            <h1 className="font-display text-4xl md:text-6xl gradient-text">易経</h1>
            <TaijiIcon size={32} />
          </div>
          <p className="text-xl text-text-secondary">
            64卦が示す宇宙の真理。あなたの問いに答えます
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: 統合された問いと方法選択ページ */}
          {step === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="floating" glow>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-6 h-6" />
                    あなたの問いと占い方法
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* 質問入力 */}
                    <Textarea
                      label="質問"
                      rows={4}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="心に問いかけたいことを入力してください..."
                    />
                    <div className="flex flex-wrap gap-2">
                      {['仕事', '恋愛', '健康', '人間関係', '決断', '成長'].map(
                        (tag) => (
                          <button
                            key={tag}
                            onClick={() => setQuestion(`${tag}について: `)}
                            className="px-3 py-1 text-sm bg-bg-secondary border border-midnight-400/40 rounded-full hover:border-champagne-400 transition-colors"
                          >
                            {tag}
                          </button>
                        )
                      )}
                    </div>

                    {/* 占い方法選択 */}
                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-lg font-heading text-champagne-400 mb-4">占い方法を選択</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setMethod('coins')}
                          className={`p-5 rounded-xl border-2 transition-all ${
                            method === 'coins'
                              ? 'border-champagne-400 bg-champagne-400/10'
                              : 'border-midnight-400/40 glass'
                          }`}
                        >
                          <CircleDot className="w-10 h-10 mx-auto mb-3 text-champagne-400" />
                          <h3 className="font-heading text-lg mb-1">硬貨投げ(手動)</h3>
                          <p className="text-sm text-text-secondary">
                            6回の硬貨投げの結果を手動で入力
                          </p>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setMethod('random')}
                          className={`p-5 rounded-xl border-2 transition-all ${
                            method === 'random'
                              ? 'border-champagne-400 bg-champagne-400/10'
                              : 'border-midnight-400/40 glass'
                          }`}
                        >
                          <TaijiIcon size={40} className="mx-auto mb-3 text-midnight-300" />
                          <h3 className="font-heading text-lg mb-1">直感法</h3>
                          <p className="text-sm text-text-secondary">
                            直感的にランダムな卦を得る
                          </p>
                        </motion.button>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleStartDivination}
                      disabled={!question.trim()}
                      className="w-full"
                    >
                      <TaijiIcon size={20} />
                      占いを始める
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: 手動入力ページ */}
          {step === 'manual-input' && (
            <motion.div
              key="manual-input"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="floating" glow>
                <CardHeader>
                  <CardTitle>硬貨投げの結果を入力</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-sm text-text-secondary text-center mb-6">
                      下から順に、各爻の値(6-9)を選択してください
                    </p>

                    {/* 爻の入力(下から上へ) */}
                    <div className="space-y-4">
                      {[5, 4, 3, 2, 1, 0].map((lineIndex) => (
                        <div key={lineIndex} className="flex items-center gap-4">
                          <div className="w-16 text-sm text-text-secondary">
                            第{lineIndex + 1}爻
                          </div>

                          {/* 爻の視覚表示 */}
                          <div className="flex-1 h-12 flex items-center justify-center">
                            {manualLines[lineIndex] === null ? (
                              <div className="w-full h-1 bg-white/10" />
                            ) : manualLines[lineIndex] === 6 || manualLines[lineIndex] === 8 ? (
                              // 陰爻(二本線) - midnight系
                              <div className="w-full flex gap-6">
                                <div className="flex-1 h-4 bg-midnight-400" />
                                <div className="flex-1 h-4 bg-midnight-400" />
                              </div>
                            ) : (
                              // 陽爻(一本線) - ピンク系
                              <div className="w-full h-4 bg-champagne-300" />
                            )}
                          </div>

                          {/* 値選択ボタン */}
                          <div className="flex gap-2">
                            {[6, 7, 8, 9].map((value) => (
                              <button
                                key={value}
                                onClick={() => handleManualLineSelect(lineIndex, value as LineValue)}
                                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                                  manualLines[lineIndex] === value
                                    ? 'border-champagne-400 bg-champagne-400/20 text-champagne-300'
                                    : 'border-midnight-400/40 text-text-secondary hover:border-champagne-400/50'
                                }`}
                              >
                                {value}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-text-secondary bg-bg-secondary/50 p-4 rounded-lg">
                      <p className="mb-2"><strong>参考:</strong></p>
                      <p>• 6 = 老陰(変爻) - 陰爻で変化する</p>
                      <p>• 7 = 少陽 - 陽爻で変化しない</p>
                      <p>• 8 = 少陰 - 陰爻で変化しない</p>
                      <p>• 9 = 老陽(変爻) - 陽爻で変化する</p>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="ghost"
                        onClick={() => setStep('question')}
                        className="flex-1"
                      >
                        戻る
                      </Button>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleManualComplete}
                        disabled={!isManualInputComplete}
                        className="flex-1"
                      >
                        卦を立てる
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Casting Animation */}
          {step === 'casting' && (
            <motion.div
              key="casting"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center min-h-[400px]"
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-32 h-32 mx-auto mb-8 border-4 border-champagne-400 rounded-full flex items-center justify-center"
                >
                  <TaijiIcon size={64} className="text-champagne-400" />
                </motion.div>
                <p className="font-heading text-2xl text-champagne-400">
                  卦を立てています...
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 4: Result */}
          {step === 'result' && primaryHexagram && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Question Display */}
              <Card variant="glass">
                <CardContent className="py-4">
                  <p className="text-sm text-text-secondary mb-1">あなたの問い:</p>
                  <p className="text-lg text-text-primary italic">「{question}」</p>
                </CardContent>
              </Card>

              {/* Hexagram Display - 卦名と線図のみ */}
              <Card variant="floating" glow>
                <CardContent className="py-8">
                  <HexagramDisplay hexagram={primaryHexagram} lineValues={resultLineValues} showComposition={false} />
                </CardContent>
              </Card>

              {/* Interpretation - 項目名を視覚的に強調 */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>解釈</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-l-4 border-champagne-400 pl-4 bg-champagne-400/5 py-3 rounded-r">
                      <h3 className="text-lg font-heading text-champagne-400 mb-2 flex items-center gap-2">
                        <span className="text-xl">📊</span>
                        状況
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {primaryHexagram.interpretation.general}
                      </p>
                    </div>
                    <div className="border-l-4 border-positive pl-4 bg-positive/5 py-3 rounded-r">
                      <h3 className="text-lg font-heading text-positive mb-2 flex items-center gap-2">
                        <span className="text-xl">💡</span>
                        アドバイス
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {primaryHexagram.interpretation.advice}
                      </p>
                    </div>
                    {primaryHexagram.interpretation.warning && (
                      <div className="border-l-4 border-negative pl-4 bg-negative/5 py-3 rounded-r">
                        <h3 className="text-lg font-heading text-negative mb-2 flex items-center gap-2">
                          <span className="text-xl">⚠️</span>
                          警告
                        </h3>
                        <p className="text-text-secondary leading-relaxed">
                          {primaryHexagram.interpretation.warning}
                        </p>
                      </div>
                    )}
                    <div className="border-l-4 border-midnight-400 pl-4 bg-midnight-500/10 py-4 rounded-r">
                      <h3 className="text-xl font-heading text-midnight-300 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🔑</span>
                        キーワードとインスピレーション
                      </h3>
                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        これらのキーワードは、卦の本質を多角的に示しています。直感的に響く言葉に注目し、あなたの状況と照らし合わせて解釈を深めてください。
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {primaryHexagram.interpretation.keywords.map(
                          (keyword, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="px-4 py-2 text-sm bg-gradient-to-r from-midnight-500/20 to-champagne-500/20 text-champagne-200 rounded-full border border-midnight-400/40 hover:border-champagne-400/60 hover:shadow-lg hover:shadow-champagne-500/20 transition-all cursor-default"
                            >
                              {keyword}
                            </motion.span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 卦の構成 - 解釈の後に表示 */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>卦の構成</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const trigrams = getTrigramsFromHexagram(primaryHexagram.binary)
                    return (
                      <>
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* 上卦 */}
                          <div className="border-b md:border-b-0 md:border-r border-midnight-400/20 pb-6 md:pb-0 md:pr-6">
                            <div className="text-center mb-4">
                              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-champagne-500/20 to-midnight-500/20 rounded-lg border-2 border-champagne-400/30 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-4xl mb-1">{trigrams.upper?.symbol}</div>
                                  <span className="text-champagne-300/50 text-xs">八卦画像<br/>(512x512px)</span>
                                </div>
                              </div>
                              <div className="text-sm text-champagne-300 font-heading mb-1">上卦</div>
                              <div className="text-2xl text-midnight-200 font-bold mb-1">
                                {trigrams.upper?.name.japanese}
                              </div>
                              <div className="text-sm text-gray-400 mb-3">
                                {trigrams.upper?.name.chinese} ({trigrams.upper?.name.english})
                              </div>
                            </div>
                            <div className="text-sm text-midnight-200 leading-relaxed">
                              {[
                                trigrams.upper?.nature,
                                trigrams.upper?.attribute,
                                trigrams.upper?.element,
                                trigrams.upper?.direction,
                                trigrams.upper?.season,
                                trigrams.upper?.time,
                                trigrams.upper?.color,
                                trigrams.upper?.family,
                                trigrams.upper?.bodyPart,
                                trigrams.upper?.animal,
                                trigrams.upper?.virtue,
                              ].filter(Boolean).join(' | ')}
                            </div>
                            <div className="mt-3 text-sm text-gray-300 italic border-t border-midnight-400/20 pt-3">
                              {trigrams.upper?.symbolism}
                            </div>
                          </div>

                          {/* 下卦 */}
                          <div className="md:pl-6">
                            <div className="text-center mb-4">
                              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-champagne-500/20 to-midnight-500/20 rounded-lg border-2 border-champagne-400/30 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-4xl mb-1">{trigrams.lower?.symbol}</div>
                                  <span className="text-champagne-300/50 text-xs">八卦画像<br/>(512x512px)</span>
                                </div>
                              </div>
                              <div className="text-sm text-champagne-300 font-heading mb-1">下卦</div>
                              <div className="text-2xl text-midnight-200 font-bold mb-1">
                                {trigrams.lower?.name.japanese}
                              </div>
                              <div className="text-sm text-gray-400 mb-3">
                                {trigrams.lower?.name.chinese} ({trigrams.lower?.name.english})
                              </div>
                            </div>
                            <div className="text-sm text-midnight-200 leading-relaxed">
                              {[
                                trigrams.lower?.nature,
                                trigrams.lower?.attribute,
                                trigrams.lower?.element,
                                trigrams.lower?.direction,
                                trigrams.lower?.season,
                                trigrams.lower?.time,
                                trigrams.lower?.color,
                                trigrams.lower?.family,
                                trigrams.lower?.bodyPart,
                                trigrams.lower?.animal,
                                trigrams.lower?.virtue,
                              ].filter(Boolean).join(' | ')}
                            </div>
                            <div className="mt-3 text-sm text-gray-300 italic border-t border-midnight-400/20 pt-3">
                              {trigrams.lower?.symbolism}
                            </div>
                          </div>
                        </div>

                        {/* 卦の成り立ち・総合解釈 */}
                        <div className="mt-6 pt-6 border-t border-midnight-400/30">
                          <h5 className="text-base font-heading text-champagne-400 mb-3 flex items-center gap-2">
                            <span className="text-lg">🔮</span>
                            卦の成り立ちと意味
                          </h5>
                          <div className="text-sm text-gray-200 leading-relaxed space-y-2">
                            <p>
                              <span className="text-champagne-300 font-semibold">上卦の{trigrams.upper?.name.japanese}</span>
                              （{trigrams.upper?.name.chinese}）は<span className="text-midnight-200">{trigrams.upper?.nature}</span>を表し、
                              <span className="text-champagne-300 font-semibold">下卦の{trigrams.lower?.name.japanese}</span>
                              （{trigrams.lower?.name.chinese}）は<span className="text-midnight-200">{trigrams.lower?.nature}</span>を象徴します。
                            </p>
                            <p className="text-gray-300">
                              この組み合わせから、{primaryHexagram.name.japanese}（{primaryHexagram.name.chinese}）という卦が成り立ち、
                              「{primaryHexagram.name.english}」という本質を示しています。
                              {trigrams.upper?.attribute && trigrams.lower?.attribute && (
                                <>上の{trigrams.upper.attribute}と下の{trigrams.lower.attribute}が重なることで、この卦独自の意味が生まれます。</>
                              )}
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="text-center">
                <Button variant="primary" size="lg" onClick={handleReset}>
                  <RotateCcw className="w-5 h-5" />
                  新しい占いを始める
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
