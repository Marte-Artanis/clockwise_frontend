import { useState } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { ExportButton } from './ExportButton'
import { styles } from './Stats.styles'

type Period = 'week' | 'month' | 'year'

// Mock data - Será substituído por dados reais da API
const mockData = {
  week: {
    hours: [
      { day: 'Seg', hours: 8 },
      { day: 'Ter', hours: 8.5 },
      { day: 'Qua', hours: 7.5 },
      { day: 'Qui', hours: 9 },
      { day: 'Sex', hours: 8 },
      { day: 'Sáb', hours: 4 },
      { day: 'Dom', hours: 0 }
    ],
    distribution: [
      { range: '4-6h', count: 1 },
      { range: '6-8h', count: 1 },
      { range: '8-10h', count: 4 },
      { range: '10h+', count: 0 }
    ],
    records: Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return {
        date: date.toLocaleDateString('pt-BR'),
        clockIn: '08:30',
        clockOut: i === 0 ? '-' : '17:00',
        duration: i === 0 ? '2h 30min' : '8h 30min',
        status: i === 0 ? 'Em andamento' : 'Finalizado',
        notes: i === 0 ? '-' : `Registro do dia ${date.toLocaleDateString('pt-BR')}`
      }
    })
  },
  month: {
    hours: Array.from({ length: 30 }, (_, i) => ({
      day: `${i + 1}`,
      hours: Math.random() * 4 + 6 // 6-10h
    })),
    distribution: [
      { range: '4-6h', count: 5 },
      { range: '6-8h', count: 10 },
      { range: '8-10h', count: 12 },
      { range: '10h+', count: 3 }
    ],
    records: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 2, i + 1).toLocaleDateString('pt-BR'),
      clockIn: '08:30',
      clockOut: '17:00',
      duration: '8h 30min',
      status: 'Finalizado',
      notes: `Registro ${i + 1}`
    }))
  },
  year: {
    hours: Array.from({ length: 12 }, (_, i) => ({
      day: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
      hours: Math.floor(Math.random() * 40 + 140) // 140-180h
    })),
    distribution: [
      { range: '120-140h', count: 2 },
      { range: '140-160h', count: 5 },
      { range: '160-180h', count: 4 },
      { range: '180h+', count: 1 }
    ],
    records: Array.from({ length: 12 }, (_, i) => ({
      date: new Date(2024, i, 1).toLocaleDateString('pt-BR'),
      clockIn: '08:30',
      clockOut: '17:00',
      duration: '160h',
      status: 'Finalizado',
      notes: `Mês ${i + 1}`
    }))
  }
}

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p className={styles.tooltipValue}>
        {payload[0].value.toFixed(1)}
        {payload[0].name === 'hours' ? 'h' : ''}
      </p>
    </div>
  )
}

export function Stats() {
  const [period, setPeriod] = useState<Period>('week')

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Estatísticas</h2>
        <div className="flex items-center gap-4">
          <div className={styles.periodSelector}>
            <button
              className={`${styles.periodButton} ${period === 'week' ? styles.periodButtonActive : ''}`}
              onClick={() => setPeriod('week')}
            >
              Semana
            </button>
            <button
              className={`${styles.periodButton} ${period === 'month' ? styles.periodButtonActive : ''}`}
              onClick={() => setPeriod('month')}
            >
              Mês
            </button>
            <button
              className={`${styles.periodButton} ${period === 'year' ? styles.periodButtonActive : ''}`}
              onClick={() => setPeriod('year')}
            >
              Ano
            </button>
          </div>
          <ExportButton
            data={mockData[period].records}
            period={period}
          />
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Horas Trabalhadas</h3>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData[period].hours}>
                <defs>
                  <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={value => `${value}h`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  fill="url(#hoursGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Distribuição de Horas</h3>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData[period].distribution}>
                <XAxis
                  dataKey="range"
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="#7C3AED"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 