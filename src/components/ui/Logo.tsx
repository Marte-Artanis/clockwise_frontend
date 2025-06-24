import { twMerge } from 'tailwind-merge'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={twMerge(
      'flex items-center gap-3 font-bold text-primary',
      'transition-all duration-300 hover:scale-105',
      sizes[size],
      className
    )}>
      <div className="relative">
        <span className="animate-pulse">⏰</span>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
      </div>
      <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Clockwise
      </h1>
    </div>
  )
} 