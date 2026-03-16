import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders a checkbox input', () => {
    render(<Switch>Dark mode</Switch>)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('renders the label text', () => {
    render(<Switch>Dark mode</Switch>)
    expect(screen.getByText('Dark mode')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<Switch>Dark mode</Switch>)
    expect(container.firstChild).toHaveClass('rudiment-switch')
  })

  it('applies the disabled class when isDisabled is true', () => {
    const { container } = render(<Switch isDisabled>Dark mode</Switch>)
    expect(container.firstChild).toHaveClass('rudiment-switch--disabled')
  })

  it('does not apply the disabled class by default', () => {
    const { container } = render(<Switch>Dark mode</Switch>)
    expect(container.firstChild).not.toHaveClass('rudiment-switch--disabled')
  })

  it('renders the track element', () => {
    const { container } = render(<Switch>Dark mode</Switch>)
    expect(
      container.querySelector('.rudiment-switch__track'),
    ).toBeInTheDocument()
  })

  it('renders the thumb element', () => {
    const { container } = render(<Switch>Dark mode</Switch>)
    expect(
      container.querySelector('.rudiment-switch__thumb'),
    ).toBeInTheDocument()
  })

  it('renders the label element', () => {
    const { container } = render(<Switch>Dark mode</Switch>)
    expect(
      container.querySelector('.rudiment-switch__label'),
    ).toBeInTheDocument()
  })

  it('applies the on class to the track when defaultSelected is true', () => {
    const { container } = render(<Switch defaultSelected>Dark mode</Switch>)
    expect(container.querySelector('.rudiment-switch__track')).toHaveClass(
      'rudiment-switch__track--on',
    )
  })

  it('does not apply the on class when not selected', () => {
    const { container } = render(<Switch>Dark mode</Switch>)
    expect(container.querySelector('.rudiment-switch__track')).not.toHaveClass(
      'rudiment-switch__track--on',
    )
  })

  it('merges a custom className', () => {
    const { container } = render(
      <Switch className="my-switch">Dark mode</Switch>,
    )
    expect(container.firstChild).toHaveClass('rudiment-switch')
    expect(container.firstChild).toHaveClass('my-switch')
  })

  it('disables the input when isDisabled is true', () => {
    render(<Switch isDisabled>Dark mode</Switch>)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Switch>Dark mode</Switch>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations when disabled', async () => {
    const { container } = render(<Switch isDisabled>Dark mode</Switch>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
