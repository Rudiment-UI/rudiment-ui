import {
  MenuTrigger as AriaMenuTrigger,
  type MenuTriggerProps as AriaMenuTriggerProps,
} from 'react-aria-components'

export interface RudiMenuTriggerProps extends AriaMenuTriggerProps {}

export function RudiMenuTrigger(props: RudiMenuTriggerProps) {
  return <AriaMenuTrigger {...props} />
}
