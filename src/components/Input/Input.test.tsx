import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders the label', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders an input element', () => {
    render(<Input label="Email" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('applies the wrapper class', () => {
    const { container } = render(<Input label="Email" />)
    expect(container.firstChild).toHaveClass('rudiment-input')
  })

  it('applies the label class', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email').closest('label')).toHaveClass('rudiment-input__label')
  })

  it('applies the field class to the input', () => {
    render(<Input label="Email" />)
    expect(screen.getByRole('textbox')).toHaveClass('rudiment-input__field')
  })

  it('merges a custom className on the wrapper', () => {
    const { container } = render(<Input label="Email" className="extra" />)
    expect(container.firstChild).toHaveClass('rudiment-input')
    expect(container.firstChild).toHaveClass('extra')
  })

  it('renders the required indicator when isRequired is true', () => {
    const { container } = render(<Input label="Email" isRequired />)
    expect(container.querySelector('.rudiment-input__required')).toBeInTheDocument()
  })

  it('does not render the required indicator by default', () => {
    const { container } = render(<Input label="Email" />)
    expect(container.querySelector('.rudiment-input__required')).not.toBeInTheDocument()
  })

  it('renders the description when provided and no error', () => {
    render(<Input label="Email" description="We won't spam you." />)
    expect(screen.getByText("We won't spam you.")).toBeInTheDocument()
  })

  it('renders the error message when errorMessage is provided', () => {
    render(<Input label="Email" errorMessage="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  it('applies the error class to the field when errorMessage is provided', () => {
    render(<Input label="Email" errorMessage="Invalid email" />)
    expect(screen.getByRole('textbox')).toHaveClass('rudiment-input__field--error')
  })

  it('does not apply the error class when there is no error', () => {
    render(<Input label="Email" />)
    expect(screen.getByRole('textbox')).not.toHaveClass('rudiment-input__field--error')
  })

  it('disables the input when isDisabled is true', () => {
    render(<Input label="Email" isDisabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('associates the label with the input via htmlFor', () => {
    render(<Input label="Email" />)
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email').closest('label')
    expect(label).toHaveAttribute('for', input.id)
  })
})
