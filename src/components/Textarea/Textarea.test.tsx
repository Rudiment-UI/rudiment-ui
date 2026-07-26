import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { RudiTextarea } from './Textarea'

describe('Textarea', () => {
  it('renders a labeled textarea', () => {
    render(<RudiTextarea label="Message" />)
    const field = screen.getByRole('textbox', { name: 'Message' })
    expect(field.tagName).toBe('TEXTAREA')
    expect(field).toHaveClass('rudi-textarea__field')
  })

  it('applies rows and resize', () => {
    render(<RudiTextarea label="Notes" rows={8} resize="none" />)
    const field = screen.getByRole('textbox')
    expect(field).toHaveAttribute('rows', '8')
    expect(field).toHaveClass('rudi-textarea__field--resize-none')
  })

  it('reports value changes', async () => {
    const onChange = vi.fn()
    render(<RudiTextarea label="Bio" onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'hi')
    expect(onChange).toHaveBeenCalled()
  })

  it('renders a description', () => {
    render(<RudiTextarea label="Bio" description="Tell us about yourself" />)
    expect(screen.getByText('Tell us about yourself')).toBeInTheDocument()
  })

  it('renders an error message and marks the field invalid', () => {
    render(<RudiTextarea label="Bio" errorMessage="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('rudi-textarea__field--error')
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiTextarea label="Bio" className="my-textarea" />,
    )
    expect(container.firstChild).toHaveClass('rudi-textarea', 'my-textarea')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiTextarea label="Feedback" description="Optional" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
