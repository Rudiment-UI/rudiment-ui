import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './cover.css'

export interface CoverProps extends React.HTMLAttributes<HTMLElement> {
  minHeight?: string
  space?: string
  as?: React.ElementType
  children?: React.ReactNode
}

export const Cover = forwardRef<HTMLElement, CoverProps>(function Cover(
  {
    minHeight,
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
  if (minHeight) customProperties['--cover-min-height'] = minHeight
  if (space) customProperties['--cover-space'] = space

  return (
    <Element
      ref={ref}
      className={cn('rudiment-cover', className)}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  )
})
