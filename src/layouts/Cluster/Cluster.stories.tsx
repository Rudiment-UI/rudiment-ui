import type { Meta, StoryObj } from '@storybook/react'
import { Cluster } from './Cluster'

const meta = {
  title: 'Layouts/Cluster',
  component: Cluster,
  tags: ['autodocs'],
  argTypes: {
    space: { control: 'text' },
    justify: {
      control: 'select',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
      ],
    },
    align: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
    },
  },
} satisfies Meta<typeof Cluster>

export default meta
type Story = StoryObj<typeof meta>

function Tag({ label }: { label: string }) {
  return (
    <div className="border border-border-default rounded-md px-3 py-1 bg-surface-raised">
      {label}
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <Cluster {...args}>
      <Tag label="Design" />
      <Tag label="Development" />
      <Tag label="Accessibility" />
      <Tag label="Typography" />
      <Tag label="Layout" />
    </Cluster>
  ),
}

export const Dense: Story = {
  args: { space: '0.25rem' },
  render: (args) => (
    <Cluster {...args}>
      <Tag label="Design" />
      <Tag label="Development" />
      <Tag label="Accessibility" />
      <Tag label="Typography" />
      <Tag label="Layout" />
    </Cluster>
  ),
}

export const Loose: Story = {
  args: { space: '2rem' },
  render: (args) => (
    <Cluster {...args}>
      <Tag label="Design" />
      <Tag label="Development" />
      <Tag label="Accessibility" />
      <Tag label="Typography" />
      <Tag label="Layout" />
    </Cluster>
  ),
}

export const Centered: Story = {
  args: { justify: 'center' },
  render: (args) => (
    <Cluster {...args}>
      <Tag label="Design" />
      <Tag label="Development" />
      <Tag label="Accessibility" />
      <Tag label="Typography" />
      <Tag label="Layout" />
    </Cluster>
  ),
}

export const SpaceBetween: Story = {
  args: { justify: 'space-between' },
  render: (args) => (
    <Cluster {...args}>
      <Tag label="Design" />
      <Tag label="Development" />
      <Tag label="Accessibility" />
    </Cluster>
  ),
}

export const AsUnorderedList: Story = {
  render: () => (
    <Cluster as="ul" space="0.75rem" role="list">
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
      <li>Fourth item</li>
    </Cluster>
  ),
}
