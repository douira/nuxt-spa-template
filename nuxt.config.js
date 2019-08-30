import getVersion from "./util/version"
import consola from "consola"

//get dev env
const dev = process.env.NODE_ENV !== "production"

//get version and log
const buildVersion = getVersion(dev)
consola.info(`Build version is ${buildVersion.formatted}`)

export default {
  //allow for static generation
  mode: "spa",

  //generate into github pages dir
  generate: "docs",

  //setup dev env
  env: {
    //define the version variable to allow display of the built version
    buildVersion,

    //dev env
    dev,
  },

  //Headers of the page
  head: {
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
    ]
  },

  css: ["~/assets/style/global.css"],

  //Plugins to load before mounting the App
  plugins: ["~/plugins/bus"],

  axios: {
    //use given url or default dev url
    baseURL,
    https: true
  },

  vuetify: {
    optionsPath: "~/util/vuetify.options.js",
    defaultAssets: { font: true, icons: "mdi" },
    //customVariables: ["~/assets/style/variables.scss"],

    //always enable to allow changing of SCSS variables
    //treeShake: true
  },

  //Nuxt.js modules
  modules: [
    //http request module
    "@nuxtjs/axios"
  ],
  buildModules: [
    "@nuxtjs/vuetify"
    
  ],

  //Build configuration
  modern: true,
  build: {
    parallel: true,
    cache: true
  }
}
