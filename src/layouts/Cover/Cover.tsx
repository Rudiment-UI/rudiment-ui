import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './cover.css'

export interface RudiCoverProps extends React.HTMLAttributes<HTMLElement> {
  minHeight?: string
  space?: string
  as?: React.ElementType
  children?: React.ReactNode
}

export const RudiCover = forwardRef<HTMLElement, RudiCoverProps>(function RudiCover(
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
      className={cn('rudi-cover', className)}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  )
})
