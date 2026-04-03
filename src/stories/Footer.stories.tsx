import type { Meta, StoryObj } from '@storybook/react'

import { AppFooter } from './shared'

const meta = {
  title: 'Examples/App Footer',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        code: `\
<Box as="footer" style={{ borderBlockStart: '1px solid var(--token-color-border-default)' }}>
  <Center>
    <Cluster justify="space-between" align="flex-start">
      <Stack space="0.5rem">
        <Cluster space="0.25rem" align="center">
          <Icon icon="game-icons:circle-cage" width="16" height="16" />
          <Heading level={2} size={3} style={{ margin: 0 }}>
            Rudiment-UI
          </Heading>
        </Cluster>
        <Text variant="caption">Building better software, together.</Text>
      </Stack>
      <Cluster space="3rem" align="flex-start">
        <Stack space="0.5rem">
          <Text variant="overline">Product</Text>
          <Text variant="body-sm" as="a" href="#">Features</Text>
          <Text variant="body-sm" as="a" href="#">Pricing</Text>
          <Text variant="body-sm" as="a" href="#">Changelog</Text>
        </Stack>
        <Stack space="0.5rem">
          <Text variant="overline">Company</Text>
          <Text variant="body-sm" as="a" href="#">About</Text>
          <Text variant="body-sm" as="a" href="#">Blog</Text>
          <Text variant="body-sm" as="a" href="#">Careers</Text>
        </Stack>
        <Stack space="0.5rem">
          <Text variant="overline">Legal</Text>
          <Text variant="body-sm" as="a" href="#">Privacy</Text>
          <Text variant="body-sm" as="a" href="#">Terms</Text>
        </Stack>
      </Cluster>
    </Cluster>
    <Text variant="caption" style={{ marginBlockStart: '2rem' }}>
      © 2026 Acme, Inc. All rights reserved.
    </Text>
  </Center>
</Box>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Footer: Story = {
  name: 'App Footer',
  render: () => <AppFooter />,
}
