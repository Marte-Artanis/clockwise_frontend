import { twMerge } from 'tailwind-merge'

export const styles = {
  timer: twMerge(
    'font-mono font-bold',
    'text-2xl sm:text-3xl md:text-4xl',
    'transition-all duration-300'
  ),
  inactive: twMerge('opacity-50')
} 