import type { Meta, StoryObj } from '@storybook/react'

import { AppHeader } from './shared'

const meta = {
  title: 'Examples/App Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        code: `\
<Box as="header" bordered style={{ borderRadius: 0, borderInline: 'none', borderBlockStart: 'none' }}>
  <Center>
    <Cluster justify="space-between" align="center">
      <Cluster space="0.25rem" align="center">
        <Icon icon="game-icons:circle-cage" width="20" height="20" />
        <Heading level={1} size={4} style={{ margin: 0 }}>
          Rudiment-UI
        </Heading>
      </Cluster>
      <Cluster as="nav" space="0.25rem">
        <Button variant="ghost" size="sm">Features</Button>
        <Button variant="ghost" size="sm">Pricing</Button>
        <Button variant="ghost" size="sm">Docs</Button>
      </Cluster>
      <Cluster space="0.5rem" align="center">
        <Badge variant="info" size="sm">Beta</Badge>
        <Button variant="secondary" size="sm">Log in</Button>
        <MenuTrigger>
          <Button variant="ghost" size="sm" aria-label="User menu">
            <Avatar name="Jane Smith" size="sm" status="success" />
          </Button>
          <Menu onAction={(key) => alert(key)}>
            <MenuItem id="profile">Profile</MenuItem>
            <MenuItem id="settings">Settings</MenuItem>
            <MenuItem id="billing">Billing</MenuItem>
            <Separator />
            <MenuItem id="sign-out" isDestructive>Sign out</MenuItem>
          </Menu>
        </MenuTrigger>
      </Cluster>
    </Cluster>
  </Center>
</Box>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Header: Story = {
  name: 'App Header',
  render: () => <AppHeader />,
}
