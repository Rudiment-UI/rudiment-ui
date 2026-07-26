import { useProgressBar } from 'react-aria'
import { cn } from '@/utils/cn'
import './progress-bar.css'

export type RudiProgressBarVariant = 'default' | 'success' | 'warning' | 'error'

export interface RudiProgressBarThreshold {
  /** Minimum percentage (0–100) at which this variant takes effect. */
  at: number
  variant: RudiProgressBarVariant
}

export interface RudiProgressBarProps {
  value: number
  minValue?: number
  maxValue?: number
  label: string
  showValueLabel?: boolean
  variant?: RudiProgressBarVariant
  /**
   * Percentage-driven fill color. The highest `at` the current percentage
   * meets or exceeds wins; below every threshold the `variant` prop applies.
   * e.g. `[{ at: 80, variant: 'warning' }, { at: 100, variant: 'error' }]`.
   */
  thresholds?: RudiProgressBarThreshold[]
  size?: 'sm' | 'md'
  className?: string
}

/** Resolve the active fill variant from the current percentage. */
function resolveVariant(
  percentage: number,
  variant: RudiProgressBarVariant,
  thresholds?: RudiProgressBarThreshold[],
): RudiProgressBarVariant {
  if (!thresholds || thresholds.length === 0) return variant
  const match = [...thresholds]
    .sort((a, b) => b.at - a.at)
    .find((t) => percentage >= t.at)
  return match ? match.variant : variant
}

export function RudiProgressBar({
  value,
  minValue = 0,
  maxValue = 100,
  label,
  showValueLabel = false,
  variant = 'default',
  thresholds,
  size = 'md',
  className,
}: RudiProgressBarProps) {
  const { progressBarProps, labelProps } = useProgressBar({
    label,
    value,
    minValue,
    maxValue,
  })

  const range = maxValue - minValue
  const rawPercentage = range === 0 ? 0 : ((value - minValue) / range) * 100
  const percentage = Math.min(100, Math.max(0, rawPercentage))
  const activeVariant = resolveVariant(percentage, variant, thresholds)

  return (
    <div
      {...progressBarProps}
      className={cn('rudi-progress', className)}
    >
      <div className="rudi-progress__label-row">
        <span {...labelProps} className="rudi-progress__label">
          {label}
        </span>
        {showValueLabel && (
          <span className="rudi-progress__value">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div
        className={cn(
          'rudi-progress__track',
          `rudi-progress__track--${size}`,
        )}
      >
        <div
          className={cn(
            'rudi-progress__bar',
            `rudi-progress__bar--${activeVariant}`,
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
