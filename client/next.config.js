const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withNextTranslate = require("next-translate");

const pwaSettings = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
});

const translateSettings = withNextTranslate({
  webpack5: true,
  i18n: {
    locales: ["en-US", "de-DE"],
    defaultLocale: "en-US",
  },
});

module.exports = withNextTranslate(
  withPWA({
    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
    },
  })
);
