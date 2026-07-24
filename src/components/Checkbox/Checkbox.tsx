import { forwardRef } from 'react'
import { useCheckbox } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import { useToggleState } from 'react-stately'
import { cn } from '@/utils/cn'
import './checkbox.css'

export interface RudiCheckboxProps {
  children: React.ReactNode
  isSelected?: boolean
  defaultSelected?: boolean
  isIndeterminate?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  value?: string
  className?: string
}

export const RudiCheckbox = forwardRef<HTMLInputElement, RudiCheckboxProps>(
  function RudiCheckbox(props, forwardedRef) {
    const ref = useObjectRef(forwardedRef)
    const state = useToggleState(props)
    const { inputProps } = useCheckbox(props, state, ref)

    return (
      <label
        className={cn(
          'rudi-checkbox',
          props.isDisabled && 'rudi-checkbox--disabled',
          props.className,
        )}
      >
        <input {...inputProps} ref={ref} className="rudi-checkbox__input" />
        <span
          className={cn(
            'rudi-checkbox__control',
            state.isSelected && 'rudi-checkbox__control--checked',
            props.isIndeterminate &&
              'rudi-checkbox__control--indeterminate',
          )}
          aria-hidden="true"
        />
        <span className="rudi-checkbox__label">{props.children}</span>
      </label>
    )
  },
)
