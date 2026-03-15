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
      <Heading level={1} size={4} style={{ margin: 0 }}>Acme</Heading>
      <Cluster as="nav" space="0.25rem">
        <Button variant="ghost" size="sm">Features</Button>
        <Button variant="ghost" size="sm">Pricing</Button>
        <Button variant="ghost" size="sm">Docs</Button>
      </Cluster>
      <Cluster space="0.5rem">
        <Button variant="secondary" size="sm">Log in</Button>
        <Button variant="primary" size="sm">Sign up</Button>
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
