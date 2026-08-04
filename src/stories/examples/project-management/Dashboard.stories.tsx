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
import { RudiProgressBar } from '../../../components/ProgressBar/ProgressBar'
import { RudiLineChart } from '../../../components/Charts/LineChart/LineChart'
import { RudiDonutChart } from '../../../components/Charts/DonutChart/DonutChart'
import { RudiAlert } from '../../../components/Alert/Alert'

import {
  PmShell,
  PageHeader,
  Panel,
  AssigneeAvatar,
  EpicDot,
  IssueKey,
  sprint,
  burndown,
  epics,
  epicPct,
  epicStatusMeta,
  member,
  activity,
  team,
  stories,
  statusMeta,
  type StoryStatus,
} from './shared'

const semibold = { fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'] }
const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }

const statusOrder: StoryStatus[] = ['todo', 'in-progress', 'review', 'done']

const statusBreakdown = statusOrder.map((status) => ({
  name: statusMeta[status].label,
  value: stories.filter((s) => s.status === status).length,
}))

/** Points assigned to each member across active (non-done) work. */
const workload = team
  .map((m) => ({
    member: m,
    points: stories
      .filter((s) => s.assigneeId === m.id && s.status !== 'done' && s.status !== 'backlog')
      .reduce((sum, s) => sum + s.points, 0),
  }))
  .filter((w) => w.points > 0)
  .sort((a, b) => b.points - a.points)

const maxWorkload = Math.max(...workload.map((w) => w.points), 1)

function SectionHeading({ title, action }: { title: string; action?: string }) {
  return (
    <RudiCluster justify="space-between" align="center">
      <RudiHeading level={2} size={5} style={{ margin: 0 }}>
        {title}
      </RudiHeading>
      {action && (
        <RudiButton variant="ghost" size="sm" iconAfter="lucide:arrow-right">
          {action}
        </RudiButton>
      )}
    </RudiCluster>
  )
}


const meta = {
  title: 'Examples/Project Management/Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A sprint command-center for the Beacon project: sprint KPIs, a burndown chart, work-by-status breakdown, epic progress, a live activity feed, and team workload — all built from Rudiment-UI primitives and themed entirely with design tokens.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Dashboard: Story = {
  name: 'Dashboard',
  render: () => {
    const completionPct = Math.round((sprint.completedPoints / sprint.committedPoints) * 100)
    const remaining = sprint.committedPoints - sprint.completedPoints
    const activeEpics = [...epics].sort((a, b) => epicPct(b) - epicPct(a)).slice(0, 4)

    return (
      <PmShell active="dashboard">
        <RudiStack space="1.5rem">
          <PageHeader
            title="Sprint dashboard"
            subtitle={`${sprint.name} · ${sprint.goal}`}
            actions={
              <>
                <RudiButton variant="secondary" size="sm" iconBefore="lucide:calendar">
                  Sprint 24
                </RudiButton>
                <RudiButton size="sm" iconBefore="lucide:plus">
                  New issue
                </RudiButton>
              </>
            }
          />

          {/* KPI row */}
          <RudiGrid minCellWidth="13rem" space="1rem">
            <RudiStatCard label="Committed" value={`${sprint.committedPoints} pts`} delta="Sprint 24" trend="neutral" />
            <RudiStatCard label="Completed" value={`${sprint.completedPoints} pts`} delta={`${completionPct}%`} trend="up" />
            <RudiStatCard label="Remaining" value={`${remaining} pts`} delta="3 days left" trend="down" />
            <RudiStatCard label="Velocity (avg)" value="57 pts" delta="+6%" trend="up" />
          </RudiGrid>

          {statusBreakdown && (
            <RudiAlert variant="warning" icon="lucide:triangle-alert" title="Billing epic is trending behind.">
              BEA-2 (Usage-based billing) has burned 21 of 68 points with two sprints to target. Consider pulling
              BEA-405 out of scope.
            </RudiAlert>
          )}

          {/* Charts row */}
          <RudiGrid minCellWidth="22rem" space="1rem">
            <Panel style={{ gridColumn: 'span 2' }}>
              <RudiStack space="0.75rem">
                <SectionHeading title="Sprint burndown" action="Open report" />
                <RudiLineChart
                  data={burndown}
                  dataKeys={['ideal', 'remaining']}
                  indexKey="day"
                  height={260}
                  showLegend
                  label="Ideal versus actual remaining story points across the sprint"
                />
              </RudiStack>
            </Panel>
            <Panel>
              <RudiStack space="0.75rem">
                <SectionHeading title="Work by status" />
                <RudiDonutChart
                  data={statusBreakdown}
                  height={260}
                  showLegend
                  label="Breakdown of stories by their current status"
                />
              </RudiStack>
            </Panel>
          </RudiGrid>

          {/* Progress + activity + workload */}
          <RudiGrid minCellWidth="20rem" space="1rem">
            {/* Epic progress */}
            <Panel>
              <RudiStack space="1rem">
                <SectionHeading title="Epic progress" action="All epics" />
                <RudiStack space="1rem">
                  {activeEpics.map((e) => {
                    const status = epicStatusMeta[e.status]
                    return (
                      <RudiStack key={e.id} space="0.375rem">
                        <RudiCluster justify="space-between" align="center" space="0.5rem">
                          <RudiCluster space="0.5rem" align="center" style={{ minInlineSize: 0 }}>
                            <EpicDot color={e.color} />
                            <RudiText variant="body-sm" style={medium}>
                              {e.title}
                            </RudiText>
                          </RudiCluster>
                          <RudiText variant="caption" style={{ color: `var(--rudi-color-feedback-${status.variant === 'default' ? 'info' : status.variant})` }}>
                            {status.label}
                          </RudiText>
                        </RudiCluster>
                        <RudiProgressBar
                          label={`${e.title} progress`}
                          value={epicPct(e)}
                          size="sm"
                          variant={e.status === 'off-track' ? 'error' : e.status === 'at-risk' ? 'warning' : 'success'}
                        />
                        <RudiText variant="caption">
                          {e.donePoints} / {e.totalPoints} pts · {e.targetSprint}
                        </RudiText>
                      </RudiStack>
                    )
                  })}
                </RudiStack>
              </RudiStack>
            </Panel>

            {/* Activity feed */}
            <Panel>
              <RudiStack space="1rem">
                <SectionHeading title="Recent activity" />
                <RudiStack space="0.875rem">
                  {activity.map((a) => (
                    <RudiCluster key={a.id} space="0.75rem" align="center">
                      <AssigneeAvatar id={a.actorId} size="sm" />
                      <RudiStack space="0" style={{ minInlineSize: 0 }}>
                        <RudiText variant="body-sm">
                          <span style={medium}>{member(a.actorId).name.split(' ')[0]}</span> {a.action}{' '}
                          <IssueKey>{a.target}</IssueKey>
                        </RudiText>
                        <RudiText variant="caption">{a.when}</RudiText>
                      </RudiStack>
                    </RudiCluster>
                  ))}
                </RudiStack>
              </RudiStack>
            </Panel>

            {/* Team workload */}
            <Panel>
              <RudiStack space="1rem">
                <SectionHeading title="Team workload" />
                <RudiStack space="0.875rem">
                  {workload.map((w) => (
                    <RudiCluster key={w.member.id} space="0.5rem" align="center">
                      <AssigneeAvatar id={w.member.id} size="sm" />
                      <div style={{ flex: 1, minInlineSize: 0 }}>
                        {/* Threshold fill: warning once a member reaches 16 pts. */}
                        <RudiProgressBar
                          label={w.member.name.split(' ')[0]}
                          value={w.points}
                          maxValue={maxWorkload}
                          showValueLabel
                          size="sm"
                          thresholds={[
                            { at: (16 / maxWorkload) * 100, variant: 'warning' },
                          ]}
                        />
                      </div>
                    </RudiCluster>
                  ))}
                </RudiStack>
                <RudiCluster space="0.375rem" align="center">
                  <RudiIcon icon="lucide:info" size="sm" color="var(--rudi-color-text-subtle)" />
                  <RudiText variant="caption">Points in progress or awaiting review.</RudiText>
                </RudiCluster>
              </RudiStack>
            </Panel>
          </RudiGrid>
        </RudiStack>
      </PmShell>
    )
  },
}
