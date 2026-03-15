import type { Meta, StoryObj } from '@storybook/react'
import { Box } from './Box'

const meta = {
  title: 'Layouts/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    padding: { control: 'text' },
    bordered: { control: 'boolean' },
    invert: { control: 'boolean' },
  },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Box {...args}>
      Box content
    </Box>
  ),
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <Box {...args}>
      A box with a visible border
    </Box>
  ),
}

export const Inverted: Story = {
  args: { invert: true },
  render: (args) => (
    <Box {...args}>
      A box with an inverted (dark) background
    </Box>
  ),
}

export const BorderedAndInverted: Story = {
  args: { bordered: true, invert: true },
  render: (args) => (
    <Box {...args}>
      Bordered and inverted
    </Box>
  ),
}

export const CustomPadding: Story = {
  args: { bordered: true, padding: '2rem' },
  render: (args) => (
    <Box {...args}>
      Box with custom padding (2rem)
    </Box>
  ),
}

export const AsSection: Story = {
  render: () => (
    <Box as="section" bordered padding="1.5rem">
      Rendered as a{' '}
      <code>&lt;section&gt;</code> element
    </Box>
  ),
}
