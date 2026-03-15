import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Layouts/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'radio', options: ['left', 'right'] },
    sideWidth: { control: 'text' },
    contentMin: { control: 'text' },
    space: { control: 'text' },
    noStretch: { control: 'boolean' },
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
