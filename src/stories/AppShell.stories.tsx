import type { Meta, StoryObj } from '@storybook/react'

import { Center } from '../layouts/Center/Center'
import { Cover } from '../layouts/Cover/Cover'
import { Grid } from '../layouts/Grid/Grid'
import { Stack } from '../layouts/Stack/Stack'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { StatCard } from '../components/StatCard/StatCard'
import { ProgressBar } from '../components/ProgressBar/ProgressBar'
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
        <StatCard label="Total users" value="1,247" delta="+12%" trend="up" />
        <StatCard label="Active sessions" value="2,494" delta="+6%" trend="up" />
        <StatCard label="Revenue" value="$3,741" delta="+9%" trend="up" />
        <StatCard label="Conversion" value="4.2%" delta="-2%" trend="down" />
      </Grid>
      <ProgressBar label="Storage usage" value={68} showValueLabel variant="default" />
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
            <StatCard label="Total users" value="1,247" delta="+12%" trend="up" />
            <StatCard label="Active sessions" value="2,494" delta="+6%" trend="up" />
            <StatCard label="Revenue" value="$3,741" delta="+9%" trend="up" />
            <StatCard label="Conversion" value="4.2%" delta="-2%" trend="down" />
          </Grid>
          <ProgressBar label="Storage usage" value={68} showValueLabel variant="default" />
        </Stack>
      </Center>
      <AppFooter />
    </Cover>
  ),
}
