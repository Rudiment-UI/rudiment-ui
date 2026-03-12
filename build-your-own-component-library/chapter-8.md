## Chapter 8: Overlays and feedback

This chapter builds Dialog, Tooltip, Alert, Badge, Card, and Tabs. These components round out the library's coverage: modal interactions, informational overlays, status feedback, content containers, and tabbed navigation.

### Dialog

The Dialog (modal) is the most complex overlay component. It requires focus trapping (Tab cycles within the dialog, not outside it), scroll locking (the page behind the dialog doesn't scroll), Escape to close, focus restoration (focus returns to the trigger when the dialog closes), and `aria-modal="true"` to tell screen readers that content outside the dialog is inert.

```tsx
// src/components/Dialog/Dialog.tsx
import { useRef } from 'react'
import {
  useDialog,
  useModalOverlay,
  OverlayContainer,
  usePreventScroll,
} from 'react-aria'
import { useOverlayTriggerState } from 'react-stately'
import type { OverlayTriggerState } from 'react-stately'
import { cn } from '@/utils/cn'

export interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  isDismissable?: boolean
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export function Dialog({
  isOpen,
  onClose,
  title,
  isDismissable = true,
  size = 'md',
  children,
  className,
}: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  usePreventScroll({ isDisabled: !isOpen })

  // Create a state object compatible with useModalOverlay
  const state: OverlayTriggerState = {
    isOpen,
    close: onClose,
    open: () => {},
    toggle: () => {},
    setOpen: () => {},
  }

  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable },
    state,
    overlayRef,
  )

  const { dialogProps, titleProps } = useDialog({}, dialogRef)

  if (!isOpen) return null

  return (
    <OverlayContainer>
      <div
        {...underlayProps}
        className="rudiment-dialog__overlay"
        ref={overlayRef}
      >
        <div
          {...modalProps}
          {...dialogProps}
          ref={dialogRef}
          className={cn(
            'rudiment-dialog',
            `rudiment-dialog--${size}`,
            className,
          )}
        >
          <h2 {...titleProps} className="rudiment-dialog__title">
            {title}
          </h2>
          <div className="rudiment-dialog__body">{children}</div>
        </div>
      </div>
    </OverlayContainer>
  )
}
```

`useModalOverlay` handles focus trapping and Escape dismissal. `usePreventScroll` locks body scrolling. `OverlayContainer` from React Aria renders the dialog into a portal (appended to the document body), which prevents z-index stacking context issues.

The dialog is controlled-only (`isOpen` and `onClose` are required props). This is a deliberate choice. Uncontrolled dialogs (that manage their own open state) prevent the consumer from coordinating dialog visibility with the rest of their application state.

### Tooltip

```tsx
// src/components/Tooltip/Tooltip.tsx
import React, { useRef } from 'react'
import {
  useTooltipTrigger,
  useTooltip as useTooltipAria,
  mergeProps,
} from 'react-aria'
import { useTooltipTriggerState } from 'react-stately'
import { cn } from '@/utils/cn'

export interface TooltipTriggerProps {
  delay?: number
  closeDelay?: number
  children: [React.ReactElement, React.ReactElement]
}

export function TooltipTrigger({
  delay = 500,
  closeDelay = 0,
  children,
}: TooltipTriggerProps) {
  const state = useTooltipTriggerState({ delay, closeDelay })
  const triggerRef = useRef<HTMLElement>(null)
  const { triggerProps, tooltipProps: triggerTooltipProps } = useTooltipTrigger(
    { delay, closeDelay },
    state,
    triggerRef,
  )

  const [trigger, tooltip] = children

  return (
    <span className="rudiment-tooltip-trigger">
      {React.cloneElement(
        trigger,
        mergeProps(triggerProps, { ref: triggerRef }),
      )}
      {state.isOpen && React.cloneElement(tooltip, triggerTooltipProps)}
    </span>
  )
}

export interface TooltipProps {
  children: React.ReactNode
  className?: string
}

export function Tooltip({
  children,
  className,
  ...props
}: TooltipProps & Record<string, unknown>) {
  const { tooltipProps } = useTooltipAria(props)

  return (
    <span
      {...tooltipProps}
      className={cn('rudiment-tooltip', className)}
      role="tooltip"
    >
      {children}
    </span>
  )
}
```

The tooltip appears on hover (after the configured delay) and on focus. It hides on pointer leave, blur, Escape, or scroll. React Aria manages the timing and the `aria-describedby` relationship between the trigger and the tooltip content.

### Alert

Alert is the simplest component in the library. It's semantic HTML with styling:

```tsx
// src/components/Alert/Alert.tsx
import { cn } from '@/utils/cn'

export interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error'
  title?: string
  isPolite?: boolean
  children: React.ReactNode
  className?: string
}

export function Alert({
  variant,
  title,
  isPolite = false,
  children,
  className,
}: AlertProps) {
  return (
    <div
      role={isPolite ? 'status' : 'alert'}
      className={cn('rudiment-alert', `rudiment-alert--${variant}`, className)}
    >
      {title && <p className="rudiment-alert__title">{title}</p>}
      <div className="rudiment-alert__content">{children}</div>
    </div>
  )
}
```

`role="alert"` triggers an assertive announcement in screen readers: the alert content is read immediately, interrupting whatever the screen reader was doing. `role="status"` (via `isPolite`) triggers a polite announcement: the content is read at the next natural pause. Use `role="alert"` for errors that need immediate attention. Use `role="status"` for success messages and informational updates.

### Badge, Card, and Tabs

Badge is a presentational `<span>` with variant styling and an optional `aria-label` for standalone usage. Card is a `<div>` (or `<article>` via `as`) with optional interactive behavior via `usePress`. Tabs combine `useTabList`, `useTab`, and `useTabPanel` for keyboard-navigable tabbed content.

These components follow the patterns already established. Badge and Card are simpler versions of the components you've already built. Tabs is structurally similar to RadioGroup: a group component that manages state, with child components that participate in that state via React Aria context.

The full implementations are in the companion repository. The patterns don't vary from what you've seen in chapters 6 and 7.

### What you have now

All 14 UI components are built. Combined with the 8 layout primitives and 3 typography components from chapters 4, 5, and 5b, the library has 25 components total. Every interactive component uses React Aria for keyboard and screen reader support. Every component references design tokens for its visual properties. Every layout primitive responds to its container's available space without media queries.

The next chapter configures Storybook to document and demonstrate the entire system.
