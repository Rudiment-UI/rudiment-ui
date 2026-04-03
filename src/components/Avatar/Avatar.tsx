import { useState } from 'react'
import { cn } from '@/utils/cn'
import { Badge } from '@/components/Badge/Badge'
import './avatar.css'

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  status?: 'success' | 'warning' | 'error' | 'info'
  className?: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return (parts[0]?.[0] ?? '').toUpperCase()
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  className,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = src && !imgError
  const initials = name ? getInitials(name) : ''
  const ariaLabel = alt || name

  return (
    <span
      className={cn(
        'rudiment-avatar',
        `rudiment-avatar--${size}`,
        className,
      )}
      role="img"
      aria-label={ariaLabel}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || ''}
          className="rudiment-avatar__image"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="rudiment-avatar__initials" aria-hidden="true">
          {initials}
        </span>
      )}
      {status && (
        <Badge
          variant={status}
          dot
          className="rudiment-avatar__status"
        />
      )}
    </span>
  )
}
