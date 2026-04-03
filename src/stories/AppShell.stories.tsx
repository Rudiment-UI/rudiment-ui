import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Center } from '../layouts/Center/Center'
import { Cluster } from '../layouts/Cluster/Cluster'
import { Cover } from '../layouts/Cover/Cover'
import { Grid } from '../layouts/Grid/Grid'
import { Stack } from '../layouts/Stack/Stack'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { CircularProgress } from '../components/CircularProgress/CircularProgress'
import { Dialog } from '../components/Dialog/Dialog'
import { Icon } from '../components/Icon/Icon'
import { IconButton } from '../components/IconButton/IconButton'
import { LineChart } from '../components/Charts/LineChart/LineChart'
import { DonutChart } from '../components/Charts/DonutChart/DonutChart'
import { ProgressBar } from '../components/ProgressBar/ProgressBar'
import { StatCard } from '../components/StatCard/StatCard'
import { Tooltip, TooltipTrigger } from '../components/Tooltip/Tooltip'
import { AppHeader, AppFooter } from './shared'

const revenueData = [
  { month: 'Jan', revenue: 2400, expenses: 1800 },
  { month: 'Feb', revenue: 2800, expenses: 2000 },
  { month: 'Mar', revenue: 3200, expenses: 1900 },
  { month: 'Apr', revenue: 3000, expenses: 2100 },
  { month: 'May', revenue: 3600, expenses: 2200 },
  { month: 'Jun', revenue: 3741, expenses: 2400 },
]

const trafficData = [
  { name: 'Direct', value: 400 },
  { name: 'Organic', value: 300 },
  { name: 'Referral', value: 200 },
  { name: 'Social', value: 100 },
]

function AppShellRender() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Cover minHeight="100vh">
      <AppHeader />
      <Center as="main" style={{ flex: 1, paddingBlock: '2rem', width: '100%' }}>
        <Stack>
          <Cluster justify="space-between" align="center">
            <Stack space="0.25rem">
              <Heading level={2}>Dashboard</Heading>
              <Text variant="caption">Welcome back. Here's what's happening today.</Text>
            </Stack>
            <Cluster space="0.25rem">
              <TooltipTrigger>
                <IconButton aria-label="Refresh data" variant="ghost" size="sm">
                  <Icon icon="lucide:refresh-cw" />
                </IconButton>
                <Tooltip>Refresh data</Tooltip>
              </TooltipTrigger>
              <TooltipTrigger>
                <IconButton aria-label="Download report" variant="ghost" size="sm">
                  <Icon icon="lucide:download" />
                </IconButton>
                <Tooltip>Download report</Tooltip>
              </TooltipTrigger>
              <Button size="sm" onPress={() => setDialogOpen(true)}>View Report</Button>
            </Cluster>
          </Cluster>

          <Grid minCellWidth="12rem" space="1rem">
            <StatCard label="Total users" value="1,247" delta="+12%" trend="up" />
            <StatCard label="Active sessions" value="2,494" delta="+6%" trend="up" />
            <StatCard label="Revenue" value="$3,741" delta="+9%" trend="up" />
            <StatCard label="Conversion" value="4.2%" delta="-2%" trend="down" />
          </Grid>

          <Grid minCellWidth="20rem" space="1rem">
            <Card>
              <Card.Header>
                <Heading level={3} size={5}>Revenue vs Expenses</Heading>
              </Card.Header>
              <Card.Body>
                <LineChart
                  data={revenueData}
                  dataKeys={['revenue', 'expenses']}
                  indexKey="month"
                  height={250}
                  label="Revenue vs expenses over the last 6 months"
                  showLegend
                />
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Heading level={3} size={5}>Traffic Sources</Heading>
              </Card.Header>
              <Card.Body>
                <DonutChart
                  data={trafficData}
                  height={250}
                  label="Website traffic breakdown by source"
                  showLegend
                />
              </Card.Body>
            </Card>
          </Grid>

          <Grid minCellWidth="12rem" space="1rem">
            <Card>
              <Card.Body>
                <Stack space="0.5rem" style={{ alignItems: 'center' }}>
                  <CircularProgress value={92} label="Uptime" showValueLabel variant="success" size="lg" />
                </Stack>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Stack space="0.5rem" style={{ alignItems: 'center' }}>
                  <CircularProgress value={67} label="CPU usage" showValueLabel variant="warning" size="lg" />
                </Stack>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Stack space="0.5rem" style={{ alignItems: 'center' }}>
                  <CircularProgress value={34} label="Error rate" showValueLabel variant="error" size="lg" />
                </Stack>
              </Card.Body>
            </Card>
          </Grid>

          <ProgressBar label="Storage usage" value={68} showValueLabel variant="default" />
        </Stack>
      </Center>
      <AppFooter />

      <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} title="Monthly Report">
        <Stack>
          <Text>Your monthly performance summary is ready for review.</Text>
          <Grid minCellWidth="8rem" space="1rem">
            <Stack space="0.25rem">
              <Text variant="overline">Users</Text>
              <Text variant="body">1,247</Text>
            </Stack>
            <Stack space="0.25rem">
              <Text variant="overline">Revenue</Text>
              <Text variant="body">$3,741</Text>
            </Stack>
            <Stack space="0.25rem">
              <Text variant="overline">Growth</Text>
              <Text variant="body">+12%</Text>
            </Stack>
          </Grid>
          <Cluster justify="flex-end" space="0.5rem">
            <Button variant="secondary" onPress={() => setDialogOpen(false)}>Close</Button>
            <Button>Download PDF</Button>
          </Cluster>
        </Stack>
      </Dialog>
    </Cover>
  )
}

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
      <Cluster justify="space-between" align="center">
        <Stack space="0.25rem">
          <Heading level={2}>Dashboard</Heading>
          <Text variant="caption">Welcome back. Here's what's happening today.</Text>
        </Stack>
        <Cluster space="0.25rem">
          <TooltipTrigger>
            <IconButton aria-label="Refresh data" variant="ghost" size="sm">
              <Icon icon="lucide:refresh-cw" />
            </IconButton>
            <Tooltip>Refresh data</Tooltip>
          </TooltipTrigger>
          <TooltipTrigger>
            <IconButton aria-label="Download report" variant="ghost" size="sm">
              <Icon icon="lucide:download" />
            </IconButton>
            <Tooltip>Download report</Tooltip>
          </TooltipTrigger>
          <Button size="sm" onPress={() => setDialogOpen(true)}>View Report</Button>
        </Cluster>
      </Cluster>

      <Grid minCellWidth="12rem" space="1rem">
        <StatCard label="Total users" value="1,247" delta="+12%" trend="up" />
        <StatCard label="Active sessions" value="2,494" delta="+6%" trend="up" />
        <StatCard label="Revenue" value="$3,741" delta="+9%" trend="up" />
        <StatCard label="Conversion" value="4.2%" delta="-2%" trend="down" />
      </Grid>

      <Grid minCellWidth="20rem" space="1rem">
        <Card>
          <Card.Header>
            <Heading level={3} size={5}>Revenue vs Expenses</Heading>
          </Card.Header>
          <Card.Body>
            <LineChart
              data={revenueData}
              dataKeys={['revenue', 'expenses']}
              indexKey="month"
              height={250}
              label="Revenue vs expenses over the last 6 months"
              showLegend
            />
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <Heading level={3} size={5}>Traffic Sources</Heading>
          </Card.Header>
          <Card.Body>
            <DonutChart
              data={trafficData}
              height={250}
              label="Website traffic breakdown by source"
              showLegend
            />
          </Card.Body>
        </Card>
      </Grid>

      <Grid minCellWidth="12rem" space="1rem">
        <Card>
          <Card.Body>
            <Stack space="0.5rem" style={{ alignItems: 'center' }}>
              <CircularProgress value={92} label="Uptime" showValueLabel variant="success" size="lg" />
            </Stack>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Stack space="0.5rem" style={{ alignItems: 'center' }}>
              <CircularProgress value={67} label="CPU usage" showValueLabel variant="warning" size="lg" />
            </Stack>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Stack space="0.5rem" style={{ alignItems: 'center' }}>
              <CircularProgress value={34} label="Error rate" showValueLabel variant="error" size="lg" />
            </Stack>
          </Card.Body>
        </Card>
      </Grid>

      <ProgressBar label="Storage usage" value={68} showValueLabel variant="default" />
    </Stack>
  </Center>
  <AppFooter />

  <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} title="Monthly Report">
    <Stack>
      <Text>Your monthly performance summary is ready for review.</Text>
      <Cluster justify="flex-end" space="0.5rem">
        <Button variant="secondary" onPress={() => setDialogOpen(false)}>Close</Button>
        <Button>Download PDF</Button>
      </Cluster>
    </Stack>
  </Dialog>
</Cover>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AppShell: Story = {
  name: 'App Shell',
  render: () => <AppShellRender />,
}
