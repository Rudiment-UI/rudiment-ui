import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiBreadcrumb, type RudiBreadcrumbItem } from './Breadcrumb'

const items: RudiBreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shoes', href: '/shoes' },
  { label: 'Running' },
]

describe('Breadcrumb', () => {
  it('renders a labeled navigation landmark', () => {
    render(<RudiBreadcrumb items={items} />)
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
  })

  it('renders links for all but the last item', () => {
    render(<RudiBreadcrumb items={items} />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Shoes' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Running' })).not.toBeInTheDocument()
  })

  it('marks the last item as the current page', () => {
    render(<RudiBreadcrumb items={items} />)
    expect(screen.getByText('Running')).toHaveAttribute('aria-current', 'page')
  })

  it('renders one fewer separator than items', () => {
    const { container } = render(<RudiBreadcrumb items={items} />)
    expect(container.querySelectorAll('.rudi-breadcrumb__separator')).toHaveLength(
      items.length - 1,
    )
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiBreadcrumb items={items} className="my-crumb" />,
    )
    expect(container.firstChild).toHaveClass('rudi-breadcrumb', 'my-crumb')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiBreadcrumb items={items} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
