import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Tag } from './Tag'

describe('Tag', () => {
  it('renders children', () => {
    render(<Tag>Label</Tag>)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<Tag>Label</Tag>)
    expect(container.firstChild).toHaveClass('rudiment-tag')
  })

  it('applies each supported variant class', () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const
    for (const variant of variants) {
      const { container } = render(<Tag variant={variant}>Msg</Tag>)
      expect(container.firstChild).toHaveClass(`rudiment-tag--${variant}`)
    }
  })

  it('renders close button when dismissible is true', () => {
    render(<Tag dismissible>Removable</Tag>)
    expect(screen.getByRole('button', { name: 'Remove Removable' })).toBeInTheDocument()
  })

  it('close button fires onDismiss on click', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<Tag dismissible onDismiss={onDismiss}>Item</Tag>)
    await user.click(screen.getByRole('button', { name: 'Remove Item' }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('applies the dismissible modifier class', () => {
    const { container } = render(<Tag dismissible>Removable</Tag>)
    expect(container.firstChild).toHaveClass('rudiment-tag--dismissible')
  })

  it('removes the tag from the DOM when dismiss is clicked', async () => {
    const user = userEvent.setup()
    render(<Tag dismissible>Removable</Tag>)
    await user.click(screen.getByRole('button', { name: 'Remove Removable' }))
    expect(screen.queryByText('Removable')).not.toBeInTheDocument()
  })

  it('does not render close button when dismissible is false', () => {
    const { container } = render(<Tag>Static</Tag>)
    expect(container.querySelector('.rudiment-tag__close')).not.toBeInTheDocument()
  })

  it('renders as a button element when onPress is provided', () => {
    render(<Tag onPress={() => {}}>Clickable</Tag>)
    expect(screen.getByRole('button', { name: 'Clickable' })).toBeInTheDocument()
  })

  it('disables interaction when isDisabled is true', () => {
    render(<Tag onPress={() => {}} isDisabled>Disabled</Tag>)
    const button = screen.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <Tag className="my-tag">Label</Tag>,
    )
    expect(container.firstChild).toHaveClass('rudiment-tag')
    expect(container.firstChild).toHaveClass('my-tag')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Tag>Label</Tag>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations with close button', async () => {
    const { container } = render(<Tag dismissible>Removable</Tag>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
