import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'

const meta = {
  title: 'Layouts/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    space: { control: 'text' },
    recursive: { control: 'boolean' },
    splitAfter: { control: 'number' },
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
