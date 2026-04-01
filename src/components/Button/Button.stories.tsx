import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A clickable button for triggering actions. Supports four visual styles, three sizes, and loading and disabled states.',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    isLoading: false,
    isDisabled: false,
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost'],
      description: 'The visual style of the button',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
      table: { category: 'Appearance' },
    },
    isLoading: {
      control: 'boolean',
      description:
        'Whether the button shows a loading spinner and disables interaction',
      table: { category: 'State' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled and non-interactive',
      table: { category: 'State' },
    },
    children: {
      control: 'text',
      description: 'The text or content displayed inside the button',
      table: { category: 'Content' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the button',
      table: { category: 'Appearance' },
    },
    onPress: {
      action: 'pressed',
      description: 'Called when the button is pressed',
      table: { category: 'Events' },
    },
    onPressStart: {
      action: 'pressStarted',
      description: 'Called when a press interaction starts',
      table: { category: 'Events' },
    },
    onPressEnd: {
      action: 'pressEnded',
      description: 'Called when a press interaction ends',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Save changes',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete account',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Learn more',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Saving…',
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Unavailable',
  },
}

export const AllVariants: Story = {
  render: ({}) => (
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: ({}) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
