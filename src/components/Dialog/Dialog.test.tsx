import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiDialog } from './Dialog'

describe('Dialog', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <RudiDialog isOpen={false} onClose={() => {}} title="Confirm">
        Content
      </RudiDialog>,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders the dialog when isOpen is true', () => {
    render(
      <RudiDialog isOpen onClose={() => {}} title="Confirm">
        Content
      </RudiDialog>,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(
      <RudiDialog isOpen onClose={() => {}} title="Confirm action">
        Content
      </RudiDialog>,
    )
    expect(screen.getByText('Confirm action')).toBeInTheDocument()
  })

  it('applies the base class to the dialog', () => {
    render(
      <RudiDialog isOpen onClose={() => {}} title="Confirm">
        Content
      </RudiDialog>,
    )
    expect(screen.getByRole('dialog')).toHaveClass('rudi-dialog')
  })

  it('applies the md size class by default', () => {
    render(
      <RudiDialog isOpen onClose={() => {}} title="Confirm">
        Content
      </RudiDialog>,
    )
    expect(screen.getByRole('dialog')).toHaveClass('rudi-dialog--md')
  })

  it('applies the specified size class', () => {
    render(
      <RudiDialog isOpen onClose={() => {}} title="Confirm" size="lg">
        Content
      </RudiDialog>,
    )
    expect(screen.getByRole('dialog')).toHaveClass('rudi-dialog--lg')
  })

  it('renders the title with the title class', () => {
    render(
      <RudiDialog isOpen onClose={() => {}} title="Confirm">
        Content
      </RudiDialog>,
    )
    expect(screen.getByText('Confirm')).toHaveClass('rudi-dialog__title')
  })

  it('renders the body wrapper', () => {
    const { container } = render(
      <RudiDialog isOpen onClose={() => {}} title="Confirm">
        Body text
      </RudiDialog>,
    )
    expect(
      document.body.querySelector('.rudi-dialog__body'),
    ).toBeInTheDocument()
  })

  it('renders children in the body', () => {
    render(
      <RudiDialog isOpen onClose={() => {}} title="Confirm">
        Body text
      </RudiDialog>,
    )
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    render(
      <RudiDialog isOpen onClose={() => {}} title="Confirm" className="my-dialog">
        Content
      </RudiDialog>,
    )
    expect(screen.getByRole('dialog')).toHaveClass('rudi-dialog')
    expect(screen.getByRole('dialog')).toHaveClass('my-dialog')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiDialog isOpen onClose={() => {}} title="Confirm">
        Content
      </RudiDialog>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
