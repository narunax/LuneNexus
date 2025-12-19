'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

interface Sephira {
  id: number
  name: string
  hebrewName: string
  x: number
  y: number
  color: string
  attribute: string
  description: string
  keywords: string[]
  correspondences: {
    planet?: string
    element?: string
    virtue?: string
    vice?: string
  }
}

const sephiroth: Sephira[] = [
  {
    id: 1,
    name: 'ケテル',
    hebrewName: 'Kether',
    x: 50,
    y: 8,
    color: '#FFFFFF',
    attribute: '王冠',
    description: '最高の源泉、純粋な存在。全ての始まりであり、神聖な意志の座。',
    keywords: ['純粋意識', '源泉', '統一', '王冠', '至高'],
    correspondences: {
      planet: '海王星',
      virtue: '達成の完成',
      vice: '無'
    }
  },
  {
    id: 2,
    name: 'コクマー',
    hebrewName: 'Chokmah',
    x: 72,
    y: 22,
    color: '#4A90E2',
    attribute: '知恵',
    description: '父性原理、創造的な力。純粋なエネルギーと霊感の源。',
    keywords: ['知恵', '創造力', '父性', '霊感', 'ビジョン'],
    correspondences: {
      planet: '天王星',
      virtue: '献身',
      vice: '無'
    }
  },
  {
    id: 3,
    name: 'ビナー',
    hebrewName: 'Binah',
    x: 28,
    y: 22,
    color: '#34495E',
    attribute: '理解',
    description: '母性原理、形を与える力。理解と制限、構造化の原理。',
    keywords: ['理解', '形態', '母性', '制限', '構造'],
    correspondences: {
      planet: '土星',
      virtue: '沈黙',
      vice: '貪欲'
    }
  },
  {
    id: 4,
    name: 'ケセド',
    hebrewName: 'Chesed',
    x: 72,
    y: 42,
    color: '#3498DB',
    attribute: '慈悲',
    description: '慈悲と愛、拡大の原理。寛大さと恵みの座。',
    keywords: ['慈悲', '愛', '寛大', '恵み', '拡大'],
    correspondences: {
      planet: '木星',
      virtue: '従順',
      vice: '偏見、浪費'
    }
  },
  {
    id: 5,
    name: 'ゲブラー',
    hebrewName: 'Geburah',
    x: 28,
    y: 42,
    color: '#E74C3C',
    attribute: '峻厳',
    description: '力と正義、破壊の原理。必要な制限と浄化の力。',
    keywords: ['力', '正義', '峻厳', '勇気', '浄化'],
    correspondences: {
      planet: '火星',
      virtue: 'エネルギー、勇気',
      vice: '残酷、破壊'
    }
  },
  {
    id: 6,
    name: 'ティファレト',
    hebrewName: 'Tiphareth',
    x: 50,
    y: 52,
    color: '#F39C12',
    attribute: '美',
    description: '調和と美、バランスの中心。太陽の輝き、自己の真髄。',
    keywords: ['美', '調和', 'バランス', '犠牲', '贖罪'],
    correspondences: {
      planet: '太陽',
      virtue: '献身、調和への意志',
      vice: '誇り'
    }
  },
  {
    id: 7,
    name: 'ネツァク',
    hebrewName: 'Netzach',
    x: 72,
    y: 70,
    color: '#27AE60',
    attribute: '勝利',
    description: '感情と直感、芸術性。勝利と愛の力。',
    keywords: ['勝利', '感情', '直感', '芸術', '愛'],
    correspondences: {
      planet: '金星',
      virtue: '無私',
      vice: '不純、好色'
    }
  },
  {
    id: 8,
    name: 'ホド',
    hebrewName: 'Hod',
    x: 28,
    y: 70,
    color: '#E67E22',
    attribute: '栄光',
    description: '知性と論理、コミュニケーション。言葉と思考の力。',
    keywords: ['栄光', '知性', '論理', '言葉', '魔術'],
    correspondences: {
      planet: '水星',
      virtue: '真実',
      vice: '虚偽、不誠実'
    }
  },
  {
    id: 9,
    name: 'イェソド',
    hebrewName: 'Yesod',
    x: 50,
    y: 82,
    color: '#9B59B6',
    attribute: '基礎',
    description: '潜在意識、夢と幻影の領域。アストラル界の基盤。',
    keywords: ['基礎', '潜在意識', '夢', 'アストラル', '想像'],
    correspondences: {
      planet: '月',
      virtue: '独立',
      vice: '怠惰'
    }
  },
  {
    id: 10,
    name: 'マルクト',
    hebrewName: 'Malkuth',
    x: 50,
    y: 96,
    color: '#16A085',
    attribute: '王国',
    description: '物質界、現実世界。全てのエネルギーの最終的な顕現。',
    keywords: ['王国', '物質', '現実', '顕現', '大地'],
    correspondences: {
      planet: '地球',
      element: '土',
      virtue: '識別',
      vice: '無気力、貪欲'
    }
  },
]

const paths = [
  [1, 2], [1, 3], [2, 3], [2, 4], [2, 6], [3, 5], [3, 6],
  [4, 5], [4, 6], [5, 6], [4, 7], [5, 8], [6, 7], [6, 8],
  [6, 9], [7, 8], [7, 9], [8, 9], [9, 10],
]

interface TreeOfLifeProps {
  highlightedSephira?: number
  className?: string
}

export function TreeOfLife({ highlightedSephira, className = '' }: TreeOfLifeProps) {
  const [selectedSephira, setSelectedSephira] = useState<Sephira | null>(null)

  return (
    <>
      <div className={`w-full ${className}`}>
        <div className="relative w-full max-w-2xl mx-auto">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-auto"
          style={{ minHeight: '500px' }}
        >
          {/* Draw paths first */}
          {paths.map(([from, to], index) => {
            const fromSeph = sephiroth.find(s => s.id === from)!
            const toSeph = sephiroth.find(s => s.id === to)!

            return (
              <motion.line
                key={index}
                x1={fromSeph.x}
                y1={fromSeph.y}
                x2={toSeph.x}
                y2={toSeph.y}
                stroke="rgba(212, 175, 55, 0.2)"
                strokeWidth="0.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: index * 0.05 }}
              />
            )
          })}

          {/* Draw sephiroth */}
          {sephiroth.map((seph, index) => {
            const isHighlighted = highlightedSephira === seph.id
            const isSelected = selectedSephira?.id === seph.id

            return (
              <motion.g
                key={seph.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedSephira(seph)}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow effect */}
                {(isHighlighted || isSelected) && (
                  <circle
                    cx={seph.x}
                    cy={seph.y}
                    r="4.5"
                    fill={seph.color}
                    opacity="0.3"
                  >
                    <animate
                      attributeName="r"
                      values="4.5;6;4.5"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Main circle */}
                <motion.circle
                  cx={seph.x}
                  cy={seph.y}
                  r="3.5"
                  fill={seph.color}
                  stroke="#D4AF37"
                  strokeWidth={isSelected ? "0.4" : "0.25"}
                  whileHover={{ scale: 1.15 }}
                  className="cursor-pointer drop-shadow-lg"
                />

                {/* Number inside circle */}
                <text
                  x={seph.x}
                  y={seph.y + 0.8}
                  textAnchor="middle"
                  fill="#000000"
                  fontSize="2"
                  fontWeight="bold"
                  className="pointer-events-none"
                  style={{ userSelect: 'none' }}
                >
                  {seph.id}
                </text>
              </motion.g>
            )
          })}
        </svg>

        {/* Legend - moved below SVG to avoid overlap */}
        <div className="mt-4 p-4 glass rounded-lg">
          <h4 className="text-base font-heading text-champagne-300 mb-3 text-center">
            生命の樹（セフィロトの木）
          </h4>
          <p className="text-sm text-gray-300 text-center mb-2">
            カバラにおける宇宙と人間の構造を示す神秘的な図。
          </p>
          <p className="text-sm text-gray-300 text-center">
            各セフィラをクリックすると詳細が表示されます
          </p>
        </div>
      </div>
      </div>

      {/* Sephira Detail Modal */}
      <AnimatePresence>
        {selectedSephira && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={() => setSelectedSephira(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl z-[9999]"
              style={{ margin: 0 }}
            >
              <Card variant="floating" className="relative max-h-[90vh] overflow-auto">
                <button
                  onClick={() => setSelectedSephira(null)}
                  className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-negative/20 transition-colors z-10"
                >
                  <X className="w-5 h-5 text-text-primary" />
                </button>

                <CardContent className="p-6 md:p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div
                      className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold shadow-2xl"
                      style={{
                        backgroundColor: selectedSephira.color,
                        color: selectedSephira.id === 1 ? '#000' : '#fff',
                      }}
                    >
                      {selectedSephira.id}
                    </div>
                    <h3 className="font-display text-4xl text-champagne-400 mb-2">
                      {selectedSephira.name}
                    </h3>
                    <p className="text-xl text-gray-300 italic mb-1">
                      {selectedSephira.hebrewName}
                    </p>
                    <p className="text-base text-champagne-300 font-heading">
                      {selectedSephira.attribute}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-200 leading-relaxed text-base">
                      {selectedSephira.description}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="mb-6">
                    <h4 className="text-base font-heading text-champagne-400 mb-3 flex items-center gap-2">
                      <span className="text-xl">🔑</span>
                      キーワード
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSephira.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-sm bg-midnight-500/30 text-midnight-200 rounded-full border border-midnight-400/50"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Correspondences */}
                  <div className="space-y-3">
                    <h4 className="text-base font-heading text-champagne-300 mb-3 flex items-center gap-2">
                      <span className="text-xl">✨</span>
                      対応関係
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedSephira.correspondences.planet && (
                        <div className="p-3 glass rounded-lg">
                          <div className="text-sm text-gray-400 mb-1">惑星</div>
                          <div className="text-base text-gray-100 font-medium">
                            {selectedSephira.correspondences.planet}
                          </div>
                        </div>
                      )}
                      {selectedSephira.correspondences.element && (
                        <div className="p-3 glass rounded-lg">
                          <div className="text-sm text-gray-400 mb-1">元素</div>
                          <div className="text-base text-gray-100 font-medium">
                            {selectedSephira.correspondences.element}
                          </div>
                        </div>
                      )}
                      {selectedSephira.correspondences.virtue && (
                        <div className="p-3 glass rounded-lg">
                          <div className="text-sm text-gray-400 mb-1">美徳</div>
                          <div className="text-base text-champagne-300 font-medium">
                            {selectedSephira.correspondences.virtue}
                          </div>
                        </div>
                      )}
                      {selectedSephira.correspondences.vice && (
                        <div className="p-3 glass rounded-lg">
                          <div className="text-sm text-gray-400 mb-1">悪徳</div>
                          <div className="text-base text-midnight-300 font-medium">
                            {selectedSephira.correspondences.vice}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
