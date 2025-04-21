import tailwindcss from '@tailwindcss/vite'

export default {
  compatibilityDate: '2024-11-01',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/user'],
    },
  },

  build: {
    cssMinify: true,
    minify: 'terser',
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['@/main.css'],

  modules: ['@nuxt/icon', '@vueuse/nuxt', '@nuxtjs/seo'],

  icon: {
    mode: 'svg',
    serverBundle: 'auto',
  },

  site: {
    url: 'https://y-link.netlify.app',
    name: 'OneLink',
    description: 'Onelink is a link-in-bio tool, where the data lives in the URL.',
  },

  experimental: {
    renderJsonPayloads: true,
  },

  routeRules: {
    '/*.{svg,css,webp}': {
      swr: true,
      cache: {
        maxAge: 43200,
      },
    },
  },
}
