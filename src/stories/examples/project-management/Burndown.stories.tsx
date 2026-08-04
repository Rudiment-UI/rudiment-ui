import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiStatCard } from '../../../components/StatCard/StatCard'
import { RudiLineChart } from '../../../components/Charts/LineChart/LineChart'
import { RudiBarChart } from '../../../components/Charts/BarChart/BarChart'

import {
  PmShell,
  PageHeader,
  Panel,
  sprint,
  burndown,
  velocity,
} from './shared'

const semibold = { fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'] }

// Last observed actual point in the burndown (day 7).
const lastActual = [...burndown].reverse().find((d) => d.remaining != null)
const remaining = lastActual?.remaining ?? 0
const idealNow = burndown.find((d) => d.day === lastActual?.day)?.ideal ?? 0
const behindBy = remaining - idealNow

function ChartLegend({ items }: { items: { label: string; color: string; dashed?: boolean }[] }) {
  return (
    <RudiCluster space="1rem" align="center">
      {items.map((it) => (
        <RudiCluster key={it.label} space="0.375rem" align="center">
          <span
            aria-hidden="true"
            style={{
              inlineSize: '1rem',
              blockSize: 0,
              borderBlockStart: `2px ${it.dashed ? 'dashed' : 'solid'} ${it.color}`,
            }}
          />
          <RudiText variant="caption">{it.label}</RudiText>
        </RudiCluster>
      ))}
    </RudiCluster>
  )
}

function BurndownRender() {
  return (
    <PmShell active="burndown">
      <RudiStack space="1.5rem">
        <PageHeader
          title="Burndown"
          subtitle={`${sprint.name} · tracking ${sprint.committedPoints} committed points over ${sprint.totalDays} days`}
          actions={
            <>
              <RudiButton variant="secondary" size="sm" iconBefore="lucide:calendar">
                Sprint 24
              </RudiButton>
              <RudiButton variant="ghost" size="sm" iconBefore="lucide:download">
                Export
              </RudiButton>
            </>
          }
        />

        {/* Sprint health KPIs */}
        <RudiGrid minCellWidth="13rem" space="1rem">
          <RudiStatCard label="Remaining" value={`${remaining} pts`} delta={`day ${sprint.dayOf}/${sprint.totalDays}`} trend="down" />
          <RudiStatCard label="Completed" value={`${sprint.completedPoints} pts`} delta={`${Math.round((sprint.completedPoints / sprint.committedPoints) * 100)}%`} trend="up" />
          <RudiStatCard
            label="Pace"
            value={behindBy > 0 ? `${behindBy} pts behind` : 'On pace'}
            delta={behindBy > 0 ? 'scope added day 5' : 'ideal line'}
            trend={behindBy > 0 ? 'down' : 'up'}
          />
          <RudiStatCard label="Projected finish" value="Day 11" delta="+1 day" trend="down" />
        </RudiGrid>

        {/* Main burndown chart */}
        <Panel>
          <RudiStack space="1rem">
            <RudiCluster justify="space-between" align="center">
              <RudiHeading level={2} size={5} style={{ margin: 0 }}>
                Remaining work
              </RudiHeading>
              <ChartLegend
                items={[
                  { label: 'Ideal', color: 'var(--rudi-color-dataviz-series-1)', dashed: true },
                  { label: 'Actual', color: 'var(--rudi-color-dataviz-series-2)' },
                ]}
              />
            </RudiCluster>
            <RudiLineChart
              data={burndown}
              dataKeys={['ideal', 'remaining']}
              indexKey="day"
              height={320}
              showDots
              showLegend={false}
              label="Ideal burndown versus actual remaining story points, day by day, for Sprint 24"
            />
            <RudiCluster space="0.5rem" align="center">
              <RudiIcon icon="lucide:info" size="sm" color="var(--rudi-color-text-subtle)" />
              <RudiText variant="caption">
                Actual burn runs above ideal after a {behindBy > 0 ? behindBy : 0}-point scope increase on day 5 (invoice
                rounding bug pulled into the sprint).
              </RudiText>
            </RudiCluster>
          </RudiStack>
        </Panel>

        {/* Velocity history + guidance */}
        <RudiGrid minCellWidth="22rem" space="1rem">
          <Panel style={{ gridColumn: 'span 2' }}>
            <RudiStack space="1rem">
              <RudiHeading level={2} size={5} style={{ margin: 0 }}>
                Velocity — committed vs completed
              </RudiHeading>
              <RudiBarChart
                data={velocity}
                dataKeys={['committed', 'completed']}
                indexKey="sprint"
                height={240}
                showLegend
                label="Committed versus completed points across the last five sprints"
              />
            </RudiStack>
          </Panel>
          <Panel>
            <RudiStack space="0.875rem">
              <RudiHeading level={2} size={5} style={{ margin: 0 }}>
                Read-out
              </RudiHeading>
              {[
                { icon: 'lucide:trending-down', color: 'var(--rudi-color-feedback-warning)', text: 'Burn is 2 points behind ideal — recoverable within the remaining 3 days.' },
                { icon: 'lucide:git-pull-request', color: 'var(--rudi-color-feedback-error)', text: 'Scope grew mid-sprint; guard against further additions before day 10.' },
                { icon: 'lucide:gauge', color: 'var(--rudi-color-feedback-info-text)', text: 'Completed 46 of 72 — trending under the 5-sprint average of 57.' },
                { icon: 'lucide:check', color: 'var(--rudi-color-feedback-success)', text: 'Realtime collaboration epic fully burned down and ready to ship.' },
              ].map((row, i) => (
                <RudiCluster key={i} space="0.625rem" align="flex-start">
                  <RudiIcon icon={row.icon} size="sm" color={row.color} />
                  <RudiText variant="body-sm" style={{ flex: 1 }}>
                    {row.text}
                  </RudiText>
                </RudiCluster>
              ))}
              <RudiText variant="caption" style={{ ...semibold, marginBlockStart: '0.25rem' }}>
                Recommendation: hold scope, pair on BEA-502, protect the ship date.
              </RudiText>
            </RudiStack>
          </Panel>
        </RudiGrid>
      </RudiStack>
    </PmShell>
  )
}

const meta = {
  title: 'Examples/Project Management/Burndown',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A sprint burndown report: ideal-versus-actual remaining points, sprint-health KPIs, a five-sprint velocity comparison, and a plain-language read-out of what the trend means.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Burndown: Story = {
  name: 'Burndown',
  render: () => <BurndownRender />,
}
