import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    render(<Checkbox>Accept terms</Checkbox>)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders the label text', () => {
    render(<Checkbox>Accept terms</Checkbox>)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('applies the base class to the label', () => {
    const { container } = render(<Checkbox>Accept terms</Checkbox>)
    expect(container.firstChild).toHaveClass('rudiment-checkbox')
  })

  it('applies the disabled class when isDisabled is true', () => {
    const { container } = render(<Checkbox isDisabled>Accept terms</Checkbox>)
    expect(container.firstChild).toHaveClass('rudiment-checkbox--disabled')
  })

  it('does not apply the disabled class by default', () => {
    const { container } = render(<Checkbox>Accept terms</Checkbox>)
    expect(container.firstChild).not.toHaveClass('rudiment-checkbox--disabled')
  })

  it('applies the input class to the hidden input', () => {
    render(<Checkbox>Accept terms</Checkbox>)
    expect(screen.getByRole('checkbox')).toHaveClass('rudiment-checkbox__input')
  })

  it('renders the custom control element', () => {
    const { container } = render(<Checkbox>Accept terms</Checkbox>)
    expect(container.querySelector('.rudiment-checkbox__control')).toBeInTheDocument()
  })

  it('renders the label element', () => {
    const { container } = render(<Checkbox>Accept terms</Checkbox>)
    expect(container.querySelector('.rudiment-checkbox__label')).toBeInTheDocument()
  })

  it('applies the checked class to the control when isSelected is true', () => {
    const { container } = render(<Checkbox isSelected>Accept terms</Checkbox>)
    expect(container.querySelector('.rudiment-checkbox__control')).toHaveClass(
      'rudiment-checkbox__control--checked'
    )
  })

  it('applies the indeterminate class when isIndeterminate is true', () => {
    const { container } = render(<Checkbox isIndeterminate>Accept terms</Checkbox>)
    expect(container.querySelector('.rudiment-checkbox__control')).toHaveClass(
      'rudiment-checkbox__control--indeterminate'
    )
  })

  it('merges a custom className', () => {
    const { container } = render(<Checkbox className="my-check">Accept terms</Checkbox>)
    expect(container.firstChild).toHaveClass('rudiment-checkbox')
    expect(container.firstChild).toHaveClass('my-check')
  })

  it('disables the checkbox input when isDisabled is true', () => {
    render(<Checkbox isDisabled>Accept terms</Checkbox>)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })
})
