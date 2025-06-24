import { useState } from 'react'
import { Table } from '../../components/ui/Table'
import { styles } from './History.styles'

// Tipos
interface ClockEntry {
  id: string
  date: string
  clockIn: string
  clockOut: string | null
  duration: string
  notes?: string
  status: 'active' | 'completed'
}

// Dados mockados
const mockData: ClockEntry[] = [
  {
    id: '1',
    date: '2024-03-18',
    clockIn: '09:00',
    clockOut: '17:00',
    duration: '8h',
    notes: 'Projeto Clockwise',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-03-19',
    clockIn: '08:30',
    clockOut: null,
    duration: '2h 30min',
    status: 'active'
  },
  {
    id: '3',
    date: '2024-03-17',
    clockIn: '10:00',
    clockOut: '18:30',
    duration: '8h 30min',
    notes: 'Reuniões e desenvolvimento',
    status: 'completed'
  }
]

export function History() {
  const [sortKey, setSortKey] = useState<string>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const columns = [
    {
      key: 'date',
      header: 'Data',
      sortable: true,
      render: (entry: ClockEntry) => (
        <span className={styles.date}>
          {new Date(entry.date).toLocaleDateString('pt-BR')}
        </span>
      )
    },
    {
      key: 'clockIn',
      header: 'Entrada',
      sortable: true
    },
    {
      key: 'clockOut',
      header: 'Saída',
      render: (entry: ClockEntry) => entry.clockOut || '-'
    },
    {
      key: 'duration',
      header: 'Duração',
      sortable: true,
      render: (entry: ClockEntry) => (
        <span className={styles.duration}>
          {entry.duration}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (entry: ClockEntry) => (
        <span className={styles.status[entry.status]}>
          {entry.status === 'active' ? 'Em andamento' : 'Finalizado'}
        </span>
      )
    },
    {
      key: 'notes',
      header: 'Notas',
      render: (entry: ClockEntry) => (
        <span className={styles.notes}>
          {entry.notes || '-'}
        </span>
      )
    }
  ]

  // Ordenação dos dados
  const sortedData = [...mockData].sort((a, b) => {
    if (sortKey === 'date') {
      return sortDirection === 'asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    }
    return 0
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Histórico de Registros</h2>
      </div>
      
      <Table
        data={sortedData}
        columns={columns}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
      />
    </div>
  )
} 