import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../components/ui/Modal'

const TITLE = 'Meu Modal'
const CONTENT_TEXT = 'Corpo do modal'

function renderModal(onClose: () => void, open = true) {
  return render(
    <Modal isOpen={open} title={TITLE} onClose={onClose}>
      <p>{CONTENT_TEXT}</p>
    </Modal>
  )
}

describe('Modal component', () => {
  it('does not render when closed', () => {
    const { container } = renderModal(vi.fn(), false)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders children and title when open', () => {
    renderModal(vi.fn())
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(TITLE)).toBeInTheDocument()
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument()
  })

  it('calls onClose when clicking overlay or close button', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderModal(onClose)

    // click overlay
    const overlay = screen.getByRole('dialog').parentElement as HTMLElement
    await user.click(overlay)
    expect(onClose).toHaveBeenCalledTimes(1)

    // click close button
    await user.click(screen.getByLabelText(/fechar/i))
    expect(onClose).toHaveBeenCalledTimes(2)
  })
}) 