import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'url', 'tel', 'search', 'number'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    isRequired: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
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
