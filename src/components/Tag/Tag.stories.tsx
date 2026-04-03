import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A compact label component for categorization, with optional dismiss and click interactions.',
      },
    },
  },
  args: {
    variant: 'default',
    children: 'Tag',
    dismissible: false,
    isDisabled: false,
    className: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The text or content displayed inside the tag',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'The visual style and semantic meaning of the tag',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the tag',
      table: { category: 'Appearance' },
    },
    dismissible: {
      control: 'boolean',
      description: 'When true, shows a close button to dismiss the tag',
      table: { category: 'Content' },
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback fired when the close button is clicked',
      table: { category: 'Content' },
    },
    onPress: {
      action: 'pressed',
      description: 'Callback fired when the tag itself is clicked',
      table: { category: 'Content' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'When true, disables all interactions on the tag',
      table: { category: 'Content' },
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default',
  },
}

export const Dismissible: Story = {
  args: {
    children: 'Dismissible',
    dismissible: true,
    onPress: undefined,
  },
}

export const Interactive: Story = {
  args: {
    children: 'Click me',
    onPress: () => {},
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    isDisabled: true,
    onPress: () => {},
  },
}

export const AllVariants: Story = {
  render: ({}) => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Tag variant="default">Default</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="info">Info</Tag>
    </div>
  ),
}

export const DismissibleVariants: Story = {
  render: ({}) => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Tag variant="default" dismissible>
        Default
      </Tag>
      <Tag variant="success" dismissible>
        Success
      </Tag>
      <Tag variant="warning" dismissible>
        Warning
      </Tag>
      <Tag variant="error" dismissible>
        Error
      </Tag>
      <Tag variant="info" dismissible>
        Info
      </Tag>
    </div>
  ),
}
