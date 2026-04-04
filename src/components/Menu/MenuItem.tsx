import {
  MenuItem as AriaMenuItem,
  type MenuItemProps as AriaMenuItemProps,
} from 'react-aria-components'
import { cn } from '@/utils/cn'

export interface MenuItemProps extends AriaMenuItemProps {
  isDestructive?: boolean
}

export function MenuItem({ isDestructive, className, ...props }: MenuItemProps) {
  return (
    <AriaMenuItem
      {...props}
      className={(renderProps) =>
        cn(
          'rudiment-menu__item',
          isDestructive && 'rudiment-menu__item--destructive',
          typeof className === 'function' ? className(renderProps) : className,
        )
      }
      data-destructive={isDestructive || undefined}
    />
  )
}
