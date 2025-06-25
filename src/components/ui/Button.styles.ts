import { twMerge } from 'tailwind-merge'

export const styles = {
  base: twMerge(
    'flex items-center justify-center gap-2',
    'font-medium rounded-lg',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
  // Variants
  primary: twMerge('bg-primary hover:bg-primary/90', 'text-white'),
  secondary: twMerge('bg-secondary hover:bg-secondary/90', 'text-white'),
  ghost: twMerge('bg-transparent hover:bg-white/10', 'text-white'),
  success: twMerge('bg-accent hover:bg-accent/90', 'text-white'),
  error: twMerge('bg-error hover:bg-error/90', 'text-white'),
  // Sizes
  sm: twMerge('text-sm', 'px-3 py-1.5'),
  md: twMerge('text-base', 'px-4 py-2'),
  lg: twMerge('text-lg', 'px-6 py-3'),
  // States
  loading: 'opacity-80 cursor-wait',
  loadingSpinner: 'animate-spin h-4 w-4',
}
