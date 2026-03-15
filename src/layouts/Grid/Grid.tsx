import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './grid.css'

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  minCellWidth?: string
  space?: string
  as?: React.ElementType
  children?: React.ReactNode
}

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  {
    minCellWidth,
    space,
    as: Element = 'div',
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const customProperties: Record<string, string> = {}
  if (minCellWidth) customProperties['--grid-min-cell'] = minCellWidth
  if (space) customProperties['--grid-space'] = space

  return (
    <Element
      ref={ref}
      className={cn('rudiment-grid', className)}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  )
})
