import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './card.css'

export interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  function Card(
    { variant = 'default', padding = 'md', children, className },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'rudiment-card',
          `rudiment-card--${variant}`,
          `rudiment-card--padding-${padding}`,
          className,
        )}
      >
        {children}
      </div>
    )
  },
)

function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('rudiment-card__header', className)}>{children}</div>
  )
}

function CardBody({ children, className }: CardBodyProps) {
  return (
    <div className={cn('rudiment-card__body', className)}>{children}</div>
  )
}

function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('rudiment-card__footer', className)}>{children}</div>
  )
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
})
