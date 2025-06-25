import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge('flex flex-col items-center justify-center', 'p-6 text-center'),
  icon: twMerge('text-4xl text-red-500 mb-4'),
  title: twMerge('text-lg font-semibold text-gray-900 dark:text-gray-100', 'mb-2'),
  message: twMerge('text-sm text-gray-600 dark:text-gray-400', 'mb-4'),
  action: twMerge('mt-2'),
  inline: twMerge('text-sm text-red-500 dark:text-red-400', 'mt-1'),
}
