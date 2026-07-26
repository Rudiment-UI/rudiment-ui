import { cn } from '@/utils/cn'
import './divider.css'

export interface RudiDividerProps {
  /** Layout direction of the rule. */
  orientation?: 'horizontal' | 'vertical'
  /** Margin applied on the block/inline axis around the rule. */
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  /**
   * Optional centered label. Only meaningful for a horizontal divider — it
   * renders a rule / text / rule row instead of a bare line.
   */
  label?: React.ReactNode
  className?: string
}

export function RudiDivider({
  orientation = 'horizontal',
  spacing = 'md',
  label,
  className,
}: RudiDividerProps) {
  const classes = cn(
    'rudi-divider',
    `rudi-divider--${orientation}`,
    `rudi-divider--spacing-${spacing}`,
    label && orientation === 'horizontal' && 'rudi-divider--labeled',
    className,
  )

  if (label && orientation === 'horizontal') {
    return (
      <div className={classes} role="separator" aria-orientation="horizontal">
        <span className="rudi-divider__line" aria-hidden="true" />
        <span className="rudi-divider__label">{label}</span>
        <span className="rudi-divider__line" aria-hidden="true" />
      </div>
    )
  }

  if (orientation === 'vertical') {
    return (
      <div
        className={classes}
        role="separator"
        aria-orientation="vertical"
      />
    )
  }

  return <hr className={classes} />
}
