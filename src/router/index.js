

import Vue from 'vue'
import VueRouter from 'vue-router'

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
      component: () => import('../views/Msite/Shop/Shop'),
      children: [
        {
          path: '/shop/goods',
          component: () => import('../views/Msite/Shop/ShopGoods/ShopGoods')
        },
        {
          path: '/shop/ratings',
          component: () => import('../views/Msite/Shop/ShopRatings/ShopRatings')
        },
        {
          path: '/shop/info',
          component: () => import('../views/Msite/Shop/ShopInfo/ShopInfo')
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
  ]
})
