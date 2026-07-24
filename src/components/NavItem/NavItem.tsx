import React, { forwardRef } from 'react'
import { useButton, useLink } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import { cn } from '@/utils/cn'
import { RudiIcon } from '@/components/Icon/Icon'
import './nav-item.css'

export interface RudiNavItemProps {
  label: string
  icon?: string
  isActive?: boolean
  href?: string
  onPress?: () => void
  badge?: React.ReactNode
  isDisabled?: boolean
  className?: string
}

function getClasses(isActive: boolean, className?: string) {
  return cn(
    'rudi-nav-item',
    isActive && 'rudi-nav-item--active',
    className,
  )
}

function renderContent(
  icon?: string,
  label?: string,
  badge?: React.ReactNode,
) {
  return (
    <>
      {icon && <RudiIcon icon={icon} className="rudi-nav-item__icon" />}
      <span className="rudi-nav-item__label">{label}</span>
      {badge && <span className="rudi-nav-item__badge">{badge}</span>}
    </>
  )
}

const NavItemLink = forwardRef<HTMLAnchorElement, RudiNavItemProps>(
  function NavItemLink(
    { label, icon, isActive = false, href, onPress, badge, isDisabled = false, className },
    forwardedRef,
  ) {
    const ref = useObjectRef(forwardedRef)
    const { linkProps } = useLink(
      { href, isDisabled, onPress: onPress as () => void },
      ref,
    )

    return (
      <a
        {...linkProps}
        ref={ref}
        href={href}
        className={getClasses(isActive, className)}
      >
        {renderContent(icon, label, badge)}
      </a>
    )
  },
)

const NavItemButton = forwardRef<HTMLButtonElement, RudiNavItemProps>(
  function NavItemButton(
    { label, icon, isActive = false, onPress, badge, isDisabled = false, className },
    forwardedRef,
  ) {
    const ref = useObjectRef(forwardedRef)
    const { buttonProps } = useButton(
      { onPress, isDisabled },
      ref,
    )

    return (
      <button
        {...buttonProps}
        ref={ref}
        className={getClasses(isActive, className)}
      >
        {renderContent(icon, label, badge)}
      </button>
    )
  },
)

export const RudiNavItem = forwardRef<HTMLElement, RudiNavItemProps>(
  function RudiNavItem(props, forwardedRef) {
    if (props.href) {
      return (
        <NavItemLink
          {...props}
          ref={forwardedRef as React.ForwardedRef<HTMLAnchorElement>}
        />
      )
    }
    return (
      <NavItemButton
        {...props}
        ref={forwardedRef as React.ForwardedRef<HTMLButtonElement>}
      />
    )
  },
)
