import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiPageHeader } from './PageHeader'

describe('PageHeader', () => {
  it('renders the base class and title as a level-1 heading', () => {
    const { container } = render(<RudiPageHeader title="Dashboard" />)
    expect(container.firstChild).toHaveClass('rudi-page-header')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Dashboard' }),
    ).toBeInTheDocument()
  })

  it('renders an optional subtitle', () => {
    const { container } = render(
      <RudiPageHeader title="Dashboard" subtitle="Your account at a glance" />,
    )
    expect(
      container.querySelector('.rudi-page-header__subtitle'),
    ).toHaveTextContent('Your account at a glance')
  })

  it('omits the subtitle element when not provided', () => {
    const { container } = render(<RudiPageHeader title="Dashboard" />)
    expect(container.querySelector('.rudi-page-header__subtitle')).toBeNull()
  })

  it('renders actions when provided', () => {
    render(
      <RudiPageHeader
        title="Dashboard"
        actions={<button type="button">Export</button>}
      />,
    )
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument()
  })

  it('respects a custom heading level', () => {
    render(<RudiPageHeader title="Section" headingLevel={2} />)
    expect(
      screen.getByRole('heading', { level: 2, name: 'Section' }),
    ).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiPageHeader title="Dashboard" className="my-header" />,
    )
    expect(container.firstChild).toHaveClass('rudi-page-header', 'my-header')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiPageHeader
        title="Dashboard"
        subtitle="Your account at a glance"
        actions={<button type="button">Export</button>}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
