import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    defaultSelected: { control: 'boolean' },
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
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch>Off by default</Switch>
      <Switch defaultSelected>On by default</Switch>
      <Switch isDisabled>Disabled off</Switch>
      <Switch isDisabled defaultSelected>Disabled on</Switch>
    </div>
  ),
}
