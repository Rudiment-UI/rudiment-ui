import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.firstChild).toHaveClass('rudiment-card')
  })

  it('applies each supported variant class', () => {
    const variants = ['default', 'outlined', 'elevated'] as const
    for (const variant of variants) {
      const { container } = render(<Card variant={variant}>Content</Card>)
      expect(container.firstChild).toHaveClass(`rudiment-card--${variant}`)
    }
  })

  it('applies each supported padding class', () => {
    const paddings = ['none', 'sm', 'md', 'lg'] as const
    for (const padding of paddings) {
      const { container } = render(<Card padding={padding}>Content</Card>)
      expect(container.firstChild).toHaveClass(
        `rudiment-card--padding-${padding}`,
      )
    }
  })

  it('renders Card.Header with the correct class', () => {
    const { container } = render(
      <Card>
        <Card.Header>Header</Card.Header>
      </Card>,
    )
    expect(container.querySelector('.rudiment-card__header')).toBeInTheDocument()
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('renders Card.Body with the correct class', () => {
    const { container } = render(
      <Card>
        <Card.Body>Body</Card.Body>
      </Card>,
    )
    expect(container.querySelector('.rudiment-card__body')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('renders Card.Footer with the correct class', () => {
    const { container } = render(
      <Card>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    )
    expect(container.querySelector('.rudiment-card__footer')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('merges a custom className on Card', () => {
    const { container } = render(
      <Card className="my-card">Content</Card>,
    )
    expect(container.firstChild).toHaveClass('rudiment-card')
    expect(container.firstChild).toHaveClass('my-card')
  })

  it('merges a custom className on Card.Header', () => {
    const { container } = render(
      <Card>
        <Card.Header className="my-header">Header</Card.Header>
      </Card>,
    )
    const header = container.querySelector('.rudiment-card__header')
    expect(header).toHaveClass('rudiment-card__header')
    expect(header).toHaveClass('my-header')
  })

  it('merges a custom className on Card.Body', () => {
    const { container } = render(
      <Card>
        <Card.Body className="my-body">Body</Card.Body>
      </Card>,
    )
    const body = container.querySelector('.rudiment-card__body')
    expect(body).toHaveClass('rudiment-card__body')
    expect(body).toHaveClass('my-body')
  })

  it('merges a custom className on Card.Footer', () => {
    const { container } = render(
      <Card>
        <Card.Footer className="my-footer">Footer</Card.Footer>
      </Card>,
    )
    const footer = container.querySelector('.rudiment-card__footer')
    expect(footer).toHaveClass('rudiment-card__footer')
    expect(footer).toHaveClass('my-footer')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Card variant="outlined">
        <Card.Header>Title</Card.Header>
        <Card.Body>Body content</Card.Body>
        <Card.Footer>Footer content</Card.Footer>
      </Card>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
