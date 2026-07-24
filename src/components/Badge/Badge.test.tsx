import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiBadge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<RudiBadge>New</RudiBadge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<RudiBadge>Label</RudiBadge>)
    expect(container.firstChild).toHaveClass('rudi-badge')
  })

  it('applies each supported variant class', () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const
    for (const variant of variants) {
      const { container } = render(<RudiBadge variant={variant}>Msg</RudiBadge>)
      expect(container.firstChild).toHaveClass(`rudi-badge--${variant}`)
    }
  })

  it('applies the size class', () => {
    const { container } = render(<RudiBadge size="sm">Small</RudiBadge>)
    expect(container.firstChild).toHaveClass('rudi-badge--sm')
  })

  it('renders dot indicator and hides children', () => {
    const { container } = render(<RudiBadge dot>Hidden</RudiBadge>)
    expect(container.firstChild).toHaveClass('rudi-badge--dot')
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiBadge className="my-badge">Label</RudiBadge>,
    )
    expect(container.firstChild).toHaveClass('rudi-badge')
    expect(container.firstChild).toHaveClass('my-badge')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiBadge>Status</RudiBadge>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
