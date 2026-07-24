import { useCheckboxGroup } from 'react-aria'
import { useCheckboxGroupState } from 'react-stately'
import { cn } from '@/utils/cn'
import './checkbox.css'

export interface RudiCheckboxGroupProps {
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

export function RudiCheckboxGroup(props: RudiCheckboxGroupProps) {
  const state = useCheckboxGroupState(props)
  const { groupProps, labelProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(props, state)

  return (
    <div
      {...groupProps}
      className={cn('rudi-checkbox-group', props.className)}
    >
      <span {...labelProps} className="rudi-checkbox-group__label">
        {props.label}
      </span>
      {props.children}
      {props.description && !props.errorMessage && (
        <p
          {...descriptionProps}
          className="rudi-checkbox-group__description"
        >
          {props.description}
        </p>
      )}
      {props.errorMessage && (
        <p {...errorMessageProps} className="rudi-checkbox-group__error">
          {props.errorMessage}
        </p>
      )}
    </div>
  )
}
