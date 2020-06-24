/**
 * @file Information and help about Covid-19
 *
 * @copyright Ignacio López-Amor Pinillos 2020
 * @author Ignacio López-Amor Pinillos <ignaciolopezamor@gmail.com>
 * @license MIT
 * @version 0.4.0
 */

import Vue from 'nativescript-vue'

// Internationalization
import { i18n, setLanguage } from '@/locales'

// //----- Plugins -----// 
import './plugins/Composition'
import './plugins/Mapbox'

// //----- Components -----//
import './plugins/Components'

// composable
import  useUser  from './composables/useUser'

import AppNavigator from './views/AppNavigator.vue'
import Welcome from './views/Welcome/Welcome.vue'
// import FakePage from './fake/FakePage.vue'

import { isAndroid, isIOS } from 'tns-core-modules/platform'

import VueDevtools from 'nativescript-vue-devtools'

const v = <any>Vue
declare const TNS_ENV: any

if(TNS_ENV !== 'production') {
  v.use(VueDevtools, { host: '192.168.1.101'}) //mobile
}

// Prints Vue logs when --env.production is *NOT* set while building
v.config.silent = (TNS_ENV === 'production')
 
new v({
  i18n,
  beforeCreate() {
    // Set the platform OS global variable
    v.prototype.IS_ANDROID = isAndroid
    v.prototype.IS_IOS = isIOS
    console.log(`Running on Android? ${isAndroid}`)
    console.log(`Running on iOS? ${isIOS}`)

    setLanguage()
  },
  render: h => h('frame', [h(Welcome)])
  // render: h => h('frame', [h(useUser ? AppNavigator : Welcome)])
}).$start()
