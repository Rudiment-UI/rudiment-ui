import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<Badge>Label</Badge>)
    expect(container.firstChild).toHaveClass('rudiment-badge')
  })

  it('applies each supported variant class', () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const
    for (const variant of variants) {
      const { container } = render(<Badge variant={variant}>Msg</Badge>)
      expect(container.firstChild).toHaveClass(`rudiment-badge--${variant}`)
    }
  })

  it('applies the size class', () => {
    const { container } = render(<Badge size="sm">Small</Badge>)
    expect(container.firstChild).toHaveClass('rudiment-badge--sm')
  })

  it('renders dot indicator and hides children', () => {
    const { container } = render(<Badge dot>Hidden</Badge>)
    expect(container.firstChild).toHaveClass('rudiment-badge--dot')
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <Badge className="my-badge">Label</Badge>,
    )
    expect(container.firstChild).toHaveClass('rudiment-badge')
    expect(container.firstChild).toHaveClass('my-badge')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Badge>Status</Badge>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
