import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const fontBase =
  '"InterVariable", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
const fontCode =
  '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'

const theme = create({
  base: 'light',
  brandTitle: 'Rudiment UI',
  fontBase,
  fontCode,
})

addons.setConfig({
  theme,
})
