import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RadioGroup } from './RadioGroup'

describe('RadioGroup', () => {
  it('renders the group label', () => {
    render(<RadioGroup label="Shipping" />)
    expect(screen.getByText('Shipping')).toBeInTheDocument()
  })

  it('applies the group class', () => {
    const { container } = render(<RadioGroup label="Shipping" />)
    expect(container.firstChild).toHaveClass('rudiment-radio-group')
  })

  it('applies the label class', () => {
    render(<RadioGroup label="Shipping" />)
    expect(screen.getByText('Shipping')).toHaveClass('rudiment-radio-group__label')
  })

  it('renders the options container', () => {
    const { container } = render(<RadioGroup label="Shipping" />)
    expect(container.querySelector('.rudiment-radio-group__options')).toBeInTheDocument()
  })

  it('does not apply the horizontal class by default', () => {
    const { container } = render(<RadioGroup label="Shipping" />)
    expect(container.querySelector('.rudiment-radio-group__options')).not.toHaveClass(
      'rudiment-radio-group__options--horizontal'
    )
  })

  it('applies the horizontal class when orientation is horizontal', () => {
    const { container } = render(
      <RadioGroup label="Shipping" orientation="horizontal" />
    )
    expect(container.querySelector('.rudiment-radio-group__options')).toHaveClass(
      'rudiment-radio-group__options--horizontal'
    )
  })

  it('renders the description when provided and no error', () => {
    render(<RadioGroup label="Shipping" description="Choose a delivery speed." />)
    expect(screen.getByText('Choose a delivery speed.')).toBeInTheDocument()
  })

  it('renders the error message when errorMessage is provided', () => {
    render(<RadioGroup label="Shipping" errorMessage="Select an option." />)
    expect(screen.getByText('Select an option.')).toBeInTheDocument()
  })

  it('does not render the description when errorMessage is present', () => {
    render(
      <RadioGroup
        label="Shipping"
        description="Choose a delivery speed."
        errorMessage="Select an option."
      />
    )
    expect(screen.queryByText('Choose a delivery speed.')).not.toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(<RadioGroup label="Shipping" className="extra" />)
    expect(container.firstChild).toHaveClass('rudiment-radio-group')
    expect(container.firstChild).toHaveClass('extra')
  })

  it('has the radiogroup role', () => {
    render(<RadioGroup label="Shipping" />)
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <RadioGroup label="Shipping">
        <span data-testid="child">Standard</span>
      </RadioGroup>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
