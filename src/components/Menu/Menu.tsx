import {
  Menu as AriaMenu,
  type MenuProps as AriaMenuProps,
  Popover,
} from 'react-aria-components'
import { cn } from '@/utils/cn'
import './menu.css'

export interface RudiMenuProps<T extends object> extends AriaMenuProps<T> {
  className?: string
}

export function RudiMenu<T extends object>({ className, ...props }: RudiMenuProps<T>) {
  return (
    <Popover className="rudi-menu__popover">
      <AriaMenu
        {...props}
        className={cn('rudi-menu__list', className)}
      />
    </Popover>
  )
}
