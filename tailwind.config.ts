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
        // Cosmic colors
        'cosmos-black': '#0A0B14',
        'mystic-purple': '#6B46C1',
        'oracle-gold': '#D4AF37',
        'astral-blue': '#4A7C7E',
        'lunar-silver': '#C0C0C0',

        // Background colors
        'bg-primary': '#0F0F1F',
        'bg-secondary': '#1A1A2E',
        'bg-card': 'rgba(255, 255, 255, 0.03)',

        // Text colors
        'text-primary': '#F8F8FF',
        'text-secondary': '#C5C5D0',  // より明るく視認性向上
        'text-accent': '#D4AF37',

        // Semantic colors
        positive: '#22C55E',
        negative: '#EF4444',
        neutral: '#94A3B8',
      },
      fontFamily: {
        'display': ['var(--font-cinzel)', 'serif'],
        'heading': ['var(--font-philosopher)', 'sans-serif'],
        'body': ['var(--font-noto-sans-jp)', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'aurora': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'nebula': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)',
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
