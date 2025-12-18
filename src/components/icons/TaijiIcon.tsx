/**
 * 太極図（陰陽魚図）アイコン
 * Taiji (Yin-Yang) Symbol
 */

import React from 'react'

interface TaijiIconProps {
  className?: string
  size?: number
}

export function TaijiIcon({ className = '', size = 24 }: TaijiIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 外円 */}
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" />

      {/* 陰（黒）部分 */}
      <path
        d="M12 1 A11 11 0 0 1 12 23 A5.5 5.5 0 0 1 12 12 A5.5 5.5 0 0 0 12 1 Z"
        fill="currentColor"
      />

      {/* 陽の目（白い点） */}
      <circle cx="12" cy="6.5" r="2" fill="white" />

      {/* 陰の目（黒い点） */}
      <circle cx="12" cy="17.5" r="2" fill="currentColor" />
    </svg>
  )
}
