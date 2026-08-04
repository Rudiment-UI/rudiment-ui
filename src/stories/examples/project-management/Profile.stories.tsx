import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiSidebar } from '../../../layouts/Sidebar/Sidebar'
import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiTag } from '../../../components/Tag/Tag'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiAvatar } from '../../../components/Avatar/Avatar'
import { RudiStatCard } from '../../../components/StatCard/StatCard'
import { RudiSwitch } from '../../../components/Switch/Switch'
import { RudiProgressBar } from '../../../components/ProgressBar/ProgressBar'
import { RudiDonutChart } from '../../../components/Charts/DonutChart/DonutChart'

import {
  PmShell,
  PageHeader,
  Panel,
  IssueKey,
  TypeIcon,
  PriorityBadge,
  Points,
  EpicDot,
  currentUser,
  epic,
  stories,
  statusMeta,
} from './shared'

const semibold = { fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'] }
const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }

const mine = stories.filter((s) => s.assigneeId === currentUser.id)
const myActive = mine.filter((s) => s.status !== 'done' && s.status !== 'backlog')
const myDone = mine.filter((s) => s.status === 'done')
const myPoints = myActive.reduce((s, i) => s + i.points, 0)

const skills = [
  'Distributed systems',
  'TypeScript',
  'Go',
  'Postgres',
  'Billing',
  'Websockets',
  'Observability',
  'Mentoring',
]

// Where this person's effort has gone this quarter, by area.
const focusMix = [
  { name: 'Billing', value: 34 },
  { name: 'Reliability', value: 28 },
  { name: 'Realtime', value: 22 },
  { name: 'Reviews', value: 16 },
]

function InfoLine({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <RudiCluster space="0.5rem" align="center">
      <RudiIcon icon={icon} size="sm" color="var(--rudi-color-text-subtle)" />
      <RudiText variant="body-sm">{children}</RudiText>
    </RudiCluster>
  )
}

function SettingRow({ title, description, defaultOn }: { title: string; description: string; defaultOn?: boolean }) {
  return (
    <RudiCluster
      justify="space-between"
      align="center"
      space="1rem"
      style={{ paddingBlock: '0.75rem', borderBlockEnd: '1px solid var(--rudi-color-border-default)' }}
    >
      <RudiStack space="0.125rem" style={{ minInlineSize: 0 }}>
        <RudiText variant="body-sm" style={medium}>
          {title}
        </RudiText>
        <RudiText variant="caption">{description}</RudiText>
      </RudiStack>
      <RudiSwitch defaultSelected={defaultOn} aria-label={title}>
        {''}
      </RudiSwitch>
    </RudiCluster>
  )
}

function ProfileRender() {
  return (
    <PmShell active="profile">
      <RudiStack space="1.5rem">
        <PageHeader
          title="Profile"
          actions={
            <>
              <RudiButton variant="secondary" size="sm" iconBefore="lucide:mail">
                Message
              </RudiButton>
              <RudiButton size="sm" iconBefore="lucide:pencil">
                Edit profile
              </RudiButton>
            </>
          }
        />

        {/* Identity banner */}
        <Panel>
          <RudiCluster space="1.25rem" align="center" justify="space-between">
            <RudiCluster space="1.25rem" align="center">
              <RudiAvatar name={currentUser.name} size="lg" status="success" />
              <RudiStack space="0.375rem">
                <RudiCluster space="0.625rem" align="center">
                  <RudiHeading level={1} size={3} style={{ margin: 0 }}>
                    {currentUser.name}
                  </RudiHeading>
                  <RudiBadge variant="info">{currentUser.role}</RudiBadge>
                </RudiCluster>
                <RudiCluster space="1rem" align="center">
                  <InfoLine icon="lucide:at-sign">avery@beacon.dev</InfoLine>
                  <InfoLine icon="lucide:map-pin">Berlin · CET</InfoLine>
                  <InfoLine icon="lucide:calendar-days">Joined Mar 2023</InfoLine>
                </RudiCluster>
              </RudiStack>
            </RudiCluster>
            <RudiCluster space="0.375rem" align="center">
              <RudiIcon icon="lucide:flame" size="sm" color="var(--rudi-color-feedback-warning)" />
              <RudiText variant="caption" style={semibold}>
                18-day streak
              </RudiText>
            </RudiCluster>
          </RudiCluster>
        </Panel>

        {/* Personal KPIs */}
        <RudiGrid minCellWidth="13rem" space="1rem">
          <RudiStatCard label="Assigned this sprint" value={myActive.length} delta={`${myPoints} pts`} trend="neutral" />
          <RudiStatCard label="Completed this sprint" value={myDone.length} delta="+2 vs last" trend="up" />
          <RudiStatCard label="Avg. cycle time" value="2.4 days" delta="-0.3d" trend="up" />
          <RudiStatCard label="Review turnaround" value="4h" delta="fastest on team" trend="up" />
        </RudiGrid>

        <RudiSidebar side="right" sideWidth="20rem" space="1.5rem" contentMin="55%">
          {/* Left: current work + focus */}
          <RudiStack space="1.25rem">
            <Panel>
              <RudiStack space="1rem">
                <RudiCluster justify="space-between" align="center">
                  <RudiHeading level={2} size={5} style={{ margin: 0 }}>
                    Current work
                  </RudiHeading>
                  <RudiText variant="caption">{myActive.length} in flight</RudiText>
                </RudiCluster>
                <RudiStack space="0.5rem">
                  {myActive.map((s) => {
                    const e = epic(s.epicId)
                    return (
                      <RudiCluster
                        key={s.id}
                        space="0.75rem"
                        align="center"
                        style={{ paddingBlock: '0.625rem', borderBlockEnd: '1px solid var(--rudi-color-border-default)' }}
                      >
                        <TypeIcon type={s.type} />
                        <IssueKey>{s.key}</IssueKey>
                        <RudiText variant="body-sm" style={{ ...medium, flex: 1, minInlineSize: 0 }}>
                          {s.title}
                        </RudiText>
                        <RudiCluster space="0.375rem" align="center">
                          <EpicDot color={e.color} />
                          <RudiBadge variant={statusMeta[s.status].variant} size="sm">
                            {statusMeta[s.status].label}
                          </RudiBadge>
                        </RudiCluster>
                        <PriorityBadge priority={s.priority} />
                        <Points value={s.points} />
                      </RudiCluster>
                    )
                  })}
                </RudiStack>
              </RudiStack>
            </Panel>

            <RudiGrid minCellWidth="15rem" space="1rem">
              <Panel>
                <RudiStack space="0.75rem">
                  <RudiHeading level={2} size={6} style={{ margin: 0 }}>
                    Focus this quarter
                  </RudiHeading>
                  <RudiDonutChart
                    data={focusMix}
                    height={200}
                    showLegend
                    label="Share of this engineer's effort by area this quarter"
                  />
                </RudiStack>
              </Panel>
              <Panel>
                <RudiStack space="0.875rem">
                  <RudiHeading level={2} size={6} style={{ margin: 0 }}>
                    Sprint goal contribution
                  </RudiHeading>
                  <RudiStack space="0.375rem">
                    <RudiCluster justify="space-between" align="baseline">
                      <RudiText variant="caption">Points completed</RudiText>
                      <RudiText variant="caption" style={semibold}>
                        13 / 21
                      </RudiText>
                    </RudiCluster>
                    <RudiProgressBar label="Points completed" value={62} size="sm" variant="success" />
                  </RudiStack>
                  <RudiStack space="0.375rem">
                    <RudiCluster justify="space-between" align="baseline">
                      <RudiText variant="caption">Reviews given</RudiText>
                      <RudiText variant="caption" style={semibold}>
                        11
                      </RudiText>
                    </RudiCluster>
                    <RudiProgressBar label="Reviews given" value={78} size="sm" />
                  </RudiStack>
                  <RudiText variant="caption">
                    Owns the billing ledger (BEA-401) and the p99 latency fix (BEA-502) — both critical-path for the sprint goal.
                  </RudiText>
                </RudiStack>
              </Panel>
            </RudiGrid>
          </RudiStack>

          {/* Right: skills + settings */}
          <RudiStack space="1.25rem">
            <Panel>
              <RudiStack space="0.75rem">
                <RudiHeading level={2} size={6} style={{ margin: 0 }}>
                  Skills
                </RudiHeading>
                <RudiCluster space="0.375rem" align="center">
                  {skills.map((skill) => (
                    <RudiTag key={skill}>{skill}</RudiTag>
                  ))}
                </RudiCluster>
              </RudiStack>
            </Panel>

            <Panel>
              <RudiStack space="0.25rem">
                <RudiHeading level={2} size={6} style={{ margin: 0, marginBlockEnd: '0.25rem' }}>
                  Notifications
                </RudiHeading>
                <SettingRow title="Mentions" description="When someone @mentions you" defaultOn />
                <SettingRow title="Assigned to me" description="Issues assigned or reassigned to you" defaultOn />
                <SettingRow title="Review requests" description="When you're added as a reviewer" defaultOn />
                <SettingRow title="Daily digest" description="A morning summary of your sprint" />
              </RudiStack>
            </Panel>
          </RudiStack>
        </RudiSidebar>
      </RudiStack>
    </PmShell>
  )
}

const meta = {
  title: 'Examples/Project Management/Profile',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          "A team member's profile: identity header, personal delivery KPIs, current in-flight work, a quarterly focus breakdown, sprint-goal contribution, skills, and notification settings.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Profile: Story = {
  name: 'Profile',
  render: () => <ProfileRender />,
}
