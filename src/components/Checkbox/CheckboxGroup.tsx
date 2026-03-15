import { useCheckboxGroup } from 'react-aria'
import { useCheckboxGroupState } from 'react-stately'
import { cn } from '@/utils/cn'
import './checkbox.css'

export interface CheckboxGroupProps {
  label: string
  description?: string
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  isDisabled?: boolean
  errorMessage?: string
  children: React.ReactNode
  className?: string
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const state = useCheckboxGroupState(props)
  const { groupProps, labelProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(props, state)

  return (
    <div
      {...groupProps}
      className={cn('rudiment-checkbox-group', props.className)}
    >
      <span {...labelProps} className="rudiment-checkbox-group__label">
        {props.label}
      </span>
      {props.children}
      {props.description && !props.errorMessage && (
        <p
          {...descriptionProps}
          className="rudiment-checkbox-group__description"
        >
          {props.description}
        </p>
      )}
      {props.errorMessage && (
        <p {...errorMessageProps} className="rudiment-checkbox-group__error">
          {props.errorMessage}
        </p>
      )}
    </div>
  )
}
