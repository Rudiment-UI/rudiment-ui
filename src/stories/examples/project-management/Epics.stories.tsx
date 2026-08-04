import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiIconButton } from '../../../components/IconButton/IconButton'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiProgressBar } from '../../../components/ProgressBar/ProgressBar'
import { RudiStatCard } from '../../../components/StatCard/StatCard'

import {
  PmShell,
  PageHeader,
  Panel,
  IssueKey,
  AssigneeAvatar,
  EpicDot,
  epics,
  epicPct,
  epicStatusMeta,
  member,
  storiesForEpic,
  type Epic,
} from './shared'

const semibold = { fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'] }

const totalPoints = epics.reduce((s, e) => s + e.totalPoints, 0)
const donePoints = epics.reduce((s, e) => s + e.donePoints, 0)
const atRisk = epics.filter((e) => e.status === 'at-risk' || e.status === 'off-track').length

function EpicCard({ e }: { e: Epic }) {
  const items = storiesForEpic(e.id)
  const done = items.filter((s) => s.status === 'done').length
  const status = epicStatusMeta[e.status]
  const pct = epicPct(e)

  return (
    <Panel style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* colour header */}
      <div style={{ blockSize: '0.375rem', backgroundColor: e.color }} aria-hidden="true" />
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', flex: 1 }}>
        <RudiCluster justify="space-between" align="center">
          <RudiCluster space="0.5rem" align="center">
            <EpicDot color={e.color} size={10} />
            <IssueKey>{e.key}</IssueKey>
          </RudiCluster>
          <RudiCluster space="0.5rem" align="center">
            <RudiBadge variant={status.variant}>{status.label}</RudiBadge>
            <RudiIconButton aria-label="Epic actions" variant="ghost" size="sm">
              <RudiIcon icon="lucide:ellipsis" size="sm" />
            </RudiIconButton>
          </RudiCluster>
        </RudiCluster>

        <RudiStack space="0.375rem">
          <RudiHeading level={2} size={5} style={{ margin: 0 }}>
            {e.title}
          </RudiHeading>
          <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
            {e.summary}
          </RudiText>
        </RudiStack>

        <RudiStack space="0.375rem" style={{ marginBlockStart: 'auto' }}>
          <RudiCluster justify="space-between" align="baseline">
            <RudiText variant="caption">Progress</RudiText>
            <RudiText variant="caption" style={semibold}>
              {pct}%
            </RudiText>
          </RudiCluster>
          <RudiProgressBar
            label={`${e.title} progress`}
            value={pct}
            size="sm"
            variant={e.status === 'off-track' ? 'error' : e.status === 'at-risk' ? 'warning' : 'success'}
          />
        </RudiStack>

        <RudiCluster
          justify="space-between"
          align="center"
          style={{ paddingBlockStart: '0.875rem', borderBlockStart: '1px solid var(--rudi-color-border-default)' }}
        >
          <RudiCluster space="1rem" align="center">
            <RudiCluster space="0.375rem" align="center">
              <RudiIcon icon="lucide:bookmark" size="sm" color="var(--rudi-color-text-subtle)" />
              <RudiText variant="caption">
                {done}/{items.length} done
              </RudiText>
            </RudiCluster>
            <RudiCluster space="0.375rem" align="center">
              <RudiIcon icon="lucide:target" size="sm" color="var(--rudi-color-text-subtle)" />
              <RudiText variant="caption">{e.targetSprint}</RudiText>
            </RudiCluster>
          </RudiCluster>
          <RudiCluster space="0.5rem" align="center">
            <AssigneeAvatar id={e.ownerId} size="sm" />
            <RudiText variant="caption">{member(e.ownerId).name.split(' ')[0]}</RudiText>
          </RudiCluster>
        </RudiCluster>
      </div>
    </Panel>
  )
}

function EpicsRender() {
  return (
    <PmShell active="epics">
      <RudiStack space="1.5rem">
        <PageHeader
          title="Epics"
          subtitle="Larger bodies of work spanning multiple sprints on the Beacon roadmap."
          actions={
            <>
              <RudiButton variant="secondary" size="sm" iconBefore="lucide:calendar-range">
                Timeline
              </RudiButton>
              <RudiButton size="sm" iconBefore="lucide:plus">
                New epic
              </RudiButton>
            </>
          }
        />

        <RudiGrid minCellWidth="13rem" space="1rem">
          <RudiStatCard label="Active epics" value={epics.length} delta={`${atRisk} need attention`} trend="neutral" />
          <RudiStatCard label="Roadmap points" value={totalPoints} delta="across 6 epics" trend="neutral" />
          <RudiStatCard label="Delivered" value={`${Math.round((donePoints / totalPoints) * 100)}%`} delta={`${donePoints} pts`} trend="up" />
          <RudiStatCard label="Shipping this sprint" value="1 epic" delta="Realtime collab" trend="up" />
        </RudiGrid>

        <RudiGrid minCellWidth="19rem" space="1rem">
          {epics.map((e) => (
            <EpicCard key={e.id} e={e} />
          ))}
        </RudiGrid>
      </RudiStack>
    </PmShell>
  )
}

const meta = {
  title: 'Examples/Project Management/Epics',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The epic roadmap: each card shows the epic owner, status, summary, completion, story counts and target sprint, with roll-up KPIs across the whole roadmap.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Epics: Story = {
  name: 'Epics',
  render: () => <EpicsRender />,
}
