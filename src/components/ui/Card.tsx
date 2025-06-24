import type { HTMLAttributes } from 'react'
import { styles } from './Card.styles'
import { twMerge } from 'tailwind-merge'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={twMerge(styles.base, className)} {...props}>
      {children}
    </div>
  )
} 