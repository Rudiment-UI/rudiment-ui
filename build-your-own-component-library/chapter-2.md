## Chapter 2: Project setup

This chapter gets you from an empty directory to a working development environment with Vite, React 19, TypeScript, and Tailwind CSS 4. No components yet, just the foundation.

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

`strict: true` catches type errors early. `jsx: "react-jsx"` enables the automatic JSX runtime, so you don't need to import React in every file. `declaration: true` generates `.d.ts` files that consumers need for TypeScript support.

### Configure Vite

Create `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

For now, this configuration covers the dev server for Storybook development. You add the library build configuration for npm distribution in Chapter 11.

### Set up the directory structure

```bash
mkdir -p src/components src/layouts src/hooks src/utils src/styles
mkdir -p tokens/build
mkdir -p .storybook
mkdir docs
```

Create the main CSS entry point at `src/app.css`:

```css
@import 'tailwindcss';
```

That single line is all Tailwind CSS 4 needs to start. You add the `@theme` directive and token imports in the next chapter.

### Create the utility function

Every component needs a way to merge CSS classes. Create `src/utils/cn.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Install the dependencies:

```bash
npm install clsx tailwind-merge
```

`clsx` handles conditional class joining. `tailwind-merge` resolves Tailwind class conflicts (for example, if a component applies `bg-blue-500` and the consumer passes `bg-red-500`, `tailwind-merge` keeps only the consumer's class). Together, they let consumers override any component style with Tailwind utilities without specificity conflicts.

### Verify the setup

Create a minimal `src/index.ts`:

```typescript
export { cn } from './utils/cn'
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
