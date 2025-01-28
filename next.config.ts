const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", 
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/, // Cache all HTTP/HTTPS requests
      handler: "NetworkFirst",
      options: {
        cacheName: "http-cache",
        networkTimeoutSeconds: 15,
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
        fallback: {
          document: '/offline.html',
        },
      },
    },
    {
      urlPattern: /^\/_next\/.*$/, // Cache Next.js static assets
      handler: "CacheFirst",
      options: {
        cacheName: "next-static-files",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /^\/static\/.*$/, // Cache custom static assets
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com\/.*/, // Cache Google Fonts
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
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
