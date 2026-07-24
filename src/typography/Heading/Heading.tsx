import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './heading.css'

export interface RudiHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  size?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

export const RudiHeading = forwardRef<HTMLHeadingElement, RudiHeadingProps>(
  function RudiHeading({ level, size, className, children, ...props }, ref) {
    const Element = `h${level}` as const
    const visualSize = size ?? level

    return (
      <Element
        ref={ref}
        className={cn(
          `rudi-heading rudi-heading--${visualSize}`,
          className,
        )}
        {...props}
      >
        {children}
      </Element>
    )
  },
)
