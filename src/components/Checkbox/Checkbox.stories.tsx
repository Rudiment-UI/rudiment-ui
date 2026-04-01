import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A checkbox for toggling a boolean value on or off. Supports checked, unchecked, indeterminate, and disabled states. Use CheckboxGroup for related options.',
      },
    },
  },
  args: {
    isDisabled: false,
    isIndeterminate: false,
    defaultSelected: false,
    children: 'Checkbox label',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The label text displayed next to the checkbox',
      table: { category: 'Content' },
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (controlled)',
      table: { category: 'State' },
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Whether the checkbox is initially checked (uncontrolled)',
      table: { category: 'State' },
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox displays a mixed or partial selection state',
      table: { category: 'State' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled and non-interactive',
      table: { category: 'State' },
    },
    value: {
      control: 'text',
      description: 'The value submitted with a form when the checkbox is checked',
      table: { category: 'State' },
    },
    onChange: {
      action: 'changed',
      description: 'Called when the checked state changes',
      table: { category: 'Events' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the checkbox wrapper',
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    children: 'Subscribe to newsletter',
    defaultSelected: true,
  },
}

export const Indeterminate: Story = {
  args: {
    children: 'Select all',
    isIndeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'This option is unavailable',
    isDisabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    children: 'Required option (pre-selected)',
    isDisabled: true,
    defaultSelected: true,
  },
}

export const Group: Story = {
  render: () => (
    <CheckboxGroup
      label="Notification preferences"
      description="Choose what updates you want to receive."
    >
      <Checkbox value="email">Email notifications</Checkbox>
      <Checkbox value="sms">SMS notifications</Checkbox>
      <Checkbox value="push">Push notifications</Checkbox>
    </CheckboxGroup>
  ),
}

export const GroupWithError: Story = {
  render: () => (
    <CheckboxGroup
      label="Interests"
      errorMessage="Please select at least one interest."
    >
      <Checkbox value="design">Design</Checkbox>
      <Checkbox value="engineering">Engineering</Checkbox>
      <Checkbox value="product">Product</Checkbox>
    </CheckboxGroup>
  ),
}

export const GroupDisabled: Story = {
  render: () => (
    <CheckboxGroup label="Plan features" isDisabled>
      <Checkbox value="storage">Extended storage</Checkbox>
      <Checkbox value="analytics">Advanced analytics</Checkbox>
      <Checkbox value="api">API access</Checkbox>
    </CheckboxGroup>
  ),
}
