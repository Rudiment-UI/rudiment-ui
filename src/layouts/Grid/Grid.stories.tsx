import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from './Grid'

const meta = {
  title: 'Layouts/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    minCellWidth: { control: 'text' },
    space: { control: 'text' },
  },
} satisfies Meta<typeof Grid>

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
    <Grid {...args}>
      <Placeholder label="Item 1" />
      <Placeholder label="Item 2" />
      <Placeholder label="Item 3" />
      <Placeholder label="Item 4" />
      <Placeholder label="Item 5" />
      <Placeholder label="Item 6" />
    </Grid>
  ),
}

export const NarrowCells: Story = {
  args: { minCellWidth: '8rem' },
  render: (args) => (
    <Grid {...args}>
      <Placeholder label="Item 1" />
      <Placeholder label="Item 2" />
      <Placeholder label="Item 3" />
      <Placeholder label="Item 4" />
      <Placeholder label="Item 5" />
      <Placeholder label="Item 6" />
    </Grid>
  ),
}

export const WideCells: Story = {
  args: { minCellWidth: '24rem' },
  render: (args) => (
    <Grid {...args}>
      <Placeholder label="Item 1" />
      <Placeholder label="Item 2" />
      <Placeholder label="Item 3" />
      <Placeholder label="Item 4" />
    </Grid>
  ),
}

export const TightGap: Story = {
  args: { space: '0.5rem' },
  render: (args) => (
    <Grid {...args}>
      <Placeholder label="Item 1" />
      <Placeholder label="Item 2" />
      <Placeholder label="Item 3" />
      <Placeholder label="Item 4" />
      <Placeholder label="Item 5" />
      <Placeholder label="Item 6" />
    </Grid>
  ),
}

export const LooseGap: Story = {
  args: { space: '3rem' },
  render: (args) => (
    <Grid {...args}>
      <Placeholder label="Item 1" />
      <Placeholder label="Item 2" />
      <Placeholder label="Item 3" />
      <Placeholder label="Item 4" />
      <Placeholder label="Item 5" />
      <Placeholder label="Item 6" />
    </Grid>
  ),
}
