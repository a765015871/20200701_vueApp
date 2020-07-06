

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button, Tab, Tabs} from 'vant'
import './mock/mockServer'
//注册全局组件标签
Vue.use(Button)
Vue.use(Tab)
Vue.use(Tabs)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
