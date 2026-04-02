import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A toggle switch for binary on/off settings. Visually distinct from a checkbox — best used for settings that take effect immediately.',
      },
    },
  },
  args: {
    isDisabled: false,
    defaultSelected: false,
    children: 'Enable notifications',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The label text displayed next to the switch',
      table: { category: 'Content' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the switch wrapper',
      table: { category: 'Appearance' },
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the switch is on (controlled)',
      table: { category: 'State' },
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Whether the switch is initially on (uncontrolled)',
      table: { category: 'State' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled and non-interactive',
      table: { category: 'State' },
    },
    onChange: {
      action: 'changed',
      description: 'Called when the switch is toggled on or off',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Enable notifications',
  },
}

export const On: Story = {
  args: {
    children: 'Dark mode',
    defaultSelected: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Feature unavailable',
    isDisabled: true,
  },
}

export const DisabledOn: Story = {
  args: {
    children: 'Required setting',
    isDisabled: true,
    defaultSelected: true,
  },
}

export const AllStates: Story = {
  render: ({}) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch>Off by default</Switch>
      <Switch defaultSelected>On by default</Switch>
      <Switch isDisabled>Disabled off</Switch>
      <Switch isDisabled defaultSelected>
        Disabled on
      </Switch>
    </div>
  ),
}
