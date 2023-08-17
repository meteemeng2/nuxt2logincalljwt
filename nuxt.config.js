import colors from 'vuetify/es5/util/colors'

// Check if the environment variable USE_LOCALHOST is set to true
const useLocalhost = true;
const baseURL = 'http://212.80.212.18'

function get_Identity_URL() {
  return useLocalhost ?
    'http://localhost:8014/api/Authentication/Login'
    :
    `${baseURL}/identityserver/api/Authentication/Login`;
}
function get_ReactClient_URL() {
  return useLocalhost ?
    'http://localhost:7777/portie-client/'
    :
    `${baseURL}/portie-client`;
}
function get_AngularClient_URL() {
  return useLocalhost ?
    'http://localhost:7777/portie-client/'
    :
    `${baseURL}/portie-client`;
}

export default {
  publicRuntimeConfig: {
    IdentityURL: get_Identity_URL(),
    ReactClientURL: get_ReactClient_URL(),
    AngularClientURL: get_AngularClient_URL(),
  },

  privateRuntimeConfig: {
    apiSecret: 'test'
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - NAJA',
    title: 'MENG PORTAL',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    base: '/portal/'
  }
}
