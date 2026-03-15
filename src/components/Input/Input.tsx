import React from 'react'
import { useTextField } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import { cn } from '@/utils/cn'
import './input.css'

export interface InputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search' | 'number'
  placeholder?: string
  description?: string
  errorMessage?: string
  isRequired?: boolean
  isDisabled?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      type = 'text',
      placeholder,
      description,
      errorMessage,
      isRequired = false,
      isDisabled = false,
      value,
      defaultValue,
      onChange,
      className,
    },
    forwardedRef,
  ) {
    const ref = useObjectRef(forwardedRef)
    const {
      labelProps,
      inputProps,
      descriptionProps,
      errorMessageProps,
      isInvalid,
    } = useTextField(
      {
        label,
        type,
        placeholder,
        description,
        errorMessage,
        isRequired,
        isDisabled,
        value,
        defaultValue,
        onChange,
        isInvalid: !!errorMessage,
      },
      ref,
    )

    return (
      <div className={cn('rudiment-input', className)}>
        <label {...labelProps} className="rudiment-input__label">
          {label}
          {isRequired && (
            <span className="rudiment-input__required" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>
        <input
          {...inputProps}
          ref={ref}
          className={cn(
            'rudiment-input__field',
            isInvalid && 'rudiment-input__field--error',
          )}
        />
        {description && !isInvalid && (
          <p {...descriptionProps} className="rudiment-input__description">
            {description}
          </p>
        )}
        {isInvalid && errorMessage && (
          <p {...errorMessageProps} className="rudiment-input__error">
            {errorMessage}
          </p>
        )}
      </div>
    )
  },
)
