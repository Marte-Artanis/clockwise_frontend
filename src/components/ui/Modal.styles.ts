import { twMerge } from 'tailwind-merge'

export const styles = {
  overlay: twMerge(
    'fixed inset-0',
    'bg-black/50 backdrop-blur-sm',
    'flex items-center justify-center',
    'z-50',
    'animate-fadeIn'
  ),
  container: twMerge(
    'w-full h-full sm:h-auto sm:max-w-lg',
    'bg-secondary/80 backdrop-blur-lg',
    'rounded-none sm:rounded-lg',
    'border border-white/10',
    'shadow-xl',
    'p-4 sm:p-6',
    'animate-slideUpAndFade',
    'flex flex-col'
  ),
  header: twMerge(
    'flex items-center justify-between',
    'mb-6'
  ),
  title: twMerge(
    'text-xl font-semibold text-text'
  ),
  closeButton: twMerge(
    'text-text/50 hover:text-text',
    'transition-colors'
  ),
  content: twMerge(
    'space-y-6',
    'flex-1 overflow-y-auto'
  ),
  footer: twMerge(
    'flex items-center justify-end gap-3',
    'mt-8 pt-6',
    'border-t border-white/10'
  )
} 