import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/utils/cn'
import type { RudiKanbanItem } from './KanbanBoard'

export interface RudiKanbanColumnProps {
  id: string
  title: string
  items: RudiKanbanItem[]
  renderCard: (item: RudiKanbanItem) => React.ReactNode
  className?: string
}

export function RudiKanbanColumn({
  id,
  title,
  items,
  renderCard,
  className,
}: RudiKanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      className={cn(
        'rudi-kanban__column',
        isOver && 'rudi-kanban__column--over',
        className,
      )}
      role="region"
      aria-label={title}
    >
      <div className="rudi-kanban__column-header">
        <span className="rudi-kanban__column-title">{title}</span>
        <span className="rudi-kanban__column-count">{items.length}</span>
      </div>
      <div ref={setNodeRef} className="rudi-kanban__column-body">
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
