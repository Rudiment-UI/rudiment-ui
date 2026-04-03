import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { DonutChart } from './DonutChart'

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
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 100 },
]

describe('DonutChart', () => {
  it('renders with accessible label', () => {
    render(
      <DonutChart data={sampleData} label="Device breakdown" />,
    )
    expect(screen.getByRole('img', { name: 'Device breakdown' })).toBeInTheDocument()
  })

  it('applies rudiment-chart class', () => {
    const { container } = render(
      <DonutChart data={sampleData} label="Devices" />,
    )
    expect(container.firstChild).toHaveClass('rudiment-chart')
  })

  it('merges custom className', () => {
    const { container } = render(
      <DonutChart data={sampleData} label="Devices" className="my-chart" />,
    )
    expect(container.firstChild).toHaveClass('rudiment-chart')
    expect(container.firstChild).toHaveClass('my-chart')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <DonutChart data={sampleData} label="Device breakdown" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
