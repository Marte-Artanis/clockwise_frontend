import { useState } from 'react'
import { Button } from './ui/Button'
import { styles } from './ClockDetails.styles'

interface ClockEntry {
  id: string
  date: string
  clockIn: string
  clockOut: string | null
  duration: string
  notes?: string
  status: 'active' | 'completed'
}

interface ClockDetailsProps {
  entry: ClockEntry
  onClose: () => void
  onDelete: (id: string) => void
  onSave: (id: string, notes: string) => void
}

export function ClockDetails({ entry, onClose, onDelete, onSave }: ClockDetailsProps) {
  const [notes, setNotes] = useState(entry.notes || '')
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onSave(entry.id, notes)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      onDelete(entry.id)
      onClose()
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={styles.grid}>
      <div className={styles.field}>
        <span className={styles.label}>Data</span>
        <span className={styles.value}>
          {formatDate(entry.date)}
        </span>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Status</span>
        <span className={styles.status[entry.status]}>
          {entry.status === 'active' ? 'Em andamento' : 'Finalizado'}
        </span>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Entrada</span>
        <span className={styles.value}>{entry.clockIn}</span>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Saída</span>
        <span className={styles.value}>{entry.clockOut || '-'}</span>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Duração</span>
        <span className={styles.value}>{entry.duration}</span>
      </div>

      <div className={styles.notes}>
        <span className={styles.label}>Notas</span>
        {isEditing ? (
          <textarea
            className={styles.notesInput}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={4}
            placeholder="Adicione suas notas aqui..."
          />
        ) : (
          <span className={styles.value}>
            {notes || 'Nenhuma nota adicionada'}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <Button onClick={handleSave} variant="primary">
              Salvar
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="secondary">
              Cancelar
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="secondary">
            Editar Notas
          </Button>
        )}
        <button 
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          Excluir Registro
        </button>
      </div>
    </div>
  )
} 