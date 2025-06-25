import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { styles } from './Timer.styles'

interface TimerProps {
  startTime: Date | null
  className?: string
}

export function Timer({ startTime, className }: TimerProps) {
  const [time, setTime] = useState('00:00:00')

  useEffect(() => {
    if (!startTime) {
      setTime('00:00:00')
      return
    }

    const updateTimer = () => {
      const now = new Date()
      const diff = now.getTime() - startTime.getTime()

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTime(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      )
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  return (
    <div className={twMerge(styles.timer, !startTime && styles.inactive, className)}>{time}</div>
  )
}
