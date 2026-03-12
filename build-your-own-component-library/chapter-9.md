## Chapter 9: Storybook as your documentation layer

A component library without documentation is a collection of files. Storybook turns your components into a browsable, interactive catalog that serves as both the development environment and the buyer-facing documentation. This chapter configures Storybook 10 and establishes the story conventions that make the documentation useful.

### Installation

```bash
npm create storybook@latest
```

The Storybook CLI detects your Vite + React setup and installs the appropriate packages. It creates a `.storybook/` directory with `main.ts` and `preview.ts`. Accept the defaults, then modify both files.

Install the addons:

```bash
npm install -D @storybook/addon-a11y
```

### Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
  ],
  framework: '@storybook/react-vite',
}

export default config
```

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import '../src/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {},
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      return (
        <div className={theme === 'dark' ? 'dark' : ''}>
          <div className="bg-bg-surface text-text-default p-8 min-h-screen">
            <Story />
          </div>
        </div>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

The `preview.ts` configuration does three things:

It imports `app.css`, which loads your token values and Tailwind styles into Storybook's rendering iframe. Without this import, your components render without any styling.

The decorator wraps every story in a themed container. The `theme` global type adds a toggle to Storybook's toolbar, and the decorator reads the current theme selection and applies the `.dark` class to the wrapper. When you add dark theme token overrides (see Chapter 12), the toggle switches between them.

The a11y addon configuration runs axe-core on every story automatically. Each story page shows an "Accessibility" panel listing violations, passes, and incomplete checks. Buyers see the accessibility status of every component without running any tests.

### Story organization

Stories are organized into three sections in Storybook's sidebar:

| Section    | Title prefix                                     | Contents                                     |
| ---------- | ------------------------------------------------ | -------------------------------------------- |
| Layouts    | `Layouts/Stack`, `Layouts/Sidebar`, etc.         | One entry per layout primitive               |
| Components | `Components/Button`, `Components/Input`, etc.    | One entry per UI component                   |
| Examples   | `Examples/Dashboard`, `Examples/LoginPage`, etc. | Composed pages demonstrating the full system |

This organization is enforced by the `title` field in each story's meta object. Storybook groups stories alphabetically within each section.

### What every story file includes

For layout primitives:

1. **Default** — The primitive with token defaults and placeholder children.
2. **Custom props** — The primitive with explicit prop values demonstrating customization.
3. **Composed** — The primitive nested inside or containing other primitives.

For UI components:

1. **Default** — The component in its default state.
2. **Variants** — One story per visual variant.
3. **States** — Stories for disabled, loading, error, and any other states.
4. **Composed** — The component inside a layout primitive, demonstrating a realistic arrangement (for example, form fields in a Stack, buttons in a Cluster).

Every meta object includes `tags: ['autodocs']`. This generates a documentation page automatically from the story metadata and TypeScript prop types. The auto-generated docs page shows the props table, the default story, and all named stories with their controls.

### The kitchen sink page

The kitchen sink is a single story that composes the entire system into a realistic page. It lives at `src/examples/Dashboard.stories.tsx` with the title `Examples/Dashboard`.

This story serves two purposes: it's the final integration test (if the dashboard renders correctly, the system works), and it's the hero of your sales page. Deploy Storybook publicly, and the kitchen sink page is what buyers see when they click "View demo."

Build the kitchen sink after all components are complete. It should use as many layout primitives and UI components as possible in a layout that looks like something a real startup would build: a header with navigation, a sidebar, a main content area with cards and a data grid, a form, and tabbed content.

### Deploying Storybook

Build the static Storybook site:

```bash
npx storybook build -o storybook-static
```

The `storybook-static` directory is a static site you can deploy to any hosting provider. Vercel and Netlify both deploy static sites from a Git repo with zero configuration. Point the build command to `npx storybook build -o storybook-static` and the output directory to `storybook-static`.

The deployed URL becomes the public demo linked from your sales page and README.

### What you have now

A fully configured Storybook instance with accessibility audits, dark mode toggle, organized sidebar navigation, and a kitchen sink demo page. Every component and layout primitive has stories that document its API and demonstrate its behavior. The deployed Storybook is your living documentation and your most compelling sales asset.
