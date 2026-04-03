// Primitive token groups that are theme-invariant and should be excluded from themed output
const PRIMITIVE_GROUPS = new Set(['blue', 'red', 'green', 'amber'])
const PRIMITIVE_CATEGORIES = new Set(['spacing', 'radius', 'motion'])

export default {
  source: [
    'tokens/tokens.json',
    'tokens/themes/cyberpunk/tokens.json',
    'tokens/themes/cyberpunk-dark/tokens.json',
    'tokens/themes/cyberpunk-dark/semantic.json',
    'tokens/components.json',
    'tokens/themes/cyberpunk-dark/components.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'token',
      buildPath: 'tokens/build/',
      files: [
        {
          destination: 'tokens-cyberpunk-dark.css',
          format: 'css/variables',
          options: {
            selector: '[data-theme="cyberpunk-dark"]',
            outputReferences: true,
          },
          filter: (token) => {
            const category = token.path[0]
            // Exclude theme-invariant primitives (spacing, radius, motion)
            if (PRIMITIVE_CATEGORIES.has(category)) return false
            // Allow font-family through (cyberpunk overrides the typeface)
            if (category === 'font') {
              return token.path[1] === 'family'
            }
            // Exclude primitive color ramps but include semantic + component color tokens
            if (category === 'color') {
              const group = token.path[1]
              if (group === 'dataviz') {
                return String(token.path[2]).startsWith('series')
              }
              return !PRIMITIVE_GROUPS.has(group)
            }
            // Include component and typography tokens so they re-resolve in cyberpunk-dark scope
            return true
          },
        },
      ],
    },
  },
}
