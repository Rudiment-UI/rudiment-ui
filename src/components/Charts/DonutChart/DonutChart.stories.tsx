import type { Meta, StoryObj } from '@storybook/react'
import { DonutChart } from './DonutChart'

const sampleData = [
  { name: 'Desktop', value: 4200 },
  { name: 'Mobile', value: 3100 },
  { name: 'Tablet', value: 800 },
  { name: 'Other', value: 300 },
]

const meta = {
  title: 'Components/Charts/DonutChart',
  component: DonutChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A token-aware donut chart wrapper around Recharts. Displays part-to-whole relationships with configurable inner radius and automatic dark mode theming via design tokens.',
      },
    },
  },
  args: {
    data: sampleData,
    label: 'Traffic by device',
    innerRadius: 60,
    showLabels: false,
    showLegend: true,
    height: 300,
  },
  argTypes: {
    innerRadius: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Inner radius of the donut ring',
      table: { category: 'Appearance' },
    },
    showLabels: {
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
} satisfies Meta<typeof DonutChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabels: Story = {
  args: {
    showLabels: true,
    label: 'Traffic with labels',
  },
}

export const ThinRing: Story = {
  args: {
    innerRadius: 80,
    label: 'Thin donut ring',
  },
}

export const ThickRing: Story = {
  args: {
    innerRadius: 30,
    label: 'Thick donut ring',
  },
}

export const ManySegments: Story = {
  args: {
    data: [
      { name: 'Chrome', value: 6200 },
      { name: 'Safari', value: 2800 },
      { name: 'Firefox', value: 1200 },
      { name: 'Edge', value: 900 },
      { name: 'Opera', value: 400 },
      { name: 'Brave', value: 300 },
      { name: 'Arc', value: 200 },
      { name: 'Other', value: 100 },
    ],
    label: 'Browser market share',
  },
}
