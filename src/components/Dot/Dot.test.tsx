import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiDot } from './Dot'

describe('Dot', () => {
  it('applies the base and tone classes', () => {
    const { container } = render(<RudiDot tone="success" />)
    expect(container.firstChild).toHaveClass('rudi-dot', 'rudi-dot--success')
  })

  it('applies each size class', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { container } = render(<RudiDot size={size} />)
      expect(container.firstChild).toHaveClass(`rudi-dot--${size}`)
    }
  })

  it('is decorative by default', () => {
    const { container } = render(<RudiDot />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('exposes a status role with a label', () => {
    render(<RudiDot label="Online" />)
    const el = screen.getByRole('status')
    expect(el).toHaveTextContent('Online')
    expect(el).not.toHaveAttribute('aria-hidden')
  })

  it('uses an explicit color over a tone and drops the tone class', () => {
    const { container } = render(
      <RudiDot tone="success" color="var(--rudi-color-dataviz-3)" />,
    )
    const el = container.firstChild as HTMLElement
    expect(el).not.toHaveClass('rudi-dot--success')
    expect(el.style.getPropertyValue('--rudi-dot-color')).toBe(
      'var(--rudi-color-dataviz-3)',
    )
  })

  it('applies the pulse modifier', () => {
    const { container } = render(<RudiDot pulse />)
    expect(container.firstChild).toHaveClass('rudi-dot--pulse')
  })

  it('merges a custom className', () => {
    const { container } = render(<RudiDot className="my-dot" />)
    expect(container.firstChild).toHaveClass('rudi-dot', 'my-dot')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiDot label="Active" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
