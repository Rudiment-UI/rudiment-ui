# Build your own component library

A step-by-step guide to building an accessible, token-driven React component library with layout primitives, from an empty directory to a deployed Storybook.

**Author:** Josh Briley
**Version:** Draft 1
**Date:** March 11, 2026

## About this guide

This guide walks you through building a production-grade React component library from scratch. By the end, you'll have a working system with design tokens, accessible UI components, intrinsic layout primitives, Storybook documentation, and tests.

The guide is opinionated. It makes specific technology choices and explains why. Where reasonable alternatives exist, those are noted, but the guide doesn't try to cover every possible approach. Covering every approach is how guides become unusable.

The architecture follows the same patterns used by libraries like HeroUI and Untitled UI React. If you'd rather skip the build and start with a pre-built version of this architecture, [Rudiment UI](https://joshuabriley.com/services/starter/) is a ready-to-use starter kit built on the same stack and principles described here.

## Series overview

| Chapter | Title | What you'll build |
|---|---|---|
| 1 | The architecture before the code | Nothing (decisions only) |
| 2 | Project setup | Empty repo with Vite, React 19, TypeScript, Tailwind CSS 4 |
| 3 | Design tokens from scratch | Three-tier token system with Style Dictionary and @theme |
| 4 | Your first layout primitive: Stack | Stack component with token-driven spacing |
| 5 | The rest of the layout system | Box, Center, Cluster, Sidebar, Switcher, Grid, Cover |
| 5b | Typography: Heading, Text, and Prose | Three typography components with long-form content rhythm |
| 6 | Accessible components with React Aria | Button and Input with full keyboard and ARIA support |
| 7 | Form components | Select, Checkbox, RadioGroup, Switch |
| 8 | Overlays and feedback | Dialog, Tooltip, Alert, Badge |
| 9 | Storybook as your documentation layer | Configuration, story conventions, the kitchen sink page |
| 10 | Testing accessible components | Vitest, Testing Library, axe-core patterns |
| 11 | Packaging and distribution | Vite library mode, npm publishing, versioning |
| 12 | What comes next | Theming, Figma alignment, scaling the system |

---

## Chapter 1: The architecture before the code

Don't open your terminal yet. The most expensive mistakes in a component library are architectural, and they compound. A bad token structure means renaming hundreds of references later. A wrong CSS strategy means rewriting every component's styles. A missing accessibility layer means bolting it on after the fact, which always costs more than building it in.

This chapter covers the decisions you need to make before you write a single line of code.

### Choosing your primitives layer

A component library needs an accessibility primitives layer. This is the code that handles keyboard navigation, focus management, ARIA attributes, and screen reader behavior for interactive components like buttons, modals, selects, and tabs.

You have three options:

**Build it yourself.** This means implementing WAI-ARIA patterns from scratch for every interactive component. A correct modal implementation alone requires focus trapping, scroll locking, Escape key handling, focus restoration on close, and `aria-modal` management. Multiply that by every interactive component in your library. Unless accessibility engineering is your core skill, this path produces components that work for mouse users and break for everyone else.

**Use Radix primitives.** Radix provides unstyled, accessible components that you style yourself. It's the layer underneath shadcn/ui, and it has the largest mindshare in the React ecosystem. Radix was originally built by Modulz and is now maintained by WorkOS. It's a mature, battle-tested library. The reason this guide doesn't use Radix is not that Radix is a bad choice. It's that React Aria offers deeper accessibility coverage out of the box, particularly for mobile screen readers and internationalization, which means less custom work per component.

**Use React Aria.** React Aria is maintained by Adobe's design system team (the same team behind Adobe's Spectrum design system). HeroUI (formerly NextUI) has built on React Aria since v2. Untitled UI React, launched in 2026, also chose React Aria. React Aria handles mobile screen reader interactions, press event normalization across pointer types, and internationalization of ARIA labels. In this guide's experience, these capabilities reduce the amount of custom accessibility work needed per component.

This guide uses React Aria. Not because the other options are bad, but because React Aria gives you the most accessibility coverage with the least custom work, backed by a maintenance commitment tied to Adobe's own production needs.

### Choosing your styling approach

The styling layer determines how your token values reach the rendered components and how buyers customize the visual output.

**Tailwind CSS 4** is the recommendation. Version 4 introduced CSS-first configuration through the `@theme` directive, which means your design tokens (stored as CSS custom properties) map directly to Tailwind utility classes without a JavaScript config file. The buyer changes a token value, and every Tailwind utility that references it updates automatically.

The alternative approaches (CSS Modules, Sass, styled-components) all work, but they add a layer of indirection between your tokens and your styles. Tailwind's `@theme` collapses that layer. The token *is* the style.

### The three-tier token architecture

If you've worked with design tokens before, you've probably seen systems that define a color palette and reference those colors directly in components. That works until you need a dark theme, a rebrand, or a second product that shares components but looks different.

A three-tier architecture avoids this by separating *what values exist* from *what values mean* from *what values a specific component uses*.

**Tier 1 (global tokens)** defines the raw palette. `color.blue.500` is `#3B82F6`. It has no opinion about what that color is for. It just exists as a named value in the system.

**Tier 2 (semantic tokens)** assigns meaning. `color.brand.primary` references `color.blue.500`. Now the system knows that blue-500 is the primary brand color. When the brand changes to teal, you update one alias. Every component that uses `color.brand.primary` changes with it.

**Tier 3 (component tokens, optional)** scopes values to individual components. `button.background.default` references `color.brand.primary`. This tier is useful in large systems where you need to change one component's behavior without affecting others. For a starter library, it's a reference implementation you can skip until you need it.

This guide implements all three tiers so you understand how they work. The token schema uses the [Design Tokens Community Group (DTCG)](https://design-tokens.github.io/community-group/format/) format, the leading interchange format for design tokens. The DTCG specification reached its first stable release (2025.10) in October 2025, with support from more than 10 tools including Figma, Style Dictionary, Tokens Studio, and Penpot. It is a W3C Community Group specification, not a W3C Recommendation, but it is production-ready and widely adopted. Style Dictionary v4 includes first-class DTCG support.

### Layout as a first-class concern

Most component libraries stop at UI components: buttons, inputs, modals, cards. They leave layout to the consumer, who either writes custom CSS for every page or copies and pastes page templates and deletes the parts they don't want.

This guide treats layout as part of the component library. You'll build eight layout primitives (Stack, Box, Center, Cluster, Sidebar, Switcher, Grid, Cover) that follow the intrinsic design principles described by Heydon Pickering and Andy Bell in [Every Layout](https://every-layout.dev/). These primitives respond to their container's available space rather than the viewport width, which means they work in any context without media query breakpoints.

The layout primitives are driven by the same token system as the UI components. Changing `layout.sidebar.width` from `20rem` to `24rem` propagates to every Sidebar instance in the application. Changing `layout.stack.space.default` from `1.5rem` to `2rem` adjusts vertical rhythm globally.

### The decisions summary

Before you proceed, here's what you're committing to:

| Decision | Choice | Why |
|---|---|---|
| Framework | React 19 + TypeScript | Largest ecosystem; TypeScript makes component APIs self-documenting |
| Accessibility primitives | React Aria | Adobe-maintained; deepest a11y coverage; used by HeroUI and Untitled UI React |
| Styling | Tailwind CSS 4 | CSS-first @theme directive; tokens map directly to utilities; no JS config |
| Token format | DTCG JSON + Style Dictionary | Leading interchange format; platform-agnostic source; automated CSS custom property output |
| Documentation | Storybook 10 | Industry standard; built-in a11y addon; ESM-only maintenance release that reduced install size by 29% |
| Testing | Vitest + Testing Library | Fast; behavior-focused; accessible query selectors |
| Build tool | Vite | Fast dev server; clean library build output |
| Layout approach | Intrinsic primitives (Every Layout-inspired) | Context-independent; no media queries; token-driven |

If any of these choices don't fit your situation, substitute freely. The architecture still holds. The specific tools are less important than the separation of concerns: tokens define values, components consume tokens, layout primitives handle spatial arrangement, and tests verify behavior.

---

## Chapter 2: Project setup

This chapter gets you from an empty directory to a working development environment with Vite, React 19, TypeScript, and Tailwind CSS 4. No components yet. Just the foundation.

### Initialize the project

```bash
mkdir rudiment-ui && cd rudiment-ui
npm init -y
```

Install the core dependencies:

```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
npm install -D vite @vitejs/plugin-react
npm install -D tailwindcss @tailwindcss/vite
```

### Configure TypeScript

Create `tsconfig.json` at the project root:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

The key settings: `strict: true` catches type errors early. `jsx: "react-jsx"` enables the automatic JSX runtime (no need to import React in every file). `declaration: true` generates `.d.ts` files, which consumers need for TypeScript support.

### Configure Vite

Create `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
```

This configuration handles two roles: a dev server for Storybook development, and (later) a library build for npm distribution. The library build configuration gets added in Chapter 11.

### Set up the directory structure

```bash
mkdir -p src/components src/layouts src/hooks src/utils src/styles
mkdir -p tokens/build
mkdir -p .storybook
mkdir docs
```

Create the main CSS entry point at `src/app.css`:

```css
@import "tailwindcss";
```

That single line is all Tailwind CSS 4 needs to start. The `@theme` directive and token imports get added in the next chapter.

### Create the utility function

Every component needs a way to merge CSS classes. Create `src/utils/cn.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install the dependencies:

```bash
npm install clsx tailwind-merge
```

`clsx` handles conditional class joining. `tailwind-merge` resolves Tailwind class conflicts (for example, if a component applies `bg-blue-500` and the consumer passes `bg-red-500`, `tailwind-merge` keeps only the consumer's class). Combined, they let buyers override any component style with Tailwind utilities without fighting specificity.

### Verify the setup

Create a minimal `src/index.ts`:

```typescript
export { cn } from './utils/cn';
```

Run the TypeScript compiler to verify everything is wired up:

```bash
npx tsc --noEmit
```

If this passes with no errors, your foundation is solid. You have:

- A Vite project with React 19 and TypeScript in strict mode
- Tailwind CSS 4 integrated via the Vite plugin
- A directory structure that separates components, layouts, hooks, utils, tokens, and docs
- A `cn()` utility for class merging

No components, no tokens, no Storybook. That's intentional. The next chapter builds the token system, and every component you write after that will reference tokens from day one. If you build components first and add tokens later, you end up retrofitting, which is slower and produces inconsistencies.

---

## Chapter 3: Design tokens from scratch

This chapter builds the token system that every component and layout primitive will reference. By the end, you'll have a `tokens.json` source file, a Style Dictionary pipeline that generates CSS custom properties, and a Tailwind `@theme` block that maps those properties to utility classes.

### Install Style Dictionary

```bash
npm install -D style-dictionary@4
```

This guide uses Style Dictionary v4. Version 5 exists and uses a compatible configuration format, but the examples here were tested on v4.

### Create the token source file

Create `tokens/tokens.json`. This is the single source of truth for every visual and layout value in the system.

The file uses the [DTCG format](https://design-tokens.github.io/community-group/format/): each token has a `$value` (the actual value) and a `$type` (the kind of value). Tokens can reference other tokens using curly braces: `{color.blue.500}`. The DTCG format is the leading interchange format for design tokens. Its first stable release shipped in October 2025, and Style Dictionary v4 includes first-class support for it.

Start with the global tokens (tier 1):

```json
{
  "color": {
    "blue": {
      "50": { "$value": "#EFF6FF", "$type": "color" },
      "100": { "$value": "#DBEAFE", "$type": "color" },
      "200": { "$value": "#BFDBFE", "$type": "color" },
      "300": { "$value": "#93C5FD", "$type": "color" },
      "400": { "$value": "#60A5FA", "$type": "color" },
      "500": { "$value": "#3B82F6", "$type": "color" },
      "600": { "$value": "#2563EB", "$type": "color" },
      "700": { "$value": "#1D4ED8", "$type": "color" },
      "800": { "$value": "#1E40AF", "$type": "color" },
      "900": { "$value": "#1E3A8A", "$type": "color" }
    },
    "neutral": {
      "0": { "$value": "#FFFFFF", "$type": "color" },
      "50": { "$value": "#FAFAFA", "$type": "color" },
      "100": { "$value": "#F5F5F5", "$type": "color" },
      "200": { "$value": "#E5E5E5", "$type": "color" },
      "300": { "$value": "#D4D4D4", "$type": "color" },
      "400": { "$value": "#A3A3A3", "$type": "color" },
      "500": { "$value": "#737373", "$type": "color" },
      "600": { "$value": "#525252", "$type": "color" },
      "700": { "$value": "#404040", "$type": "color" },
      "800": { "$value": "#262626", "$type": "color" },
      "900": { "$value": "#171717", "$type": "color" }
    },
    "red": {
      "500": { "$value": "#EF4444", "$type": "color" },
      "600": { "$value": "#DC2626", "$type": "color" }
    },
    "green": {
      "500": { "$value": "#22C55E", "$type": "color" },
      "600": { "$value": "#16A34A", "$type": "color" }
    },
    "amber": {
      "500": { "$value": "#F59E0B", "$type": "color" }
    }
  },
  "spacing": {
    "0": { "$value": "0", "$type": "dimension" },
    "1": { "$value": "0.25rem", "$type": "dimension" },
    "2": { "$value": "0.5rem", "$type": "dimension" },
    "3": { "$value": "0.75rem", "$type": "dimension" },
    "4": { "$value": "1rem", "$type": "dimension" },
    "6": { "$value": "1.5rem", "$type": "dimension" },
    "8": { "$value": "2rem", "$type": "dimension" },
    "12": { "$value": "3rem", "$type": "dimension" }
  },
  "radius": {
    "none": { "$value": "0", "$type": "dimension" },
    "sm": { "$value": "0.125rem", "$type": "dimension" },
    "md": { "$value": "0.375rem", "$type": "dimension" },
    "lg": { "$value": "0.5rem", "$type": "dimension" },
    "full": { "$value": "9999px", "$type": "dimension" }
  },
  "font": {
    "family": {
      "sans": { "$value": "Inter, system-ui, sans-serif", "$type": "fontFamily" },
      "mono": { "$value": "JetBrains Mono, monospace", "$type": "fontFamily" }
    },
    "size": {
      "xs": { "$value": "0.75rem", "$type": "dimension" },
      "sm": { "$value": "0.875rem", "$type": "dimension" },
      "base": { "$value": "1rem", "$type": "dimension" },
      "lg": { "$value": "1.125rem", "$type": "dimension" },
      "xl": { "$value": "1.25rem", "$type": "dimension" },
      "2xl": { "$value": "1.5rem", "$type": "dimension" },
      "3xl": { "$value": "1.875rem", "$type": "dimension" },
      "4xl": { "$value": "2.25rem", "$type": "dimension" }
    },
    "weight": {
      "regular": { "$value": "400", "$type": "fontWeight" },
      "medium": { "$value": "500", "$type": "fontWeight" },
      "semibold": { "$value": "600", "$type": "fontWeight" },
      "bold": { "$value": "700", "$type": "fontWeight" }
    },
    "lineHeight": {
      "tight": { "$value": "1.25", "$type": "number" },
      "normal": { "$value": "1.5", "$type": "number" },
      "relaxed": { "$value": "1.75", "$type": "number" }
    }
  }
}
```

These are placeholder values. The specific hex codes and sizes don't matter at this stage. What matters is the structure. A buyer swaps these values to match their brand, and the structure stays the same.

### Add semantic tokens

Create a separate file for the semantic tokens at `tokens/semantic.json`. Style Dictionary merges all files listed in its `source` array, so keeping global and semantic tokens in separate files avoids an invalid JSON structure (two root objects in one file won't parse). The semantic tokens reference the global tokens by path:

```json
{
  "color": {
    "brand": {
      "primary": { "$value": "{color.blue.500}" },
      "primary-hover": { "$value": "{color.blue.600}" },
      "primary-active": { "$value": "{color.blue.700}" }
    },
    "text": {
      "default": { "$value": "{color.neutral.900}" },
      "subtle": { "$value": "{color.neutral.600}" },
      "disabled": { "$value": "{color.neutral.400}" },
      "on-brand": { "$value": "{color.neutral.0}" }
    },
    "background": {
      "surface": { "$value": "{color.neutral.0}" },
      "surface-raised": { "$value": "{color.neutral.50}" },
      "disabled": { "$value": "{color.neutral.100}" },
      "overlay": { "$value": "rgb(0 0 0 / 0.5)" }
    },
    "border": {
      "default": { "$value": "{color.neutral.200}" },
      "focus": { "$value": "{color.blue.500}" },
      "error": { "$value": "{color.red.500}" }
    },
    "feedback": {
      "error": { "$value": "{color.red.500}" },
      "success": { "$value": "{color.green.500}" },
      "warning": { "$value": "{color.amber.500}" }
    }
  },
  "layout": {
    "stack": {
      "space": {
        "default": { "$value": "{spacing.6}" },
        "dense": { "$value": "{spacing.3}" },
        "loose": { "$value": "{spacing.12}" }
      }
    },
    "sidebar": {
      "width": { "$value": "20rem" },
      "content-min": { "$value": "50%" }
    },
    "grid": {
      "min-cell": { "$value": "15rem" }
    },
    "center": {
      "max-width": { "$value": "60rem" },
      "gutters": { "$value": "{spacing.4}" }
    },
    "cover": {
      "min-height": { "$value": "100vh" }
    },
    "switcher": {
      "threshold": { "$value": "30rem" }
    },
    "cluster": {
      "space": { "$value": "{spacing.4}" }
    },
    "box": {
      "padding": { "$value": "{spacing.4}" }
    }
  }
}
```

Notice the layout tokens alongside the color tokens. Layout is not an afterthought. It's a peer of color, spacing, and typography in the token hierarchy.

### Configure Style Dictionary

Create `tokens/style-dictionary.config.js`:

```javascript
export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'token',
      buildPath: 'tokens/build/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    }
  }
};
```

The `source` glob picks up both `tokens.json` and `semantic.json` (and any additional token files you add later). The `prefix: 'token'` option adds a `--token-` prefix to all generated CSS custom properties. This prefix is important: it prevents name collisions when you map these properties into Tailwind's `@theme` directive in the next step.

The `outputReferences: true` option preserves the alias relationships in the CSS output. Instead of resolving `color.brand.primary` to its final hex value, the output is:

```css
--token-color-brand-primary: var(--token-color-blue-500);
```

This matters for debugging. When you inspect an element in browser dev tools, you can trace the value back through its aliases to understand why it resolves to a specific color.

Add a build script to `package.json`:

```json
{
  "scripts": {
    "build:tokens": "style-dictionary build --config tokens/style-dictionary.config.js"
  }
}
```

Run it:

```bash
npm run build:tokens
```

This generates `tokens/build/tokens.css`, a file containing all your tokens as CSS custom properties.

### Wire tokens into Tailwind

Update `src/app.css` to import the generated tokens and map them into Tailwind's @theme. The `@theme inline` directive tells Tailwind that these variables reference other CSS custom properties rather than defining literal values:

```css
@import "tailwindcss";
@import "../tokens/build/tokens.css";

@theme inline {
  /* Colors */
  --color-brand-primary: var(--token-color-brand-primary);
  --color-brand-primary-hover: var(--token-color-brand-primary-hover);
  --color-brand-primary-active: var(--token-color-brand-primary-active);
  --color-text-default: var(--token-color-text-default);
  --color-text-subtle: var(--token-color-text-subtle);
  --color-text-disabled: var(--token-color-text-disabled);
  --color-text-on-brand: var(--token-color-text-on-brand);
  --color-bg-surface: var(--token-color-background-surface);
  --color-bg-surface-raised: var(--token-color-background-surface-raised);
  --color-bg-overlay: var(--token-color-background-overlay);
  --color-border-default: var(--token-color-border-default);
  --color-border-focus: var(--token-color-border-focus);
  --color-border-error: var(--token-color-border-error);
  --color-feedback-error: var(--token-color-feedback-error);
  --color-feedback-success: var(--token-color-feedback-success);
  --color-feedback-warning: var(--token-color-feedback-warning);

  /* Typography */
  --font-sans: var(--token-font-family-sans);
  --font-mono: var(--token-font-family-mono);

  /* Radius */
  --radius-sm: var(--token-radius-sm);
  --radius-md: var(--token-radius-md);
  --radius-lg: var(--token-radius-lg);
  --radius-full: var(--token-radius-full);
}
```

The `--token-` prefix on the Style Dictionary output is what makes this work. The generated variables (for example, `--token-color-brand-primary`) and the Tailwind theme variables (for example, `--color-brand-primary`) have different names, so there's no self-reference. Tailwind reads the theme variable, which resolves to the token variable, which resolves to the final value.

Layout tokens don't need to be mapped through @theme (they're not used as Tailwind utility classes). Layout primitives reference them directly using the `--token-` prefix in their CSS. For example, the Stack component's CSS uses `var(--token-layout-stack-space-default)` rather than mapping through @theme. This is a deliberate choice: layout tokens control component behavior, not utility class generation.

### Verify the pipeline

At this point you can confirm the pipeline works end to end:

1. Change a value in `tokens/tokens.json` (for example, change `color.blue.500` to a different hex value).
2. Run `npm run build:tokens`.
3. Check that `tokens/build/tokens.css` reflects the new value.
4. Confirm that any Tailwind class referencing that token (via @theme) would pick up the change.

The full cycle is: edit `tokens.json` -> run `build:tokens` -> CSS custom properties update -> Tailwind utilities update. One source of truth, automated all the way through.

### What you have now

- Token files: `tokens/tokens.json` (global values) and `tokens/semantic.json` (semantic aliases and layout tokens)
- A Style Dictionary config that merges both files and generates CSS custom properties with a `--token-` prefix
- A Tailwind `@theme inline` block that maps token properties to utility classes without self-referencing
- A pipeline you can verify by changing a token value and watching it propagate

The next chapter uses these tokens to build your first layout primitive.

---

## Chapter 4: Your first layout primitive: Stack

The Stack is the most frequently used layout primitive you'll build. It solves a problem so fundamental that most developers don't realize they're working around it every day: how to apply consistent vertical spacing between elements without creating orphaned margins.

### The problem

Consider a typical approach to vertical spacing:

```css
p {
  margin-bottom: 1.5rem;
}
```

This creates a margin below every paragraph. When a paragraph is followed by another element, the spacing looks right. But the last paragraph in a container gets a margin that combines with the container's padding, producing double the intended space at the bottom. The margin exists regardless of context, because the style belongs to the element rather than to the relationship between elements.

You end up writing `:last-child` overrides, or using a utility class to remove the bottom margin, or wrapping elements in containers that cancel out the extra space. These are all workarounds for the same root problem: styling elements individually when spacing is a property of adjacency.

### The solution

The Stack primitive styles the *context* rather than the individual elements. It applies margin only between adjacent siblings, using a pattern known as the owl selector:

```css
.rudiment-stack > * + * {
  margin-block-start: var(--stack-space);
}
```

The `* + *` selector targets any element that is immediately preceded by another element. The `>` child combinator scopes it to direct children only. The result: spacing appears between elements, but never before the first child or after the last child. No `:last-child` overrides needed.

### Building the component

Create `src/layouts/Stack/Stack.tsx`:

```tsx
import { Children, cloneElement, isValidElement } from 'react';
import { cn } from '@/utils/cn';

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /** CSS spacing value. Defaults to --layout-stack-space-default token. */
  space?: string;
  /** Apply spacing recursively to all nested elements, not just direct children. */
  recursive?: boolean;
  /** 1-based index of the child after which to insert an auto margin, splitting the stack. */
  splitAfter?: number;
  /** HTML element to render. */
  as?: React.ElementType;
  children?: React.ReactNode;
}

export function Stack({
  space,
  recursive = false,
  splitAfter,
  as: Element = 'div',
  className,
  style,
  children,
  ...props
}: StackProps) {
  const customProperties: Record<string, string> = {};
  if (space) customProperties['--stack-space'] = space;

  // Apply margin-block-end: auto to the splitAfter child via React.
  // CSS :nth-child() does not accept custom properties, so this must
  // be handled in the component rather than in the stylesheet.
  const styledChildren = splitAfter
    ? Children.map(children, (child, index) => {
        if (index === splitAfter - 1 && isValidElement(child)) {
          return cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
            style: {
              ...(child.props as { style?: React.CSSProperties }).style,
              marginBlockEnd: 'auto',
            },
          });
        }
        return child;
      })
    : children;

  return (
    <Element
      className={cn(
        'rudiment-stack',
        recursive && 'rudiment-stack--recursive',
        splitAfter && 'rudiment-stack--split',
        className,
      )}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {styledChildren}
    </Element>
  );
}
```

A few things to notice about this implementation:

The component doesn't import or use React Aria. Layout primitives have no interactive behavior, so they don't need accessibility hooks. They're pure CSS layout wrapped in a React component for composability and token integration.

The `space` prop is optional. When omitted, no inline `--stack-space` property is set, and the CSS falls back to the token default via `var(--stack-space, var(--token-layout-stack-space-default))`. When provided, the inline property overrides the token. This pattern gives you token-driven defaults with per-instance overrides, and the CSS does all the work.

The `as` prop lets the consumer render a semantic element. `<Stack as="ul">` renders a `<ul>` instead of a `<div>`, which matters for accessibility when the Stack's children are list items.

### The CSS

Create `src/styles/layouts.css` (or add to it if it already exists):

```css
/* Stack */
.rudiment-stack {
  --stack-space: var(--token-layout-stack-space-default, 1.5rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.rudiment-stack > * {
  margin-block: 0;
}

.rudiment-stack > * + * {
  margin-block-start: var(--stack-space);
}

/* Recursive: apply spacing at any nesting depth */
.rudiment-stack--recursive * + * {
  margin-block-start: var(--stack-space);
}

/* Split: push elements after the nth child to the bottom */
.rudiment-stack--split {
  min-block-size: 100%;
}
```

Note: the `splitAfter` behavior is applied via React, not pure CSS. CSS `:nth-child()` accepts selector math, not custom properties, so `:nth-child(var(--n))` is invalid. Instead, the Stack component applies an inline `margin-block-end: auto` style to the correct child element. See the component code for the implementation.

Import this file in `src/app.css`:

```css
@import "tailwindcss";
@import "../tokens/build/tokens.css";
@import "./styles/layouts.css";

@theme {
  /* ... your existing @theme block ... */
}
```

The first rule resets vertical margins on all direct children to zero, preventing any inherited margin from interfering. The second rule applies the stack spacing only between adjacent siblings. The reset-then-apply pattern is what eliminates the orphaned margin problem.

The `--stack-space` custom property has a double fallback: it first checks for a value set inline by the `space` prop, then falls back to the `--layout-stack-space-default` token, then to `1.5rem` as a hardcoded safety net. In practice, the token value always exists (Style Dictionary generates it), so the hardcoded fallback is just insurance.

### The recursive prop

By default, Stack only spaces its direct children. The `>` combinator ensures nested elements aren't affected. But sometimes you want uniform spacing at every nesting level, for example when rendering Markdown content where you don't control the nesting structure.

The `recursive` variant removes the child combinator:

```css
.rudiment-stack--recursive * + * {
  margin-block-start: var(--stack-space);
}
```

Use this sparingly. Recursive spacing affects every nested element, which means list items, nested divs, and other structures will all receive the same margin. For most layouts, nesting non-recursive Stacks with different spacing values gives you more precise control.

### The splitAfter prop

Making the Stack a flexbox column context gives it one more capability: splitting. By applying `margin-block-end: auto` to a specific child, you push everything after that child to the bottom of the available space.

This is useful for card-like layouts where you want some content at the top and a button pinned to the bottom:

```tsx
<Stack splitAfter={2} style={{ minHeight: '300px' }}>
  <h3>Card title</h3>
  <p>Card description that might vary in length.</p>
  <Button>Action</Button>  {/* Pushed to the bottom */}
</Stack>
```

The `splitAfter` prop tells the Stack component which child to apply `margin-block-end: auto` to via React's `Children.map` and `cloneElement`. The Stack needs a defined height (or `min-height`) for the split to produce a visible gap. Without a height constraint, the flexbox column collapses to its content height and the auto margin has no space to distribute.

### The barrel export

Create `src/layouts/Stack/index.ts`:

```typescript
export { Stack } from './Stack';
export type { StackProps } from './Stack';
```

Add it to the main entry point in `src/index.ts`:

```typescript
export { cn } from './utils/cn';
export { Stack } from './layouts/Stack';
export type { StackProps } from './layouts/Stack';
```

### Writing the stories

Create `src/layouts/Stack/Stack.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const meta = {
  title: 'Layouts/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    space: { control: 'text' },
    recursive: { control: 'boolean' },
    splitAfter: { control: 'number' },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

function Placeholder({ label }: { label: string }) {
  return (
    <div className="border border-border-default rounded-md p-4 bg-bg-surface-raised">
      {label}
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <Stack {...args}>
      <Placeholder label="First child" />
      <Placeholder label="Second child" />
      <Placeholder label="Third child" />
    </Stack>
  ),
};

export const Dense: Story = {
  args: { space: '0.5rem' },
  render: (args) => (
    <Stack {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </Stack>
  ),
};

export const Loose: Story = {
  args: { space: '3rem' },
  render: (args) => (
    <Stack {...args}>
      <Placeholder label="First" />
      <Placeholder label="Second" />
      <Placeholder label="Third" />
    </Stack>
  ),
};

export const SplitAfterSecond: Story = {
  args: { splitAfter: 2 },
  decorators: [
    (Story) => (
      <div style={{ height: '400px', border: '1px dashed #ccc' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Stack {...args} style={{ height: '100%' }}>
      <Placeholder label="Top item 1" />
      <Placeholder label="Top item 2" />
      <Placeholder label="Pushed to bottom" />
    </Stack>
  ),
};

export const AsUnorderedList: Story = {
  render: () => (
    <Stack as="ul" space="0.75rem" role="list">
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </Stack>
  ),
};
```

Each story demonstrates a specific feature. `Default` shows the token-driven spacing. `Dense` and `Loose` show prop overrides. `SplitAfterSecond` shows the split behavior with a height-constrained container. `AsUnorderedList` demonstrates the `as` prop with semantic HTML.

### Writing the tests

Create `src/layouts/Stack/Stack.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <p>First</p>
        <p>Second</p>
      </Stack>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('applies the default class', () => {
    const { container } = render(
      <Stack><p>Child</p></Stack>
    );
    expect(container.firstChild).toHaveClass('rudiment-stack');
  });

  it('merges a custom className', () => {
    const { container } = render(
      <Stack className="mt-4"><p>Child</p></Stack>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('rudiment-stack');
    expect(el).toHaveClass('mt-4');
  });

  it('sets --stack-space when the space prop is passed', () => {
    const { container } = render(
      <Stack space="2rem"><p>Child</p></Stack>
    );
    expect(container.firstChild).toHaveStyle('--stack-space: 2rem');
  });

  it('does not set inline --stack-space when space prop is omitted', () => {
    const { container } = render(
      <Stack><p>Child</p></Stack>
    );
    const style = (container.firstChild as HTMLElement).getAttribute('style');
    expect(style).toBeNull();
  });

  it('applies the recursive class when recursive is true', () => {
    const { container } = render(
      <Stack recursive><p>Child</p></Stack>
    );
    expect(container.firstChild).toHaveClass('rudiment-stack--recursive');
  });

  it('does not apply the recursive class by default', () => {
    const { container } = render(
      <Stack><p>Child</p></Stack>
    );
    expect(container.firstChild).not.toHaveClass('rudiment-stack--recursive');
  });

  it('applies the split class when splitAfter is passed', () => {
    const { container } = render(
      <Stack splitAfter={2}><p>A</p><p>B</p><p>C</p></Stack>
    );
    expect(container.firstChild).toHaveClass('rudiment-stack--split');
  });

  it('applies margin-block-end: auto to the splitAfter child', () => {
    const { container } = render(
      <Stack splitAfter={2}><p>A</p><p>B</p><p>C</p></Stack>
    );
    const secondChild = container.firstChild?.childNodes[1] as HTMLElement;
    expect(secondChild.style.marginBlockEnd).toBe('auto');
  });

  it('renders the correct element via the as prop', () => {
    const { container } = render(
      <Stack as="section"><p>Child</p></Stack>
    );
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('renders a div by default', () => {
    const { container } = render(
      <Stack><p>Child</p></Stack>
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('forwards additional HTML attributes', () => {
    const { container } = render(
      <Stack data-testid="my-stack" id="stack-1">
        <p>Child</p>
      </Stack>
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute('data-testid', 'my-stack');
    expect(el).toHaveAttribute('id', 'stack-1');
  });
});
```

These tests verify every prop and behavior without testing CSS rendering (which is the browser's job, not the test's). They confirm that the component sets up the correct classes and custom properties that the CSS depends on.

### What you have now

One working layout primitive, fully documented and tested. The pattern you used here (token-driven CSS custom properties, prop-based overrides, the `as` prop, class-based modifiers, `cn()` merging) applies to every layout primitive and every UI component you build from here. The next chapter builds the remaining seven layout primitives using the same pattern.

---
## Chapter 5: The rest of the layout system

You have the pattern down from the Stack chapter: a React component that renders a semantic element with a CSS class and optional inline custom property overrides. The CSS does the layout work, tokens provide the defaults, and props allow per-instance control. This chapter applies that same pattern seven more times.

Each primitive is presented with its CSS, TypeScript interface, and a brief explanation of the layout technique. Stories and tests follow the same conventions established for Stack. The full story and test files are in the companion repository. This chapter focuses on the CSS techniques that make each primitive work.

### Box

The Box is the simplest layout primitive. It applies consistent padding and an optional border. You might wonder why this needs a component at all, since you could apply `p-4` and `border` as Tailwind classes directly. The answer is consistency: a Box component guarantees that padding comes from the token system, and when the design team decides to change the default container padding from `1rem` to `1.25rem`, every Box in the application updates.

```css
.rudiment-box {
  --box-padding: var(--token-layout-box-padding, 1rem);
  padding: var(--box-padding);
}

.rudiment-box--bordered {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
}

.rudiment-box--invert {
  background-color: var(--color-neutral-900);
  color: var(--color-neutral-0);
}
```

```tsx
// src/layouts/Box/Box.tsx
import { cn } from '@/utils/cn';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  padding?: string;
  bordered?: boolean;
  invert?: boolean;
  as?: React.ElementType;
  children?: React.ReactNode;
}

export function Box({
  padding,
  bordered = false,
  invert = false,
  as: Element = 'div',
  className,
  style,
  children,
  ...props
}: BoxProps) {
  const customProperties: Record<string, string> = {};
  if (padding) customProperties['--box-padding'] = padding;

  return (
    <Element
      className={cn(
        'rudiment-box',
        bordered && 'rudiment-box--bordered',
        invert && 'rudiment-box--invert',
        className,
      )}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  );
}
```

### Center

The Center constrains content to a maximum width and horizontally centers it. It's the primitive you wrap around page-level content to prevent text lines from stretching to the full viewport width (which makes them difficult to read past about 70 characters per line).

```css
.rudiment-center {
  --center-max-width: var(--token-layout-center-max-width, 60rem);
  --center-gutters: var(--token-layout-center-gutters, 1rem);
  box-sizing: content-box;
  max-inline-size: var(--center-max-width);
  margin-inline: auto;
  padding-inline: var(--center-gutters);
}

.rudiment-center--intrinsic {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

The `box-sizing: content-box` declaration is deliberate. It means the `max-inline-size` applies to the content only, and the `padding-inline` (gutters) is added outside that. The total width is `max-width + gutters`. Without this, the gutters eat into the content width, and your max-width is effectively narrower than specified.

The `intrinsic` variant uses flexbox centering to size the Center based on its content width rather than filling the max-width. This is useful for centering a button or a narrow form that shouldn't stretch to 60rem.

```tsx
// src/layouts/Center/Center.tsx
import { cn } from '@/utils/cn';

export interface CenterProps extends React.HTMLAttributes<HTMLElement> {
  maxWidth?: string;
  gutters?: string;
  intrinsic?: boolean;
  as?: React.ElementType;
  children?: React.ReactNode;
}

export function Center({
  maxWidth,
  gutters,
  intrinsic = false,
  as: Element = 'div',
  className,
  style,
  children,
  ...props
}: CenterProps) {
  const customProperties: Record<string, string> = {};
  if (maxWidth) customProperties['--center-max-width'] = maxWidth;
  if (gutters) customProperties['--center-gutters'] = gutters;

  return (
    <Element
      className={cn(
        'rudiment-center',
        intrinsic && 'rudiment-center--intrinsic',
        className,
      )}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  );
}
```

### Cluster

The Cluster arranges inline-like children (tags, buttons, badges, navigation links) in a horizontal row with consistent spacing. When the children don't fit in one row, they wrap to the next line. The `gap` property handles both horizontal and vertical spacing between wrapped rows.

```css
.rudiment-cluster {
  --cluster-space: var(--token-layout-cluster-space, 1rem);
  --cluster-justify: flex-start;
  --cluster-align: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-space);
  justify-content: var(--cluster-justify);
  align-items: var(--cluster-align);
}
```

```tsx
// src/layouts/Cluster/Cluster.tsx
import { cn } from '@/utils/cn';

export interface ClusterProps extends React.HTMLAttributes<HTMLElement> {
  space?: string;
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  as?: React.ElementType;
  children?: React.ReactNode;
}

export function Cluster({
  space,
  justify,
  align,
  as: Element = 'div',
  className,
  style,
  children,
  ...props
}: ClusterProps) {
  const customProperties: Record<string, string> = {};
  if (space) customProperties['--cluster-space'] = space;
  if (justify) customProperties['--cluster-justify'] = justify;
  if (align) customProperties['--cluster-align'] = align;

  return (
    <Element
      className={cn('rudiment-cluster', className)}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  );
}
```

A common use: a header with a logo on the left and navigation links on the right.

```tsx
<Cluster justify="space-between" align="center">
  <Logo />
  <Cluster space="0.5rem">
    <NavLink>About</NavLink>
    <NavLink>Blog</NavLink>
    <NavLink>Contact</NavLink>
  </Cluster>
</Cluster>
```

### Sidebar

The Sidebar is the most technically interesting layout primitive. It creates a two-panel layout where one panel (the sidebar) has a fixed width and the other (the content) fills the remaining space. When the content panel would be squeezed below a minimum width, both panels stack vertically. No media queries. The layout responds to its own container, not the viewport.

The technique uses flexbox with asymmetric `flex-grow` values:

```css
.rudiment-sidebar {
  --sidebar-width: var(--token-layout-sidebar-width, 20rem);
  --sidebar-content-min: var(--token-layout-sidebar-content-min, 50%);
  --sidebar-space: var(--token-layout-stack-space-default, 1.5rem);
  display: flex;
  flex-wrap: wrap;
  gap: var(--sidebar-space);
}

.rudiment-sidebar > :first-child {
  flex-basis: var(--sidebar-width);
  flex-grow: 1;
}

.rudiment-sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: var(--sidebar-content-min);
}

.rudiment-sidebar--right > :first-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: var(--sidebar-content-min);
}

.rudiment-sidebar--right > :last-child {
  flex-basis: var(--sidebar-width);
  flex-grow: 1;
}

.rudiment-sidebar--no-stretch {
  align-items: flex-start;
}
```

The key insight is `flex-grow: 999` on the content panel. Because this value is so much larger than the sidebar's `flex-grow: 1`, the content panel consumes all available space beyond the sidebar's `flex-basis`. The `min-inline-size: 50%` on the content panel forces wrapping: when the content would be narrower than 50% of the container, it wraps below the sidebar and both panels take full width.

This is an intrinsic layout. The same Sidebar component works in a 1200px container (side by side) and a 400px container (stacked) without any changes to the component or its props. The container's width is the only input.

```tsx
// src/layouts/Sidebar/Sidebar.tsx
import { cn } from '@/utils/cn';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  side?: 'left' | 'right';
  sideWidth?: string;
  contentMin?: string;
  space?: string;
  noStretch?: boolean;
  as?: React.ElementType;
  children?: React.ReactNode;
}

export function Sidebar({
  side = 'left',
  sideWidth,
  contentMin,
  space,
  noStretch = false,
  as: Element = 'div',
  className,
  style,
  children,
  ...props
}: SidebarProps) {
  const customProperties: Record<string, string> = {};
  if (sideWidth) customProperties['--sidebar-width'] = sideWidth;
  if (contentMin) customProperties['--sidebar-content-min'] = contentMin;
  if (space) customProperties['--sidebar-space'] = space;

  return (
    <Element
      className={cn(
        'rudiment-sidebar',
        side === 'right' && 'rudiment-sidebar--right',
        noStretch && 'rudiment-sidebar--no-stretch',
        className,
      )}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  );
}
```

The Sidebar expects exactly two children. The first child is the sidebar panel (when `side="left"`), and the second is the content panel. When `side="right"`, the roles reverse. The component doesn't enforce this at runtime, but the documentation and stories make the expectation clear.

### Switcher

The Switcher creates an N-column layout that collapses to a single column when the container is narrower than a threshold. Unlike the Sidebar (which has one fixed-width panel), the Switcher divides space equally among all its children.

The technique uses a `flex-basis` calculation that evaluates to either a very large positive number (forcing wrapping) or zero (allowing horizontal layout):

```css
.rudiment-switcher {
  --switcher-threshold: var(--token-layout-switcher-threshold, 30rem);
  --switcher-space: var(--token-layout-stack-space-default, 1.5rem);
  display: flex;
  flex-wrap: wrap;
  gap: var(--switcher-space);
}

.rudiment-switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--switcher-threshold) - 100%) * 999);
}
```

The `calc()` expression is the heart of the trick. When the container is wider than the threshold, `(threshold - 100%)` is negative, and multiplying by 999 produces a very large negative number. Since `flex-basis` can't be negative, the browser clamps it to zero, and the children share the space equally in a row. When the container is narrower than the threshold, the result is positive, and each child's `flex-basis` exceeds the container width, forcing every child to wrap onto its own line.

```tsx
// src/layouts/Switcher/Switcher.tsx
import { cn } from '@/utils/cn';

export interface SwitcherProps extends React.HTMLAttributes<HTMLElement> {
  threshold?: string;
  space?: string;
  limit?: number;
  as?: React.ElementType;
  children?: React.ReactNode;
}

export function Switcher({
  threshold,
  space,
  limit,
  as: Element = 'div',
  className,
  style,
  children,
  ...props
}: SwitcherProps) {
  const customProperties: Record<string, string> = {};
  if (threshold) customProperties['--switcher-threshold'] = threshold;
  if (space) customProperties['--switcher-space'] = space;

  return (
    <Element
      className={cn('rudiment-switcher', className)}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  );
}
```

The `limit` prop is an enhancement for cases where you want at most N children per row. Implementation-wise, it applies `flex-basis: 100%` to children beyond the limit via a CSS rule like `.rudiment-switcher > :nth-child(n+4)`. For the initial version, this can be handled with an inline `<style>` tag scoped to the component instance, or deferred to a future release. The core switching behavior works without it.

### Grid

The Grid creates a responsive grid without media queries. You specify a minimum cell width, and the browser determines how many columns fit. When the container narrows, columns drop off naturally.

```css
.rudiment-grid {
  --grid-min-cell: var(--token-layout-grid-min-cell, 15rem);
  --grid-space: var(--token-layout-stack-space-default, 1.5rem);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(var(--grid-min-cell), 100%), 1fr));
  gap: var(--grid-space);
}
```

The `min(var(--grid-min-cell), 100%)` inside the `minmax()` is critical. Without it, cells wider than their container overflow. The `min()` function ensures cells never exceed 100% of the container width, so on a very narrow screen, you get a single column of full-width cells without any overflow.

```tsx
// src/layouts/Grid/Grid.tsx
import { cn } from '@/utils/cn';

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  minCellWidth?: string;
  space?: string;
  as?: React.ElementType;
  children?: React.ReactNode;
}

export function Grid({
  minCellWidth,
  space,
  as: Element = 'div',
  className,
  style,
  children,
  ...props
}: GridProps) {
  const customProperties: Record<string, string> = {};
  if (minCellWidth) customProperties['--grid-min-cell'] = minCellWidth;
  if (space) customProperties['--grid-space'] = space;

  return (
    <Element
      className={cn('rudiment-grid', className)}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  );
}
```

### Cover

The Cover vertically centers a principal child element within a minimum-height container. It's the primitive for hero sections, login pages, and any full-viewport layout where the main content should be vertically centered with optional header and footer elements pinned to the top and bottom.

```css
.rudiment-cover {
  --cover-min-height: var(--token-layout-cover-min-height, 100vh);
  --cover-space: var(--token-layout-stack-space-default, 1.5rem);
  display: flex;
  flex-direction: column;
  min-block-size: var(--cover-min-height);
}

.rudiment-cover > * {
  margin-block: var(--cover-space);
}

.rudiment-cover > :first-child:not(.rudiment-cover__centered) {
  margin-block-start: 0;
}

.rudiment-cover > :last-child:not(.rudiment-cover__centered) {
  margin-block-end: 0;
}

.rudiment-cover > .rudiment-cover__centered {
  margin-block: auto;
}
```

The `margin-block: auto` on the centered child is the vertical centering mechanism. In a flex column context, `auto` margin absorbs available space, pushing the element to the center. The first and last child overrides prevent extra spacing at the edges, so a header sits flush at the top and a footer sits flush at the bottom.

```tsx
// src/layouts/Cover/Cover.tsx
import { cn } from '@/utils/cn';

export interface CoverProps extends React.HTMLAttributes<HTMLElement> {
  minHeight?: string;
  space?: string;
  as?: React.ElementType;
  children?: React.ReactNode;
}

export function Cover({
  minHeight,
  space,
  as: Element = 'div',
  className,
  style,
  children,
  ...props
}: CoverProps) {
  const customProperties: Record<string, string> = {};
  if (minHeight) customProperties['--cover-min-height'] = minHeight;
  if (space) customProperties['--cover-space'] = space;

  return (
    <Element
      className={cn('rudiment-cover', className)}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Element>
  );
}
```

The consumer marks the centered child with the `rudiment-cover__centered` class:

```tsx
<Cover>
  <header>Site header</header>
  <main className="rudiment-cover__centered">
    <h1>Welcome</h1>
    <p>This content is vertically centered.</p>
  </main>
  <footer>Site footer</footer>
</Cover>
```

An alternative approach is to export a `CoverCentered` wrapper component that applies the class automatically. Either approach works. The class-based approach is simpler and avoids an extra component.

### Composing primitives

The real power of these primitives appears when you nest them. A complete page layout requires no bespoke CSS, just composition:

```tsx
<Stack space="0">
  <Box as="header" padding="1rem" bordered>
    <Center maxWidth="72rem">
      {/* Placeholder components like Logo and NavLink represent your own app's navigation. */}
      <Cluster justify="space-between" align="center">
        <strong>App Name</strong>
        <Cluster space="0.5rem">
          <a href="/docs">Docs</a>
          <a href="/settings">Settings</a>
        </Cluster>
      </Cluster>
    </Center>
  </Box>

  <Center maxWidth="72rem" gutters="1.5rem">
    <Sidebar sideWidth="14rem" contentMin="60%" space="2rem">
      <Stack as="nav" space="0.25rem">
        <a href="/dashboard">Dashboard</a>
        <a href="/projects">Projects</a>
        <a href="/team">Team</a>
      </Stack>

      <Stack as="main" space="2rem">
        <h1>Dashboard</h1>
        <Switcher threshold="20rem" space="1rem">
          <Box bordered padding="1.5rem">Metric A</Box>
          <Box bordered padding="1.5rem">Metric B</Box>
          <Box bordered padding="1.5rem">Metric C</Box>
        </Switcher>
        <Grid minCellWidth="16rem" space="1rem">
          <Box bordered padding="1rem">Card 1</Box>
          <Box bordered padding="1rem">Card 2</Box>
          <Box bordered padding="1rem">Card 3</Box>
          <Box bordered padding="1rem">Card 4</Box>
        </Grid>
      </Stack>
    </Sidebar>
  </Center>
</Stack>
```

This layout handles narrow viewports automatically. The Sidebar stacks when the content panel would be too narrow. The Switcher collapses the metric cards to a single column. The Grid drops columns as space decreases. No breakpoints, no media queries, no viewport-specific code.

### Attribution

The layout primitives in this guide are inspired by the intrinsic layout patterns described in [Every Layout](https://every-layout.dev/) by Heydon Pickering and Andy Bell. Their work on algorithmic, context-independent CSS layout is foundational reading for anyone building layout systems.

### What you have now

Eight layout primitives, all following the same pattern: token-driven CSS, React component wrapper, `as` prop for semantic HTML, `className` merging, prop-based overrides via inline custom properties. The layout system is usable independently of the UI components.

Before moving to interactive components, the next section adds the typography layer: Heading, Text, and Prose components that handle the 80% of your UI that is just text.

---

## Chapter 5b: Typography: Heading, Text, and Prose

Layout primitives handle where things go. Typography components handle how text looks and how it flows. Most component libraries skip this layer entirely, leaving every heading size, text variant, and content spacing decision to the consumer. The result is inconsistency: five developers make five different choices about how large an h2 should be.

This chapter adds three components that enforce typographic consistency through the same token system that drives the rest of the library.

### Typography tokens

Add a typography namespace to `tokens/semantic.json`:

```json
{
  "typography": {
    "heading": {
      "1": {
        "size": { "$value": "{font.size.2xl}" },
        "weight": { "$value": "{font.weight.bold}" },
        "lineHeight": { "$value": "{font.lineHeight.tight}" },
        "tracking": { "$value": "-0.025em" }
      },
      "2": {
        "size": { "$value": "{font.size.xl}" },
        "weight": { "$value": "{font.weight.semibold}" },
        "lineHeight": { "$value": "{font.lineHeight.tight}" },
        "tracking": { "$value": "-0.025em" }
      },
      "3": {
        "size": { "$value": "{font.size.lg}" },
        "weight": { "$value": "{font.weight.semibold}" },
        "lineHeight": { "$value": "{font.lineHeight.tight}" },
        "tracking": { "$value": "0" }
      }
    },
    "body": {
      "size": { "$value": "{font.size.base}" },
      "weight": { "$value": "{font.weight.regular}" },
      "lineHeight": { "$value": "{font.lineHeight.normal}" }
    },
    "caption": {
      "size": { "$value": "{font.size.sm}" },
      "weight": { "$value": "{font.weight.regular}" },
      "lineHeight": { "$value": "{font.lineHeight.normal}" },
      "color": { "$value": "{color.text.subtle}" }
    },
    "prose": {
      "space": { "$value": "1.5em" },
      "heading-before": { "$value": "2em" },
      "heading-after": { "$value": "0.75em" }
    }
  }
}
```

Run `npm run build:tokens` to regenerate the CSS custom properties.

### Heading

The Heading component renders the correct semantic HTML element (`<h1>` through `<h6>`) based on a `level` prop. It also accepts a `size` prop for cases where the visual size needs to differ from the semantic level.

This distinction matters for accessibility. Screen reader users navigate by heading level to understand page structure. If every visually-large heading is an `<h1>`, the document structure is flat and unhelpful. The `level` prop enforces correct document structure. The `size` prop lets you render an `<h2>` that looks like an `<h1>` when the design calls for it.

```tsx
// src/typography/Heading/Heading.tsx
import { cn } from '@/utils/cn';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export function Heading({
  level,
  size,
  className,
  children,
  ...props
}: HeadingProps) {
  const Element = `h${level}` as const;
  const visualSize = size ?? level;

  return (
    <Element
      className={cn(`rudiment-heading rudiment-heading--${visualSize}`, className)}
      {...props}
    >
      {children}
    </Element>
  );
}
```

The CSS applies typography tokens per heading size:

```css
.rudiment-heading--1 {
  font-size: var(--token-typography-heading-1-size);
  font-weight: var(--token-typography-heading-1-weight);
  line-height: var(--token-typography-heading-1-lineHeight);
  letter-spacing: var(--token-typography-heading-1-tracking);
  color: var(--color-text-default);
}

.rudiment-heading--2 {
  font-size: var(--token-typography-heading-2-size);
  font-weight: var(--token-typography-heading-2-weight);
  line-height: var(--token-typography-heading-2-lineHeight);
  letter-spacing: var(--token-typography-heading-2-tracking);
  color: var(--color-text-default);
}

/* ...and so on for levels 3-6 */
```

### Text

The Text component covers non-heading text: body paragraphs, small text, captions, overlines, and inline code. The `variant` prop selects the typographic style, and the `as` prop controls the rendered element.

```tsx
// src/typography/Text/Text.tsx
import { cn } from '@/utils/cn';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'body' | 'body-sm' | 'caption' | 'overline' | 'code';
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export function Text({
  variant = 'body',
  as: Element = 'p',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Element
      className={cn(`rudiment-text rudiment-text--${variant}`, className)}
      {...props}
    >
      {children}
    </Element>
  );
}
```

```css
.rudiment-text--body {
  font-size: var(--token-typography-body-size);
  font-weight: var(--token-typography-body-weight);
  line-height: var(--token-typography-body-lineHeight);
  color: var(--color-text-default);
}

.rudiment-text--caption {
  font-size: var(--token-typography-caption-size);
  font-weight: var(--token-typography-caption-weight);
  line-height: var(--token-typography-caption-lineHeight);
  color: var(--token-typography-caption-color);
}

.rudiment-text--overline {
  font-size: var(--token-typography-overline-size);
  font-weight: var(--token-typography-overline-weight);
  line-height: var(--token-typography-overline-lineHeight);
  letter-spacing: var(--token-typography-overline-tracking);
  text-transform: uppercase;
}

.rudiment-text--code {
  font-family: var(--font-family-mono);
  font-size: 0.875em;
  background: var(--color-background-surface-raised);
  padding: 0.125em 0.25em;
  border-radius: var(--radius-sm);
}
```

### Prose

The Prose component solves the problem that Stack and Heading alone cannot: context-aware vertical rhythm in long-form content.

Stack applies uniform spacing between its children. But long-form content needs variable spacing. The gap above a heading should be larger (it signals a new section). The gap below a heading should be smaller (the heading belongs to what follows). Paragraphs need consistent but moderate spacing. Code blocks need extra breathing room.

Prose handles all of this with CSS selectors that target element-type relationships:

```tsx
// src/typography/Prose/Prose.tsx
import { cn } from '@/utils/cn';

export interface ProseProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'base' | 'lg';
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export function Prose({
  size = 'base',
  as: Element = 'div',
  className,
  children,
  ...props
}: ProseProps) {
  return (
    <Element
      className={cn(
        'rudiment-prose',
        size !== 'base' && `rudiment-prose--${size}`,
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
```

```css
.rudiment-prose {
  --prose-space: var(--token-typography-prose-space, 1.5em);
  --prose-heading-before: var(--token-typography-prose-heading-before, 2em);
  --prose-heading-after: var(--token-typography-prose-heading-after, 0.75em);
}

/* Base spacing between all adjacent elements */
.rudiment-prose > * + * {
  margin-block-start: var(--prose-space);
}

/* More space before headings (they signal new sections) */
.rudiment-prose > :is(h1, h2, h3, h4, h5, h6) {
  margin-block-start: var(--prose-heading-before);
}

/* Less space after headings (they belong to what follows) */
.rudiment-prose > :is(h1, h2, h3, h4, h5, h6) + * {
  margin-block-start: var(--prose-heading-after);
}

/* Extra breathing room around code blocks */
.rudiment-prose > pre {
  margin-block-start: 2em;
}

.rudiment-prose > pre + * {
  margin-block-start: 2em;
}

/* No top margin on the first child */
.rudiment-prose > :first-child {
  margin-block-start: 0;
}

/* Size variants scale the base font size; em-based spacing adjusts proportionally */
.rudiment-prose--sm { font-size: var(--font-size-sm); }
.rudiment-prose--lg { font-size: var(--font-size-lg); }
```

The spacing values use `em`, not `rem`. This is the key detail. An `em` value scales with the element's own font size. When you render `<Prose size="sm">` inside a sidebar, the spacing contracts proportionally with the smaller text. When you render `<Prose size="lg">` for a blog post, the spacing expands. The rhythm stays correct regardless of size.

### Usage

```tsx
<Prose as="article" size="base">
  <Heading level={1}>Building accessible component libraries</Heading>
  <Text>Component libraries are only as useful as their accessibility coverage.
  This article explores what that means in practice.</Text>

  <Heading level={2}>The problem with retrofitting</Heading>
  <Text>Adding accessibility after the fact costs more than building it in
  from the start. The reason is structural: accessible behavior affects
  component APIs, keyboard handling, and focus management.</Text>

  <Text>Consider a modal dialog. An accessible implementation requires focus
  trapping, Escape to close, scroll locking, and aria-modal. These behaviors
  are not cosmetic. They change how the component works.</Text>

  <pre><code>{`const { dialogProps } = useDialog({}, ref);`}</code></pre>

  <Text>React Aria provides these behaviors as hooks. The hook returns
  props that you spread onto your elements.</Text>
</Prose>
```

The headings get more space above (new section), less space below (connected to the following paragraph). Consecutive paragraphs get standard spacing. The code block gets extra room. No manual spacing classes needed.

### What you have now

Three typography components (Heading, Text, Prose) alongside eight layout primitives, all driven by the same token system. The library now handles spatial arrangement, typographic consistency, and long-form content rhythm. The next chapter adds interactive components with React Aria.

---

## Chapter 6: Accessible components with React Aria

Layout primitives handle spatial arrangement. UI components handle interaction. This chapter introduces React Aria and uses it to build the two most fundamental interactive components: Button and Input. The pattern you learn here applies to every interactive component in the library.

### Installing React Aria

```bash
npm install react-aria react-stately
```

`react-aria` provides the hooks that manage keyboard interaction, focus behavior, and ARIA attributes. `react-stately` provides the state management hooks that React Aria depends on (for example, tracking whether a select is open or which tab is selected).

### How React Aria hooks work

React Aria hooks return props objects that you spread onto your DOM elements. The hook manages the complex interaction logic, and you manage the rendering. Here's the concept, simplified:

```tsx
const { buttonProps } = useButton({ onPress, isDisabled }, ref);
return <button {...buttonProps} ref={ref}>Click me</button>;
```

The `buttonProps` object includes `onClick`, `onKeyDown`, `tabIndex`, `aria-disabled`, and other attributes that the hook calculates based on the state you pass in. You don't manage these attributes manually. React Aria handles the edge cases (pointer type normalization, touch delay cancellation, keyboard activation) so you don't have to discover them in production.

### Building Button

```tsx
// src/components/Button/Button.tsx
import { useRef } from 'react';
import { useButton } from 'react-aria';
import type { AriaButtonProps } from 'react-aria';
import { cn } from '@/utils/cn';

export interface ButtonProps extends AriaButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  ...ariaProps
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    { ...ariaProps, isDisabled: ariaProps.isDisabled || isLoading },
    ref,
  );

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={cn(
        'rudiment-button',
        `rudiment-button--${variant}`,
        `rudiment-button--${size}`,
        isLoading && 'rudiment-button--loading',
        className,
      )}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? (
        <>
          <span className="rudiment-button__spinner" aria-hidden="true" />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
```

Key points in this implementation:

**`useButton` normalizes press events.** The hook provides `onPress` instead of `onClick`. The difference matters. `onClick` fires on mouse click and Enter key, but its behavior varies across pointer types and browsers. `onPress` fires consistently for mouse, touch, and keyboard, with proper handling for touch delay cancellation and preventing double-fires on Android.

**Loading state disables the button.** When `isLoading` is true, the button is effectively disabled (it won't fire `onPress`), but it uses `aria-busy="true"` instead of `aria-disabled` to communicate that the button is processing rather than permanently unavailable. Screen readers announce this differently.

**The focus ring.** React Aria handles focus management, but the visible focus indicator is a CSS concern. The component's CSS uses `:focus-visible` rather than `:focus`:

```css
.rudiment-button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

`:focus-visible` shows the focus ring only for keyboard navigation, not for mouse clicks. This is the correct behavior. Mouse users don't need a focus indicator because they can see where they're clicking. Keyboard users need the ring to track their position.

### Button CSS

Component CSS references the Tailwind @theme variable names (for example, `--color-brand-primary`), not the `--token-`-prefixed Style Dictionary output. Tailwind's `@theme inline` directive bridges the two: when you use `var(--color-brand-primary)` in CSS or `bg-brand-primary` as a utility class, Tailwind resolves it through the @theme mapping to the underlying token value.

```css
.rudiment-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 150ms, color 150ms;
  border: 1px solid transparent;
}

.rudiment-button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.rudiment-button[aria-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Sizes */
.rudiment-button--sm { padding: 0.25rem 0.75rem; font-size: var(--font-size-sm); }
.rudiment-button--md { padding: 0.5rem 1rem; font-size: var(--font-size-sm); }
.rudiment-button--lg { padding: 0.75rem 1.5rem; font-size: var(--font-size-base); }

/* Variants */
.rudiment-button--primary {
  background-color: var(--color-brand-primary);
  color: var(--color-text-on-brand);
}
.rudiment-button--primary:hover:not([aria-disabled="true"]) {
  background-color: var(--color-brand-primary-hover);
}

.rudiment-button--secondary {
  background-color: var(--color-background-surface);
  color: var(--color-text-default);
  border-color: var(--color-border-default);
}
.rudiment-button--secondary:hover:not([aria-disabled="true"]) {
  background-color: var(--color-background-surface-raised);
}

.rudiment-button--destructive {
  background-color: var(--color-feedback-error);
  color: var(--color-text-on-brand);
}

.rudiment-button--ghost {
  background-color: transparent;
  color: var(--color-text-default);
}
.rudiment-button--ghost:hover:not([aria-disabled="true"]) {
  background-color: var(--color-background-surface-raised);
}

/* Loading */
.rudiment-button--loading {
  position: relative;
}

.rudiment-button__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: rudiment-spin 600ms linear infinite;
}

@keyframes rudiment-spin {
  to { transform: rotate(360deg); }
}
```

Notice that every color references a semantic token, not a global one. `var(--color-brand-primary)`, not `var(--color-blue-500)`. This means a buyer can rebrand the entire library by changing the semantic token aliases, without touching any component CSS.

### Building Input

```tsx
// src/components/Input/Input.tsx
import { useRef } from 'react';
import { useTextField } from 'react-aria';
import { cn } from '@/utils/cn';

export interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search' | 'number';
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Input({
  label,
  type = 'text',
  placeholder,
  description,
  errorMessage,
  isRequired = false,
  isDisabled = false,
  value,
  defaultValue,
  onChange,
  className,
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps, isInvalid } =
    useTextField(
      {
        label,
        type,
        placeholder,
        description,
        errorMessage,
        isRequired,
        isDisabled,
        value,
        defaultValue,
        onChange,
        isInvalid: !!errorMessage,
      },
      ref,
    );

  return (
    <div className={cn('rudiment-input', className)}>
      <label {...labelProps} className="rudiment-input__label">
        {label}
        {isRequired && <span className="rudiment-input__required" aria-hidden="true"> *</span>}
      </label>
      <input
        {...inputProps}
        ref={ref}
        className={cn(
          'rudiment-input__field',
          isInvalid && 'rudiment-input__field--error',
        )}
      />
      {description && !isInvalid && (
        <p {...descriptionProps} className="rudiment-input__description">
          {description}
        </p>
      )}
      {isInvalid && errorMessage && (
        <p {...errorMessageProps} className="rudiment-input__error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
```

`useTextField` handles all the ARIA wiring. The hook:

- Associates the label with the input via matching `id` and `htmlFor` attributes.
- Links the description and error message to the input via `aria-describedby`.
- Sets `aria-required="true"` when `isRequired` is true.
- Sets `aria-invalid="true"` when `isInvalid` is true.
- Returns `isInvalid` so you can use it for conditional rendering and styling.

You don't set any of these attributes manually. The hook returns them inside `inputProps`, `labelProps`, `descriptionProps`, and `errorMessageProps`, and you spread them onto the corresponding elements.

The error state is conditional: when `isInvalid` is true (which happens when `errorMessage` is passed), the input shows the error message and hides the description. When the input is valid, it shows the description (if one exists). This prevents screen readers from announcing both the description and the error simultaneously.

### IconButton

IconButton follows the same pattern as Button, but requires an `aria-label` because it has no visible text:

```tsx
// src/components/IconButton/IconButton.tsx
import { useRef } from 'react';
import { useButton } from 'react-aria';
import type { AriaButtonProps } from 'react-aria';
import { cn } from '@/utils/cn';

export interface IconButtonProps extends AriaButtonProps {
  'aria-label': string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  children: React.ReactElement;
}

export function IconButton({
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  className,
  children,
  ...ariaProps
}: IconButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    { ...ariaProps, isDisabled: ariaProps.isDisabled || isLoading },
    ref,
  );

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={cn(
        'rudiment-icon-button',
        `rudiment-icon-button--${variant}`,
        `rudiment-icon-button--${size}`,
        className,
      )}
      aria-busy={isLoading || undefined}
    >
      {children}
    </button>
  );
}
```

The `'aria-label': string` type (without the `?` optional marker) forces consumers to provide an accessible label. TypeScript will produce a compile error if they forget. This is a deliberate design choice: an icon-only button without an accessible name is invisible to screen reader users, and making it a required prop prevents that failure mode at development time rather than in an accessibility audit.

### What you have now

Three interactive components (Button, IconButton, Input), each built on React Aria. The pattern is consistent: import a hook, pass state and configuration, spread the returned props onto your elements. React Aria handles the ARIA attributes, keyboard behavior, and focus management. You handle the rendering and styling.

The next chapter builds the remaining form components using the same approach.

---

## Chapter 7: Form components

This chapter builds Select, Checkbox, CheckboxGroup, RadioGroup, and Switch. Each one follows the React Aria hook pattern from the previous chapter. The implementations get progressively more complex: Select involves a popover, Checkbox supports indeterminate state, and RadioGroup handles arrow key navigation within a group.

### Select

Select is the most complex form component in the library. It combines multiple React Aria hooks: `useSelect` for the trigger button, `useListBox` for the options list, `useOption` for each individual option, and `usePopover` for the floating panel that contains the list.

```tsx
// src/components/Select/Select.tsx (simplified structure)
// Note: this example references Popover, ListBox, and ChevronIcon helper components
// that are internal to the Select implementation. The companion repository contains
// the complete implementations. Here we focus on the hook wiring pattern.
import { useRef } from 'react';
import { useSelectState } from 'react-stately';
import { useSelect, useListBox, useOption, usePopover, HiddenSelect, DismissButton } from 'react-aria';
import { cn } from '@/utils/cn';

export interface SelectProps<T extends object> {
  label: string;
  items: Iterable<T>;
  children: (item: T) => React.ReactNode;
  selectedKey?: React.Key;
  defaultSelectedKey?: React.Key;
  onSelectionChange?: (key: React.Key) => void;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export function Select<T extends object>(props: SelectProps<T>) {
  const state = useSelectState(props);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);

  const { labelProps, triggerProps, valueProps, menuProps, descriptionProps, errorMessageProps } =
    useSelect(props, state, triggerRef);

  return (
    <div className={cn('rudiment-select', props.className)}>
      <label {...labelProps} className="rudiment-select__label">
        {props.label}
      </label>
      <HiddenSelect state={state} triggerRef={triggerRef} label={props.label} />
      <button
        {...triggerProps}
        ref={triggerRef}
        className={cn(
          'rudiment-select__trigger',
          props.errorMessage && 'rudiment-select__trigger--error',
        )}
      >
        <span {...valueProps}>
          {state.selectedItem ? state.selectedItem.rendered : props.placeholder || 'Select an option'}
        </span>
        <ChevronIcon aria-hidden="true" />
      </button>
      {state.isOpen && (
        <Popover state={state} triggerRef={triggerRef} popoverRef={popoverRef}>
          <ListBox {...menuProps} state={state} listBoxRef={listBoxRef} />
        </Popover>
      )}
      {props.description && !props.errorMessage && (
        <p {...descriptionProps} className="rudiment-select__description">
          {props.description}
        </p>
      )}
      {props.errorMessage && (
        <p {...errorMessageProps} className="rudiment-select__error">
          {props.errorMessage}
        </p>
      )}
    </div>
  );
}
```

The `HiddenSelect` component from React Aria renders a hidden native `<select>` element for form submission compatibility. The visible trigger is a `<button>` that opens the popover. The listbox inside the popover handles arrow key navigation, typeahead (type a letter to jump to matching options), and Home/End to jump to the first/last option.

This is a lot of code for a select input. That's the point. Getting keyboard navigation, ARIA attributes, popover positioning, and focus management right for a select is genuinely difficult. React Aria handles the behavioral complexity so your component code is mostly rendering and styling.

### Checkbox and CheckboxGroup

```tsx
// src/components/Checkbox/Checkbox.tsx
import { useRef } from 'react';
import { useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';
import { cn } from '@/utils/cn';

export interface CheckboxProps {
  children: React.ReactNode;
  isSelected?: boolean;
  defaultSelected?: boolean;
  isIndeterminate?: boolean;
  onChange?: (isSelected: boolean) => void;
  isDisabled?: boolean;
  value?: string;
  className?: string;
}

export function Checkbox(props: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  const state = useToggleState(props);
  const { inputProps } = useCheckbox(props, state, ref);

  return (
    <label className={cn('rudiment-checkbox', props.isDisabled && 'rudiment-checkbox--disabled', props.className)}>
      <input {...inputProps} ref={ref} className="rudiment-checkbox__input" />
      <span className={cn(
        'rudiment-checkbox__control',
        state.isSelected && 'rudiment-checkbox__control--checked',
        props.isIndeterminate && 'rudiment-checkbox__control--indeterminate',
      )} aria-hidden="true" />
      <span className="rudiment-checkbox__label">{props.children}</span>
    </label>
  );
}
```

The hidden native `<input>` provides the actual checkbox behavior. The `rudiment-checkbox__control` span is the visual indicator, styled via CSS to show a checkmark, dash (indeterminate), or empty box. The `aria-hidden="true"` on the visual indicator prevents screen readers from announcing it twice (once for the hidden input, once for the visual).

`CheckboxGroup` wraps multiple checkboxes with a group label:

```tsx
// src/components/Checkbox/CheckboxGroup.tsx
import { useCheckboxGroup } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';
import { cn } from '@/utils/cn';

export interface CheckboxGroupProps {
  label: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  isDisabled?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(props, state);

  return (
    <div {...groupProps} className={cn('rudiment-checkbox-group', props.className)}>
      <span {...labelProps} className="rudiment-checkbox-group__label">
        {props.label}
      </span>
      {props.children}
      {props.errorMessage && (
        <p {...errorMessageProps} className="rudiment-checkbox-group__error">
          {props.errorMessage}
        </p>
      )}
    </div>
  );
}
```

### RadioGroup

RadioGroup has an important keyboard behavior difference from individual checkboxes: arrow keys move the selection between radio options within the group, while Tab moves focus into and out of the group (not between options). React Aria handles this automatically.

```tsx
// src/components/RadioGroup/RadioGroup.tsx
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';
import { cn } from '@/utils/cn';

export interface RadioGroupProps {
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  isDisabled?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup(props: RadioGroupProps) {
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <div {...radioGroupProps} className={cn('rudiment-radio-group', props.className)}>
      <span {...labelProps} className="rudiment-radio-group__label">
        {props.label}
      </span>
      <div className={cn(
        'rudiment-radio-group__options',
        props.orientation === 'horizontal' && 'rudiment-radio-group__options--horizontal',
      )}>
        {props.children}
      </div>
      {props.errorMessage && (
        <p {...errorMessageProps} className="rudiment-radio-group__error">
          {props.errorMessage}
        </p>
      )}
    </div>
  );
}
```

The individual `Radio` component uses `useRadio` and receives the group state via React context (set up internally by React Aria). The implementation follows the same hidden-input-plus-visual-indicator pattern as Checkbox.

### Switch

Switch is semantically distinct from Checkbox. A checkbox is a selection control ("agree to terms"). A switch is a toggle control ("enable notifications"). The distinction matters for screen reader users: `role="switch"` communicates a different interaction model than `role="checkbox"`.

```tsx
// src/components/Switch/Switch.tsx
import { useRef } from 'react';
import { useSwitch, VisuallyHidden } from 'react-aria';
import { useToggleState } from 'react-stately';
import { cn } from '@/utils/cn';

export interface SwitchProps {
  children: React.ReactNode;
  isSelected?: boolean;
  defaultSelected?: boolean;
  onChange?: (isSelected: boolean) => void;
  isDisabled?: boolean;
  className?: string;
}

export function Switch(props: SwitchProps) {
  const ref = useRef<HTMLInputElement>(null);
  const state = useToggleState(props);
  const { inputProps } = useSwitch(props, state, ref);

  return (
    <label className={cn('rudiment-switch', props.isDisabled && 'rudiment-switch--disabled', props.className)}>
      <VisuallyHidden>
        <input {...inputProps} ref={ref} />
      </VisuallyHidden>
      <span className={cn(
        'rudiment-switch__track',
        state.isSelected && 'rudiment-switch__track--on',
      )} aria-hidden="true">
        <span className="rudiment-switch__thumb" />
      </span>
      <span className="rudiment-switch__label">{props.children}</span>
    </label>
  );
}
```

`VisuallyHidden` is a React Aria utility that hides the native input from sight while keeping it accessible to screen readers. The visible switch track and thumb are styled via CSS to animate between on and off positions.

### What you have now

All form components are built: Button, IconButton, Input, Select, Checkbox, CheckboxGroup, RadioGroup, Switch. Each uses React Aria for behavior and accessibility, with your token-driven CSS handling the visual layer. A buyer can compose a complete form using these components arranged inside a Stack:

```tsx
// Example roles data for the Select component
const roles = [
  { id: 'design', name: 'Design' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'product', name: 'Product' },
];

<Stack space="1.5rem" style={{ maxWidth: '24rem' }}>
  <Input label="Name" isRequired />
  <Input label="Email" type="email" isRequired />
  <Select label="Role" placeholder="Choose a role" items={roles}>
    {(role) => <span key={role.id}>{role.name}</span>}
  </Select>
  <CheckboxGroup label="Interests">
    <Checkbox value="design">Design</Checkbox>
    <Checkbox value="engineering">Engineering</Checkbox>
    <Checkbox value="product">Product</Checkbox>
  </CheckboxGroup>
  <Switch>Receive email updates</Switch>
  <Button variant="primary">Submit</Button>
</Stack>
```

---

## Chapter 8: Overlays and feedback

This chapter builds Dialog, Tooltip, Alert, Badge, Card, and Tabs. These components round out the library's coverage: modal interactions, informational overlays, status feedback, content containers, and tabbed navigation.

### Dialog

The Dialog (modal) is the most complex overlay component. It requires focus trapping (Tab cycles within the dialog, not outside it), scroll locking (the page behind the dialog doesn't scroll), Escape to close, focus restoration (focus returns to the trigger when the dialog closes), and `aria-modal="true"` to tell screen readers that content outside the dialog is inert.

```tsx
// src/components/Dialog/Dialog.tsx
import { useRef } from 'react';
import { useDialog, useModalOverlay, OverlayContainer, usePreventScroll } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';
import type { OverlayTriggerState } from 'react-stately';
import { cn } from '@/utils/cn';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isDismissable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  isDismissable = true,
  size = 'md',
  children,
  className,
}: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  usePreventScroll({ isDisabled: !isOpen });

  // Create a state object compatible with useModalOverlay
  const state: OverlayTriggerState = {
    isOpen,
    close: onClose,
    open: () => {},
    toggle: () => {},
    setOpen: () => {},
  };

  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable },
    state,
    overlayRef,
  );

  const { dialogProps, titleProps } = useDialog({}, dialogRef);

  if (!isOpen) return null;

  return (
    <OverlayContainer>
      <div
        {...underlayProps}
        className="rudiment-dialog__overlay"
        ref={overlayRef}
      >
        <div
          {...modalProps}
          {...dialogProps}
          ref={dialogRef}
          className={cn(
            'rudiment-dialog',
            `rudiment-dialog--${size}`,
            className,
          )}
        >
          <h2 {...titleProps} className="rudiment-dialog__title">
            {title}
          </h2>
          <div className="rudiment-dialog__body">
            {children}
          </div>
        </div>
      </div>
    </OverlayContainer>
  );
}
```

`useModalOverlay` handles focus trapping and Escape dismissal. `usePreventScroll` locks body scrolling. `OverlayContainer` from React Aria renders the dialog into a portal (appended to the document body), which prevents z-index stacking context issues.

The dialog is controlled-only (`isOpen` and `onClose` are required props). This is a deliberate choice. Uncontrolled dialogs (that manage their own open state) prevent the consumer from coordinating dialog visibility with the rest of their application state.

### Tooltip

```tsx
// src/components/Tooltip/Tooltip.tsx
import React, { useRef } from 'react';
import { useTooltipTrigger, useTooltip as useTooltipAria, mergeProps } from 'react-aria';
import { useTooltipTriggerState } from 'react-stately';
import { cn } from '@/utils/cn';

export interface TooltipTriggerProps {
  delay?: number;
  closeDelay?: number;
  children: [React.ReactElement, React.ReactElement];
}

export function TooltipTrigger({ delay = 500, closeDelay = 0, children }: TooltipTriggerProps) {
  const state = useTooltipTriggerState({ delay, closeDelay });
  const triggerRef = useRef<HTMLElement>(null);
  const { triggerProps, tooltipProps: triggerTooltipProps } = useTooltipTrigger(
    { delay, closeDelay },
    state,
    triggerRef,
  );

  const [trigger, tooltip] = children;

  return (
    <span className="rudiment-tooltip-trigger">
      {React.cloneElement(trigger, mergeProps(triggerProps, { ref: triggerRef }))}
      {state.isOpen && React.cloneElement(tooltip, triggerTooltipProps)}
    </span>
  );
}

export interface TooltipProps {
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ children, className, ...props }: TooltipProps & Record<string, unknown>) {
  const { tooltipProps } = useTooltipAria(props);

  return (
    <span
      {...tooltipProps}
      className={cn('rudiment-tooltip', className)}
      role="tooltip"
    >
      {children}
    </span>
  );
}
```

The tooltip appears on hover (after the configured delay) and on focus. It hides on pointer leave, blur, Escape, or scroll. React Aria manages the timing and the `aria-describedby` relationship between the trigger and the tooltip content.

### Alert

Alert is the simplest component in the library. It's semantic HTML with styling:

```tsx
// src/components/Alert/Alert.tsx
import { cn } from '@/utils/cn';

export interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  isPolite?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Alert({
  variant,
  title,
  isPolite = false,
  children,
  className,
}: AlertProps) {
  return (
    <div
      role={isPolite ? 'status' : 'alert'}
      className={cn('rudiment-alert', `rudiment-alert--${variant}`, className)}
    >
      {title && <p className="rudiment-alert__title">{title}</p>}
      <div className="rudiment-alert__content">{children}</div>
    </div>
  );
}
```

`role="alert"` triggers an assertive announcement in screen readers: the alert content is read immediately, interrupting whatever the screen reader was doing. `role="status"` (via `isPolite`) triggers a polite announcement: the content is read at the next natural pause. Use `role="alert"` for errors that need immediate attention. Use `role="status"` for success messages and informational updates.

### Badge, Card, and Tabs

Badge is a presentational `<span>` with variant styling and an optional `aria-label` for standalone usage. Card is a `<div>` (or `<article>` via `as`) with optional interactive behavior via `usePress`. Tabs combine `useTabList`, `useTab`, and `useTabPanel` for keyboard-navigable tabbed content.

These components follow the patterns already established. Badge and Card are simpler versions of the components you've already built. Tabs is structurally similar to RadioGroup: a group component that manages state, with child components that participate in that state via React Aria context.

The full implementations are in the companion repository. The patterns don't vary from what you've seen in chapters 6 and 7.

### What you have now

All 14 UI components are built. Combined with the 8 layout primitives and 3 typography components from chapters 4, 5, and 5b, the library has 25 components total. Every interactive component uses React Aria for keyboard and screen reader support. Every component references design tokens for its visual properties. Every layout primitive responds to its container's available space without media queries.

The next chapter configures Storybook to document and demonstrate the entire system.

---
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
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
  ],
  framework: '@storybook/react-vite',
};

export default config;
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

| Section | Title prefix | Contents |
|---|---|---|
| Layouts | `Layouts/Stack`, `Layouts/Sidebar`, etc. | One entry per layout primitive |
| Components | `Components/Button`, `Components/Input`, etc. | One entry per UI component |
| Examples | `Examples/Dashboard`, `Examples/LoginPage`, etc. | Composed pages demonstrating the full system |

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

---

## Chapter 10: Testing accessible components

Tests give you confidence to change things. In a component library, that confidence matters more than usual, because a regression in one component affects every consumer of the library. This chapter sets up the testing tools and establishes what to test for each component type.

### Setup

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom vitest-axe
```

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
```

Create `src/test-setup.ts`:

```typescript
import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
```

This extends Vitest's `expect` with DOM matchers (`toBeInTheDocument`, `toHaveClass`, `toHaveAttribute`) and axe-core matchers (`toHaveNoViolations`).

### The two categories of tests

Layout primitive tests verify that the React component correctly sets up the CSS classes and custom properties that the CSS depends on. They don't test the visual layout itself (that's the browser's job).

UI component tests verify behavior: keyboard interaction, ARIA attributes, focus management, and the absence of axe-core violations. They test that the component is usable by keyboard and screen reader users, not just mouse users.

### Testing layout primitives

Layout primitive tests are straightforward. They confirm:

1. The component renders its children.
2. The correct CSS class is applied.
3. Custom `className` is merged.
4. Props set inline custom properties.
5. Omitted props don't set inline styles (the CSS token fallback is used).
6. The `as` prop changes the rendered element.
7. Modifier classes are applied for boolean props.

The Stack tests from Chapter 4 demonstrate this pattern. Every layout primitive uses the same test structure with primitive-specific additions (Sidebar checks for exactly two children, Switcher checks `limit`).

### Testing UI components

UI component tests have more to verify. Here's the standard checklist, followed by an example:

**Rendering:** The component is findable by role and accessible name.

**Keyboard activation:** The component responds to the correct keys (Enter, Space, Arrow keys, Escape).

**Disabled state:** The component has `aria-disabled="true"` and does not respond to interaction.

**Error state:** The component has `aria-invalid="true"` and the error message is linked via `aria-describedby`.

**Focus behavior:** Focus moves to the expected element on interaction (for example, into the dialog on open, back to the trigger on close).

**axe-core audit:** No automated accessibility violations.

```typescript
// src/components/Input/Input.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with its label as the accessible name', () => {
    render(<Input label="Email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('accepts text input', async () => {
    const onChange = vi.fn();
    render(<Input label="Email" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenLastCalledWith('hello');
  });

  it('shows the description and links it via aria-describedby', () => {
    render(<Input label="Email" description="Your work email" />);
    const input = screen.getByRole('textbox');
    const description = screen.getByText('Your work email');
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(description.id));
  });

  it('shows the error message and sets aria-invalid', () => {
    render(<Input label="Email" errorMessage="Required field" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('hides the description when an error message is present', () => {
    render(<Input label="Email" description="Your work email" errorMessage="Required" />);
    expect(screen.queryByText('Your work email')).not.toBeInTheDocument();
  });

  it('marks the input as required', () => {
    render(<Input label="Email" isRequired />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });

  it('disables the input', () => {
    render(<Input label="Email" isDisabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Input label="Email" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations in error state', async () => {
    const { container } = render(<Input label="Email" errorMessage="Required" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
```

Notice the testing approach: every assertion uses accessible queries (`getByRole`, `getByText`) or ARIA attributes (`aria-invalid`, `aria-describedby`, `aria-required`). No test queries by CSS class name or internal DOM structure. This is deliberate. If you refactor the component's markup, the tests still pass as long as the behavior and accessibility contract are preserved. Testing implementation details couples your tests to your markup and makes refactoring painful.

### Running tests

Add scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

```bash
npm test                    # Run all tests once
npm run test:watch          # Re-run on file changes
npx vitest Input            # Run tests for a specific component
npm run test:coverage       # Generate a coverage report
```

### Coverage targets

| Category | Target |
|---|---|
| Layout primitives | 100% of props, class application, custom property injection |
| UI components | Every keyboard path, every ARIA attribute, every state |
| axe-core | Every component passes with zero violations |
| Visual regression | Deferred to a future release |

Full coverage of accessible behavior is more valuable than full line coverage. A test suite that verifies every keyboard path and ARIA attribute catches the regressions that matter most to component library consumers.

---

## Chapter 11: Packaging and distribution

Your library works in Storybook. Your tests pass. Now you need to package it so other projects can install and use it.

### Vite library mode

Vite's library mode produces a clean build output with ESM exports and TypeScript declarations. Install the declaration generation plugin:

```bash
npm install -D vite-plugin-dts
```

Update `vite.config.ts` to add library build configuration:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ include: ['src'] })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

The `external` array tells Vite not to bundle React into the library output. The consuming project provides its own React. This prevents duplicate React instances, which cause hook errors.

### Package.json exports

Configure `package.json` for ESM consumption:

```json
{
  "name": "rudiment-ui",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "vite build",
    "build:tokens": "style-dictionary build --config tokens/style-dictionary.config.js",
    "build:storybook": "storybook build -o storybook-static",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  },
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
  },
  "files": [
    "dist"
  ],
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "sideEffects": [
    "**/*.css"
  ]
}
```

The `exports` field defines the public API. Consumers import components from the main entry (`import { Button } from 'rudiment-ui'`) and styles from the CSS entry (`import 'rudiment-ui/styles'`). The `sideEffects` field tells bundlers not to tree-shake the CSS import.

### Build and verify

```bash
npm run build
```

Vite generates `dist/index.js` (the library code), `dist/index.d.ts` (TypeScript declarations), and `dist/style.css` (the compiled CSS). Verify the output by checking that the exports resolve correctly:

```bash
node -e "import('file://' + process.cwd() + '/dist/index.js').then(m => console.log(Object.keys(m)))"
```

This should print the names of every exported component and utility.

### Publishing

For the self-serve kit (Product 1), you're distributing the source code as a template repo, not publishing to npm. The buyer clones the repo and works with the source directly. The Vite build configuration is there for when the buyer wants to package their customized library for internal distribution within their own organization.

If you do publish to npm (for Product 2 clients or your own use), the process is:

```bash
npm login
npm publish
```

Prefix the package name with your npm scope if needed: `@briley-creative/rudiment-ui`.

### Semantic versioning

For a component library, the versioning rules are:

**Major (1.0.0 -> 2.0.0):** A component's prop interface changes in a way that breaks existing usage. A prop is removed or renamed. The rendered HTML structure changes in a way that breaks consumer CSS selectors. A token name changes.

**Minor (1.0.0 -> 1.1.0):** A new component is added. A new prop is added to an existing component with a default value that preserves existing behavior. A new token is added.

**Patch (1.0.0 -> 1.0.1):** A bug is fixed without changing the API. A dependency is updated. A documentation error is corrected.

Write a CHANGELOG.md that describes each release in human-readable terms. Consuming teams use the changelog to decide whether to upgrade and what to test after upgrading.

---

## Chapter 12: What comes next

You have a working component library: 25 components (14 UI, 8 layout, 3 typography), a token system, Storybook documentation, and tests. This chapter covers the next steps for scaling the system.

### Dark theme

A dark theme doesn't require new components. It requires a second set of semantic token values. The same components render correctly in both themes because they reference semantic tokens, not global values:

```css
.dark {
  --color-text-default: var(--color-neutral-50);
  --color-text-subtle: var(--color-neutral-400);
  --color-background-surface: var(--color-neutral-900);
  --color-background-surface-raised: var(--color-neutral-800);
  --color-border-default: var(--color-neutral-700);
  --color-brand-primary: var(--color-blue-400);
}
```

Add the `.dark` class to the root element, and every component that references `--color-text-default` or `--color-background-surface` switches automatically. No component code changes.

This same pattern supports high-contrast modes, reduced motion preferences, and white-label branding.

### Figma alignment

Design-code drift is one of the most common friction points in design system adoption. Reducing it requires shared naming and shared structure between Figma and code.

Figma Variables (introduced in 2023 and expanded since) map directly to your token architecture. Create Figma variable collections that mirror your token tiers: a "Global" collection with color palette values, a "Semantic" collection with alias variables, and optionally a "Component" collection with per-component overrides. Name the variables the same way you name the tokens.

Tokens Studio for Figma can read your `tokens.json` file directly and sync it into Figma, eliminating manual duplication. The sync can run in both directions: design-to-code or code-to-design. For a library where code is the source of truth (which it should be), code-to-design sync keeps Figma aligned without manual updates.

Figma Code Connect (if you adopt it) maps Figma component properties to code props, so developers see the actual import statement and prop values when they inspect a component in Figma. This is a significant friction reducer for teams with both designers and developers.

### Expanding the component set

The initial 14 UI components cover the essentials. Buyer feedback and your own Product 2 engagements will tell you which components to add next. Common requests:

- **Toast/notification:** Timed, non-blocking feedback messages. Uses React Aria's `useToast`.
- **Dropdown menu:** A button that opens a menu of actions. Uses `useMenuTrigger` + `useMenu`.
- **Popover:** A floating panel triggered by a button. Uses `usePopoverTrigger`.
- **Accordion:** Collapsible content sections. Uses `useAccordion`.
- **Data table:** Sortable, filterable tabular data. This is the most complex component in any library and is a strong candidate for a separate add-on product.

Add components based on demand, not speculation. Every new component increases the maintenance surface and the documentation requirement.

### When a library becomes a design system

A component library is code. A design system is code plus governance: contribution guidelines, decision-making processes, release cadence, support channels, adoption metrics, and a team that owns the system's evolution.

The library you've built in this guide is a component library. It becomes a design system when an organization adopts it as the standard for building interfaces and invests in the operating model that keeps it useful over time. That transition is an organizational change, not a technical one. The code foundation you've built here supports it, but the code alone doesn't make it happen.

If you're interested in that transition, the article ["Design Systems Are Easy Until You Ship One"](https://joshuabriley.com/blog/design-systems-are-easy-until-you-ship-one/) covers the governance, adoption, and support challenges in detail.

### Where to go from here

You have a foundation. It's accessible, token-driven, documented, tested, and composable. The specific components and token values will change as you or your buyers use it. That's the point. The architecture is designed to absorb change without requiring you to rethink the fundamentals.

If building this from scratch isn't the right investment for your team, [Rudiment UI](https://joshuabriley.com/services/starter/) is a pre-built version of this exact architecture, ready to customize and extend.
