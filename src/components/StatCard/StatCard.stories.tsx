import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A composite component for displaying key metrics with optional trend indicators.',
      },
    },
  },
  args: {
    label: 'Total Revenue',
    value: '$12,450',
    delta: '+12.5%',
    trend: 'up',
    className: '',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The descriptive label for the metric',
      table: { category: 'Content' },
    },
    value: {
      control: 'text',
      description: 'The primary metric value to display',
      table: { category: 'Content' },
    },
    delta: {
      control: 'text',
      description: 'An optional change indicator (e.g. "+12.5%")',
      table: { category: 'Content' },
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
      description: 'The visual direction of the trend indicator',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the card wrapper',
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$12,450',
    delta: '+12.5%',
    trend: 'up',
  },
}

export const TrendDown: Story = {
  args: {
    label: 'Bounce Rate',
    value: '42.3%',
    delta: '-3.2%',
    trend: 'down',
  },
}

export const TrendNeutral: Story = {
  args: {
    label: 'Active Users',
    value: '1,024',
    delta: '0%',
    trend: 'neutral',
  },
}

export const NoDelta: Story = {
  args: {
    label: 'Total Orders',
    value: '3,842',
    delta: undefined,
  },
}

export const NumericValue: Story = {
  args: {
    label: 'Items in Stock',
    value: 1234,
    delta: '+58',
    trend: 'up',
  },
}

export const WithChildren: Story = {
  args: {
    label: 'Conversion Rate',
    value: '5.2%',
    delta: '+0.8%',
    trend: 'up',
    children: (
      <span
        style={{
          fontSize: '0.75rem',
          color: 'var(--token-color-text-secondary, #6b7280)',
        }}
      >
        vs. last 30 days
      </span>
    ),
  },
}

export const AllTrends: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
      }}
    >
      <StatCard label="Revenue" value="$12,450" delta="+12.5%" trend="up" />
      <StatCard label="Bounce Rate" value="42.3%" delta="-3.2%" trend="down" />
      <StatCard label="Active Users" value="1,024" delta="0%" trend="neutral" />
    </div>
  ),
}
