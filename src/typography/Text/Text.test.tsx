import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiText } from './Text'

describe('Text', () => {
  it('renders children', () => {
    render(<RudiText>Hello</RudiText>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders a <p> element by default', () => {
    const { container } = render(<RudiText>Text</RudiText>)
    expect(container.firstChild?.nodeName).toBe('P')
  })

  it('applies the body variant class by default', () => {
    const { container } = render(<RudiText>Text</RudiText>)
    expect(container.firstChild).toHaveClass('rudi-text--body')
  })

  it('always applies the base rudi-text class', () => {
    const { container } = render(<RudiText>Text</RudiText>)
    expect(container.firstChild).toHaveClass('rudi-text')
  })

  it.each(['body', 'body-sm', 'caption', 'overline', 'code'] as const)(
    'applies rudi-text--%s class for variant=%s',
    (variant) => {
      const { container } = render(<RudiText variant={variant}>Text</RudiText>)
      expect(container.firstChild).toHaveClass(`rudi-text--${variant}`)
    },
  )

  it('renders the element specified by the as prop', () => {
    const { container } = render(<RudiText as="span">Text</RudiText>)
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('merges a custom className', () => {
    const { container } = render(<RudiText className="mt-2">Text</RudiText>)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('rudi-text')
    expect(el).toHaveClass('mt-2')
  })

  it('forwards additional HTML attributes', () => {
    render(<RudiText data-testid="my-text" id="txt">Text</RudiText>)
    const el = screen.getByTestId('my-text')
    expect(el).toHaveAttribute('id', 'txt')
  })

  it('forwards a ref to the rendered element', () => {
    const ref = { current: null as HTMLElement | null }
    render(<RudiText ref={ref}>Text</RudiText>)
    expect(ref.current?.nodeName).toBe('P')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiText>Hello</RudiText>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
