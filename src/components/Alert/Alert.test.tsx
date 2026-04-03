import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert variant="info">Something happened.</Alert>)
    expect(screen.getByText('Something happened.')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<Alert variant="info">Message</Alert>)
    expect(container.firstChild).toHaveClass('rudiment-alert')
  })

  it('applies the variant class', () => {
    const { container } = render(<Alert variant="success">All good.</Alert>)
    expect(container.firstChild).toHaveClass('rudiment-alert--success')
  })

  it('applies each supported variant class', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const
    for (const variant of variants) {
      const { container } = render(<Alert variant={variant}>Msg</Alert>)
      expect(container.firstChild).toHaveClass(`rudiment-alert--${variant}`)
    }
  })

  it('renders the title when provided', () => {
    render(<Alert variant="warning" title="Watch out">Details here.</Alert>)
    expect(screen.getByText('Watch out')).toBeInTheDocument()
  })

  it('applies the title class', () => {
    render(<Alert variant="warning" title="Watch out">Details here.</Alert>)
    expect(screen.getByText('Watch out')).toHaveClass('rudiment-alert__title')
  })

  it('does not render the title element when title is omitted', () => {
    const { container } = render(<Alert variant="info">Message</Alert>)
    expect(
      container.querySelector('.rudiment-alert__title'),
    ).not.toBeInTheDocument()
  })

  it('has role="alert" by default', () => {
    render(<Alert variant="error">Error!</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('has role="status" when isPolite is true', () => {
    render(<Alert variant="info" isPolite>Info.</Alert>)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <Alert variant="info" className="my-alert">
        Msg
      </Alert>,
    )
    expect(container.firstChild).toHaveClass('rudiment-alert')
    expect(container.firstChild).toHaveClass('my-alert')
  })

  it('renders an icon when the icon prop is provided', () => {
    const { container } = render(
      <Alert variant="info" icon="mdi:information">
        Message
      </Alert>,
    )
    expect(
      container.querySelector('.rudiment-alert__icon'),
    ).toBeInTheDocument()
  })

  it('applies the has-icon modifier class when icon is provided', () => {
    const { container } = render(
      <Alert variant="info" icon="mdi:information">
        Message
      </Alert>,
    )
    expect(container.firstChild).toHaveClass('rudiment-alert--has-icon')
  })

  it('does not render the icon element when icon is omitted', () => {
    const { container } = render(<Alert variant="info">Message</Alert>)
    expect(
      container.querySelector('.rudiment-alert__icon'),
    ).not.toBeInTheDocument()
  })

  it('does not apply the has-icon modifier when icon is omitted', () => {
    const { container } = render(<Alert variant="info">Message</Alert>)
    expect(container.firstChild).not.toHaveClass('rudiment-alert--has-icon')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Alert variant="info">Something happened.</Alert>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations with a title', async () => {
    const { container } = render(
      <Alert variant="warning" title="Watch out">
        Details here.
      </Alert>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations with an icon', async () => {
    const { container } = render(
      <Alert variant="info" icon="mdi:information" title="Info">
        Details here.
      </Alert>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('does not render a dismiss button by default', () => {
    const { container } = render(<Alert variant="info">Message</Alert>)
    expect(
      container.querySelector('.rudiment-alert__dismiss'),
    ).not.toBeInTheDocument()
  })

  it('renders a dismiss button when dismissible is true', () => {
    const { container } = render(
      <Alert variant="info" dismissible>
        Message
      </Alert>,
    )
    expect(
      container.querySelector('.rudiment-alert__dismiss'),
    ).toBeInTheDocument()
  })

  it('applies the dismissible modifier class', () => {
    const { container } = render(
      <Alert variant="info" dismissible>
        Message
      </Alert>,
    )
    expect(container.firstChild).toHaveClass('rudiment-alert--dismissible')
  })

  it('removes the alert from the DOM when dismiss is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Alert variant="info" dismissible>
        Message
      </Alert>,
    )
    await user.click(screen.getByRole('button', { name: /dismiss alert/i }))
    expect(screen.queryByText('Message')).not.toBeInTheDocument()
  })

  it('calls onDismiss when dismiss is clicked', async () => {
    const user = userEvent.setup()
    const handleDismiss = vi.fn()
    render(
      <Alert variant="info" dismissible onDismiss={handleDismiss}>
        Message
      </Alert>,
    )
    await user.click(screen.getByRole('button', { name: /dismiss alert/i }))
    expect(handleDismiss).toHaveBeenCalledOnce()
  })

  it('dismiss button has accessible label', () => {
    render(
      <Alert variant="info" dismissible>
        Message
      </Alert>,
    )
    expect(
      screen.getByRole('button', { name: /dismiss alert/i }),
    ).toBeInTheDocument()
  })

  it('has no accessibility violations when dismissible', async () => {
    const { container } = render(
      <Alert variant="warning" title="Heads up" dismissible>
        Details here.
      </Alert>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
