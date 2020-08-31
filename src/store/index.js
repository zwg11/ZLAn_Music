import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations.js'
import actions from './actions'
// import getters from './getters'
Vue.use(Vuex);

const state = {
  currentIndex: 0
}

let store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store

