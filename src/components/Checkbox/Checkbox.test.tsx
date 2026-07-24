import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiCheckbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    render(<RudiCheckbox>Accept terms</RudiCheckbox>)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders the label text', () => {
    render(<RudiCheckbox>Accept terms</RudiCheckbox>)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('applies the base class to the label', () => {
    const { container } = render(<RudiCheckbox>Accept terms</RudiCheckbox>)
    expect(container.firstChild).toHaveClass('rudi-checkbox')
  })

  it('applies the disabled class when isDisabled is true', () => {
    const { container } = render(<RudiCheckbox isDisabled>Accept terms</RudiCheckbox>)
    expect(container.firstChild).toHaveClass('rudi-checkbox--disabled')
  })

  it('does not apply the disabled class by default', () => {
    const { container } = render(<RudiCheckbox>Accept terms</RudiCheckbox>)
    expect(container.firstChild).not.toHaveClass('rudi-checkbox--disabled')
  })

  it('applies the input class to the hidden input', () => {
    render(<RudiCheckbox>Accept terms</RudiCheckbox>)
    expect(screen.getByRole('checkbox')).toHaveClass('rudi-checkbox__input')
  })

  it('renders the custom control element', () => {
    const { container } = render(<RudiCheckbox>Accept terms</RudiCheckbox>)
    expect(
      container.querySelector('.rudi-checkbox__control'),
    ).toBeInTheDocument()
  })

  it('renders the label element', () => {
    const { container } = render(<RudiCheckbox>Accept terms</RudiCheckbox>)
    expect(
      container.querySelector('.rudi-checkbox__label'),
    ).toBeInTheDocument()
  })

  it('applies the checked class to the control when isSelected is true', () => {
    const { container } = render(<RudiCheckbox isSelected>Accept terms</RudiCheckbox>)
    expect(container.querySelector('.rudi-checkbox__control')).toHaveClass(
      'rudi-checkbox__control--checked',
    )
  })

  it('applies the indeterminate class when isIndeterminate is true', () => {
    const { container } = render(
      <RudiCheckbox isIndeterminate>Accept terms</RudiCheckbox>,
    )
    expect(container.querySelector('.rudi-checkbox__control')).toHaveClass(
      'rudi-checkbox__control--indeterminate',
    )
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiCheckbox className="my-check">Accept terms</RudiCheckbox>,
    )
    expect(container.firstChild).toHaveClass('rudi-checkbox')
    expect(container.firstChild).toHaveClass('my-check')
  })

  it('disables the checkbox input when isDisabled is true', () => {
    render(<RudiCheckbox isDisabled>Accept terms</RudiCheckbox>)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiCheckbox>Accept terms</RudiCheckbox>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations when disabled', async () => {
    const { container } = render(
      <RudiCheckbox isDisabled>Accept terms</RudiCheckbox>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
