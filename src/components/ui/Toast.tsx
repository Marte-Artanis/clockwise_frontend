import { useEffect, useState } from 'react'
import { styles } from './Toast.styles'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose: () => void
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className={styles.toast(type)}>
      {type === 'success' && <span>✓</span>}
      {type === 'error' && <span>✕</span>}
      {type === 'info' && <span>ℹ</span>}
      <span className={styles.message}>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false)
          onClose()
        }}
        className={styles.closeButton}
        aria-label="Fechar notificação"
      >
        ✕
      </button>
    </div>
  )
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>
}
