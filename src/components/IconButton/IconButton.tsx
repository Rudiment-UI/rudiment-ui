import React from 'react'
import { useObjectRef } from '@react-aria/utils'
import type { AriaButtonProps } from 'react-aria'
import { cn } from '@/utils/cn'
import { useLoadingButton } from '@/hooks/useLoadingButton'
import './icon-button.css'

export interface IconButtonProps extends AriaButtonProps {
  'aria-label': string
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  className?: string
  children: React.ReactElement
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      className,
      children,
      ...ariaProps
    },
    forwardedRef,
  ) {
    const ref = useObjectRef(forwardedRef)
    const { buttonProps } = useLoadingButton(ariaProps, isLoading, ref)

    return (
      <button
        {...buttonProps}
        ref={ref}
        className={cn(
          'rudiment-icon-button',
          `rudiment-icon-button--${variant}`,
          `rudiment-icon-button--${size}`,
          className,
        )}
      >
        {children}
      </button>
    )
  },
)
