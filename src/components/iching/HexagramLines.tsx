'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface HexagramLinesProps {
  binary: string
  changingLines?: number[]
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
  size = 'md',
  className = '',
}: HexagramLinesProps) {
  const { height, gap, width } = sizeMap[size]
  const lines = binary.split('').reverse() // 下から上へ

  return (
    <div className={`flex flex-col ${gap} ${className}`}>
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
            className={`${width} mx-auto`}
          >
            {isYang ? (
              // 陽爻（一本線）
              <motion.div
                className={`${height} bg-oracle-gold rounded ${
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
                  className={`flex-1 ${height} bg-mystic-purple rounded ${
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
                  className={`flex-1 ${height} bg-mystic-purple rounded ${
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

            {/* Line number label */}
            <div className="text-center mt-1">
              <span className="text-xs text-text-secondary">
                {lineNumber}
                {isChanging && (
                  <span className="ml-1 text-oracle-gold">●</span>
                )}
              </span>
            </div>
          </motion.div>
        )
      })}
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
    <div className={`flex flex-col gap-1 ${className}`}>
      {lines.map((bit, index) => {
        const isYang = bit === '1'

        return (
          <div key={index} className="w-16 h-1">
            {isYang ? (
              <div className="w-full h-full bg-oracle-gold rounded" />
            ) : (
              <div className="flex gap-1">
                <div className="flex-1 h-full bg-mystic-purple rounded" />
                <div className="flex-1 h-full bg-mystic-purple rounded" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
