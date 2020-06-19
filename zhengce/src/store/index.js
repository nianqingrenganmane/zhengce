import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid: '',
    access_token: '',
    userInfo: {}
  },
  mutations: {
    userId(state, urls) {
      state.userid = urls
    },
    userInfo(state, urls) {
      state.userInfo = urls
    },
    access_token(state, urls) {
      state.access_token = urls
    }
  },
  actions: {

  },
  modules: {}
})