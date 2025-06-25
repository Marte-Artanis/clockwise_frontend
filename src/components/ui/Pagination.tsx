import { styles } from './Pagination.styles'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  itemsPerPage: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter(page => {
    // Sempre mostrar primeira e última página
    if (page === 1 || page === totalPages) return true
    // Mostrar páginas próximas à página atual
    return Math.abs(page - currentPage) <= 1
  })

  // Adicionar elipses onde necessário
  const pagesWithEllipsis = visiblePages.reduce((acc: (number | string)[], page, i) => {
    if (i === 0) return [page]
    if (visiblePages[i - 1] !== page - 1) {
      return [...acc, '...', page]
    }
    return [...acc, page]
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.pageInfo}>
        Mostrando {startItem}-{endItem} de {totalItems} registros
      </div>

      <div className={styles.controls}>
        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <svg
            className={styles.pageButtonIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {pagesWithEllipsis.map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className={styles.pageInfo}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`${styles.pageButton} ${currentPage === page ? styles.pageButtonActive : ''}`}
              onClick={() => onPageChange(page as number)}
              disabled={currentPage === page}
              aria-label={`Página ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <svg
            className={styles.pageButtonIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
