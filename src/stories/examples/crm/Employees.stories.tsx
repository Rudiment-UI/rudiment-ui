import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RudiOption } from '../../../components/Select/Option'

import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiStatCard } from '../../../components/StatCard/StatCard'
import { RudiSelect } from '../../../components/Select/Select'

import {
  CrmShell,
  PageHeader,
  Panel,
  AvatarFor,
  StatusDot,
  employees,
  department,
  employeeStatusMeta,
} from './shared'

const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }

// --- KPI counts, all derived from the shared employee directory ------------
const totalEmployees = employees.length
const activeCount = employees.filter((e) => e.status === 'active').length
const remoteCount = employees.filter((e) => e.status === 'remote').length
const onLeaveCount = employees.filter((e) => e.status === 'on-leave').length

/** Department filter options — an "All" pseudo-option plus every real department. */
const ALL = 'all'
const deptOptions = [
  { id: ALL, label: 'All departments' },
  ...[...new Set(employees.map((e) => e.departmentId))].map((id) => ({
    id,
    label: department(id).name,
  })),
]

function EmployeesRender() {
  const [dept, setDept] = useState<string>(ALL)

  const filtered = dept === ALL ? employees : employees.filter((e) => e.departmentId === dept)

  return (
    <CrmShell active="employees">
      <RudiStack space="1.5rem">
        <PageHeader
          title="Employees"
          subtitle="Directory · Meridian · the people behind the numbers"
          actions={
            <>
              <RudiButton variant="secondary" size="sm" iconBefore="lucide:download">
                Export
              </RudiButton>
              <RudiButton size="sm" iconBefore="lucide:user-plus">
                Invite
              </RudiButton>
            </>
          }
        />

        {/* KPI row */}
        <RudiGrid minCellWidth="13rem" space="1rem">
          <RudiStatCard label="Total employees" value={totalEmployees} delta="Across 6 teams" trend="neutral" />
          <RudiStatCard label="Active" value={activeCount} delta="In office" trend="up" />
          <RudiStatCard label="Remote" value={remoteCount} delta="Distributed" trend="neutral" />
          <RudiStatCard label="On leave" value={onLeaveCount} delta="Temporarily away" trend="neutral" />
        </RudiGrid>

        {/* Filter bar */}
        <Panel>
          <RudiCluster justify="space-between" align="flex-end" space="1rem">
            <div style={{ minInlineSize: '13rem' }}>
              <RudiSelect
                label="Department"
                items={deptOptions}
                selectedKey={dept}
                onSelectionChange={(key) => setDept(key ? String(key) : ALL)}
              >
                {(item) => <RudiOption key={item.id}>{item.label}</RudiOption>}
              </RudiSelect>
            </div>
            <RudiText variant="caption">
              Showing {filtered.length} of {totalEmployees} people
            </RudiText>
          </RudiCluster>
        </Panel>

        {/* Directory */}
        {filtered.length === 0 ? (
          <Panel>
            <RudiText variant="body-sm">No employees match this department.</RudiText>
          </Panel>
        ) : (
          <RudiGrid minCellWidth="18rem" space="1rem">
            {filtered.map((e) => {
              const statusMeta = employeeStatusMeta[e.status]
              const dep = department(e.departmentId)
              return (
                <Panel key={e.id}>
                  <RudiStack space="1rem">
                    <RudiCluster justify="space-between" align="flex-start" space="0.75rem">
                      <RudiCluster space="0.75rem" align="center" style={{ minInlineSize: 0 }}>
                        <AvatarFor id={e.id} size="md" />
                        <RudiStack space="0" style={{ minInlineSize: 0 }}>
                          <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                            {e.name}
                          </RudiHeading>
                          <RudiText variant="caption">{e.role}</RudiText>
                        </RudiStack>
                      </RudiCluster>
                      <RudiBadge variant={statusMeta.variant} size="sm">
                        {statusMeta.label}
                      </RudiBadge>
                    </RudiCluster>

                    <RudiStack space="0.5rem">
                      <RudiCluster space="0.5rem" align="center">
                        <StatusDot color={dep.color} />
                        <RudiText variant="body-sm" style={medium}>
                          {dep.name}
                        </RudiText>
                      </RudiCluster>
                      <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                        {e.email}
                      </RudiText>
                      <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                        {e.location}
                      </RudiText>
                    </RudiStack>
                  </RudiStack>
                </Panel>
              )
            })}
          </RudiGrid>
        )}
      </RudiStack>
    </CrmShell>
  )
}

const meta = {
  title: 'Examples/CRM/Employees',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          "Meridian's employee directory: headcount KPIs by status and an interactive department filter that drives a responsive grid of people cards — each with avatar, role, status badge, department accent, and contact details, built entirely from Rudiment-UI primitives and themed with design tokens.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Employees: Story = {
  name: 'Employees',
  render: () => <EmployeesRender />,
}
