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

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Save</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations while loading', async () => {
    const { container } = render(<Button isLoading>Save</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
