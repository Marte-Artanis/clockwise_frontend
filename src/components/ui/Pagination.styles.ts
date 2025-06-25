import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge('flex items-center justify-between', 'w-full', 'mt-4'),
  pageInfo: twMerge('text-sm text-text/70'),
  controls: twMerge('flex items-center gap-2'),
  pageButton: twMerge(
    'w-8 h-8',
    'flex items-center justify-center',
    'rounded-md',
    'text-sm',
    'transition-colors',
    'hover:bg-white/5',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:hover:bg-transparent'
  ),
  pageButtonActive: twMerge('bg-primary/20 text-primary', 'hover:bg-primary/30'),
  pageButtonIcon: twMerge('w-4 h-4'),
}
