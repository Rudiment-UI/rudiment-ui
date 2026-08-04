import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiStatCard } from '../../../components/StatCard/StatCard'
import { RudiLineChart } from '../../../components/Charts/LineChart/LineChart'
import { RudiBarChart } from '../../../components/Charts/BarChart/BarChart'

import {
  CrmShell,
  PageHeader,
  Panel,
  SectionHeading,
  AvatarFor,
  deals,
  openDeals,
  employee,
  mrrTrend,
  dealStageMeta,
  formatCurrency,
  formatCompact,
  type DealStage,
} from './shared'

const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }
const semibold = { fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'] }

// --- Derived sales metrics, all from the shared data model -----------------
const openPipeline = openDeals.reduce((sum, d) => sum + d.value, 0)

const wonDeals = deals.filter((d) => d.stage === 'won')
const lostDeals = deals.filter((d) => d.stage === 'lost')
const winRate = Math.round((wonDeals.length / (wonDeals.length + lostDeals.length)) * 100)

const avgDealSize = deals.reduce((sum, d) => sum + d.value, 0) / deals.length

/** Pipeline value grouped by stage, for the funnel bar chart. */
const funnelOrder: DealStage[] = ['lead', 'qualified', 'proposal', 'negotiation']
const pipelineFunnel = funnelOrder.map((stage) => ({
  stage: dealStageMeta[stage].label,
  value: deals.filter((d) => d.stage === stage).reduce((sum, d) => sum + d.value, 0),
}))

/** Distinct reps that own deals, ranked by total won revenue. */
const repIds = [...new Set(deals.map((d) => d.ownerId))]
const leaderboard = repIds
  .map((id) => ({
    id,
    name: employee(id).name,
    won: deals.filter((d) => d.ownerId === id && d.stage === 'won').reduce((sum, d) => sum + d.value, 0),
  }))
  .sort((a, b) => b.won - a.won)
const maxWon = Math.max(...leaderboard.map((r) => r.won), 1)

/** Open deals, largest first, for the table. */
const openDealsByValue = [...openDeals].sort((a, b) => b.value - a.value)

/** Shared grid template so the header row and data rows line up. */
const dealCols = '2.2fr 1.3fr 1fr 1fr 0.8fr'

function SalesDashboardRender() {
  return (
    <CrmShell active="sales">
      <RudiStack space="1.5rem">
        <PageHeader
          title="Sales dashboard"
          subtitle="Meridian · Q3 FY26 · pipeline, win rate, and the deals closing this quarter"
          actions={
            <>
              <RudiButton variant="secondary" size="sm" iconBefore="lucide:calendar">
                This quarter
              </RudiButton>
              <RudiButton size="sm" iconBefore="lucide:plus">
                New deal
              </RudiButton>
            </>
          }
        />

        {/* KPI row */}
        <RudiGrid minCellWidth="13rem" space="1rem">
          <RudiStatCard label="Open pipeline" value={formatCompact(openPipeline)} delta={`${openDeals.length} open deals`} trend="up" />
          <RudiStatCard label="Win rate" value={`${winRate}%`} delta="+4 pts" trend="up" />
          <RudiStatCard label="Avg deal size" value={formatCompact(avgDealSize)} delta="+8.2%" trend="up" />
          <RudiStatCard label="Closing this quarter" value={openDeals.length} delta="on track" trend="neutral" />
        </RudiGrid>

        {/* Charts row */}
        <RudiGrid minCellWidth="22rem" space="1rem">
          <Panel style={{ gridColumn: 'span 2' }}>
            <RudiStack space="0.75rem">
              <SectionHeading title="Pipeline funnel" action="Pipeline" />
              <RudiBarChart
                data={pipelineFunnel}
                dataKeys={['value']}
                indexKey="stage"
                layout="horizontal"
                showLegend={false}
                height={260}
                label="Total deal value at each pipeline stage, from lead through negotiation"
              />
            </RudiStack>
          </Panel>
          <Panel>
            <RudiStack space="0.75rem">
              <SectionHeading title="MRR trend" />
              <RudiLineChart
                data={mrrTrend}
                dataKeys={['mrr']}
                indexKey="month"
                height={260}
                curved
                label="Monthly recurring revenue by month, in thousands of dollars"
              />
            </RudiStack>
          </Panel>
        </RudiGrid>

        {/* Leaderboard + open deals */}
        <RudiGrid minCellWidth="22rem" space="1rem">
          {/* Sales leaderboard */}
          <Panel>
            <RudiStack space="1rem">
              <SectionHeading title="Sales leaderboard" action="All reps" />
              <RudiStack space="1rem">
                {leaderboard.map((rep) => (
                  <RudiStack key={rep.id} space="0.5rem">
                    <RudiCluster justify="space-between" align="center" space="0.75rem">
                      <RudiCluster space="0.625rem" align="center" style={{ minInlineSize: 0 }}>
                        <AvatarFor id={rep.id} size="sm" />
                        <RudiText variant="body-sm" style={medium}>
                          {rep.name}
                        </RudiText>
                      </RudiCluster>
                      <RudiText variant="body-sm" style={semibold}>
                        {formatCurrency(rep.won)}
                      </RudiText>
                    </RudiCluster>
                    <div
                      aria-hidden="true"
                      style={{
                        blockSize: '0.5rem',
                        borderRadius: 'var(--rudi-radius-full)',
                        backgroundColor: 'var(--rudi-color-background-surface-sunken)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          blockSize: '100%',
                          inlineSize: `${(rep.won / maxWon) * 100}%`,
                          borderRadius: 'var(--rudi-radius-full)',
                          backgroundColor: 'var(--rudi-color-feedback-success)',
                        }}
                      />
                    </div>
                  </RudiStack>
                ))}
              </RudiStack>
            </RudiStack>
          </Panel>

          {/* Open deals table */}
          <Panel>
            <RudiStack space="1rem">
              <SectionHeading title="Open deals" action="All deals" />
              <div style={{ overflowX: 'auto' }}>
                <RudiStack space="0" style={{ minInlineSize: '40rem' }}>
                  {/* Header row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: dealCols,
                      gap: '0.75rem',
                      alignItems: 'center',
                      paddingBlock: '0.5rem',
                      borderBlockEnd: '1px solid var(--rudi-color-border-default)',
                    }}
                  >
                    <RudiText variant="overline">Deal</RudiText>
                    <RudiText variant="overline">Owner</RudiText>
                    <RudiText variant="overline">Stage</RudiText>
                    <div style={{ textAlign: 'end' }}>
                      <RudiText variant="overline">Value</RudiText>
                    </div>
                    <div style={{ textAlign: 'end' }}>
                      <RudiText variant="overline">Prob.</RudiText>
                    </div>
                  </div>
                  {/* Data rows */}
                  {openDealsByValue.map((d) => (
                    <div
                      key={d.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: dealCols,
                        gap: '0.75rem',
                        alignItems: 'center',
                        paddingBlock: '0.75rem',
                        borderBlockEnd: '1px solid var(--rudi-color-border-default)',
                      }}
                    >
                      <RudiText variant="body-sm" style={medium}>
                        {d.name}
                      </RudiText>
                      <RudiCluster space="0.5rem" align="center" style={{ minInlineSize: 0 }}>
                        <AvatarFor id={d.ownerId} size="sm" />
                        <RudiText variant="body-sm">{employee(d.ownerId).name.split(' ')[0]}</RudiText>
                      </RudiCluster>
                      <div>
                        <RudiBadge variant={dealStageMeta[d.stage].variant} size="sm">
                          {dealStageMeta[d.stage].label}
                        </RudiBadge>
                      </div>
                      <div style={{ textAlign: 'end' }}>
                        <RudiText variant="body-sm" style={semibold}>
                          {formatCurrency(d.value)}
                        </RudiText>
                      </div>
                      <div style={{ textAlign: 'end' }}>
                        <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                          {d.probability}%
                        </RudiText>
                      </div>
                    </div>
                  ))}
                </RudiStack>
              </div>
            </RudiStack>
          </Panel>
        </RudiGrid>
      </RudiStack>
    </CrmShell>
  )
}

const meta = {
  title: 'Examples/CRM/Sales Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A sales-pipeline command center for Meridian: open-pipeline, win-rate, average-deal-size, and closing-this-quarter KPIs, a pipeline funnel by stage, an MRR trend, a rep leaderboard by won revenue, and a sortable open-deals table — built entirely from Rudiment-UI primitives and themed with design tokens.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SalesDashboard: Story = {
  name: 'Sales Dashboard',
  render: () => <SalesDashboardRender />,
}
