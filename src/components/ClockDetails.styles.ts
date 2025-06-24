import { twMerge } from 'tailwind-merge'

export const styles = {
  grid: twMerge(
    'grid grid-cols-2 gap-6'
  ),
  field: twMerge(
    'flex flex-col gap-1'
  ),
  label: twMerge(
    'text-sm text-text/50'
  ),
  value: twMerge(
    'text-text'
  ),
  status: {
    active: twMerge(
      'text-sm px-2 py-1 rounded-full',
      'bg-accent/20 text-accent',
      'inline-block'
    ),
    completed: twMerge(
      'text-sm px-2 py-1 rounded-full',
      'bg-primary/20 text-primary',
      'inline-block'
    )
  },
  notes: twMerge(
    'col-span-2',
    'flex flex-col gap-1'
  ),
  notesInput: twMerge(
    'w-full',
    'bg-white/5',
    'border border-white/10',
    'rounded-lg',
    'p-3',
    'text-text',
    'resize-none',
    'focus:outline-none focus:border-primary',
    'transition-colors'
  ),
  actions: twMerge(
    'col-span-2',
    'flex items-center gap-3'
  ),
  deleteButton: twMerge(
    'text-sm text-error/70 hover:text-error',
    'transition-colors'
  )
} 