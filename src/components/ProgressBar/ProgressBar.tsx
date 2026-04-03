import { useProgressBar } from 'react-aria'
import { cn } from '@/utils/cn'
import './progress-bar.css'

export interface ProgressBarProps {
  value: number
  minValue?: number
  maxValue?: number
  label: string
  showValueLabel?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  className?: string
}

export function ProgressBar({
  value,
  minValue = 0,
  maxValue = 100,
  label,
  showValueLabel = false,
  variant = 'default',
  size = 'md',
  className,
}: ProgressBarProps) {
  const { progressBarProps, labelProps } = useProgressBar({
    label,
    value,
    minValue,
    maxValue,
  })

  const percentage = ((value - minValue) / (maxValue - minValue)) * 100

  return (
    <div
      {...progressBarProps}
      className={cn('rudiment-progress', className)}
    >
      <div className="rudiment-progress__label-row">
        <span {...labelProps} className="rudiment-progress__label">
          {label}
        </span>
        {showValueLabel && (
          <span className="rudiment-progress__value">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div
        className={cn(
          'rudiment-progress__track',
          `rudiment-progress__track--${size}`,
        )}
      >
        <div
          className={cn(
            'rudiment-progress__bar',
            `rudiment-progress__bar--${variant}`,
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
