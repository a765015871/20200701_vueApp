<template>
    <div>
      <ShopHeader/>
      <van-tabs  :color="'#02a774'" title-active-color="#02a774">
        <van-tab title="点餐" to="/shop/goods" >
        </van-tab>
        <van-tab title="评价" to="/shop/pingjia" >
        </van-tab>
        <van-tab title="商家" to="/shop/info"  >
        </van-tab>
      </van-tabs>
      <router-view/>
    </div>
</template>

<script>
  import ShopHeader from '../../../components/ShopHeader/ShopHeader'
  export default {
    components: {
      ShopHeader
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">

</style>
