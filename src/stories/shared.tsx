import React, { forwardRef, useContext } from 'react'
import { useRadio } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import type { AriaRadioProps } from 'react-aria'

import { RudiBox } from '../layouts/Box/Box'
import { Icon } from '@iconify/react'
import { RudiCenter } from '../layouts/Center/Center'
import { RudiCluster } from '../layouts/Cluster/Cluster'
import { RudiHeading } from '../typography/Heading/Heading'
import { RudiText } from '../typography/Text/Text'
import { RudiStack } from '../layouts/Stack/Stack'
import { RudiButton } from '../components/Button/Button'
import { RudiAvatar } from '../components/Avatar/Avatar'
import { RudiBadge } from '../components/Badge/Badge'
import { RudiNavItem } from '../components/NavItem/NavItem'
import { RudiMenuTrigger } from '../components/Menu/MenuTrigger'
import { RudiMenu } from '../components/Menu/Menu'
import { RudiMenuItem } from '../components/Menu/MenuItem'
import { RudiMenuSeparator } from '../components/Menu/MenuSeparator'
import { RadioGroupContext } from '../components/RadioGroup/RadioGroup'
import '../components/RadioGroup/radio-group.css'

// ---------------------------------------------------------------------------
// Shared placeholder helpers
// ---------------------------------------------------------------------------

export function NavLogo() {
  return (
    <RudiCluster space="0.25rem" align="center">
      <Icon icon="game-icons:circle-cage" width="20" height="20" />
      <RudiHeading level={1} size={4} style={{ margin: 0 }}>
        Rudiment-UI
      </RudiHeading>
    </RudiCluster>
  )
}

export function AppHeader() {
  return (
    <RudiBox
      as="header"
      bordered
      style={{
        borderRadius: 0,
        borderInline: 'none',
        borderBlockStart: 'none',
      }}
    >
      <RudiCenter>
        <RudiCluster justify="space-between" align="center">
          <NavLogo />
          <RudiCluster as="nav" space="0.25rem">
            <RudiButton variant="ghost" size="sm">
              Features
            </RudiButton>
            <RudiButton variant="ghost" size="sm">
              Pricing
            </RudiButton>
            <RudiButton variant="ghost" size="sm">
              Docs
            </RudiButton>
          </RudiCluster>
          <RudiCluster space="0.5rem" align="center">
            <RudiBadge variant="info" size="sm">
              Beta
            </RudiBadge>
            <RudiButton variant="secondary" size="sm">
              Log in
            </RudiButton>
            <RudiMenuTrigger>
              <RudiButton variant="ghost" size="sm" aria-label="User menu">
                <RudiAvatar name="Jane Smith" size="sm" status="success" />
              </RudiButton>
              <RudiMenu onAction={(key) => alert(key)}>
                <RudiMenuItem id="profile" icon="lucide:user" label="Profile" shortcut="⌘P" />
                <RudiMenuItem id="settings" icon="lucide:settings" label="Settings" />
                <RudiMenuItem id="billing" icon="lucide:credit-card" label="Billing" />
                <RudiMenuSeparator />
                <RudiMenuItem id="sign-out" icon="lucide:log-out" label="Sign out" isDestructive />
              </RudiMenu>
            </RudiMenuTrigger>
          </RudiCluster>
        </RudiCluster>
      </RudiCenter>
    </RudiBox>
  )
}

export function AppFooter() {
  return (
    <RudiBox
      as="footer"
      style={{
        borderBlockStart: '1px solid var(--rudi-color-border-default)',
      }}
    >
      <RudiCenter>
        <RudiCluster justify="space-between" align="flex-start">
          <RudiStack space="0.5rem">
            <RudiCluster space="0.25rem" align="center">
              <Icon icon="game-icons:circle-cage" width="16" height="16" />
              <RudiHeading level={2} size={3} style={{ margin: 0 }}>
                Rudiment-UI
              </RudiHeading>
            </RudiCluster>
            <RudiText variant="caption">Building better software, together.</RudiText>
          </RudiStack>
          <RudiCluster space="3rem" align="flex-start">
            <RudiStack space="0.5rem">
              <RudiText variant="overline">Product</RudiText>
              <RudiText variant="body-sm" as="a" href="#">
                Features
              </RudiText>
              <RudiText variant="body-sm" as="a" href="#">
                Pricing
              </RudiText>
              <RudiText variant="body-sm" as="a" href="#">
                Changelog
              </RudiText>
            </RudiStack>
            <RudiStack space="0.5rem">
              <RudiText variant="overline">Company</RudiText>
              <RudiText variant="body-sm" as="a" href="#">
                About
              </RudiText>
              <RudiText variant="body-sm" as="a" href="#">
                Blog
              </RudiText>
              <RudiText variant="body-sm" as="a" href="#">
                Careers
              </RudiText>
            </RudiStack>
            <RudiStack space="0.5rem">
              <RudiText variant="overline">Legal</RudiText>
              <RudiText variant="body-sm" as="a" href="#">
                Privacy
              </RudiText>
              <RudiText variant="body-sm" as="a" href="#">
                Terms
              </RudiText>
            </RudiStack>
          </RudiCluster>
        </RudiCluster>
        <RudiText variant="caption" style={{ marginBlockStart: '2rem' }}>
          © 2026 Rudiment-UI, Inc. All rights reserved.
        </RudiText>
      </RudiCenter>
    </RudiBox>
  )
}

export function SidebarNav() {
  const items = [
    { label: 'Overview', icon: 'lucide:home' },
    { label: 'Analytics', icon: 'lucide:bar-chart-2' },
    { label: 'Projects', icon: 'lucide:folder' },
    { label: 'Team', icon: 'lucide:users' },
    { label: 'Settings', icon: 'lucide:settings' },
  ]
  return (
    <RudiBox as="nav" style={{ blockSize: '100%' }}>
      <RudiStack space="0.25rem">
        <RudiText variant="overline" style={{ marginBlockEnd: '0.5rem' }}>
          Navigation
        </RudiText>
        {items.map((item, i) => (
          <RudiNavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            isActive={i === 0}
          />
        ))}
      </RudiStack>
    </RudiBox>
  )
}

// ---------------------------------------------------------------------------
// Radio — no standalone component file yet
// ---------------------------------------------------------------------------

interface RadioProps extends AriaRadioProps {
  children: React.ReactNode
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio(props, forwardedRef) {
    const state = useContext(RadioGroupContext)!
    const ref = useObjectRef(forwardedRef)
    const { inputProps } = useRadio(props, state, ref)
    return (
      <label
        className={`rudi-radio${props.isDisabled ? ' rudi-radio--disabled' : ''}`}
      >
        <input {...inputProps} ref={ref} className="rudi-radio__input" />
        <span
          className={`rudi-radio__control${state.selectedValue === props.value ? ' rudi-radio__control--selected' : ''}`}
          aria-hidden="true"
        />
        <span className="rudi-radio__label">{props.children}</span>
      </label>
    )
  },
)
