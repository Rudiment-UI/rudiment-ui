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
  args: {
    label: 'Favourite colour',
    items: colors,
    placeholder: 'Choose a colour',
  },
  argTypes: {
    isRequired: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
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
