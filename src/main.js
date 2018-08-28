// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './utils/http'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import Vuex from 'vuex'
import store from './store'
import VConsole from 'vconsole'
import '@/filter/filter'
// require styles
import 'lib-flexible/flexible'
import 'swiper/dist/css/swiper.css'
import '@/assets/reset.scss'
import '@/assets/fonts/iconfont.css'

new VConsole()

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.prototype.$http = http
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
