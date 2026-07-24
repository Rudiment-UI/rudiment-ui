import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiCenter } from '../layouts/Center/Center'
import { RudiCluster } from '../layouts/Cluster/Cluster'
import { RudiCover } from '../layouts/Cover/Cover'
import { RudiGrid } from '../layouts/Grid/Grid'
import { RudiStack } from '../layouts/Stack/Stack'
import { RudiHeading } from '../typography/Heading/Heading'
import { RudiText } from '../typography/Text/Text'
import { RudiButton } from '../components/Button/Button'
import { RudiCard } from '../components/Card/Card'
import { RudiCircularProgress } from '../components/CircularProgress/CircularProgress'
import { RudiDialog } from '../components/Dialog/Dialog'
import { RudiIcon } from '../components/Icon/Icon'
import { RudiIconButton } from '../components/IconButton/IconButton'
import { RudiLineChart } from '../components/Charts/LineChart/LineChart'
import { RudiDonutChart } from '../components/Charts/DonutChart/DonutChart'
import { RudiProgressBar } from '../components/ProgressBar/ProgressBar'
import { RudiStatCard } from '../components/StatCard/StatCard'
import { RudiTooltip, RudiTooltipTrigger } from '../components/Tooltip/Tooltip'
import { RudiMenuTrigger } from '../components/Menu/MenuTrigger'
import { RudiMenu } from '../components/Menu/Menu'
import { RudiMenuItem } from '../components/Menu/MenuItem'
import { RudiMenuSection } from '../components/Menu/MenuSection'
import { RudiKeyboard } from '../components/Menu/Keyboard'
import { Separator, Text as AriaText } from 'react-aria-components'
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
    <RudiCover minHeight="100vh">
      <AppHeader />
      <RudiCenter as="main" style={{ flex: 1, paddingBlock: '2rem', width: '100%' }}>
        <RudiStack>
          <RudiCluster justify="space-between" align="center">
            <RudiStack space="0.25rem">
              <RudiHeading level={2}>Dashboard</RudiHeading>
              <RudiText variant="caption">Welcome back. Here's what's happening today.</RudiText>
            </RudiStack>
            <RudiCluster space="0.25rem">
              <RudiTooltipTrigger>
                <RudiIconButton aria-label="Refresh data" variant="ghost" size="sm">
                  <RudiIcon icon="lucide:refresh-cw" />
                </RudiIconButton>
                <RudiTooltip>Refresh data</RudiTooltip>
              </RudiTooltipTrigger>
              <RudiMenuTrigger>
                <RudiButton variant="secondary" size="sm" aria-label="More actions">
                  <RudiIcon icon="lucide:ellipsis" />
                </RudiButton>
                <RudiMenu onAction={(key) => {
                  if (key === 'view-report') setDialogOpen(true)
                  else alert(key)
                }}>
                  <RudiMenuSection title="Reports">
                    <RudiMenuItem id="view-report" textValue="View report">
                      <RudiIcon icon="lucide:file-text" className="rudi-menu__item-icon" />
                      <AriaText slot="label">View report</AriaText>
                      <RudiKeyboard>⌘R</RudiKeyboard>
                    </RudiMenuItem>
                    <RudiMenuItem id="download" textValue="Download CSV">
                      <RudiIcon icon="lucide:download" className="rudi-menu__item-icon" />
                      <AriaText slot="label">Download CSV</AriaText>
                      <RudiKeyboard>⌘D</RudiKeyboard>
                    </RudiMenuItem>
                    <RudiMenuItem id="share" textValue="Share dashboard">
                      <RudiIcon icon="lucide:share" className="rudi-menu__item-icon" />
                      <AriaText slot="label">Share dashboard</AriaText>
                    </RudiMenuItem>
                  </RudiMenuSection>
                  <Separator className="rudi-menu__separator" />
                  <RudiMenuSection title="View">
                    <RudiMenuItem id="fullscreen" textValue="Fullscreen">
                      <RudiIcon icon="lucide:maximize" className="rudi-menu__item-icon" />
                      <AriaText slot="label">Fullscreen</AriaText>
                      <RudiKeyboard>F11</RudiKeyboard>
                    </RudiMenuItem>
                    <RudiMenuItem id="print" textValue="Print">
                      <RudiIcon icon="lucide:printer" className="rudi-menu__item-icon" />
                      <AriaText slot="label">Print</AriaText>
                      <RudiKeyboard>⌘P</RudiKeyboard>
                    </RudiMenuItem>
                  </RudiMenuSection>
                </RudiMenu>
              </RudiMenuTrigger>
              <RudiButton size="sm" onPress={() => setDialogOpen(true)}>View Report</RudiButton>
            </RudiCluster>
          </RudiCluster>

          <RudiGrid minCellWidth="12rem" space="1rem">
            <RudiStatCard label="Total users" value="1,247" delta="+12%" trend="up" />
            <RudiStatCard label="Active sessions" value="2,494" delta="+6%" trend="up" />
            <RudiStatCard label="Revenue" value="$3,741" delta="+9%" trend="up" />
            <RudiStatCard label="Conversion" value="4.2%" delta="-2%" trend="down" />
          </RudiGrid>

          <RudiGrid minCellWidth="20rem" space="1rem">
            <RudiCard variant="outlined">
              <RudiCard.Header>
                <RudiHeading level={3} size={5}>Revenue vs Expenses</RudiHeading>
              </RudiCard.Header>
              <RudiCard.Body>
                <RudiLineChart
                  data={revenueData}
                  dataKeys={['revenue', 'expenses']}
                  indexKey="month"
                  height={250}
                  label="Revenue vs expenses over the last 6 months"
                  showLegend
                />
              </RudiCard.Body>
            </RudiCard>
            <RudiCard variant="outlined">
              <RudiCard.Header>
                <RudiHeading level={3} size={5}>Traffic Sources</RudiHeading>
              </RudiCard.Header>
              <RudiCard.Body>
                <RudiDonutChart
                  data={trafficData}
                  height={250}
                  label="Website traffic breakdown by source"
                  showLegend
                />
              </RudiCard.Body>
            </RudiCard>
          </RudiGrid>

          <RudiGrid minCellWidth="12rem" space="1rem">
            <RudiCard variant="outlined">
              <RudiCard.Body>
                <RudiStack space="0.5rem" style={{ alignItems: 'center' }}>
                  <RudiCircularProgress value={92} label="Uptime" showValueLabel variant="success" size="lg" />
                </RudiStack>
              </RudiCard.Body>
            </RudiCard>
            <RudiCard variant="outlined">
              <RudiCard.Body>
                <RudiStack space="0.5rem" style={{ alignItems: 'center' }}>
                  <RudiCircularProgress value={67} label="CPU usage" showValueLabel variant="warning" size="lg" />
                </RudiStack>
              </RudiCard.Body>
            </RudiCard>
            <RudiCard variant="outlined">
              <RudiCard.Body>
                <RudiStack space="0.5rem" style={{ alignItems: 'center' }}>
                  <RudiCircularProgress value={34} label="Error rate" showValueLabel variant="error" size="lg" />
                </RudiStack>
              </RudiCard.Body>
            </RudiCard>
          </RudiGrid>

          <RudiProgressBar label="Storage usage" value={68} showValueLabel variant="default" />
        </RudiStack>
      </RudiCenter>
      <AppFooter />

      <RudiDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} title="Monthly Report">
        <RudiStack>
          <RudiText>Your monthly performance summary is ready for review.</RudiText>
          <RudiGrid minCellWidth="8rem" space="1rem">
            <RudiStack space="0.25rem">
              <RudiText variant="overline">Users</RudiText>
              <RudiText variant="body">1,247</RudiText>
            </RudiStack>
            <RudiStack space="0.25rem">
              <RudiText variant="overline">Revenue</RudiText>
              <RudiText variant="body">$3,741</RudiText>
            </RudiStack>
            <RudiStack space="0.25rem">
              <RudiText variant="overline">Growth</RudiText>
              <RudiText variant="body">+12%</RudiText>
            </RudiStack>
          </RudiGrid>
          <RudiCluster justify="flex-end" space="0.5rem">
            <RudiButton variant="secondary" onPress={() => setDialogOpen(false)}>Close</RudiButton>
            <RudiButton>Download PDF</RudiButton>
          </RudiCluster>
        </RudiStack>
      </RudiDialog>
    </RudiCover>
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
          <MenuTrigger>
            <Button variant="secondary" size="sm" aria-label="More actions">
              <Icon icon="lucide:ellipsis" />
            </Button>
            <Menu>
              <MenuSection title="Reports">
                <MenuItem id="view-report">View report</MenuItem>
                <MenuItem id="download">Download CSV</MenuItem>
                <MenuItem id="share">Share dashboard</MenuItem>
              </MenuSection>
              <Separator />
              <MenuSection title="View">
                <MenuItem id="fullscreen">Fullscreen</MenuItem>
                <MenuItem id="print">Print</MenuItem>
              </MenuSection>
            </Menu>
          </MenuTrigger>
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
