## Chapter 7: Form components

This chapter builds Select, Checkbox, CheckboxGroup, RadioGroup, and Switch. Each one follows the React Aria hook pattern from the previous chapter. The implementations get progressively more complex: Select involves a popover, Checkbox supports indeterminate state, and RadioGroup handles arrow key navigation within a group.

### Select

Select is the most complex form component in the library. It combines multiple React Aria hooks: `useSelect` for the trigger button, `useListBox` for the options list, `useOption` for each individual option, and `usePopover` for the floating panel that contains the list.

```tsx
// src/components/Select/Select.tsx (simplified structure)
// Note: this example references Popover, ListBox, ChevronIcon, and DismissButton
// as helper components internal to the Select implementation. The companion
// repository contains the complete implementations. Here we focus on the hook
// wiring pattern.
import { useRef } from 'react'
import { useSelectState } from 'react-stately'
import {
  useSelect,
  useListBox,
  useOption,
  usePopover,
  HiddenSelect,
} from 'react-aria'
import { cn } from '@/utils/cn'

export interface SelectProps<T extends object> {
  label: string
  items: Iterable<T>
  children: (item: T) => React.ReactNode
  selectedKey?: React.Key
  defaultSelectedKey?: React.Key
  onSelectionChange?: (key: React.Key) => void
  placeholder?: string
  description?: string
  errorMessage?: string
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
}

export function Select<T extends object>(props: SelectProps<T>) {
  const state = useSelectState(props)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)

  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
  } = useSelect(props, state, triggerRef)

  return (
    <div className={cn('rudiment-select', props.className)}>
      <label {...labelProps} className="rudiment-select__label">
        {props.label}
      </label>
      <HiddenSelect state={state} triggerRef={triggerRef} label={props.label} />
      <button
        {...triggerProps}
        ref={triggerRef}
        className={cn(
          'rudiment-select__trigger',
          props.errorMessage && 'rudiment-select__trigger--error',
        )}
      >
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : props.placeholder || 'Select an option'}
        </span>
        <ChevronIcon aria-hidden="true" />
      </button>
      {state.isOpen && (
        <Popover state={state} triggerRef={triggerRef} popoverRef={popoverRef}>
          <ListBox {...menuProps} state={state} listBoxRef={listBoxRef} />
        </Popover>
      )}
      {props.description && !props.errorMessage && (
        <p {...descriptionProps} className="rudiment-select__description">
          {props.description}
        </p>
      )}
      {props.errorMessage && (
        <p {...errorMessageProps} className="rudiment-select__error">
          {props.errorMessage}
        </p>
      )}
    </div>
  )
}
```

The `HiddenSelect` component from React Aria renders a hidden native `<select>` element for form submission compatibility. The visible trigger is a `<button>` that opens the popover. The listbox inside the popover handles arrow key navigation, typeahead (type a letter to jump to matching options), and `Home`/`End` to jump to the first/last option.

This is a lot of code for a select input. That's the point. Getting keyboard navigation, ARIA attributes, popover positioning, and focus management right for a select is genuinely difficult. React Aria handles the behavioral complexity so your component code is mostly rendering and styling.

### Checkbox and CheckboxGroup

```tsx
// src/components/Checkbox/Checkbox.tsx
import { forwardRef } from 'react'
import { useCheckbox } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import { useToggleState } from 'react-stately'
import { cn } from '@/utils/cn'

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
            props.isIndeterminate && 'rudiment-checkbox__control--indeterminate',
          )}
          aria-hidden="true"
        />
        <span className="rudiment-checkbox__label">{props.children}</span>
      </label>
    )
  },
)
```

The hidden native `<input>` provides the actual checkbox behavior. The `rudiment-checkbox__control` span is the visual indicator, styled via CSS to show a checkmark, dash (indeterminate), or empty box. The `aria-hidden="true"` on the visual indicator prevents screen readers from announcing it twice (once for the hidden input, once for the visual).

Using `forwardRef` here lets a parent component call `.focus()` on the underlying input directly, which matters when you need to programmatically focus a checkbox, for example after form validation reveals an error. The React Aria hooks expect a `RefObject<T>`, but `forwardRef` gives you a `ForwardedRef<T>`, which can be either an object ref or a callback ref. `useObjectRef` from `@react-aria/utils` normalizes both forms into the `RefObject` the hooks need, so you get full compatibility without extra boilerplate. `@react-aria/utils` is already a transitive dependency of `react-aria`, so no new package is required.

`CheckboxGroup` wraps multiple checkboxes with a group label:

```tsx
// src/components/Checkbox/CheckboxGroup.tsx
import { useCheckboxGroup } from 'react-aria'
import { useCheckboxGroupState } from 'react-stately'
import { cn } from '@/utils/cn'

export interface CheckboxGroupProps {
  label: string
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
      {props.errorMessage && (
        <p {...errorMessageProps} className="rudiment-checkbox-group__error">
          {props.errorMessage}
        </p>
      )}
    </div>
  )
}
```

### RadioGroup

RadioGroup has an important keyboard behavior difference from individual checkboxes: arrow keys move the selection between radio options within the group, while Tab moves focus into and out of the group (not between options). React Aria handles this automatically.

```tsx
// src/components/RadioGroup/RadioGroup.tsx
import { useRadioGroup } from 'react-aria'
import { useRadioGroupState } from 'react-stately'
import { cn } from '@/utils/cn'

export interface RadioGroupProps {
  label: string
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
      {props.errorMessage && (
        <p {...errorMessageProps} className="rudiment-radio-group__error">
          {props.errorMessage}
        </p>
      )}
    </div>
  )
}
```

The individual `Radio` component uses `useRadio` and receives the group state via React context (set up internally by React Aria). The implementation follows the same hidden-input-plus-visual-indicator pattern as Checkbox.

### Switch

Switch is semantically distinct from Checkbox. A checkbox is a selection control ("agree to terms"). A switch is a toggle control ("enable notifications"). The distinction matters for screen reader users: `role="switch"` communicates a different interaction model than `role="checkbox"`.

```tsx
// src/components/Switch/Switch.tsx
import { forwardRef } from 'react'
import { useSwitch, VisuallyHidden } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import { useToggleState } from 'react-stately'
import { cn } from '@/utils/cn'

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
```

`VisuallyHidden` is a React Aria utility that hides the native input from sight while keeping it accessible to screen readers. The visible switch track and thumb are styled via CSS to animate between on and off positions.

### What you have now

All form components are built: Button, IconButton, Input, Select, Checkbox, CheckboxGroup, RadioGroup, Switch. Each uses React Aria for behavior and accessibility, with your token-driven CSS handling the visual layer. You can compose a complete form using these components inside a Stack:

```tsx
// Example roles data for the Select component
const roles = [
  { id: 'design', name: 'Design' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'product', name: 'Product' },
]

;<Stack space="1.5rem" style={{ maxWidth: '24rem' }}>
  <Input label="Name" isRequired />
  <Input label="Email" type="email" isRequired />
  <Select label="Role" placeholder="Choose a role" items={roles}>
    {(role) => <span key={role.id}>{role.name}</span>}
  </Select>
  <CheckboxGroup label="Interests">
    <Checkbox value="design">Design</Checkbox>
    <Checkbox value="engineering">Engineering</Checkbox>
    <Checkbox value="product">Product</Checkbox>
  </CheckboxGroup>
  <Switch>Receive email updates</Switch>
  <Button variant="primary">Submit</Button>
</Stack>
```
