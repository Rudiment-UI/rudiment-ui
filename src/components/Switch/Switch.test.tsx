import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiSwitch } from './Switch'

describe('Switch', () => {
  it('renders a checkbox input', () => {
    render(<RudiSwitch>Dark mode</RudiSwitch>)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('renders the label text', () => {
    render(<RudiSwitch>Dark mode</RudiSwitch>)
    expect(screen.getByText('Dark mode')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<RudiSwitch>Dark mode</RudiSwitch>)
    expect(container.firstChild).toHaveClass('rudi-switch')
  })

  it('applies the disabled class when isDisabled is true', () => {
    const { container } = render(<RudiSwitch isDisabled>Dark mode</RudiSwitch>)
    expect(container.firstChild).toHaveClass('rudi-switch--disabled')
  })

  it('does not apply the disabled class by default', () => {
    const { container } = render(<RudiSwitch>Dark mode</RudiSwitch>)
    expect(container.firstChild).not.toHaveClass('rudi-switch--disabled')
  })

  it('renders the track element', () => {
    const { container } = render(<RudiSwitch>Dark mode</RudiSwitch>)
    expect(
      container.querySelector('.rudi-switch__track'),
    ).toBeInTheDocument()
  })

  it('renders the thumb element', () => {
    const { container } = render(<RudiSwitch>Dark mode</RudiSwitch>)
    expect(
      container.querySelector('.rudi-switch__thumb'),
    ).toBeInTheDocument()
  })

  it('renders the label element', () => {
    const { container } = render(<RudiSwitch>Dark mode</RudiSwitch>)
    expect(
      container.querySelector('.rudi-switch__label'),
    ).toBeInTheDocument()
  })

  it('applies the on class to the track when defaultSelected is true', () => {
    const { container } = render(<RudiSwitch defaultSelected>Dark mode</RudiSwitch>)
    expect(container.querySelector('.rudi-switch__track')).toHaveClass(
      'rudi-switch__track--on',
    )
  })

  it('does not apply the on class when not selected', () => {
    const { container } = render(<RudiSwitch>Dark mode</RudiSwitch>)
    expect(container.querySelector('.rudi-switch__track')).not.toHaveClass(
      'rudi-switch__track--on',
    )
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiSwitch className="my-switch">Dark mode</RudiSwitch>,
    )
    expect(container.firstChild).toHaveClass('rudi-switch')
    expect(container.firstChild).toHaveClass('my-switch')
  })

  it('disables the input when isDisabled is true', () => {
    render(<RudiSwitch isDisabled>Dark mode</RudiSwitch>)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiSwitch>Dark mode</RudiSwitch>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations when disabled', async () => {
    const { container } = render(<RudiSwitch isDisabled>Dark mode</RudiSwitch>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
