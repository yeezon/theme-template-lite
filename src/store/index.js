import Vue from 'vue'
import Vuex from 'vuex'

import setting from './modules/setting'
import site from './modules/site'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    setting,
    site
  }
})
