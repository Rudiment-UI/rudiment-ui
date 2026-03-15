import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface CenterProps extends React.HTMLAttributes<HTMLElement> {
  maxWidth?: string
  gutters?: string
  intrinsic?: boolean
  as?: React.ElementType
  children?: React.ReactNode
}

export const Center = forwardRef<HTMLElement, CenterProps>(function Center(
  {
    maxWidth,
    gutters,
    intrinsic = false,
    as: Element = 'div',
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const customProperties: Record<string, string> = {}
  if (maxWidth) customProperties['--center-max-width'] = maxWidth
  if (gutters) customProperties['--center-gutters'] = gutters

  return (
    <Element
      ref={ref}
      className={cn(
        'rudiment-center',
        intrinsic && 'rudiment-center--intrinsic',
        className,
      )}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  )
})
