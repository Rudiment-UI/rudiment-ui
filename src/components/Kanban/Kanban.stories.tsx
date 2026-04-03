import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { KanbanBoard, type KanbanColumnData, type KanbanCardMoveEvent } from './KanbanBoard'
import { KanbanCard } from './KanbanCard'
import { Badge } from '../Badge/Badge'
import { Avatar } from '../Avatar/Avatar'

const initialColumns: KanbanColumnData[] = [
  {
    id: 'todo',
    title: 'To Do',
    items: [
      { id: 'card-1', title: 'Design homepage mockups', priority: 'info', assignee: 'Alice Chen' },
      { id: 'card-2', title: 'Fix login validation bug', priority: 'error', assignee: 'Bob Kim' },
      { id: 'card-3', title: 'Write API documentation', priority: 'default', assignee: 'Carol Diaz' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    items: [
      { id: 'card-4', title: 'Build user dashboard', priority: 'warning', assignee: 'Dan Lee' },
      { id: 'card-5', title: 'Implement search feature', priority: 'info', assignee: 'Eva Patel' },
    ],
  },
  {
    id: 'review',
    title: 'In Review',
    items: [
      { id: 'card-6', title: 'Refactor auth middleware', priority: 'success', assignee: 'Frank Wu' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    items: [
      { id: 'card-7', title: 'Set up CI/CD pipeline', priority: 'success', assignee: 'Grace Tan' },
    ],
  },
]

function InteractiveBoard() {
  const [columns, setColumns] = useState<KanbanColumnData[]>(initialColumns)

  const handleCardMove = (event: KanbanCardMoveEvent) => {
    setColumns((prev) => {
      const next = prev.map((col) => ({
        ...col,
        items: [...col.items],
      }))

      const fromCol = next.find((col) => col.id === event.fromColumnId)
      const toCol = next.find((col) => col.id === event.toColumnId)
      if (!fromCol || !toCol) return prev

      const [movedCard] = fromCol.items.splice(event.fromIndex, 1)
      toCol.items.splice(event.toIndex, 0, movedCard)

      return next
    })
  }

  return (
    <KanbanBoard
      columns={columns}
      onCardMove={handleCardMove}
      renderCard={(item) => (
        <KanbanCard key={item.id} id={item.id}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
              {String(item.title)}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge variant={item.priority as 'default' | 'success' | 'warning' | 'error' | 'info'} size="sm">
                {String(item.priority)}
              </Badge>
              <Avatar name={String(item.assignee)} size="sm" />
            </div>
          </div>
        </KanbanCard>
      )}
    />
  )
}

const meta = {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A drag-and-drop Kanban board with columns and cards. Built with @dnd-kit for accessible keyboard and pointer-based reordering. Cards support cross-column moves with live screen reader announcements.',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KanbanBoard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <InteractiveBoard />,
}

export const EmptyColumns: Story = {
  render: () => {
    const emptyColumns: KanbanColumnData[] = [
      { id: 'todo', title: 'To Do', items: [] },
      { id: 'in-progress', title: 'In Progress', items: [] },
      { id: 'done', title: 'Done', items: [] },
    ]

    return (
      <KanbanBoard
        columns={emptyColumns}
        onCardMove={() => {}}
        renderCard={(item) => (
          <KanbanCard key={item.id} id={item.id}>
            <span>{String(item.title)}</span>
          </KanbanCard>
        )}
      />
    )
  },
}

export const SimpleCards: Story = {
  render: () => {
    const simpleColumns: KanbanColumnData[] = [
      {
        id: 'backlog',
        title: 'Backlog',
        items: [
          { id: 's1', title: 'Task one' },
          { id: 's2', title: 'Task two' },
          { id: 's3', title: 'Task three' },
        ],
      },
      {
        id: 'active',
        title: 'Active',
        items: [{ id: 's4', title: 'Task four' }],
      },
    ]

    return (
      <KanbanBoard
        columns={simpleColumns}
        onCardMove={() => {}}
        renderCard={(item) => (
          <KanbanCard key={item.id} id={item.id}>
            <span style={{ fontSize: '0.875rem' }}>{String(item.title)}</span>
          </KanbanCard>
        )}
      />
    )
  },
}
