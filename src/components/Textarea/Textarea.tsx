import React from 'react'
import { useTextField } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import { cn } from '@/utils/cn'
import './textarea.css'

export interface RudiTextareaProps {
  label: string
  placeholder?: string
  description?: string
  errorMessage?: string
  isRequired?: boolean
  isDisabled?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  rows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  className?: string
}

export const RudiTextarea = React.forwardRef<
  HTMLTextAreaElement,
  RudiTextareaProps
>(function RudiTextarea(
  {
    label,
    placeholder,
    description,
    errorMessage,
    isRequired = false,
    isDisabled = false,
    value,
    defaultValue,
    onChange,
    rows = 4,
    resize = 'vertical',
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
      placeholder,
      description,
      errorMessage,
      isRequired,
      isDisabled,
      value,
      defaultValue,
      onChange,
      isInvalid: !!errorMessage,
      inputElementType: 'textarea',
    },
    ref,
  )

  return (
    <div className={cn('rudi-textarea', className)}>
      <label {...labelProps} className="rudi-textarea__label">
        {label}
        {isRequired && (
          <span className="rudi-textarea__required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      <textarea
        {...inputProps}
        ref={ref}
        rows={rows}
        className={cn(
          'rudi-textarea__field',
          `rudi-textarea__field--resize-${resize}`,
          isInvalid && 'rudi-textarea__field--error',
        )}
      />
      {description && !isInvalid && (
        <p {...descriptionProps} className="rudi-textarea__description">
          {description}
        </p>
      )}
      {isInvalid && errorMessage && (
        <p {...errorMessageProps} className="rudi-textarea__error">
          {errorMessage}
        </p>
      )}
    </div>
  )
})
