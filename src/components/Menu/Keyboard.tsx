import type { ComponentProps } from 'react'
import { Keyboard as AriaKeyboard } from 'react-aria-components'
import { cn } from '@/utils/cn'

export type KeyboardProps = ComponentProps<typeof AriaKeyboard>

export function Keyboard({ className, ...props }: KeyboardProps) {
  return (
    <AriaKeyboard
      {...props}
      className={cn('rudiment-menu__item-shortcut', className)}
    />
  )
}
