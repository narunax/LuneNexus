import type { Metadata } from 'next'
import { Cinzel_Decorative, Philosopher, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const philosopher = Philosopher({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-philosopher',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LUNE NEXUS 〜 数秘と易の黄金律 〜',
  description: '古代の叡智と現代のテクノロジーを融合し、人々の自己理解と成長を支援する神秘の占いプラットフォーム',
  keywords: ['カバラ数秘術', '易経', '占い', '数秘術', 'スピリチュアル', '自己理解', 'LUNE NEXUS', '黄金律'],
  authors: [{ name: 'LUNE NEXUS' }],
  openGraph: {
    title: 'LUNE NEXUS 〜 数秘と易の黄金律 〜',
    description: 'カバラ数秘術と易経で見つける、あなたの真実',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      className={`${cinzel.variable} ${philosopher.variable} ${notoSansJP.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased scrollbar-mystic">
        <div className="relative min-h-screen">
          {/* Background particles effect */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-cosmos-black via-bg-primary to-bg-secondary" />
            <div className="stars absolute inset-0" />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
