// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ['@pinia/nuxt', "@nuxtjs/tailwindcss"],
  plugins: [
    '~/plugins/pinia.ts',
  ],
})