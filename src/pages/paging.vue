<template>
  <div id="phone_window">
    <img :src="LOGO" />
    <div id="loginText">手机快捷登录</div>
    <p>未注册手机号验证登录后自动创建橙牛账号</p>
    <input
      @blur="judgemobile"
      id="mobile"
      type="text"
      placeholder="请输入手机号码"
      v-model="phone"
    />
    <div>
      <input
        v-model="code"
        id="code"
        @blur="judgemobile"
        type="text"
        placeholder="请输入验证码"
      />
      <span
        @click="getVerifyCode"
        :class="disable ? 'changeColor' : 'returnColor'"
        >{{ getCode }}</span
      >
    </div>
    <a @click="navigation">
      <img :src="LOGIN" @click="login" />
    </a>
    <div id="protocol">
      <p>
        我已阅读并同意<span
          >《橙牛软件许可及服务协议》，《橙牛隐私权政策》</span
        >
      </p>
      <div @click="checkRules">
        <img :src="CHECK" v-if="check" />
        <img :src="NOTCHECK" v-if="!check" />
      </div>
    </div>
  </div>
</template>



<style lang="less" scoped>
@width: 375;
input {
  line-height: 12.26vw;
  text-indent: 4%;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #222222;
  border: none;
  background-color: #f8f8f8;
  border-radius: 24px;
  outline: none;
  font-size: 16px;
}

.changeColor {
  color: #999999;
}
.returnColor {
  color: #ff5400;
}
.checked {
  visibility: hidden;
}
.notChecked {
  visibility: visible;
}
#phone_window {
  margin: 0 0;
  padding: 0 0;
  display: block;
  line-height: 1;
  font-size: 16px;
  overflow: hidden;

  > img {
    display: block;
    margin: 12.3% auto 0px;
    width: 18.6%;
  }
  > :nth-child(2) {
    display: block;
    font-family: PingFangSC-Medium, PingFang SC;
    height: 25px;
    /* line-height:6.7%; */
    font-size: 6.7vw;
    color: #333333;
    text-align: left;
    margin: 10.9% 8% 0px;
    font-weight: 600;
  }
  > p {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    /* line-height: 24px; */
    margin: 5.3% 8% 0px;
    padding-left: 1px;
  }
  > input {
    margin: 8vw 8% 0px;
    width: 84%;
  }
  > input + div {
    position: relative;
    display: block;
    margin: 0px 8%;
    width: 84%;
    position: relative;
    // height:46px;
    :nth-last-child(1) {
      // color: #ff5400;
      position: absolute;
      right: 4%;
      top: 9vw;
      border: none;
      /* color:#FF5400 ; */
      background: none;
      outline: none;
    }
    input {
      margin-top: 4.26vw;
      display: inline-block;
      width: 100%;
      margin: 4.26vw 0px 0px;
    }
  }
  > div + a {
    display: block;
    padding: 8% 0px 0px;
    width: 100%;
    img {
      display: block;
      width: 84%;
      margin: 0px 8vw;
      cursor: pointer;
    }
  }
  #protocol {
    position: relative;
    line-height: 15px;
    margin-top: 4%;
    overflow: visible;
    p {
      margin: 0px;
      margin-bottom: 10px;
      width: 94.4vw;
      padding: 0% 13.3% 0 4%;
      transform: scale(0.83);
      font-size: 12px; //手机端最小号字体，再小靠缩放
      > span {
        color: #2c7bfc;
      }
    }
    div {
      position: absolute;
      left: 8%;
      top: 0px;
      bottom: 0px;
      margin: auto;
      width: 4%;
      height: 4vw;
      // border: 1px dashed #222222;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        margin: 0 0;
      }
    }
  }
}
</style>


<script>
import { getState, setState } from "../global.js";
import { http } from "../request/interface.ts";
import { Toast } from "vant";
import "vant/es/toast/style";
import LOGO from '../assets/logo.png';
import LOGIN from '../assets/login.png';
import CHECK from '../assets/checked.png';
import NOTCHECK from '../assets/notChecked.png';
console.log(getState());
export default {
  name: "paging",

  // data() {

  // },

  mounted() {
    // http.getAccessToken();
    // http.channelInfo();
  },

  data() {
    return {
      getCode: "获取验证码",
      count: 60,
      disable: false,
      check: false,
      phone: "",
      code: "",
      CHECK,NOTCHECK,LOGO,LOGIN
    };
  },
  methods: {
    loginHelp() {},
    login() {
      // 简易登录跳转
      if (this.check == true) {
        setState(true);
        location.assign("#/order");
      }
      if (!this.judgemobile(true, true, true)) return;
      http
        .login({
          phone: this.phone,
          code: this.code,
        })
        .then((res) => {
          if (res.resultDesc === "成功,系统处理正常") {
            setState(true);
            location.assign("#/order");  
            localStorage.setItem("userCode",res.data.userCode)
            localStorage.setItem("phoneNum",res.data.phoneNo)
          }else{
            Toast(res.resultDesc);
          }
        });
    },
    judgemobile( validatePhone, validateCode, check ) {
      // 判断手机号是不是符合11位都是数字
      var mobile = document.getElementById("mobile").value;
      var code = document.getElementById("code").value;
      var reg = /^\d{1,}$/;
      if (
        validatePhone &&
        ((mobile.length !== 11 && mobile.length !== 0) || !reg.test(mobile))
      ) {
        Toast("请输入正确的手机号码");
        return false;
      }
      if (
        validateCode &&
        ((code.length !== 4 && code.length !== 0) || !reg.test(code))
      ) {
        Toast("请输入正确的验证码");
        return true;
      }
      if(check&&!this.check){
        Toast("请阅读并同意协议后确定登录");
        return false;
      }
      return true;
    },
    sms() {},
    getVerifyCode() {
      // 怎样让button debounce，思路：该函数每一次点击都会调用，但是可以判断是否为第一次点击，不是第一次setTimeout函数里的那个布尔值始终是true，再次进入该函数就会在第一步被return出去直到第一次异步执行完毕，布尔值回归false.
      if (this.disable||!this.judgemobile( true,false,false)) return;
      http.sms({
        phone: this.phone,
      });
      this.disable = true;
      this.getCode = "60s后重发";
      var countDown = setInterval(() => {
        // console.log("111111111111");
        if (this.count < 1) {
          this.disable = false;
          this.getCode = "获取验证码";
          this.count = 60;
          clearInterval(countDown);
        } else {
          this.getCode = this.count-- + "s后重发";
        }
      }, 1000);
    },
    checkRules() {
      this.check = !this.check;
    },
  },
};
</script>