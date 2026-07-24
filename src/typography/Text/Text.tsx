import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './text.css'

export interface RudiTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'body' | 'body-sm' | 'caption' | 'overline' | 'code'
  as?: React.ElementType
  children: React.ReactNode
  className?: string
}

export const RudiText = forwardRef<HTMLElement, RudiTextProps>(function RudiText(
  { variant = 'body', as: Element = 'p', className, children, ...props },
  ref,
) {
  return (
    <Element
      ref={ref}
      className={cn(`rudi-text rudi-text--${variant}`, className)}
      {...props}
    >
      {children}
    </Element>
  )
})
