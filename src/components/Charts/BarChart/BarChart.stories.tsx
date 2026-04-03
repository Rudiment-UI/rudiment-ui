import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from './BarChart'

const sampleData = [
  { month: 'Jan', sales: 4000, returns: 240 },
  { month: 'Feb', sales: 3000, returns: 139 },
  { month: 'Mar', sales: 5000, returns: 380 },
  { month: 'Apr', sales: 2780, returns: 390 },
  { month: 'May', sales: 1890, returns: 480 },
  { month: 'Jun', sales: 2390, returns: 380 },
]

const meta = {
  title: 'Components/Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A token-aware bar chart wrapper around Recharts. Supports vertical and horizontal layouts, stacked bars, and automatic dark mode theming via design tokens.',
      },
    },
  },
  args: {
    data: sampleData,
    dataKeys: ['sales'],
    indexKey: 'month',
    label: 'Monthly sales',
    layout: 'vertical',
    stacked: false,
    showLegend: true,
    showGrid: true,
    height: 300,
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      table: { category: 'Appearance' },
    },
    stacked: {
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    showLegend: {
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    showGrid: {
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
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MultipleSeries: Story = {
  args: {
    dataKeys: ['sales', 'returns'],
    label: 'Sales vs returns',
  },
}

export const Stacked: Story = {
  args: {
    dataKeys: ['sales', 'returns'],
    stacked: true,
    label: 'Stacked sales and returns',
  },
}

export const Horizontal: Story = {
  args: {
    layout: 'horizontal',
    label: 'Horizontal bar chart',
  },
}

export const NoGrid: Story = {
  args: {
    showGrid: false,
    label: 'Bar chart without grid',
  },
}
