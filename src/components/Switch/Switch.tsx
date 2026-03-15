import { forwardRef } from 'react'
import { useSwitch, VisuallyHidden } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import { useToggleState } from 'react-stately'
import { cn } from '@/utils/cn'
import './switch.css'

export interface SwitchProps {
  children: React.ReactNode
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  className?: string
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(props, forwardedRef) {
    const ref = useObjectRef(forwardedRef)
    const state = useToggleState(props)
    const { inputProps } = useSwitch(props, state, ref)

    return (
      <label
        className={cn(
          'rudiment-switch',
          props.isDisabled && 'rudiment-switch--disabled',
          props.className,
        )}
      >
        <VisuallyHidden>
          <input {...inputProps} ref={ref} />
        </VisuallyHidden>
        <span
          className={cn(
            'rudiment-switch__track',
            state.isSelected && 'rudiment-switch__track--on',
          )}
          aria-hidden="true"
        >
          <span className="rudiment-switch__thumb" />
        </span>
        <span className="rudiment-switch__label">{props.children}</span>
      </label>
    )
  },
)
