/**
 * @file Information and help about Covid-19
 *
 * @copyright Ignacio López-Amor Pinillos 2020
 * @author Ignacio López-Amor Pinillos <ignaciolopezamor@gmail.com>
 * @license MIT
 * @version 0.6.0
 */

import Vue from 'nativescript-vue'

// Interfaces
import { RoutePath } from './routes/routes'

// Internationalization
import { i18n, setLanguage } from '@/locales'

// //----- Plugins -----//
import './plugins/Composition'
import './plugins/Mapbox'
import './plugins/Navigator'

// //----- Components -----//
import './plugins/Components'

// composable
// import { reactive, computed } from '@vue/composition-api'
// import  { useUser } from './composables/useUser'
// import { getUser as user } from './store/user'
import { getUser as user } from './store/user'

// import { isAndroid, isIOS } from 'tns-core-modules/platform'

import VueDevtools from 'nativescript-vue-devtools'

// import AppNavigator from './views/AppNavigator.vue'
// import Welcome from './views/Welcome/Welcome.vue'
// import { userLogin } from './api'
// import FakePage from './fake/FakePage.vue'
// FIXME: initial view
const loggedIn = user.isLogged
const initialRoute: RoutePath = loggedIn ? '/home' : '/welcome'

const v = <any>Vue

declare const TNS_ENV: any
if (TNS_ENV !== 'production') {
  // v.use(VueDevtools, { host: '192.168.1.101'}) //mobile
  v.use(VueDevtools) // mobile
}

// Prints Vue logs when --env.production is *NOT* set while building
v.config.silent = (TNS_ENV === 'production')

new v({
  i18n,
  data() {
    return{}
  },
  beforeCreate() {
    // Set the platform OS global variable
    // v.prototype.IS_ANDROID = isAndroid
    // v.prototype.IS_IOS = isIOS

    setLanguage()
  },
  render: h => h("Navigator", { attrs: { defaultRoute: initialRoute }})
  // render: h => h('frame', [h(navigation)])
  // render: h => h('frame', [h(AppNavigator)])
  // render: h => h('frame', [h(Welcome)])
}).$start()
