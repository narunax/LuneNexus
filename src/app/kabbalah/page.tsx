'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Crown, Calendar, User, TrendingUp, TrendingDown, Target, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { TreeOfLife } from '@/components/kabbalah/TreeOfLife'
import {
  calculateLifePath,
  calculateExpression,
  calculateSoulUrge,
  calculatePersonality,
  calculateBirthday,
  isMasterNumber,
  hasKarmicDebt,
} from '@/lib/kabbalah/calculator'
import { getInterpretation } from '@/lib/kabbalah/interpretations'
import type { NumberResult, KabbalahResult } from '@/types/kabbalah'

const japaneseNames = [
  'Murasaki Shikibu',
  'Nobunaga Oda',
  'Yukichi Fukuzawa',
  'Ichiyo Higuchi',
  'Soseki Natsume',
  'Hideki Yukawa',
  'Hideyo Noguchi',
  'Ryoma Sakamoto',
  'Ichiro Suzuki',
]

export default function KabbalahPage() {
  const [birthDate, setBirthDate] = useState('')
  const [fullName, setFullName] = useState('')
  const [result, setResult] = useState<KabbalahResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const randomPlaceholder = useMemo(
    () => japaneseNames[Math.floor(Math.random() * japaneseNames.length)],
    []
  )

  const handleCalculate = async () => {
    if (!birthDate || !fullName) return

    setIsCalculating(true)

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      const lifePathNumber = calculateLifePath(birthDate)
      const expressionNumber = calculateExpression(fullName)
      const soulUrgeNumber = calculateSoulUrge(fullName)
      const personalityNumber = calculatePersonality(fullName)
      const birthdayNumber = calculateBirthday(birthDate)

      const createNumberResult = (num: number): NumberResult => ({
        value: num,
        isMaster: isMasterNumber(num),
        hasKarmicDebt: hasKarmicDebt(num),
        interpretation: getInterpretation(num),
      })

      const calculatedResult: KabbalahResult = {
        coreNumbers: {
          lifePath: createNumberResult(lifePathNumber),
          expression: createNumberResult(expressionNumber),
          soulUrge: createNumberResult(soulUrgeNumber),
          personality: createNumberResult(personalityNumber),
          birthday: createNumberResult(birthdayNumber),
        },
        summary: {
          strengths: [
            ...getInterpretation(lifePathNumber).positiveTraits.slice(0, 3),
            ...getInterpretation(expressionNumber).positiveTraits.slice(0, 2),
          ],
          challenges: [
            ...getInterpretation(lifePathNumber).negativeTraits.slice(0, 2),
            ...getInterpretation(personalityNumber).negativeTraits.slice(0, 2),
          ],
          purpose: getInterpretation(lifePathNumber).description,
          advice: getInterpretation(lifePathNumber).advice,
        },
      }

      setResult(calculatedResult)
    } catch (error) {
      console.error('Calculation error:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const NumberCard: React.FC<{
    title: string
    subtitle: string
    numberResult: NumberResult
    icon: React.ReactNode
    accentColor: string
  }> = ({ title, subtitle, numberResult, icon, accentColor }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card variant="glass" className="h-full hover:shadow-2xl transition-all duration-300 border-l-4" style={{ borderLeftColor: accentColor }}>
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div style={{ color: accentColor }}>
                  {icon}
                </div>
                <h3 className="font-heading text-xl" style={{ color: accentColor }}>
                  {title}
                </h3>
              </div>
              <p className="text-sm text-gray-300">{subtitle}</p>
            </div>
            <div className="text-6xl font-display" style={{ color: accentColor }}>
              {numberResult.value}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {numberResult.isMaster && (
              <span className="px-3 py-1.5 text-sm bg-midnight-500/30 text-midnight-200 rounded-full border border-midnight-400/50 font-medium">
                ✨ マスターナンバー
              </span>
            )}
            {numberResult.hasKarmicDebt && (
              <span className="px-3 py-1.5 text-sm bg-red-500/30 text-red-200 rounded-full border border-red-400/50 font-medium">
                ⚠️ カルミックデット
              </span>
            )}
          </div>

          {/* Title */}
          <h4 className="text-2xl font-heading mb-3" style={{ color: accentColor }}>
            {numberResult.interpretation.title}
          </h4>

          {/* Description */}
          <p className="text-base text-gray-200 leading-relaxed mb-4">
            {numberResult.interpretation.description}
          </p>

          {/* Keywords */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {numberResult.interpretation.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm bg-bg-primary rounded-full border border-white/10"
                  style={{ color: accentColor }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Traits */}
          <div className="space-y-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-champagne-400" />
                <span className="text-sm font-heading text-champagne-300">長所・才能</span>
              </div>
              <ul className="space-y-1.5">
                {numberResult.interpretation.positiveTraits.map((trait, idx) => (
                  <li key={idx} className="text-sm text-gray-200 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-champagne-400">
                    {trait}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-midnight-400" />
                <span className="text-sm font-heading text-midnight-300">課題・注意点</span>
              </div>
              <ul className="space-y-1.5">
                {numberResult.interpretation.negativeTraits.map((trait, idx) => (
                  <li key={idx} className="text-sm text-gray-200 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-midnight-400">
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Advice */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-champagne-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm font-heading text-champagne-400 block mb-1">アドバイス</span>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {numberResult.interpretation.advice}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-10 h-10 text-champagne-400 animate-pulse" />
            <h1 className="font-display text-5xl md:text-7xl gradient-text">
              カバラ数秘術
            </h1>
            <Crown className="w-10 h-10 text-champagne-400 animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            生年月日と名前から、あなたの魂の設計図を解き明かす
          </p>
        </motion.div>

        {/* Input Form */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <Card variant="floating" glow>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Calculator className="w-7 h-7" />
                  あなたの情報を入力してください
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <Input
                    type="date"
                    label="生年月日"
                    icon={<Calendar className="w-5 h-5" />}
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder="1990-01-01"
                    className="text-lg py-4"
                  />
                  <Input
                    type="text"
                    label="フルネーム（ローマ字）"
                    icon={<User className="w-5 h-5" />}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={randomPlaceholder}
                    className="text-lg py-4"
                  />
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleCalculate}
                    loading={isCalculating}
                    disabled={!birthDate || !fullName}
                    className="w-full text-xl py-6"
                  >
                    <Crown className="w-6 h-6" />
                    {isCalculating ? '魂の設計図を解析中...' : '神秘を解き明かす'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-12">
            {/* Core Numbers Grid */}
            <div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-display text-4xl text-center mb-8 gradient-text"
              >
                コアナンバー
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NumberCard
                  title="ライフパス"
                  subtitle="人生の目的と使命"
                  numberResult={result.coreNumbers.lifePath}
                  icon={<Target className="w-5 h-5" />}
                  accentColor="#C9B88A"
                />
                <NumberCard
                  title="エクスプレッション"
                  subtitle="表現する才能"
                  numberResult={result.coreNumbers.expression}
                  icon={<Crown className="w-5 h-5" />}
                  accentColor="#E5D4B4"
                />
                <NumberCard
                  title="ソウルナンバー"
                  subtitle="内なる欲求"
                  numberResult={result.coreNumbers.soulUrge}
                  icon={<Crown className="w-5 h-5" />}
                  accentColor="#3D5A80"
                />
                <NumberCard
                  title="パーソナリティ"
                  subtitle="外面的な印象"
                  numberResult={result.coreNumbers.personality}
                  icon={<User className="w-5 h-5" />}
                  accentColor="#5C7AA3"
                />
                <NumberCard
                  title="バースデー"
                  subtitle="特別な才能"
                  numberResult={result.coreNumbers.birthday}
                  icon={<Calendar className="w-5 h-5" />}
                  accentColor="#B8A472"
                />
              </div>
            </div>

            {/* Summary */}
            <Card variant="floating" glow>
              <CardHeader>
                <CardTitle className="text-3xl text-center">✨ 総合分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-heading text-champagne-300 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-7 h-7" />
                        あなたの強み・才能
                      </h3>
                      <ul className="space-y-3">
                        {result.summary.strengths.map((strength, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 p-3 glass rounded-lg"
                          >
                            <span className="text-champagne-400 text-xl">✓</span>
                            <span className="text-gray-200 text-base">{strength}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-heading text-midnight-300 mb-4 flex items-center gap-2">
                        <TrendingDown className="w-7 h-7" />
                        克服すべき課題
                      </h3>
                      <ul className="space-y-3">
                        {result.summary.challenges.map((challenge, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 p-3 glass rounded-lg"
                          >
                            <span className="text-midnight-400 text-xl">!</span>
                            <span className="text-gray-200 text-base">{challenge}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                  <div className="p-6 bg-champagne-500/10 rounded-xl border border-champagne-400/40">
                    <h3 className="text-3xl font-heading text-champagne-300 mb-3 flex items-center gap-2">
                      <Target className="w-7 h-7" />
                      人生の目的・使命
                    </h3>
                    <p className="text-gray-200 leading-relaxed text-lg">
                      {result.summary.purpose}
                    </p>
                  </div>

                  <div className="p-6 bg-midnight-500/10 rounded-xl border border-midnight-400/40">
                    <h3 className="text-3xl font-heading text-champagne-400 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-7 h-7" />
                      魂からのアドバイス
                    </h3>
                    <p className="text-gray-200 leading-relaxed text-lg">
                      {result.summary.advice}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tree of Life Visualization */}
            <Card variant="floating" glow>
              <CardContent className="py-8">
                <TreeOfLife
                  highlightedSephira={result.coreNumbers.lifePath.value}
                />
              </CardContent>
            </Card>

            {/* Reset Button */}
            <div className="text-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  setResult(null)
                  setBirthDate('')
                  setFullName('')
                }}
                className="px-12"
              >
                新しい診断を始める
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
