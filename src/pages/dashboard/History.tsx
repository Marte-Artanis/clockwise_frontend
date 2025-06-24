import { useState } from 'react'
import { Table } from '../../components/ui/Table'
import { Modal } from '../../components/ui/Modal'
import { ClockDetails } from '../../components/ClockDetails'
import { HistoryFilters } from '../../components/HistoryFilters'
import { Pagination } from '../../components/ui/Pagination'
import { Stats } from '../../components/Stats'
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

interface Filters {
  startDate: string
  endDate: string
  status: 'all' | 'active' | 'completed'
  duration: 'all' | 'short' | 'medium' | 'long'
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

const ITEMS_PER_PAGE = 10

export function History() {
  const [selectedRecord, setSelectedRecord] = useState<ClockEntry | null>(null)
  const [sortKey, setSortKey] = useState<string>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    status: 'all',
    duration: 'all'
  })
  const [currentPage, setCurrentPage] = useState(1)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const handleDelete = (id: string) => {
    // TODO: Implementar deleção
    console.log('Delete:', id)
  }

  const handleSave = (id: string, notes: string) => {
    // TODO: Implementar salvamento
    console.log('Save:', id, notes)
  }

  // Filtragem dos dados
  const filteredData = mockData.filter(entry => {
    // Filtro por data
    if (filters.startDate && entry.date < filters.startDate) return false
    if (filters.endDate && entry.date > filters.endDate) return false

    // Filtro por status
    if (filters.status !== 'all' && entry.status !== filters.status) return false

    // Filtro por duração
    if (filters.duration !== 'all') {
      const hours = parseFloat(entry.duration.split('h')[0])
      if (filters.duration === 'short' && hours >= 4) return false
      if (filters.duration === 'medium' && (hours < 4 || hours > 8)) return false
      if (filters.duration === 'long' && hours <= 8) return false
    }

    return true
  })

  // Ordenação dos dados
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortKey === 'date') {
      return sortDirection === 'asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    }
    return 0
  })

  // Calcular dados paginados
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = sortedData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE)

  const columns = [
    {
      key: 'date',
      header: 'Data',
      sortable: true,
      width: 'date' as const
    },
    {
      key: 'clockIn',
      header: 'Entrada',
      sortable: true,
      width: 'time' as const
    },
    {
      key: 'clockOut',
      header: 'Saída',
      render: (entry: ClockEntry) => entry.clockOut || '-',
      width: 'time' as const
    },
    {
      key: 'duration',
      header: 'Duração',
      sortable: true,
      width: 'duration' as const
    },
    {
      key: 'status',
      header: 'Status',
      width: 'status' as const,
      render: (entry: ClockEntry) => (
        <span className={`
          px-2 py-1 rounded-full text-xs
          ${entry.status === 'active' 
            ? 'bg-primary/20 text-primary' 
            : 'bg-purple-500/20 text-purple-500'
          }
        `}>
          {entry.status === 'active' ? 'Em andamento' : 'Finalizado'}
        </span>
      )
    },
    {
      key: 'notes',
      header: 'Notas',
      width: 'notes' as const
    }
  ]

  return (
    <div className={styles.container}>
      <Stats />

      <div className="mt-8">
        <HistoryFilters
          filters={filters}
          onFilterChange={setFilters}
        />
        
        <Table
          data={paginatedData}
          columns={columns}
          onSort={handleSort}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onRowClick={setSelectedRecord}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={sortedData.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />

        <Modal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title="Detalhes do Registro"
        >
          {selectedRecord && (
            <ClockDetails
              entry={selectedRecord}
              onClose={() => setSelectedRecord(null)}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          )}
        </Modal>
      </div>
    </div>
  )
} 