import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiProse } from './Prose'

describe('Prose', () => {
  it('renders children', () => {
    render(
      <RudiProse>
        <p>Hello</p>
      </RudiProse>,
    )
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders a <div> element by default', () => {
    const { container } = render(
      <RudiProse>
        <p>Text</p>
      </RudiProse>,
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('always applies the base rudi-prose class', () => {
    const { container } = render(
      <RudiProse>
        <p>Text</p>
      </RudiProse>,
    )
    expect(container.firstChild).toHaveClass('rudi-prose')
  })

  it('does not apply a size modifier class for the default base size', () => {
    const { container } = render(
      <RudiProse>
        <p>Text</p>
      </RudiProse>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).not.toHaveClass('rudi-prose--base')
    expect(el).not.toHaveClass('rudi-prose--sm')
    expect(el).not.toHaveClass('rudi-prose--lg')
  })

  it('applies rudi-prose--sm for size="sm"', () => {
    const { container } = render(
      <RudiProse size="sm">
        <p>Text</p>
      </RudiProse>,
    )
    expect(container.firstChild).toHaveClass('rudi-prose--sm')
  })

  it('applies rudi-prose--lg for size="lg"', () => {
    const { container } = render(
      <RudiProse size="lg">
        <p>Text</p>
      </RudiProse>,
    )
    expect(container.firstChild).toHaveClass('rudi-prose--lg')
  })

  it('renders the element specified by the as prop', () => {
    const { container } = render(
      <RudiProse as="article">
        <p>Text</p>
      </RudiProse>,
    )
    expect(container.firstChild?.nodeName).toBe('ARTICLE')
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiProse className="mt-4">
        <p>Text</p>
      </RudiProse>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('rudi-prose')
    expect(el).toHaveClass('mt-4')
  })

  it('forwards additional HTML attributes', () => {
    render(
      <RudiProse data-testid="my-prose" id="prose-1">
        <p>Text</p>
      </RudiProse>,
    )
    const el = screen.getByTestId('my-prose')
    expect(el).toHaveAttribute('id', 'prose-1')
  })

  it('forwards a ref to the rendered element', () => {
    const ref = { current: null as HTMLElement | null }
    render(
      <RudiProse ref={ref}>
        <p>Text</p>
      </RudiProse>,
    )
    expect(ref.current?.nodeName).toBe('DIV')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiProse>
        <p>Hello</p>
      </RudiProse>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
