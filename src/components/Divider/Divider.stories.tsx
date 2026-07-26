import type { Meta, StoryObj } from '@storybook/react'
import { RudiDivider } from './Divider'

const meta = {
  title: 'Components/Divider',
  component: RudiDivider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A thin rule that separates content. Supports horizontal and vertical orientation, spacing presets, and an optional centered label.',
      },
    },
  },
  args: {
    orientation: 'horizontal',
    spacing: 'md',
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the rule',
      table: { category: 'Appearance' },
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Margin around the rule',
      table: { category: 'Appearance' },
    },
    label: {
      control: 'text',
      description: 'Optional centered label (horizontal only)',
      table: { category: 'Content' },
    },
    className: { control: 'text', table: { category: 'Appearance' } },
  },
} satisfies Meta<typeof RudiDivider>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: (args) => (
    <div>
      <p>Above the divider</p>
      <RudiDivider {...args} />
      <p>Below the divider</p>
    </div>
  ),
}

export const Labeled: Story = {
  args: { label: 'OR' },
  render: (args) => (
    <div>
      <p>Sign in with email</p>
      <RudiDivider {...args} />
      <p>Continue with a passkey</p>
    </div>
  ),
}

export const Vertical: Story = {
  args: { orientation: 'vertical', spacing: 'sm' },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', height: '2rem' }}>
      <span>Home</span>
      <RudiDivider {...args} />
      <span>Docs</span>
      <RudiDivider {...args} />
      <span>Pricing</span>
    </div>
  ),
}
