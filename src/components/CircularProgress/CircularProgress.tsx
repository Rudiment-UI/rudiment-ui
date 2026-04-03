import { useProgressBar } from 'react-aria'
import { cn } from '@/utils/cn'
import './circular-progress.css'

export interface CircularProgressProps {
  value: number
  minValue?: number
  maxValue?: number
  label: string
  showValueLabel?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
}

const VIEWBOX_SIZE = 100
const CENTER = VIEWBOX_SIZE / 2

export function CircularProgress({
  value,
  minValue = 0,
  maxValue = 100,
  label,
  showValueLabel = false,
  variant = 'default',
  size = 'md',
  children,
  className,
}: CircularProgressProps) {
  const { progressBarProps, labelProps } = useProgressBar({
    label,
    value,
    minValue,
    maxValue,
  })

  const percentage = ((value - minValue) / (maxValue - minValue)) * 100
  const strokeWidth = 8
  const radius = (VIEWBOX_SIZE - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percentage / 100)

  return (
    <div
      {...progressBarProps}
      className={cn(
        'rudiment-circular-progress',
        `rudiment-circular-progress--${size}`,
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="rudiment-circular-progress__svg"
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={radius}
          className="rudiment-circular-progress__track"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={radius}
          className={cn(
            'rudiment-circular-progress__fill',
            `rudiment-circular-progress__fill--${variant}`,
          )}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="rudiment-circular-progress__center">
        {children ?? (showValueLabel && (
          <span className="rudiment-circular-progress__value">
            {Math.round(percentage)}%
          </span>
        ))}
      </div>
      <span {...labelProps} className="rudiment-circular-progress__label">
        {label}
      </span>
    </div>
  )
}
