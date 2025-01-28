const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "http-cache",
        networkTimeoutSeconds: 15,
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
        fallback: {
          document: "/offline.html",
        },
      },
    },
    {
      urlPattern: /^\/_next\/.*$/,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static-files",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^\/static\/.*$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com\/.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60,
        },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ethiohajj.com",
        pathname: "/storage/photo/**",
      },
    ],
  },
});
