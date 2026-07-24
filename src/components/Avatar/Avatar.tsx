import { useState } from 'react'
import { cn } from '@/utils/cn'
import { RudiBadge } from '@/components/Badge/Badge'
import './avatar.css'

export interface RudiAvatarProps {
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

export function RudiAvatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  className,
}: RudiAvatarProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = src && !imgError
  const initials = name ? getInitials(name) : ''
  const ariaLabel = alt || name

  return (
    <span
      className={cn(
        'rudi-avatar',
        `rudi-avatar--${size}`,
        className,
      )}
      role="img"
      aria-label={ariaLabel}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || ''}
          className="rudi-avatar__image"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="rudi-avatar__initials" aria-hidden="true">
          {initials}
        </span>
      )}
      {status && (
        <RudiBadge
          variant={status}
          dot
          className="rudi-avatar__status"
        />
      )}
    </span>
  )
}
