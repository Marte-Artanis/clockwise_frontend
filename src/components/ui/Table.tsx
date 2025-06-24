import type { ReactNode } from 'react'
import { styles } from './Table.styles'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => ReactNode
  sortable?: boolean
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  onSort?: (key: string) => void
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  emptyMessage?: string
}

export function Table<T>({ 
  data, 
  columns, 
  onSort,
  sortKey,
  sortDirection,
  emptyMessage = 'Nenhum registro encontrado'
}: TableProps<T>) {
  const handleSort = (key: string) => {
    if (onSort && columns.find(col => col.key === key)?.sortable) {
      onSort(key)
    }
  }

  const renderSortIcon = (key: string) => {
    if (!columns.find(col => col.key === key)?.sortable) return null

    return (
      <svg
        className={styles.sortIcon}
        style={{
          transform: sortKey === key && sortDirection === 'desc' 
            ? 'rotate(180deg)' 
            : 'none'
        }}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4L12 8L4 8L8 4Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map(column => (
              <th key={column.key} className={styles.th}>
                <button
                  className={styles.sortButton}
                  onClick={() => handleSort(column.key)}
                  disabled={!column.sortable}
                >
                  {column.header}
                  {renderSortIcon(column.key)}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length} 
                className={styles.empty}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className={styles.tr}>
                {columns.map(column => (
                  <td key={column.key} className={styles.td}>
                    {column.render 
                      ? column.render(item)
                      : (item as any)[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
} 