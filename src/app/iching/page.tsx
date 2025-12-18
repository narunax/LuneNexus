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
import { getHexagram } from '@/lib/iching/hexagrams'
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
    const binary = manualLines
      .map(v => {
        if (v === 7 || v === 9) return '1' // 陽
        return '0' // 陰
      })
      .reverse() // 下から上の順になっているので反転
      .join('')

    const changing: number[] = []
    manualLines.forEach((v, i) => {
      if (v === 6 || v === 9) {
        changing.push(i + 1) // 1-indexed
      }
    })

    // バイナリを10進数に変換して卦番号を取得
    const decimal = parseInt(binary, 2)
    const hexagramNumber = (decimal % 64) + 1
    const hexagram = getHexagram(hexagramNumber)

    if (hexagram) {
      setPrimaryHexagram(hexagram)
      setChangingLines(changing)
      setStep('result')
    }
  }

  const handleReset = () => {
    setStep('question')
    setQuestion('')
    setPrimaryHexagram(null)
    setChangingLines([])
    setManualLines([null, null, null, null, null, null])
  }

  const isManualInputComplete = manualLines.every(v => v !== null)

  const HexagramDisplay: React.FC<{ hexagram: Hexagram; className?: string }> = ({
    hexagram,
    className,
  }) => {
    const trigrams = getTrigramsFromHexagram(hexagram.binary)

    return (
      <div className={`${className}`}>
        {/* レスポンシブ2列レイアウト */}
        <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-8">
          {/* 左側: 卦のシンボル */}
          <div className="flex flex-col items-center justify-start md:border-r md:border-white/10 md:pr-8">
            <div className="text-[120px] md:text-[150px] leading-none mb-6">{hexagram.unicode}</div>

            {/* 卦番号 */}
            <div className="mb-4">
              <span className="px-4 py-2 bg-purple-500/30 text-purple-200 rounded-full text-base font-heading">
                第{hexagram.number}卦
              </span>
            </div>

            {/* 爻の視覚表示 */}
            <div className="mt-6">
              <HexagramLines
                binary={hexagram.binary}
                changingLines={changingLines}
                size="md"
              />
            </div>
          </div>

          {/* 右側: 卦名と読み */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h3 className="font-display text-4xl md:text-5xl text-oracle-gold mb-3">
              {hexagram.name.japanese}
            </h3>
            <p className="text-xl md:text-2xl text-text-secondary mb-2">{hexagram.name.chinese}</p>
            <p className="text-base md:text-lg text-text-secondary italic">{hexagram.name.english}</p>
          </div>
        </div>

        {/* 卦辞 - 2列の下、大きめに表示 */}
        <div className="w-full mb-8 p-6 glass rounded-xl">
          <h4 className="text-center text-sm font-heading text-oracle-gold mb-3 uppercase tracking-wide">卦辞</h4>
          <p className="text-center text-lg md:text-xl text-text-primary italic leading-relaxed">
            {hexagram.judgment}
          </p>
        </div>

        {/* 上卦・下卦の構成 */}
        <div className="w-full glass rounded-xl p-6 mb-6">
          <h4 className="text-center text-sm font-heading text-oracle-gold mb-4">卦の構成</h4>
          <div className="grid grid-cols-2 gap-6">
            {/* 上卦 */}
            <div className="border-r border-white/10 pr-6">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{trigrams.upper?.symbol}</div>
                <div className="text-sm text-oracle-gold font-heading mb-1">上卦</div>
                <div className="text-base text-text-primary font-bold mb-2">
                  {trigrams.upper?.name.japanese}
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-bg-secondary/50 rounded px-3 py-2">
                  <span className="text-text-secondary">性質:</span>
                  <span className="text-text-primary ml-2">{trigrams.upper?.nature}</span>
                </div>
                <div className="bg-bg-secondary/50 rounded px-3 py-2">
                  <span className="text-text-secondary">属性:</span>
                  <span className="text-text-primary ml-2">{trigrams.upper?.attribute}</span>
                </div>
                <div className="bg-bg-secondary/50 rounded px-3 py-2">
                  <span className="text-text-secondary">家族:</span>
                  <span className="text-text-primary ml-2">{trigrams.upper?.family}</span>
                </div>
                <div className="bg-bg-secondary/50 rounded px-3 py-2">
                  <span className="text-text-secondary">象徴:</span>
                  <span className="text-text-primary ml-2">{trigrams.upper?.image}</span>
                </div>
                <div className="mt-3 text-text-secondary italic">
                  {trigrams.upper?.symbolism}
                </div>
              </div>
            </div>

            {/* 下卦 */}
            <div className="pl-6">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{trigrams.lower?.symbol}</div>
                <div className="text-sm text-oracle-gold font-heading mb-1">下卦</div>
                <div className="text-base text-text-primary font-bold mb-2">
                  {trigrams.lower?.name.japanese}
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-bg-secondary/50 rounded px-3 py-2">
                  <span className="text-text-secondary">性質:</span>
                  <span className="text-text-primary ml-2">{trigrams.lower?.nature}</span>
                </div>
                <div className="bg-bg-secondary/50 rounded px-3 py-2">
                  <span className="text-text-secondary">属性:</span>
                  <span className="text-text-primary ml-2">{trigrams.lower?.attribute}</span>
                </div>
                <div className="bg-bg-secondary/50 rounded px-3 py-2">
                  <span className="text-text-secondary">家族:</span>
                  <span className="text-text-primary ml-2">{trigrams.lower?.family}</span>
                </div>
                <div className="bg-bg-secondary/50 rounded px-3 py-2">
                  <span className="text-text-secondary">象徴:</span>
                  <span className="text-text-primary ml-2">{trigrams.lower?.image}</span>
                </div>
                <div className="mt-3 text-text-secondary italic">
                  {trigrams.lower?.symbolism}
                </div>
              </div>
            </div>
          </div>
        </div>
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
                            className="px-3 py-1 text-sm bg-bg-secondary border border-purple-400/40 rounded-full hover:border-oracle-gold transition-colors"
                          >
                            {tag}
                          </button>
                        )
                      )}
                    </div>

                    {/* 占い方法選択 */}
                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-lg font-heading text-oracle-gold mb-4">占い方法を選択</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setMethod('coins')}
                          className={`p-5 rounded-xl border-2 transition-all ${
                            method === 'coins'
                              ? 'border-oracle-gold bg-oracle-gold/10'
                              : 'border-purple-400/40 glass'
                          }`}
                        >
                          <CircleDot className="w-10 h-10 mx-auto mb-3 text-oracle-gold" />
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
                              ? 'border-oracle-gold bg-oracle-gold/10'
                              : 'border-purple-400/40 glass'
                          }`}
                        >
                          <TaijiIcon size={40} className="mx-auto mb-3 text-purple-300" />
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
                              <div className="w-full h-1 bg-white/10 rounded" />
                            ) : manualLines[lineIndex] === 6 || manualLines[lineIndex] === 8 ? (
                              // 陰爻(二本線)
                              <div className="w-full flex gap-2">
                                <div className="flex-1 h-2 bg-oracle-gold rounded" />
                                <div className="flex-1 h-2 bg-oracle-gold rounded" />
                              </div>
                            ) : (
                              // 陽爻(一本線)
                              <div className="w-full h-2 bg-oracle-gold rounded" />
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
                                    ? 'border-oracle-gold bg-oracle-gold/20 text-oracle-gold'
                                    : 'border-purple-400/40 text-text-secondary hover:border-oracle-gold/50'
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
                  className="w-32 h-32 mx-auto mb-8 border-4 border-oracle-gold rounded-full flex items-center justify-center"
                >
                  <TaijiIcon size={64} className="text-oracle-gold" />
                </motion.div>
                <p className="font-heading text-2xl text-oracle-gold">
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

              {/* Hexagram Display */}
              <Card variant="floating" glow>
                <CardContent className="py-8">
                  <HexagramDisplay hexagram={primaryHexagram} />
                </CardContent>
              </Card>

              {/* Interpretation - 項目名を視覚的に強調 */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>解釈</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-l-4 border-oracle-gold pl-4 bg-oracle-gold/5 py-3 rounded-r">
                      <h3 className="text-lg font-heading text-oracle-gold mb-2 flex items-center gap-2">
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
                    <div className="border-l-4 border-purple-400 pl-4 bg-purple-500/10 py-3 rounded-r">
                      <h3 className="text-lg font-heading text-purple-300 mb-2 flex items-center gap-2">
                        <span className="text-xl">🔑</span>
                        キーワード
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {primaryHexagram.interpretation.keywords.map(
                          (keyword, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-sm bg-bg-primary text-purple-200 rounded-full border border-purple-400/40"
                            >
                              {keyword}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
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
