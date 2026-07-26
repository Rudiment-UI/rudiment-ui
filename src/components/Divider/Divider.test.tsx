import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiDivider } from './Divider'

describe('Divider', () => {
  it('renders a semantic hr by default', () => {
    const { container } = render(<RudiDivider />)
    const el = container.firstChild as HTMLElement
    expect(el.tagName).toBe('HR')
    expect(el).toHaveClass('rudi-divider', 'rudi-divider--horizontal')
  })

  it('applies the vertical orientation', () => {
    const { container } = render(<RudiDivider orientation="vertical" />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('role', 'separator')
    expect(el).toHaveAttribute('aria-orientation', 'vertical')
    expect(el).toHaveClass('rudi-divider--vertical')
  })

  it('applies each spacing class', () => {
    const spacings = ['none', 'sm', 'md', 'lg'] as const
    for (const spacing of spacings) {
      const { container } = render(<RudiDivider spacing={spacing} />)
      expect(container.firstChild).toHaveClass(`rudi-divider--spacing-${spacing}`)
    }
  })

  it('renders a centered label', () => {
    const { container } = render(<RudiDivider label="OR" />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('rudi-divider--labeled')
    expect(el).toHaveAttribute('role', 'separator')
    expect(screen.getByText('OR')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(<RudiDivider className="my-divider" />)
    expect(container.firstChild).toHaveClass('rudi-divider', 'my-divider')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiDivider label="Section" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
