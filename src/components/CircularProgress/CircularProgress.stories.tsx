import type { Meta, StoryObj } from '@storybook/react'
import { CircularProgress } from './CircularProgress'
import { Icon } from '../Icon/Icon'

const meta = {
  title: 'Components/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A radial progress indicator for goal and completion tracking. Built with React Aria for accessible progress reporting. Supports a center content slot for custom labels or icons.',
      },
    },
  },
  args: {
    value: 65,
    label: 'Progress',
    variant: 'default',
    size: 'md',
    showValueLabel: false,
    minValue: 0,
    maxValue: 100,
    className: '',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Accessible label describing the progress',
      table: { category: 'Content' },
    },
    showValueLabel: {
      control: 'boolean',
      description: 'Whether to display the current percentage in the center',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'The color variant of the progress ring',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the circular progress',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: { category: 'Appearance' },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The current progress value',
      table: { category: 'State' },
    },
    minValue: {
      control: 'number',
      description: 'The minimum allowed value',
      table: { category: 'State' },
    },
    maxValue: {
      control: 'number',
      description: 'The maximum allowed value',
      table: { category: 'State' },
    },
  },
} satisfies Meta<typeof CircularProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValueLabel: Story = {
  args: {
    showValueLabel: true,
  },
}

export const WithCenterContent: Story = {
  args: {
    value: 100,
    variant: 'success',
  },
  render: (args) => (
    <CircularProgress {...args}>
      <Icon icon="lucide:check" size="md" />
    </CircularProgress>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <CircularProgress label="Default" value={65} variant="default" showValueLabel />
      <CircularProgress label="Success" value={85} variant="success" showValueLabel />
      <CircularProgress label="Warning" value={45} variant="warning" showValueLabel />
      <CircularProgress label="Error" value={25} variant="error" showValueLabel />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'end' }}>
      <CircularProgress label="Small" value={60} size="sm" showValueLabel />
      <CircularProgress label="Medium" value={60} size="md" showValueLabel />
      <CircularProgress label="Large" value={60} size="lg" showValueLabel />
    </div>
  ),
}

export const ZeroProgress: Story = {
  args: {
    value: 0,
    label: 'Not started',
    showValueLabel: true,
  },
}

export const FullProgress: Story = {
  args: {
    value: 100,
    label: 'Complete',
    variant: 'success',
    showValueLabel: true,
  },
}
