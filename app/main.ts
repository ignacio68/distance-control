/**
 * @file Information and help about Covid-19
 *
 * @copyright Ignacio López-Amor Pinillos 2020
 * @author Ignacio López-Amor Pinillos <ignaciolopezamor@gmail.com>
 * @license MIT
 * @version 0.1.0
 */

import Vue from 'nativescript-vue'

import { device, isAndroid, isIOS } from 'tns-core-modules/platform'

import App from './views/App.vue'
import VueDevtools from 'nativescript-vue-devtools'

// Add NativeScript Font Icon plugin
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'

// VUEX
import store from './store'

// Import languages
import i18n from "./setup/i18n"

const v = <any>Vue
declare const TNS_ENV: any

if(TNS_ENV !== 'production') {
  v.use(VueDevtools)
}

// Load TNSFonticon
TNSFontIcon.debug = true
TNSFontIcon.paths = {
  fa: './assets/css/fontawesome.css',
  far: './assets/css/regular.css',
  fas: './assets/css/solid.css',
  fab: './assets/css/brand.css'
}
TNSFontIcon.loadCss()
v.filter('fonticon', fonticon)

// Prints Vue logs when --env.production is *NOT* set while building
v.config.silent = (TNS_ENV === 'production')

v.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

new v({
  store,
  beforeCreate() {
    // Set the platform OS global variable
    v.prototype.IS_ANDROID = isAndroid
    v.prototype.IS_IOS = isIOS
    console.log(`Running on Android? ${isAndroid}`)
    console.log(`Running on iOS? ${isIOS}`)

    // // Set app language
    const val = device.language
    const lang = val.slice(0, 2)
    if (lang) {
      i18n.locale = lang
      console.log("El idioma del navegador es: " + val)
    } else {
      console.log("No se encuentra el idioma del navegador")
    }
  },
  render: h => h('frame', [h(App)])
}).$start()
