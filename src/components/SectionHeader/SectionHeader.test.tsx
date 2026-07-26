import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiSectionHeader } from './SectionHeader'

describe('SectionHeader', () => {
  it('renders the base class and title as a level-2 heading', () => {
    const { container } = render(<RudiSectionHeader title="Recent activity" />)
    expect(container.firstChild).toHaveClass('rudi-section-header')
    expect(
      screen.getByRole('heading', { level: 2, name: 'Recent activity' }),
    ).toBeInTheDocument()
  })

  it('renders an optional description', () => {
    const { container } = render(
      <RudiSectionHeader title="Recent activity" description="Last 30 days" />,
    )
    expect(
      container.querySelector('.rudi-section-header__description'),
    ).toHaveTextContent('Last 30 days')
  })

  it('omits the description element when not provided', () => {
    const { container } = render(<RudiSectionHeader title="Recent activity" />)
    expect(
      container.querySelector('.rudi-section-header__description'),
    ).toBeNull()
  })

  it('renders an action when provided', () => {
    render(
      <RudiSectionHeader
        title="Recent activity"
        action={<a href="/all">See all</a>}
      />,
    )
    expect(screen.getByRole('link', { name: 'See all' })).toBeInTheDocument()
  })

  it('respects a custom heading level', () => {
    render(<RudiSectionHeader title="Sub" headingLevel={3} />)
    expect(
      screen.getByRole('heading', { level: 3, name: 'Sub' }),
    ).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiSectionHeader title="Recent activity" className="my-section" />,
    )
    expect(container.firstChild).toHaveClass(
      'rudi-section-header',
      'my-section',
    )
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiSectionHeader
        title="Recent activity"
        description="Last 30 days"
        action={<a href="/all">See all</a>}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
