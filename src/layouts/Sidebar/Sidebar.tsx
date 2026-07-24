import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './sidebar.css'

export interface RudiSidebarProps extends React.HTMLAttributes<HTMLElement> {
  side?: 'left' | 'right'
  sideWidth?: string
  contentMin?: string
  space?: string
  noStretch?: boolean
  as?: React.ElementType
  children?: React.ReactNode
}

export const RudiSidebar = forwardRef<HTMLElement, RudiSidebarProps>(function RudiSidebar(
  {
    side = 'left',
    sideWidth,
    contentMin,
    space,
    noStretch = false,
    as: Element = 'div',
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const customProperties: Record<string, string> = {}
  if (sideWidth) customProperties['--sidebar-width'] = sideWidth
  if (contentMin) customProperties['--sidebar-content-min'] = contentMin
  if (space) customProperties['--sidebar-space'] = space

  return (
    <Element
      ref={ref}
      className={cn(
        'rudi-sidebar',
        side === 'right' && 'rudi-sidebar--right',
        noStretch && 'rudi-sidebar--no-stretch',
        className,
      )}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  )
})
