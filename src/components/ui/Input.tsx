import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <div className="w-full">
        {label && (
          <motion.label
            animate={{
              color: isFocused ? '#C9B88A' : '#A8A8B3',
              scale: isFocused ? 0.95 : 1,
            }}
            transition={{ duration: 0.15 }}
            className="block text-sm font-heading mb-2"
          >
            {label}
          </motion.label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'w-full px-4 py-3 rounded-lg bg-bg-secondary border border-midnight-400/30',
              'text-text-primary placeholder:text-text-secondary',
              'focus:outline-none focus:border-champagne-500 focus:ring-2 focus:ring-champagne-500/20',
              'transition-all duration-150',
              icon && 'pl-10',
              error && 'border-negative focus:border-negative focus:ring-negative/20',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-negative"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <div className="w-full">
        {label && (
          <motion.label
            animate={{
              color: isFocused ? '#C9B88A' : '#A8A8B3',
              scale: isFocused ? 0.95 : 1,
            }}
            transition={{ duration: 0.15 }}
            className="block text-sm font-heading mb-2"
          >
            {label}
          </motion.label>
        )}
        <textarea
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-bg-secondary border border-midnight-400/30',
            'text-text-primary placeholder:text-text-secondary',
            'focus:outline-none focus:border-champagne-500 focus:ring-2 focus:ring-champagne-500/20',
            'transition-all duration-150 resize-none',
            error && 'border-negative focus:border-negative focus:ring-negative/20',
            className
          )}
          {...props}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-negative"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
