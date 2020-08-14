import * as pkg from "./package"
import getVersion from "./util/version"
import consola from "consola"

//get dev env
const dev = process.env.NODE_ENV !== "production"

//only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: `/${pkg.name}/`
        }
      }
    : {}

//get version and log
const buildVersion = getVersion(dev)
consola.info(`Build version is ${buildVersion.formatted}`)

export default {
  //allow telemetry
  telemetry: true,

  //allow for static generation
  mode: "spa",

  //use different router when generating for ghpages
  ...routerBase,

  //setup dev env
  env: {
    //define the version variable to allow display of the built version
    buildVersion,

    //dev env
    dev
  },

  //Headers of the page
  head: {
    //set the language to english, this also helps hyphenation of text in browsers
    htmlAttrs: {
      lang: "en"
    },

    title: "Nuxt SPA Template by douira",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: pkg.description
      }
    ],

    //link the favicon and the roboto font
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i"
      },
      {
        rel: "stylesheet",
        href:
          "https://unpkg.com/@mdi/font@latest/css/materialdesignicons.min.css"
        //"https://unpkg.com/@mdi/font@5.0.45/css/materialdesignicons.min.css"
      }
    ]
  },

  css: ["~/assets/style/global.css"],

  //Plugins to load before mounting the App
  plugins: ["~/plugins/bus"],

  axios: {
    https: true
  },

  vuetify: {
    optionsPath: "~/util/vuetify.options.js",
    //configure to not include Roboto, and use mdi as the default icons
    defaultAssets: { font: false, icons: false }
    //customVariables: ["~/assets/style/variables.scss"],

    //always enable to allow changing of SCSS variables
    //treeShake: true
  },

  //Nuxt.js modules
  modules: [
    //http request module
    "@nuxtjs/axios"
  ],
  buildModules: ["@nuxtjs/vuetify"],

  //Build configuration
  modern: true,
  build: {
    parallel: true,
    cache: true
  }
}
