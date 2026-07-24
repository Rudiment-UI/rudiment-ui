import type { Meta, StoryObj } from '@storybook/react'

import { RudiBox } from '../layouts/Box/Box'
import { RudiCenter } from '../layouts/Center/Center'
import { RudiGrid } from '../layouts/Grid/Grid'
import { RudiSidebar } from '../layouts/Sidebar/Sidebar'
import { RudiStack } from '../layouts/Stack/Stack'
import { RudiHeading } from '../typography/Heading/Heading'
import { RudiText } from '../typography/Text/Text'
import { RudiAlert } from '../components/Alert/Alert'
import { RudiStatCard } from '../components/StatCard/StatCard'
import { RudiProgressBar } from '../components/ProgressBar/ProgressBar'
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
    <RudiStack space="0">
      <AppHeader />
      <RudiCenter as="div" style={{ paddingBlock: '2rem' }}>
        <RudiSidebar sideWidth="14rem" space="2rem">
          <SidebarNav />
          <RudiBox as="main">
            <RudiStack>
              <RudiStack space="0.25rem">
                <RudiHeading level={1}>Overview</RudiHeading>
                <RudiText variant="caption">Your project at a glance.</RudiText>
              </RudiStack>
              <RudiAlert variant="info" title="You're on the free plan.">
                Upgrade to unlock unlimited projects and team members.
              </RudiAlert>
              <RudiGrid minCellWidth="14rem" space="1rem">
                <RudiStatCard label="Deployments" value="42" delta="+8%" trend="up" />
                <RudiStatCard label="Build minutes" value="84" delta="+12%" trend="up" />
                <RudiStatCard label="Bandwidth" value="126 GB" delta="-3%" trend="down" />
              </RudiGrid>
              <RudiProgressBar label="Build minutes used" value={84} maxValue={100} showValueLabel />
            </RudiStack>
          </RudiBox>
        </RudiSidebar>
      </RudiCenter>
    </RudiStack>
  ),
}
