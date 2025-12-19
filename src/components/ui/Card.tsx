import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

type CardVariant = 'glass' | 'solid' | 'bordered' | 'floating'

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant
  glow?: boolean
  children: React.ReactNode
}

const variantStyles: Record<CardVariant, string> = {
  glass: 'glass',
  solid: 'bg-bg-secondary border border-bg-card',
  bordered: 'bg-transparent border-2 border-midnight-400/30',
  floating: 'glass shadow-2xl shadow-champagne-500/20',
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'glass', glow = false, children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'rounded-2xl p-6 transition-all duration-300',
          variantStyles[variant],
          glow && 'mystic-glow',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
)

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <h3 className={cn('font-heading text-2xl text-champagne-400', className)}>
    {children}
  </h3>
)

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('text-text-secondary', className)}>
    {children}
  </div>
)
