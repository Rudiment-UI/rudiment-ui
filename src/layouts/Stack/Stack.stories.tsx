import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'

const meta = {
  title: 'Layouts/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Arranges children in a vertical stack with consistent spacing between each item. Supports recursive spacing into nested elements and split positioning.',
      },
    },
  },
  args: {
    recursive: false,
  },
  argTypes: {
    space: {
      control: 'text',
      description:
        "Vertical gap between items using any CSS length value (e.g., '1.5rem')",
      table: { category: 'Layout' },
    },
    recursive: {
      control: 'boolean',
      description:
        'When enabled, applies spacing to all nested elements, not just direct children',
      table: { category: 'Appearance' },
    },
    splitAfter: {
      control: 'number',
      description:
        'Pushes all items after this index to the bottom of the stack (1-based)',
      table: { category: 'Layout' },
    },
    as: {
      control: 'text',
      description: "The HTML element to render (e.g., 'div', 'ul', 'ol')",
      table: { category: 'Content' },
    },
    children: {
      table: { category: 'Content' },
      description: 'Content to display inside the stack',
    },
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

function Placeholder({ label }: { label: string }) {
  return (
    <div className="border border-border-default rounded-md p-4 bg-surface-raised">
      {label}
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <Stack {...args}>
      <Placeholder label="First child" />
      <Placeholder label="Second child" />
      <Placeholder label="Third child" />
    </Stack>
  ),
}

export const Dense: Story = {
  args: { space: '0.5rem' },
  render: (args) => (
    <Stack {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </Stack>
  ),
}

export const Loose: Story = {
  args: { space: '3rem' },
  render: (args) => (
    <Stack {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </Stack>
  ),
}

export const SplitAfterSecond: Story = {
  args: { splitAfter: 2 },
  decorators: [
    (Story) => (
      <div style={{ height: '400px', border: '1px dashed #ccc' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Stack {...args} style={{ height: '100%' }}>
      <Placeholder label="Top item 1" />
      <Placeholder label="Top item 2" />
      <Placeholder label="Pushed to bottom" />
    </Stack>
  ),
}

export const AsUnorderedList: Story = {
  render: () => (
    <Stack as="ul" space="0.75rem" role="list">
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </Stack>
  ),
}
