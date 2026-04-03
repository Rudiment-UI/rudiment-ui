import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A user representation component with image support, initials fallback, and optional status indicator.',
      },
    },
  },
  args: {
    name: 'John Doe',
    size: 'md',
    src: '',
    alt: '',
    status: undefined,
    className: '',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'The image source URL for the avatar',
      table: { category: 'Content' },
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the avatar image',
      table: { category: 'Content' },
    },
    name: {
      control: 'text',
      description: 'The user name used to generate initials',
      table: { category: 'Content' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the avatar',
      table: { category: 'Appearance' },
    },
    status: {
      control: 'select',
      options: [undefined, 'success', 'warning', 'error', 'info'],
      description: 'Optional status indicator displayed as a dot',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the avatar',
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitials: Story = {
  args: {
    name: 'John Doe',
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/100',
    alt: 'User avatar',
    name: 'John Doe',
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    name: 'John Doe',
  },
}

export const MediumSize: Story = {
  args: {
    size: 'md',
    name: 'John Doe',
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    name: 'John Doe',
  },
}

export const WithStatus: Story = {
  args: {
    name: 'John Doe',
    status: 'success',
  },
}

export const SingleName: Story = {
  args: {
    name: 'Alice',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Avatar name="John Doe" size="sm" />
      <Avatar name="John Doe" size="md" />
      <Avatar name="John Doe" size="lg" />
    </div>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Avatar name="John Doe" status="success" />
      <Avatar name="John Doe" status="warning" />
      <Avatar name="John Doe" status="error" />
      <Avatar name="John Doe" status="info" />
    </div>
  ),
}
