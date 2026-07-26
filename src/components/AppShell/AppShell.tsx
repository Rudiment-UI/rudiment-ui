import React, { createContext, forwardRef, useContext, useState } from 'react'
import { cn } from '@/utils/cn'
import { RudiIconButton } from '@/components/IconButton/IconButton'
import { RudiIcon } from '@/components/Icon/Icon'
import './app-shell.css'

interface AppShellContextValue {
  isSidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
}

const AppShellContext = createContext<AppShellContextValue | null>(null)

function useAppShell() {
  const ctx = useContext(AppShellContext)
  if (!ctx) {
    throw new Error(
      'RudiAppShell subcomponents must be rendered inside <RudiAppShell>.',
    )
  }
  return ctx
}

export interface RudiAppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled open state of the responsive sidebar drawer. */
  isSidebarOpen?: boolean
  /** Called when the drawer requests an open-state change. */
  onSidebarOpenChange?: (open: boolean) => void
  /** Initial open state when uncontrolled. */
  defaultSidebarOpen?: boolean
  children: React.ReactNode
  className?: string
}

export interface RudiAppShellSidebarProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Overrides the sidebar width (defaults to the app-shell token). */
  width?: string
  'aria-label'?: string
  children: React.ReactNode
  className?: string
}

export interface RudiAppShellContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export interface RudiAppShellMainProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Max width of the centered content column (defaults to the token). */
  maxWidth?: string
  /** Padding around the content column (defaults to the token). */
  padding?: string
  children: React.ReactNode
  className?: string
}

export interface RudiAppShellMenuButtonProps {
  'aria-label'?: string
  /** Iconify icon name for the hamburger. */
  icon?: string
  className?: string
}

const AppShellRoot = forwardRef<HTMLDivElement, RudiAppShellProps>(
  function RudiAppShell(
    {
      isSidebarOpen,
      onSidebarOpenChange,
      defaultSidebarOpen = false,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultSidebarOpen)
    const isControlled = isSidebarOpen !== undefined
    const open = isControlled ? isSidebarOpen : uncontrolledOpen

    const setSidebarOpen = (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onSidebarOpenChange?.(next)
    }

    return (
      <AppShellContext.Provider
        value={{
          isSidebarOpen: open,
          setSidebarOpen,
          toggleSidebar: () => setSidebarOpen(!open),
        }}
      >
        <div
          ref={ref}
          className={cn(
            'rudi-app-shell',
            open && 'rudi-app-shell--sidebar-open',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AppShellContext.Provider>
    )
  },
)

function AppShellSidebar({
  width,
  className,
  style,
  children,
  'aria-label': ariaLabel = 'Sidebar',
  ...props
}: RudiAppShellSidebarProps) {
  const { isSidebarOpen, setSidebarOpen } = useAppShell()
  const customProperties: Record<string, string> = {}
  if (width) customProperties['--sidebar-width'] = width

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        className="rudi-app-shell__backdrop"
        onClick={() => setSidebarOpen(false)}
        tabIndex={isSidebarOpen ? 0 : -1}
      />
      <aside
        className={cn('rudi-app-shell__sidebar', className)}
        aria-label={ariaLabel}
        style={{ ...customProperties, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </aside>
    </>
  )
}

function AppShellContent({
  className,
  children,
  ...props
}: RudiAppShellContentProps) {
  return (
    <div className={cn('rudi-app-shell__content', className)} {...props}>
      {children}
    </div>
  )
}

function AppShellMain({
  maxWidth,
  padding,
  className,
  style,
  children,
  ...props
}: RudiAppShellMainProps) {
  const customProperties: Record<string, string> = {}
  if (maxWidth) customProperties['--app-shell-main-max-width'] = maxWidth
  if (padding) customProperties['--app-shell-main-padding'] = padding

  return (
    <main
      className={cn('rudi-app-shell__main', className)}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      <div className="rudi-app-shell__main-inner">{children}</div>
    </main>
  )
}

function AppShellMenuButton({
  'aria-label': ariaLabel = 'Open navigation',
  icon = 'lucide:menu',
  className,
}: RudiAppShellMenuButtonProps) {
  const { toggleSidebar } = useAppShell()
  return (
    <span className={cn('rudi-app-shell__menu', className)}>
      <RudiIconButton
        aria-label={ariaLabel}
        variant="ghost"
        onPress={toggleSidebar}
      >
        <RudiIcon icon={icon} />
      </RudiIconButton>
    </span>
  )
}

export const RudiAppShell = Object.assign(AppShellRoot, {
  Sidebar: AppShellSidebar,
  Content: AppShellContent,
  Main: AppShellMain,
  MenuButton: AppShellMenuButton,
})
