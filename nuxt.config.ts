// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true
  },
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: {
    icon: "ElIcon",
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
  ] 
})