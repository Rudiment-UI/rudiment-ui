import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './Heading'

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A semantic heading element (h1 through h6) with independent visual sizing. Allows you to maintain a correct document outline while matching any visual hierarchy.',
      },
    },
  },
  argTypes: {
    children: {
      description: 'The content rendered inside the heading',
      table: { category: 'Content' },
    },
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description:
        'The semantic heading level — determines the HTML element (h1-h6) and document outline',
      table: { category: 'Appearance' },
    },
    size: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description:
        'The visual size of the heading, independent of semantic level. Defaults to match the level.',
      table: { category: 'Appearance' },
    },
    className: {
      description: 'Additional CSS class names to apply to the heading element',
      table: { category: 'Appearance' },
    },
  },
  args: {
    level: 2,
    children: 'Section Heading',
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { level: 1, children: 'Heading Level 1' },
}

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  ),
}

export const VisualSizeOverride: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={3} size={1}>
        h3 element, size-1 appearance
      </Heading>
      <Heading level={1} size={3}>
        h1 element, size-3 appearance
      </Heading>
    </div>
  ),
}

export const CustomClassName: Story = {
  args: { level: 2, className: 'italic', children: 'Custom class applied' },
}
