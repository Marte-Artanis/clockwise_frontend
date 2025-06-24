import { styles } from './HistoryFilters.styles'

interface Filters {
  startDate: string
  endDate: string
  status: 'all' | 'active' | 'completed'
  duration: 'all' | 'short' | 'medium' | 'long'
}

interface HistoryFiltersProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
}

export function HistoryFilters({ filters, onFilterChange }: HistoryFiltersProps) {
  const handleChange = (key: keyof Filters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label className={styles.label}>Data Inicial</label>
        <input
          type="date"
          className={styles.dateInput}
          value={filters.startDate}
          onChange={e => handleChange('startDate', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Data Final</label>
        <input
          type="date"
          className={styles.dateInput}
          value={filters.endDate}
          onChange={e => handleChange('endDate', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Status</label>
        <select
          className={styles.select}
          value={filters.status}
          onChange={e => handleChange('status', e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="active">Em andamento</option>
          <option value="completed">Finalizado</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Duração</label>
        <select
          className={styles.select}
          value={filters.duration}
          onChange={e => handleChange('duration', e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="short">Até 4h</option>
          <option value="medium">4h - 8h</option>
          <option value="long">Mais de 8h</option>
        </select>
      </div>
    </div>
  )
} 