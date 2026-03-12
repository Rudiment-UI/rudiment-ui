# Recommended solution for forwardRef issue

To address the lack of `forwardRef` in the primitive and UI components, we can create a utility function that wraps `React.forwardRef` and adds support for polymorphic `as` prop. This will allow all components to forward refs properly while maintaining their flexibility.

## Polymorphic forwardRef utility

```typescript
import {
  forwardRef,
  ElementType,
  ComponentPropsWithRef,
  ReactNode,
  Ref,
} from 'react'

export type AsProp<C extends ElementType> = {
  as?: C
}

export type PolymorphicProps<C extends ElementType, Props = {}> = Props &
  AsProp<C> &
  Omit<ComponentPropsWithRef<C>, keyof AsProp<C> | 'as'>

export function polymorphicForwardRef<C extends ElementType, Props = {}>(
  render: (props: PolymorphicProps<C, Props>, ref: Ref<any>) => ReactNode,
) {
  return forwardRef((props: PolymorphicProps<C, Props>, ref: Ref<any>) => {
    return render(props, ref)
  }) as <T extends ElementType = C>(
    props: PolymorphicProps<T, Props>,
  ) => ReactNode
}
```

## Usage in components

### Stack.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';
import { Children, cloneElement, isValidElement } from 'react';

export interface StackProps {
  space?: string;
  recursive?: boolean;
  splitAfter?: number;
  children?: React.ReactNode;
}

export const Stack = polymorphicForwardRef<'div', StackProps>(
  (
    {
      space,
      recursive = false,
      splitAfter,
      as: Element = 'div',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const customProperties: Record<string, string> = {};
    if (space) customProperties['--stack-space'] = space;

    const styledChildren = splitAfter
      ? Children.map(children, (child, index) => {
          if (index === splitAfter - 1 && isValidElement(child)) {
            return cloneElement(child as any, {
              style: {
                ...(child.props as any).style,
                marginBlockEnd: 'auto',
              },
            });
          }
          return child;
        })
      : children;

    return (
      <Element
        ref={ref}
        className={cn(
          'rudiment-stack',
          recursive && 'rudiment-stack--recursive',
          splitAfter && 'rudiment-stack--split',
          className
        )}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {styledChildren}
      </Element>
    );
  }
);
```

### Box.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface BoxProps {
  padding?: string;
  bordered?: boolean;
  invert?: boolean;
  children?: React.ReactNode;
}

export const Box = polymorphicForwardRef<'div', BoxProps>(
  (
    {
      padding,
      bordered = false,
      invert = false,
      as: Element = 'div',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const customProperties: Record<string, string> = {};
    if (padding) customProperties['--box-padding'] = padding;

    return (
      <Element
        ref={ref}
        className={cn(
          'rudiment-box',
          bordered && 'rudiment-box--bordered',
          invert && 'rudiment-box--invert',
          className
        )}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </Element>
    );
  }
);
```

### Center.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface CenterProps {
  maxWidth?: string;
  gutters?: string;
  intrinsic?: boolean;
  children?: React.ReactNode;
}

export const Center = polymorphicForwardRef<'div', CenterProps>(
  (
    {
      maxWidth,
      gutters,
      intrinsic = false,
      as: Element = 'div',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const customProperties: Record<string, string> = {};
    if (maxWidth) customProperties['--center-max-width'] = maxWidth;
    if (gutters) customProperties['--center-gutters'] = gutters;

    return (
      <Element
        ref={ref}
        className={cn(
          'rudiment-center',
          intrinsic && 'rudiment-center--intrinsic',
          className
        )}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </Element>
    );
  }
);
```

### Heading.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export const Heading = polymorphicForwardRef<'h1', HeadingProps>(
  ({ level, size, className, children, ...props }, ref) => {
    const Element = `h${level}` as const;
    const visualSize = size ?? level;

    return (
      <Element
        ref={ref}
        className={cn(`rudiment-heading rudiment-heading--${visualSize}`, className)}
        {...props}
      >
        {children}
      </Element>
    );
  }
);
```

### Text.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface TextProps {
  variant?: 'body' | 'body-sm' | 'caption' | 'overline' | 'code';
  children: React.ReactNode;
}

export const Text = polymorphicForwardRef<'p', TextProps>(
  ({ variant = 'body', as: Element = 'p', className, children, ...props }, ref) => (
    <Element
      ref={ref}
      className={cn(`rudiment-text rudiment-text--${variant}`, className)}
      {...props}
    >
      {children}
    </Element>
  )
);
```

### Prose.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface ProseProps {
  size?: 'sm' | 'base' | 'lg';
  children: React.ReactNode;
}

export const Prose = polymorphicForwardRef<'div', ProseProps>(
  ({ size = 'base', as: Element = 'div', className, children, ...props }, ref) => (
    <Element
      ref={ref}
      className={cn(
        'rudiment-prose',
        size !== 'base' && `rudiment-prose--${size}`,
        className
      )}
      {...props}
    >
      {children}
    </Element>
  )
);
```

### Cluster.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface ClusterProps {
  /** Space between items (horizontal + vertical when wrapping). Defaults to layout token. */
  space?: string;
  /** Horizontal alignment of the cluster. */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  /** Vertical alignment of items in each row. */
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  children?: React.ReactNode;
}

export const Cluster = polymorphicForwardRef<'div', ClusterProps>(
  (
    {
      space,
      justify,
      align,
      as: Element = 'div',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const customProperties: Record<string, string> = {};
    if (space) customProperties['--cluster-space'] = space;
    if (justify) customProperties['--cluster-justify'] = justify;
    if (align) customProperties['--cluster-align'] = align;

    return (
      <Element
        ref={ref}
        className={cn('rudiment-cluster', className)}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </Element>
    );
  }
);
```

### Sidebar.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface SidebarProps {
  /** Which side the fixed-width panel sits on. */
  side?: 'left' | 'right';
  /** Width of the sidebar panel. Defaults to layout token. */
  sideWidth?: string;
  /** Minimum width of the content panel before stacking. Defaults to layout token. */
  contentMin?: string;
  /** Space between panels. Defaults to stack token (for consistency). */
  space?: string;
  /** Prevent the sidebar from stretching to full height. */
  noStretch?: boolean;
  children?: React.ReactNode;
}

export const Sidebar = polymorphicForwardRef<'div', SidebarProps>(
  (
    {
      side = 'left',
      sideWidth,
      contentMin,
      space,
      noStretch = false,
      as: Element = 'div',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const customProperties: Record<string, string> = {};
    if (sideWidth) customProperties['--sidebar-width'] = sideWidth;
    if (contentMin) customProperties['--sidebar-content-min'] = contentMin;
    if (space) customProperties['--sidebar-space'] = space;

    return (
      <Element
        ref={ref}
        className={cn(
          'rudiment-sidebar',
          side === 'right' && 'rudiment-sidebar--right',
          noStretch && 'rudiment-sidebar--no-stretch',
          className
        )}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </Element>
    );
  }
);
```

### Switcher.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface SwitcherProps {
  /** Container width at which children switch from horizontal to vertical. Defaults to layout token. */
  threshold?: string;
  /** Space between children. Defaults to cluster token (consistent with Cluster). */
  space?: string;
  /** (Advanced) Maximum number of columns before forcing wrap. Not enforced in core CSS (see stories for nth-child example). */
  limit?: number;
  children?: React.ReactNode;
}

export const Switcher = polymorphicForwardRef<'div', SwitcherProps>(
  (
    {
      threshold,
      space,
      limit,
      as: Element = 'div',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const customProperties: Record<string, string> = {};
    if (threshold) customProperties['--switcher-threshold'] = threshold;
    if (space) customProperties['--switcher-space'] = space;

    return (
      <Element
        ref={ref}
        className={cn('rudiment-switcher', className)}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </Element>
    );
  }
);
```

### Grid.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface GridProps {
  /** Minimum width of each grid cell. Defaults to layout token. */
  minCellWidth?: string;
  /** Gap between cells. Defaults to cluster token. */
  space?: string;
  children?: React.ReactNode;
}

export const Grid = polymorphicForwardRef<'div', GridProps>(
  (
    {
      minCellWidth,
      space,
      as: Element = 'div',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const customProperties: Record<string, string> = {};
    if (minCellWidth) customProperties['--grid-min-cell'] = minCellWidth;
    if (space) customProperties['--grid-space'] = space;

    return (
      <Element
        ref={ref}
        className={cn('rudiment-grid', className)}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </Element>
    );
  }
);
```

### Cover.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface CoverProps {
  /** Minimum height of the cover container. Defaults to layout token (usually 100vh). */
  minHeight?: string;
  /** Spacing around header/footer and between sections. Defaults to stack token. */
  space?: string;
  children?: React.ReactNode;
}

export const Cover = polymorphicForwardRef<'div', CoverProps>(
  (
    {
      minHeight,
      space,
      as: Element = 'div',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const customProperties: Record<string, string> = {};
    if (minHeight) customProperties['--cover-min-height'] = minHeight;
    if (space) customProperties['--cover-space'] = space;

    return (
      <Element
        ref={ref}
        className={cn('rudiment-cover', className)}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </Element>
    );
  }
);
```

### Button.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { type AriaButtonProps } from '@react-types/button';
import { type ReactNode } from 'react';

export interface ButtonProps extends AriaButtonProps {
  /** Visual variant. */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Loading state (uses aria-busy). */
  isLoading?: boolean;
  /** Icon shown before text (optional). */
  icon?: ReactNode;
  children?: ReactNode;
}

export const Button = polymorphicForwardRef<'button', ButtonProps>(
  (
    {
      variant = 'primary',
      isLoading = false,
      icon,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { buttonProps, isPressed } = useButton(props, ref as any);
    const { focusProps, isFocusVisible } = useFocusRing();

    const mergedProps = mergeProps(buttonProps, focusProps);

    return (
      <button
        ref={ref}
        {...mergedProps}
        className={cn(
          'rudiment-button',
          `rudiment-button--${variant}`,
          isLoading && 'rudiment-button--loading',
          isPressed && 'rudiment-button--pressed',
          isFocusVisible && 'rudiment-button--focus-visible',
          className
        )}
        style={style}
        aria-busy={isLoading}
        disabled={props.isDisabled || isLoading}
      >
        {isLoading ? (
          <span className="rudiment-button-spinner" aria-hidden="true" />
        ) : (
          icon
        )}
        {children}
      </button>
    );
  }
);
```

### IconButton.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { type AriaButtonProps } from '@react-types/button';
import { type ReactNode } from 'react';

export interface IconButtonProps extends AriaButtonProps {
  /** Icon (required for IconButton). */
  icon: ReactNode;
  /** Accessible label (always required). */
  'aria-label': string;
}

export const IconButton = polymorphicForwardRef<'button', IconButtonProps>(
  ({ icon, className, style, ...props }, ref) => {
    const { buttonProps, isPressed } = useButton(props, ref as any);
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <button
        ref={ref}
        {...mergeProps(buttonProps, focusProps)}
        className={cn(
          'rudiment-icon-button',
          isPressed && 'rudiment-icon-button--pressed',
          isFocusVisible && 'rudiment-icon-button--focus-visible',
          className
        )}
        style={style}
        aria-label={props['aria-label']}
      >
        {icon}
      </button>
    );
  }
);
```

### Input.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';
import { useTextField } from '@react-aria/textfield';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { type AriaTextFieldProps } from '@react-types/textfield';
import { useRef } from 'react';

export interface InputProps extends AriaTextFieldProps {
  /** Input type (text, email, password, etc.). */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
}

export const Input = polymorphicForwardRef<'input', InputProps>(
  (
    {
      type = 'text',
      label,
      description,
      errorMessage,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { labelProps, inputProps, descriptionProps, errorMessageProps } =
      useTextField({ ...props, type, label, description, errorMessage }, inputRef);

    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <div className="rudiment-input-group">
        {label && <label {...labelProps} className="rudiment-input-label">{label}</label>}

        <input
          ref={ref || inputRef}
          {...mergeProps(inputProps, focusProps)}
          type={type}
          className={cn(
            'rudiment-input',
            isFocusVisible && 'rudiment-input--focus-visible',
            errorMessage && 'rudiment-input--error',
            className
          )}
          style={style}
        />

        {description && (
          <div {...descriptionProps} className="rudiment-input-description">
            {description}
          </div>
        )}
        {errorMessage && (
          <div {...errorMessageProps} className="rudiment-input-error">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);
```

### Checkbox.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { type AriaCheckboxProps } from '@react-types/checkbox';
import { useRef } from 'react';

export interface CheckboxProps extends AriaCheckboxProps {
  children?: React.ReactNode;
}

export const Checkbox = polymorphicForwardRef<'label', CheckboxProps>(
  ({ children, className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { inputProps, labelProps, isSelected } = useCheckbox(props, inputRef);
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <label
        ref={ref}
        {...labelProps}
        className={cn('rudiment-checkbox', className)}
      >
        <input
          ref={inputRef}
          {...mergeProps(inputProps, focusProps)}
          type="checkbox"
          className={cn(
            'rudiment-checkbox-input',
            isFocusVisible && 'rudiment-checkbox-input--focus-visible'
          )}
        />
        <span className={cn('rudiment-checkbox-box', isSelected && 'rudiment-checkbox-box--checked')} />
        {children}
      </label>
    );
  }
);
```

### Switch.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';
import { useSwitch } from '@react-aria/switch';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { type AriaSwitchProps } from '@react-types/switch';
import { useRef } from 'react';

export interface SwitchProps extends AriaSwitchProps {
  children?: React.ReactNode;
}

export const Switch = polymorphicForwardRef<'label', SwitchProps>(
  ({ children, className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { inputProps, labelProps, isSelected } = useSwitch(props, inputRef);
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <label
        ref={ref}
        {...labelProps}
        className={cn('rudiment-switch', className)}
      >
        <input
          ref={inputRef}
          {...mergeProps(inputProps, focusProps)}
          type="checkbox"
          className="rudiment-switch-input"
        />
        <span
          className={cn(
            'rudiment-switch-track',
            isSelected && 'rudiment-switch-track--on',
            isFocusVisible && 'rudiment-switch-track--focus-visible'
          )}
        >
          <span className="rudiment-switch-thumb" />
        </span>
        {children}
      </label>
    );
  }
);
```

### RadioGroup.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';
import { type AriaRadioGroupProps } from '@react-types/radio';
import { createContext, useContext } from 'react';

type RadioGroupContextValue = ReturnType<typeof useRadioGroupState>;

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends AriaRadioGroupProps {
  children: React.ReactNode;
}

export const RadioGroup = polymorphicForwardRef<'div', RadioGroupProps>(
  ({ children, className, ...props }, ref) => {
    const state = useRadioGroupState(props);
    const { radioGroupProps, labelProps } = useRadioGroup(props, state);

    return (
      <div ref={ref} {...radioGroupProps} className={cn('rudiment-radio-group', className)}>
        {props.label && <div {...labelProps} className="rudiment-radio-group-label">{props.label}</div>}
        <RadioGroupContext.Provider value={state}>
          {children}
        </RadioGroupContext.Provider>
      </div>
    );
  }
);
```

### Radio.tsx

```typescript
import { useRadio } from '@react-aria/radio';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useContext, useRef } from 'react';
import { RadioGroupContext } from './RadioGroup';
import { cn } from '@/utils/cn';

export interface RadioProps {
  value: string;
  children: React.ReactNode;
}

export function Radio({ value, children, ...props }: RadioProps) {
  const state = useContext(RadioGroupContext);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps, isSelected } = useRadio({ value, ...props }, state!, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <label className="rudiment-radio-label">
      <input
        ref={ref}
        {...mergeProps(inputProps, focusProps)}
        type="radio"
        className={cn('rudiment-radio-input', isFocusVisible && 'rudiment-radio-input--focus-visible')}
      />
      <span className={cn('rudiment-radio-circle', isSelected && 'rudiment-radio-circle--checked')} />
      {children}
    </label>
  );
}
```

### Select.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';
import { useSelect } from '@react-aria/select';
import { useSelectState } from '@react-stately/select';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { type AriaSelectProps } from '@react-types/select';
import { useRef } from 'react';

export interface SelectProps extends AriaSelectProps<any> {}

export const Select = polymorphicForwardRef<'button', SelectProps>(
  (props, ref) => {
    const state = useSelectState(props);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { triggerProps, valueProps, menuProps } = useSelect(props, state, triggerRef);
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <div className="rudiment-select-group">
        <button
          ref={ref || triggerRef}
          {...mergeProps(triggerProps, focusProps)}
          className={cn(
            'rudiment-select-trigger',
            isFocusVisible && 'rudiment-select-trigger--focus-visible'
          )}
        >
          <span {...valueProps}>{state.selectedItem ? state.selectedItem.rendered : props.placeholder}</span>
          <span className="rudiment-select-chevron">▼</span>
        </button>

        {state.isOpen && (
          <ul
            {...menuProps}
            className="rudiment-select-popover"
            style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10 }}
          >
            {/* In a real app, use <ListBox> + Popover from Chapter 8. This is the minimal working version. */}
            {[...state.collection].map((item) => (
              <li key={item.key} className="rudiment-select-option">
                {item.rendered}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
```

### Dialog.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';
import { useDialog, useModalOverlay, OverlayContainer, usePreventScroll } from 'react-aria';
import { useRef } from 'react';
import type { OverlayTriggerState } from 'react-stately';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isDismissable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Dialog = polymorphicForwardRef<'div', DialogProps>(
  (
    {
      isOpen,
      onClose,
      title,
      isDismissable = true,
      size = 'md',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    usePreventScroll({ isDisabled: !isOpen });

    // Minimal state shape required by useModalOverlay
    const state: OverlayTriggerState = {
      isOpen,
      close: onClose,
      open: () => {},
      toggle: () => {},
      setOpen: () => {},
    };

    const { modalProps, underlayProps } = useModalOverlay({ isDismissable }, state, overlayRef);
    const { dialogProps, titleProps } = useDialog({}, dialogRef);

    if (!isOpen) return null;

    return (
      <OverlayContainer>
        <div
          {...underlayProps}
          className="rudiment-dialog-overlay"
          ref={overlayRef}
        >
          <div
            ref={ref || dialogRef}
            {...modalProps}
            {...dialogProps}
            className={cn('rudiment-dialog', `rudiment-dialog--${size}`, className)}
            {...props}
          >
            <h2 {...titleProps} className="rudiment-dialog-title">
              {title}
            </h2>
            <div className="rudiment-dialog-body">{children}</div>
          </div>
        </div>
      </OverlayContainer>
    );
  }
);
```

### Tooltip.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';
import { useTooltipTrigger, useTooltip as useTooltipAria, mergeProps } from 'react-aria';
import { useTooltipTriggerState } from 'react-stately';
import { useRef, cloneElement, type ReactElement } from 'react';

export interface TooltipTriggerProps {
  delay?: number;
  closeDelay?: number;
  children: [ReactElement, ReactElement]; // [trigger, tooltipContent]
}

export const TooltipTrigger = ({ delay = 500, closeDelay = 0, children }: TooltipTriggerProps) => {
  const state = useTooltipTriggerState({ delay, closeDelay });
  const triggerRef = useRef<HTMLElement>(null);

  const { triggerProps, tooltipProps: triggerTooltipProps } = useTooltipTrigger(
    { delay, closeDelay },
    state,
    triggerRef
  );

  const [trigger, tooltip] = children;

  return (
    <span className="rudiment-tooltip-trigger">
      {cloneElement(trigger, mergeProps(triggerProps, { ref: triggerRef }))}
      {state.isOpen && cloneElement(tooltip, triggerTooltipProps)}
    </span>
  );
};

export interface TooltipProps {
  children: React.ReactNode;
}

export const Tooltip = polymorphicForwardRef<'span', TooltipProps>(
  ({ children, className, ...props }, ref) => {
    const { tooltipProps } = useTooltipAria(props);

    return (
      <span
        ref={ref}
        {...tooltipProps}
        className={cn('rudiment-tooltip', className)}
        role="tooltip"
      >
        {children}
      </span>
    );
  }
);
```

### Alert.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  isPolite?: boolean;
  children: React.ReactNode;
}

export const Alert = polymorphicForwardRef<'div', AlertProps>(
  ({ variant, title, isPolite = false, children, className, ...props }, ref) => (
    <div
      ref={ref}
      role={isPolite ? 'status' : 'alert'}
      className={cn('rudiment-alert', `rudiment-alert--${variant}`, className)}
      {...props}
    >
      {title && <div className="rudiment-alert-title">{title}</div>}
      <div className="rudiment-alert-body">{children}</div>
    </div>
  )
);
```

### Badge.tsx

```typescript
import { polymorphicForwardRef } from '@/utils/polymorphic';
import { cn } from '@/utils/cn';

export interface BadgeProps {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  children: React.ReactNode;
}

export const Badge = polymorphicForwardRef<'span', BadgeProps>(
  ({ variant = 'neutral', children, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('rudiment-badge', `rudiment-badge--${variant}`, className)}
      {...props}
    >
      {children}
    </span>
  )
);
```
