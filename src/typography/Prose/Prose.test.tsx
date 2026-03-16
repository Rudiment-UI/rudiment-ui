import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Prose } from './Prose'

describe('Prose', () => {
  it('renders children', () => {
    render(
      <Prose>
        <p>Hello</p>
      </Prose>,
    )
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders a <div> element by default', () => {
    const { container } = render(
      <Prose>
        <p>Text</p>
      </Prose>,
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('always applies the base rudiment-prose class', () => {
    const { container } = render(
      <Prose>
        <p>Text</p>
      </Prose>,
    )
    expect(container.firstChild).toHaveClass('rudiment-prose')
  })

  it('does not apply a size modifier class for the default base size', () => {
    const { container } = render(
      <Prose>
        <p>Text</p>
      </Prose>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).not.toHaveClass('rudiment-prose--base')
    expect(el).not.toHaveClass('rudiment-prose--sm')
    expect(el).not.toHaveClass('rudiment-prose--lg')
  })

  it('applies rudiment-prose--sm for size="sm"', () => {
    const { container } = render(
      <Prose size="sm">
        <p>Text</p>
      </Prose>,
    )
    expect(container.firstChild).toHaveClass('rudiment-prose--sm')
  })

  it('applies rudiment-prose--lg for size="lg"', () => {
    const { container } = render(
      <Prose size="lg">
        <p>Text</p>
      </Prose>,
    )
    expect(container.firstChild).toHaveClass('rudiment-prose--lg')
  })

  it('renders the element specified by the as prop', () => {
    const { container } = render(
      <Prose as="article">
        <p>Text</p>
      </Prose>,
    )
    expect(container.firstChild?.nodeName).toBe('ARTICLE')
  })

  it('merges a custom className', () => {
    const { container } = render(
      <Prose className="mt-4">
        <p>Text</p>
      </Prose>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('rudiment-prose')
    expect(el).toHaveClass('mt-4')
  })

  it('forwards additional HTML attributes', () => {
    render(
      <Prose data-testid="my-prose" id="prose-1">
        <p>Text</p>
      </Prose>,
    )
    const el = screen.getByTestId('my-prose')
    expect(el).toHaveAttribute('id', 'prose-1')
  })

  it('forwards a ref to the rendered element', () => {
    const ref = { current: null as HTMLElement | null }
    render(
      <Prose ref={ref}>
        <p>Text</p>
      </Prose>,
    )
    expect(ref.current?.nodeName).toBe('DIV')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Prose>
        <p>Hello</p>
      </Prose>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
