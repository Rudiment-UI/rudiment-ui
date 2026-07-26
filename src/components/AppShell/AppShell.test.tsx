import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { RudiAppShell } from './AppShell'

function Shell() {
  return (
    <RudiAppShell>
      <RudiAppShell.Sidebar aria-label="Primary">
        <nav aria-label="Main">Nav</nav>
      </RudiAppShell.Sidebar>
      <RudiAppShell.Content>
        <header>
          <RudiAppShell.MenuButton />
        </header>
        <RudiAppShell.Main>
          <h1>Page</h1>
        </RudiAppShell.Main>
      </RudiAppShell.Content>
    </RudiAppShell>
  )
}

describe('AppShell', () => {
  it('renders the base class on the root', () => {
    const { container } = render(<Shell />)
    expect(container.firstChild).toHaveClass('rudi-app-shell')
  })

  it('renders sidebar as an aside landmark with a label', () => {
    render(<Shell />)
    const aside = screen.getByRole('complementary', { name: 'Primary' })
    expect(aside).toHaveClass('rudi-app-shell__sidebar')
  })

  it('renders a main landmark with a centered inner wrapper', () => {
    const { container } = render(<Shell />)
    const main = screen.getByRole('main')
    expect(main).toHaveClass('rudi-app-shell__main')
    expect(
      container.querySelector('.rudi-app-shell__main-inner'),
    ).toBeInTheDocument()
  })

  it('toggles the drawer-open class when the menu button is pressed', async () => {
    const user = userEvent.setup()
    const { container } = render(<Shell />)
    const root = container.firstChild as HTMLElement
    expect(root).not.toHaveClass('rudi-app-shell--sidebar-open')

    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    expect(root).toHaveClass('rudi-app-shell--sidebar-open')
  })

  it('closes the drawer when the backdrop is pressed', async () => {
    const user = userEvent.setup()
    const { container } = render(<Shell />)
    const root = container.firstChild as HTMLElement

    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    expect(root).toHaveClass('rudi-app-shell--sidebar-open')

    await user.click(screen.getByRole('button', { name: 'Close navigation' }))
    expect(root).not.toHaveClass('rudi-app-shell--sidebar-open')
  })

  it('supports a controlled open state', () => {
    const { container } = render(
      <RudiAppShell isSidebarOpen>
        <RudiAppShell.Sidebar>Nav</RudiAppShell.Sidebar>
        <RudiAppShell.Content>
          <RudiAppShell.Main>Content</RudiAppShell.Main>
        </RudiAppShell.Content>
      </RudiAppShell>,
    )
    expect(container.firstChild).toHaveClass('rudi-app-shell--sidebar-open')
  })

  it('applies a custom sidebar width as a CSS variable', () => {
    render(
      <RudiAppShell>
        <RudiAppShell.Sidebar aria-label="Nav" width="18rem">
          Nav
        </RudiAppShell.Sidebar>
        <RudiAppShell.Content>
          <RudiAppShell.Main>Content</RudiAppShell.Main>
        </RudiAppShell.Content>
      </RudiAppShell>,
    )
    const aside = screen.getByRole('complementary', { name: 'Nav' })
    expect(aside.style.getPropertyValue('--sidebar-width')).toBe('18rem')
  })

  it('merges custom class names on subcomponents', () => {
    const { container } = render(
      <RudiAppShell className="my-shell">
        <RudiAppShell.Sidebar className="my-side">Nav</RudiAppShell.Sidebar>
        <RudiAppShell.Content className="my-content">
          <RudiAppShell.Main className="my-main">Content</RudiAppShell.Main>
        </RudiAppShell.Content>
      </RudiAppShell>,
    )
    expect(container.querySelector('.rudi-app-shell')).toHaveClass('my-shell')
    expect(container.querySelector('.rudi-app-shell__sidebar')).toHaveClass(
      'my-side',
    )
    expect(container.querySelector('.rudi-app-shell__content')).toHaveClass(
      'my-content',
    )
    expect(container.querySelector('.rudi-app-shell__main')).toHaveClass(
      'my-main',
    )
  })

  it('throws when a subcomponent is used outside the shell', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<RudiAppShell.MenuButton />)).toThrow(
      /inside <RudiAppShell>/,
    )
    spy.mockRestore()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Shell />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
