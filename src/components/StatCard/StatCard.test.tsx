import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiStatCard } from './StatCard'

describe('StatCard', () => {
  it('renders label text', () => {
    render(<RudiStatCard label="Total Revenue" value="$12,450" />)
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
  })

  it('renders value text (string)', () => {
    render(<RudiStatCard label="Revenue" value="$12,450" />)
    expect(screen.getByText('$12,450')).toBeInTheDocument()
  })

  it('renders value text (number)', () => {
    render(<RudiStatCard label="Items" value={1234} />)
    expect(screen.getByText('1234')).toBeInTheDocument()
  })

  it('renders delta with correct trend class (up)', () => {
    const { container } = render(
      <RudiStatCard label="Revenue" value="$12,450" delta="+12.5%" trend="up" />,
    )
    const delta = container.querySelector('.rudi-stat-card__delta')
    expect(delta).toHaveTextContent('+12.5%')
    expect(delta).toHaveClass('rudi-stat-card__delta--up')
  })

  it('renders delta with correct trend class (down)', () => {
    const { container } = render(
      <RudiStatCard label="Bounce" value="42%" delta="-3.2%" trend="down" />,
    )
    const delta = container.querySelector('.rudi-stat-card__delta')
    expect(delta).toHaveTextContent('-3.2%')
    expect(delta).toHaveClass('rudi-stat-card__delta--down')
  })

  it('renders delta with correct trend class (neutral)', () => {
    const { container } = render(
      <RudiStatCard label="Users" value="1,024" delta="0%" trend="neutral" />,
    )
    const delta = container.querySelector('.rudi-stat-card__delta')
    expect(delta).toHaveTextContent('0%')
    expect(delta).toHaveClass('rudi-stat-card__delta--neutral')
  })

  it('does not render delta element when delta not provided', () => {
    const { container } = render(
      <RudiStatCard label="Orders" value="3,842" />,
    )
    expect(
      container.querySelector('.rudi-stat-card__delta'),
    ).not.toBeInTheDocument()
  })

  it('renders children slot', () => {
    render(
      <RudiStatCard label="Rate" value="5.2%">
        <span>vs. last 30 days</span>
      </RudiStatCard>,
    )
    expect(screen.getByText('vs. last 30 days')).toBeInTheDocument()
  })

  it('wraps content in a Card', () => {
    const { container } = render(
      <RudiStatCard label="Revenue" value="$12,450" />,
    )
    expect(container.querySelector('.rudi-card')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(
      <RudiStatCard label="Revenue" value="$12,450" className="my-stat" />,
    )
    const card = container.querySelector('.rudi-card')
    expect(card).toHaveClass('rudi-stat-card')
    expect(card).toHaveClass('my-stat')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiStatCard
        label="Total Revenue"
        value="$12,450"
        delta="+12.5%"
        trend="up"
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
