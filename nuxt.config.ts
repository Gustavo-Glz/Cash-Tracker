// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ['zod']
    }
  },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', 'nuxt-nodemailer', 'nuxt-auth-utils'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'es'
      }
    }
  }
})
