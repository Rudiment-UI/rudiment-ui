import React, { forwardRef, useRef } from 'react'
import {
  useTooltipTrigger,
  useTooltip as useTooltipAria,
} from 'react-aria'
import { useTooltipTriggerState } from 'react-stately'
import { cn } from '@/utils/cn'
import './tooltip.css'

export interface TooltipTriggerProps {
  delay?: number
  closeDelay?: number
  children: [React.ReactElement, React.ReactElement]
}

export const TooltipTrigger = forwardRef<HTMLSpanElement, TooltipTriggerProps>(
  function TooltipTrigger({ delay = 500, closeDelay = 0, children }, ref) {
    const state = useTooltipTriggerState({ delay, closeDelay })
    const triggerRef = useRef<HTMLElement>(null)
    const { triggerProps, tooltipProps: triggerTooltipProps } =
      useTooltipTrigger({ delay, closeDelay }, state, triggerRef)

    const [trigger, tooltip] = children
    const { 'aria-describedby': ariaDescribedBy, tabIndex: _tabIndex, ...eventProps } = triggerProps

    return (
      <span ref={ref} className="rudiment-tooltip-trigger" {...eventProps}>
        {React.cloneElement(trigger as React.ReactElement<Record<string, unknown>>, {
          ref: triggerRef,
          'aria-describedby': ariaDescribedBy,
        })}
        {state.isOpen && React.cloneElement(tooltip, triggerTooltipProps)}
      </span>
    )
  },
)

export interface TooltipProps {
  children: React.ReactNode
  className?: string
}

export const Tooltip = forwardRef<
  HTMLSpanElement,
  TooltipProps & Record<string, unknown>
>(function Tooltip({ children, className, ...props }, ref) {
  const { tooltipProps } = useTooltipAria(props)

  return (
    <span
      {...tooltipProps}
      ref={ref}
      className={cn('rudiment-tooltip', className)}
      role="tooltip"
    >
      {children}
    </span>
  )
})
