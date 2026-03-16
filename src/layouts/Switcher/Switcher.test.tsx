import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Switcher } from './Switcher'

describe('Switcher', () => {
  it('renders children', () => {
    render(
      <Switcher>
        <p>First</p>
        <p>Second</p>
      </Switcher>,
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('applies the default class', () => {
    const { container } = render(
      <Switcher>
        <p>Child</p>
      </Switcher>,
    )
    expect(container.firstChild).toHaveClass('rudiment-switcher')
  })

  it('merges a custom className', () => {
    const { container } = render(
      <Switcher className="mt-4">
        <p>Child</p>
      </Switcher>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('rudiment-switcher')
    expect(el).toHaveClass('mt-4')
  })

  it('sets --switcher-threshold when threshold prop is passed', () => {
    const { container } = render(
      <Switcher threshold="40rem">
        <p>Child</p>
      </Switcher>,
    )
    expect(container.firstChild).toHaveStyle('--switcher-threshold: 40rem')
  })

  it('sets --switcher-space when space prop is passed', () => {
    const { container } = render(
      <Switcher space="2rem">
        <p>Child</p>
      </Switcher>,
    )
    expect(container.firstChild).toHaveStyle('--switcher-space: 2rem')
  })

  it('does not set inline styles when no custom props are passed', () => {
    const { container } = render(
      <Switcher>
        <p>Child</p>
      </Switcher>,
    )
    const style = (container.firstChild as HTMLElement).getAttribute('style')
    expect(style).toBeNull()
  })

  it('renders the correct element via the as prop', () => {
    const { container } = render(
      <Switcher as="section">
        <p>Child</p>
      </Switcher>,
    )
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('renders a div by default', () => {
    const { container } = render(
      <Switcher>
        <p>Child</p>
      </Switcher>,
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('forwards additional HTML attributes', () => {
    const { container } = render(
      <Switcher data-testid="my-switcher" id="switcher-1">
        <p>Child</p>
      </Switcher>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('data-testid', 'my-switcher')
    expect(el).toHaveAttribute('id', 'switcher-1')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Switcher>
        <p>First</p>
        <p>Second</p>
      </Switcher>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
