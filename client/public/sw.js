if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let s = Promise.resolve();
      return (
        n[e] ||
          (s = new Promise(async (s) => {
            if ("document" in self) {
              const n = document.createElement("script");
              (n.src = e), document.head.appendChild(n), (n.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!n[e]) throw new Error(`Module ${e} didn’t register its module`);
          return n[e];
        })
      );
    },
    s = (s, n) => {
      Promise.all(s.map(e)).then((e) => n(1 === e.length ? e[0] : e));
    },
    n = { require: Promise.resolve(s) };
  self.define = (s, a, i) => {
    n[s] ||
      (n[s] = Promise.resolve().then(() => {
        let n = {};
        const c = { uri: location.origin + s.slice(1) };
        return Promise.all(
          a.map((s) => {
            switch (s) {
              case "exports":
                return n;
              case "module":
                return c;
              default:
                return e(s);
            }
          })
        ).then((e) => {
          const s = i(...e);
          return n.default || (n.default = s), n;
        });
      }));
  };
}
define("./sw.js", ["./workbox-ea903bce"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/chunks/1a48c3c1.9dc865f2c5350d818826.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/1bfc9850.bbc31134efd612d36bc0.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/2852872c.c2a810545a70b4e4c8a0.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/587f23cf55157b8c77eaed01efbfc92bdba441c8.a2027bc9e4d7aef8aa48.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/75fc9c18.f1b4cb0bfd40d9f72df1.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/846cbae60f485f61f979da07c0f2a48accf05fe6.e44d261221b4d3a19369.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/98f61148.01868d60b03b1bd50fd6.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/a56869957adb61651c5a9e421bcbe4c1ef7465fe.e871bae3af70a62552db.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/b98bc7c3.ce764a7deb09cf226154.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/commons.74773ce580a8c2dec9e6.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/f857666b6b2178d8792f53d59305dde3dba58a29.d112376320ed3c001d70.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/fa67be1206cb53c1dacc5d69ee5fe6f654b2acea.c7a38b30557732071f6b.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/fade129698808294cfb763657565824d1e9e668f.05f844ea8d13e7ada091.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/framework.6fff953eb0f638171baa.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/main-f86405733957a3ef33b4.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/pages/404-0a268e11300f63d9f60f.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/pages/_app-50fde41a5c2e3f63ef5d.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/pages/_error-eb3be8186b5638c75545.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/pages/calendar-776f8b88f9734ed1bbc6.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/pages/index-1648582eb451b0424943.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/pages/login-6e0e496298a419f112d5.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/pages/settings-2e17104254c70bd245c0.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/pages/signup-43782e4be561dec44d07.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/polyfills-6853950cceeb1e05245e.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/chunks/webpack-245f049e565ebf942e09.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/css/1f9e7274cdc6e6886383.css",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/wysw3HyqYC42NC0jKSxXo/_buildManifest.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/_next/static/wysw3HyqYC42NC0jKSxXo/_ssgManifest.js",
          revision: "wysw3HyqYC42NC0jKSxXo",
        },
        {
          url: "/android-icon-192x192.png",
          revision: "d46750b5461264007847b669ec4f8f18",
        },
        {
          url: "/apple-icon-114x114.png",
          revision: "daee7c6c774afa94fed923f30e7c9ea6",
        },
        {
          url: "/apple-icon-120x120.png",
          revision: "c6aebf7037034185a8f738e9b5ff4263",
        },
        {
          url: "/apple-icon-144x144.png",
          revision: "8996ac5987cee34d3e2a3791de2d661c",
        },
        {
          url: "/apple-icon-152x152.png",
          revision: "55028ea3deeefb5676d15a569d0cd498",
        },
        {
          url: "/apple-icon-180x180.png",
          revision: "1469a56e5c7628e8160baef9cd3b723e",
        },
        {
          url: "/apple-icon-57x57.png",
          revision: "1f2823577e87603405f3cc40fbbe6700",
        },
        {
          url: "/apple-icon-60x60.png",
          revision: "d8847a6183d0ad8ba4075675ca2d214a",
        },
        {
          url: "/apple-icon-72x72.png",
          revision: "ca69809ce2ce71e513554c6c66ab1b85",
        },
        {
          url: "/apple-icon-76x76.png",
          revision: "9e1a75e56ea2a392f1f072ff4eadf37e",
        },
        {
          url: "/favicon-16x16.png",
          revision: "caa1f7f96eccb055d4236c3eeb4967be",
        },
        {
          url: "/favicon-32x32.png",
          revision: "08671adc6389509cadc325abda713e53",
        },
        {
          url: "/favicon-96x96.png",
          revision: "41941202a3d8f1259f248e1c8ad43c3e",
        },
        { url: "/favicon.ico", revision: "caa1f7f96eccb055d4236c3eeb4967be" },
        {
          url: "/images/illustration-calendar.svg",
          revision: "a0c5884569b4ac46da90025e09013805",
        },
        {
          url: "/images/illustration-login.svg",
          revision: "75f073e3aa80fe59ddaed4bb367859f8",
        },
        {
          url: "/images/illustration-signup.svg",
          revision: "678941c44a64e4b72d21bc746d8e4934",
        },
        { url: "/logo.png", revision: "56af8553fecfb27fa97cfd0be280f43f" },
        { url: "/manifest.json", revision: "54107dd7f687e980233be0da6d95563c" },
        { url: "/vercel.svg", revision: "4b4f1876502eb6721764637fe5c41702" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: a,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|mp4)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-media-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    );
});
