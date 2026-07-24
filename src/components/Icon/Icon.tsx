import { forwardRef } from 'react'
import { Icon as IconifyIcon } from '@iconify/react'
import { cn } from '@/utils/cn'
import './icon.css'

export interface RudiIconProps {
  icon: string
  size?: 'sm' | 'md' | 'lg' | number
  color?: string
  label?: string
  className?: string
}

export const RudiIcon = forwardRef<HTMLSpanElement, RudiIconProps>(
  function RudiIcon({ icon, size = 'md', color, label, className }, ref) {
    const sizeClass = typeof size === 'string' ? `rudi-icon--${size}` : undefined
    const inlineStyle =
      typeof size === 'number'
        ? { width: size, height: size, ...(color ? { color } : {}) }
        : color
          ? { color }
          : undefined

    return (
      <span
        ref={ref}
        className={cn('rudi-icon', sizeClass, className)}
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
