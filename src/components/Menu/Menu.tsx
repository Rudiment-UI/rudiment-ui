import {
  Menu as AriaMenu,
  type MenuProps as AriaMenuProps,
  Popover,
} from 'react-aria-components'
import { cn } from '@/utils/cn'
import './menu.css'

export interface MenuProps<T extends object> extends AriaMenuProps<T> {
  className?: string
}

export function Menu<T extends object>({ className, ...props }: MenuProps<T>) {
  return (
    <Popover className="rudiment-menu__popover">
      <AriaMenu
        {...props}
        className={cn('rudiment-menu__list', className)}
      />
    </Popover>
  )
}
