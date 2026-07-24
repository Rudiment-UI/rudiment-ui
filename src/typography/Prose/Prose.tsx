import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './prose.css'

export interface RudiProseProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'base' | 'lg'
  as?: React.ElementType
  children: React.ReactNode
  className?: string
}

export const RudiProse = forwardRef<HTMLElement, RudiProseProps>(function RudiProse(
  { size = 'base', as: Element = 'div', className, children, ...props },
  ref,
) {
  return (
    <Element
      ref={ref}
      className={cn(
        'rudi-prose',
        size !== 'base' && `rudi-prose--${size}`,
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  )
})
