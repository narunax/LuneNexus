'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface HexagramLinesProps {
  binary: string
  changingLines?: number[]
  lineValues?: (6 | 7 | 8 | 9)[] // 6-9の値の配列（下から上へ）
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { height: 'h-1', gap: 'gap-1', width: 'w-16' },
  md: { height: 'h-2', gap: 'gap-2', width: 'w-24' },
  lg: { height: 'h-3', gap: 'gap-3', width: 'w-32' },
}

export function HexagramLines({
  binary,
  changingLines = [],
  lineValues,
  size = 'md',
  className = '',
}: HexagramLinesProps) {
  const { height, gap, width } = sizeMap[size]
  const lines = binary.split('').reverse() // 下から上へ

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {/* 左側：卦図（6本の線）※下から上へ表示 */}
      <div className={`flex flex-col-reverse ${gap}`}>
        {lines.map((bit, index) => {
          const lineNumber = index + 1
          const isChanging = changingLines.includes(lineNumber)
          const isYang = bit === '1'

          return (
            <motion.div
              key={index}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={width}
            >
              {isYang ? (
                // 陽爻（一本線）
                <motion.div
                  className={`${height} bg-champagne-300 ${
                    isChanging ? 'animate-pulse' : ''
                  }`}
                  animate={isChanging ? { opacity: [1, 0.5, 1] } : {}}
                  transition={
                    isChanging
                      ? { duration: 1, repeat: Infinity }
                      : {}
                  }
                />
              ) : (
                // 陰爻（二本線）
                <div className="flex gap-2">
                  <motion.div
                    className={`flex-1 ${height} bg-midnight-400 ${
                      isChanging ? 'animate-pulse' : ''
                    }`}
                    animate={isChanging ? { opacity: [1, 0.5, 1] } : {}}
                    transition={
                      isChanging
                        ? { duration: 1, repeat: Infinity }
                        : {}
                    }
                  />
                  <motion.div
                    className={`flex-1 ${height} bg-midnight-400 ${
                      isChanging ? 'animate-pulse' : ''
                    }`}
                    animate={isChanging ? { opacity: [1, 0.5, 1] } : {}}
                    transition={
                      isChanging
                        ? { duration: 1, repeat: Infinity }
                        : {}
                    }
                  />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* 右側：数字と変爻マーク（左詰め）※下から上へ表示 */}
      <div className={`flex flex-col-reverse ${gap}`}>
        {lines.map((bit, index) => {
          const lineNumber = index + 1
          const isChanging = changingLines.includes(lineNumber)
          const displayValue = lineValues ? lineValues[index] : lineNumber

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex items-center justify-start ${
                size === 'sm' ? 'h-1' : size === 'md' ? 'h-2' : 'h-3'
              }`}
            >
              <span className={`${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'} font-medium ${
                isChanging ? 'text-champagne-300' : 'text-gray-400'
              }`}>
                {displayValue}
                {isChanging && (
                  <span className="ml-1 text-champagne-400">●</span>
                )}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function HexagramLineSimple({
  binary,
  className = '',
}: {
  binary: string
  className?: string
}) {
  const lines = binary.split('').reverse()

  return (
    <div className={`flex flex-col-reverse gap-1 ${className}`}>
      {lines.map((bit, index) => {
        const isYang = bit === '1'

        return (
          <div key={index} className="w-16 h-1">
            {isYang ? (
              <div className="w-full h-full bg-champagne-300 rounded" />
            ) : (
              <div className="flex gap-1">
                <div className="flex-1 h-full bg-midnight-400 rounded" />
                <div className="flex-1 h-full bg-midnight-400 rounded" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
