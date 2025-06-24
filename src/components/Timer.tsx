import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

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
    <div 
      className={twMerge(
        'font-mono font-bold',
        'text-2xl sm:text-3xl md:text-4xl',
        'transition-all duration-300',
        !startTime && 'opacity-50',
        className
      )}
    >
      {time}
    </div>
  )
} 