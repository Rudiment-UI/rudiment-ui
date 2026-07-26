import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/utils/cn'
import './image.css'

export interface RudiImageProps {
  src: string
  alt: string
  /** CSS aspect ratio for the frame, e.g. `'16 / 9'`, `'1 / 1'`, `'4 / 3'`. */
  aspectRatio?: CSSProperties['aspectRatio']
  fit?: 'cover' | 'contain'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  loading?: 'lazy' | 'eager'
  /**
   * Content layered over the image (badges, wishlist button, gradient scrim,
   * duotone wash). Rendered in a positioned layer above the picture.
   */
  overlay?: ReactNode
  className?: string
}

export function RudiImage({
  src,
  alt,
  aspectRatio,
  fit = 'cover',
  radius = 'md',
  loading = 'lazy',
  overlay,
  className,
}: RudiImageProps) {
  return (
    <div
      className={cn('rudi-image', `rudi-image--radius-${radius}`, className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={cn('rudi-image__img', `rudi-image__img--${fit}`)}
      />
      {overlay != null && <div className="rudi-image__overlay">{overlay}</div>}
    </div>
  )
}
