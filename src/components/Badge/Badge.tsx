import { cn } from '@/utils/cn'
import './badge.css'

export interface RudiBadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  dot?: boolean
  children?: React.ReactNode
  className?: string
}

export function RudiBadge({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className,
}: RudiBadgeProps) {
  return (
    <span
      className={cn(
        'rudi-badge',
        `rudi-badge--${variant}`,
        `rudi-badge--${size}`,
        dot && 'rudi-badge--dot',
        className,
      )}
    >
      {!dot && children}
    </span>
  )
}
