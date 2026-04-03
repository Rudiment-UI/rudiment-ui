import { forwardRef } from 'react'
import { Icon as IconifyIcon } from '@iconify/react'
import { cn } from '@/utils/cn'
import './icon.css'

export interface IconProps {
  icon: string
  size?: 'sm' | 'md' | 'lg' | number
  color?: string
  label?: string
  className?: string
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  function Icon({ icon, size = 'md', color, label, className }, ref) {
    const sizeClass = typeof size === 'string' ? `rudiment-icon--${size}` : undefined
    const inlineStyle =
      typeof size === 'number'
        ? { width: size, height: size, ...(color ? { color } : {}) }
        : color
          ? { color }
          : undefined

    return (
      <span
        ref={ref}
        className={cn('rudiment-icon', sizeClass, className)}
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        style={inlineStyle}
      >
        <IconifyIcon icon={icon} />
      </span>
    )
  },
)
