import type { ButtonHTMLAttributes } from 'react'
import { Loading } from './Loading'
import { styles } from './Button.styles'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'error'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    <button
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
    </button>
  )
} 