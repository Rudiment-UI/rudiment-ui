import type { ReactNode } from 'react'
import {
  MenuItem as AriaMenuItem,
  Text,
  type MenuItemProps as AriaMenuItemProps,
} from 'react-aria-components'
import { cn } from '@/utils/cn'
import { RudiIcon } from '../Icon/Icon'
import { RudiKeyboard } from './Keyboard'

export interface RudiMenuItemProps extends AriaMenuItemProps {
  isDestructive?: boolean
  /** Iconify icon name rendered before the label. */
  icon?: string
  /** Primary text. When set, content is composed for you (no need to pass children). */
  label?: ReactNode
  /** Secondary text shown beneath the label. */
  description?: ReactNode
  /** Keyboard shortcut hint shown at the trailing edge. */
  shortcut?: ReactNode
}

export function RudiMenuItem({
  isDestructive,
  icon,
  label,
  description,
  shortcut,
  className,
  textValue,
  children,
  ...props
}: RudiMenuItemProps) {
  const isStructured =
    label != null || icon != null || description != null || shortcut != null

  // RAC needs a textValue for typeahead when children aren't a plain string.
  const resolvedTextValue =
    textValue ?? label ?? (typeof children === 'string' ? children : undefined)

  return (
    <AriaMenuItem
      {...props}
      textValue={resolvedTextValue}
      className={(renderProps) =>
        cn(
          'rudi-menu__item',
          isDestructive && 'rudi-menu__item--destructive',
          typeof className === 'function' ? className(renderProps) : className,
        )
      }
      data-destructive={isDestructive || undefined}
    >
      {isStructured ? (
        <>
          {icon && <RudiIcon icon={icon} className="rudi-menu__item-icon" />}
          {(label != null || description != null) && (
            <span className="rudi-menu__item-content">
              {label != null && (
                <Text slot="label" className="rudi-menu__item-label">
                  {label}
                </Text>
              )}
              {description != null && (
                <Text slot="description" className="rudi-menu__item-description">
                  {description}
                </Text>
              )}
            </span>
          )}
          {shortcut != null && <RudiKeyboard>{shortcut}</RudiKeyboard>}
        </>
      ) : (
        children
      )}
    </AriaMenuItem>
  )
}
