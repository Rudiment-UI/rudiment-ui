import { useRef } from 'react'
import { useSelectState, type SelectState } from 'react-stately'
import {
  useSelect,
  useButton,
  useListBox,
  useOption,
  usePopover,
  HiddenSelect,
} from 'react-aria'
import type { RefObject } from 'react'
import type { Key } from 'react-aria'
import { cn } from '@/utils/cn'
import './select.css'

export interface SelectProps<T extends object> {
  label: string
  items: Iterable<T>
  children: (item: T) => React.ReactNode
  selectedKey?: Key | null
  defaultSelectedKey?: Key | null
  onSelectionChange?: (key: Key | null) => void
  placeholder?: string
  description?: string
  errorMessage?: string
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

interface PopoverInternalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: SelectState<any>
  triggerRef: RefObject<HTMLButtonElement | null>
  popoverRef: RefObject<HTMLDivElement | null>
  children: React.ReactNode
}

function Popover({
  state,
  triggerRef,
  popoverRef,
  children,
}: PopoverInternalProps) {
  const { popoverProps } = usePopover({ triggerRef, popoverRef }, state)
  return (
    <div
      {...popoverProps}
      ref={popoverRef}
      className="rudiment-select__popover"
    >
      {children}
    </div>
  )
}

interface ListBoxInternalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: SelectState<any>
  listBoxRef: RefObject<HTMLUListElement | null>
  [key: string]: unknown
}

function ListBox({ state, listBoxRef, ...props }: ListBoxInternalProps) {
  const { listBoxProps } = useListBox(props, state, listBoxRef)
  return (
    <ul {...listBoxProps} ref={listBoxRef} className="rudiment-select__listbox">
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  )
}

interface OptionInternalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: SelectState<any>
}

function Option({ item, state }: OptionInternalProps) {
  const optionRef = useRef<HTMLLIElement>(null)
  const { optionProps, isSelected, isFocused } = useOption(
    { key: item.key },
    state,
    optionRef,
  )
  return (
    <li
      {...optionProps}
      ref={optionRef}
      className="rudiment-select__option"
      data-focused={isFocused}
      aria-selected={isSelected}
    >
      {item.rendered}
    </li>
  )
}

export function Select<T extends object>(props: SelectProps<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state = useSelectState(props as any)
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useSelect(props as any, state, triggerRef)

  const { buttonProps } = useButton(triggerProps, triggerRef)

  return (
    <div className={cn('rudiment-select', props.className)}>
      <label {...labelProps} className="rudiment-select__label">
        {props.label}
      </label>
      <HiddenSelect state={state} triggerRef={triggerRef} label={props.label} />
      <button
        {...buttonProps}
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
