import React, { forwardRef, useContext } from 'react'
import { useRadio } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import type { AriaRadioProps } from 'react-aria'

import { Box } from '../layouts/Box/Box'
import { Icon } from '@iconify/react'
import { Center } from '../layouts/Center/Center'
import { Cluster } from '../layouts/Cluster/Cluster'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { Stack } from '../layouts/Stack/Stack'
import { Button } from '../components/Button/Button'
import { Avatar } from '../components/Avatar/Avatar'
import { Badge } from '../components/Badge/Badge'
import { NavItem } from '../components/NavItem/NavItem'
import { RadioGroupContext } from '../components/RadioGroup/RadioGroup'
import '../components/RadioGroup/radio-group.css'

// ---------------------------------------------------------------------------
// Shared placeholder helpers
// ---------------------------------------------------------------------------

export function NavLogo() {
  return (
    <Cluster space="0.25rem" align="center">
      <Icon icon="game-icons:circle-cage" width="20" height="20" />
      <Heading level={1} size={4} style={{ margin: 0 }}>
        Rudiment-UI
      </Heading>
    </Cluster>
  )
}

export function AppHeader() {
  return (
    <Box
      as="header"
      bordered
      style={{
        borderRadius: 0,
        borderInline: 'none',
        borderBlockStart: 'none',
      }}
    >
      <Center>
        <Cluster justify="space-between" align="center">
          <NavLogo />
          <Cluster as="nav" space="0.25rem">
            <Button variant="ghost" size="sm">
              Features
            </Button>
            <Button variant="ghost" size="sm">
              Pricing
            </Button>
            <Button variant="ghost" size="sm">
              Docs
            </Button>
          </Cluster>
          <Cluster space="0.5rem" align="center">
            <Badge variant="info" size="sm">
              Beta
            </Badge>
            <Button variant="secondary" size="sm">
              Log in
            </Button>
            <Avatar name="Jane Smith" size="sm" status="success" />
          </Cluster>
        </Cluster>
      </Center>
    </Box>
  )
}

export function AppFooter() {
  return (
    <Box
      as="footer"
      style={{
        borderBlockStart: '1px solid var(--token-color-border-default)',
      }}
    >
      <Center>
        <Cluster justify="space-between" align="flex-start">
          <Stack space="0.5rem">
            <Cluster space="0.25rem" align="center">
              <Icon icon="game-icons:circle-cage" width="16" height="16" />
              <Heading level={2} size={3} style={{ margin: 0 }}>
                Rudiment-UI
              </Heading>
            </Cluster>
            <Text variant="caption">Building better software, together.</Text>
          </Stack>
          <Cluster space="3rem" align="flex-start">
            <Stack space="0.5rem">
              <Text variant="overline">Product</Text>
              <Text variant="body-sm" as="a" href="#">
                Features
              </Text>
              <Text variant="body-sm" as="a" href="#">
                Pricing
              </Text>
              <Text variant="body-sm" as="a" href="#">
                Changelog
              </Text>
            </Stack>
            <Stack space="0.5rem">
              <Text variant="overline">Company</Text>
              <Text variant="body-sm" as="a" href="#">
                About
              </Text>
              <Text variant="body-sm" as="a" href="#">
                Blog
              </Text>
              <Text variant="body-sm" as="a" href="#">
                Careers
              </Text>
            </Stack>
            <Stack space="0.5rem">
              <Text variant="overline">Legal</Text>
              <Text variant="body-sm" as="a" href="#">
                Privacy
              </Text>
              <Text variant="body-sm" as="a" href="#">
                Terms
              </Text>
            </Stack>
          </Cluster>
        </Cluster>
        <Text variant="caption" style={{ marginBlockStart: '2rem' }}>
          © 2026 Rudiment-UI, Inc. All rights reserved.
        </Text>
      </Center>
    </Box>
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
    <Box as="nav" style={{ blockSize: '100%' }}>
      <Stack space="0.25rem">
        <Text variant="overline" style={{ marginBlockEnd: '0.5rem' }}>
          Navigation
        </Text>
        {items.map((item, i) => (
          <NavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            isActive={i === 0}
          />
        ))}
      </Stack>
    </Box>
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
        className={`rudiment-radio${props.isDisabled ? ' rudiment-radio--disabled' : ''}`}
      >
        <input {...inputProps} ref={ref} className="rudiment-radio__input" />
        <span
          className={`rudiment-radio__control${state.selectedValue === props.value ? ' rudiment-radio__control--selected' : ''}`}
          aria-hidden="true"
        />
        <span className="rudiment-radio__label">{props.children}</span>
      </label>
    )
  },
)
