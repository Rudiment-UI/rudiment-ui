import type { Meta, StoryObj } from '@storybook/react'
import { Box } from './Box'

const meta = {
  title: 'Layouts/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A foundational container that applies consistent padding, optional borders, and color inversion. The basic building block for composing layouts.',
      },
    },
  },
  args: {
    bordered: false,
    invert: false,
    padding: '1rem',
    as: 'div',
  },
  argTypes: {
    as: {
      control: 'text',
      description:
        "The HTML element to render (e.g., 'div', 'section', 'article')",
      table: { category: 'Content' },
    },
    children: {
      table: { category: 'Content' },
      description: 'Content to display inside the box',
    },
    bordered: {
      control: 'boolean',
      description: 'Adds a visible border around the container',
      table: { category: 'Appearance' },
    },
    invert: {
      control: 'boolean',
      description: 'Swaps foreground and background colors for visual emphasis',
      table: { category: 'Appearance' },
    },
    padding: {
      control: 'text',
      description:
        "Inner spacing using any CSS length value (e.g., '1rem', '2rem')",
      table: { category: 'Layout' },
    },
  },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Box {...args}>Box content</Box>,
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => <Box {...args}>A box with a visible border</Box>,
}

export const Inverted: Story = {
  args: { invert: true },
  render: (args) => (
    <Box {...args}>A box with an inverted (dark) background</Box>
  ),
}

export const BorderedAndInverted: Story = {
  args: { bordered: true, invert: true },
  render: (args) => <Box {...args}>Bordered and inverted</Box>,
}

export const CustomPadding: Story = {
  args: { bordered: true, padding: '2rem' },
  render: (args) => <Box {...args}>Box with custom padding (2rem)</Box>,
}

export const AsSection: Story = {
  render: ({}) => (
    <Box as="section" bordered padding="1.5rem">
      Rendered as a <code>&lt;section&gt;</code> element
    </Box>
  ),
}
