/**
 * Store 入口
 **/
import Vue from 'vue'
import Vuex from 'vuex'
import msiteTask from './MsiteTask'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    msiteTask
  }
})
