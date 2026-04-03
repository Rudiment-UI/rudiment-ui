# Rudiment UI — Implementation Plan

## Goal

Make it simple for developers to build a wide variety of production-grade front ends using Rudiment UI. This plan addresses three gaps: tokens, components, and specialized patterns.

---

## Phase 1: Token Foundation

> **Status: Complete**

Everything in Phases 2 and 3 builds on this foundation.

### 1.1 — Surface Tokens

Added semantic surface tokens that resolve differently per theme:

| Token | Light | Dark |
|---|---|---|
| `surface-base` | `#FFFFFF` | `#171717` |
| `surface-raised` | `#FAFAFA` | `#262626` |
| `surface-sunken` | `#F5F5F5` | `#171717` |
| `surface-overlay` | `rgb(0 0 0 / 0.5)` | `rgb(0 0 0 / 0.7)` |

**Files:** `tokens/semantic.json`, `tokens/themes/dark/semantic.json`

### 1.2 — Data Visualization Color Ramp

Added an 8-color categorical palette for chart series. Light values use saturated tones; dark values use lighter variants for contrast on dark surfaces.

**Tokens:** `color.dataviz.series-1` through `series-8`
**Files:** `tokens/tokens.json` (primitives), `tokens/semantic.json`, `tokens/themes/dark/semantic.json`

### 1.3 — Motion Tokens

Added timing and easing primitives, replacing all hardcoded transition values across 7 component CSS files.

| Token | Value | Usage |
|---|---|---|
| `motion.duration.fast` | `100ms` | Micro-interactions |
| `motion.duration.base` | `150ms` | Buttons, inputs, checkboxes |
| `motion.duration.slow` | `300ms` | Switches, larger state changes |
| `motion.duration.spinner` | `600ms` | Loading spinners |
| `motion.easing.standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard ease curve |

**Files:** `tokens/tokens.json`, all interactive component CSS files

### 1.4 — Runtime Theming Layer

Implemented CSS custom property scoping via `data-theme` attribute.

- Dual Style Dictionary build: base tokens under `:root`, dark overrides under `[data-theme="dark"]`
- Component tokens auto-inherit dark values via CSS variable cascade
- Storybook toolbar toggle for light/dark preview
- Portaled components (Dialog, Select) inherit theme from `<html>` element

**Files:** `tokens/style-dictionary.config.mjs`, `tokens/style-dictionary.config.dark.mjs`, `tokens/themes/dark/semantic.json`, `tokens/themes/dark/components.json`, `.storybook/preview.tsx`, `src/app.css`

---

## Phase 2: Missing Component Families

> **Status: Complete**

Built in priority order. Each component follows the existing pattern: TypeScript component with React Aria, colocated CSS consuming component tokens, Storybook stories, unit tests with accessibility checks, and documentation.

### 2.1 — Badge and Tag

Small labeling components for status indicators, counts, and categorization.

**Badge:**
- Variants: `default`, `success`, `warning`, `error`, `info`
- Sizes: `sm`, `md`
- Optional dot indicator (no text, just a colored circle)

**Tag:**
- Dismissible variant with close button
- Same color variants as Badge
- Interactive (clickable) variant

**Tokens needed:** `component.badge.*` and `component.tag.*` in `tokens/components.json` with dark overrides
**React Aria:** Minimal — `useButton` for dismissible Tag close button
**Depends on:** Phase 1 surface and feedback tokens

### 2.2 — Avatar

User representation with image and fallback.

**Props:**
- `src` / `alt` for image
- `name` for initials fallback (extracts first letters of first and last name)
- `size`: `sm`, `md`, `lg`
- Optional status indicator (online/offline dot using Badge)

**Tokens needed:** `component.avatar.*` — sizes, border-radius (full), background (for initials), text color
**React Aria:** `useImage` for loading state management (fallback while image loads)
**Depends on:** Badge (2.1) for status dot

### 2.3 — Progress Bar

Determinate progress indicator with label and value.

**Props:**
- `value` (0–100), `minValue`, `maxValue`
- `label` and optional `showValueLabel`
- `variant`: `default`, `success`, `warning`, `error`
- `size`: `sm`, `md`

**Tokens needed:** `component.progress.*` — track height, track bg, fill bg (per variant), border-radius, label typography
**React Aria:** `useProgressBar` — provides ARIA attributes, value formatting, label association
**Depends on:** Phase 1 feedback tokens for variant colors

### 2.4 — Stat Card

Composite component for displaying key metrics.

**Props:**
- `label` — metric description
- `value` — the primary number/string
- `delta` — optional change indicator (e.g., "+12%")
- `trend`: `up`, `down`, `neutral` — controls delta color/icon
- `children` — optional slot for sparkline or badge

**Structure:** Composed from existing primitives (Stack, Text, Heading) and new components (Badge)
**Tokens needed:** `component.stat.*` — padding, gap, value typography, label typography, delta colors
**Depends on:** Badge (2.1), Card (2.6) — can be used standalone or inside a Card

### 2.5 — Navigation Sidebar Item

Interactive navigation item for sidebar menus.

**Props:**
- `label` — text label
- `icon` — icon element (React node)
- `isActive` — current page indicator
- `href` — link destination (renders as `<a>`)
- `onPress` — callback for SPA navigation
- `badge` — optional trailing badge (notification count)

**Tokens needed:** `component.nav-item.*` — padding, gap, active background, active text, hover background, icon size, border-radius
**React Aria:** `useLink` for accessible link behavior, or `useButton` for SPA click handling
**Depends on:** Icon (2.7), Badge (2.1)

### 2.6 — Slot-based Card

Container component with optional Header, Body, and Footer slots.

**Components:**
- `Card` — outer container with elevation (surface-raised)
- `Card.Header` — optional top section with border-bottom
- `Card.Body` — scrollable content area
- `Card.Footer` — optional bottom section with border-top, typically for actions

**Props (Card):**
- `variant`: `default`, `outlined`, `elevated`
- `padding`: `none`, `sm`, `md`, `lg`

**Tokens needed:** `component.card.*` — background (surface-raised), border, border-radius, padding variants, header/footer border color, shadow for elevated variant
**React Aria:** None — purely presentational
**Depends on:** Phase 1 surface tokens

### 2.7 — Icon Component

Wrapper component for rendering icons with consistent sizing and color.

**Approach:** Iconify integration via `@iconify/react`. Iconify provides 200,000+ icons across 150+ icon sets with tree-shaking support.

**Props:**
- `icon` — Iconify icon name string (e.g., `"lucide:home"`)
- `size`: `sm`, `md`, `lg` or number
- `color` — defaults to `currentColor`
- `label` — accessible label (renders `aria-label`); if omitted, icon is decorative (`aria-hidden`)

**Tokens needed:** `component.icon.*` — sizes (sm/md/lg mapped to token values)
**Dependencies:** `@iconify/react` package
**Depends on:** Phase 1 tokens only

---

## Phase 3: Specialized Patterns

> **Status: Complete**

Higher complexity. Depends on Phase 2 components being stable.

### 3.1 — Charting Integration Layer

Token-aware wrapper components around Recharts.

**Library:** Recharts — most React-idiomatic API, declarative JSX components, single package install, `<ResponsiveContainer>` for responsive sizing.

**Components built:**
- `BarChart` — categorical comparisons (vertical/horizontal layout, stacked/grouped)
- `LineChart` — trends over time (curved/linear interpolation, configurable dots)
- `DonutChart` — part-to-whole relationships (configurable inner radius)

**Token injection:** `useChartTheme()` hook resolves CSS custom properties via `getComputedStyle` into Recharts-compatible color strings. Watches `data-theme` attribute changes via MutationObserver for automatic dark mode reactivity.

**Each wrapper provides:**
- Token-based color props using `color.dataviz.series-*` tokens (8-color categorical palette)
- Consistent padding/typography via layout and typography tokens
- Dark mode support (chart backgrounds, axis colors, legend text all consume tokens)
- Responsive sizing via Recharts `ResponsiveContainer`
- `role="img"` and `aria-label` for accessibility

**Tokens:** `component.chart.*` — bg, axis-color, grid-color, label-color, tooltip styling, padding
**Dependencies:** `recharts`
**Files:** `src/hooks/useChartTheme.ts`, `src/components/Charts/{BarChart,LineChart,DonutChart}/`

### 3.2 — Circular Progress

Radial ring indicator for goal/completion tracking (distinct from the charting layer).

**Props:**
- `value` (0–100), `minValue`, `maxValue`
- `label` — accessible label
- `showValueLabel` — displays percentage in center
- `size`: `sm`, `md`, `lg`
- `variant`: `default`, `success`, `warning`, `error`
- `children` — center content slot (overrides showValueLabel)

**Implementation:** SVG with two `<circle>` elements — track ring and fill arc via `stroke-dasharray`/`stroke-dashoffset`. Animated transitions using motion tokens.

**Tokens:** `component.circular-progress.*` — track-color, fill colors per variant, sizes, stroke widths, label/value typography
**React Aria:** `useProgressBar` for ARIA semantics (same as linear Progress Bar)
**Files:** `src/components/CircularProgress/`

### 3.3 — Kanban Surface

Drag-and-drop board with columns and cards.

**Components:**
- `KanbanBoard` — horizontal scrolling container wrapping `<DndContext>` with pointer and keyboard sensors
- `KanbanColumn` — vertical droppable lane with header, item count badge, and `<SortableContext>`
- `KanbanCard` — draggable card with grip-dots drag handle

**DnD library:** `@dnd-kit` (core + sortable + utilities) — purpose-built for multi-column sortable patterns with `closestCorners` collision detection.

**API pattern:** `renderCard` render prop gives consumers full control over card contents, composing Badge, Avatar, and other components as needed. Board uses `Object.assign` compound pattern.

**Accessibility:**
- Keyboard DnD: Space to grab, arrow keys to move, Space to drop (via `@dnd-kit` keyboard sensor)
- Live region announcements for drag start, drag over, and drop
- Columns use `role="region"` with `aria-label`
- Drag handles use `aria-roledescription="sortable"` with descriptive labels

**Tokens:** `component.kanban.*` — board-gap, column-bg/radius/padding/min-width, card-bg/border/shadow/dragging styles, drag-handle colors, drop-indicator
**Dependencies:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
**Files:** `src/components/Kanban/`

---

## Parallel: Documentation

Run alongside all three phases. For each new component:

1. **Storybook stories** — interactive examples covering all props, variants, and states
2. **MDX documentation** — behavior contract: keyboard interactions, ARIA attributes, props API, controlled vs. uncontrolled patterns
3. **Accessibility tests** — vitest-axe checks in unit tests
4. **Update TokenArchitecture.mdx** — when new token categories are introduced
5. **Update ComponentGuidelines.mdx** — do/don't guidance for each new component

---

## Sequencing Rationale

**Phase 1 before Phase 2** is non-negotiable. Retrofitting surface tokens, motion tokens, and dark mode across 15+ components is significantly more expensive than building them in from the start.

**Phase 2 before Phase 3** because the charting wrappers and Kanban cards both compose Card, Badge, and Avatar. Build the leaves before the trees.

**Within Phase 2**, the order is driven by dependencies:
- Badge (2.1) is a dependency for Avatar, Stat Card, and Nav Item
- Card (2.6) is a dependency for Stat Card and Kanban
- Icon (2.7) is a dependency for Nav Item — but can be built in parallel with Badge
