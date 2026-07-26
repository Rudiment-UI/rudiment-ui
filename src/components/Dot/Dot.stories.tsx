import type { Meta, StoryObj } from '@storybook/react'
import { RudiDot } from './Dot'

const meta = {
  title: 'Components/Dot',
  component: RudiDot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A small colored dot for status and category indicators. Use a semantic `tone` or an explicit `color` token for domain accents.',
      },
    },
  },
  args: {
    tone: 'default',
    size: 'md',
    pulse: false,
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      table: { category: 'Appearance' },
    },
    color: { control: 'text', table: { category: 'Appearance' } },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { category: 'Appearance' },
    },
    pulse: { control: 'boolean', table: { category: 'Appearance' } },
    label: { control: 'text', table: { category: 'Accessibility' } },
  },
} satisfies Meta<typeof RudiDot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <RudiDot tone="default" />
      <RudiDot tone="success" />
      <RudiDot tone="warning" />
      <RudiDot tone="error" />
      <RudiDot tone="info" />
    </div>
  ),
}

export const WithLabel: Story = {
  args: { tone: 'success', label: 'Online' },
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <RudiDot {...args} />
      <span>Online</span>
    </div>
  ),
}

export const CustomColor: Story = {
  args: { color: 'var(--rudi-color-dataviz-3)' },
}

export const Pulse: Story = {
  args: { tone: 'error', pulse: true, label: 'Live' },
}
