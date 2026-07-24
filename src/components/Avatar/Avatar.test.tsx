import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiAvatar } from './Avatar'

describe('Avatar', () => {
  it('renders initials from name', () => {
    render(<RudiAvatar name="John Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders single initial from single name', () => {
    render(<RudiAvatar name="Alice" />)
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('renders image when src provided', () => {
    const { container } = render(<RudiAvatar src="https://example.com/avatar.png" alt="User" />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png')
  })

  it('falls back to initials when image fails', () => {
    render(<RudiAvatar src="https://example.com/broken.png" name="John Doe" />)
    const img = screen.getByRole('img', { name: 'John Doe' }).querySelector('img')
    expect(img).toBeInTheDocument()

    fireEvent.error(img!)

    expect(screen.getByText('JD')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'John Doe' }).querySelector('img')).not.toBeInTheDocument()
  })

  it('has role="img" with aria-label from name', () => {
    render(<RudiAvatar name="John Doe" />)
    expect(screen.getByRole('img', { name: 'John Doe' })).toBeInTheDocument()
  })

  it('has role="img" with aria-label from alt when alt is provided', () => {
    render(<RudiAvatar name="John Doe" alt="JD avatar" />)
    expect(screen.getByRole('img', { name: 'JD avatar' })).toBeInTheDocument()
  })

  it('applies size class for sm', () => {
    const { container } = render(<RudiAvatar name="A" size="sm" />)
    expect(container.firstChild).toHaveClass('rudi-avatar--sm')
  })

  it('applies size class for md', () => {
    const { container } = render(<RudiAvatar name="A" size="md" />)
    expect(container.firstChild).toHaveClass('rudi-avatar--md')
  })

  it('applies size class for lg', () => {
    const { container } = render(<RudiAvatar name="A" size="lg" />)
    expect(container.firstChild).toHaveClass('rudi-avatar--lg')
  })

  it('renders status Badge dot when status provided', () => {
    const { container } = render(<RudiAvatar name="John Doe" status="success" />)
    const statusEl = container.querySelector('.rudi-avatar__status')
    expect(statusEl).toBeInTheDocument()
  })

  it('does not render status element when status not provided', () => {
    const { container } = render(<RudiAvatar name="John Doe" />)
    const statusEl = container.querySelector('.rudi-avatar__status')
    expect(statusEl).not.toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(<RudiAvatar name="A" className="my-avatar" />)
    expect(container.firstChild).toHaveClass('rudi-avatar')
    expect(container.firstChild).toHaveClass('my-avatar')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiAvatar name="John Doe" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
