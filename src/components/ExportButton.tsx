import { useState, useRef, useEffect } from 'react'
import jsPDF from 'jspdf'
import { jsPDF as jsPDFType } from 'jspdf'
import autoTable from 'jspdf-autotable'
import Papa from 'papaparse'
import { styles } from './ExportButton.styles'

interface Record {
  date: string
  clockIn: string
  clockOut: string
  duration: string
  status: string
  notes: string
}

interface ExportButtonProps {
  data: Record[]
  period: 'week' | 'month' | 'year'
}

export function ExportButton({ data, period }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const exportToCSV = () => {
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `clockwise_${period}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsOpen(false)
  }

  const exportToPDF = () => {
    try {
      const doc = new jsPDF() as jsPDFType & { autoTable: typeof autoTable }
      const pageWidth = doc.internal.pageSize.getWidth()
      
      // Título
      doc.setFontSize(20)
      doc.text('Relatório Clockwise', pageWidth / 2, 20, { align: 'center' })
      
      // Subtítulo com período
      doc.setFontSize(12)
      const periodText = {
        week: 'Relatório Semanal',
        month: 'Relatório Mensal',
        year: 'Relatório Anual'
      }[period]
      doc.text(periodText, pageWidth / 2, 30, { align: 'center' })
      
      // Data do relatório
      const today = new Date().toLocaleDateString('pt-BR')
      doc.text(`Gerado em: ${today}`, pageWidth / 2, 40, { align: 'center' })

      // Tabela de dados
      const headers = ['Data', 'Entrada', 'Saída', 'Duração', 'Status', 'Notas']
      const rows = data.map(record => [
        record.date,
        record.clockIn,
        record.clockOut,
        record.duration,
        record.status,
        record.notes
      ])

      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 50,
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak',
          cellWidth: 'auto'
        },
        headStyles: {
          fillColor: [124, 58, 237],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        }
      })

      doc.save(`clockwise_${period}_${new Date().toISOString().split('T')[0]}.pdf`)
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
    }
  }

  return (
    <div className="relative">
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Exportar
      </button>

      {isOpen && (
        <div className={styles.menu} ref={menuRef}>
          <div className={styles.menuHeader}>
            Formato
          </div>
          <button className={styles.menuItem} onClick={exportToCSV}>
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            CSV
          </button>
          <button className={styles.menuItem} onClick={exportToPDF}>
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            PDF
          </button>
        </div>
      )}
    </div>
  )
} 