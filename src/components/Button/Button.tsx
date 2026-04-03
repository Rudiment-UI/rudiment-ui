import React from 'react'
import { useObjectRef } from '@react-aria/utils'
import type { AriaButtonProps } from 'react-aria'
import { cn } from '@/utils/cn'
import { Icon } from '@/components/Icon/Icon'
import { useLoadingButton } from '@/hooks/useLoadingButton'
import './button.css'

export interface ButtonProps extends AriaButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  iconBefore?: string
  iconAfter?: string
  className?: string
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      iconBefore,
      iconAfter,
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
          'rudiment-button',
          `rudiment-button--${variant}`,
          `rudiment-button--${size}`,
          isLoading && 'rudiment-button--loading',
          className,
        )}
      >
        {isLoading ? (
          <>
            <span className="rudiment-button__spinner" role="img" aria-hidden="true" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {iconBefore && <Icon icon={iconBefore} size={size} className="rudiment-button__icon" />}
            <span>{children}</span>
            {iconAfter && <Icon icon={iconAfter} size={size} className="rudiment-button__icon" />}
          </>
        )}
      </button>
    )
  },
)
