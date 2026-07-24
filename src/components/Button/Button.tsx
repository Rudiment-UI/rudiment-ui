import React from 'react'
import { useObjectRef } from '@react-aria/utils'
import type { AriaButtonProps } from 'react-aria'
import { cn } from '@/utils/cn'
import { RudiIcon } from '@/components/Icon/Icon'
import { useLoadingButton } from '@/hooks/useLoadingButton'
import './button.css'

export interface RudiButtonProps extends AriaButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  iconBefore?: string
  iconAfter?: string
  className?: string
  children: React.ReactNode
}

export const RudiButton = React.forwardRef<HTMLButtonElement, RudiButtonProps>(
  function RudiButton(
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
          'rudi-button',
          `rudi-button--${variant}`,
          `rudi-button--${size}`,
          isLoading && 'rudi-button--loading',
          className,
        )}
      >
        {isLoading ? (
          <>
            <span className="rudi-button__spinner" role="img" aria-hidden="true" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {iconBefore && <RudiIcon icon={iconBefore} size={size} className="rudi-button__icon" />}
            <span>{children}</span>
            {iconAfter && <RudiIcon icon={iconAfter} size={size} className="rudi-button__icon" />}
          </>
        )}
      </button>
    )
  },
)
