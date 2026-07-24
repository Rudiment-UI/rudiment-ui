import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiCard } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<RudiCard>Card content</RudiCard>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<RudiCard>Content</RudiCard>)
    expect(container.firstChild).toHaveClass('rudi-card')
  })

  it('applies each supported variant class', () => {
    const variants = ['default', 'outlined', 'elevated'] as const
    for (const variant of variants) {
      const { container } = render(<RudiCard variant={variant}>Content</RudiCard>)
      expect(container.firstChild).toHaveClass(`rudi-card--${variant}`)
    }
  })

  it('applies each supported padding class', () => {
    const paddings = ['none', 'sm', 'md', 'lg'] as const
    for (const padding of paddings) {
      const { container } = render(<RudiCard padding={padding}>Content</RudiCard>)
      expect(container.firstChild).toHaveClass(
        `rudi-card--padding-${padding}`,
      )
    }
  })

  it('renders Card.Header with the correct class', () => {
    const { container } = render(
      <RudiCard>
        <RudiCard.Header>Header</RudiCard.Header>
      </RudiCard>,
    )
    expect(container.querySelector('.rudi-card__header')).toBeInTheDocument()
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('renders Card.Body with the correct class', () => {
    const { container } = render(
      <RudiCard>
        <RudiCard.Body>Body</RudiCard.Body>
      </RudiCard>,
    )
    expect(container.querySelector('.rudi-card__body')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('renders Card.Footer with the correct class', () => {
    const { container } = render(
      <RudiCard>
        <RudiCard.Footer>Footer</RudiCard.Footer>
      </RudiCard>,
    )
    expect(container.querySelector('.rudi-card__footer')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('merges a custom className on Card', () => {
    const { container } = render(
      <RudiCard className="my-card">Content</RudiCard>,
    )
    expect(container.firstChild).toHaveClass('rudi-card')
    expect(container.firstChild).toHaveClass('my-card')
  })

  it('merges a custom className on Card.Header', () => {
    const { container } = render(
      <RudiCard>
        <RudiCard.Header className="my-header">Header</RudiCard.Header>
      </RudiCard>,
    )
    const header = container.querySelector('.rudi-card__header')
    expect(header).toHaveClass('rudi-card__header')
    expect(header).toHaveClass('my-header')
  })

  it('merges a custom className on Card.Body', () => {
    const { container } = render(
      <RudiCard>
        <RudiCard.Body className="my-body">Body</RudiCard.Body>
      </RudiCard>,
    )
    const body = container.querySelector('.rudi-card__body')
    expect(body).toHaveClass('rudi-card__body')
    expect(body).toHaveClass('my-body')
  })

  it('merges a custom className on Card.Footer', () => {
    const { container } = render(
      <RudiCard>
        <RudiCard.Footer className="my-footer">Footer</RudiCard.Footer>
      </RudiCard>,
    )
    const footer = container.querySelector('.rudi-card__footer')
    expect(footer).toHaveClass('rudi-card__footer')
    expect(footer).toHaveClass('my-footer')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiCard variant="outlined">
        <RudiCard.Header>Title</RudiCard.Header>
        <RudiCard.Body>Body content</RudiCard.Body>
        <RudiCard.Footer>Footer content</RudiCard.Footer>
      </RudiCard>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
