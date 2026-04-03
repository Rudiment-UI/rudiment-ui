# Rudiment UI

A complete, accessible React component library template built on [React Aria](https://react-spectrum.adobe.com/react-aria/), styled with [Tailwind CSS 4](https://tailwindcss.com/), and documented in [Storybook](https://storybook.js.org/).

Clone it. Swap the tokens. Ship your design system.

## What's Included

| Category | Components |
|----------|-----------|
| **UI Components** | Button, Input, Checkbox, CheckboxGroup, Select, Dialog, Switch, RadioGroup, Tooltip, Alert, IconButton, Badge, Tag, Avatar, Card, Icon, NavItem, ProgressBar, StatCard |
| **Typography** | Heading, Text, Prose |
| **Layout Primitives** | Box, Stack, Cluster, Grid, Sidebar, Center, Cover, Switcher |
| **Page Examples** | App Shell, Settings Page, Sign-In Form, Marketing Hero, Sidebar Layout, Article Page, Simple Form, Empty State |

Plus: three-tier design token architecture, light/dark theming, motion tokens, data visualization palette, surface tokens, Vitest test suite with accessibility checks, and interactive Storybook documentation.

## Quick Start

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

## Customizing for Your Brand

1. Edit primitive values in `tokens/tokens.json` (colors, spacing, typography)
2. Update semantic mappings in `tokens/semantic.json` (brand colors, theme values)
3. Adjust component-level tokens in `tokens/components.json` (per-component overrides)
4. Rebuild tokens: `npm run build:tokens`
5. Preview changes in Storybook: `npm run dev`

## Using Components

```tsx
import { Button, Input, Stack } from 'rudiment-ui'
import 'rudiment-ui/styles'

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

## Available Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start Storybook dev server on port 6006 |
| `npm run build` | Build the component library for distribution |
| `npm run build-storybook` | Build a static Storybook site |
| `npm run build:tokens` | Generate CSS from design token JSON files |
| `npm run test` | Run the test suite |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── components/     # Interactive UI components (Button, Input, Dialog, etc.)
├── typography/     # Text components (Heading, Text, Prose)
├── layouts/        # Layout primitives (Stack, Grid, Sidebar, etc.)
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
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
- **Storybook 10** serves as the living documentation and development environment
- **Vitest** with vitest-axe ensures components pass automated accessibility checks

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new components, updating tokens, and the pull request process.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

ISC
