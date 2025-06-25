import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge(
    'flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4',
    'mb-4 sm:mb-6'
  ),
  field: twMerge('flex flex-col gap-1', 'w-full sm:w-auto'),
  label: twMerge('text-sm text-text/50'),
  select: twMerge(
    'w-full sm:w-auto',
    'appearance-none',
    'bg-secondary',
    'border border-white/20',
    'rounded-lg',
    'px-3 py-2 pr-8',
    'text-sm text-text',
    'focus:outline-none focus:border-primary',
    'transition-colors'
  ),
  dateInput: twMerge(
    'w-full sm:w-auto',
    'bg-secondary',
    'border border-white/20',
    'rounded-lg',
    'px-3 py-2',
    'text-sm text-text',
    'focus:outline-none focus:border-primary',
    'transition-colors',
    '[color-scheme:dark]'
  ),
}
