import React, { forwardRef, useContext } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useRadio } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'
import type { AriaRadioProps } from 'react-aria'
import { RadioGroup, RadioGroupContext } from './RadioGroup'
import './radio-group.css'

// Minimal Radio component for story demonstration.
// A companion Radio component is expected in this directory alongside RadioGroup.
interface RadioProps extends AriaRadioProps {
  children: React.ReactNode
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, forwardedRef) {
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
})

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    isDisabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} label="Shipping speed">
      <Radio value="standard">Standard (5–7 days)</Radio>
      <Radio value="express">Express (2–3 days)</Radio>
      <Radio value="overnight">Overnight (next day)</Radio>
    </RadioGroup>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <RadioGroup label="Plan" description="You can change your plan at any time.">
      <Radio value="starter">Starter — free forever</Radio>
      <Radio value="pro">Pro — $12/month</Radio>
      <Radio value="enterprise">Enterprise — contact us</Radio>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup label="Size" orientation="horizontal">
      <Radio value="xs">XS</Radio>
      <Radio value="s">S</Radio>
      <Radio value="m">M</Radio>
      <Radio value="l">L</Radio>
      <Radio value="xl">XL</Radio>
    </RadioGroup>
  ),
}

export const WithError: Story = {
  render: () => (
    <RadioGroup label="Shipping speed" errorMessage="Please select a shipping option.">
      <Radio value="standard">Standard (5–7 days)</Radio>
      <Radio value="express">Express (2–3 days)</Radio>
      <Radio value="overnight">Overnight (next day)</Radio>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup label="Region" isDisabled>
      <Radio value="us">United States</Radio>
      <Radio value="eu">Europe</Radio>
      <Radio value="ap">Asia Pacific</Radio>
    </RadioGroup>
  ),
}
