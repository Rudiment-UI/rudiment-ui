import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A prominent message banner for communicating status, warnings, errors, or confirmations. Uses ARIA live regions so screen readers announce updates automatically.',
      },
    },
  },
  args: {
    variant: 'info',
    isPolite: false,
    children: 'This is an alert message.',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The visual style and semantic meaning of the alert',
      table: { category: 'Appearance' },
    },
    title: {
      control: 'text',
      description: 'An optional bold heading displayed above the alert content',
      table: { category: 'Content' },
    },
    children: {
      control: 'text',
      description: 'The body content of the alert message',
      table: { category: 'Content' },
    },
    isPolite: {
      control: 'boolean',
      description: 'When true, uses role="status" instead of role="alert" for a less intrusive announcement',
      table: { category: 'State' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the alert wrapper',
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Did you know?',
    children: 'This is an informational alert with some helpful context.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Changes saved',
    children: 'Your profile has been updated successfully.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Proceed with caution',
    children: 'This action may have unintended side effects.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Something went wrong',
    children: 'We could not process your request. Please try again.',
  },
}

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'A simple alert without a title.',
  },
}

export const Polite: Story = {
  args: {
    variant: 'success',
    title: 'Auto-saved',
    isPolite: true,
    children: 'Your draft was saved automatically.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="Info">This is an info alert.</Alert>
      <Alert variant="success" title="Success">This is a success alert.</Alert>
      <Alert variant="warning" title="Warning">This is a warning alert.</Alert>
      <Alert variant="error" title="Error">This is an error alert.</Alert>
    </div>
  ),
}
