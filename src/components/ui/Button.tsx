import type { ComponentPropsWithoutRef } from 'react'
import { Loading } from './Loading'
import { styles } from './Button.styles'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'error'
type ButtonSize = 'sm' | 'md' | 'lg'

type MotionButtonProps = ComponentPropsWithoutRef<typeof motion.button>

interface ButtonProps extends Omit<MotionButtonProps, 'ref'> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

export function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  isLoading, 
  className,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={twMerge(
        styles.base,
        styles[variant],
        styles[size],
        isLoading && styles.loading,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loading size="sm" />
          <span>Carregando...</span>
        </>
      ) : children}
    </motion.button>
  )
} 