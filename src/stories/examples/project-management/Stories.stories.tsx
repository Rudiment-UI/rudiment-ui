import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiSidebar } from '../../../layouts/Sidebar/Sidebar'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiTag } from '../../../components/Tag/Tag'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiInput } from '../../../components/Input/Input'
import { RudiProgressBar } from '../../../components/ProgressBar/ProgressBar'

import {
  PmShell,
  PageHeader,
  Panel,
  IssueKey,
  TypeIcon,
  PriorityBadge,
  Points,
  AssigneeAvatar,
  EpicDot,
  epic,
  member,
  stories,
  statusMeta,
  typeMeta,
  priorityMeta,
  type Story as StoryModel,
} from './shared'

const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }
const semibold = { fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'] }

const cellHeader: CSSProperties = {
  paddingBlock: '0.5rem',
  paddingInline: '0.75rem',
  textAlign: 'start',
  color: 'var(--rudi-color-text-subtle)',
  fontSize: 'var(--rudi-font-size-xs)',
  fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'],
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  whiteSpace: 'nowrap',
}

const cell: CSSProperties = {
  paddingBlock: '0.625rem',
  paddingInline: '0.75rem',
  borderBlockStart: '1px solid var(--rudi-color-border-default)',
  verticalAlign: 'middle',
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <RudiCluster justify="space-between" align="center" space="1rem">
      <RudiText variant="caption">{label}</RudiText>
      {children}
    </RudiCluster>
  )
}

function StoryDetail({ story }: { story: StoryModel }) {
  const e = epic(story.epicId)
  const status = statusMeta[story.status]
  // A small fake sub-task checklist so the panel feels like a real detail view.
  const subtasks = [
    { label: 'Write the technical spec', done: true },
    { label: 'Implement behind a flag', done: story.status === 'done' || story.status === 'review' },
    { label: 'Add tests', done: story.status === 'done' },
    { label: 'QA sign-off', done: story.status === 'done' },
  ]
  const doneCount = subtasks.filter((t) => t.done).length

  return (
    <Panel>
      <RudiStack space="1rem">
        <RudiCluster space="0.5rem" align="center">
          <TypeIcon type={story.type} />
          <IssueKey>{story.key}</IssueKey>
          <RudiBadge variant={status.variant} size="sm">
            {status.label}
          </RudiBadge>
        </RudiCluster>

        <RudiHeading level={2} size={4} style={{ margin: 0 }}>
          {story.title}
        </RudiHeading>

        <RudiStack space="0.625rem">
          <DetailRow label="Assignee">
            <RudiCluster space="0.5rem" align="center">
              <AssigneeAvatar id={story.assigneeId} size="sm" />
              <RudiText variant="body-sm">{member(story.assigneeId).name}</RudiText>
            </RudiCluster>
          </DetailRow>
          <DetailRow label="Epic">
            <RudiCluster space="0.375rem" align="center">
              <EpicDot color={e.color} />
              <RudiText variant="body-sm">{e.title}</RudiText>
            </RudiCluster>
          </DetailRow>
          <DetailRow label="Priority">
            <PriorityBadge priority={story.priority} />
          </DetailRow>
          <DetailRow label="Type">
            <RudiText variant="body-sm">{typeMeta[story.type].label}</RudiText>
          </DetailRow>
          <DetailRow label="Estimate">
            <Points value={story.points} />
          </DetailRow>
        </RudiStack>

        <RudiStack space="0.5rem" style={{ paddingBlockStart: '0.5rem', borderBlockStart: '1px solid var(--rudi-color-border-default)' }}>
          <RudiCluster justify="space-between" align="baseline">
            <RudiText variant="overline">Sub-tasks</RudiText>
            <RudiText variant="caption" style={semibold}>
              {doneCount}/{subtasks.length}
            </RudiText>
          </RudiCluster>
          <RudiProgressBar label="Sub-task completion" value={(doneCount / subtasks.length) * 100} size="sm" variant="success" />
          <RudiStack space="0.375rem" style={{ marginBlockStart: '0.25rem' }}>
            {subtasks.map((t) => (
              <RudiCluster key={t.label} space="0.5rem" align="center">
                <RudiIcon
                  icon={t.done ? 'lucide:circle-check' : 'lucide:circle'}
                  size="sm"
                  color={t.done ? 'var(--rudi-color-feedback-success)' : 'var(--rudi-color-text-subtle)'}
                />
                <RudiText
                  variant="body-sm"
                  style={{ color: t.done ? 'var(--rudi-color-text-subtle)' : 'var(--rudi-color-text-default)', textDecoration: t.done ? 'line-through' : 'none' }}
                >
                  {t.label}
                </RudiText>
              </RudiCluster>
            ))}
          </RudiStack>
        </RudiStack>

        {story.labels.length > 0 && (
          <RudiCluster space="0.375rem" align="center">
            {story.labels.map((l) => (
              <RudiTag key={l}>{l}</RudiTag>
            ))}
          </RudiCluster>
        )}

        <RudiCluster space="0.5rem">
          <RudiButton size="sm" iconBefore="lucide:pencil">
            Edit
          </RudiButton>
          <RudiButton variant="secondary" size="sm" iconBefore="lucide:git-branch">
            Create branch
          </RudiButton>
        </RudiCluster>
      </RudiStack>
    </Panel>
  )
}


const meta = {
  title: 'Examples/Project Management/Stories',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A dense issue table paired with a live detail panel. Select any row to inspect the story: assignee, epic, estimate, a sub-task checklist with progress, labels, and quick actions.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Stories: Story = {
  name: 'Stories',
  render: () => {
    // Everything except backlog, so the table reflects committed sprint work.
    const rows = stories.filter((s) => s.status !== 'backlog')
    const [selectedId, setSelectedId] = useState(rows[0].id)
    const selected = rows.find((s) => s.id === selectedId) ?? rows[0]

    return (
      <PmShell active="stories">
        <RudiStack space="1.5rem">
          <PageHeader
            title="Stories"
            subtitle={`${rows.length} issues in Sprint 24`}
            actions={
              <>
                <RudiButton variant="secondary" size="sm" iconBefore="lucide:arrow-up-down">
                  Sort
                </RudiButton>
                <RudiButton size="sm" iconBefore="lucide:plus">
                  New issue
                </RudiButton>
              </>
            }
          />

          <Panel>
            <RudiCluster space="0.75rem" align="center" justify="space-between">
              <div style={{ inlineSize: 'min(20rem, 100%)' }}>
                <RudiInput label="Search stories" type="search" placeholder="Filter by title or key…" />
              </div>
              <RudiCluster space="0.375rem" align="center">
                {(['critical', 'high', 'medium', 'low'] as const).map((p) => (
                  <RudiCluster key={p} space="0.25rem" align="center">
                    <RudiIcon icon={priorityMeta[p].icon} size="sm" color={`var(--rudi-color-feedback-${priorityMeta[p].variant === 'default' ? 'info' : priorityMeta[p].variant})`} />
                    <RudiText variant="caption">{rows.filter((r) => r.priority === p).length}</RudiText>
                  </RudiCluster>
                ))}
              </RudiCluster>
            </RudiCluster>
          </Panel>

          <RudiSidebar side="right" sideWidth="20rem" space="1.5rem" contentMin="50%">
            {/* Table */}
            <Panel style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ inlineSize: '100%', borderCollapse: 'collapse', fontSize: 'var(--rudi-font-size-sm)' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--rudi-color-background-surface-sunken)' }}>
                      <th style={cellHeader}>Type</th>
                      <th style={cellHeader}>Key</th>
                      <th style={{ ...cellHeader, inlineSize: '100%' }}>Summary</th>
                      <th style={cellHeader}>Priority</th>
                      <th style={cellHeader}>Status</th>
                      <th style={cellHeader}>Pts</th>
                      <th style={cellHeader}>Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((s) => {
                      const isSelected = s.id === selectedId
                      return (
                        <tr
                          key={s.id}
                          onClick={() => setSelectedId(s.id)}
                          style={{
                            cursor: 'pointer',
                            backgroundColor: isSelected ? 'var(--rudi-color-feedback-info-surface)' : 'transparent',
                          }}
                        >
                          <td style={cell}>
                            <TypeIcon type={s.type} />
                          </td>
                          <td style={cell}>
                            <IssueKey>{s.key}</IssueKey>
                          </td>
                          <td style={{ ...cell }}>
                            <RudiText variant="body-sm" style={medium}>
                              {s.title}
                            </RudiText>
                          </td>
                          <td style={cell}>
                            <PriorityBadge priority={s.priority} />
                          </td>
                          <td style={cell}>
                            <RudiBadge variant={statusMeta[s.status].variant} size="sm">
                              {statusMeta[s.status].label}
                            </RudiBadge>
                          </td>
                          <td style={{ ...cell, textAlign: 'center' }}>
                            <Points value={s.points} />
                          </td>
                          <td style={cell}>
                            <AssigneeAvatar id={s.assigneeId} size="sm" />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Panel>

            {/* Detail */}
            <StoryDetail story={selected} />
          </RudiSidebar>
        </RudiStack>
      </PmShell>
    )
  },
}
