# The goal:

Make it simple for developers to build a wide variety of production-grade front ends using Rudiment UI. We have identified the following gaps that prohibit this:

1. components,
2. tokens, and
3. architecture.

## Here's the plan.

### Phase 1: Token foundation

This must come first. Everything else builds on it.

#### 1.1 — Dark mode surface tokens

Add semantic surface tokens to the token system: surface-base, surface-raised, surface-overlay, and surface-sunken. These resolve differently per theme. Without them, dark mode is a manual override on every component.

#### 1.2 — Data visualization color ramp

Add a categorical color scale (6–8 colors) for chart series. These need to live in the token system so they participate in theme switching.

#### 1.3 — Motion tokens

Add duration-fast, duration-base, duration-slow, and easing-standard. Apply them in component styles from the start so motion is consistent and themeable.

#### 1.4 — Runtime theming layer

Implement CSS custom property scoping via a data-theme attribute. This is what makes multi-theme support, dark mode toggles, and future white-labeling possible without a JavaScript theming library.

### Phase 2: Missing component families

Build these in priority order based on how frequently they appear across the five reference UIs.

#### 2.1 — Badge and Tag

Appears in every UI. Covers genre labels, streak badges, status dots, and subtask counts.

#### 2.2 — Avatar

Needed for transaction lists, nav headers, and user-facing surfaces generally. Include image support and an initials fallback.

#### 2.3 — Progress Bar

Distinct from a loading indicator. Needs label, value, and color-variant props. React Aria already exposes a ProgressBar primitive — this is a styling and API wrapper task.

#### 2.4 — Stat card

A composite of a large metric value, a label, and an optional secondary indicator (delta, badge, trend). Appears in the SkillTrack and Finance UIs.

#### 2.5 — Navigation sidebar item

An interactive nav item with icon, label, and active state. The layout primitive (Sidebar) likely already handles the container — this is the interactive leaf component.

#### 2.6 — Slot-based Card

A Card with optional Header, Body, and Footer slots. Avoids prop sprawl on complex surfaces. This is the container most other composite components live inside.

#### 2.7 — Icon component

Declare an icon strategy and build a wrapper component that accepts a name or component prop. Sizing and color should consume tokens. I would like to find a way to include Iconify as the icon solution. It offers the widest selection of icons and supports tree shaking, but we need to evaluate the bundle size impact.

### Phase 3: Specialized patterns

These have higher implementation complexity and depend on Phase 2 being stable.

#### 3.1 — Charting integration layer

Choose a charting library (Recharts is the most React-idiomatic choice) and build token-aware wrapper components for the patterns your target UIs require: bar chart, line chart, donut/ring chart, and heatmap grid. The wrappers should accept token-based color props rather than hardcoded values.

#### 3.2 — Circular progress

The radial ring pattern (SkillTrack's weekly goal indicator) is a standalone SVG component, separate from the charting layer. Build it independently.

#### 3.3 — Kanban surface

KanbanBoard, KanbanColumn, and KanbanCard built on React Aria's useDrag and useDrop. This is the highest-complexity item in the plan.

## Parallel: Documentation and API contracts

Run this alongside all three phases, not after them.
For each component, document the behavior contract independently of the React implementation: what keyboard interactions it supports, what ARIA attributes it manages, what props it exposes, and what controlled vs. uncontrolled patterns it follows. This serves current Rudiment consumers and provides the spec for the future Rails port.

## Sequencing rationale

Phase 1 before Phase 2 is non-negotiable. Retrofitting surface tokens across 15+ components is significantly more expensive than building them in from the start. Phase 3 before Phase 2 is the wrong order — the charting wrappers and Kanban cards both live inside Card and consume Badge and Avatar. Build the leaves before the trees.
