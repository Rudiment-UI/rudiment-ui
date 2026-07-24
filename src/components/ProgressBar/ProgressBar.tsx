import { useProgressBar } from 'react-aria'
import { cn } from '@/utils/cn'
import './progress-bar.css'

export interface RudiProgressBarProps {
  value: number
  minValue?: number
  maxValue?: number
  label: string
  showValueLabel?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  className?: string
}

export function RudiProgressBar({
  value,
  minValue = 0,
  maxValue = 100,
  label,
  showValueLabel = false,
  variant = 'default',
  size = 'md',
  className,
}: RudiProgressBarProps) {
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
            `rudi-progress__bar--${variant}`,
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
