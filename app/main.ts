/**
 * @file Information and help about Covid-19
 *
 * @copyright Ignacio López-Amor Pinillos 2020
 * @author Ignacio López-Amor Pinillos <ignaciolopezamor@gmail.com>
 * @license MIT
 * @version 0.4.0
 */

import Vue from 'nativescript-vue'

// Load themes
import './styles/scss/global.scss'

// Internationalization
import i18n from "./setup/i18n"

//----- Plugins -----//
import './plugins/BottomSheet'
import './plugins/FloatingActionButton'
import './plugins/FontIcon'
import './plugins/Mapbox'
import './plugins/RadSideDrawer'
import './plugins/Slider'
import './plugins/VShadow'

import { device, isAndroid, isIOS } from 'tns-core-modules/platform'

import VueDevtools from 'nativescript-vue-devtools'

const v = <any>Vue
declare const TNS_ENV: any

if(TNS_ENV !== 'production') {
  v.use(VueDevtools, { host: '192.168.1.101'}) //mobile
}

// Prints Vue logs when --env.production is *NOT* set while building
v.config.silent = (TNS_ENV === 'production')

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
