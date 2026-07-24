import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiSwitcher } from './Switcher'

describe('Switcher', () => {
  it('renders children', () => {
    render(
      <RudiSwitcher>
        <p>First</p>
        <p>Second</p>
      </RudiSwitcher>,
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('applies the default class', () => {
    const { container } = render(
      <RudiSwitcher>
        <p>Child</p>
      </RudiSwitcher>,
    )
    expect(container.firstChild).toHaveClass('rudi-switcher')
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiSwitcher className="mt-4">
        <p>Child</p>
      </RudiSwitcher>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('rudi-switcher')
    expect(el).toHaveClass('mt-4')
  })

  it('sets --switcher-threshold when threshold prop is passed', () => {
    const { container } = render(
      <RudiSwitcher threshold="40rem">
        <p>Child</p>
      </RudiSwitcher>,
    )
    expect(container.firstChild).toHaveStyle('--switcher-threshold: 40rem')
  })

  it('sets --switcher-space when space prop is passed', () => {
    const { container } = render(
      <RudiSwitcher space="2rem">
        <p>Child</p>
      </RudiSwitcher>,
    )
    expect(container.firstChild).toHaveStyle('--switcher-space: 2rem')
  })

  it('does not set inline styles when no custom props are passed', () => {
    const { container } = render(
      <RudiSwitcher>
        <p>Child</p>
      </RudiSwitcher>,
    )
    const style = (container.firstChild as HTMLElement).getAttribute('style')
    expect(style).toBeNull()
  })

  it('renders the correct element via the as prop', () => {
    const { container } = render(
      <RudiSwitcher as="section">
        <p>Child</p>
      </RudiSwitcher>,
    )
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('renders a div by default', () => {
    const { container } = render(
      <RudiSwitcher>
        <p>Child</p>
      </RudiSwitcher>,
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('forwards additional HTML attributes', () => {
    const { container } = render(
      <RudiSwitcher data-testid="my-switcher" id="switcher-1">
        <p>Child</p>
      </RudiSwitcher>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('data-testid', 'my-switcher')
    expect(el).toHaveAttribute('id', 'switcher-1')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiSwitcher>
        <p>First</p>
        <p>Second</p>
      </RudiSwitcher>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
