import type { Meta, StoryObj } from '@storybook/react'
import { RudiBox } from './Box'

const meta = {
  title: 'Layouts/Box',
  component: RudiBox,
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
} satisfies Meta<typeof RudiBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <RudiBox {...args}>Box content</RudiBox>,
}

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => <RudiBox {...args}>A box with a visible border</RudiBox>,
}

export const Inverted: Story = {
  args: { invert: true },
  render: (args) => (
    <RudiBox {...args}>A box with an inverted (dark) background</RudiBox>
  ),
}

export const BorderedAndInverted: Story = {
  args: { bordered: true, invert: true },
  render: (args) => <RudiBox {...args}>Bordered and inverted</RudiBox>,
}

export const CustomPadding: Story = {
  args: { bordered: true, padding: '2rem' },
  render: (args) => <RudiBox {...args}>Box with custom padding (2rem)</RudiBox>,
}

export const AsSection: Story = {
  render: ({}) => (
    <RudiBox as="section" bordered padding="1.5rem">
      Rendered as a <code>&lt;section&gt;</code> element
    </RudiBox>
  ),
}
