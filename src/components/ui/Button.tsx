import type { ButtonHTMLAttributes } from 'react'
import { Loading } from './Loading'
import { styles } from './Button.styles'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  isLoading?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
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