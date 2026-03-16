import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders children', () => {
    render(<Heading level={1}>Hello</Heading>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it.each([1, 2, 3, 4, 5, 6] as const)(
    'renders an h%i element when level=%i',
    (level) => {
      const { container } = render(<Heading level={level}>Text</Heading>)
      expect(container.firstChild?.nodeName).toBe(`H${level}`)
    },
  )

  it.each([1, 2, 3, 4, 5, 6] as const)(
    'applies rudiment-heading--%i class when level=%i and no size override',
    (level) => {
      const { container } = render(<Heading level={level}>Text</Heading>)
      expect(container.firstChild).toHaveClass(`rudiment-heading--${level}`)
    },
  )

  it('applies the size class instead of the level class when size prop is given', () => {
    const { container } = render(
      <Heading level={3} size={1}>
        Text
      </Heading>,
    )
    expect(container.firstChild).toHaveClass('rudiment-heading--1')
    expect(container.firstChild).not.toHaveClass('rudiment-heading--3')
  })

  it('always applies the base rudiment-heading class', () => {
    const { container } = render(<Heading level={2}>Text</Heading>)
    expect(container.firstChild).toHaveClass('rudiment-heading')
  })

  it('merges a custom className', () => {
    const { container } = render(
      <Heading level={1} className="mt-4">
        Text
      </Heading>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('rudiment-heading')
    expect(el).toHaveClass('mt-4')
  })

  it('forwards additional HTML attributes', () => {
    render(
      <Heading level={1} data-testid="my-heading" id="title">
        Text
      </Heading>,
    )
    const el = screen.getByTestId('my-heading')
    expect(el).toHaveAttribute('id', 'title')
  })

  it('forwards a ref to the heading element', () => {
    const ref = { current: null as HTMLHeadingElement | null }
    render(
      <Heading level={2} ref={ref}>
        Text
      </Heading>,
    )
    expect(ref.current?.nodeName).toBe('H2')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Heading level={1}>Hello</Heading>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
