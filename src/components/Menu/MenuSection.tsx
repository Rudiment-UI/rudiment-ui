import {
  MenuSection as AriaMenuSection,
  type MenuSectionProps as AriaMenuSectionProps,
  Header,
  Collection,
} from 'react-aria-components'
import { cn } from '@/utils/cn'

export interface MenuSectionProps<T extends object>
  extends AriaMenuSectionProps<T> {
  title?: string
  className?: string
}

export function MenuSection<T extends object>({
  title,
  className,
  children,
  ...props
}: MenuSectionProps<T>) {
  return (
    <AriaMenuSection {...props} className={cn('rudiment-menu__section', className)}>
      {title && (
        <Header className="rudiment-menu__section-header">{title}</Header>
      )}
      <Collection items={props.items}>{children}</Collection>
    </AriaMenuSection>
  )
}
