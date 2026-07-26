import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiHeading } from './Heading'

describe('Heading', () => {
  it('renders children', () => {
    render(<RudiHeading level={1}>Hello</RudiHeading>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it.each([1, 2, 3, 4, 5, 6] as const)(
    'renders an h%i element when level=%i',
    (level) => {
      const { container } = render(<RudiHeading level={level}>Text</RudiHeading>)
      expect(container.firstChild?.nodeName).toBe(`H${level}`)
    },
  )

  it.each([1, 2, 3, 4, 5, 6] as const)(
    'applies rudi-heading--%i class when level=%i and no size override',
    (level) => {
      const { container } = render(<RudiHeading level={level}>Text</RudiHeading>)
      expect(container.firstChild).toHaveClass(`rudi-heading--${level}`)
    },
  )

  it('applies the size class instead of the level class when size prop is given', () => {
    const { container } = render(
      <RudiHeading level={3} size={1}>
        Text
      </RudiHeading>,
    )
    expect(container.firstChild).toHaveClass('rudi-heading--1')
    expect(container.firstChild).not.toHaveClass('rudi-heading--3')
  })

  it('always applies the base rudi-heading class', () => {
    const { container } = render(<RudiHeading level={2}>Text</RudiHeading>)
    expect(container.firstChild).toHaveClass('rudi-heading')
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiHeading level={1} className="mt-4">
        Text
      </RudiHeading>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('rudi-heading')
    expect(el).toHaveClass('mt-4')
  })

  it('forwards additional HTML attributes', () => {
    render(
      <RudiHeading level={1} data-testid="my-heading" id="title">
        Text
      </RudiHeading>,
    )
    const el = screen.getByTestId('my-heading')
    expect(el).toHaveAttribute('id', 'title')
  })

  it('forwards a ref to the heading element', () => {
    const ref = { current: null as HTMLHeadingElement | null }
    render(
      <RudiHeading level={2} ref={ref}>
        Text
      </RudiHeading>,
    )
    expect(ref.current?.nodeName).toBe('H2')
  })

  it.each(['regular', 'medium', 'semibold', 'bold'] as const)(
    'applies rudi-heading--weight-%s for weight=%s',
    (weight) => {
      const { container } = render(
        <RudiHeading level={2} weight={weight}>
          Text
        </RudiHeading>,
      )
      expect(container.firstChild).toHaveClass(`rudi-heading--weight-${weight}`)
    },
  )

  it.each(['default', 'subtle', 'brand', 'inverted', 'error'] as const)(
    'applies rudi-heading--tone-%s for tone=%s',
    (tone) => {
      const { container } = render(
        <RudiHeading level={2} tone={tone}>
          Text
        </RudiHeading>,
      )
      expect(container.firstChild).toHaveClass(`rudi-heading--tone-${tone}`)
    },
  )

  it.each(['start', 'center', 'end', 'justify'] as const)(
    'applies rudi-heading--align-%s for align=%s',
    (align) => {
      const { container } = render(
        <RudiHeading level={2} align={align}>
          Text
        </RudiHeading>,
      )
      expect(container.firstChild).toHaveClass(`rudi-heading--align-${align}`)
    },
  )

  it('applies rudi-heading--flush when noMargin is set', () => {
    const { container } = render(
      <RudiHeading level={2} noMargin>
        Text
      </RudiHeading>,
    )
    expect(container.firstChild).toHaveClass('rudi-heading--flush')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiHeading level={1}>Hello</RudiHeading>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
