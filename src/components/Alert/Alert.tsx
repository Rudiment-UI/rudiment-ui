import { useState } from 'react'
import { cn } from '@/utils/cn'
import { Icon } from '@/components/Icon/Icon'
import './alert.css'

export interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error'
  title?: string
  icon?: string
  isPolite?: boolean
  dismissible?: boolean
  onDismiss?: () => void
  children: React.ReactNode
  className?: string
}

export function Alert({
  variant,
  title,
  icon,
  isPolite = false,
  dismissible = false,
  onDismiss,
  children,
  className,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      role={isPolite ? 'status' : 'alert'}
      className={cn(
        'rudiment-alert',
        `rudiment-alert--${variant}`,
        icon && 'rudiment-alert--has-icon',
        dismissible && 'rudiment-alert--dismissible',
        className,
      )}
    >
      {icon && (
        <Icon icon={icon} size="md" className="rudiment-alert__icon" aria-hidden="true" />
      )}
      <div className="rudiment-alert__body">
        {title && <p className="rudiment-alert__title">{title}</p>}
        <div className="rudiment-alert__content">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          className="rudiment-alert__dismiss"
          aria-label="Dismiss alert"
          onClick={() => {
            setDismissed(true)
            onDismiss?.()
          }}
        >
          <Icon icon="mdi:close" size="sm" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
