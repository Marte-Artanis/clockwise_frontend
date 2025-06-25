import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge('w-full', 'overflow-x-auto'),
  table: twMerge('w-full', 'border-collapse', 'min-w-full table-fixed'),
  thead: twMerge('bg-secondary/20', 'border-b border-white/10'),
  th: twMerge('px-4 py-3', 'text-left text-sm font-medium text-text/70', 'whitespace-nowrap'),
  tbody: twMerge('divide-y divide-white/10'),
  tr: twMerge('hover:bg-white/5', 'transition-colors duration-200'),
  td: twMerge('px-4 py-3', 'text-sm text-text', 'whitespace-nowrap'),
  empty: twMerge('text-center py-8', 'text-text/50 text-sm'),
  sortButton: twMerge('flex items-center gap-2', 'hover:text-text transition-colors', 'w-full'),
  sortIcon: twMerge('w-4 h-4', 'transition-transform duration-200'),
  // Larguras específicas para cada coluna
  col: {
    date: 'w-[120px]',
    time: 'w-[100px]',
    duration: 'w-[100px]',
    status: 'w-[120px]',
    notes: 'w-auto min-w-[200px]',
  },
}
