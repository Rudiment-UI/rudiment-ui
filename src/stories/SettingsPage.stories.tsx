import type { Meta, StoryObj } from '@storybook/react'
import { Item } from 'react-stately'
import { Icon } from '@iconify/react'

import { RudiCenter } from '../layouts/Center/Center'
import { RudiCluster } from '../layouts/Cluster/Cluster'
import { RudiStack } from '../layouts/Stack/Stack'
import { RudiSwitcher } from '../layouts/Switcher/Switcher'
import { RudiHeading } from '../typography/Heading/Heading'
import { RudiText } from '../typography/Text/Text'
import { RudiAvatar } from '../components/Avatar/Avatar'
import { RudiBadge } from '../components/Badge/Badge'
import { RudiButton } from '../components/Button/Button'
import { RudiCard } from '../components/Card/Card'
import { RudiCheckbox } from '../components/Checkbox/Checkbox'
import { RudiCheckboxGroup } from '../components/Checkbox/CheckboxGroup'
import { RudiInput } from '../components/Input/Input'
import { RudiRadioGroup } from '../components/RadioGroup/RadioGroup'
import { RudiSelect } from '../components/Select/Select'
import { RudiSwitch } from '../components/Switch/Switch'
import { RudiMenuTrigger } from '../components/Menu/MenuTrigger'
import { RudiMenu } from '../components/Menu/Menu'
import { RudiMenuItem } from '../components/Menu/MenuItem'
import { Separator, Text as AriaText } from 'react-aria-components'
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

      <Card variant="outlined">
        <Card.Header>
          <Cluster space="1rem" align="center">
            <Avatar name="Jane Smith" size="lg" status="success" />
            <Stack space="0.25rem">
              <Heading level={2} size={4}>Profile</Heading>
              <Text variant="caption">Update your name and email address.</Text>
            </Stack>
          </Cluster>
        </Card.Header>
        <Card.Body>
          <Stack>
            <Switcher threshold="28rem" space="1rem">
              <Input label="First name" defaultValue="Jane" isRequired />
              <Input label="Last name" defaultValue="Smith" isRequired />
            </Switcher>
            <Input label="Email address" type="email" defaultValue="jane@example.com" isRequired />
            <Cluster justify="flex-end" space="0.5rem">
              <MenuTrigger>
                <Button variant="ghost" size="sm" aria-label="More profile actions">⋯</Button>
                <Menu>
                  <MenuItem id="upload-photo">Upload photo</MenuItem>
                  <MenuItem id="export">Export data</MenuItem>
                  <Separator />
                  <MenuItem id="reset" isDestructive>Reset to defaults</MenuItem>
                </Menu>
              </MenuTrigger>
              <Button variant="primary" size="sm">Save profile</Button>
            </Cluster>
          </Stack>
        </Card.Body>
      </Card>

      <Card variant="outlined">
        <Card.Header>
          <Stack space="0.25rem">
            <Heading level={2} size={4}>Notifications</Heading>
            <Text variant="caption">Choose what you want to be notified about.</Text>
          </Stack>
        </Card.Header>
        <Card.Body>
          <CheckboxGroup label="Email notifications" defaultValue={['deploys', 'comments']}>
            <Checkbox value="deploys">Deployment status</Checkbox>
            <Checkbox value="comments">Comments and mentions</Checkbox>
            <Checkbox value="billing">Billing and invoices</Checkbox>
            <Checkbox value="security">Security alerts</Checkbox>
          </CheckboxGroup>
        </Card.Body>
      </Card>

      <Card variant="outlined">
        <Card.Header>
          <Stack space="0.25rem">
            <Heading level={2} size={4}>Preferences</Heading>
            <Text variant="caption">Customize your experience.</Text>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Stack>
            <Select label="Default region" ...>
              ...
            </Select>
            <RadioGroup label="Theme" defaultValue="system" orientation="horizontal">
              ...
            </RadioGroup>
            <Stack space="0.75rem">
              <Text variant="overline">Interface</Text>
              <Switch defaultSelected>Show welcome screen on login</Switch>
              <Switch>Enable keyboard shortcuts</Switch>
              <Switch defaultSelected>Compact table rows</Switch>
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      <Card variant="outlined">
        <Card.Body>
          <Stack>
            <Cluster space="0.5rem" align="center">
              <Heading level={2} size={4}>Danger zone</Heading>
              <Badge variant="error">Irreversible</Badge>
            </Cluster>
            <Text variant="caption">These actions are permanent and cannot be undone.</Text>
            <Cluster justify="space-between" align="center">
              <Stack space="0.25rem">
                <Text variant="body-sm" style={{ fontWeight: 600 }}>Delete account</Text>
                <Text variant="caption">Permanently delete your account and all associated data.</Text>
              </Stack>
              <Button variant="destructive" size="sm">Delete account</Button>
            </Cluster>
          </Stack>
        </Card.Body>
      </Card>
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
    <RudiStack space="0">
      <AppHeader />
      <RudiCenter style={{ paddingBlock: '2rem' }}>
        <RudiStack>
          <RudiHeading level={1} size={2}>Settings</RudiHeading>

          {/* Profile section */}
          <RudiCard variant="outlined">
            <RudiCard.Header>
              <RudiCluster space="1rem" align="center">
                <RudiAvatar name="Jane Smith" size="lg" status="success" />
                <RudiStack space="0.25rem">
                  <RudiHeading level={2} size={4}>Profile</RudiHeading>
                  <RudiText variant="caption">Update your name and email address.</RudiText>
                </RudiStack>
              </RudiCluster>
            </RudiCard.Header>
            <RudiCard.Body>
              <RudiStack>
                <RudiSwitcher threshold="28rem" space="1rem">
                  <RudiInput label="First name" defaultValue="Jane" isRequired />
                  <RudiInput label="Last name" defaultValue="Smith" isRequired />
                </RudiSwitcher>
                <RudiInput label="Email address" type="email" defaultValue="jane@example.com" isRequired />
                <RudiCluster justify="flex-end" space="0.5rem">
                  <RudiMenuTrigger>
                    <RudiButton variant="ghost" size="sm" aria-label="More profile actions">
                      <Icon icon="lucide:ellipsis" width="16" height="16" />
                    </RudiButton>
                    <RudiMenu onAction={(key) => alert(key)}>
                      <RudiMenuItem id="upload-photo" textValue="Upload photo">
                        <Icon icon="lucide:camera" className="rudi-menu__item-icon" />
                        <AriaText slot="label">Upload photo</AriaText>
                      </RudiMenuItem>
                      <RudiMenuItem id="export" textValue="Export data">
                        <Icon icon="lucide:download" className="rudi-menu__item-icon" />
                        <AriaText slot="label">Export data</AriaText>
                      </RudiMenuItem>
                      <Separator className="rudi-menu__separator" />
                      <RudiMenuItem id="reset" textValue="Reset to defaults" isDestructive>
                        <Icon icon="lucide:rotate-ccw" className="rudi-menu__item-icon" />
                        <AriaText slot="label">Reset to defaults</AriaText>
                      </RudiMenuItem>
                    </RudiMenu>
                  </RudiMenuTrigger>
                  <RudiButton variant="primary" size="sm">Save profile</RudiButton>
                </RudiCluster>
              </RudiStack>
            </RudiCard.Body>
          </RudiCard>

          {/* Notifications section */}
          <RudiCard variant="outlined">
            <RudiCard.Header>
              <RudiStack space="0.25rem">
                <RudiHeading level={2} size={4}>Notifications</RudiHeading>
                <RudiText variant="caption">Choose what you want to be notified about.</RudiText>
              </RudiStack>
            </RudiCard.Header>
            <RudiCard.Body>
              <RudiCheckboxGroup label="Email notifications" defaultValue={['deploys', 'comments']}>
                <RudiCheckbox value="deploys">Deployment status</RudiCheckbox>
                <RudiCheckbox value="comments">Comments and mentions</RudiCheckbox>
                <RudiCheckbox value="billing">Billing and invoices</RudiCheckbox>
                <RudiCheckbox value="security">Security alerts</RudiCheckbox>
              </RudiCheckboxGroup>
            </RudiCard.Body>
          </RudiCard>

          {/* Preferences section */}
          <RudiCard variant="outlined">
            <RudiCard.Header>
              <RudiStack space="0.25rem">
                <RudiHeading level={2} size={4}>Preferences</RudiHeading>
                <RudiText variant="caption">Customize your experience.</RudiText>
              </RudiStack>
            </RudiCard.Header>
            <RudiCard.Body>
              <RudiStack>
                <RudiSelect
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
                </RudiSelect>
                <RudiRadioGroup label="Theme" defaultValue="system" orientation="horizontal">
                  <Radio value="light">Light</Radio>
                  <Radio value="dark">Dark</Radio>
                  <Radio value="system">System</Radio>
                </RudiRadioGroup>
                <RudiStack space="0.75rem">
                  <RudiText variant="overline">Interface</RudiText>
                  <RudiSwitch defaultSelected>Show welcome screen on login</RudiSwitch>
                  <RudiSwitch>Enable keyboard shortcuts</RudiSwitch>
                  <RudiSwitch defaultSelected>Compact table rows</RudiSwitch>
                </RudiStack>
              </RudiStack>
            </RudiCard.Body>
          </RudiCard>

          {/* Danger zone */}
          <RudiCard variant="outlined">
            <RudiCard.Body>
              <RudiStack>
                <RudiCluster space="0.5rem" align="center">
                  <RudiHeading level={2} size={4}>Danger zone</RudiHeading>
                  <RudiBadge variant="error">Irreversible</RudiBadge>
                </RudiCluster>
                <RudiText variant="caption">These actions are permanent and cannot be undone.</RudiText>
                <RudiCluster justify="space-between" align="center">
                  <RudiStack space="0.25rem">
                    <RudiText variant="body-sm" style={{ fontWeight: 600 }}>Delete account</RudiText>
                    <RudiText variant="caption">Permanently delete your account and all associated data.</RudiText>
                  </RudiStack>
                  <RudiButton variant="destructive" size="sm">Delete account</RudiButton>
                </RudiCluster>
              </RudiStack>
            </RudiCard.Body>
          </RudiCard>
        </RudiStack>
      </RudiCenter>
    </RudiStack>
  ),
}
