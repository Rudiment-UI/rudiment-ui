import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './card.css'

export interface RudiCardProps {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export interface RudiCardHeaderProps {
  children: React.ReactNode
  className?: string
}

export interface RudiCardBodyProps {
  children: React.ReactNode
  className?: string
}

export interface RudiCardFooterProps {
  children: React.ReactNode
  className?: string
}

const CardRoot = forwardRef<HTMLDivElement, RudiCardProps>(
  function RudiCard(
    { variant = 'default', padding = 'md', children, className },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'rudi-card',
          `rudi-card--${variant}`,
          `rudi-card--padding-${padding}`,
          className,
        )}
      >
        {children}
      </div>
    )
  },
)

function CardHeader({ children, className }: RudiCardHeaderProps) {
  return (
    <div className={cn('rudi-card__header', className)}>{children}</div>
  )
}

function CardBody({ children, className }: RudiCardBodyProps) {
  return (
    <div className={cn('rudi-card__body', className)}>{children}</div>
  )
}

function CardFooter({ children, className }: RudiCardFooterProps) {
  return (
    <div className={cn('rudi-card__footer', className)}>{children}</div>
  )
}

export const RudiCard = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
})
