import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './text.css'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'body' | 'body-sm' | 'caption' | 'overline' | 'code'
  as?: React.ElementType
  children: React.ReactNode
  className?: string
}

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { variant = 'body', as: Element = 'p', className, children, ...props },
  ref,
) {
  return (
    <Element
      ref={ref}
      className={cn(`rudiment-text rudiment-text--${variant}`, className)}
      {...props}
    >
      {children}
    </Element>
  )
})
