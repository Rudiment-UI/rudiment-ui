import type { Meta, StoryObj } from '@storybook/react'

import { Box } from '../layouts/Box/Box'
import { Center } from '../layouts/Center/Center'
import { Grid } from '../layouts/Grid/Grid'
import { Sidebar } from '../layouts/Sidebar/Sidebar'
import { Stack } from '../layouts/Stack/Stack'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { Alert } from '../components/Alert/Alert'
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
      <Box as="nav" style={{ blockSize: '100%' }}>
        <Stack space="0.25rem">
          <Text variant="overline" style={{ marginBlockEnd: '0.5rem' }}>Navigation</Text>
          <Button variant="secondary" style={{ justifyContent: 'flex-start', width: '100%' }}>Overview</Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start', width: '100%' }}>Analytics</Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start', width: '100%' }}>Projects</Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start', width: '100%' }}>Team</Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start', width: '100%' }}>Settings</Button>
        </Stack>
      </Box>
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
            <Box bordered>
              <Stack space="0.25rem">
                <Text variant="overline">Deployments</Text>
                <Heading level={3} size={3}>42</Heading>
              </Stack>
            </Box>
            <Box bordered>
              <Stack space="0.25rem">
                <Text variant="overline">Build minutes</Text>
                <Heading level={3} size={3}>84</Heading>
              </Stack>
            </Box>
            <Box bordered>
              <Stack space="0.25rem">
                <Text variant="overline">Bandwidth</Text>
                <Heading level={3} size={3}>126</Heading>
              </Stack>
            </Box>
          </Grid>
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
                {['Deployments', 'Build minutes', 'Bandwidth'].map((label, i) => (
                  <Box key={label} bordered>
                    <Stack space="0.25rem">
                      <Text variant="overline">{label}</Text>
                      <Heading level={3} size={3}>{(i + 1) * 42}</Heading>
                    </Stack>
                  </Box>
                ))}
              </Grid>
            </Stack>
          </Box>
        </Sidebar>
      </Center>
    </Stack>
  ),
}
