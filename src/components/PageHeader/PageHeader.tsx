import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import { RudiHeading } from '@/typography/Heading/Heading'
import { RudiText } from '@/typography/Text/Text'
import './page-header.css'

export interface RudiPageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode
  subtitle?: React.ReactNode
  /** Content pinned to the inline-end, e.g. primary page actions. */
  actions?: React.ReactNode
  /** Heading level for the title. Defaults to 1. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export const RudiPageHeader = forwardRef<HTMLDivElement, RudiPageHeaderProps>(
  function RudiPageHeader(
    { title, subtitle, actions, headingLevel = 1, className, ...props },
    ref,
  ) {
    return (
      <div ref={ref} className={cn('rudi-page-header', className)} {...props}>
        <div className="rudi-page-header__text">
          <RudiHeading
            level={headingLevel}
            size={2}
            noMargin
            className="rudi-page-header__title"
          >
            {title}
          </RudiHeading>
          {subtitle != null && (
            <RudiText
              variant="caption"
              noMargin
              className="rudi-page-header__subtitle"
            >
              {subtitle}
            </RudiText>
          )}
        </div>
        {actions != null && (
          <div className="rudi-page-header__actions">{actions}</div>
        )}
      </div>
    )
  },
)
