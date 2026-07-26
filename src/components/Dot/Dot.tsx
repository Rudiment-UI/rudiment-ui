import type { CSSProperties } from 'react'
import { cn } from '@/utils/cn'
import './dot.css'

export interface RudiDotProps {
  /** Semantic color of the dot. Ignored when `color` is set. */
  tone?: 'default' | 'success' | 'warning' | 'error' | 'info'
  /**
   * Explicit color (any CSS color or design token, e.g.
   * `var(--rudi-color-dataviz-3)`) for domain accents. Overrides `tone`.
   */
  color?: string
  size?: 'sm' | 'md' | 'lg'
  /** Renders an animated halo to draw attention (e.g. "live"). */
  pulse?: boolean
  /**
   * Accessible label. When provided the dot is exposed as a status with
   * visually-hidden text; otherwise it is decorative (`aria-hidden`).
   */
  label?: string
  className?: string
}

export function RudiDot({
  tone = 'default',
  color,
  size = 'md',
  pulse = false,
  label,
  className,
}: RudiDotProps) {
  const style = color
    ? ({ '--rudi-dot-color': color } as CSSProperties)
    : undefined

  return (
    <span
      className={cn(
        'rudi-dot',
        !color && `rudi-dot--${tone}`,
        `rudi-dot--${size}`,
        pulse && 'rudi-dot--pulse',
        className,
      )}
      style={style}
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : true}
    >
      {label && <span className="rudi-dot__label">{label}</span>}
    </span>
  )
}
