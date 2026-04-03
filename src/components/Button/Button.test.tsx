import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('sets aria-busy when loading', () => {
    render(<Button isLoading>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'aria-busy',
      'true',
    )
  })

  it('does not call onPress while loading', async () => {
    const onPress = vi.fn()
    render(
      <Button isLoading onPress={onPress}>
        Save
      </Button>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('renders a visible loading indicator', () => {
    render(<Button isLoading>Save</Button>)
    expect(screen.getByRole('button')).toContainElement(
      screen.getByRole('img', { hidden: true }),
    )
  })

  it('renders iconBefore', () => {
    render(<Button iconBefore="mdi:plus">Add item</Button>)
    const button = screen.getByRole('button', { name: 'Add item' })
    const icons = button.querySelectorAll('.rudiment-icon')
    expect(icons).toHaveLength(1)
    expect(icons[0].nextElementSibling?.textContent).toBe('Add item')
  })

  it('renders iconAfter', () => {
    render(<Button iconAfter="mdi:arrow-right">Next</Button>)
    const button = screen.getByRole('button', { name: 'Next' })
    const icons = button.querySelectorAll('.rudiment-icon')
    expect(icons).toHaveLength(1)
    expect(icons[0].previousElementSibling?.textContent).toBe('Next')
  })

  it('renders both iconBefore and iconAfter', () => {
    render(
      <Button iconBefore="mdi:plus" iconAfter="mdi:arrow-right">
        Action
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Action' })
    const icons = button.querySelectorAll('.rudiment-icon')
    expect(icons).toHaveLength(2)
  })

  it('hides icons when loading', () => {
    render(
      <Button isLoading iconBefore="mdi:plus">
        Save
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button.querySelectorAll('.rudiment-icon')).toHaveLength(0)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Save</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations while loading', async () => {
    const { container } = render(<Button isLoading>Save</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations with icons', async () => {
    const { container } = render(
      <Button iconBefore="mdi:plus" iconAfter="mdi:arrow-right">
        Save
      </Button>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
