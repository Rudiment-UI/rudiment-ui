import { useCallback, useRef, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { cn } from '@/utils/cn'
import { KanbanColumn } from './KanbanColumn'
import './kanban.css'

export interface KanbanItem {
  id: string
  [key: string]: unknown
}

export interface KanbanColumnData {
  id: string
  title: string
  items: KanbanItem[]
}

export interface KanbanCardMoveEvent {
  cardId: string
  fromColumnId: string
  toColumnId: string
  fromIndex: number
  toIndex: number
}

export interface KanbanBoardProps {
  columns: KanbanColumnData[]
  onCardMove: (event: KanbanCardMoveEvent) => void
  renderCard: (item: KanbanItem) => React.ReactNode
  className?: string
}

function findColumnOfItem(
  columns: KanbanColumnData[],
  itemId: string,
): KanbanColumnData | undefined {
  return columns.find((col) => col.items.some((item) => item.id === itemId))
}

function KanbanBoardRoot({
  columns,
  onCardMove,
  renderCard,
  className,
}: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const announcementRef = useRef<HTMLDivElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const announce = useCallback((message: string) => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message
    }
  }, [])

  const activeItem = activeId
    ? columns.flatMap((col) => col.items).find((item) => item.id === activeId)
    : null

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = String(event.active.id)
      setActiveId(id)
      const col = findColumnOfItem(columns, id)
      if (col) {
        announce(`Picked up card from ${col.title}`)
      }
    },
    [columns, announce],
  )

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { over } = event
      if (!over) return
      const overId = String(over.id)
      const overCol =
        columns.find((col) => col.id === overId) ||
        findColumnOfItem(columns, overId)
      if (overCol) {
        announce(`Over column ${overCol.title}`)
      }
    },
    [columns, announce],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)

      if (!over) {
        announce('Cancelled drag')
        return
      }

      const activeIdStr = String(active.id)
      const overIdStr = String(over.id)

      const fromColumn = findColumnOfItem(columns, activeIdStr)
      if (!fromColumn) return

      const fromIndex = fromColumn.items.findIndex(
        (item) => item.id === activeIdStr,
      )

      // Determine destination column and index
      const toColumnDirect = columns.find((col) => col.id === overIdStr)
      const toColumnViaItem = findColumnOfItem(columns, overIdStr)
      const toColumn = toColumnDirect || toColumnViaItem

      if (!toColumn) return

      let toIndex: number
      if (toColumnDirect) {
        // Dropped on the column itself — append to end
        toIndex = toColumn.items.length
      } else {
        // Dropped on a specific card
        toIndex = toColumn.items.findIndex((item) => item.id === overIdStr)
      }

      // Only fire if something actually changed
      if (fromColumn.id === toColumn.id && fromIndex === toIndex) return

      announce(`Dropped card in ${toColumn.title} at position ${toIndex + 1}`)

      onCardMove({
        cardId: activeIdStr,
        fromColumnId: fromColumn.id,
        toColumnId: toColumn.id,
        fromIndex,
        toIndex,
      })
    },
    [columns, onCardMove, announce],
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={cn('rudiment-kanban', className)}>
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            items={column.items}
            renderCard={renderCard}
          />
        ))}
      </div>
      <DragOverlay>
        {activeItem ? (
          <div className="rudiment-kanban__card rudiment-kanban__card--overlay">
            {renderCard(activeItem)}
          </div>
        ) : null}
      </DragOverlay>
      <div
        ref={announcementRef}
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        className="rudiment-kanban__sr-only"
      />
    </DndContext>
  )
}

export const KanbanBoard = Object.assign(KanbanBoardRoot, {
  Column: KanbanColumn,
})
