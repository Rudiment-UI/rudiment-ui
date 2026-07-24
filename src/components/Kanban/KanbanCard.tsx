import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/utils/cn'

export interface RudiKanbanCardProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function RudiKanbanCard({ id, children, className }: RudiKanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'rudi-kanban__card',
        isDragging && 'rudi-kanban__card--dragging',
        className,
      )}
    >
      <button
        type="button"
        className="rudi-kanban__card-handle"
        aria-label={`Drag handle for card ${id}`}
        {...attributes}
        {...listeners}
        // After the spread so it wins — `attributes` also carries
        // aria-roledescription and would otherwise overwrite it.
        aria-roledescription="sortable"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="3.5" cy="2" r="1.25" />
          <circle cx="8.5" cy="2" r="1.25" />
          <circle cx="3.5" cy="6" r="1.25" />
          <circle cx="8.5" cy="6" r="1.25" />
          <circle cx="3.5" cy="10" r="1.25" />
          <circle cx="8.5" cy="10" r="1.25" />
        </svg>
      </button>
      <div className="rudi-kanban__card-content">{children}</div>
    </div>
  )
}
