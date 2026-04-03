# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **UI Components:** Badge, Tag, Avatar, Card (slot-based with Header/Body/Footer), Icon (Iconify integration), NavItem, ProgressBar, StatCard
- **Design Tokens:** Surface tokens (base, raised, sunken, overlay), data visualization color ramp (8-color categorical palette), motion tokens (duration and easing primitives)
- **Runtime Theming:** CSS custom property scoping via `data-theme` attribute with dual Style Dictionary build
- **Documentation:** Component guidelines for all new components, accessibility docs for ProgressBar, Icon, Tag, and NavItem

### Changed

- Replaced hardcoded transition values across component CSS files with motion tokens

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
