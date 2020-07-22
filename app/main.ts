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
// import { userLogin } from './api'
import { getUser as user } from './store/user'

import VueDevtools from 'nativescript-vue-devtools'

const loggedIn = user.isLogged
const initialRoute: RoutePath = loggedIn ? '/home' : '/welcome'

const v = <any>Vue

declare const TNS_ENV: any
if (TNS_ENV !== 'production') {
  // v.use(VueDevtools, { host: '192.168.1.101'}) //mobile
  v.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
v.config.silent = (TNS_ENV === 'production')

new v({
  i18n,
  data() {
    return{}
  },
  beforeCreate() {
    setLanguage()
  },
  render: h => h("Navigator", { attrs: { defaultRoute: initialRoute }})
}).$start()
