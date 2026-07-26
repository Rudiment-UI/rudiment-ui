import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './top-bar.css'

export interface RudiTopBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Content pinned to the inline-start of the bar. */
  start?: React.ReactNode
  /** Content pinned to the inline-end of the bar. */
  end?: React.ReactNode
  /** Optional strip rendered above the main row, e.g. an announcement. */
  announcement?: React.ReactNode
  /** Whether the bar sticks to the top of its scroll container. */
  sticky?: boolean
  /** Element to render. Defaults to `header`. */
  as?: React.ElementType
  /** Fills the growing center of the main row (brand, nav, title). */
  children?: React.ReactNode
  className?: string
}

export const RudiTopBar = forwardRef<HTMLElement, RudiTopBarProps>(
  function RudiTopBar(
    {
      start,
      end,
      announcement,
      sticky = true,
      as: Element = 'header',
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
          'rudi-top-bar',
          sticky && 'rudi-top-bar--sticky',
          className,
        )}
        {...props}
      >
        {announcement != null && (
          <div className="rudi-top-bar__announcement">{announcement}</div>
        )}
        <div className="rudi-top-bar__row">
          {start != null && (
            <div className="rudi-top-bar__start">{start}</div>
          )}
          {children != null && (
            <div className="rudi-top-bar__center">{children}</div>
          )}
          {end != null && <div className="rudi-top-bar__end">{end}</div>}
        </div>
      </Element>
    )
  },
)
