<template>
  <div class="land_body">
    <div class="land">
      <div class="land_logo"><img src="/imgs/ouyeellogo.png" /></div>
      <div class="land_c">
        <h3>用户登录</h3>
        <form action="" method="get">
          <div class="box user_text">
            <em></em
            ><input
              class="text"
              name=""
              type="text"
              placeholder="请输入用户名"
              v-model="param.phone"
            />
          </div>
          <div class="box pwd_text">
            <em></em
            ><input
              class="text"
              name=""
              type="password"
              placeholder="请输入密码"
              v-model="param.pwd"
            />
          </div>
          <div class="box">
            <input type="button" class="bnt_ljdl" value="立即登录" @click="toLogin" />
          </div>
        </form>
      </div>
    </div>
    <div class="land">
      <div class="land_logo"><img src="/gdzcgl/imgs/ouyeellogo.png" /></div>
      <div class="land_c">
        <h3>用户登录</h3>
        <form action="" method="get">
          <div class="box user_text">
            <em></em
            ><input
              class="text"
              name=""
              type="text"
              placeholder="请输入用户名"
              v-model="param.phone"
            />
          </div>
          <div class="box pwd_text">
            <em></em
            ><input
              class="text"
              name=""
              type="password"
              placeholder="请输入密码"
              v-model="param.pwd"
            />
          </div>
          <div class="box">
            <input type="button" class="bnt_ljdl" value="立即登录" @click="toLogin" />
          </div>
        </form>
      </div>
      <div class="land_b">Copyright © 2017 By bsteel.com All Rights Reserved</div>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'

export default {
  name: 'login',
  data() {
    return {
      param: { phone: '', pwd: '' }
    }
  },
  methods: {
    toLogin: function () {
      let that = this
      let params = this.param
      let url = 'http://10.60.80.86/rest/customLogin'
      axios.post(url, null, { params: params }).then(
        function (r) {
          if (r.success) {
            that.$Notice.success({ title: '成功', desc: '登录成功' })
            that.$router.push('/platform')
            return
          }
          that.$Notice.error({ title: '错误', desc: r.msg })
        },
        function (e) {
          console.log(e)
          that.$Notice.error({ title: '错误', desc: '系统异常' })
        }
      )
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: content-box;
}
.land_logo {
  font-size: 28px;
  line-height: 60px;
  margin-bottom: 30px;
}
input {
  outline: none;
}
.land_body {
  height: 100%;
  padding-top: 0px;
  background: url(/imgs/land_bg.jpg) center no-repeat;
  background-size: cover;
}
.land {
  width: 380px;
  position: fixed;
  left: 50%;
  margin-left: -190px;
  top: 10%;
}
.land_logo {
  text-align: center;
  height: 65px;
  overflow: hidden;
}
.land_c {
  width: 300px;
  padding: 25px 40px 65px;
  background: #fff;
  box-shadow: 0 0 8px #c1c1c1;
  -webkit-box-shadow: 0 0 8px #c1c1c1;
  -moz-box-shadow: 0 0 8px #c1c1c1;
  border-radius: 5px;
  -moz-border-radius: 5px;
  position: relative;
}
.land_c h3 {
  height: 35px;
}
.land_c .box {
  overflow: hidden;
  padding: 5px 0px;
}
.land_c .box .text {
  width: -moz-calc(100% - 2px);
  width: -webkit-calc(100% - 2px);
  width: calc(100% - 2px);
  height: 16px;
  line-height: 16px;
  padding: 15px 0px;
  text-indent: 38px;
  border: 1px solid #dbdbdb;
  border-radius: 2px;
  -moz-border-radius: 2px;
}
.land_c .user_text,
.land_c .pwd_text {
  position: relative;
}
.land_c .user_text em {
  width: 36px;
  height: 46px;
  display: block;
  position: absolute;
  top: 50%;
  margin-top: -23px;
  left: 1px;
  background: url(/imgs/user_ico.png) #fff 10px center no-repeat;
}
.land_c .pwd_text em {
  width: 36px;
  height: 46px;
  display: block;
  position: absolute;
  top: 50%;
  margin-top: -23px;
  left: 1px;
  background: url(/imgs/pwd_ico.png) #fff 10px center no-repeat;
}
.land_c .box .yzm_text {
  width: 148px;
  float: left;
  text-indent: 15px;
}
.land_c .box .yzm_ico {
  width: 90px;
  height: 48px;
  margin-left: 5px;
  overflow: hidden;
  float: left;
  display: block;
}
.land_c .box .yzm_ico img {
  width: 100%;
}
.land_c .box .bnt_sx {
  width: 40px;
  height: 48px;
  display: block;
  float: left;
  background: url(/imgs/bnt_sx.png) center no-repeat;
  cursor: pointer;
}
.land_c .box .bnt_sx.hov {
  -webkit-transform: rotateZ(360deg);
  -moz-transform: rotateZ(360deg);
  -o-transform: rotateZ(360deg);
  -ms-transform: rotateZ(360deg);
  transform: rotateZ(360deg);
}
.land_c .wjmm {
  padding: 15px 0px;
  color: #000;
}
.land_c .wjmm label {
  float: left;
}
.land_c .wjmm input {
  float: left;
  margin: 5px 10px 0px 0px;
}
.land_c .wjmm a {
  float: right;
  color: #000;
  text-decoration: underline;
}
.land_c .box .bnt_ljdl {
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  background: #0066cc;
  border-radius: 2px;
  -moz-border-radius: 2px;
  border: none;
}
.land_c .land_ts {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-indent: 50px;
  color: #fff;
  background: url(/imgs/ts_ico.png) rgba(255, 0, 0, 0.8) 20px center no-repeat;
  position: absolute;
  left: 0px;
  bottom: -40px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 8px #e2e2e2;
  -webkit-box-shadow: 0 0 8px #e2e2e2;
  -moz-box-shadow: 0 0 8px #e2e2e2;
}

.land_b {
  width: 100%;
  position: fixed;
  left: 0px;
  bottom: 20px;
  color: #fff;
  text-align: center;
}
</style>
