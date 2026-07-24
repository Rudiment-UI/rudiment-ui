import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiButton } from './Button'

describe('Button', () => {
  it('sets aria-busy when loading', () => {
    render(<RudiButton isLoading>Save</RudiButton>)
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'aria-busy',
      'true',
    )
  })

  it('does not call onPress while loading', async () => {
    const onPress = vi.fn()
    render(
      <RudiButton isLoading onPress={onPress}>
        Save
      </RudiButton>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('renders a visible loading indicator', () => {
    render(<RudiButton isLoading>Save</RudiButton>)
    expect(screen.getByRole('button')).toContainElement(
      screen.getByRole('img', { hidden: true }),
    )
  })

  it('renders iconBefore', () => {
    render(<RudiButton iconBefore="mdi:plus">Add item</RudiButton>)
    const button = screen.getByRole('button', { name: 'Add item' })
    const icons = button.querySelectorAll('.rudi-icon')
    expect(icons).toHaveLength(1)
    expect(icons[0].nextElementSibling?.textContent).toBe('Add item')
  })

  it('renders iconAfter', () => {
    render(<RudiButton iconAfter="mdi:arrow-right">Next</RudiButton>)
    const button = screen.getByRole('button', { name: 'Next' })
    const icons = button.querySelectorAll('.rudi-icon')
    expect(icons).toHaveLength(1)
    expect(icons[0].previousElementSibling?.textContent).toBe('Next')
  })

  it('renders both iconBefore and iconAfter', () => {
    render(
      <RudiButton iconBefore="mdi:plus" iconAfter="mdi:arrow-right">
        Action
      </RudiButton>,
    )
    const button = screen.getByRole('button', { name: 'Action' })
    const icons = button.querySelectorAll('.rudi-icon')
    expect(icons).toHaveLength(2)
  })

  it('hides icons when loading', () => {
    render(
      <RudiButton isLoading iconBefore="mdi:plus">
        Save
      </RudiButton>,
    )
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button.querySelectorAll('.rudi-icon')).toHaveLength(0)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiButton>Save</RudiButton>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations while loading', async () => {
    const { container } = render(<RudiButton isLoading>Save</RudiButton>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations with icons', async () => {
    const { container } = render(
      <RudiButton iconBefore="mdi:plus" iconAfter="mdi:arrow-right">
        Save
      </RudiButton>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
