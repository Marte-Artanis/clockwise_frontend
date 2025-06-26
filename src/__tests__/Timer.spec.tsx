import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timer } from '../components/Timer'
import { act } from 'react'

describe('Timer component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('shows 00:00:00 when startTime is null', () => {
    render(<Timer startTime={null} />)
    expect(screen.getByText('00:00:00')).toBeInTheDocument()
  })

  it('updates every second based on startTime', () => {
    const start = new Date('2025-01-01T00:00:00Z')
    vi.setSystemTime(start)
    render(<Timer startTime={start} />)

    expect(screen.getByText('00:00:00')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(screen.getByText('00:00:05')).toBeInTheDocument()
  })
}) 