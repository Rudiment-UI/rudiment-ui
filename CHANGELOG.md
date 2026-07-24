# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
