import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './text.css'

export type RudiTypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold'
export type RudiTypographyTone =
  | 'default'
  | 'subtle'
  | 'disabled'
  | 'brand'
  | 'inverted'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
export type RudiTypographyAlign = 'start' | 'center' | 'end' | 'justify'

export interface RudiTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'body' | 'body-sm' | 'caption' | 'overline' | 'code'
  as?: React.ElementType
  /** Font weight, overriding the variant default. */
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

export const RudiText = forwardRef<HTMLElement, RudiTextProps>(function RudiText(
  {
    variant = 'body',
    as: Element = 'p',
    weight,
    tone,
    align,
    noMargin,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <Element
      ref={ref}
      className={cn(
        `rudi-text rudi-text--${variant}`,
        weight && `rudi-text--weight-${weight}`,
        tone && `rudi-text--tone-${tone}`,
        align && `rudi-text--align-${align}`,
        noMargin && 'rudi-text--flush',
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  )
})
