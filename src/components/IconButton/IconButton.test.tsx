import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiIconButton } from './IconButton'

describe('IconButton', () => {
  it('renders a button element', () => {
    render(<RudiIconButton aria-label="Close"><span>×</span></RudiIconButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(
      <RudiIconButton aria-label="Close"><span>×</span></RudiIconButton>,
    )
    expect(container.firstChild).toHaveClass('rudi-icon-button')
  })

  it('applies secondary variant class by default', () => {
    const { container } = render(
      <RudiIconButton aria-label="Close"><span>×</span></RudiIconButton>,
    )
    expect(container.firstChild).toHaveClass('rudi-icon-button--secondary')
  })

  it('applies the specified variant class', () => {
    const { container } = render(
      <RudiIconButton aria-label="Delete" variant="destructive">
        <span>🗑</span>
      </RudiIconButton>,
    )
    expect(container.firstChild).toHaveClass(
      'rudi-icon-button--destructive',
    )
  })

  it('applies the md size class by default', () => {
    const { container } = render(
      <RudiIconButton aria-label="Close"><span>×</span></RudiIconButton>,
    )
    expect(container.firstChild).toHaveClass('rudi-icon-button--md')
  })

  it('applies the specified size class', () => {
    const { container } = render(
      <RudiIconButton aria-label="Close" size="sm"><span>×</span></RudiIconButton>,
    )
    expect(container.firstChild).toHaveClass('rudi-icon-button--sm')
  })

  it('sets the aria-label', () => {
    render(<RudiIconButton aria-label="Close"><span>×</span></RudiIconButton>)
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiIconButton aria-label="Close" className="extra">
        <span>×</span>
      </RudiIconButton>,
    )
    expect(container.firstChild).toHaveClass('rudi-icon-button')
    expect(container.firstChild).toHaveClass('extra')
  })

  it('renders children', () => {
    const { container } = render(
      <RudiIconButton aria-label="Close">
        <span data-testid="icon">×</span>
      </RudiIconButton>,
    )
    expect(container.querySelector('[data-testid="icon"]')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiIconButton aria-label="Close"><span>×</span></RudiIconButton>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
