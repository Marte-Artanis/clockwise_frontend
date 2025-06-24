import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge(
    'flex flex-wrap items-center gap-4',
    'mb-6'
  ),
  field: twMerge(
    'flex flex-col gap-1'
  ),
  label: twMerge(
    'text-sm text-text/50'
  ),
  select: twMerge(
    'bg-white/5',
    'border border-white/10',
    'rounded-lg',
    'px-3 py-2',
    'text-sm text-text',
    'focus:outline-none focus:border-primary',
    'transition-colors'
  ),
  dateInput: twMerge(
    'bg-white/5',
    'border border-white/10',
    'rounded-lg',
    'px-3 py-2',
    'text-sm text-text',
    'focus:outline-none focus:border-primary',
    'transition-colors',
    '[color-scheme:dark]'
  )
} 