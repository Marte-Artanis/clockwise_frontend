import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge(
    'space-y-6'
  ),
  header: twMerge(
    'flex items-center justify-between'
  ),
  title: twMerge(
    'text-lg font-medium'
  ),
  periodSelector: twMerge(
    'flex items-center gap-2',
    'p-1',
    'bg-secondary/20 rounded-lg'
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
    'grid grid-cols-1 lg:grid-cols-2 gap-6'
  ),
  card: twMerge(
    'p-4',
    'bg-secondary/20 rounded-lg',
    'space-y-4'
  ),
  cardHeader: twMerge(
    'flex items-center justify-between'
  ),
  cardTitle: twMerge(
    'text-sm font-medium text-text/70'
  ),
  chartContainer: twMerge(
    'w-full h-[200px]',
    '-ml-4' // Compensar o padding do recharts
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
  )
} 