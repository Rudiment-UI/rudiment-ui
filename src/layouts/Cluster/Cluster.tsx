import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './cluster.css'

export interface ClusterProps extends React.HTMLAttributes<HTMLElement> {
  space?: string
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  as?: React.ElementType
  children?: React.ReactNode
}

export const Cluster = forwardRef<HTMLElement, ClusterProps>(function Cluster(
  {
    space,
    justify,
    align,
    as: Element = 'div',
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const customProperties: Record<string, string> = {}
  if (space) customProperties['--cluster-space'] = space
  if (justify) customProperties['--cluster-justify'] = justify
  if (align) customProperties['--cluster-align'] = align

  return (
    <Element
      ref={ref}
      className={cn('rudiment-cluster', className)}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  )
})
