import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/utils/cn'
import type { KanbanItem } from './KanbanBoard'

export interface KanbanColumnProps {
  id: string
  title: string
  items: KanbanItem[]
  renderCard: (item: KanbanItem) => React.ReactNode
  className?: string
}

export function KanbanColumn({
  id,
  title,
  items,
  renderCard,
  className,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      className={cn(
        'rudiment-kanban__column',
        isOver && 'rudiment-kanban__column--over',
        className,
      )}
      role="region"
      aria-label={title}
    >
      <div className="rudiment-kanban__column-header">
        <span className="rudiment-kanban__column-title">{title}</span>
        <span className="rudiment-kanban__column-count">{items.length}</span>
      </div>
      <div ref={setNodeRef} className="rudiment-kanban__column-body">
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => renderCard(item))}
        </SortableContext>
      </div>
    </div>
  )
}
