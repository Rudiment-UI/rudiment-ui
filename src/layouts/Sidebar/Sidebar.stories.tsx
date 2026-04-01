import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Layouts/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A two-panel layout with a fixed-width sidebar and a flexible content area. Automatically stacks vertically when the viewport becomes too narrow.',
      },
    },
  },
  args: {
    side: 'left',
    noStretch: false,
  },
  argTypes: {
    side: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Which side the sidebar appears on',
      table: { category: 'Layout' },
    },
    sideWidth: {
      control: 'text',
      description:
        "The fixed width of the sidebar panel (e.g., '20rem')",
      table: { category: 'Layout' },
    },
    contentMin: {
      control: 'text',
      description:
        "The minimum width of the content area before stacking (e.g., '50%')",
      table: { category: 'Layout' },
    },
    space: {
      control: 'text',
      description: 'Gap between sidebar and content',
      table: { category: 'Layout' },
    },
    noStretch: {
      control: 'boolean',
      description:
        'Prevents children from stretching to fill the container height',
      table: { category: 'Appearance' },
    },
    as: {
      control: 'text',
      description: 'The HTML element to render',
      table: { category: 'Content' },
    },
    children: {
      table: { category: 'Content' },
      description: 'Content to display inside the sidebar layout',
    },
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

function SidebarPane({ label }: { label: string }) {
  return (
    <div className="border border-border-default rounded-md p-4 bg-surface-raised">
      {label}
    </div>
  )
}

function ContentPane({ label }: { label: string }) {
  return (
    <div className="border border-border-default rounded-md p-4 bg-surface-raised min-h-32">
      {label}
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <Sidebar {...args}>
      <SidebarPane label="Sidebar" />
      <ContentPane label="Main content" />
    </Sidebar>
  ),
}

export const RightSide: Story = {
  args: { side: 'right' },
  render: (args) => (
    <Sidebar {...args}>
      <ContentPane label="Main content" />
      <SidebarPane label="Sidebar" />
    </Sidebar>
  ),
}

export const NarrowSidebar: Story = {
  args: { sideWidth: '12rem' },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarPane label="Narrow sidebar" />
      <ContentPane label="Main content" />
    </Sidebar>
  ),
}

export const WideSidebar: Story = {
  args: { sideWidth: '30rem' },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarPane label="Wide sidebar" />
      <ContentPane label="Main content" />
    </Sidebar>
  ),
}

export const NoStretch: Story = {
  args: { noStretch: true },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarPane label="Sidebar (not stretched)" />
      <ContentPane label="Taller main content area that demonstrates the sidebar will not stretch to match height." />
    </Sidebar>
  ),
}

export const TightGap: Story = {
  args: { space: '0.5rem' },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarPane label="Sidebar" />
      <ContentPane label="Main content" />
    </Sidebar>
  ),
}

export const WideGap: Story = {
  args: { space: '3rem' },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarPane label="Sidebar" />
      <ContentPane label="Main content" />
    </Sidebar>
  ),
}
