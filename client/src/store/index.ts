import Vue from 'vue'
import Vuex from 'vuex'

import comparator from './comparator.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    comparator
  }
})
