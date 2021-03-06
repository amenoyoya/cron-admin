import path from 'path'

/**
 * process.env form .env
 */
require('dotenv').config()

export default {
  /**
   * environment variables
   */
  env: process.env,

  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  serverMiddleware: [],
  server: {
    port: process.env.APP_PORT || 3000,
    // host: '0.0.0.0',
    // timing: false,
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // css files for client mode plugins
      { rel: 'stylesheet', href: '/css/vuejs-dialog.min.css' },
      { rel: 'stylesheet', href: '/css/vue-sidebar-menu.css' },
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    // <i class="fa-*"> で fontawesome を使えるように
    '@fortawesome/fontawesome-free-webfonts',
    '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
    // tailwind.css imports
    '~assets/css/tailwind.css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {src: '~/plugins/dayjs'},
    {src: '~/plugins/axios.js'},
    {src: '~/plugins/vee-validate.js'},
    {src: '~/plugins/ui.js', mode: 'client'},
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    'nuxt-purgecss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/proxy',
    ['cookie-universal-nuxt', { parseJSON: false }],
    'vue-ctk-date-time-picker/nuxt',
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    /**
     * VeeValidate rules
     */
    transpile: [
      'vee-validate/dist/rules',
    ],
    /**
     * PostCSS settings
     */
    postcss: {
      plugins: {
        'postcss-import': {}, // css で @import を有効化
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        'postcss-nested': {}, // css で scss のように nested style 定義を有効化
      }
    },
    preset: {
      stage: 1 // ref https://tailwindcss.com/docs/using-with-preprocessors#future-css-featuress
    },
    /**
     * PurgeCSS settings
     * 本番ビルド時に余分な CSS を削除
     */
    purgeCSS: {
      mode: 'postcss',
      enabled: process.env.NODE_ENV === 'production',
    }
  },
  /**
   * @nuxtjs/proxy settings
   */
  proxy: {
    '/maildev': {
      target: process.env.MAILDEV_URI,
    },
  },
}
