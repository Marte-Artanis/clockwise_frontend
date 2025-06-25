import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge(
    'fixed bottom-0 inset-x-0',
    'bg-secondary/80 backdrop-blur',
    'border-t border-white/10',
    'flex justify-around items-center',
    'h-14',
    'sm:hidden'
  ),
  item: twMerge(
    'flex flex-col items-center justify-center',
    'flex-1',
    'text-text/60',
    'hover:text-text',
    'transition-colors'
  ),
  itemActive: twMerge('text-primary'),
}
