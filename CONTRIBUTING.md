# Contributing to Rudiment UI

Thank you for contributing! This guide covers how to add components, update tokens, and submit changes.

## Adding a New Component

### Required Files

Every component needs these files in its directory:

```
src/components/ComponentName/
├── ComponentName.tsx           # Component implementation
├── ComponentName.stories.tsx   # Storybook stories and documentation
└── ComponentName.test.tsx      # Unit and accessibility tests
```

### Naming Conventions

- **Component files**: PascalCase (`Button.tsx`, `RadioGroup.tsx`)
- **Directory names**: PascalCase matching the component (`Button/`, `RadioGroup/`)
- **Props interface**: `ComponentNameProps` (e.g., `ButtonProps`, `RadioGroupProps`)
- **Story title**: `Components/ComponentName` for UI, `Typography/ComponentName` for text, `Layouts/ComponentName` for layout primitives

### Component Requirements

1. **TypeScript**: All components must be fully typed with exported Props interfaces
2. **Accessibility**: Use React Aria hooks for all interactive components
3. **Tokens**: Reference design tokens for all visual values — no hardcoded colors, spacing, or sizes
4. **Styling**: Use Tailwind CSS utilities via the `cn()` helper for class merging
5. **Ref forwarding**: Forward refs using `React.forwardRef` where applicable

### Story Requirements

Every story file must include:

1. **Meta description**: A human-readable description in `parameters.docs.description.component`
2. **Prop descriptions**: Every argType must have a `description` field written in plain language
3. **Default args**: Set sensible defaults in the meta `args` object
4. **Event grouping**: Group argTypes using `table.category`:
   - `Events` for callbacks (onChange, onPress, onClose)
   - `Appearance` for visual props (variant, size, orientation)
   - `State` for state props (isDisabled, isRequired, isLoading)
   - `Content` for content props (label, children, placeholder)
5. **No JSON controls**: Complex props should use `control: false`
6. **Autodocs**: Include `tags: ['autodocs']` in the meta

### Test Requirements

Every test file must include:

1. **Rendering test**: Verify the component renders without errors
2. **Accessibility test**: Use vitest-axe to check for WCAG violations
3. **Interaction tests**: Test keyboard and mouse interactions
4. **State tests**: Verify disabled, loading, error, and other states

Example test structure:

```tsx
import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('renders without errors', () => {
    render(<ComponentName />)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ComponentName />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

## Updating Design Tokens

1. Edit token values in `tokens/tokens.json` (primitives) or `tokens/semantic.json` (semantic/component)
2. Run `npm run build:tokens` to regenerate CSS
3. Check affected components in Storybook: `npm run dev`
4. Update any affected tests

### Token Naming Rules

- Use intent-based names, not value-based (e.g., `color.brand.primary` not `color.blue`)
- Follow the pattern: `{category}.{group}.{name}`
- Semantic tokens must reference primitive tokens, never raw values

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following the guidelines above
3. Run tests: `npm run test`
4. Build the library: `npm run build`
5. Build Storybook: `npm run build-storybook`
6. Update CHANGELOG.md with your changes under an `[Unreleased]` section
7. Submit your pull request with a clear description

### PR Checklist

- [ ] Component has TypeScript types and exported Props interface
- [ ] Component uses React Aria for accessibility (if interactive)
- [ ] All visual values reference design tokens
- [ ] Story includes meta description, prop descriptions, default args, and event grouping
- [ ] Tests pass including accessibility checks
- [ ] Library builds without errors
- [ ] Storybook builds without errors
- [ ] CHANGELOG.md updated

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **Patch** (0.1.x): Bug fixes, documentation updates
- **Minor** (0.x.0): New components, new features, non-breaking changes
- **Major** (x.0.0): Breaking API changes, removed components

Every release must have a corresponding entry in CHANGELOG.md following the [Keep a Changelog](https://keepachangelog.com/) format.
