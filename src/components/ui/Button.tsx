import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'mystic' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-midnight-500 to-champagne-500 text-white hover:shadow-2xl hover:shadow-champagne-500/50',
  secondary: 'glass border-2 border-midnight-400/30 text-text-primary hover:border-champagne-500',
  mystic: 'aurora-bg text-white hover:shadow-2xl hover:shadow-champagne-500/50',
  ghost: 'bg-transparent text-text-secondary hover:text-champagne-500 hover:bg-bg-card',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, disabled, children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
        disabled={disabled || loading}
        className={cn(
          'relative font-heading rounded-lg overflow-hidden transition-all duration-300',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-champagne-500 focus:ring-offset-2 focus:ring-offset-bg-primary',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/50">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
