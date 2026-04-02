import type { Meta, StoryObj } from '@storybook/react'
import { Center } from './Center'

const meta = {
  title: 'Layouts/Center',
  component: Center,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Horizontally centers content with a configurable maximum width. Add gutters for edge padding or use intrinsic mode to let children size to their own content.',
      },
    },
  },
  args: {
    intrinsic: false,
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element to render',
      table: { category: 'Content' },
    },
    children: {
      table: { category: 'Content' },
      description: 'Content to display inside the center layout',
    },
    intrinsic: {
      control: 'boolean',
      description:
        'When enabled, children shrink-wrap to their content width instead of filling the container',
      table: { category: 'Appearance' },
    },
    maxWidth: {
      control: 'text',
      description:
        "The maximum width of the centered content (e.g., '60rem')",
      table: { category: 'Layout' },
    },
    gutters: {
      control: 'text',
      description:
        "Horizontal padding on each side to prevent content touching edges (e.g., '1rem')",
      table: { category: 'Layout' },
    },
  },
} satisfies Meta<typeof Center>

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
    <Center {...args}>
      <Placeholder label="Centered content" />
    </Center>
  ),
}

export const NarrowMaxWidth: Story = {
  args: { maxWidth: '30rem' },
  render: (args) => (
    <Center {...args}>
      <Placeholder label="Narrow centered content" />
    </Center>
  ),
}

export const WideMaxWidth: Story = {
  args: { maxWidth: '90rem' },
  render: (args) => (
    <Center {...args}>
      <Placeholder label="Wide centered content" />
    </Center>
  ),
}

export const WithGutters: Story = {
  args: { gutters: '3rem' },
  render: (args) => (
    <Center {...args}>
      <Placeholder label="Content with large gutters" />
    </Center>
  ),
}

export const Intrinsic: Story = {
  args: { intrinsic: true },
  render: (args) => (
    <Center {...args}>
      <Placeholder label="Short label" />
      <Placeholder label="A slightly longer label" />
      <Placeholder label="Short" />
    </Center>
  ),
}

export const AsSection: Story = {
  render: () => (
    <Center as="section" maxWidth="40rem">
      <Placeholder label="Inside a section element" />
    </Center>
  ),
}
