import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './footer.css'

export interface RudiFooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
}

export interface RudiFooterColumnsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Minimum column width before wrapping (defaults to the footer token). */
  minColumnWidth?: string
  children: React.ReactNode
  className?: string
}

export interface RudiFooterColumnProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional heading rendered above the column content. */
  title?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export interface RudiFooterBottomBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const FooterRoot = forwardRef<HTMLElement, RudiFooterProps>(function RudiFooter(
  { className, children, ...props },
  ref,
) {
  return (
    <footer ref={ref} className={cn('rudi-footer', className)} {...props}>
      {children}
    </footer>
  )
})

function FooterColumns({
  minColumnWidth,
  className,
  style,
  children,
  ...props
}: RudiFooterColumnsProps) {
  const customProperties: Record<string, string> = {}
  if (minColumnWidth) customProperties['--footer-columns-min'] = minColumnWidth

  return (
    <div
      className={cn('rudi-footer__columns', className)}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}

function FooterColumn({
  title,
  className,
  children,
  ...props
}: RudiFooterColumnProps) {
  return (
    <div className={cn('rudi-footer__column', className)} {...props}>
      {title != null && (
        <div className="rudi-footer__column-title">{title}</div>
      )}
      {children}
    </div>
  )
}

function FooterBottomBar({
  className,
  children,
  ...props
}: RudiFooterBottomBarProps) {
  return (
    <div className={cn('rudi-footer__bottom', className)} {...props}>
      {children}
    </div>
  )
}

export const RudiFooter = Object.assign(FooterRoot, {
  Columns: FooterColumns,
  Column: FooterColumn,
  BottomBar: FooterBottomBar,
})
