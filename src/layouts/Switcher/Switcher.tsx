import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface SwitcherProps extends React.HTMLAttributes<HTMLElement> {
  threshold?: string
  space?: string
  limit?: number
  as?: React.ElementType
  children?: React.ReactNode
}

export const Switcher = forwardRef<HTMLElement, SwitcherProps>(
  function Switcher(
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
        className={cn('rudiment-switcher', className)}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </Element>
    )
  },
)
