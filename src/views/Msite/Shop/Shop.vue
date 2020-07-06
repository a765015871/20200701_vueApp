<template>
    <div>
      <ShopHeader/>
      <van-tabs  :color="'#02a774'" title-active-color="#02a774">
        <van-tab title="点餐" to="/shop/goods" replace>
        </van-tab>
        <van-tab title="评价" to="/shop/ratings" replace>
        </van-tab>
        <van-tab title="商家" to="/shop/info" replace>
        </van-tab>
      </van-tabs>
      <router-view/>
    </div>
</template>

<script>
  import ShopHeader from '../../../components/ShopHeader/ShopHeader'
  export default {
    created() {
      this.$store.dispatch('getShopInfo')
    },
    components: {
      ShopHeader
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
