import type { Meta, StoryObj } from '@storybook/react'
import { Item } from 'react-stately'
import { Select, type SelectProps } from './Select'

interface SelectItem {
  id: string
  label: string
}

const colors: SelectItem[] = [
  { id: 'red', label: 'Red' },
  { id: 'green', label: 'Green' },
  { id: 'blue', label: 'Blue' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'purple', label: 'Purple' },
]

const roles: SelectItem[] = [
  { id: 'viewer', label: 'Viewer' },
  { id: 'editor', label: 'Editor' },
  { id: 'admin', label: 'Admin' },
]

type SelectStoryArgs = Omit<SelectProps<SelectItem>, 'children'>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<SelectStoryArgs> = {
  title: 'Components/Select',
  component: Select as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '20rem' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Select {...(args as SelectProps<SelectItem>)}>
      {(item) => <Item key={item.id}>{item.label}</Item>}
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        component:
          'A dropdown menu for choosing one option from a list. Supports placeholder text, helper text, validation errors, and required and disabled states.',
      },
    },
  },
  args: {
    label: 'Favourite colour',
    items: colors,
    placeholder: 'Choose a colour',
    isRequired: false,
    isDisabled: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The visible label displayed above the select',
      table: { category: 'Content' },
    },
    items: {
      control: false,
      description: 'The list of selectable options',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when no option is selected',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Helper text displayed below the select for additional guidance',
      table: { category: 'Content' },
    },
    errorMessage: {
      control: 'text',
      description: 'Validation error message displayed below the select',
      table: { category: 'Content' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the select wrapper',
      table: { category: 'Appearance' },
    },
    selectedKey: {
      control: false,
      description: 'The currently selected option key (controlled)',
      table: { category: 'State' },
    },
    defaultSelectedKey: {
      control: false,
      description: 'The initially selected option key (uncontrolled)',
      table: { category: 'State' },
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the select is required before form submission',
      table: { category: 'State' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the select is disabled and non-interactive',
      table: { category: 'State' },
    },
    onSelectionChange: {
      action: 'selectionChanged',
      description: 'Called when the selected option changes',
      table: { category: 'Events' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: {
    label: 'Role',
    items: roles,
    placeholder: 'Select a role',
    description: 'This determines what the user can access.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Role',
    items: roles,
    placeholder: 'Select a role',
    errorMessage: 'Please select a role before continuing.',
  },
}

export const Required: Story = {
  args: {
    isRequired: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Region',
    items: [{ id: 'us', label: 'United States' }],
    defaultSelectedKey: 'us',
    isDisabled: true,
  },
}
