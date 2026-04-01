import type { Meta, StoryObj } from '@storybook/react'
import { Cover } from './Cover'

const meta = {
  title: 'Layouts/Cover',
  component: Cover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A vertical layout that fills a minimum height and vertically centers its principal child element. Ideal for hero sections and full-page layouts.',
      },
    },
  },
  argTypes: {
    minHeight: {
      control: 'text',
      description:
        "The minimum height of the cover (e.g., '100vh' for full viewport)",
      table: { category: 'Layout' },
    },
    space: {
      control: 'text',
      description:
        'Vertical padding inside the cover using any CSS length value',
      table: { category: 'Layout' },
    },
    as: {
      control: 'text',
      description: 'The HTML element to render',
      table: { category: 'Content' },
    },
    children: {
      table: { category: 'Content' },
      description: 'Content to display inside the cover layout',
    },
  },
} satisfies Meta<typeof Cover>

export default meta
type Story = StoryObj<typeof meta>

function Placeholder({ label, centered }: { label: string; centered?: boolean }) {
  return (
    <div
      className={
        centered
          ? 'rudiment-cover__centered border border-border-default rounded-md p-8 bg-surface-raised text-center'
          : 'border border-border-default rounded-md p-4 bg-surface-raised'
      }
    >
      {label}
    </div>
  )
}

export const Default: Story = {
  args: { minHeight: '400px' },
  render: (args) => (
    <Cover {...args}>
      <Placeholder label="Header" />
      <Placeholder label="Centered content" centered />
      <Placeholder label="Footer" />
    </Cover>
  ),
}

export const CenteredOnly: Story = {
  args: { minHeight: '400px' },
  render: (args) => (
    <Cover {...args}>
      <Placeholder label="Centered content" centered />
    </Cover>
  ),
}

export const HeaderAndCentered: Story = {
  args: { minHeight: '400px' },
  render: (args) => (
    <Cover {...args}>
      <Placeholder label="Header" />
      <Placeholder label="Centered content" centered />
    </Cover>
  ),
}

export const FullViewport: Story = {
  render: (args) => (
    <Cover {...args}>
      <Placeholder label="Header" />
      <Placeholder label="Centered content" centered />
      <Placeholder label="Footer" />
    </Cover>
  ),
}

export const CustomSpace: Story = {
  args: { minHeight: '400px', space: '3rem' },
  render: (args) => (
    <Cover {...args}>
      <Placeholder label="Header" />
      <Placeholder label="Centered content" centered />
      <Placeholder label="Footer" />
    </Cover>
  ),
}

export const AsSection: Story = {
  args: { minHeight: '400px' },
  render: (args) => (
    <Cover {...args} as="section">
      <header className="border border-border-default rounded-md p-4 bg-surface-raised">
        Header
      </header>
      <main className="rudiment-cover__centered border border-border-default rounded-md p-8 bg-surface-raised text-center">
        Main content
      </main>
      <footer className="border border-border-default rounded-md p-4 bg-surface-raised">
        Footer
      </footer>
    </Cover>
  ),
}
