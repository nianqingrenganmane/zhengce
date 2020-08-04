import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAxios from 'vue-axios'
import Vant from "vant";
import "vant/lib/index.css";
import "amfe-flexible/index.js";
import "swiper/css/swiper.css";
import axios from './https'
import md5 from 'js-md5'
import VueScroller from 'vue-scroller'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Vant);
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
Vue.use(VueScroller)
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.prototype.$urls = 'https://www.yuanqucha.com:8300'
// https://www.yuanqucha.com:8300
// https://23.jijieit.com:8300/
Vue.prototype.$axios.defaults.baseURL = 'https://www.yuanqucha.com:8300'
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");