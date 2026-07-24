import type { ComponentProps } from 'react'
import { Keyboard as AriaKeyboard } from 'react-aria-components'
import { cn } from '@/utils/cn'

export type RudiKeyboardProps = ComponentProps<typeof AriaKeyboard>

export function RudiKeyboard({ className, ...props }: RudiKeyboardProps) {
  return (
    <AriaKeyboard
      {...props}
      className={cn('rudi-menu__item-shortcut', className)}
    />
  )
}
