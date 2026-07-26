import { cn } from '@/utils/cn'
import { RudiIcon } from '@/components/Icon/Icon'
import './rating.css'

export interface RudiRatingProps {
  /** Current rating. Supports halves (e.g. `4.5`). */
  value: number
  /** Number of stars. */
  max?: number
  size?: 'sm' | 'md' | 'lg'
  /** When set, renders as an interactive radiogroup instead of a static image. */
  onChange?: (value: number) => void
  /** Show the numeric value (e.g. `4.8`) beside the stars. */
  showValue?: boolean
  /** Optional review count rendered beside the stars, e.g. `(128)`. */
  count?: number
  /** Accessible label. Defaults to `"Rated {value} out of {max}"`. */
  label?: string
  className?: string
}

type StarState = 'full' | 'half' | 'empty'

function starState(index: number, value: number): StarState {
  if (value >= index + 1) return 'full'
  if (value >= index + 0.5) return 'half'
  return 'empty'
}

export function RudiRating({
  value,
  max = 5,
  size = 'md',
  onChange,
  showValue = false,
  count,
  label,
  className,
}: RudiRatingProps) {
  const interactive = typeof onChange === 'function'
  const displayValue = interactive ? Math.round(value) : value
  const stars = Array.from({ length: max }, (_, i) => starState(i, displayValue))
  const accessibleLabel = label ?? `Rated ${displayValue} out of ${max}`

  const icon = (state: StarState) => (
    <RudiIcon
      icon={state === 'half' ? 'lucide:star-half' : 'lucide:star'}
      size={size}
      className={cn('rudi-rating__star', `rudi-rating__star--${state}`)}
    />
  )

  const text = (showValue || count != null) && (
    <span className="rudi-rating__text">
      {showValue && displayValue.toFixed(1)}
      {count != null && ` (${count})`}
    </span>
  )

  if (interactive) {
    return (
      <div
        className={cn('rudi-rating', `rudi-rating--${size}`, className)}
        role="radiogroup"
        aria-label={accessibleLabel}
      >
        {stars.map((state, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={Math.round(value) === i + 1}
            aria-label={`${i + 1} star${i === 0 ? '' : 's'}`}
            className="rudi-rating__button"
            onClick={() => onChange(i + 1)}
          >
            {icon(state)}
          </button>
        ))}
        {text}
      </div>
    )
  }

  return (
    <div
      className={cn('rudi-rating', `rudi-rating--${size}`, className)}
      role="img"
      aria-label={accessibleLabel}
    >
      <span className="rudi-rating__stars" aria-hidden="true">
        {stars.map((state, i) => (
          <span key={i}>{icon(state)}</span>
        ))}
      </span>
      {text}
    </div>
  )
}
