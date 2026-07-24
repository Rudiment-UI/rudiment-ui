import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { RudiLineChart } from './LineChart'

vi.mock('recharts', async () => {
  const actual = await vi.importActual<typeof import('recharts')>('recharts')
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 500, height: 300 }}>{children}</div>
    ),
  }
})

const sampleData = [
  { month: 'Jan', revenue: 4000, profit: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398 },
  { month: 'Mar', revenue: 5000, profit: 3200 },
]

describe('LineChart', () => {
  it('renders with accessible label', () => {
    render(
      <RudiLineChart
        data={sampleData}
        dataKeys={['revenue']}
        indexKey="month"
        label="Revenue trend"
      />,
    )
    expect(screen.getByRole('img', { name: 'Revenue trend' })).toBeInTheDocument()
  })

  it('applies rudi-chart class', () => {
    const { container } = render(
      <RudiLineChart
        data={sampleData}
        dataKeys={['revenue']}
        indexKey="month"
        label="Revenue"
      />,
    )
    expect(container.firstChild).toHaveClass('rudi-chart')
  })

  it('merges custom className', () => {
    const { container } = render(
      <RudiLineChart
        data={sampleData}
        dataKeys={['revenue']}
        indexKey="month"
        label="Revenue"
        className="my-chart"
      />,
    )
    expect(container.firstChild).toHaveClass('rudi-chart')
    expect(container.firstChild).toHaveClass('my-chart')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiLineChart
        data={sampleData}
        dataKeys={['revenue']}
        indexKey="month"
        label="Revenue trend"
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
