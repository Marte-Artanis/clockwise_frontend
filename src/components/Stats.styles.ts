import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge(
    'space-y-4 sm:space-y-6'
  ),
  header: twMerge(
    'flex flex-col sm:flex-row sm:items-center sm:justify-between',
    'gap-4'
  ),
  title: twMerge(
    'text-lg font-medium'
  ),
  periodSelector: twMerge(
    'flex items-center gap-2',
    'p-1',
    'bg-secondary/20 rounded-lg',
    'self-start sm:self-auto'
  ),
  periodButton: twMerge(
    'px-3 py-1',
    'text-sm text-text/70',
    'rounded-md',
    'transition-colors',
    'hover:text-text'
  ),
  periodButtonActive: twMerge(
    'bg-primary text-text',
    'hover:text-text'
  ),
  grid: twMerge(
    'grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'
  ),
  card: twMerge(
    'p-3 sm:p-4',
    'bg-secondary/20 rounded-lg',
    'space-y-3 sm:space-y-4'
  ),
  cardHeader: twMerge(
    'flex items-center justify-between'
  ),
  cardTitle: twMerge(
    'text-sm font-medium text-text/70'
  ),
  chartContainer: twMerge(
    'w-full h-[180px] sm:h-[200px]',
    '-ml-2 sm:-ml-4' // Compensar o padding do recharts
  ),
  tooltip: twMerge(
    'px-3 py-2',
    'bg-background/90 backdrop-blur-sm',
    'border border-white/10',
    'rounded-lg',
    'shadow-lg'
  ),
  tooltipLabel: twMerge(
    'text-xs font-medium text-text/70'
  ),
  tooltipValue: twMerge(
    'text-sm font-medium text-text'
  ),
  cursorFill: 'rgba(124,58,237,0.1)'
} 