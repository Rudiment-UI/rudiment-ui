import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiStatCard } from '../../../components/StatCard/StatCard'
import { RudiProgressBar } from '../../../components/ProgressBar/ProgressBar'
import { RudiDonutChart } from '../../../components/Charts/DonutChart/DonutChart'

import {
  CrmShell,
  PageHeader,
  Panel,
  SectionHeading,
  AvatarFor,
  HealthBadge,
  customers,
  employee,
  healthMeta,
  segmentMeta,
  formatCurrency,
  formatCompact,
  type Health,
  type Segment,
} from './shared'

const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }
const semibold = { fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'] }

// --- Derived account metrics, all from the shared data model ----------------
const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0)
const atRiskCount = customers.filter((c) => c.health === 'at-risk' || c.health === 'churning').length

const segmentOrder: Segment[] = ['enterprise', 'mid-market', 'smb']
const healthOrder: Health[] = ['healthy', 'at-risk', 'churning']

/** Customer counts grouped by segment, for the donut. */
const bySegment = segmentOrder.map((segment) => ({
  name: segmentMeta[segment].label,
  value: customers.filter((c) => c.segment === segment).length,
}))

/** Customer counts grouped by health, for the proportional bars. */
const byHealth = healthOrder.map((health) => ({
  health,
  count: customers.filter((c) => c.health === health).length,
}))

/** RudiProgressBar/feedback variant that matches each health state. */
const healthVariant: Record<Health, 'success' | 'warning' | 'error'> = {
  healthy: 'success',
  'at-risk': 'warning',
  churning: 'error',
}

// --- Clickable health filter -----------------------------------------------
type Filter = 'all' | Health
const filterChips: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'healthy', label: 'Healthy' },
  { key: 'at-risk', label: 'At risk' },
  { key: 'churning', label: 'Churning' },
]

// Shared column template so header and every data row stay aligned.
const rowGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(11rem, 2fr) 8rem 8rem 5rem 7rem 6rem',
  alignItems: 'center',
  gap: '0.75rem',
}

const meta = {
  title: 'Examples/CRM/Customers',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The Meridian accounts list: MRR and health KPIs, customer counts by segment and by health, and an interactive, sortable accounts table with clickable health filters — a mobile-friendly, horizontally scrolling view built entirely from Rudiment-UI primitives and themed with design tokens.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Customers: Story = {
  name: 'Customers',
  render: () => {
    const [filter, setFilter] = useState<Filter>('all')

    const rows = customers
      .filter((c) => filter === 'all' || c.health === filter)
      .sort((a, b) => b.mrr - a.mrr)

    return (
      <CrmShell active="customers">
        <RudiStack space="1.5rem">
          <PageHeader
            title="Customers"
            subtitle="Accounts · Meridian · the book of business by segment and health"
            actions={
              <>
                <RudiButton variant="secondary" size="sm" iconBefore="lucide:download">
                  Export
                </RudiButton>
                <RudiButton size="sm" iconBefore="lucide:plus">
                  Add customer
                </RudiButton>
              </>
            }
          />

          {/* KPI row */}
          <RudiGrid minCellWidth="13rem" space="1rem">
            <RudiStatCard label="Customers" value={customers.length} delta="+2 this quarter" trend="up" />
            <RudiStatCard label="Total MRR" value={formatCompact(totalMrr)} delta="+6.5%" trend="up" />
            <RudiStatCard label="At-risk accounts" value={atRiskCount} delta="needs attention" trend="down" />
            <RudiStatCard label="Net revenue retention" value="112%" delta="+4 pts" trend="up" />
          </RudiGrid>

          {/* Charts / summary row */}
          <RudiGrid minCellWidth="20rem" space="1rem">
            <Panel>
              <RudiStack space="0.75rem">
                <SectionHeading title="By segment" />
                <RudiDonutChart
                  data={bySegment}
                  height={240}
                  showLegend
                  label="Number of customer accounts broken down by segment"
                />
              </RudiStack>
            </Panel>
            <Panel>
              <RudiStack space="1rem">
                <SectionHeading title="Health" />
                <RudiStack space="0.875rem">
                  {byHealth.map(({ health, count }) => (
                    <RudiStack key={health} space="0.375rem">
                      <RudiCluster justify="space-between" align="center">
                        <RudiText variant="body-sm" style={medium}>
                          {healthMeta[health].label}
                        </RudiText>
                        <RudiText variant="body-sm" style={semibold}>
                          {count}
                        </RudiText>
                      </RudiCluster>
                      <RudiProgressBar
                        label={`${healthMeta[health].label} accounts`}
                        value={count}
                        maxValue={customers.length}
                        variant={healthVariant[health]}
                        size="sm"
                      />
                    </RudiStack>
                  ))}
                </RudiStack>
              </RudiStack>
            </Panel>
          </RudiGrid>

          {/* Accounts table */}
          <Panel>
            <RudiStack space="1rem">
              <RudiCluster justify="space-between" align="center" space="0.75rem">
                <SectionHeading title="Accounts" />
                <RudiText variant="caption">
                  {rows.length} of {customers.length} accounts
                </RudiText>
              </RudiCluster>

              {/* Filter chips */}
              <RudiCluster space="0.5rem" align="center">
                {filterChips.map((chip) => (
                  <RudiButton
                    key={chip.key}
                    size="sm"
                    variant={filter === chip.key ? 'primary' : 'ghost'}
                    onPress={() => setFilter(chip.key)}
                  >
                    {chip.label}
                  </RudiButton>
                ))}
              </RudiCluster>

              {/* Horizontal-scroll table */}
              <div style={{ overflowX: 'auto' }}>
                <div style={{ minInlineSize: '44rem' }}>
                  <RudiStack space="0">
                    {/* Header row */}
                    <div style={{ ...rowGrid, paddingBlockEnd: '0.625rem' }}>
                      <RudiText variant="overline">Account</RudiText>
                      <RudiText variant="overline">Segment</RudiText>
                      <RudiText variant="overline">Owner</RudiText>
                      <RudiText variant="overline">Seats</RudiText>
                      <RudiText variant="overline">MRR</RudiText>
                      <RudiText variant="overline">Health</RudiText>
                    </div>

                    {/* Data rows */}
                    {rows.map((c) => (
                      <div
                        key={c.id}
                        style={{
                          ...rowGrid,
                          paddingBlock: '0.75rem',
                          borderBlockStart: '1px solid var(--rudi-color-border-default)',
                        }}
                      >
                        <RudiStack space="0" style={{ minInlineSize: 0 }}>
                          <RudiText variant="body-sm" style={medium}>
                            {c.name}
                          </RudiText>
                          <RudiText variant="caption">{c.industry}</RudiText>
                        </RudiStack>
                        <div>
                          <RudiBadge variant={segmentMeta[c.segment].variant} size="sm">
                            {segmentMeta[c.segment].label}
                          </RudiBadge>
                        </div>
                        <RudiCluster space="0.5rem" align="center" style={{ minInlineSize: 0 }}>
                          <AvatarFor id={c.ownerId} size="sm" />
                          <RudiText variant="body-sm">{employee(c.ownerId).name.split(' ')[0]}</RudiText>
                        </RudiCluster>
                        <RudiText variant="body-sm">{c.seats}</RudiText>
                        <RudiText variant="body-sm" style={semibold}>
                          {formatCurrency(c.mrr)}
                        </RudiText>
                        <div>
                          <HealthBadge health={c.health} />
                        </div>
                      </div>
                    ))}
                  </RudiStack>
                </div>
              </div>
            </RudiStack>
          </Panel>
        </RudiStack>
      </CrmShell>
    )
  },
}
