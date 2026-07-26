// Soft dark: the dark palette over the soft neutral ramp, with a brightened
// soft brand accent, Nunito, enlarged radii, and pill buttons.
const PRIMITIVE_GROUPS = new Set(['blue', 'red', 'green', 'amber'])

export default {
  source: [
    'tokens/tokens.json',
    'tokens/themes/dark/semantic.json',
    'tokens/themes/soft-dark/semantic.json',
    'tokens/components.json',
    'tokens/themes/dark/components.json',
    'tokens/themes/soft/tokens.json',
    'tokens/themes/soft/components.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'rudi',
      buildPath: 'tokens/build/',
      files: [
        {
          destination: 'tokens-soft-dark.css',
          format: 'css/variables',
          options: { selector: '[data-theme="soft-dark"]', outputReferences: true },
          filter: (token) => {
            const category = token.path[0]
            if (category === 'spacing' || category === 'motion') return false
            if (category === 'font') return token.path[1] === 'family'
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
