import type { Meta, StoryObj } from '@storybook/react'
import { Switcher } from './Switcher'

const meta = {
  title: 'Layouts/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  argTypes: {
    threshold: { control: 'text' },
    space: { control: 'text' },
    limit: { control: 'number' },
  },
} satisfies Meta<typeof Switcher>

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
    <Switcher {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </Switcher>
  ),
}

export const NarrowThreshold: Story = {
  args: { threshold: '20rem' },
  render: (args) => (
    <Switcher {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </Switcher>
  ),
}

export const WideThreshold: Story = {
  args: { threshold: '60rem' },
  render: (args) => (
    <Switcher {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </Switcher>
  ),
}

export const Dense: Story = {
  args: { space: '0.5rem' },
  render: (args) => (
    <Switcher {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </Switcher>
  ),
}

export const Loose: Story = {
  args: { space: '3rem' },
  render: (args) => (
    <Switcher {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </Switcher>
  ),
}

export const AsSection: Story = {
  render: () => (
    <Switcher as="section" threshold="30rem">
      <Placeholder label="First" />
      <Placeholder label="Second" />
    </Switcher>
  ),
}
