import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Table } from '../../components/ui/Table'
import { Modal } from '../../components/ui/Modal'
import { ClockDetails } from '../../components/ClockDetails'
import { HistoryFilters } from '../../components/HistoryFilters'
import { Pagination } from '../../components/ui/Pagination'
import { Stats } from '../../components/Stats'
import { styles } from './History.styles'
import { clockService } from '../../services/clock'

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

// Os dados reais virão da API; fallback para vetor vazio
const EMPTY_DATA: ClockEntry[] = []

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

  // Carrega histórico da API
  const { data: historyData, isLoading } = useQuery({
    queryKey: ['clock-history', currentPage, filters],
    queryFn: () =>
      clockService.getHistory(
        { page: currentPage, limit: ITEMS_PER_PAGE },
        {
          start_date: filters.startDate || undefined,
          end_date: filters.endDate || undefined
        }
      )
  })

  const apiEntries: ClockEntry[] = (historyData?.data.entries as any[])?.map(e => ({
    id: e.id,
    date: e.clockIn.split('T')[0],
    clockIn: new Date(e.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    clockOut: e.clockOut ? new Date(e.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : null,
    duration: (() => {
      if (!e.clockOut) return '-'
      const diff = new Date(e.clockOut).getTime() - new Date(e.clockIn).getTime()
      const totalSec = Math.round(diff / 1000)
      const h = Math.floor(totalSec / 3600)
      const m = Math.floor((totalSec % 3600) / 60)
      const s = totalSec % 60
      return `${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`
    })(),
    notes: e.description || '',
    status: e.clockOut ? 'completed' : 'active'
  })) || EMPTY_DATA

  // Filtragem local adicional
  const filteredData = apiEntries.filter(entry => {
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

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortKey === 'date') {
      return sortDirection === 'asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    }
    return 0
  })

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
        
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto w-full">
          {isLoading ? (
            <p className="text-center py-8">Carregando...</p>
          ) : (
            <div className="min-w-[640px]">
              <Table
                data={paginatedData}
                columns={columns}
                onSort={handleSort}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onRowClick={setSelectedRecord}
              />
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={sortedData.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>

        {/* Mobile card list */}
        {!isLoading && (
          <div className="space-y-4 sm:hidden w-full">
            {paginatedData.length === 0 ? (
              <p className="text-center py-8 text-text/60">Nenhum registro encontrado</p>
            ) : (
              paginatedData.map(entry => (
                <button
                  type="button"
                  key={entry.id}
                  onClick={() => setSelectedRecord(entry)}
                  className="w-full text-left bg-secondary/20 rounded-lg p-4 flex flex-col gap-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-text/60">Data</span>
                    <span>{entry.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text/60">Entrada</span>
                    <span>{entry.clockIn}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text/60">Saída</span>
                    <span>{entry.clockOut ?? '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text/60">Duração</span>
                    <span>{entry.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text/60">Status</span>
                    <span>{entry.status === 'active' ? 'Em andamento' : 'Finalizado'}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}

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