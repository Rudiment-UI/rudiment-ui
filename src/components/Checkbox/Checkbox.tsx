import { forwardRef } from 'react'
import { useCheckbox } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import { useToggleState } from 'react-stately'
import { cn } from '@/utils/cn'
import './checkbox.css'

export interface CheckboxProps {
  children: React.ReactNode
  isSelected?: boolean
  defaultSelected?: boolean
  isIndeterminate?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  value?: string
  className?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, forwardedRef) {
    const ref = useObjectRef(forwardedRef)
    const state = useToggleState(props)
    const { inputProps } = useCheckbox(props, state, ref)

    return (
      <label
        className={cn(
          'rudiment-checkbox',
          props.isDisabled && 'rudiment-checkbox--disabled',
          props.className,
        )}
      >
        <input {...inputProps} ref={ref} className="rudiment-checkbox__input" />
        <span
          className={cn(
            'rudiment-checkbox__control',
            state.isSelected && 'rudiment-checkbox__control--checked',
            props.isIndeterminate &&
              'rudiment-checkbox__control--indeterminate',
          )}
          aria-hidden="true"
        />
        <span className="rudiment-checkbox__label">{props.children}</span>
      </label>
    )
  },
)
