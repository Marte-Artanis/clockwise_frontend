import { twMerge } from 'tailwind-merge'

export const styles = {
  container: twMerge(
    'min-h-screen w-full',
    'flex items-center justify-center',
    'bg-gradient-to-br from-background to-background/95',
    'p-4 sm:p-6 md:p-8'
  ),
  content: twMerge(
    'w-full max-w-sm',
    'space-y-8',
    'animate-fadeIn'
  ),
  logoContainer: twMerge(
    'flex flex-col items-center',
    'mb-12 sm:mb-16'
  ),
  logoWrapper: "flex items-center gap-3 text-4xl font-bold text-primary",
  logoIcon: "text-3xl",
  formWrapper: twMerge(
    'space-y-6',
    'p-6 sm:p-8',
    'backdrop-blur-sm'
  ),
  formHeader: twMerge(
    'space-y-2',
    'text-center'
  ),
  formTitle: twMerge(
    'text-xl sm:text-2xl font-bold',
    'text-text',
    'animate-fadeIn'
  ),
  formSubtitle: twMerge(
    'text-sm text-text/70',
    'animate-fadeIn [animation-delay:200ms]'
  ),
  errorMessage: twMerge(
    'p-3 rounded-lg',
    'bg-error/10 border border-error/20',
    'text-sm text-error',
    'animate-shake'
  ),
  submitButton: twMerge(
    'w-full',
    'mt-8',
    'animate-fadeIn [animation-delay:400ms]'
  ),
  inputGroup: twMerge(
    'space-y-4',
    'animate-fadeIn [animation-delay:300ms]'
  )
} 