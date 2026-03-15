import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert variant="info">Something happened.</Alert>)
    expect(screen.getByText('Something happened.')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<Alert variant="info">Message</Alert>)
    expect(container.firstChild).toHaveClass('rudiment-alert')
  })

  it('applies the variant class', () => {
    const { container } = render(<Alert variant="success">All good.</Alert>)
    expect(container.firstChild).toHaveClass('rudiment-alert--success')
  })

  it('applies each supported variant class', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const
    for (const variant of variants) {
      const { container } = render(<Alert variant={variant}>Msg</Alert>)
      expect(container.firstChild).toHaveClass(`rudiment-alert--${variant}`)
    }
  })

  it('renders the title when provided', () => {
    render(<Alert variant="warning" title="Watch out">Details here.</Alert>)
    expect(screen.getByText('Watch out')).toBeInTheDocument()
  })

  it('applies the title class', () => {
    render(<Alert variant="warning" title="Watch out">Details here.</Alert>)
    expect(screen.getByText('Watch out')).toHaveClass('rudiment-alert__title')
  })

  it('does not render the title element when title is omitted', () => {
    const { container } = render(<Alert variant="info">Message</Alert>)
    expect(container.querySelector('.rudiment-alert__title')).not.toBeInTheDocument()
  })

  it('has role="alert" by default', () => {
    render(<Alert variant="error">Error!</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('has role="status" when isPolite is true', () => {
    render(<Alert variant="info" isPolite>Info.</Alert>)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(<Alert variant="info" className="my-alert">Msg</Alert>)
    expect(container.firstChild).toHaveClass('rudiment-alert')
    expect(container.firstChild).toHaveClass('my-alert')
  })
})
