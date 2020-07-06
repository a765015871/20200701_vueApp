
import {
  reqAddress, reqShops, reqCategorys,
  reqUser, reqLogout, reqShopInfo,
  reqShopRatings, reqShopGoods
} from '../../api'
import {
  RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS,
  RECEIVE_USER_INFO, RESET_USER_INFO, RECEIVE_GOODS,
  RECEIVE_INFO, RECEIVE_RATINGS
} from './mutation-type'

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
    // 商家数组
    shops: [],
    // 登陆的用户信息
    userInfo: {},
    // 商品列表
    goods: [],
    // 商家评价列表
    ratings: [],
    // 商家信息
    info: {},
    // 购物车中食物的列表
    cartFoods: [],
    // 搜索得到的商家列表
    searchShops: [],
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
    },
    // 同步登陆的用户信息
    recordUser ({commit}, userInfo) {
      commit(RECEIVE_USER_INFO, {userInfo})
    },
    // 获取用户信息
    async getUserInfo ({commit}) {
      const result = await reqUser()
      if (result.code===0){
        const userInfo = result.data
        commit(RECEIVE_USER_INFO, {userInfo})
      }
    },
    async logout ({commit}) {
      const result = await reqLogout()
      if (result.code===0){
        commit(RESET_USER_INFO)
      }
    },
    // 异步获取商家信息
    async getShopInfo({commit}) {
      const result = await reqShopInfo()
      if (result.code === 0) {
        const info = result.data
        commit(RECEIVE_INFO, {info})
      }
    },
    // 异步获取商家评价列表
    async getShopRatings({commit}, callback) {
      const result = await reqShopRatings()
      if (result.code === 0) {
        const ratings = result.data
        commit(RECEIVE_RATINGS, {ratings})
        // 数据更新了, 通知一下组件
        callback && callback()
      }
    },
    // 异步获取商家商品列表
    async getShopGoods({commit}, callback) {
      const result = await reqShopGoods()
      if (result.code === 0) {
        const goods = result.data
        commit(RECEIVE_GOODS, {goods})
        // 数据更新了, 通知一下组件
        callback && callback()
      }
    },
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
    },
    [RECEIVE_USER_INFO] (state, {userInfo}){
      state.userInfo = userInfo
    },
    [RESET_USER_INFO] (state) {
      state.userInfo = {}
    },
    [RECEIVE_INFO](state, {info}) {
      state.info = info
    },

    [RECEIVE_RATINGS](state, {ratings}) {
      state.ratings = ratings
    },

    [RECEIVE_GOODS](state, {goods}) {
      state.goods = goods
    },
  },
  getters: {

  }
}
