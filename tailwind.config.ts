import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Champagne Gold Palette - より濃く高級感のある色に
        'champagne': {
          50: '#FFFBF5',   // 最も明るい
          100: '#FFF5E8',
          200: '#F4E4C1',  // より明るいゴールド
          300: '#E5D4A0',  // リッチゴールド
          400: '#D4AF37',  // 濃いゴールド（純金色）
          500: '#C9A961',  // メイン（より濃く）
          600: '#B8974D',  // ディープゴールド
          700: '#9D8139',  // アンティークゴールド
          800: '#7D6829',
          900: '#5D4E1B',
        },

        // Midnight Blue Palette
        'midnight': {
          50: '#E6EAF0',
          100: '#B8C4D6',
          200: '#8A9FBD',
          300: '#5C7AA3',
          400: '#3D5A80',
          500: '#2D4263',  // メイン
          600: '#1F2E47',
          700: '#151F33',
          800: '#0C1424',  // 背景用
          900: '#060A14',  // 最も暗い
          950: '#030508',
        },

        // Legacy support (oracle-gold)
        'oracle-gold': '#C9B88A',

        // Background colors
        'bg-primary': '#060A14',      // midnight-950
        'bg-secondary': '#0C1424',    // midnight-800
        'bg-card': 'rgba(201, 184, 138, 0.03)',  // champagne-500 with transparency

        // Text colors
        'text-primary': '#F7E7CE',    // champagne-200
        'text-secondary': '#D4C5A9',  // champagne-400
        'text-accent': '#C9B88A',     // champagne-500

        // Semantic colors
        positive: '#4ADE80',
        negative: '#F87171',
        neutral: '#94A3B8',
      },
      fontFamily: {
        'display': ['var(--font-cinzel)', 'serif'],
        'heading': ['var(--font-philosopher)', 'sans-serif'],
        'body': ['var(--font-noto-sans-jp)', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'aurora': 'linear-gradient(135deg, #C9B88A 0%, #2D4263 100%)',
        'nebula': 'linear-gradient(135deg, #0C1424 0%, #2D4263 50%, #C9B88A 100%)',
        'champagne-midnight': 'linear-gradient(135deg, #C9B88A 0%, #3D5A80 50%, #2D4263 100%)',
        'golden-shine': 'linear-gradient(135deg, #D4AF37 0%, #C9B88A 50%, #F4E4C1 100%)',
        'golden-glow': 'linear-gradient(90deg, #B8A472 0%, #C9B88A 25%, #E5D4B4 50%, #C9B88A 75%, #B8A472 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
