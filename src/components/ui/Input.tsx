import type { InputHTMLAttributes } from 'react'
import { styles } from './Input.styles'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({ label, error, icon, className, disabled, ...props }: InputProps) {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50">{icon}</div>
        )}

        <input
          className={twMerge(
            styles.input,
            icon && 'pl-10',
            error && 'border-error/50 focus:border-error/50 focus:ring-error/20',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          disabled={disabled}
          {...props}
        />
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
