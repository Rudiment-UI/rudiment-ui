import type { Meta, StoryObj } from '@storybook/react'
import { RudiSwitcher } from './Switcher'

const meta = {
  title: 'Layouts/Switcher',
  component: RudiSwitcher,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A responsive layout that displays items in a horizontal row above a width threshold and switches to a vertical stack below it. No media queries needed.',
      },
    },
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element to render',
      table: { category: 'Content' },
    },
    children: {
      table: { category: 'Content' },
      description: 'Content to display inside the switcher layout',
    },
    threshold: {
      control: 'text',
      description:
        "The container width at which the layout switches from row to stack (e.g., '30rem')",
      table: { category: 'Layout' },
    },
    space: {
      control: 'text',
      description: 'Gap between items using any CSS length value',
      table: { category: 'Layout' },
    },
    limit: {
      control: 'number',
      description:
        'Maximum number of items before the layout forces a vertical stack',
      table: { category: 'Layout' },
    },
  },
} satisfies Meta<typeof RudiSwitcher>

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
    <RudiSwitcher {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </RudiSwitcher>
  ),
}

export const NarrowThreshold: Story = {
  args: { threshold: '20rem' },
  render: (args) => (
    <RudiSwitcher {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </RudiSwitcher>
  ),
}

export const WideThreshold: Story = {
  args: { threshold: '60rem' },
  render: (args) => (
    <RudiSwitcher {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </RudiSwitcher>
  ),
}

export const Dense: Story = {
  args: { space: '0.5rem' },
  render: (args) => (
    <RudiSwitcher {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </RudiSwitcher>
  ),
}

export const Loose: Story = {
  args: { space: '3rem' },
  render: (args) => (
    <RudiSwitcher {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </RudiSwitcher>
  ),
}

export const AsSection: Story = {
  render: () => (
    <RudiSwitcher as="section" threshold="30rem">
      <Placeholder label="First" />
      <Placeholder label="Second" />
    </RudiSwitcher>
  ),
}
