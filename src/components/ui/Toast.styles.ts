import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge(
    'fixed bottom-4 right-4 z-50',
    'flex flex-col gap-2'
  ),
  toast: (type: 'success' | 'error' | 'info') => twMerge(
    'flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg',
    'animate-slide-up',
    type === 'success' && 'bg-green-500 text-white',
    type === 'error' && 'bg-red-500 text-white',
    type === 'info' && 'bg-purple-500 text-white'
  ),
  message: 'text-sm font-medium',
  closeButton: twMerge(
    'ml-auto text-white/80 hover:text-white',
    'transition-colors duration-200'
  )
} 