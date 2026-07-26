import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import type {
  RudiTypographyAlign,
  RudiTypographyTone,
  RudiTypographyWeight,
} from '@/typography/Text/Text'
import './heading.css'

export interface RudiHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  size?: 1 | 2 | 3 | 4 | 5 | 6
  /** Font weight, overriding the size default. */
  weight?: RudiTypographyWeight
  /** Semantic text color. */
  tone?: RudiTypographyTone
  /** Text alignment. */
  align?: RudiTypographyAlign
  /** Removes the element's default block margin. */
  noMargin?: boolean
  children: React.ReactNode
  className?: string
}

export const RudiHeading = forwardRef<HTMLHeadingElement, RudiHeadingProps>(
  function RudiHeading(
    { level, size, weight, tone, align, noMargin, className, children, ...props },
    ref,
  ) {
    const Element = `h${level}` as const
    const visualSize = size ?? level

    return (
      <Element
        ref={ref}
        className={cn(
          `rudi-heading rudi-heading--${visualSize}`,
          weight && `rudi-heading--weight-${weight}`,
          tone && `rudi-heading--tone-${tone}`,
          align && `rudi-heading--align-${align}`,
          noMargin && 'rudi-heading--flush',
          className,
        )}
        {...props}
      >
        {children}
      </Element>
    )
  },
)
