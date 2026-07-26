import { Separator, type SeparatorProps } from 'react-aria-components'
import { cn } from '@/utils/cn'

export interface RudiMenuSeparatorProps extends SeparatorProps {}

export function RudiMenuSeparator({ className, ...props }: RudiMenuSeparatorProps) {
  return (
    <Separator
      {...props}
      className={cn('rudi-menu__separator', className)}
    />
  )
}
