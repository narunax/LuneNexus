'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-bg-secondary/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-display text-xl text-champagne-400 mb-4">
              LUNE NEXUS
            </h3>
            <p className="text-sm text-champagne-300 mb-2">
              〜 数秘と易の黄金律 〜
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              古代の叡智と現代のテクノロジーを融合し、
              人々の自己理解と成長を支援する
              神秘の占いプラットフォーム
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading text-lg text-champagne-400 mb-4">
              占術メニュー
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kabbalah"
                  className="text-sm text-text-secondary hover:text-champagne-400 transition-colors"
                >
                  カバラ数秘術
                </Link>
              </li>
              <li>
                <Link
                  href="/iching"
                  className="text-sm text-text-secondary hover:text-champagne-400 transition-colors"
                >
                  易経占い
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg text-champagne-400 mb-4">
              お問い合わせ
            </h3>
            <div className="flex gap-4">
              <motion.a
                href="mailto:info@mysticalinsights.example"
                whileHover={{ scale: 1.1 }}
                className="text-text-secondary hover:text-champagne-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-text-secondary hover:text-champagne-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-sm text-text-secondary">
              &copy; {currentYear} LUNE NEXUS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
