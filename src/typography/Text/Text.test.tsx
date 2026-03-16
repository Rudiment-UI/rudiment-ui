import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Text } from './Text'

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello</Text>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders a <p> element by default', () => {
    const { container } = render(<Text>Text</Text>)
    expect(container.firstChild?.nodeName).toBe('P')
  })

  it('applies the body variant class by default', () => {
    const { container } = render(<Text>Text</Text>)
    expect(container.firstChild).toHaveClass('rudiment-text--body')
  })

  it('always applies the base rudiment-text class', () => {
    const { container } = render(<Text>Text</Text>)
    expect(container.firstChild).toHaveClass('rudiment-text')
  })

  it.each(['body', 'body-sm', 'caption', 'overline', 'code'] as const)(
    'applies rudiment-text--%s class for variant=%s',
    (variant) => {
      const { container } = render(<Text variant={variant}>Text</Text>)
      expect(container.firstChild).toHaveClass(`rudiment-text--${variant}`)
    },
  )

  it('renders the element specified by the as prop', () => {
    const { container } = render(<Text as="span">Text</Text>)
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('merges a custom className', () => {
    const { container } = render(<Text className="mt-2">Text</Text>)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('rudiment-text')
    expect(el).toHaveClass('mt-2')
  })

  it('forwards additional HTML attributes', () => {
    render(<Text data-testid="my-text" id="txt">Text</Text>)
    const el = screen.getByTestId('my-text')
    expect(el).toHaveAttribute('id', 'txt')
  })

  it('forwards a ref to the rendered element', () => {
    const ref = { current: null as HTMLElement | null }
    render(<Text ref={ref}>Text</Text>)
    expect(ref.current?.nodeName).toBe('P')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Text>Hello</Text>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
