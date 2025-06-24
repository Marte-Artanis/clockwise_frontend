import { useState } from 'react'
import { Logo } from '../../components/ui/Logo'
import { Timer } from '../../components/Timer'
import { History } from './History'
import { Button } from '../../components/ui/Button'
import { styles } from './Dashboard.styles'

type Tab = 'timer' | 'history'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('timer')
  const [isWorking, setIsWorking] = useState(false)
  const [startTime, setStartTime] = useState<Date | undefined>()
  const userName = "Usuário" // Isso viria da autenticação
  const userInitial = userName.charAt(0)

  const handleClockInOut = () => {
    if (isWorking) {
      setStartTime(undefined)
    } else {
      setStartTime(new Date())
    }
    setIsWorking(!isWorking)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Logo size="sm" />
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {userInitial}
            </div>
            <span className={styles.userName}>
              Olá, {userName}
            </span>
          </div>
          <button className={styles.logoutButton}>
            <span>Sair</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.centralArea}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'timer' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('timer')}
            >
              Timer
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'history' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Histórico
            </button>
          </div>

          {activeTab === 'timer' ? (
            <>
              <Timer startTime={startTime} className={styles.timer} />
              <p className={styles.status}>
                {isWorking ? 'Trabalhando' : 'Não registrado'}
              </p>
              <Button 
                onClick={handleClockInOut} 
                variant={isWorking ? 'error' : 'success'}
                size="lg"
              >
                {isWorking ? 'Finalizar Turno' : 'Iniciar Turno'}
              </Button>

              <div className={styles.statsGrid}>
                <div className={styles.card}>
                  <span className={styles.cardLabel}>Hoje</span>
                  <span className={styles.cardValue}>8h 30m</span>
                </div>
                <div className={styles.card}>
                  <span className={styles.cardLabel}>Esta Semana</span>
                  <span className={styles.cardValue}>32h 15m</span>
                </div>
                <div className={styles.card}>
                  <span className={styles.cardLabel}>Este Mês</span>
                  <span className={styles.cardValue}>120h 45m</span>
                </div>
              </div>
            </>
          ) : (
            <History />
          )}
        </div>
      </main>
    </div>
  )
} 