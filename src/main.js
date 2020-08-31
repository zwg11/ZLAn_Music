import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router'
import Toast from '@/components/common/toast/index.js'
import Audio from '@/components/content/audio/index.js'
import 'assets/css/base.scss';
import 'assets/css/reset.scss';
import 'assets/css/config.scss';
import store from './store'


Vue.use(VueRouter)
Vue.config.productionTip = false
// Vue.prototype.$bus = new Vue()
Vue.use(Toast)
Vue.use(Audio)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
