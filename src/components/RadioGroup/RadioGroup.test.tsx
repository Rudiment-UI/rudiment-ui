import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiRadioGroup } from './RadioGroup'

describe('RadioGroup', () => {
  it('renders the group label', () => {
    render(<RudiRadioGroup label="Shipping" />)
    expect(screen.getByText('Shipping')).toBeInTheDocument()
  })

  it('applies the group class', () => {
    const { container } = render(<RudiRadioGroup label="Shipping" />)
    expect(container.firstChild).toHaveClass('rudi-radio-group')
  })

  it('applies the label class', () => {
    render(<RudiRadioGroup label="Shipping" />)
    expect(screen.getByText('Shipping')).toHaveClass(
      'rudi-radio-group__label',
    )
  })

  it('renders the options container', () => {
    const { container } = render(<RudiRadioGroup label="Shipping" />)
    expect(
      container.querySelector('.rudi-radio-group__options'),
    ).toBeInTheDocument()
  })

  it('does not apply the horizontal class by default', () => {
    const { container } = render(<RudiRadioGroup label="Shipping" />)
    expect(
      container.querySelector('.rudi-radio-group__options'),
    ).not.toHaveClass('rudi-radio-group__options--horizontal')
  })

  it('applies the horizontal class when orientation is horizontal', () => {
    const { container } = render(
      <RudiRadioGroup label="Shipping" orientation="horizontal" />,
    )
    expect(
      container.querySelector('.rudi-radio-group__options'),
    ).toHaveClass('rudi-radio-group__options--horizontal')
  })

  it('renders the description when provided and no error', () => {
    render(
      <RudiRadioGroup label="Shipping" description="Choose a delivery speed." />,
    )
    expect(screen.getByText('Choose a delivery speed.')).toBeInTheDocument()
  })

  it('renders the error message when errorMessage is provided', () => {
    render(<RudiRadioGroup label="Shipping" errorMessage="Select an option." />)
    expect(screen.getByText('Select an option.')).toBeInTheDocument()
  })

  it('does not render the description when errorMessage is present', () => {
    render(
      <RudiRadioGroup
        label="Shipping"
        description="Choose a delivery speed."
        errorMessage="Select an option."
      />,
    )
    expect(
      screen.queryByText('Choose a delivery speed.'),
    ).not.toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiRadioGroup label="Shipping" className="extra" />,
    )
    expect(container.firstChild).toHaveClass('rudi-radio-group')
    expect(container.firstChild).toHaveClass('extra')
  })

  it('has the radiogroup role', () => {
    render(<RudiRadioGroup label="Shipping" />)
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <RudiRadioGroup label="Shipping">
        <span data-testid="child">Standard</span>
      </RudiRadioGroup>,
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiRadioGroup label="Shipping" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations in error state', async () => {
    const { container } = render(
      <RudiRadioGroup label="Shipping" errorMessage="Select an option." />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
