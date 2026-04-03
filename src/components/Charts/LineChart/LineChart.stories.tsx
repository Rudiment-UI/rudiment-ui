import type { Meta, StoryObj } from '@storybook/react'
import { LineChart } from './LineChart'

const sampleData = [
  { month: 'Jan', revenue: 4000, profit: 2400, expenses: 1600 },
  { month: 'Feb', revenue: 3000, profit: 1398, expenses: 1602 },
  { month: 'Mar', revenue: 5000, profit: 3200, expenses: 1800 },
  { month: 'Apr', revenue: 2780, profit: 1908, expenses: 872 },
  { month: 'May', revenue: 1890, profit: 800, expenses: 1090 },
  { month: 'Jun', revenue: 2390, profit: 1200, expenses: 1190 },
]

const meta = {
  title: 'Components/Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A token-aware line chart wrapper around Recharts. Supports multiple series, curved and linear interpolation, and automatic dark mode theming via design tokens.',
      },
    },
  },
  args: {
    data: sampleData,
    dataKeys: ['revenue'],
    indexKey: 'month',
    label: 'Revenue over time',
    curved: true,
    showDots: true,
    showGrid: true,
    showLegend: true,
    height: 300,
  },
  argTypes: {
    curved: {
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    showDots: {
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    showGrid: {
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    showLegend: {
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    height: {
      control: 'number',
      table: { category: 'Appearance' },
    },
    label: {
      control: 'text',
      table: { category: 'Content' },
    },
  },
} satisfies Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MultipleSeries: Story = {
  args: {
    dataKeys: ['revenue', 'profit', 'expenses'],
    label: 'Financial overview',
  },
}

export const LinearInterpolation: Story = {
  args: {
    curved: false,
    label: 'Revenue (linear)',
  },
}

export const NoDots: Story = {
  args: {
    showDots: false,
    label: 'Revenue trend',
  },
}

export const Minimal: Story = {
  args: {
    showGrid: false,
    showLegend: false,
    showDots: false,
    label: 'Minimal line chart',
  },
}
