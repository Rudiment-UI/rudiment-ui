// src/layouts/Box/Box.tsx
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  padding?: string
  bordered?: boolean
  invert?: boolean
  as?: React.ElementType
  children?: React.ReactNode
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  {
    padding,
    bordered = false,
    invert = false,
    as: Element = 'div',
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const customProperties: Record<string, string> = {}
  if (padding) customProperties['--box-padding'] = padding

  return (
    <Element
      ref={ref}
      className={cn(
        'rudiment-box',
        bordered && 'rudiment-box--bordered',
        invert && 'rudiment-box--invert',
        className,
      )}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  )
})
