import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './switcher.css'

export interface RudiSwitcherProps extends React.HTMLAttributes<HTMLElement> {
  threshold?: string
  space?: string
  limit?: number
  as?: React.ElementType
  children?: React.ReactNode
}

export const RudiSwitcher = forwardRef<HTMLElement, RudiSwitcherProps>(
  function RudiSwitcher(
    {
      threshold,
      space,
      limit,
      as: Element = 'div',
      className,
      style,
      children,
      ...props
    },
    ref,
  ) {
    const customProperties: Record<string, string> = {}
    if (threshold) customProperties['--switcher-threshold'] = threshold
    if (space) customProperties['--switcher-space'] = space

    return (
      <Element
        ref={ref}
        className={cn('rudi-switcher', className)}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </Element>
    )
  },
)
