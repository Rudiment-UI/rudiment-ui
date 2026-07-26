import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiLink } from './Link'

describe('Link', () => {
  it('renders an anchor with href and children', () => {
    render(<RudiLink href="/docs">Documentation</RudiLink>)
    const link = screen.getByRole('link', { name: 'Documentation' })
    expect(link).toHaveAttribute('href', '/docs')
    expect(link).toHaveClass('rudi-link', 'rudi-link--default')
  })

  it('applies each variant class', () => {
    const variants = ['default', 'subtle', 'standalone'] as const
    for (const variant of variants) {
      const { container } = render(
        <RudiLink href="/x" variant={variant}>
          Link
        </RudiLink>,
      )
      expect(container.firstChild).toHaveClass(`rudi-link--${variant}`)
    }
  })

  it('applies the underline class', () => {
    const { container } = render(
      <RudiLink href="/x" underline="always">
        Link
      </RudiLink>,
    )
    expect(container.firstChild).toHaveClass('rudi-link--underline-always')
  })

  it('adds safe rel and target for external links', () => {
    render(
      <RudiLink href="https://example.com" external>
        Example
      </RudiLink>,
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
  })

  it('forwards arbitrary anchor attributes', () => {
    render(
      <RudiLink href="/x" aria-label="Home page">
        Home
      </RudiLink>,
    )
    expect(screen.getByRole('link', { name: 'Home page' })).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiLink href="/x" className="my-link">
        Link
      </RudiLink>,
    )
    expect(container.firstChild).toHaveClass('rudi-link', 'my-link')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiLink href="https://example.com" external>
        Read the report
      </RudiLink>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
