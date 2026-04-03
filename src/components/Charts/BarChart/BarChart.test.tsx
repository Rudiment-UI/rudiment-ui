import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { BarChart } from './BarChart'

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
  { month: 'Jan', sales: 400, returns: 50 },
  { month: 'Feb', sales: 300, returns: 40 },
  { month: 'Mar', sales: 500, returns: 60 },
]

describe('BarChart', () => {
  it('renders with accessible label', () => {
    render(
      <BarChart
        data={sampleData}
        dataKeys={['sales']}
        indexKey="month"
        label="Monthly sales"
      />,
    )
    expect(screen.getByRole('img', { name: 'Monthly sales' })).toBeInTheDocument()
  })

  it('applies rudiment-chart class', () => {
    const { container } = render(
      <BarChart
        data={sampleData}
        dataKeys={['sales']}
        indexKey="month"
        label="Sales"
      />,
    )
    expect(container.firstChild).toHaveClass('rudiment-chart')
  })

  it('merges custom className', () => {
    const { container } = render(
      <BarChart
        data={sampleData}
        dataKeys={['sales']}
        indexKey="month"
        label="Sales"
        className="my-chart"
      />,
    )
    expect(container.firstChild).toHaveClass('rudiment-chart')
    expect(container.firstChild).toHaveClass('my-chart')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <BarChart
        data={sampleData}
        dataKeys={['sales']}
        indexKey="month"
        label="Monthly sales"
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
