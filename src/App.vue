<template>
    <div>
      <router-view/>
      <FooterGuide v-show="$route.meta.showFooter"/>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    components: {
      FooterGuide
    },
    // 在App初始化的时候就应该获取地址
    created () {
      // this.$store.dispatch('getAddress')
      // this.$store.dispatch('getUserInfo')
      this.getAddress()
      this.getUserInfo()
    },
    methods: {
      ...mapActions(['getAddress', 'getUserInfo'])
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
