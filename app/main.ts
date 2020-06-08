/**
 * @file Information and help about Covid-19
 *
 * @copyright Ignacio López-Amor Pinillos 2020
 * @author Ignacio López-Amor Pinillos <ignaciolopezamor@gmail.com>
 * @license MIT
 * @version 0.1.0
 */

import Vue from 'nativescript-vue'

// Load themes
import './styles/scss/global.scss'

import { device, isAndroid, isIOS } from 'tns-core-modules/platform'

import VueDevtools from 'nativescript-vue-devtools'

// Add NativeScript Font Icon plugin
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'

// Import languages
import i18n from "./setup/i18n"

const v = <any>Vue
declare const TNS_ENV: any

if(TNS_ENV !== 'production') {
  v.use(VueDevtools, { host: '192.168.1.101'}) //mobile
}

// Prints Vue logs when --env.production is *NOT* set while building
v.config.silent = (TNS_ENV === 'production')

//----- PLUGINS -----//
import NSVueShadow from 'nativescript-vue-shadow'
v.use(NSVueShadow)

//----- COMPONENTS -----//
// Fonticon
TNSFontIcon.debug = false
TNSFontIcon.paths = {
  fa: './assets/styles/css/font-awesome/fontawesome.min.css',
  far: './assets/styles/css/font-awesome/regular.min.css',
  fas: './assets/styles/css/font-awesome/solid.min.css',
  fab: './assets/styles/css/font-awesome/brands.min.css'
}
TNSFontIcon.loadCss()
v.filter('fonticon', fonticon)

// Side Drawer
v.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)
  
// Mapbox component
v.registerElement('Mapbox', () => require('nativescript-mapbox').MapboxView)

// Floating action button
v.registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
)

import AppNavigator from './views/AppNavigator.vue'
  
new v({
  beforeCreate() {
    // Set the platform OS global variable
    v.prototype.IS_ANDROID = isAndroid
    v.prototype.IS_IOS = isIOS
    console.log(`Running on Android? ${isAndroid}`)
    console.log(`Running on iOS? ${isIOS}`)

    // Set app language
    const val = device.language
    const lang = val.slice(0, 2)
    if (lang) {
      i18n.locale = lang
      console.log("El idioma del navegador es: " + val)
    } else {
      console.log("No se encuentra el idioma del navegador")
    }
  },
  render: h => h('frame', [h(AppNavigator)])
}).$start()
