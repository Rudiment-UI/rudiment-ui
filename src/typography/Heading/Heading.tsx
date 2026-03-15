import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './heading.css'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  size?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ level, size, className, children, ...props }, ref) {
    const Element = `h${level}` as const
    const visualSize = size ?? level

    return (
      <Element
        ref={ref}
        className={cn(
          `rudiment-heading rudiment-heading--${visualSize}`,
          className,
        )}
        {...props}
      >
        {children}
      </Element>
    )
  },
)
