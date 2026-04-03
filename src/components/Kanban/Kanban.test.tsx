import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { KanbanBoard } from './KanbanBoard'
import { KanbanCard } from './KanbanCard'

const sampleColumns = [
  {
    id: 'todo',
    title: 'To Do',
    items: [
      { id: 'card-1', title: 'Design homepage' },
      { id: 'card-2', title: 'Fix login bug' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    items: [{ id: 'card-3', title: 'Build API' }],
  },
  {
    id: 'done',
    title: 'Done',
    items: [],
  },
]

const renderCard = (item: { id: string; [key: string]: unknown }) => (
  <KanbanCard key={item.id} id={item.id}>
    <span>{String(item.title)}</span>
  </KanbanCard>
)

describe('KanbanBoard', () => {
  it('renders all columns', () => {
    render(
      <KanbanBoard
        columns={sampleColumns}
        onCardMove={vi.fn()}
        renderCard={renderCard}
      />,
    )
    expect(screen.getByRole('region', { name: 'To Do' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'In Progress' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Done' })).toBeInTheDocument()
  })

  it('renders all cards', () => {
    render(
      <KanbanBoard
        columns={sampleColumns}
        onCardMove={vi.fn()}
        renderCard={renderCard}
      />,
    )
    expect(screen.getByText('Design homepage')).toBeInTheDocument()
    expect(screen.getByText('Fix login bug')).toBeInTheDocument()
    expect(screen.getByText('Build API')).toBeInTheDocument()
  })

  it('displays column item counts', () => {
    render(
      <KanbanBoard
        columns={sampleColumns}
        onCardMove={vi.fn()}
        renderCard={renderCard}
      />,
    )
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders drag handles with accessible labels', () => {
    render(
      <KanbanBoard
        columns={sampleColumns}
        onCardMove={vi.fn()}
        renderCard={renderCard}
      />,
    )
    const handles = screen.getAllByRole('button', { name: /Drag handle/ })
    expect(handles).toHaveLength(3)
  })

  it('applies rudiment-kanban class', () => {
    const { container } = render(
      <KanbanBoard
        columns={sampleColumns}
        onCardMove={vi.fn()}
        renderCard={renderCard}
      />,
    )
    expect(container.querySelector('.rudiment-kanban')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(
      <KanbanBoard
        columns={sampleColumns}
        onCardMove={vi.fn()}
        renderCard={renderCard}
        className="my-board"
      />,
    )
    const board = container.querySelector('.rudiment-kanban')
    expect(board).toHaveClass('my-board')
  })

  it('has live regions for announcements', () => {
    render(
      <KanbanBoard
        columns={sampleColumns}
        onCardMove={vi.fn()}
        renderCard={renderCard}
      />,
    )
    const statusRegions = screen.getAllByRole('status')
    expect(statusRegions.length).toBeGreaterThanOrEqual(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <KanbanBoard
        columns={sampleColumns}
        onCardMove={vi.fn()}
        renderCard={renderCard}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
