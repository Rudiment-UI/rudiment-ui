import {
  SubmenuTrigger as AriaSubmenuTrigger,
  type SubmenuTriggerProps as AriaSubmenuTriggerProps,
} from 'react-aria-components'

export interface RudiSubmenuTriggerProps extends AriaSubmenuTriggerProps {}

export function RudiSubmenuTrigger(props: RudiSubmenuTriggerProps) {
  return <AriaSubmenuTrigger {...props} />
}
