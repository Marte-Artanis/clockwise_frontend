import { twMerge } from 'tailwind-merge'
import { styles } from './Skeleton.styles'

type SkeletonVariant = 'text' | 'title' | 'avatar' | 'card' | 'button'

interface SkeletonProps {
  variant?: SkeletonVariant
  className?: string
  count?: number
}

export function Skeleton({ variant = 'text', className, count = 1 }: SkeletonProps) {
  const baseStyle = twMerge(styles.base, styles[variant], className)

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={baseStyle} role="status" aria-label="Carregando..." />
      ))}
    </>
  )
}

export function SkeletonText(props: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="text" {...props} />
}

export function SkeletonTitle(props: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="title" {...props} />
}

export function SkeletonAvatar(props: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="avatar" {...props} />
}

export function SkeletonCard(props: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="card" {...props} />
}

export function SkeletonButton(props: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="button" {...props} />
}
