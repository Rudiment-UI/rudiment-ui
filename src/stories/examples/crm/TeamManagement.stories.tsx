import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiText } from '../../../typography/Text/Text'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiStatCard } from '../../../components/StatCard/StatCard'
import { RudiProgressBar } from '../../../components/ProgressBar/ProgressBar'
import { RudiBarChart } from '../../../components/Charts/BarChart/BarChart'
import { RudiBadge } from '../../../components/Badge/Badge'

import {
  CrmShell,
  PageHeader,
  Panel,
  SectionHeading,
  AvatarFor,
  StatusDot,
  departments,
  employee,
  formatCompact,
  type Department,
} from './shared'

const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }
const semibold = { fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'] }

// --- Derived org metrics, all from the shared data model -------------------
const totalHeadcount = departments.reduce((sum, d) => sum + d.headcount, 0)
const totalOpenRoles = departments.reduce((sum, d) => sum + d.openRoles, 0)
const totalBudget = departments.reduce((sum, d) => sum + d.budget, 0)

/** Headcount per department, for the bar chart. */
const headcountByDepartment = departments.map((d) => ({ name: d.name, headcount: d.headcount }))

/** Departments still hiring, most open roles first. */
const hiring = departments
  .filter((d) => d.openRoles > 0)
  .sort((a, b) => b.openRoles - a.openRoles)

function budgetPercent(d: Department): number {
  return Math.round((d.budgetSpent / d.budget) * 100)
}

function budgetVariant(pct: number): 'success' | 'warning' | 'error' {
  if (pct > 95) return 'error'
  if (pct > 85) return 'warning'
  return 'success'
}

function DepartmentCard({ d }: { d: Department }) {
  const head = employee(d.headId)
  const pct = budgetPercent(d)

  return (
    <Panel>
      <RudiStack space="1rem">
        {/* Department name + accent icon */}
        <RudiCluster justify="space-between" align="center" space="0.75rem">
          <RudiCluster space="0.5rem" align="center" style={{ minInlineSize: 0 }}>
            <StatusDot color={d.color} />
            <RudiHeading level={3} size={5} style={{ margin: 0 }}>
              {d.name}
            </RudiHeading>
          </RudiCluster>
          <RudiIcon icon={d.icon} size="sm" color={d.color} />
        </RudiCluster>

        {/* Department head */}
        <RudiCluster space="0.625rem" align="center">
          <AvatarFor id={d.headId} size="sm" />
          <RudiStack space="0" style={{ minInlineSize: 0 }}>
            <RudiText variant="body-sm" style={medium}>
              {head.name}
            </RudiText>
            <RudiText variant="caption">Lead</RudiText>
          </RudiStack>
        </RudiCluster>

        {/* Small stats row */}
        <RudiCluster justify="space-between" align="center" space="0.75rem">
          <RudiStack space="0.125rem">
            <RudiText variant="caption">Headcount</RudiText>
            <RudiText variant="body-sm" style={semibold}>
              {d.headcount}
            </RudiText>
          </RudiStack>
          <RudiStack space="0.125rem" style={{ alignItems: 'flex-end' }}>
            <RudiText variant="caption">Open roles</RudiText>
            {d.openRoles > 0 ? (
              <RudiBadge variant="info" size="sm">
                {d.openRoles} open
              </RudiBadge>
            ) : (
              <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                None
              </RudiText>
            )}
          </RudiStack>
        </RudiCluster>

        {/* Budget usage */}
        <RudiStack space="0.375rem">
          <RudiProgressBar
            label={`${d.name} budget spent`}
            value={pct}
            showValueLabel
            variant={budgetVariant(pct)}
          />
          <RudiText variant="caption">
            {formatCompact(d.budgetSpent)} / {formatCompact(d.budget)} monthly budget
          </RudiText>
        </RudiStack>
      </RudiStack>
    </Panel>
  )
}

function TeamManagementRender() {
  return (
    <CrmShell active="team">
      <RudiStack space="1.5rem">
        <PageHeader
          title="Team management"
          subtitle={`${departments.length} departments · Meridian`}
          actions={
            <>
              <RudiButton variant="secondary" size="sm" iconBefore="lucide:network">
                Org chart
              </RudiButton>
              <RudiButton size="sm" iconBefore="lucide:plus">
                Add department
              </RudiButton>
            </>
          }
        />

        {/* KPI row */}
        <RudiGrid minCellWidth="13rem" space="1rem">
          <RudiStatCard label="Total headcount" value={totalHeadcount} delta="+4 this quarter" trend="up" />
          <RudiStatCard label="Open roles" value={totalOpenRoles} delta="Actively hiring" trend="up" />
          <RudiStatCard label="Departments" value={departments.length} delta="Across Meridian" trend="neutral" />
          <RudiStatCard label="Monthly budget" value={formatCompact(totalBudget)} delta="Payroll + opex" trend="neutral" />
        </RudiGrid>

        {/* Headcount by department */}
        <Panel>
          <RudiStack space="0.75rem">
            <SectionHeading title="Headcount by department" />
            <RudiBarChart
              data={headcountByDepartment}
              dataKeys={['headcount']}
              indexKey="name"
              height={260}
              showGrid
              label="Number of employees in each department at Meridian"
            />
          </RudiStack>
        </Panel>

        {/* Departments */}
        <RudiStack space="1rem">
          <SectionHeading title="Departments" />
          <RudiGrid minCellWidth="18rem" space="1rem">
            {departments.map((d) => (
              <DepartmentCard key={d.id} d={d} />
            ))}
          </RudiGrid>
        </RudiStack>

        {/* Hiring pipeline */}
        <Panel>
          <RudiStack space="1rem">
            <SectionHeading title="Hiring pipeline" />
            <RudiStack space="0.75rem">
              {hiring.map((d) => (
                <RudiCluster key={d.id} justify="space-between" align="center" space="0.75rem">
                  <RudiCluster space="0.5rem" align="center" style={{ minInlineSize: 0 }}>
                    <StatusDot color={d.color} />
                    <RudiText variant="body-sm" style={medium}>
                      {d.name}
                    </RudiText>
                  </RudiCluster>
                  <RudiBadge variant="info" size="sm">
                    {d.openRoles} open {d.openRoles === 1 ? 'role' : 'roles'}
                  </RudiBadge>
                </RudiCluster>
              ))}
            </RudiStack>
            <RudiCluster space="0.375rem" align="center">
              <RudiIcon icon="lucide:info" size="sm" color="var(--rudi-color-text-subtle)" />
              <RudiText variant="caption">
                {totalOpenRoles} open roles across {hiring.length} departments.
              </RudiText>
            </RudiCluster>
          </RudiStack>
        </Panel>
      </RudiStack>
    </CrmShell>
  )
}

const meta = {
  title: 'Examples/CRM/Team Management',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          "Meridian's org overview: headcount, open roles, department count, and monthly budget KPIs, a headcount-by-department chart, per-department cards with their lead, budget burn, and open reqs, plus a hiring pipeline — a mobile-friendly shell built entirely from Rudiment-UI primitives and themed with design tokens.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TeamManagement: Story = {
  name: 'Team Management',
  render: () => <TeamManagementRender />,
}
