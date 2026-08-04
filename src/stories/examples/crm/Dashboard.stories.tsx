import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiStatCard } from '../../../components/StatCard/StatCard'
import { RudiLineChart } from '../../../components/Charts/LineChart/LineChart'
import { RudiDonutChart } from '../../../components/Charts/DonutChart/DonutChart'
import { RudiAlert } from '../../../components/Alert/Alert'

import {
  CrmShell,
  PageHeader,
  Panel,
  SectionHeading,
  AvatarFor,
  StatusDot,
  HealthBadge,
  activity,
  customers,
  deals,
  openDeals,
  employees,
  employee,
  revenueTrend,
  dealStageMeta,
  formatCompact,
  formatCurrency,
  type DealStage,
} from './shared'

const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }
const semibold = { fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'] }

// --- Derived company metrics, all from the shared data model ---------------
const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0)
const activeCustomers = customers.length
const openPipeline = openDeals.reduce((sum, d) => sum + d.value, 0)
const headcount = employees.length

/** Pipeline value grouped by stage, for the donut. */
const pipelineOrder: DealStage[] = ['lead', 'qualified', 'proposal', 'negotiation']
const pipelineByStage = pipelineOrder.map((stage) => ({
  name: dealStageMeta[stage].label,
  value: deals.filter((d) => d.stage === stage).reduce((sum, d) => sum + d.value, 0),
}))

/** Highest-MRR accounts for the snapshot list. */
const topCustomers = [...customers].sort((a, b) => b.mrr - a.mrr).slice(0, 5)

const meta = {
  title: 'Examples/CRM/Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The company command-center for Meridian: revenue, recurring revenue, pipeline, and headcount KPIs, a revenue-vs-expenses trend, open pipeline by stage, a live activity feed, and the top accounts by MRR — a mobile-friendly shell built entirely from Rudiment-UI primitives and themed with design tokens.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Dashboard: Story = {
  name: 'Dashboard',
  render: () => (
    <CrmShell active="dashboard">
      <RudiStack space="1.5rem">
        <PageHeader
          title="Company dashboard"
          subtitle="Meridian · Q3 FY26 · a single view of revenue, pipeline, and people"
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
          <RudiStatCard label="Monthly recurring revenue" value={formatCompact(totalMrr)} delta="+6.5%" trend="up" />
          <RudiStatCard label="Active customers" value={activeCustomers} delta="+2 this quarter" trend="up" />
          <RudiStatCard label="Open pipeline" value={formatCompact(openPipeline)} delta={`${openDeals.length} deals`} trend="neutral" />
          <RudiStatCard label="Headcount" value={headcount} delta="12 open roles" trend="up" />
        </RudiGrid>

        <RudiAlert variant="warning" icon="lucide:triangle-alert" title="Two enterprise accounts need attention.">
          Contoso Retail is flagged at-risk with a renewal in 60 days, and Proseware is trending toward churn. Customer
          Success has both on this week's save plan.
        </RudiAlert>

        {/* Charts row */}
        <RudiGrid minCellWidth="22rem" space="1rem">
          <Panel style={{ gridColumn: 'span 2' }}>
            <RudiStack space="0.75rem">
              <SectionHeading title="Revenue vs. expenses" action="Finance" />
              <RudiLineChart
                data={revenueTrend}
                dataKeys={['revenue', 'expenses']}
                indexKey="month"
                height={260}
                showLegend
                curved
                label="Monthly company revenue against operating expenses, in thousands of dollars"
              />
            </RudiStack>
          </Panel>
          <Panel>
            <RudiStack space="0.75rem">
              <SectionHeading title="Open pipeline by stage" />
              <RudiDonutChart
                data={pipelineByStage}
                height={260}
                showLegend
                label="Value of open deals broken down by pipeline stage"
              />
            </RudiStack>
          </Panel>
        </RudiGrid>

        {/* Activity + top customers */}
        <RudiGrid minCellWidth="22rem" space="1rem">
          {/* Activity feed */}
          <Panel>
            <RudiStack space="1rem">
              <SectionHeading title="Recent activity" />
              <RudiStack space="0.875rem">
                {activity.map((a) => (
                  <RudiCluster key={a.id} space="0.75rem" align="center">
                    <AvatarFor id={a.actorId} size="sm" />
                    <RudiStack space="0" style={{ minInlineSize: 0 }}>
                      <RudiText variant="body-sm">
                        <span style={medium}>{employee(a.actorId).name.split(' ')[0]}</span> {a.action}{' '}
                        <span style={medium}>{a.target}</span>
                      </RudiText>
                      <RudiText variant="caption">{a.when}</RudiText>
                    </RudiStack>
                  </RudiCluster>
                ))}
              </RudiStack>
            </RudiStack>
          </Panel>

          {/* Top customers */}
          <Panel>
            <RudiStack space="1rem">
              <SectionHeading title="Top customers" action="All accounts" />
              <RudiStack space="0.875rem">
                {topCustomers.map((c) => (
                  <RudiCluster key={c.id} justify="space-between" align="center" space="0.75rem">
                    <RudiCluster space="0.75rem" align="center" style={{ minInlineSize: 0 }}>
                      <StatusDot color={dealStageMeta.negotiation.color} />
                      <RudiStack space="0" style={{ minInlineSize: 0 }}>
                        <RudiText variant="body-sm" style={medium}>
                          {c.name}
                        </RudiText>
                        <RudiText variant="caption">
                          {c.industry} · {employee(c.ownerId).name.split(' ')[0]}
                        </RudiText>
                      </RudiStack>
                    </RudiCluster>
                    <RudiCluster space="0.625rem" align="center">
                      <RudiText variant="body-sm" style={semibold}>
                        {formatCurrency(c.mrr)}
                      </RudiText>
                      <HealthBadge health={c.health} />
                    </RudiCluster>
                  </RudiCluster>
                ))}
              </RudiStack>
              <RudiCluster space="0.375rem" align="center">
                <RudiIcon icon="lucide:info" size="sm" color="var(--rudi-color-text-subtle)" />
                <RudiText variant="caption">
                  {formatCompact(topCustomers.reduce((s, c) => s + c.mrr, 0))} MRR from the top five accounts.
                </RudiText>
              </RudiCluster>
            </RudiStack>
          </Panel>
        </RudiGrid>
      </RudiStack>
    </CrmShell>
  ),
}
