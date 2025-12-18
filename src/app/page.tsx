'use client'

import { motion } from 'framer-motion'
import { Sparkles, Moon, Star } from 'lucide-react'
import Link from 'next/link'
import { TaijiIcon } from '@/components/icons/TaijiIcon'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 gradient-text">
              Mystical Insights
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Star className="w-8 h-8 text-pink-300 animate-pulse" />
              <Moon className="w-10 h-10 text-fuchsia-300" />
              <Star className="w-8 h-8 text-pink-300 animate-pulse" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-xl md:text-3xl text-text-secondary mb-8"
          >
            古代の叡智と現代のテクノロジーを融合
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12"
          >
            カバラ数秘術と易経で見つける、あなたの真実
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              href="/kabbalah"
              className="group relative px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-lg text-white font-heading text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                カバラ数秘術を始める
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/iching"
              className="group relative px-8 py-4 glass rounded-lg text-text-primary font-heading text-lg border-2 border-fuchsia-400/50 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-pink-400"
            >
              <span className="relative z-10 flex items-center gap-2">
                <TaijiIcon size={20} />
                易経で占う
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 text-pink-400 opacity-20"
        >
          <Star className="w-16 h-16" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 text-fuchsia-400 opacity-20"
        >
          <Moon className="w-20 h-20" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="pt-2 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Kabbalah Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-400/20"
            >
              <div className="text-pink-300 mb-4">
                <Sparkles className="w-12 h-12" />
              </div>
              <h3 className="font-heading text-2xl mb-4 text-pink-300">
                カバラ数秘術
              </h3>
              <p className="text-text-secondary mb-4">
                生命の樹と数値の神秘。あなたの生年月日と名前から、人生の目的、才能、課題を明らかにします。
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• ライフパス計算</li>
                <li>• 名前分析</li>
                <li>• 相性診断</li>
                <li>• 生命の樹ビジュアライゼーション</li>
              </ul>
            </motion.div>

            {/* I Ching Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-400/20"
            >
              <div className="text-fuchsia-300 mb-4">
                <TaijiIcon size={48} />
              </div>
              <h3 className="font-heading text-2xl mb-4 text-fuchsia-300">
                易経
              </h3>
              <p className="text-text-secondary mb-4">
                64卦が示す宇宙の真理。古代中国の叡智があなたの問いに答えます。
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• コイン投げ法</li>
                <li>• 64卦詳細解釈</li>
                <li>• 変爻対応</li>
                <li>• AI支援解釈</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
