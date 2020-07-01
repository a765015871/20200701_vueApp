
import {reqAddress, reqShops, reqCategorys} from '../../api'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from './mutation-type'

export default {
  state: {
    // 纬度
    latitude: 28.197226,
    // 经度
    longitude: 113.070267,
    // 地址信息对象
    address: {},
    // 分类数组
    categorys: [],
    //商家数组
    shops: [],
  },
  actions: {
    // 异步获取地址
    async getAddress ({commit, state}) {
      const geohash = state.latitude + ',' + state.longitude
      const result = await reqAddress(geohash)
      if (result.code===0){
        const address = result.data
        commit(RECEIVE_ADDRESS, {address})
      }
    },
    // 异步获取分类列表
    async getCategorys ({commit}) {
      const result = await reqCategorys()
      if (result.code===0){
        const categorys = result.data
        commit(RECEIVE_CATEGORYS, {categorys})
      }
    },
    // 异步获取商家列表
    async getShops ({commit, state}) {
      const {latitude, longitude} = state
      const result = await reqShops({latitude, longitude})
      if (result.code===0){
        const shops = result.data
        commit(RECEIVE_SHOPS, {shops})
      }
    }
  },
  mutations: {
    [RECEIVE_ADDRESS] (state, {address}){
      state.address = address
    },
    [RECEIVE_CATEGORYS] (state, {categorys}){
      state.categorys = categorys
    },
    [RECEIVE_SHOPS] (state, {shops}){
      state.shops = shops
    }
  },
  getters: {

  }
}
