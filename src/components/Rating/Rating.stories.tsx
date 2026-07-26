import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RudiRating } from './Rating'

const meta = {
  title: 'Components/Rating',
  component: RudiRating,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A star rating with half-star support. Read-only by default (exposed as an image); pass `onChange` for an interactive radiogroup.',
      },
    },
  },
  args: {
    value: 4.5,
    max: 5,
    size: 'md',
    showValue: false,
  },
  argTypes: {
    value: { control: { type: 'number', step: 0.5 }, table: { category: 'Content' } },
    max: { control: 'number', table: { category: 'Content' } },
    count: { control: 'number', table: { category: 'Content' } },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance' },
    },
    showValue: { control: 'boolean', table: { category: 'Content' } },
  },
} satisfies Meta<typeof RudiRating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValueAndCount: Story = {
  args: { value: 4.8, showValue: true, count: 128 },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <RudiRating value={3.5} size="sm" />
      <RudiRating value={3.5} size="md" />
      <RudiRating value={3.5} size="lg" />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(0)
    return <RudiRating value={value} onChange={setValue} showValue />
  },
}
