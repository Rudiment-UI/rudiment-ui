import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './prose.css'

export interface ProseProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'base' | 'lg'
  as?: React.ElementType
  children: React.ReactNode
  className?: string
}

export const Prose = forwardRef<HTMLElement, ProseProps>(function Prose(
  { size = 'base', as: Element = 'div', className, children, ...props },
  ref,
) {
  return (
    <Element
      ref={ref}
      className={cn(
        'rudiment-prose',
        size !== 'base' && `rudiment-prose--${size}`,
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  )
})
