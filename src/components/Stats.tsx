import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { clockService } from '../services/clock'
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

// Helpers para formatar dias/meses
const weekDayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function aggregateHours(entries: any[], period: 'week' | 'month' | 'year') {
  if (period === 'week') {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    start.setDate(start.getDate() - start.getDay()) // sunday

    const result = Array.from({ length: 7 }, (_, i) => ({ day: weekDayLabels[i], hours: 0 }))
    entries.forEach(e => {
      if (!e.clockOut) return
      const date = new Date(e.clockIn)
      const idx = date.getDay()
      const h = (new Date(e.clockOut).getTime() - new Date(e.clockIn).getTime()) / 3600000
      result[idx].hours += h
    })
    return result
  }
  if (period === 'month') {
    const now = new Date();
    const totalDays = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    const result = Array.from({ length: totalDays }, (_, i) => ({ day: `${i+1}`, hours: 0 }))
    entries.forEach(e=>{
      if(!e.clockOut) return
      const d=new Date(e.clockIn);
      const idx=d.getDate()-1;
      const h=(new Date(e.clockOut).getTime()-new Date(e.clockIn).getTime())/3600000;
      result[idx].hours+=h;
    })
    return result
  }
  // year
  const result = monthLabels.map((m) => ({ day: m, hours: 0 }))
  entries.forEach(e=>{
    if(!e.clockOut) return
    const d=new Date(e.clockIn);
    const idx=d.getMonth();
    const h=(new Date(e.clockOut).getTime()-new Date(e.clockIn).getTime())/3600000;
    result[idx].hours+=h;
  })
  return result
}

function hoursDistribution(entries: any[]) {
  let counts = { short:0, medium:0, long:0 }
  entries.forEach(e=>{
    if(!e.clockOut) return
    const h=(new Date(e.clockOut).getTime()-new Date(e.clockIn).getTime())/3600000;
    if(h<4) counts.short++
    else if(h<=8) counts.medium++
    else counts.long++
  })
  return [
    { range:'0-4h', count:counts.short },
    { range:'4-8h', count:counts.medium },
    { range:'8h+', count:counts.long }
  ]
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

  const now = new Date()
  let startDate: string | undefined
  if (period === 'week') {
    const start = new Date(now)
    start.setDate(now.getDate() - 6)
    start.setHours(0,0,0,0)
    startDate = start.toISOString().split('T')[0]
  } else if (period === 'month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    startDate = start.toISOString().split('T')[0]
  } else if (period === 'year') {
    const start = new Date(now.getFullYear(), 0, 1)
    startDate = start.toISOString().split('T')[0]
  }

  const { data, isLoading } = useQuery({
    queryKey: ['stats', period],
    queryFn: () =>
      clockService.getHistory({ page: 1, limit: 1000 }, { start_date: startDate }),
  })

  const processed = useMemo(()=>{
    const entries = (data?.data.entries as any[]) || []
    const hoursArr = aggregateHours(entries, period)
    const distribution = hoursDistribution(entries)
    const records = entries.map(e=>({
      date: new Date(e.clockIn).toLocaleDateString('pt-BR'),
      clockIn: new Date(e.clockIn).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
      clockOut: e.clockOut ? new Date(e.clockOut).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '-',
      duration: e.clockOut ? `${(((new Date(e.clockOut).getTime()-new Date(e.clockIn).getTime())/3600000).toFixed(2))}h` : '-',
      status: e.clockOut ? 'Finalizado' : 'Em andamento',
      notes: e.description || '-'
    }))
    return { hours: hoursArr, distribution, records }
  }, [data, period])

  if (isLoading) {
    return <p className="text-center py-8">Carregando...</p>
  }

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
            data={processed.records}
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
              <AreaChart data={processed.hours}>
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
                <Tooltip content={<CustomTooltip />} cursor={{ fill: styles.cursorFill }} />
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
              <BarChart data={processed.distribution}>
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
                <Tooltip content={<CustomTooltip />} cursor={{ fill: styles.cursorFill }} />
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