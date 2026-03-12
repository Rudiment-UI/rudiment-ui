## Chapter 6: Accessible components with React Aria

Layout primitives handle spatial arrangement. UI components handle interaction. This chapter introduces React Aria and uses it to build the two most fundamental interactive components: Button and Input. The pattern you learn here applies to every interactive component in the library.

### Installing React Aria

```bash
npm install react-aria react-stately
```

`react-aria` provides the hooks that manage keyboard interaction, focus behavior, and ARIA attributes. `react-stately` provides the state management hooks that React Aria depends on (for example, tracking whether a select is open or which tab is selected).

### How React Aria hooks work

React Aria hooks return props objects that you spread onto your DOM elements. The hook manages the complex interaction logic, and you manage the rendering. Here's the concept, simplified:

```tsx
const { buttonProps } = useButton({ onPress, isDisabled }, ref)
return (
  <button {...buttonProps} ref={ref}>
    Click me
  </button>
)
```

The `buttonProps` object includes `onClick`, `onKeyDown`, `tabIndex`, `aria-disabled`, and other attributes that the hook calculates based on the state you pass in. You don't manage these attributes manually. React Aria handles the edge cases (pointer type normalization, touch delay cancellation, keyboard activation) so you don't have to discover them in production.

### Building Button

```tsx
// src/components/Button/Button.tsx
import { useRef } from 'react'
import { useButton } from 'react-aria'
import type { AriaButtonProps } from 'react-aria'
import { cn } from '@/utils/cn'

export interface ButtonProps extends AriaButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  className?: string
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  ...ariaProps
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(
    { ...ariaProps, isDisabled: ariaProps.isDisabled || isLoading },
    ref,
  )

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={cn(
        'rudiment-button',
        `rudiment-button--${variant}`,
        `rudiment-button--${size}`,
        isLoading && 'rudiment-button--loading',
        className,
      )}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? (
        <>
          <span className="rudiment-button__spinner" aria-hidden="true" />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
```

Key points in this implementation:

**`useButton` normalizes press events.** The hook provides `onPress` instead of `onClick`. The difference matters. `onClick` fires on mouse click and Enter key, but its behavior varies across pointer types and browsers. `onPress` fires consistently for mouse, touch, and keyboard, with proper handling for touch delay cancellation and preventing double-fires on Android.

**Loading state disables the button.** When `isLoading` is true, the button is effectively disabled (it won't fire `onPress`), but it uses `aria-busy="true"` instead of `aria-disabled` to communicate that the button is processing rather than permanently unavailable. Screen readers announce this differently.

**The focus ring.** React Aria handles focus management, but the visible focus indicator is a CSS concern. The component's CSS uses `:focus-visible` rather than `:focus`:

```css
.rudiment-button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

`:focus-visible` shows the focus ring only for keyboard navigation, not for mouse clicks. This is the correct behavior. Mouse users don't need a focus indicator because they can see where they're clicking. Keyboard users need the ring to track their position.

### Button CSS

Component CSS references the Tailwind @theme variable names (for example, `--color-brand-primary`), not the `--token-`-prefixed Style Dictionary output. Tailwind's `@theme inline` directive bridges the two: when you use `var(--color-brand-primary)` in CSS or `bg-brand-primary` as a utility class, Tailwind resolves it through the @theme mapping to the underlying token value.

```css
.rudiment-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color 150ms,
    color 150ms;
  border: 1px solid transparent;
}

.rudiment-button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.rudiment-button[aria-disabled='true'] {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Sizes */
.rudiment-button--sm {
  padding: 0.25rem 0.75rem;
  font-size: var(--font-size-sm);
}
.rudiment-button--md {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
}
.rudiment-button--lg {
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-base);
}

/* Variants */
.rudiment-button--primary {
  background-color: var(--color-brand-primary);
  color: var(--color-text-on-brand);
}
.rudiment-button--primary:hover:not([aria-disabled='true']) {
  background-color: var(--color-brand-primary-hover);
}

.rudiment-button--secondary {
  background-color: var(--color-background-surface);
  color: var(--color-text-default);
  border-color: var(--color-border-default);
}
.rudiment-button--secondary:hover:not([aria-disabled='true']) {
  background-color: var(--color-background-surface-raised);
}

.rudiment-button--destructive {
  background-color: var(--color-feedback-error);
  color: var(--color-text-on-brand);
}

.rudiment-button--ghost {
  background-color: transparent;
  color: var(--color-text-default);
}
.rudiment-button--ghost:hover:not([aria-disabled='true']) {
  background-color: var(--color-background-surface-raised);
}

/* Loading */
.rudiment-button--loading {
  position: relative;
}

.rudiment-button__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: rudiment-spin 600ms linear infinite;
}

@keyframes rudiment-spin {
  to {
    transform: rotate(360deg);
  }
}
```

Notice that every color references a semantic token, not a global one. `var(--color-brand-primary)`, not `var(--color-blue-500)`. This means a buyer can rebrand the entire library by changing the semantic token aliases, without touching any component CSS.

### Building Input

```tsx
// src/components/Input/Input.tsx
import { useRef } from 'react'
import { useTextField } from 'react-aria'
import { cn } from '@/utils/cn'

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

export function Input({
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
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null)
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
}
```

`useTextField` handles all the ARIA wiring. The hook:

- Associates the label with the input via matching `id` and `htmlFor` attributes.
- Links the description and error message to the input via `aria-describedby`.
- Sets `aria-required="true"` when `isRequired` is true.
- Sets `aria-invalid="true"` when `isInvalid` is true.
- Returns `isInvalid` so you can use it for conditional rendering and styling.

You don't set any of these attributes manually. The hook returns them inside `inputProps`, `labelProps`, `descriptionProps`, and `errorMessageProps`, and you spread them onto the corresponding elements.

The error state is conditional: when `isInvalid` is true (which happens when `errorMessage` is passed), the input shows the error message and hides the description. When the input is valid, it shows the description (if one exists). This prevents screen readers from announcing both the description and the error simultaneously.

### IconButton

IconButton follows the same pattern as Button, but requires an `aria-label` because it has no visible text:

```tsx
// src/components/IconButton/IconButton.tsx
import { useRef } from 'react'
import { useButton } from 'react-aria'
import type { AriaButtonProps } from 'react-aria'
import { cn } from '@/utils/cn'

export interface IconButtonProps extends AriaButtonProps {
  'aria-label': string
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  className?: string
  children: React.ReactElement
}

export function IconButton({
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  className,
  children,
  ...ariaProps
}: IconButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(
    { ...ariaProps, isDisabled: ariaProps.isDisabled || isLoading },
    ref,
  )

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={cn(
        'rudiment-icon-button',
        `rudiment-icon-button--${variant}`,
        `rudiment-icon-button--${size}`,
        className,
      )}
      aria-busy={isLoading || undefined}
    >
      {children}
    </button>
  )
}
```

The `'aria-label': string` type (without the `?` optional marker) forces consumers to provide an accessible label. TypeScript will produce a compile error if they forget. This is a deliberate design choice: an icon-only button without an accessible name is invisible to screen reader users, and making it a required prop prevents that failure mode at development time rather than in an accessibility audit.

### What you have now

Three interactive components (Button, IconButton, Input), each built on React Aria. The pattern is consistent: import a hook, pass state and configuration, spread the returned props onto your elements. React Aria handles the ARIA attributes, keyboard behavior, and focus management. You handle the rendering and styling.

The next chapter builds the remaining form components using the same approach.
