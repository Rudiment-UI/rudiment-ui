import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiTopBar } from './TopBar'

describe('TopBar', () => {
  it('renders a header landmark with the base class', () => {
    render(<RudiTopBar>Title</RudiTopBar>)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('rudi-top-bar')
  })

  it('is sticky by default and can opt out', () => {
    const { rerender } = render(<RudiTopBar>Title</RudiTopBar>)
    expect(screen.getByRole('banner')).toHaveClass('rudi-top-bar--sticky')

    rerender(<RudiTopBar sticky={false}>Title</RudiTopBar>)
    expect(screen.getByRole('banner')).not.toHaveClass('rudi-top-bar--sticky')
  })

  it('renders start, center, and end slots', () => {
    const { container } = render(
      <RudiTopBar start={<span>S</span>} end={<span>E</span>}>
        <span>C</span>
      </RudiTopBar>,
    )
    expect(container.querySelector('.rudi-top-bar__start')).toHaveTextContent(
      'S',
    )
    expect(container.querySelector('.rudi-top-bar__center')).toHaveTextContent(
      'C',
    )
    expect(container.querySelector('.rudi-top-bar__end')).toHaveTextContent('E')
  })

  it('omits slot wrappers that receive no content', () => {
    const { container } = render(<RudiTopBar end={<span>E</span>} />)
    expect(container.querySelector('.rudi-top-bar__start')).toBeNull()
    expect(container.querySelector('.rudi-top-bar__center')).toBeNull()
    expect(container.querySelector('.rudi-top-bar__end')).toHaveTextContent('E')
  })

  it('renders an announcement strip when provided', () => {
    const { container } = render(
      <RudiTopBar announcement="Free shipping this week">Store</RudiTopBar>,
    )
    const strip = container.querySelector('.rudi-top-bar__announcement')
    expect(strip).toHaveTextContent('Free shipping this week')
  })

  it('can render as a different element', () => {
    const { container } = render(<RudiTopBar as="div">Title</RudiTopBar>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('merges a custom className', () => {
    render(<RudiTopBar className="my-bar">Title</RudiTopBar>)
    expect(screen.getByRole('banner')).toHaveClass('rudi-top-bar', 'my-bar')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiTopBar
        announcement="Announcement"
        start={<button type="button">Menu</button>}
        end={<button type="button">Account</button>}
      >
        <span>Dashboard</span>
      </RudiTopBar>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
