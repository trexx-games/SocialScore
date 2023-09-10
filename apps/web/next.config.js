// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const nextTranslate = require('next-translate-plugin');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  i18n: {
    localeDetection: false,
    locales: ['zh-cn', 'en'],
    defaultLocale: 'en',
  },
  images: { domains: ['tailwindcss.com'] },
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ['@stack/data-access'],
  productionBrowserSourceMaps: process.env.ANALYZE === 'true',
  compiler: {
    // according to https://nextjs.org/docs/advanced-features/compiler#styled-components
    styledComponents: true,
  },
};

/**
 * =================================
 * Defined plugins
 * =================================
 **/
const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,

  /**
   * -------------------------
   * [Translation] Plugin
   * -------------------------
   * checkout https://github.com/aralroca/next-translate#add-next-translate-plugin
   **/
  nextTranslate,
];

/**
 * =================================
 * Composing plugins
 * =================================
 **/
module.exports = composePlugins(...plugins)(nextConfig);
