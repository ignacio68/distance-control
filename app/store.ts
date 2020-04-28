import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '@/store/types'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    appName: 'Covid-19 application',
    appVersion: '0.0.1'
  },
  modules: {},
  plugins: []
}
 
export default new Vuex.Store<RootState>(store)
