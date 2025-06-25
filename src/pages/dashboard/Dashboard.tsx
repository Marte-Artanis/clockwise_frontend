import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Logo } from '../../components/ui/Logo'
import { Timer } from '../../components/Timer'
import { History } from './History'
import { Button } from '../../components/ui/Button'
import { styles } from './Dashboard.styles'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { clockService } from '../../services/clock'
import { useAuth } from '../../contexts/AuthContext'
import { BottomNav } from '../../components/ui/BottomNav'

type Tab = 'timer' | 'history'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('timer')

  const queryClient = useQueryClient()

  const { data: status } = useQuery({ queryKey: ['clock-status'], queryFn: clockService.getStatus })

  const isWorking = status?.data.is_clocked_in ?? false
  const startTimeStr = status?.data.current_entry?.clockIn ?? null

  const startTime = startTimeStr ? new Date(startTimeStr) : null

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['clock-status'] })
    queryClient.invalidateQueries({ queryKey: ['clock-today'] })
    queryClient.invalidateQueries({ queryKey: ['clock-week'] })
    queryClient.invalidateQueries({ queryKey: ['clock-month'] })
    queryClient.invalidateQueries({ queryKey: ['stats'] })
  }

  // Mutations de clock-in e clock-out
  const clockInMutation = useMutation({
    mutationFn: () => clockService.clockIn(),
    onSuccess: invalidate,
  })

  const clockOutMutation = useMutation({
    mutationFn: () => clockService.clockOut(),
    onSuccess: invalidate,
  })

  const handleClockInOut = () => {
    if (isWorking) {
      clockOutMutation.mutate()
    } else {
      clockInMutation.mutate()
    }
  }

  // Estatísticas
  const { data: todayStats } = useQuery({
    queryKey: ['clock-today'],
    queryFn: clockService.getToday,
  })
  const { data: weekStats } = useQuery({ queryKey: ['clock-week'], queryFn: clockService.getWeek })
  const { data: monthStats } = useQuery({
    queryKey: ['clock-month'],
    queryFn: clockService.getMonth,
  })

  // Usuário real do contexto
  const { user } = useAuth()
  const userName = user?.name ?? 'Usuário'
  const userInitial = userName.charAt(0)

  useEffect(() => {
    document.title = 'Clockwise | Dashboard'
  }, [])

  // Formatar total de horas em HHh MMm SSs
  const formatHMS = (h?: number) => {
    if (h === undefined) return '--'
    const totalSec = Math.round(h * 3600)
    const hrs = Math.floor(totalSec / 3600)
    const mins = Math.floor((totalSec % 3600) / 60)
    const secs = totalSec % 60
    return `${String(hrs).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Logo size="sm" />
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>{userInitial}</div>
            <span className={styles.userName}>Olá, {userName}</span>
          </div>
          <button className={styles.logoutButton}>
            <span>Sair</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
            <div className={styles.timerArea}>
              <Timer startTime={startTime} className={styles.timer} />
              <p className={styles.status}>{isWorking ? 'Trabalhando' : 'Não registrado'}</p>
              <Button
                onClick={handleClockInOut}
                variant={isWorking ? 'error' : 'success'}
                size="lg"
                isLoading={clockInMutation.isPending || clockOutMutation.isPending}
              >
                {isWorking ? 'Finalizar Turno' : 'Iniciar Turno'}
              </Button>

              <div className={styles.statsGrid}>
                <div className={styles.card}>
                  <span className={styles.cardLabel}>Hoje</span>
                  <span className={styles.cardValue}>{formatHMS(todayStats?.data.totalHours)}</span>
                </div>
                <div className={styles.card}>
                  <span className={styles.cardLabel}>Esta Semana</span>
                  <span className={styles.cardValue}>{formatHMS(weekStats?.data.totalHours)}</span>
                </div>
                <div className={styles.card}>
                  <span className={styles.cardLabel}>Este Mês</span>
                  <span className={styles.cardValue}>{formatHMS(monthStats?.data.totalHours)}</span>
                </div>
              </div>
            </div>
          ) : (
            <History />
          )}
        </div>
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </motion.div>
  )
}
