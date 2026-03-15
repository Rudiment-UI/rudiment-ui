import { cn } from '@/utils/cn'
import './alert.css'

export interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error'
  title?: string
  isPolite?: boolean
  children: React.ReactNode
  className?: string
}

export function Alert({
  variant,
  title,
  isPolite = false,
  children,
  className,
}: AlertProps) {
  return (
    <div
      role={isPolite ? 'status' : 'alert'}
      className={cn('rudiment-alert', `rudiment-alert--${variant}`, className)}
    >
      {title && <p className="rudiment-alert__title">{title}</p>}
      <div className="rudiment-alert__content">{children}</div>
    </div>
  )
}
