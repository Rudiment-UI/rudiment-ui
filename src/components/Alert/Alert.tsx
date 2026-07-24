import { useState } from 'react'
import { cn } from '@/utils/cn'
import { RudiIcon } from '@/components/Icon/Icon'
import './alert.css'

export interface RudiAlertProps {
  variant: 'info' | 'success' | 'warning' | 'error'
  title?: string
  icon?: string
  isPolite?: boolean
  dismissible?: boolean
  onDismiss?: () => void
  children: React.ReactNode
  className?: string
}

export function RudiAlert({
  variant,
  title,
  icon,
  isPolite = false,
  dismissible = false,
  onDismiss,
  children,
  className,
}: RudiAlertProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      role={isPolite ? 'status' : 'alert'}
      className={cn(
        'rudi-alert',
        `rudi-alert--${variant}`,
        icon && 'rudi-alert--has-icon',
        dismissible && 'rudi-alert--dismissible',
        className,
      )}
    >
      {icon && (
        <RudiIcon icon={icon} size="md" className="rudi-alert__icon" aria-hidden="true" />
      )}
      <div className="rudi-alert__body">
        {title && <p className="rudi-alert__title">{title}</p>}
        <div className="rudi-alert__content">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          className="rudi-alert__dismiss"
          aria-label="Dismiss alert"
          onClick={() => {
            setDismissed(true)
            onDismiss?.()
          }}
        >
          <RudiIcon icon="mdi:close" size="sm" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
