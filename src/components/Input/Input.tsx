import React from 'react'
import { useTextField } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import { cn } from '@/utils/cn'
import './input.css'

export interface RudiInputProps {
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

export const RudiInput = React.forwardRef<HTMLInputElement, RudiInputProps>(
  function RudiInput(
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
      <div className={cn('rudi-input', className)}>
        <label {...labelProps} className="rudi-input__label">
          {label}
          {isRequired && (
            <span className="rudi-input__required" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>
        <input
          {...inputProps}
          ref={ref}
          className={cn(
            'rudi-input__field',
            isInvalid && 'rudi-input__field--error',
          )}
        />
        {description && !isInvalid && (
          <p {...descriptionProps} className="rudi-input__description">
            {description}
          </p>
        )}
        {isInvalid && errorMessage && (
          <p {...errorMessageProps} className="rudi-input__error">
            {errorMessage}
          </p>
        )}
      </div>
    )
  },
)
