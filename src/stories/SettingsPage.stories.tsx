import type { Meta, StoryObj } from '@storybook/react'
import { Item } from 'react-stately'

import { Box } from '../layouts/Box/Box'
import { Center } from '../layouts/Center/Center'
import { Cluster } from '../layouts/Cluster/Cluster'
import { Stack } from '../layouts/Stack/Stack'
import { Switcher } from '../layouts/Switcher/Switcher'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { Button } from '../components/Button/Button'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { CheckboxGroup } from '../components/Checkbox/CheckboxGroup'
import { Input } from '../components/Input/Input'
import { RadioGroup } from '../components/RadioGroup/RadioGroup'
import { Select } from '../components/Select/Select'
import { Switch } from '../components/Switch/Switch'
import { AppHeader, Radio } from './shared'

const meta = {
  title: 'Examples/Settings Page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `\
<Stack space="0">
  <AppHeader />
  <Center style={{ paddingBlock: '2rem' }}>
    <Stack>
      <Heading level={1} size={2}>Settings</Heading>

      <Box bordered>
        <Stack>
          <Stack space="0.25rem">
            <Heading level={2} size={4}>Profile</Heading>
            <Text variant="caption">Update your name and email address.</Text>
          </Stack>
          <Switcher threshold="28rem" space="1rem">
            <Input label="First name" defaultValue="Jane" isRequired />
            <Input label="Last name" defaultValue="Smith" isRequired />
          </Switcher>
          <Input label="Email address" type="email" defaultValue="jane@example.com" isRequired />
          <Cluster justify="flex-end">
            <Button variant="primary" size="sm">Save profile</Button>
          </Cluster>
        </Stack>
      </Box>

      <Box bordered>
        <Stack>
          <Stack space="0.25rem">
            <Heading level={2} size={4}>Notifications</Heading>
            <Text variant="caption">Choose what you want to be notified about.</Text>
          </Stack>
          <CheckboxGroup label="Email notifications" defaultValue={['deploys', 'comments']}>
            <Checkbox value="deploys">Deployment status</Checkbox>
            <Checkbox value="comments">Comments and mentions</Checkbox>
            <Checkbox value="billing">Billing and invoices</Checkbox>
            <Checkbox value="security">Security alerts</Checkbox>
          </CheckboxGroup>
        </Stack>
      </Box>

      <Box bordered>
        <Stack>
          <Stack space="0.25rem">
            <Heading level={2} size={4}>Preferences</Heading>
            <Text variant="caption">Customize your experience.</Text>
          </Stack>
          <Select
            label="Default region"
            items={[
              { id: 'us-east', name: 'US East (N. Virginia)' },
              { id: 'us-west', name: 'US West (Oregon)' },
              { id: 'eu-west', name: 'EU West (Ireland)' },
              { id: 'ap-se', name: 'Asia Pacific (Singapore)' },
            ]}
            defaultSelectedKey="us-east"
          >
            {(item) => <Item key={item.id}>{item.name}</Item>}
          </Select>
          <RadioGroup label="Theme" defaultValue="system" orientation="horizontal">
            <Radio value="light">Light</Radio>
            <Radio value="dark">Dark</Radio>
            <Radio value="system">System</Radio>
          </RadioGroup>
          <Stack space="0.75rem">
            <Text variant="overline">Interface</Text>
            <Switch defaultSelected>Show welcome screen on login</Switch>
            <Switch>Enable keyboard shortcuts</Switch>
            <Switch defaultSelected>Compact table rows</Switch>
          </Stack>
        </Stack>
      </Box>

      <Box bordered style={{ borderColor: 'var(--token-color-feedback-error-border, var(--token-color-border-default))' }}>
        <Stack>
          <Stack space="0.25rem">
            <Heading level={2} size={4}>Danger zone</Heading>
            <Text variant="caption">These actions are permanent and cannot be undone.</Text>
          </Stack>
          <Cluster justify="space-between" align="center">
            <Stack space="0.25rem">
              <Text variant="body-sm" style={{ fontWeight: 600 }}>Delete account</Text>
              <Text variant="caption">Permanently delete your account and all associated data.</Text>
            </Stack>
            <Button variant="destructive" size="sm">Delete account</Button>
          </Cluster>
        </Stack>
      </Box>
    </Stack>
  </Center>
</Stack>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SettingsPage: Story = {
  name: 'Settings Page',
  render: () => (
    <Stack space="0">
      <AppHeader />
      <Center style={{ paddingBlock: '2rem' }}>
        <Stack>
          <Heading level={1} size={2}>Settings</Heading>

          {/* Profile section */}
          <Box bordered>
            <Stack>
              <Stack space="0.25rem">
                <Heading level={2} size={4}>Profile</Heading>
                <Text variant="caption">Update your name and email address.</Text>
              </Stack>
              <Switcher threshold="28rem" space="1rem">
                <Input label="First name" defaultValue="Jane" isRequired />
                <Input label="Last name" defaultValue="Smith" isRequired />
              </Switcher>
              <Input label="Email address" type="email" defaultValue="jane@example.com" isRequired />
              <Cluster justify="flex-end">
                <Button variant="primary" size="sm">Save profile</Button>
              </Cluster>
            </Stack>
          </Box>

          {/* Notifications section */}
          <Box bordered>
            <Stack>
              <Stack space="0.25rem">
                <Heading level={2} size={4}>Notifications</Heading>
                <Text variant="caption">Choose what you want to be notified about.</Text>
              </Stack>
              <CheckboxGroup label="Email notifications" defaultValue={['deploys', 'comments']}>
                <Checkbox value="deploys">Deployment status</Checkbox>
                <Checkbox value="comments">Comments and mentions</Checkbox>
                <Checkbox value="billing">Billing and invoices</Checkbox>
                <Checkbox value="security">Security alerts</Checkbox>
              </CheckboxGroup>
            </Stack>
          </Box>

          {/* Preferences section */}
          <Box bordered>
            <Stack>
              <Stack space="0.25rem">
                <Heading level={2} size={4}>Preferences</Heading>
                <Text variant="caption">Customize your experience.</Text>
              </Stack>
              <Select
                label="Default region"
                items={[
                  { id: 'us-east', name: 'US East (N. Virginia)' },
                  { id: 'us-west', name: 'US West (Oregon)' },
                  { id: 'eu-west', name: 'EU West (Ireland)' },
                  { id: 'ap-se', name: 'Asia Pacific (Singapore)' },
                ]}
                defaultSelectedKey="us-east"
              >
                {(item) => <Item key={item.id}>{item.name}</Item>}
              </Select>
              <RadioGroup label="Theme" defaultValue="system" orientation="horizontal">
                <Radio value="light">Light</Radio>
                <Radio value="dark">Dark</Radio>
                <Radio value="system">System</Radio>
              </RadioGroup>
              <Stack space="0.75rem">
                <Text variant="overline">Interface</Text>
                <Switch defaultSelected>Show welcome screen on login</Switch>
                <Switch>Enable keyboard shortcuts</Switch>
                <Switch defaultSelected>Compact table rows</Switch>
              </Stack>
            </Stack>
          </Box>

          {/* Danger zone */}
          <Box bordered style={{ borderColor: 'var(--token-color-feedback-error-border, var(--token-color-border-default))' }}>
            <Stack>
              <Stack space="0.25rem">
                <Heading level={2} size={4}>Danger zone</Heading>
                <Text variant="caption">These actions are permanent and cannot be undone.</Text>
              </Stack>
              <Cluster justify="space-between" align="center">
                <Stack space="0.25rem">
                  <Text variant="body-sm" style={{ fontWeight: 600 }}>Delete account</Text>
                  <Text variant="caption">Permanently delete your account and all associated data.</Text>
                </Stack>
                <Button variant="destructive" size="sm">Delete account</Button>
              </Cluster>
            </Stack>
          </Box>
        </Stack>
      </Center>
    </Stack>
  ),
}
