import { twMerge } from 'tailwind-merge'

export const styles = {
  button: twMerge(
    'flex items-center gap-2',
    'px-3 sm:px-4 py-2',
    'bg-secondary/20',
    'border border-white/10',
    'rounded-lg',
    'text-sm text-text/70',
    'transition-colors',
    'hover:bg-secondary/30',
    'hover:text-text',
    'whitespace-nowrap'
  ),
  menu: twMerge(
    'absolute right-0 mt-2',
    'w-48 sm:w-56',
    'bg-background',
    'border border-white/10',
    'rounded-lg',
    'shadow-lg',
    'py-1',
    'z-50'
  ),
  menuItem: twMerge(
    'w-full',
    'px-3 sm:px-4 py-2',
    'text-sm text-text/70',
    'flex items-center gap-2',
    'transition-colors',
    'hover:bg-white/5',
    'hover:text-text'
  ),
  menuDivider: twMerge(
    'h-px',
    'my-1',
    'bg-white/10'
  ),
  menuHeader: twMerge(
    'px-3 sm:px-4 py-2',
    'text-xs font-medium text-text/50',
    'uppercase'
  )
} 