import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge(
    'min-h-screen w-full',
    'bg-background text-text'
  ),
  header: twMerge(
    'w-full h-16',
    'bg-secondary/20 backdrop-blur-sm',
    'border-b border-white/10',
    'px-4 sm:px-6 lg:px-8',
    'flex items-center justify-between',
    'fixed top-0 z-10'
  ),
  headerLeft: twMerge(
    'flex items-center gap-4'
  ),
  headerRight: twMerge(
    'flex items-center gap-4',
    'text-text/70'
  ),
  userInfo: twMerge(
    'flex items-center gap-3',
    'py-1 px-3',
    'rounded-full',
    'bg-white/5',
    'border border-white/10'
  ),
  userAvatar: twMerge(
    'w-6 h-6',
    'rounded-full',
    'bg-primary/20',
    'flex items-center justify-center',
    'text-xs font-medium text-primary'
  ),
  userName: twMerge(
    'text-sm font-medium text-text',
    'hidden sm:block'
  ),
  logoutButton: twMerge(
    'text-sm text-text/70 hover:text-error transition-colors',
    'flex items-center gap-2'
  ),
  main: twMerge(
    'container mx-auto',
    'px-4 sm:px-6 lg:px-8',
    'pt-24 pb-24 sm:pb-8',
    'space-y-8'
  ),
  centralArea: twMerge(
    'mx-auto',
    'flex flex-col items-center gap-8',
    'w-full max-w-[1200px]'
  ),
  timerArea: twMerge(
    'max-w-2xl w-full',
    'flex flex-col items-center gap-8'
  ),
  tabs: twMerge(
    'hidden sm:flex items-center gap-2',
    'p-1',
    'bg-secondary/20 rounded-lg'
  ),
  tab: twMerge(
    'px-4 py-2',
    'text-sm text-text/70',
    'rounded-md',
    'transition-colors',
    'hover:text-text'
  ),
  tabActive: twMerge(
    'bg-primary text-text',
    'hover:text-text'
  ),
  timer: twMerge(
    'text-6xl font-mono text-primary',
    'tabular-nums'
  ),
  status: twMerge(
    'text-sm text-text/70'
  ),
  statsGrid: twMerge(
    'grid grid-cols-1 sm:grid-cols-3 gap-4',
    'w-full'
  ),
  card: twMerge(
    'flex flex-col items-center gap-2',
    'p-4',
    'bg-secondary/20 rounded-lg'
  ),
  cardLabel: twMerge(
    'text-sm text-text/70'
  ),
  cardValue: twMerge(
    'text-xl font-mono text-text',
    'tabular-nums'
  )
} 