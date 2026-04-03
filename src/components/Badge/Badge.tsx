import { cn } from '@/utils/cn'
import './badge.css'

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  dot?: boolean
  children?: React.ReactNode
  className?: string
}

export function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'rudiment-badge',
        `rudiment-badge--${variant}`,
        `rudiment-badge--${size}`,
        dot && 'rudiment-badge--dot',
        className,
      )}
    >
      {!dot && children}
    </span>
  )
}
