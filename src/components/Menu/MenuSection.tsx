import {
  MenuSection as AriaMenuSection,
  type MenuSectionProps as AriaMenuSectionProps,
  Header,
  Collection,
} from 'react-aria-components'
import { cn } from '@/utils/cn'

export interface RudiMenuSectionProps<T extends object>
  extends AriaMenuSectionProps<T> {
  title?: string
  className?: string
}

export function RudiMenuSection<T extends object>({
  title,
  className,
  children,
  ...props
}: RudiMenuSectionProps<T>) {
  return (
    <AriaMenuSection {...props} className={cn('rudi-menu__section', className)}>
      {title && (
        <Header className="rudi-menu__section-header">{title}</Header>
      )}
      <Collection items={props.items}>{children}</Collection>
    </AriaMenuSection>
  )
}
