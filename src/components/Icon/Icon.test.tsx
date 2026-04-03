import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Icon } from './Icon'

vi.mock('@iconify/react', () => ({
  Icon: (props: any) => <svg data-testid="iconify-icon" data-icon={props.icon} />,
}))

describe('Icon', () => {
  it('renders the iconify icon', () => {
    render(<Icon icon="lucide:home" label="Home" />)
    expect(screen.getByTestId('iconify-icon')).toBeInTheDocument()
    expect(screen.getByTestId('iconify-icon')).toHaveAttribute(
      'data-icon',
      'lucide:home',
    )
  })

  it('applies the base class', () => {
    const { container } = render(<Icon icon="lucide:home" label="Home" />)
    expect(container.firstChild).toHaveClass('rudiment-icon')
  })

  it('applies size class for sm', () => {
    const { container } = render(
      <Icon icon="lucide:home" size="sm" label="Home" />,
    )
    expect(container.firstChild).toHaveClass('rudiment-icon--sm')
  })

  it('applies size class for md', () => {
    const { container } = render(
      <Icon icon="lucide:home" size="md" label="Home" />,
    )
    expect(container.firstChild).toHaveClass('rudiment-icon--md')
  })

  it('applies size class for lg', () => {
    const { container } = render(
      <Icon icon="lucide:home" size="lg" label="Home" />,
    )
    expect(container.firstChild).toHaveClass('rudiment-icon--lg')
  })

  it('applies inline width and height for numeric size', () => {
    const { container } = render(
      <Icon icon="lucide:home" size={32} label="Home" />,
    )
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('32px')
    expect(el.style.height).toBe('32px')
  })

  it('does not apply a size class for numeric size', () => {
    const { container } = render(
      <Icon icon="lucide:home" size={32} label="Home" />,
    )
    expect(container.firstChild).not.toHaveClass('rudiment-icon--sm')
    expect(container.firstChild).not.toHaveClass('rudiment-icon--md')
    expect(container.firstChild).not.toHaveClass('rudiment-icon--lg')
  })

  it('has role="img" and aria-label when label is provided', () => {
    render(<Icon icon="lucide:home" label="Home" />)
    const el = screen.getByRole('img')
    expect(el).toHaveAttribute('aria-label', 'Home')
  })

  it('has aria-hidden="true" and no role when label is absent', () => {
    const { container } = render(<Icon icon="lucide:home" />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
    expect(container.firstChild).not.toHaveAttribute('role')
  })

  it('applies color as inline style', () => {
    const { container } = render(
      <Icon icon="lucide:home" color="red" label="Home" />,
    )
    const el = container.firstChild as HTMLElement
    expect(el.style.color).toBe('red')
  })

  it('applies both color and numeric size as inline styles', () => {
    const { container } = render(
      <Icon icon="lucide:home" size={24} color="blue" label="Home" />,
    )
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('24px')
    expect(el.style.height).toBe('24px')
    expect(el.style.color).toBe('blue')
  })

  it('merges a custom className', () => {
    const { container } = render(
      <Icon icon="lucide:home" className="my-icon" label="Home" />,
    )
    expect(container.firstChild).toHaveClass('rudiment-icon')
    expect(container.firstChild).toHaveClass('my-icon')
  })

  it('has no accessibility violations with label', async () => {
    const { container } = render(<Icon icon="lucide:home" label="Home" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations when decorative', async () => {
    const { container } = render(<Icon icon="lucide:home" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
