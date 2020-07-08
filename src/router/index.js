

import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../views/Msite/Msite'
import Search from '../views/Search/Search'
import Order from '../views/Order/Order'
import Porfile from '../views/Porfile/Porfile'
import Login from '../views/Login/Login'
import Shop from '../views/Msite/Shop/Shop'
import ShopGoods from '../views/Msite/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../views/Msite/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../views/Msite/Shop/ShopInfo/ShopInfo'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: () => import('../views/Msite/Msite'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: () => import('../views/Search/Search'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: () => import('../views/Order/Order'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/porfile',
      component: () => import('../views/Porfile/Porfile'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: () => import('../views/Login/Login')
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
  ]
})
