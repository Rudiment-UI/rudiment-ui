// src/layouts/Box/Box.tsx
import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './box.css'

export interface RudiBoxProps extends React.HTMLAttributes<HTMLElement> {
  padding?: string
  bordered?: boolean
  invert?: boolean
  as?: React.ElementType
  children?: React.ReactNode
}

export const RudiBox = forwardRef<HTMLElement, RudiBoxProps>(function RudiBox(
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
        'rudi-box',
        bordered && 'rudi-box--bordered',
        invert && 'rudi-box--invert',
        className,
      )}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  )
})
