import Vue from 'vue'
import Vuex from 'vuex'
import VueXAlong from 'vuex-along'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userid: '',
    access_token: '',
    userInfo: {},
    initLink: '',
    setItude: {}
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
    },
    setInitLink(state, initLink) {
      state.initLink = initLink
    },
    setItude(state, itude) {
      state.setItude = itude
      console.log(itude, 1111111111)
    }
  },
  actions: {

  },
  modules: {},

  plugins: [VueXAlong({
    name: 'along', //存放在localStroage或者sessionStroage 中的名字
    local: false, //是否存放在local中  false 不存放 如果存放按照下面session的配置配
    session: {
      list: [],
      isFilter: true
    } //如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
  })]
})