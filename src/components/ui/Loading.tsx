import React from 'react'
import { motion } from 'framer-motion'
import { TaijiIcon } from '@/components/icons/TaijiIcon'

interface LoadingProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 32,
  md: 64,
  lg: 96,
}

export function Loading({ text = '読み込み中...', size = 'md' }: LoadingProps) {
  const iconSize = sizeMap[size]

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="mb-4"
      >
        <TaijiIcon size={iconSize} className="text-champagne-400" />
      </motion.div>
      <motion.p
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="text-text-secondary font-heading"
      >
        {text}
      </motion.p>
    </div>
  )
}

export function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={`w-6 h-6 border-2 border-champagne-400 border-t-transparent rounded-full ${className}`}
    />
  )
}
