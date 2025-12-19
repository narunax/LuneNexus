'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
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
    description: '最高の源泉、純粋な存在。全ての始まりであり、神聖な意志の座。ケテルは生命の樹の頂点に位置し、無限の光（アイン・ソフ・オール）が最初に顕現する場所です。ここには全ての可能性が未分化のまま存在し、純粋な意識の状態にあります。創造の第一原因であり、全ての存在の根源的な統一を象徴します。',
    keywords: ['純粋意識', '源泉', '統一', '王冠', '至高', '神聖な意志', '第一原因', '無限の光', '根源', '完全性', '一なるもの', '絶対存在', '霊的頂点', '神性', '全能', '至高の父', '永遠', '不変', '全知', '超越'],
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
    description: '父性原理、動的な創造力の源泉。コクマーは純粋な霊的エネルギーが最初に活性化する場所であり、全ての創造行為の原動力です。ここでは神聖な意志が具体的な力となって顕現し、宇宙を生み出す原初の衝動が生まれます。直観、インスピレーション、そして啓示の座であり、時間を超越した永遠の知恵が流れ出る泉です。全ての創造的プロセスの始まりとなる、純粋で無限の可能性を秘めています。',
    keywords: ['知恵', '創造力', '父性原理', '霊感', 'ビジョン', '直観', '活力', '原初のエネルギー', '動的な力', 'インスピレーション', '啓示', '宇宙の父', '純粋行動', '創造衝動', '霊的活力', '神聖な火花', '至高の男性性', '永遠の知恵', '生命力', '原初の光'],
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
    description: '母性原理、形を与える偉大なる母。ビナーはコクマーからの純粋なエネルギーを受け取り、それに形と構造を与える神聖な子宮です。ここで抽象的な力が具体的な形態へと変容し、創造の青写真が描かれます。理解、識別、そして制限の力を通じて、無限の可能性が有限の現実へと形作られます。時間と空間の概念が生まれる場所であり、全ての形あるものの原型が宿る偉大なる海です。',
    keywords: ['理解', '形態', '母性原理', '制限', '構造', '偉大なる母', '受容', '神聖な子宮', '識別', '時間', '空間', '形態化', '沈黙', '深遠', '内省', '宇宙の母', '原型', '受動的知性', '形成力', '神聖な暗闇'],
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
    description: '慈悲と愛、無条件の恵みの座。ケセドは拡大、成長、そして豊かさの原理を体現します。ここでは神聖な愛が惜しみなく注がれ、全ての存在に対する慈悲と寛容が流れ出します。王の座とも呼ばれ、正義と慈悲が調和する理想的な統治の原型です。与える喜び、分かち合う幸福、そして無限の寛大さがこのセフィラの本質です。制限を超えた愛の拡大であり、宇宙の恩寵が顕現する場所です。',
    keywords: ['慈悲', '愛', '寛大', '恵み', '拡大', '豊かさ', '慈愛', '王の座', '与える喜び', '成長', '繁栄', '保護', '献身', '恩寵', '寛容', '正義', '親切', '無条件の愛', '祝福', '善意'],
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
    description: '力と峻厳、神聖な正義の剣。ゲブラーは必要な制限と浄化の原理を体現し、ケセドの無制限な拡大に対する完璧な均衡をもたらします。ここでは不要なものが削ぎ落とされ、純粋なる形が現れます。破壊は再生のためであり、峻厳は愛の裏返しです。勇気、決断力、そして正義の執行がこのセフィラの本質です。神聖な火により不純物が焼き払われ、真の強さが鍛えられる場所です。',
    keywords: ['力', '正義', '峻厳', '勇気', '浄化', '破壊', '制限', '規律', '決断', '強さ', '戦士', '神聖な剣', '切断', '裁き', '厳格', '勇敢', '防衛', '境界', '浄化の火', '霊的戦闘'],
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
    description: '調和と美、生命の樹の輝かしい中心。ティファレトは全てのセフィロトからのエネルギーが調和する至高のバランスポイントです。太陽のように輝き、上なる世界と下なる世界を結ぶ仲介者の役割を果たします。ここで慈悲と峻厳が完璧に調和し、真の美が顕現します。自己犠牲、献身、そして霊的覚醒の座であり、高次の自己と繋がる聖なる中心です。キリスト意識、仏性、真の自己の象徴であり、変容と再生の神聖な場所です。',
    keywords: ['美', '調和', 'バランス', '犠牲', '贖罪', '太陽', '中心', '輝き', '心臓', '仲介者', '変容', '覚醒', '献身', '黄金', '調和の王', 'キリスト意識', '真の自己', '霊的中心', '神聖な子', '完全なる調和'],
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
    description: '勝利と永遠、感情と直感の座。ネツァクは芸術、美、そして愛の力が流れる場所です。ここでは感情が霊的な高みへと昇華され、創造的インスピレーションが溢れ出します。自然の力、本能、そして生命の喜びがこのセフィラの本質です。持続する意志、不屈の精神、そして永遠に続く愛の勝利を象徴します。感覚を通じた神秘体験、芸術的表現、そして情熱的な献身がここに宿ります。',
    keywords: ['勝利', '感情', '直感', '芸術', '愛', '永遠', '美', '自然', '本能', '情熱', '創造性', 'インスピレーション', '欲望', '生命力', '感覚', '持続', '芸術的表現', '神秘体験', '喜び', 'エロス'],
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
    description: '栄光と知性、論理的思考の座。ホドは言葉、記号、そして思考の力が宿る場所です。ここでネツァクの感情的エネルギーが明確な形と意味を与えられ、コミュニケーションが可能になります。知的理解、分析力、そして魔術的な言葉の力がこのセフィラの本質です。科学、数学、言語、そして全ての体系的知識の源泉であり、神の栄光が知性を通じて顕現する場所です。',
    keywords: ['栄光', '知性', '論理', '言葉', '魔術', 'コミュニケーション', '思考', '分析', '科学', '記号', '学習', '理性', '明晰', '体系', '言語', '説明', '理解', '神聖な言葉', '知的栄光', '明瞭性'],
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
    description: '基礎と基盤、アストラル界の中心。イェソドは潜在意識の領域であり、夢、幻影、そして想像力が生まれる場所です。上位のセフィロトからの全てのエネルギーがここで集約され、最終的にマルクトの物質界へと流れ込む直前の段階です。月のように満ち欠けする心の働き、記憶、そして集合無意識との繋がりがこのセフィラの本質です。エーテル体の座であり、霊的世界と物質世界を結ぶ重要な媒介者です。',
    keywords: ['基礎', '潜在意識', '夢', 'アストラル', '想像', '月', '幻影', '記憶', 'エーテル', '無意識', '反射', '媒介', '集合無意識', '心理', 'イメージ', 'サイキック', '流動性', 'アストラル光', '基盤', '霊的基礎'],
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
    description: '王国、物質界の顕現。マルクトは全ての霊的エネルギーが最終的に具現化する場所であり、私たちが五感で体験する現実世界そのものです。ここで上位のセフィロトからの全ての力が統合され、形ある世界として結実します。物質は霊の最も密度の高い表現であり、神聖な王国の顕現です。大地、肉体、そして日常の経験を通じて、霊的な学びが実践される聖なる場です。終わりであり始まりでもあり、スピリチュアルな旅の出発点となります。',
    keywords: ['王国', '物質', '現実', '顕現', '大地', '肉体', '実践', '具現化', '五感', '日常', '形態', '結実', '女王', '地上の王国', '物質世界', '経験', '安定', '実現', '聖なる大地', '神の花嫁'],
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
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

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
                  transition={{ duration: 0.15 }}
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

      {/* Sephira Detail Modal - Rendered via Portal */}
      {mounted &&
        typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedSephira && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99998]"
                  onClick={() => setSelectedSephira(null)}
                  style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                />

                {/* Modal */}
                <div
                  className="fixed z-[99999]"
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '95%',
                    maxWidth: '42rem',
                    maxHeight: '85vh',
                    margin: 0,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', duration: 0.3, damping: 25, stiffness: 300 }}
                    className="w-full h-full"
                  >
              <Card variant="floating" className="relative h-full overflow-auto">
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
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )}
    </>
  )
}
