'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Sparkles } from 'lucide-react'
import { TaijiIcon } from '@/components/icons/TaijiIcon'
import { cn } from '@/lib/utils/cn'

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'HOME', icon: Home, isCustom: false },
    { href: '/kabbalah', label: 'カバラ数秘術', icon: Sparkles, isCustom: false },
    { href: '/iching', label: '易経', icon: TaijiIcon, isCustom: true },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-bg-primary/80 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-display text-xl md:text-2xl gradient-text"
            >
              LUNE NEXUS
            </motion.div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
                      'border border-transparent',
                      isActive
                        ? 'bg-midnight-500/20 border-midnight-400 text-champagne-400'
                        : 'hover:bg-bg-secondary hover:border-white/10 text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {item.isCustom ? (
                      <Icon size={16} />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span className="font-heading text-sm hidden sm:inline">
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}
