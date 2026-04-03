import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A determinate progress indicator with label and optional value display. Built with React Aria for accessible progress reporting.',
      },
    },
  },
  args: {
    value: 60,
    label: 'Loading...',
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
      description: 'Whether to display the current percentage value',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'The visual style of the progress bar',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The height of the progress track',
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
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValueLabel: Story = {
  args: {
    showValueLabel: true,
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    value: 75,
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    value: 45,
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    value: 30,
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
  },
}

export const ZeroProgress: Story = {
  args: {
    value: 0,
    label: 'Not started',
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

export const CustomRange: Story = {
  args: {
    minValue: 0,
    maxValue: 500,
    value: 250,
    label: 'Items processed',
    showValueLabel: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ProgressBar
        label="Default"
        value={60}
        variant="default"
        showValueLabel
      />
      <ProgressBar
        label="Success"
        value={75}
        variant="success"
        showValueLabel
      />
      <ProgressBar
        label="Warning"
        value={45}
        variant="warning"
        showValueLabel
      />
      <ProgressBar label="Error" value={30} variant="error" showValueLabel />
    </div>
  ),
}
