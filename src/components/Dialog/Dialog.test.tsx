import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Dialog } from './Dialog'

describe('Dialog', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Dialog isOpen={false} onClose={() => {}} title="Confirm">
        Content
      </Dialog>,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders the dialog when isOpen is true', () => {
    render(
      <Dialog isOpen onClose={() => {}} title="Confirm">
        Content
      </Dialog>,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(
      <Dialog isOpen onClose={() => {}} title="Confirm action">
        Content
      </Dialog>,
    )
    expect(screen.getByText('Confirm action')).toBeInTheDocument()
  })

  it('applies the base class to the dialog', () => {
    render(
      <Dialog isOpen onClose={() => {}} title="Confirm">
        Content
      </Dialog>,
    )
    expect(screen.getByRole('dialog')).toHaveClass('rudiment-dialog')
  })

  it('applies the md size class by default', () => {
    render(
      <Dialog isOpen onClose={() => {}} title="Confirm">
        Content
      </Dialog>,
    )
    expect(screen.getByRole('dialog')).toHaveClass('rudiment-dialog--md')
  })

  it('applies the specified size class', () => {
    render(
      <Dialog isOpen onClose={() => {}} title="Confirm" size="lg">
        Content
      </Dialog>,
    )
    expect(screen.getByRole('dialog')).toHaveClass('rudiment-dialog--lg')
  })

  it('renders the title with the title class', () => {
    render(
      <Dialog isOpen onClose={() => {}} title="Confirm">
        Content
      </Dialog>,
    )
    expect(screen.getByText('Confirm')).toHaveClass('rudiment-dialog__title')
  })

  it('renders the body wrapper', () => {
    const { container } = render(
      <Dialog isOpen onClose={() => {}} title="Confirm">
        Body text
      </Dialog>,
    )
    expect(
      document.body.querySelector('.rudiment-dialog__body'),
    ).toBeInTheDocument()
  })

  it('renders children in the body', () => {
    render(
      <Dialog isOpen onClose={() => {}} title="Confirm">
        Body text
      </Dialog>,
    )
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    render(
      <Dialog isOpen onClose={() => {}} title="Confirm" className="my-dialog">
        Content
      </Dialog>,
    )
    expect(screen.getByRole('dialog')).toHaveClass('rudiment-dialog')
    expect(screen.getByRole('dialog')).toHaveClass('my-dialog')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Dialog isOpen onClose={() => {}} title="Confirm">
        Content
      </Dialog>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
