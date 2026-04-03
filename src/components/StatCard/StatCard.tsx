import { cn } from '@/utils/cn'
import { Card } from '@/components/Card/Card'
import './stat-card.css'

export interface StatCardProps {
  label: string
  value: string | number
  delta?: string
  trend?: 'up' | 'down' | 'neutral'
  children?: React.ReactNode
  className?: string
}

export function StatCard({
  label,
  value,
  delta,
  trend = 'neutral',
  children,
  className,
}: StatCardProps) {
  return (
    <Card
      variant="outlined"
      padding="md"
      className={cn('rudiment-stat-card', className)}
    >
      <Card.Body>
        <span className="rudiment-stat-card__label">{label}</span>
        <span className="rudiment-stat-card__value">{value}</span>
        {delta && (
          <span
            className={cn(
              'rudiment-stat-card__delta',
              `rudiment-stat-card__delta--${trend}`,
            )}
          >
            {delta}
          </span>
        )}
        {children && (
          <div className="rudiment-stat-card__extra">{children}</div>
        )}
      </Card.Body>
    </Card>
  )
}
