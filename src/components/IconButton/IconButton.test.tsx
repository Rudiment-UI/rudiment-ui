import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { IconButton } from './IconButton'

describe('IconButton', () => {
  it('renders a button element', () => {
    render(<IconButton aria-label="Close"><span>×</span></IconButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<IconButton aria-label="Close"><span>×</span></IconButton>)
    expect(container.firstChild).toHaveClass('rudiment-icon-button')
  })

  it('applies secondary variant class by default', () => {
    const { container } = render(<IconButton aria-label="Close"><span>×</span></IconButton>)
    expect(container.firstChild).toHaveClass('rudiment-icon-button--secondary')
  })

  it('applies the specified variant class', () => {
    const { container } = render(
      <IconButton aria-label="Delete" variant="destructive"><span>🗑</span></IconButton>
    )
    expect(container.firstChild).toHaveClass('rudiment-icon-button--destructive')
  })

  it('applies the md size class by default', () => {
    const { container } = render(<IconButton aria-label="Close"><span>×</span></IconButton>)
    expect(container.firstChild).toHaveClass('rudiment-icon-button--md')
  })

  it('applies the specified size class', () => {
    const { container } = render(
      <IconButton aria-label="Close" size="sm"><span>×</span></IconButton>
    )
    expect(container.firstChild).toHaveClass('rudiment-icon-button--sm')
  })

  it('sets the aria-label', () => {
    render(<IconButton aria-label="Close"><span>×</span></IconButton>)
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <IconButton aria-label="Close" className="extra"><span>×</span></IconButton>
    )
    expect(container.firstChild).toHaveClass('rudiment-icon-button')
    expect(container.firstChild).toHaveClass('extra')
  })

  it('renders children', () => {
    const { container } = render(
      <IconButton aria-label="Close"><span data-testid="icon">×</span></IconButton>
    )
    expect(container.querySelector('[data-testid="icon"]')).toBeInTheDocument()
  })
})
