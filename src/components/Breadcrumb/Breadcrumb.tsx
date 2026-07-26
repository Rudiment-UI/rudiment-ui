import React from 'react'
import { cn } from '@/utils/cn'
import { RudiIcon } from '@/components/Icon/Icon'
import './breadcrumb.css'

export interface RudiBreadcrumbItem {
  label: string
  href?: string
}

export interface RudiBreadcrumbProps {
  items: RudiBreadcrumbItem[]
  /** Iconify name for the separator between items. */
  separator?: string
  /** Accessible label for the nav landmark. */
  label?: string
  className?: string
}

export function RudiBreadcrumb({
  items,
  separator = 'lucide:chevron-right',
  label = 'Breadcrumb',
  className,
}: RudiBreadcrumbProps) {
  return (
    <nav aria-label={label} className={cn('rudi-breadcrumb', className)}>
      <ol className="rudi-breadcrumb__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="rudi-breadcrumb__item">
              {isLast || !item.href ? (
                <span
                  className="rudi-breadcrumb__current"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="rudi-breadcrumb__link">
                  {item.label}
                </a>
              )}
              {!isLast && (
                <RudiIcon
                  icon={separator}
                  size="sm"
                  className="rudi-breadcrumb__separator"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
