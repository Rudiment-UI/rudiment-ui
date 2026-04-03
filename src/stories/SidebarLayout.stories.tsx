import type { Meta, StoryObj } from '@storybook/react'

import { Box } from '../layouts/Box/Box'
import { Center } from '../layouts/Center/Center'
import { Grid } from '../layouts/Grid/Grid'
import { Sidebar } from '../layouts/Sidebar/Sidebar'
import { Stack } from '../layouts/Stack/Stack'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { Alert } from '../components/Alert/Alert'
import { StatCard } from '../components/StatCard/StatCard'
import { ProgressBar } from '../components/ProgressBar/ProgressBar'
import { AppHeader, SidebarNav } from './shared'

const meta = {
  title: 'Examples/Sidebar App Layout',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `\
<Stack space="0">
  <AppHeader />
  <Center as="div" style={{ paddingBlock: '2rem' }}>
    <Sidebar sideWidth="14rem" space="2rem">
      <SidebarNav />
      <Box as="main">
        <Stack>
          <Stack space="0.25rem">
            <Heading level={1}>Overview</Heading>
            <Text variant="caption">Your project at a glance.</Text>
          </Stack>
          <Alert variant="info" title="You're on the free plan.">
            Upgrade to unlock unlimited projects and team members.
          </Alert>
          <Grid minCellWidth="14rem" space="1rem">
            <StatCard label="Deployments" value="42" delta="+8%" trend="up" />
            <StatCard label="Build minutes" value="84" delta="+12%" trend="up" />
            <StatCard label="Bandwidth" value="126 GB" delta="-3%" trend="down" />
          </Grid>
          <ProgressBar label="Build minutes used" value={84} maxValue={100} showValueLabel />
        </Stack>
      </Box>
    </Sidebar>
  </Center>
</Stack>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SidebarLayout: Story = {
  name: 'Sidebar App Layout',
  render: () => (
    <Stack space="0">
      <AppHeader />
      <Center as="div" style={{ paddingBlock: '2rem' }}>
        <Sidebar sideWidth="14rem" space="2rem">
          <SidebarNav />
          <Box as="main">
            <Stack>
              <Stack space="0.25rem">
                <Heading level={1}>Overview</Heading>
                <Text variant="caption">Your project at a glance.</Text>
              </Stack>
              <Alert variant="info" title="You're on the free plan.">
                Upgrade to unlock unlimited projects and team members.
              </Alert>
              <Grid minCellWidth="14rem" space="1rem">
                <StatCard label="Deployments" value="42" delta="+8%" trend="up" />
                <StatCard label="Build minutes" value="84" delta="+12%" trend="up" />
                <StatCard label="Bandwidth" value="126 GB" delta="-3%" trend="down" />
              </Grid>
              <ProgressBar label="Build minutes used" value={84} maxValue={100} showValueLabel />
            </Stack>
          </Box>
        </Sidebar>
      </Center>
    </Stack>
  ),
}
