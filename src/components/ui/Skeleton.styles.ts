import { twMerge } from 'tailwind-merge'

export const styles = {
  base: twMerge('animate-pulse rounded', 'bg-gray-200 dark:bg-gray-700'),
  text: twMerge('h-4 w-3/4'),
  title: twMerge('h-6 w-1/2'),
  avatar: twMerge('h-12 w-12 rounded-full'),
  card: twMerge('h-32 w-full'),
  button: twMerge('h-10 w-24'),
}
