// Primitive token groups that are theme-invariant and should be excluded from themed output
const PRIMITIVE_GROUPS = new Set(['blue', 'red', 'green', 'amber'])
const PRIMITIVE_CATEGORIES = new Set(['spacing', 'radius', 'font', 'motion'])

export default {
  source: [
    'tokens/tokens.json',
    'tokens/themes/teal/tokens.json',
    'tokens/themes/teal/semantic.json',
    'tokens/components.json',
    'tokens/themes/teal/components.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'token',
      buildPath: 'tokens/build/',
      files: [
        {
          destination: 'tokens-teal.css',
          format: 'css/variables',
          options: {
            selector: '[data-theme="teal"]',
            outputReferences: true,
          },
          filter: (token) => {
            const category = token.path[0]
            // Exclude theme-invariant primitives (spacing, radius, font, motion)
            if (PRIMITIVE_CATEGORIES.has(category)) return false
            // Exclude primitive color ramps but include semantic + component color tokens
            if (category === 'color') {
              const group = token.path[1]
              if (group === 'dataviz') {
                return String(token.path[2]).startsWith('series')
              }
              return !PRIMITIVE_GROUPS.has(group)
            }
            // Include component and typography tokens so they re-resolve in teal scope
            return true
          },
        },
      ],
    },
  },
}
