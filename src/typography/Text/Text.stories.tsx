import type { Meta, StoryObj } from '@storybook/react'
import { RudiText } from './Text'

const meta = {
  title: 'Typography/Text',
  component: RudiText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A versatile text element with five typographic styles: body, small body, caption, overline, and inline code. Supports rendering as any HTML element.',
      },
    },
  },
  argTypes: {
    as: {
      control: 'text',
      description:
        "The HTML element to render (e.g., 'p', 'span', 'label', 'strong')",
      table: { category: 'Content' },
    },
    children: {
      description: 'The content rendered inside the text element',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['body', 'body-sm', 'caption', 'overline', 'code'],
      description: 'The typographic style to apply',
      table: { category: 'Appearance' },
    },
    className: {
      description: 'Additional CSS class names to apply to the text element',
      table: { category: 'Appearance' },
    },
  },
  args: {
    variant: 'body',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
} satisfies Meta<typeof RudiText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <RudiText variant="body">body — The quick brown fox jumps over the lazy dog.</RudiText>
      <RudiText variant="body-sm">body-sm — The quick brown fox jumps over the lazy dog.</RudiText>
      <RudiText variant="caption">caption — Supporting detail or image description.</RudiText>
      <RudiText variant="overline">overline — Section label</RudiText>
      <RudiText variant="code">code — const x = 42</RudiText>
    </div>
  ),
}

export const AsSpan: Story = {
  render: () => (
    <p>
      This is a paragraph with a{' '}
      <RudiText as="span" variant="code">
        code
      </RudiText>{' '}
      snippet inline.
    </p>
  ),
}

export const AsLabel: Story = {
  render: () => (
    <RudiText as="label" variant="overline" htmlFor="example-input">
      Field label
    </RudiText>
  ),
}

export const CustomClassName: Story = {
  args: { variant: 'body', className: 'italic', children: 'Custom class applied' },
}
