import type { Meta, StoryObj } from '@storybook/react'

import { Box } from '../layouts/Box/Box'
import { Center } from '../layouts/Center/Center'
import { Cover } from '../layouts/Cover/Cover'
import { Grid } from '../layouts/Grid/Grid'
import { Stack } from '../layouts/Stack/Stack'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { AppHeader, AppFooter } from './shared'

const meta = {
  title: 'Examples/App Shell',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `\
<Cover minHeight="100vh">
  <AppHeader />
  <Center as="main" style={{ flex: 1, paddingBlock: '2rem', width: '100%' }}>
    <Stack>
      <Heading level={2}>Dashboard</Heading>
      <Text variant="caption">Welcome back. Here's what's happening today.</Text>
      <Grid minCellWidth="12rem" space="1rem">
        {['Total users', 'Active sessions', 'Revenue', 'Conversion'].map((label, i) => (
          <Box key={label} bordered>
            <Stack space="0.25rem">
              <Text variant="overline">{label}</Text>
              <Heading level={3} size={2}>{(i + 1) * 1247}</Heading>
              <Text variant="caption">↑ {(i + 1) * 3}% from last month</Text>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Stack>
  </Center>
  <AppFooter />
</Cover>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AppShell: Story = {
  name: 'App Shell',
  render: () => (
    <Cover minHeight="100vh">
      <AppHeader />
      <Center as="main" style={{ flex: 1, paddingBlock: '2rem', width: '100%' }}>
        <Stack>
          <Heading level={2}>Dashboard</Heading>
          <Text variant="caption">Welcome back. Here's what's happening today.</Text>
          <Grid minCellWidth="12rem" space="1rem">
            {['Total users', 'Active sessions', 'Revenue', 'Conversion'].map((label, i) => (
              <Box key={label} bordered>
                <Stack space="0.25rem">
                  <Text variant="overline">{label}</Text>
                  <Heading level={3} size={2}>{(i + 1) * 1247}</Heading>
                  <Text variant="caption">↑ {(i + 1) * 3}% from last month</Text>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      </Center>
      <AppFooter />
    </Cover>
  ),
}
