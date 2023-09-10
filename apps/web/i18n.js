/**
 * For more information please refer to documentation
 * https://github.com/vinissimus/next-translate#add-i18njs-config-file
 */
module.exports = {
  locales: ['zh-cn', 'en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'screen'],
  },
  loadLocaleFrom: (lang, ns) => {
    // refer to https://github.com/aralroca/next-translate/issues/851#issuecomment-1305227661
    // You can use a dynamic import, fetch, whatever. You should
    // return a Promise with the JSON file.
    const m = require(`libs/shared-assets/src/locales/${lang}/${ns}.json`);
    return Promise.resolve(m);
  },
};
