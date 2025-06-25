import { styles } from './BottomNav.styles'

type Tab = 'timer' | 'history'

interface Props {
  active: Tab
  onChange: (tab: Tab) => void
}

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav className={styles.container}>
      <button
        className={active === 'timer' ? `${styles.item} ${styles.itemActive}` : styles.item}
        onClick={() => onChange('timer')}
        aria-current={active==='timer'? 'page': undefined}
        aria-label="Timer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mb-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-xs">Timer</span>
      </button>

      <button
        className={active === 'history' ? `${styles.item} ${styles.itemActive}` : styles.item}
        onClick={() => onChange('history')}
        aria-current={active==='history'? 'page': undefined}
        aria-label="Histórico"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mb-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        <span className="text-xs">Histórico</span>
      </button>
    </nav>
  )
} 