const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

/**
 * @type {import('tailwindcss').Config}
 * https://tailwindcss.com/docs/configuration
 */
module.exports = {
  content: [
    ...createGlobPatternsForDependencies(__dirname),
    join(
      __dirname,
      '{src,pages,components,containers,screens}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
  ],
  darkMode: 'media', // or 'media' or 'class'
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      // https://tailwindcss.com/docs/customizing-colors
      colors: {},
    },
  },
  plugins: [
    // https://tailwindcss.com/docs/typography-plugin
    require('@tailwindcss/typography'),
    // https://github.com/tailwindlabs/tailwindcss-forms
    require('@tailwindcss/forms'),
    // https://github.com/tailwindlabs/tailwindcss-aspect-ratio
    require('@tailwindcss/aspect-ratio'),
    // https://github.com/tailwindlabs/tailwindcss-container-queries
    require('@tailwindcss/container-queries'),
  ],
};
