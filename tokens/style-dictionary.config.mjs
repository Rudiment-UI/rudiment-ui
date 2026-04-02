export default {
  source: [
    'tokens/tokens.json',
    'tokens/semantic.json',
    'tokens/components.json',
  ],
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
            outputReferences: true,
          },
        },
      ],
    },
  },
}
