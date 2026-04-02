import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A labeled text input for collecting user data. Supports multiple input types, helper text, validation errors, and required and disabled states.',
      },
    },
  },
  args: {
    label: 'Label',
    type: 'text',
    isRequired: false,
    isDisabled: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The visible label displayed above the input',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when the input is empty',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Helper text displayed below the input for additional guidance',
      table: { category: 'Content' },
    },
    errorMessage: {
      control: 'text',
      description: 'Validation error message displayed below the input',
      table: { category: 'Content' },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'url', 'tel', 'search', 'number'],
      description: 'The HTML input type, which affects keyboard and validation behavior',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the input wrapper',
      table: { category: 'Appearance' },
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the input is required and shows a required indicator',
      table: { category: 'State' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the input is disabled and non-interactive',
      table: { category: 'State' },
    },
    value: {
      control: 'text',
      description: 'The controlled value of the input',
      table: { category: 'State' },
    },
    defaultValue: {
      control: 'text',
      description: 'The initial uncontrolled value of the input',
      table: { category: 'State' },
    },
    onChange: {
      action: 'changed',
      description: 'Called when the input value changes',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Jane Smith',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
    description: 'We will never share your email with anyone.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    defaultValue: 'not-an-email',
    errorMessage: 'Please enter a valid email address.',
  },
}

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    isRequired: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    defaultValue: 'usr_1234567890',
    isDisabled: true,
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
}
