import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import {
  RudiKanbanBoard,
  type RudiKanbanColumnData,
  type RudiKanbanCardMoveEvent,
  type RudiKanbanItem,
} from '../../../components/Kanban/KanbanBoard'
import { RudiKanbanCard } from '../../../components/Kanban/KanbanCard'

import {
  PmShell,
  PageHeader,
  IssueKey,
  TypeIcon,
  PriorityBadge,
  Points,
  AssigneeAvatar,
  epic,
  stories,
  type StoryStatus,
} from './shared'

const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }

// The board tracks the four active workflow columns (backlog is groomed on the
// Backlog page, so it's intentionally omitted here).
const boardColumns: { id: StoryStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'In Review' },
  { id: 'done', title: 'Done' },
]

const sprintAssignees = [
  ...new Set(stories.filter((s) => s.status !== 'backlog').map((s) => s.assigneeId)),
].slice(0, 5)

function buildColumns(): RudiKanbanColumnData[] {
  return boardColumns.map((col) => ({
    id: col.id,
    title: col.title,
    items: stories
      .filter((s) => s.status === col.id)
      .map((s) => ({
        id: s.id,
        key: s.key,
        title: s.title,
        type: s.type,
        priority: s.priority,
        points: s.points,
        epicId: s.epicId,
        assigneeId: s.assigneeId,
      })),
  }))
}

function BoardCard({ item }: { item: RudiKanbanItem }) {
  const e = epic(String(item.epicId))
  return (
    <RudiKanbanCard id={item.id}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {/* epic accent stripe + key */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span
              aria-hidden="true"
              style={{
                inlineSize: '0.75rem',
                blockSize: '0.25rem',
                borderRadius: 'var(--rudi-radius-full)',
                backgroundColor: e.color,
              }}
            />
            <IssueKey>{String(item.key)}</IssueKey>
          </div>
          <TypeIcon type={item.type as never} />
        </div>

        <span style={{ fontSize: 'var(--rudi-font-size-sm)', ...medium, lineHeight: 'var(--rudi-font-line-height-tight)' }}>
          {String(item.title)}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <PriorityBadge priority={item.priority as never} />
            <Points value={Number(item.points)} />
          </div>
          <AssigneeAvatar id={String(item.assigneeId)} size="sm" />
        </div>
      </div>
    </RudiKanbanCard>
  )
}

function BoardRender() {
  const [columns, setColumns] = useState<RudiKanbanColumnData[]>(buildColumns)

  const handleCardMove = (event: RudiKanbanCardMoveEvent) => {
    setColumns((prev) => {
      const next = prev.map((col) => ({ ...col, items: [...col.items] }))
      const fromCol = next.find((c) => c.id === event.fromColumnId)
      const toCol = next.find((c) => c.id === event.toColumnId)
      if (!fromCol || !toCol) return prev
      const [moved] = fromCol.items.splice(event.fromIndex, 1)
      toCol.items.splice(event.toIndex, 0, moved)
      return next
    })
  }

  const wip = columns.find((c) => c.id === 'in-progress')?.items.length ?? 0

  return (
    <PmShell active="board">
      <RudiStack space="1.5rem">
        <PageHeader
          title="Board"
          subtitle="Drag cards between columns to update their status. Fully keyboard-accessible."
          actions={
            <>
              <RudiCluster space="0.375rem" align="center">
                {sprintAssignees.map((id) => (
                  <AssigneeAvatar key={id} id={id} size="sm" />
                ))}
                <RudiText variant="caption">{sprintAssignees.length} on sprint</RudiText>
              </RudiCluster>
              <RudiButton variant="secondary" size="sm" iconBefore="lucide:filter">
                Group by epic
              </RudiButton>
            </>
          }
        />

        {wip > 4 && (
          <RudiText variant="caption" style={{ color: 'var(--rudi-color-feedback-warning-text)' }}>
            Heads up: {wip} items in progress exceeds the WIP limit of 4.
          </RudiText>
        )}

        <div style={{ overflowX: 'auto', paddingBlockEnd: '0.5rem' }}>
          <RudiKanbanBoard columns={columns} onCardMove={handleCardMove} renderCard={(item) => <BoardCard key={item.id} item={item} />} />
        </div>
      </RudiStack>
    </PmShell>
  )
}

const meta = {
  title: 'Examples/Project Management/Board',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A drag-and-drop sprint board built on RudiKanbanBoard. Cards carry an epic accent, issue key, type, priority, points and assignee, and move accessibly by pointer or keyboard. The column model is controlled — dropping a card rewrites board state.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Board: Story = {
  name: 'Board',
  render: () => <BoardRender />,
}
