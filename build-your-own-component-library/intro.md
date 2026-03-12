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

| Chapter | Title                                 | What you'll build                                          |
| ------- | ------------------------------------- | ---------------------------------------------------------- |
| 1       | The architecture before the code      | Nothing (decisions only)                                   |
| 2       | Project setup                         | Empty repo with Vite, React 19, TypeScript, Tailwind CSS 4 |
| 3       | Design tokens from scratch            | Three-tier token system with Style Dictionary and @theme   |
| 4       | Your first layout primitive: Stack    | Stack component with token-driven spacing                  |
| 5       | The rest of the layout system         | Box, Center, Cluster, Sidebar, Switcher, Grid, Cover       |
| 5b      | Typography: Heading, Text, and Prose  | Three typography components with long-form content rhythm  |
| 6       | Accessible components with React Aria | Button and Input with full keyboard and ARIA support       |
| 7       | Form components                       | Select, Checkbox, RadioGroup, Switch                       |
| 8       | Overlays and feedback                 | Dialog, Tooltip, Alert, Badge                              |
| 9       | Storybook as your documentation layer | Configuration, story conventions, the kitchen sink page    |
| 10      | Testing accessible components         | Vitest, Testing Library, axe-core patterns                 |
| 11      | Packaging and distribution            | Vite library mode, npm publishing, versioning              |
| 12      | What comes next                       | Theming, Figma alignment, scaling the system               |

---
