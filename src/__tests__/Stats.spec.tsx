import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stats } from '../components/Stats'

vi.mock('../services/clock', () => ({
  clockService: {
    getHistory: vi.fn().mockResolvedValue({
      data: { entries: [] }
    })
  }
}))

function renderStats() {
  const qc = new QueryClient()
  return render(
    <QueryClientProvider client={qc}>
      <Stats />
    </QueryClientProvider>
  )
}

describe('Stats component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('switches period tabs', async () => {
    const user = userEvent.setup()
    renderStats()

    // aguarda fim do loading
    await screen.findByRole('heading', { name: /estatísticas/i })

    const semanaBtn = screen.getByRole('button', { name: /semana/i })
    expect(semanaBtn).toHaveClass('bg-primary')

    await user.click(screen.getByRole('button', { name: /mês/i }))
    expect(screen.getByRole('button', { name: /mês/i })).toHaveClass('bg-primary')

    await user.click(screen.getByRole('button', { name: /ano/i }))
    expect(screen.getByRole('button', { name: /ano/i })).toHaveClass('bg-primary')
  })
}) 