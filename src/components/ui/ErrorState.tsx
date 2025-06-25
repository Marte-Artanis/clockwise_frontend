import { Button } from './Button'
import { styles } from './ErrorState.styles'

interface ErrorStateProps {
  title?: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
}

interface InlineErrorProps {
  message: string
}

export function ErrorState({ title = 'Ops, algo deu errado!', message, action }: ErrorStateProps) {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>⚠️</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {action && (
        <div className={styles.action}>
          <Button onClick={action.onClick} variant="secondary">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
}

export function InlineError({ message }: InlineErrorProps) {
  return (
    <p className={styles.inline} role="alert">
      {message}
    </p>
  )
}
