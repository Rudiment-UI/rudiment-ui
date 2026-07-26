// Compressed dark: the dark palette plus the compressed spacing + radius
// scales. Emits dark semantic colors alongside the tight scales.
const PRIMITIVE_GROUPS = new Set(['blue', 'neutral', 'red', 'green', 'amber'])

export default {
  source: [
    'tokens/tokens.json',
    'tokens/themes/dark/semantic.json',
    'tokens/components.json',
    'tokens/themes/dark/components.json',
    'tokens/themes/compressed/tokens.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'rudi',
      buildPath: 'tokens/build/',
      files: [
        {
          destination: 'tokens-compressed-dark.css',
          format: 'css/variables',
          options: { selector: '[data-theme="compressed-dark"]', outputReferences: true },
          filter: (token) => {
            const category = token.path[0]
            if (category === 'font' || category === 'motion') return false
            if (category === 'color') {
              const group = token.path[1]
              if (group === 'dataviz') return String(token.path[2]).startsWith('series')
              return !PRIMITIVE_GROUPS.has(group)
            }
            return true
          },
        },
      ],
    },
  },
}
