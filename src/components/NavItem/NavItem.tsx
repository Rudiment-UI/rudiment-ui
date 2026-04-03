import React, { forwardRef } from 'react'
import { useButton, useLink } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import { cn } from '@/utils/cn'
import { Icon } from '@/components/Icon/Icon'
import './nav-item.css'

export interface NavItemProps {
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
    'rudiment-nav-item',
    isActive && 'rudiment-nav-item--active',
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
      {icon && <Icon icon={icon} className="rudiment-nav-item__icon" />}
      <span className="rudiment-nav-item__label">{label}</span>
      {badge && <span className="rudiment-nav-item__badge">{badge}</span>}
    </>
  )
}

const NavItemLink = forwardRef<HTMLAnchorElement, NavItemProps>(
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

const NavItemButton = forwardRef<HTMLButtonElement, NavItemProps>(
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

export const NavItem = forwardRef<HTMLElement, NavItemProps>(
  function NavItem(props, forwardedRef) {
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
