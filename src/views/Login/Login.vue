<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginState}" @click="loginState=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginState}" @click="loginState=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="submitClick">
          <div :class="{on: loginState}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!phoneState" class="get_verification" @click.prevent="sendPhone" :class="{on :phoneState}">
                {{timeCount>0?`已发送(${timeCount})`:`获取验证码`}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginState}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" :src="captchaImg" alt="captcha"
                @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </div>
</template>

<script>
  import {reqPwdLogin, reqSmsLogin, reqSendCode} from '../../api'
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {Toast} from 'vant'
  export default {
    components: {
      AlertTip
    },
    data () {
      return {
        loginState: false, // true: 为短信登陆 false: 为密码登陆
        phone: '',
        timeCount: 0,
        showPwd: false,
        pwd: '',
        alertShow: false,
        alertText: '',
        name: '',
        captcha: '',
        code: ''
      }
    },
    computed: {
      phoneState () {
        if (this.timeCount>0){
          return false
        }else {
          return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)
        }
      },
      captchaImg () {
        return 'http://localhost:4000/captcha?time=' + Date.now()
      }
    },
    methods: {
      getCaptcha () {
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      },
      // 获取手机短信验证码
      async sendPhone() {
        if (this.timeCount === 0) {
          this.timeCount = 30
          this.intervalId = setInterval(() => {
            this.timeCount--
            if (this.timeCount <= 0) {
              clearInterval(this.intervalId)
            }
          }, 1000)
          // 异步发送获取验证码的请求
          // var ACCOUNT_SID = '8a216da8730561fd01730ab55feb033b';
          // var AUTH_TOKEN = '30d7f42f51944ca8be0a59f7d0329be8';
          // var Rest_URL = 'https://app.cloopen.com:8883';
          // var AppID = '8a216da8730561fd01730ab560da0342';
          const result = await reqSendCode(this.phone)

          if (result.code===1){ //失败
            this.showAlert(result.msg)
            if (this.timeCount){ //发送失败停止计时器
              this.timeCount = 0
              clearInterval(this.intervalId)
            }
          }
        }
      },
      async submitClick() {

        let result
        const {phone, code} = this
        const {name, pwd, captcha} = this
        if (this.loginState) { // 短信登陆
          if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
            // 手机号不正确
            this.showAlert('手机号不正确')
            return
          } else if (!/^\d{6}$/.test(code)) {
            // 验证码必须是6位数字
            this.showAlert('验证码必须是6位数字')
            return
          }
          Toast.loading({
            duration: 0, // 持续展示 toast
            message: '登陆中...',
            forbidClick: true,
          })
          // 短信登陆
          result = await reqSmsLogin(phone, code)
        } else {
          if (!name.length > 0 || !pwd.length > 0) {
            // 用户名或密码不能为空
            this.showAlert('用户名或密码不能为空')
            return
          } else if (captcha.length!=4) {
            // 验证码必须是4位数字
            this.showAlert('验证码必须是4位')
            return
          }
          Toast.loading({
            duration: 0, // 持续展示 toast
            message: '登陆中...',
            forbidClick: true,
          })
          result = await reqPwdLogin(name, pwd, captcha)
        }
        Toast.clear()
        if (result.code===0){ //成功
          const userInfo = result.data
          this.$store.dispatch('recordUser', userInfo)
          this.$router.replace('/porfile')
        }else {
          this.getCaptcha() // 更变图片验证码
          this.showAlert(result.msg)
        }

      },
      closeTip () {
        this.alertShow = false
        this.alertText = ''
      },
      showAlert (alertText) {
        this.alertShow = true
        this.alertText = alertText
      }
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.on
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
