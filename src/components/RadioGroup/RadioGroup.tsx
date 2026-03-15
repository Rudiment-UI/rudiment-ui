import { createContext } from 'react'
import { useRadioGroup } from 'react-aria'
import { useRadioGroupState } from 'react-stately'
import type { RadioGroupState } from 'react-stately'
import { cn } from '@/utils/cn'
import './radio-group.css'

export const RadioGroupContext = createContext<RadioGroupState | null>(null)

export interface RadioGroupProps {
  label: string
  description?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  isDisabled?: boolean
  errorMessage?: string
  children: React.ReactNode
  className?: string
}

export function RadioGroup(props: RadioGroupProps) {
  const state = useRadioGroupState(props)
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state)

  return (
    <RadioGroupContext.Provider value={state}>
      <div
        {...radioGroupProps}
        className={cn('rudiment-radio-group', props.className)}
      >
        <span {...labelProps} className="rudiment-radio-group__label">
          {props.label}
        </span>
        <div
          className={cn(
            'rudiment-radio-group__options',
            props.orientation === 'horizontal' &&
              'rudiment-radio-group__options--horizontal',
          )}
        >
          {props.children}
        </div>
        {props.description && !props.errorMessage && (
          <p {...descriptionProps} className="rudiment-radio-group__description">
            {props.description}
          </p>
        )}
        {props.errorMessage && (
          <p {...errorMessageProps} className="rudiment-radio-group__error">
            {props.errorMessage}
          </p>
        )}
      </div>
    </RadioGroupContext.Provider>
  )
}
