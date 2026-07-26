// Compressed (light): default palette + typeface, with a very tight spacing
// scale and a very small radius scale. Colors + font cascade from :root; only
// spacing, radius, and the tokens that reference them are emitted.
export default {
  source: [
    'tokens/tokens.json',
    'tokens/semantic.json',
    'tokens/components.json',
    'tokens/themes/compressed/tokens.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'rudi',
      buildPath: 'tokens/build/',
      files: [
        {
          destination: 'tokens-compressed.css',
          format: 'css/variables',
          options: { selector: '[data-theme="compressed"]', outputReferences: true },
          filter: (token) => {
            const category = token.path[0]
            if (category === 'color' || category === 'font' || category === 'motion') return false
            return true
          },
        },
      ],
    },
  },
}
