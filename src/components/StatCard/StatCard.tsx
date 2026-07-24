import { cn } from '@/utils/cn'
import { RudiCard } from '@/components/Card/Card'
import './stat-card.css'

export interface RudiStatCardProps {
  label: string
  value: string | number
  delta?: string
  trend?: 'up' | 'down' | 'neutral'
  children?: React.ReactNode
  className?: string
}

export function RudiStatCard({
  label,
  value,
  delta,
  trend = 'neutral',
  children,
  className,
}: RudiStatCardProps) {
  return (
    <RudiCard
      variant="outlined"
      padding="md"
      className={cn('rudi-stat-card', className)}
    >
      <RudiCard.Body>
        <span className="rudi-stat-card__label">{label}</span>
        <span className="rudi-stat-card__value">{value}</span>
        {delta && (
          <span
            className={cn(
              'rudi-stat-card__delta',
              `rudi-stat-card__delta--${trend}`,
            )}
          >
            {delta}
          </span>
        )}
        {children && (
          <div className="rudi-stat-card__extra">{children}</div>
        )}
      </RudiCard.Body>
    </RudiCard>
  )
}
