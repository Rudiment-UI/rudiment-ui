import {
  MenuItem as AriaMenuItem,
  type MenuItemProps as AriaMenuItemProps,
} from 'react-aria-components'
import { cn } from '@/utils/cn'

export interface RudiMenuItemProps extends AriaMenuItemProps {
  isDestructive?: boolean
}

export function RudiMenuItem({ isDestructive, className, ...props }: RudiMenuItemProps) {
  return (
    <AriaMenuItem
      {...props}
      className={(renderProps) =>
        cn(
          'rudi-menu__item',
          isDestructive && 'rudi-menu__item--destructive',
          typeof className === 'function' ? className(renderProps) : className,
        )
      }
      data-destructive={isDestructive || undefined}
    />
  )
}
