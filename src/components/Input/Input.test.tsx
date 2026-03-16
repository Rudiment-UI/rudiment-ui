import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders with its label as the accessible name', () => {
    render(<Input label="Email" />)
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
  })

  it('accepts text input', async () => {
    const onChange = vi.fn()
    render(<Input label="Email" onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(onChange).toHaveBeenLastCalledWith('hello')
  })

  it('shows the description and links it via aria-describedby', () => {
    render(<Input label="Email" description="Your work email" />)
    const input = screen.getByRole('textbox')
    const description = screen.getByText('Your work email')
    expect(input).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining(description.id),
    )
  })

  it('shows the error message and sets aria-invalid', () => {
    render(<Input label="Email" errorMessage="Required field" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('hides the description when an error message is present', () => {
    render(
      <Input
        label="Email"
        description="Your work email"
        errorMessage="Required"
      />,
    )
    expect(screen.queryByText('Your work email')).not.toBeInTheDocument()
  })

  it('marks the input as required', () => {
    render(<Input label="Email" isRequired />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true')
  })

  it('disables the input', () => {
    render(<Input label="Email" isDisabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('forwards ref to the underlying input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input label="Email" ref={ref} />)
    expect(ref.current).toBe(screen.getByRole('textbox'))
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Input label="Email" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations in error state', async () => {
    const { container } = render(
      <Input label="Email" errorMessage="Required" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
