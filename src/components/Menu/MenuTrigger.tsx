import {
  MenuTrigger as AriaMenuTrigger,
  type MenuTriggerProps as AriaMenuTriggerProps,
} from 'react-aria-components'

export interface MenuTriggerProps extends AriaMenuTriggerProps {}

export function MenuTrigger(props: MenuTriggerProps) {
  return <AriaMenuTrigger {...props} />
}
