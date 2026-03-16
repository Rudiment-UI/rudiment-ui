import { useButton } from 'react-aria'
import type { AriaButtonProps } from 'react-aria'
import type { RefObject } from 'react'

export function useLoadingButton(
  ariaProps: AriaButtonProps,
  isLoading: boolean,
  ref: RefObject<HTMLButtonElement | null>,
) {
  const { buttonProps } = useButton(
    { ...ariaProps, isDisabled: ariaProps.isDisabled || isLoading },
    ref,
  )
  return {
    buttonProps: {
      ...buttonProps,
      'aria-busy': isLoading || undefined,
    },
  }
}
