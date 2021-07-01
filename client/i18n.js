module.exports = {
  locales: ["en-US", "de-DE"],
  defaultLocale: "en-US",
  pages: {
    "*": ["common"],
    "/": ["home"],
  },
  interpolation: {
    prefix: "${",
    suffix: "}",
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./translations/${locale}/${namespace}.json`).then((m) => m.default),
};
