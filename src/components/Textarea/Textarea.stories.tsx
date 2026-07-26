import type { Meta, StoryObj } from '@storybook/react'
import { RudiTextarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: RudiTextarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A multi-line text field mirroring `RudiInput`, with description, error, and resize controls.',
      },
    },
  },
  args: {
    label: 'Message',
    placeholder: 'Write your message…',
    rows: 4,
    resize: 'vertical',
    isRequired: false,
    isDisabled: false,
  },
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      table: { category: 'Behavior' },
    },
    rows: { control: 'number', table: { category: 'Behavior' } },
    isRequired: { control: 'boolean', table: { category: 'State' } },
    isDisabled: { control: 'boolean', table: { category: 'State' } },
  },
} satisfies Meta<typeof RudiTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: { description: 'Markdown is supported.' },
}

export const WithError: Story = {
  args: { errorMessage: 'Please enter a message.' },
}

export const Disabled: Story = {
  args: { isDisabled: true, defaultValue: 'Locked content' },
}
