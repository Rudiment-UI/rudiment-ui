import { useRef, useState } from 'react'
import { useButton } from 'react-aria'
import { cn } from '@/utils/cn'
import { RudiIcon } from '@/components/Icon/Icon'
import './tag.css'

export interface RudiTagProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  dismissible?: boolean
  onDismiss?: () => void
  onPress?: () => void
  isDisabled?: boolean
  children: React.ReactNode
  className?: string
}

export function RudiTag({
  variant = 'default',
  dismissible = false,
  onDismiss,
  onPress,
  isDisabled = false,
  children,
  className,
}: RudiTagProps) {
  const [dismissed, setDismissed] = useState(false)
  const tagRef = useRef<HTMLButtonElement>(null)

  const { buttonProps: tagButtonProps } = useButton(
    {
      onPress,
      isDisabled,
      elementType: onPress ? 'button' : 'span',
    },
    tagRef,
  )

  const closeAriaLabel =
    typeof children === 'string' ? `Remove ${children}` : 'Remove'

  const classes = cn(
    'rudi-tag',
    `rudi-tag--${variant}`,
    onPress && 'rudi-tag--interactive',
    dismissible && 'rudi-tag--dismissible',
    className,
  )

  if (dismissed) {
    return null
  }

  if (onPress) {
    return (
      <button ref={tagRef} {...tagButtonProps} className={classes}>
        {children}
        {dismissible && (
          <span
            role="button"
            tabIndex={0}
            className="rudi-tag__close"
            aria-label={closeAriaLabel}
            onClick={(e) => {
              e.stopPropagation()
              setDismissed(true)
              onDismiss?.()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                setDismissed(true)
                onDismiss?.()
              }
            }}
          >
            <RudiIcon icon="mdi:close" size="sm" aria-hidden="true" />
          </span>
        )}
      </button>
    )
  }

  return (
    <span
      className={classes}
      {...(isDisabled ? { 'aria-disabled': 'true' } : {})}
    >
      {children}
      {dismissible && (
        <button
          type="button"
          className="rudi-tag__close"
          aria-label={closeAriaLabel}
          onClick={() => {
            setDismissed(true)
            onDismiss?.()
          }}
        >
          <RudiIcon icon="mdi:close" size="sm" aria-hidden="true" />
        </button>
      )}
    </span>
  )
}
