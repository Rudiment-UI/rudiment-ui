import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { NavItem } from './NavItem'

vi.mock('@iconify/react', () => ({
  Icon: (props: Record<string, unknown>) => (
    <svg data-testid="iconify-icon" data-icon={props.icon} />
  ),
}))

describe('NavItem', () => {
  it('renders label text', () => {
    render(<NavItem label="Dashboard" />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders as <a> when href is provided', () => {
    render(<NavItem label="Settings" href="/settings" />)
    expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument()
  })

  it('renders as <button> when no href', () => {
    render(<NavItem label="Dashboard" />)
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('calls onPress when clicked', async () => {
    const onPress = vi.fn()
    render(<NavItem label="Dashboard" onPress={onPress} />)
    await userEvent.click(screen.getByRole('button', { name: 'Dashboard' }))
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('renders Icon when icon prop is provided', () => {
    render(<NavItem label="Dashboard" icon="lucide:home" />)
    expect(screen.getByTestId('iconify-icon')).toBeInTheDocument()
  })

  it('does not render icon element when icon is not provided', () => {
    render(<NavItem label="Dashboard" />)
    expect(screen.queryByTestId('iconify-icon')).not.toBeInTheDocument()
  })

  it('renders badge slot', () => {
    render(<NavItem label="Messages" badge={<span>5</span>} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('applies active class when isActive is true', () => {
    const { container } = render(<NavItem label="Dashboard" isActive />)
    expect(container.firstChild).toHaveClass('rudiment-nav-item--active')
  })

  it('does not apply active class when isActive is false', () => {
    const { container } = render(<NavItem label="Dashboard" />)
    expect(container.firstChild).not.toHaveClass('rudiment-nav-item--active')
  })

  it('sets disabled attribute on button when isDisabled is true', () => {
    render(<NavItem label="Dashboard" isDisabled />)
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeDisabled()
  })

  it('sets aria-disabled on link when isDisabled is true', () => {
    render(<NavItem label="Settings" href="/settings" isDisabled />)
    expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute(
      'aria-disabled',
      'true',
    )
  })

  it('merges custom className', () => {
    const { container } = render(
      <NavItem label="Dashboard" className="my-nav" />,
    )
    expect(container.firstChild).toHaveClass('rudiment-nav-item')
    expect(container.firstChild).toHaveClass('my-nav')
  })

  it('has no accessibility violations as a link', async () => {
    const { container } = render(
      <nav>
        <NavItem label="Settings" href="/settings" />
      </nav>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations as a button', async () => {
    const { container } = render(<NavItem label="Dashboard" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
