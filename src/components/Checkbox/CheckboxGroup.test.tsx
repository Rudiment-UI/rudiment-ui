import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CheckboxGroup } from './CheckboxGroup'
import { Checkbox } from './Checkbox'

describe('CheckboxGroup', () => {
  it('renders the group label', () => {
    render(
      <CheckboxGroup label="Interests">
        <Checkbox value="a">Option A</Checkbox>
      </CheckboxGroup>
    )
    expect(screen.getByText('Interests')).toBeInTheDocument()
  })

  it('applies the group class', () => {
    const { container } = render(
      <CheckboxGroup label="Interests">
        <Checkbox value="a">Option A</Checkbox>
      </CheckboxGroup>
    )
    expect(container.firstChild).toHaveClass('rudiment-checkbox-group')
  })

  it('applies the label class', () => {
    render(
      <CheckboxGroup label="Interests">
        <Checkbox value="a">Option A</Checkbox>
      </CheckboxGroup>
    )
    expect(screen.getByText('Interests')).toHaveClass('rudiment-checkbox-group__label')
  })

  it('renders children checkboxes', () => {
    render(
      <CheckboxGroup label="Interests">
        <Checkbox value="a">Option A</Checkbox>
        <Checkbox value="b">Option B</Checkbox>
      </CheckboxGroup>
    )
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)
  })

  it('renders the description when provided and no error', () => {
    render(
      <CheckboxGroup label="Interests" description="Select all that apply.">
        <Checkbox value="a">Option A</Checkbox>
      </CheckboxGroup>
    )
    expect(screen.getByText('Select all that apply.')).toBeInTheDocument()
  })

  it('renders the error message when errorMessage is provided', () => {
    render(
      <CheckboxGroup label="Interests" errorMessage="Select at least one.">
        <Checkbox value="a">Option A</Checkbox>
      </CheckboxGroup>
    )
    expect(screen.getByText('Select at least one.')).toBeInTheDocument()
  })

  it('does not render the description when errorMessage is present', () => {
    render(
      <CheckboxGroup
        label="Interests"
        description="Select all that apply."
        errorMessage="Select at least one."
      >
        <Checkbox value="a">Option A</Checkbox>
      </CheckboxGroup>
    )
    expect(screen.queryByText('Select all that apply.')).not.toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <CheckboxGroup label="Interests" className="extra">
        <Checkbox value="a">Option A</Checkbox>
      </CheckboxGroup>
    )
    expect(container.firstChild).toHaveClass('rudiment-checkbox-group')
    expect(container.firstChild).toHaveClass('extra')
  })

  it('has the group role', () => {
    render(
      <CheckboxGroup label="Interests">
        <Checkbox value="a">Option A</Checkbox>
      </CheckboxGroup>
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
  })
})
