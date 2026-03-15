import { forwardRef, useRef } from 'react'
import {
  useDialog,
  useModalOverlay,
  OverlayContainer,
  usePreventScroll,
  FocusScope,
} from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import type { OverlayTriggerState } from 'react-stately'
import { cn } from '@/utils/cn'
import './dialog.css'

export interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  isDismissable?: boolean
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  {
    isOpen,
    onClose,
    title,
    isDismissable = true,
    size = 'md',
    children,
    className,
  }: DialogProps,
  ref,
) {
  const underlayRef = useRef<HTMLDivElement>(null)
  const dialogRef = useObjectRef(ref)

  usePreventScroll({ isDisabled: !isOpen })

  // Create a state object compatible with useModalOverlay
  const state: OverlayTriggerState = {
    isOpen,
    close: onClose,
    open: () => {},
    toggle: () => {},
    setOpen: () => {},
  }

  // dialogRef must point to the modal element (not the underlay) so that
  // useModalOverlay can correctly detect clicks outside the dialog panel.
  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable },
    state,
    dialogRef,
  )

  const { dialogProps, titleProps } = useDialog({}, dialogRef)

  if (!isOpen) return null

  return (
    <OverlayContainer>
      <div
        {...underlayProps}
        ref={underlayRef}
        className="rudiment-dialog__overlay"
      >
        {/* FocusScope provides tab trapping and restores focus on close */}
        <FocusScope contain restoreFocus autoFocus>
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
        </FocusScope>
      </div>
    </OverlayContainer>
  )
})
