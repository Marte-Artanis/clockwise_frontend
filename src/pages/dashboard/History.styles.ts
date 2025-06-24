import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge(
    'w-full',
    'animate-fadeIn'
  ),
  header: twMerge(
    'flex items-center justify-between',
    'mb-6'
  ),
  title: twMerge(
    'text-xl font-semibold text-text'
  ),
  filters: twMerge(
    'flex items-center gap-4',
    'mb-6'
  ),
  status: {
    active: twMerge(
      'text-xs px-2 py-1 rounded-full',
      'bg-accent/20 text-accent'
    ),
    completed: twMerge(
      'text-xs px-2 py-1 rounded-full',
      'bg-primary/20 text-primary'
    )
  },
  date: twMerge(
    'text-text/70'
  ),
  duration: twMerge(
    'font-mono'
  ),
  notes: twMerge(
    'max-w-xs truncate',
    'text-text/70'
  )
} 