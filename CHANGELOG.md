# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-08-04

### Changed

- **BREAKING — Themes replaced:** the `teal` / `teal-dark` and `cyberpunk` / `cyberpunk-dark` themes were removed and replaced by three modifier themes — `roomy` / `roomy-dark`, `soft` / `soft-dark`, and `compressed` / `compressed-dark` — bringing the total to eight (default and dark plus the three modifiers). Consumers setting `data-theme="teal"` or `data-theme="cyberpunk"` must switch to one of the new names.
- **BREAKING — Default typefaces changed:** the `font.family.sans` primitive moved from `Inter, system-ui, sans-serif` to `'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif`, and `font.family.mono` from `JetBrains Mono, monospace` to `'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace`. Roomy references Rubik and Soft references Nunito. No fonts are bundled — load the ones your active themes use, or text falls back to the system sans-serif.
- **BREAKING — `RudiSubmenuTrigger` is now a first-party wrapper** (`./components/Menu/SubmenuTrigger`) rather than an alias re-export of React Aria's `SubmenuTrigger`, and it now has its own `RudiSubmenuTriggerProps` type. Usage is unchanged; the identity of the exported component is not.
- Themes are pure token overlays again — every `[data-theme='teal']` / `[data-theme='cyberpunk']` override was deleted from the component stylesheets (Alert, Button, Card, Checkbox, IconButton, Input, Menu, NavItem, RadioGroup, Select, Switch), so per-theme appearance now comes only from re-emitted custom properties.
- `RudiProgressBar` clamps its computed percentage to 0–100 and guards a zero-width range, so out-of-bounds `value` or `minValue === maxValue` no longer produces an overflowing or `NaN` fill.
- `RudiBarChart` and `RudiLineChart` accept `Array<Record<string, string | number | null>>` for `data`, so a series can carry gaps (e.g. a burndown line that stops mid-sprint) and strongly typed row objects pass without a cast.

### Added

- **UI Components:** Breadcrumb, Divider, Dot, Image, Link, Pagination, Rating, Stepper, Textarea
- **Closed third-party API leaks:** `RudiOption` (Select) and `RudiMenuSeparator` (Menu) are now exported, so composing a Select or Menu no longer requires importing `Item` from `react-stately` or `Separator` from `react-aria-components`.
- **Menu item content props:** `RudiMenuItem` accepts `icon`, `label`, `description`, and `shortcut` and composes the layout for you, deriving `textValue` so typeahead keeps working with non-string content.
- **ProgressBar thresholds:** a `thresholds` prop drives the fill color from the current percentage (highest matching `at` wins); `RudiProgressBarVariant` and `RudiProgressBarThreshold` are exported.
- **Typography props:** `RudiText` and `RudiHeading` accept `weight`, `tone`, `align`, and `noMargin`, with `RudiTypographyWeight`, `RudiTypographyTone`, and `RudiTypographyAlign` exported.
- **Design Tokens:** component tokens for every new component (breadcrumb, divider, dot, image, link, pagination, rating, stepper, textarea) plus the internal shell components, and full token sets for the six new theme files.
- **Example Apps:** 26 Storybook example pages across four domains (biotech marketing site, CRM, ecommerce, project management), each rendering its full source in the docs, plus `src/stories/examples/DEPARTURES.md` — a gap analysis of every place those examples had to reach outside the library.
- **Internal shell components:** AppShell, TopBar, Footer, PageHeader, and SectionHeader back the example apps. They ship with tests and stories but are deliberately **not exported** from the package yet.
- **Testing:** story and unit coverage for Heading and Text.

### Removed

- The `teal`, `teal-dark`, `cyberpunk`, and `cyberpunk-dark` themes, along with their Style Dictionary configs and token sources.
- The ten standalone page-composition stories (App Shell, Article Page, Empty State, Footer, Header, Marketing Hero, Settings Page, Sidebar Layout, Sign-In Form, Simple Form), superseded by the four example apps.

## [0.2.0] - 2026-07-24

### Changed

- **BREAKING — Namespaced CSS classes:** the component class prefix changed from `rudiment-` to `rudi-` (e.g. `.rudiment-card__header` → `.rudi-card__header`). Any consumer styles or selectors targeting `.rudiment-*` classes must be updated.
- **BREAKING — Namespaced design tokens:** the CSS custom property prefix changed from `--token-` to `--rudi-` (e.g. `var(--token-color-brand-primary)` → `var(--rudi-color-brand-primary)`). Any consumer overrides or theming referencing `--token-*` variables must be updated. This affects all six built-in themes.
- **BREAKING — Namespaced component exports:** every exported component and its prop/data types are now prefixed with `Rudi` (e.g. `Button` → `RudiButton`, `ButtonProps` → `RudiButtonProps`, `Card` → `RudiCard`). The re-exported React Aria primitives are also aliased (`Separator` → `RudiSeparator`, `SubmenuTrigger` → `RudiSubmenuTrigger`). Update imports accordingly: `import { RudiButton } from 'rudiment-ui'`. Hooks (`useLoadingButton`, `useChartTheme`) and the `cn` utility are unchanged.
- Replaced hardcoded transition values across component CSS files with motion tokens

### Added

- **UI Components:** Badge, Tag, Avatar, Card (slot-based with Header/Body/Footer), Icon (Iconify integration), NavItem, ProgressBar, StatCard
- **Design Tokens:** Surface tokens (base, raised, sunken, overlay), data visualization color ramp (8-color categorical palette), motion tokens (duration and easing primitives)
- **Runtime Theming:** CSS custom property scoping via `data-theme` attribute with dual Style Dictionary build
- **Page Examples:** 10 full-page compositions (App Shell, Settings Page, Sign-In Form, Marketing Hero, Sidebar Layout, Article Page, Simple Form, Empty State, Header, Footer) updated to use new components (Avatar, Badge, NavItem, Icon)
- **Documentation:** Component guidelines for all new components, accessibility docs for ProgressBar, Icon, Tag, and NavItem

## [0.1.0] - 2026-03-31

### Added

- **UI Components:** Button, Input, Checkbox, CheckboxGroup, Select, Dialog, Switch, RadioGroup, Tooltip, Alert, IconButton
- **Typography:** Heading, Text, Prose
- **Layout Primitives:** Box, Stack, Cluster, Grid, Sidebar, Center, Cover, Switcher
- **Design Tokens:** Three-tier architecture (primitive, semantic, component) via Style Dictionary
- **Accessibility:** React Aria integration with full keyboard and screen reader support
- **Testing:** Vitest test suite with vitest-axe accessibility checks
- **Documentation:** Storybook with autodocs, interactive controls, and example pages
- **Theming:** Light and dark mode support via semantic token layer
