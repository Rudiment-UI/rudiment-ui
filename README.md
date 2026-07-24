# Rudiment UI

A complete, accessible React component library template built on [React Aria](https://react-spectrum.adobe.com/react-aria/), styled with [Tailwind CSS 4](https://tailwindcss.com/), and documented in [Storybook](https://storybook.js.org/).

Clone it. Swap the tokens. Ship your design system.

## What's included

| Category | Components |
|----------|-----------|
| **UI Components** | Button, Input, Checkbox, CheckboxGroup, Select, Dialog, Switch, RadioGroup, Tooltip, Alert, IconButton, Badge, Tag, Avatar, Card, Icon, NavItem, ProgressBar, StatCard, CircularProgress |
| **Charts** | BarChart, LineChart, DonutChart |
| **Kanban** | KanbanBoard, KanbanColumn, KanbanCard |
| **Typography** | Heading, Text, Prose |
| **Layout Primitives** | Box, Stack, Cluster, Grid, Sidebar, Center, Cover, Switcher |
| **Page Examples** | App Shell, App Header, App Footer, Settings Page, Sign-In Form, Marketing Hero, Sidebar Layout, Article Page, Simple Form, Empty State |

Also included: a three-tier design token architecture, six built-in themes (Default, Teal, and Cyberpunk in light and dark variants), motion tokens, a data visualization palette, surface tokens, a Vitest test suite with accessibility checks, and interactive Storybook documentation.

## Quick start

### As a template (recommended for your own design system)

```bash
# Clone the template
git clone https://github.com/Rudiment-UI/rudiment-ui.git my-design-system
cd my-design-system

# Install dependencies
npm install

# Start Storybook (development)
npm run dev
```

Open [http://localhost:6006](http://localhost:6006) to browse components and documentation.

### As a dependency

```bash
npm install rudiment-ui
# or straight from source
npm install github:Rudiment-UI/rudiment-ui
```

`react` and `react-dom` 19 are peer dependencies — install them alongside.

Import the stylesheet once at your app's entry point:

```tsx
import 'rudiment-ui/styles'
```

This ships the component styles plus all six themes. It does **not** include Tailwind — components are styled with plain BEM classes and CSS custom properties, and the bundle contains no bare-element selectors, so it will not reset or clobber your app's own styles.

Every export is marked `"use client"`, so the package can be imported directly into a Next.js App Router Server Component without a re-export barrel.

---

# Using Rudiment UI in your app

## Setup

```tsx
// app entry — main.tsx, _app.tsx, or app/layout.tsx
import 'rudiment-ui/styles'
```

That single import is the whole setup. There is no provider to mount — `Dialog` portals itself, and `useChartTheme` reads tokens straight off `document.documentElement`.

## Themes

Six themes ship in the stylesheet. Set `data-theme` on a root element to switch:

| Theme | Attribute |
|-------|-----------|
| Default (light) | *no attribute* |
| Dark | `data-theme="dark"` |
| Teal | `data-theme="teal"` |
| Teal Dark | `data-theme="teal-dark"` |
| Cyberpunk | `data-theme="cyberpunk"` |
| Cyberpunk Dark | `data-theme="cyberpunk-dark"` |

The default theme lives on `:root`, so **omit the attribute for it** — there is no `data-theme="light"`. Remove the attribute to return to default.

```tsx
type Theme = 'default' | 'dark' | 'teal' | 'teal-dark' | 'cyberpunk' | 'cyberpunk-dark'

function applyTheme(theme: Theme) {
  if (theme === 'default') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}
```

Themes are scoped by attribute rather than element, so you can theme a subtree — a dark sidebar inside a light page — by putting `data-theme` on any wrapper.

No `prefers-color-scheme` query ships with the package. If you want OS-driven dark mode, wire it up yourself:

```tsx
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
applyTheme(prefersDark ? 'dark' : 'default')
```

Charts follow theme changes automatically — `useChartTheme` watches `data-theme` on `<html>` with a `MutationObserver` and re-resolves its colors.

## Tokens

Every visual value is a CSS custom property prefixed `--rudi-`, arranged in three tiers that resolve through `var()` chains. Overriding a tier cascades to everything below it.

```css
--rudi-color-neutral-900: #171717;                                    /* 1. primitive  */
--rudi-color-brand-primary: var(--rudi-color-neutral-900);           /* 2. semantic   */
--rudi-component-button-primary-bg: var(--rudi-color-brand-primary); /* 3. component  */
```

Rebrand by overriding tier 2 in your own stylesheet, loaded after `rudiment-ui/styles`:

```css
:root {
  --rudi-color-brand-primary: #7c3aed;
  --rudi-color-brand-primary-hover: #6d28d9;
  --rudi-color-brand-primary-active: #5b21b6;
}
```

**Scope overrides per theme.** `:root` and `[data-theme="dark"]` have equal specificity, and the theme blocks come later in the stylesheet — so a plain `:root` override loses inside a themed subtree. Repeat it under each theme you use:

```css
:root                      { --rudi-color-brand-primary: #7c3aed; }
[data-theme="dark"]        { --rudi-color-brand-primary: #a78bfa; }
```

The tokens worth reaching for most often:

| Purpose | Tokens |
|---------|--------|
| **Brand** | `--rudi-color-brand-primary`, `-hover`, `-active` |
| **Surfaces** | `--rudi-color-background-surface`, `-raised`, `-sunken`, `-overlay`, `--rudi-color-background-disabled`, `-inverted` |
| **Text** | `--rudi-color-text-default`, `-subtle`, `-disabled`, `-on-brand`, `-on-inverted` |
| **Borders** | `--rudi-color-border-default`, `-focus`, `-error` |
| **Feedback** | `--rudi-color-feedback-{error,success,warning,info}` each with `-surface`, `-border`, `-text` |
| **Charts** | `--rudi-color-dataviz-series-1` … `-8` |
| **Spacing** | `--rudi-spacing-{0,1,2,3,4,6,8,12}` (`0.25rem` steps — note 5, 7, 9–11 don't exist) |
| **Radius** | `--rudi-radius-{none,sm,md,lg,full}` |
| **Type** | `--rudi-font-family-{sans,mono}`, `--rudi-font-size-{xs…4xl}`, `--rudi-font-weight-{regular,medium,semibold,bold}` |
| **Motion** | `--rudi-motion-duration-{fast,base,slow}`, `--rudi-motion-easing-standard` |
| **Layout** | `--rudi-layout-sidebar-width`, `--rudi-layout-grid-min-cell`, `--rudi-layout-center-max-width`, `--rudi-layout-switcher-threshold` |

Component-level tokens (`--rudi-component-*`) are available for surgical changes — `--rudi-component-button-primary-bg`, `--rudi-component-card-bg`, `--rudi-component-input-bg`, and so on — but prefer semantic overrides so the change carries across every component.

## Components

```tsx
import { Button, Input, Stack } from 'rudiment-ui'

function LoginForm() {
  return (
    <Stack space="1.5rem">
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
      <Button variant="primary">Sign in</Button>
    </Stack>
  )
}
```

### Conventions worth knowing up front

- **`onPress`, not `onClick`.** `Button`, `IconButton`, `Tag`, and `NavItem` are built on React Aria and take `onPress`. React Aria handles pointer, touch, and keyboard activation in one event.
- **`onChange` gives you a value, not an event.** `Input` calls `onChange(value: string)`, `Checkbox` calls `onChange(isSelected: boolean)`, `CheckboxGroup` calls `onChange(value: string[])`.
- **Labels are required props, not children.** `Input`, `Select`, `RadioGroup`, `CheckboxGroup`, `ProgressBar`, and the charts all take `label` as a string — it wires up the accessible name for you.
- **Icons are Iconify names.** Any prop typed as an icon takes a `"collection:name"` string, e.g. `icon="mdi:close"`. No icon imports needed.
- **`className` is merged, not replaced** — every component runs it through `clsx` + `tailwind-merge`. `cn` is exported if you want the same helper.
- **Layout primitives are polymorphic and spread props**; components are not. `Stack`, `Box`, `Text` etc. accept `as` plus any DOM attribute. `Button`, `Card`, `Alert` have closed prop interfaces.

### Component reference

**Actions**

| Component | Props |
|-----------|-------|
| `Button` | `variant?: 'primary' \| 'secondary' \| 'destructive' \| 'ghost'` (`'primary'`), `size?: 'sm' \| 'md' \| 'lg'` (`'md'`), `isLoading?`, `iconBefore?`, `iconAfter?`, `onPress?`, `isDisabled?` |
| `IconButton` | `aria-label` **(required)**, `variant?` (`'secondary'`), `size?: 'sm' \| 'md' \| 'lg'` (`'md'`), `isLoading?`, `onPress?`; `children` is a single element |
| `NavItem` | `label` **(required)**, `icon?`, `isActive?`, `href?` (renders `<a>`, else `<button>`), `onPress?`, `badge?`, `isDisabled?` |

**Forms**

| Component | Props |
|-----------|-------|
| `Input` | `label` **(required)**, `type?: 'text' \| 'email' \| 'password' \| 'url' \| 'tel' \| 'search' \| 'number'` (`'text'`), `placeholder?`, `description?`, `errorMessage?` (sets invalid state), `isRequired?`, `isDisabled?`, `value?`, `defaultValue?`, `onChange?: (value: string) => void` |
| `Checkbox` | `children` (label), `isSelected?`, `defaultSelected?`, `isIndeterminate?`, `onChange?: (isSelected: boolean) => void`, `isDisabled?`, `value?` |
| `CheckboxGroup` | `label` **(required)**, `description?`, `value?: string[]`, `defaultValue?`, `onChange?: (value: string[]) => void`, `errorMessage?`, `isDisabled?` |
| `Switch` | `children` (label), `isSelected?`, `defaultSelected?`, `onChange?: (isSelected: boolean) => void`, `isDisabled?` |
| `Select` | `label`, `items`, `children: (item) => ReactNode`, `selectedKey?`, `defaultSelectedKey?`, `onSelectionChange?: (key) => void`, `placeholder?`, `description?`, `errorMessage?`, `isRequired?`, `isDisabled?` |
| `RadioGroup` | `label`, `orientation?: 'horizontal' \| 'vertical'`, `value?`, `defaultValue?`, `onChange?: (value: string) => void`, `errorMessage?`, `isDisabled?` |

`Select` renders its options from an `items` collection plus a render function. The item element comes from `react-stately`:

```tsx
import { Item } from 'react-stately'
import { Select } from 'rudiment-ui'

const roles = [
  { id: 'viewer', label: 'Viewer' },
  { id: 'editor', label: 'Editor' },
  { id: 'admin', label: 'Admin' },
]

<Select label="Role" items={roles} placeholder="Choose a role" onSelectionChange={setRole}>
  {(item) => <Item key={item.id}>{item.label}</Item>}
</Select>
```

**Feedback & display**

| Component | Props |
|-----------|-------|
| `Alert` | `variant: 'info' \| 'success' \| 'warning' \| 'error'` **(required)**, `title?`, `icon?`, `isPolite?` (`role="status"` instead of `"alert"`), `dismissible?`, `onDismiss?` |
| `Badge` | `variant?: 'default' \| 'success' \| 'warning' \| 'error' \| 'info'` (`'default'`), `size?: 'sm' \| 'md'` (`'md'`), `dot?` (hides children) |
| `Tag` | `variant?` (as Badge), `dismissible?`, `onDismiss?`, `onPress?` (switches root to `<button>`), `isDisabled?` |
| `Avatar` | `src?`, `alt?`, `name?` (derives initials), `size?: 'sm' \| 'md' \| 'lg'` (`'md'`), `status?: 'success' \| 'warning' \| 'error' \| 'info'` |
| `Icon` | `icon` **(required)**, `size?: 'sm' \| 'md' \| 'lg' \| number` (`'md'`), `color?`, `label?` (sets `role="img"`; without it the icon is `aria-hidden`) |
| `ProgressBar` | `value` + `label` **(required)**, `minValue?` (`0`), `maxValue?` (`100`), `showValueLabel?`, `variant?: 'default' \| 'success' \| 'warning' \| 'error'`, `size?: 'sm' \| 'md'` |
| `CircularProgress` | same as ProgressBar plus `size?: 'sm' \| 'md' \| 'lg'` and `children?` for custom center content |
| `StatCard` | `label`, `value: string \| number`, `delta?: string`, `trend?: 'up' \| 'down' \| 'neutral'` (`'neutral'`), `children?` |

`Alert` and `Tag` handle dismissal with internal state — once dismissed they render `null` and can't be reopened via props. Control visibility yourself if you need it back.

**Containers & overlays**

| Component | Props |
|-----------|-------|
| `Card` | `variant?: 'default' \| 'outlined' \| 'elevated'` (`'default'`), `padding?: 'none' \| 'sm' \| 'md' \| 'lg'` (`'md'`) |
| `Dialog` | `isOpen`, `onClose`, `title` **(all required)**, `isDismissable?` (`true`), `size?: 'sm' \| 'md' \| 'lg'` (`'md'`) |
| `TooltipTrigger` / `Tooltip` | `delay?` (`500`ms), `closeDelay?` (`0`ms); children must be exactly `[trigger, tooltip]` |
| `MenuTrigger` / `Menu` / `MenuItem` / `MenuSection` / `Keyboard` | React Aria menu primitives; `MenuItem` adds `isDestructive?` |

`Card` is compound — use the dot subcomponents:

```tsx
<Card variant="elevated" padding="lg">
  <Card.Header>Monthly revenue</Card.Header>
  <Card.Body>…</Card.Body>
  <Card.Footer>…</Card.Footer>
</Card>
```

`Dialog` is fully controlled — it has no internal open state:

```tsx
const [isOpen, setIsOpen] = useState(false)

<Button onPress={() => setIsOpen(true)}>Delete account</Button>
<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="Are you sure?" size="sm">
  <Button variant="destructive" onPress={confirmDelete}>Delete</Button>
</Dialog>
```

`TooltipTrigger` takes exactly two children, in order:

```tsx
<TooltipTrigger>
  <IconButton aria-label="Delete"><Icon icon="mdi:trash-can" /></IconButton>
  <Tooltip>Delete this item</Tooltip>
</TooltipTrigger>
```

## Layout primitives

Eight primitives handle spacing and composition. **Every spacing prop takes a raw CSS length string** — `"1rem"`, `"2rem"`, or `var(--rudi-spacing-6)` — not a numeric scale. The prop is `space` everywhere (never `gap`); `Box` uses `padding`. All accept `as`, `className`, and any DOM attribute.

| Component | Props | Default |
|-----------|-------|---------|
| `Box` | `padding?`, `bordered?`, `invert?` | padding `1rem` |
| `Stack` | `space?`, `recursive?`, `splitAfter?: number` | space `1.5rem` |
| `Cluster` | `space?`, `justify?: 'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around'`, `align?: 'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | space `1rem`, justify `flex-start`, align `center` |
| `Grid` | `minCellWidth?`, `space?` | min cell `15rem`, space `1.5rem` |
| `Sidebar` | `side?: 'left' \| 'right'`, `sideWidth?`, `contentMin?`, `space?`, `noStretch?` | side `left`, width `20rem`, content min `50%` |
| `Center` | `maxWidth?`, `gutters?`, `intrinsic?` | max width `60rem`, gutters `1rem` |
| `Cover` | `minHeight?`, `space?` | min height `100vh` |
| `Switcher` | `threshold?`, `space?` | threshold `30rem`, space `1.5rem` |

```tsx
<Sidebar side="left" sideWidth="16rem" space="2rem">
  <nav>…</nav>
  <Stack space="1.5rem">
    <Heading level={1}>Dashboard</Heading>
    <Grid minCellWidth="18rem" space="1rem">
      <StatCard label="Revenue" value="$48.2k" delta="+12.5%" trend="up" />
      <StatCard label="Users" value="1,284" delta="+3.1%" trend="up" />
    </Grid>
  </Stack>
</Sidebar>
```

`Stack` deserves a note: `recursive` applies the spacing to all nested descendants rather than direct children, and `splitAfter={n}` pushes everything after the nth child to the bottom — useful for pinning a footer inside a sidebar.

## Typography

| Component | Props |
|-----------|-------|
| `Heading` | `level: 1–6` **(required, sets the tag)**, `size?: 1–6` (visual size, defaults to `level`) |
| `Text` | `variant?: 'body' \| 'body-sm' \| 'caption' \| 'overline' \| 'code'` (`'body'`), `as?` (`'p'`) |
| `Prose` | `size?: 'sm' \| 'base' \| 'lg'` (`'base'`), `as?` (`'div'`) |

`level` and `size` are separate so you can keep a correct document outline while styling freely — `<Heading level={2} size={4}>` renders an `<h2>` that looks like an h4. `Prose` styles a block of unstyled HTML (CMS content, rendered Markdown).

## Charts

All three wrap Recharts, size themselves to their container, and require a `label` for the accessible name. Series colors come from the dataviz tokens and follow the active theme automatically.

| Component | Props |
|-----------|-------|
| `BarChart` | `data`, `dataKeys: string[]`, `indexKey`, `label`, `layout?: 'vertical' \| 'horizontal'` (`'vertical'`), `stacked?`, `showLegend?` (`true`), `showGrid?` (`true`), `height?` (`300`) |
| `LineChart` | `data`, `dataKeys`, `indexKey`, `label`, `curved?` (`true`), `showDots?` (`true`), `showGrid?`, `showLegend?`, `height?` |
| `DonutChart` | `data: { name, value }[]`, `label`, `innerRadius?` (`60`), `showLabels?` (`false`), `showLegend?`, `height?` |

```tsx
<BarChart
  label="Revenue by month"
  data={[
    { month: 'Jan', revenue: 4200, costs: 2400 },
    { month: 'Feb', revenue: 5100, costs: 2600 },
  ]}
  dataKeys={['revenue', 'costs']}
  indexKey="month"
  stacked
/>
```

Note that `BarChart`'s `layout` describes the bars, not the Recharts axis: the default `"vertical"` gives you vertical bars, and `"horizontal"` gives horizontal ones.

## Kanban

`KanbanBoard` is fully controlled — it never mutates `columns`. Apply the move yourself in `onCardMove`:

```tsx
import { KanbanBoard, KanbanCard, type KanbanCardMoveEvent } from 'rudiment-ui'

<KanbanBoard
  columns={columns}          // { id, title, items: { id, ... }[] }[]
  renderCard={(item) => <KanbanCard id={item.id}>{item.title}</KanbanCard>}
  onCardMove={(e: KanbanCardMoveEvent) => {
    // e: { cardId, fromColumnId, toColumnId, fromIndex, toIndex }
    setColumns((prev) => applyMove(prev, e))
  }}
/>
```

`renderCard` must return a `<KanbanCard id={item.id}>` — that's what supplies the drag wiring and handle. `onCardMove` doesn't fire when a card is dropped back in its original position.

## Hooks

**`useChartTheme()`** returns the resolved chart palette for the active theme — `{ colors, axisColor, gridColor, labelColor, legendColor, tooltipBg, tooltipText, tooltipBorder, chartBg }`. Use it to style custom Recharts compositions so they match the built-in charts. It's SSR-safe and re-resolves on theme change.

**`useLoadingButton(ariaProps, isLoading, ref)`** returns `{ buttonProps }` with disabled and `aria-busy` handled. Useful if you're building a custom button rather than using `Button`.

## Customizing the tokens at source

If you cloned the template rather than installing the package:

1. Edit primitive values in `tokens/tokens.json` (colors, spacing, typography)
2. Update semantic mappings in `tokens/semantic.json` (brand colors, theme values)
3. Adjust component-level tokens in `tokens/components.json` (per-component overrides)
4. Rebuild tokens: `npm run build:tokens`
5. Preview changes in Storybook: `npm run dev`

## Available scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start Storybook dev server on port 6006 |
| `npm run build` | Build the component library for distribution |
| `npm run build-storybook` | Build a static Storybook site |
| `npm run build:tokens` | Generate CSS from design token JSON files |
| `npm run test` | Run the test suite |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:watch` | Run tests in watch mode |

## Project structure

```
src/
├── components/     # Interactive UI components (Button, Input, Dialog, Charts, Kanban, etc.)
├── typography/     # Text components (Heading, Text, Prose)
├── layouts/        # Layout primitives (Stack, Grid, Sidebar, etc.)
├── hooks/          # Custom React hooks (useLoadingButton, useChartTheme)
├── utils/          # Utility functions (cn)
├── docs/           # Storybook MDX documentation pages
└── stories/        # Example page compositions

tokens/
├── tokens.json              # Tier 1: Primitive design tokens (raw values)
├── semantic.json            # Tier 2: Semantic tokens (purpose-driven aliases)
├── components.json          # Tier 3: Component tokens (per-component overrides)
├── style-dictionary.config.mjs  # Token build configuration
└── build/tokens.css         # Generated CSS custom properties
```

## Architecture

- **React Aria** handles accessibility (ARIA attributes, keyboard navigation, focus management)
- **Tailwind CSS 4** provides utility-first styling
- **Style Dictionary 4** transforms design tokens into CSS custom properties
- **Storybook 10** provides the documentation and development environment
- **Vitest** with vitest-axe runs automated accessibility checks on every component

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new components, updating tokens, and the pull request process.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

[MIT](LICENSE)
