import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A small labeling component for status indicators, counts, and categorization.',
      },
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    dot: false,
    children: 'Badge',
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The text or content displayed inside the badge',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'The visual style and semantic meaning of the badge',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the badge',
      table: { category: 'Appearance' },
    },
    dot: {
      control: 'boolean',
      description:
        'When true, renders as a small circular dot indicator without text',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the badge',
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const DotIndicator: Story = {
  args: {
    variant: 'success',
    dot: true,
  },
}

export const AllVariants: Story = {
  render: ({}) => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
}
