<template>
  <div id="order_page">
    <div id="header_all">
      <div class="header">
        <!-- <div class="leftarrow"></div> -->
        <p>个人中心</p>
      </div>
      <div id="profile">
        <img :src="LOGOUT" />
        <div>{{ phoneNum }}</div>
      </div>
      <div id="wallet_coupon">
        <div class="wallet">
          <!-- <img src="wallet.png" alt="wallet" /> -->
          <p>卡包</p>
          <div>{{ +info.couponNum }}</div>
          <span>张</span>
        </div>
        <div class="coupon">
          <!-- <img src="coupon.png" alt="coupon" /> -->
          <p>优惠券</p>
          <div>{{ +info.voucherBagNum }}</div>
          <span>张</span>
        </div>
      </div>
    </div>
    <div id="order">
      <div class="order_header">
        <p>我的订单</p>
        <div class="blank"></div>
        <p>查看全部订单</p>
        <div class="rightarrow"></div>
      </div>
      <div class="order_body">
        <section>
          <section v-for="(item, i) in list" :key="i">
            <div class="icon">
              <div :class="w[(a + '').slice(0, 3).length]">
                <span>{{ +info[icon[i]]}}</span>
              </div>
              <img :src="item.src" alt="" />
            </div>
            <div class="icon_text">{{ item.name }}</div>
          </section>
        </section>
        <!-- <div class="refund">
          <div class="icon">
            <img src="refund.png" alt="" />
            <div :class="w[(c + '').slice(0, 3).length]" id="wrapper4">
              <span id="num4">99+</span>
            </div>
          </div>
          <div>退款/取消</div>
        </div>-->
      </div>
      <div class="order_footer">
        <!-- 引入了vant-ui的组件 -->
        <van-swipe style="height: 71px" autoplay="3000" vertical>
          <van-swipe-item v-for="(item, i) in list" :key="i">
            <div class="roll" id="yuncheng">
              <div class="pic"></div>
              <div>
                <p>车享家上海云城路店</p>
                <span>上海市静安区共和新路…</span>
                <span>2020-10-10</span>
              </div>
              <div>
                <span>券码</span>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>


<script>
import { http } from "../request/interface";
import LOGOUT from "../assets/logout.png";
import COUPON from "../assets/coupon.png";
import WALLET from "../assets/wallet.png";
import PAYMENT from "../assets/payment.png";
import COMMEND from "../assets/commend.png";
import FORUSE from "../assets/forUse.png";
import REFUND from "../assets/refund.png";

import tabbar from "../components/global.vue"
import { countBy } from "lodash";
export default {
  name: "order",
  data() {
    return {
      LOGOUT,
      COUPON,
      WALLET,
      phoneNum:localStorage.getItem("phoneNum"),
      info: {},
      icon: ["noPaymentNum", "paymentedNum", "noEvaluateNum", "cancelNum"],
      list: [
        { id: 1, name: "待付款", src: PAYMENT },
        { id: 2, name: "待评价", src: COMMEND},
        { id: 3, name: "可使用", src: FORUSE },
        { id: 4, name: "退款/取消", src: REFUND },
      ],
      w: ["zero_width", "one_width", "two_width", "three_width"],
      a: 0,
      b: 12,
      d: 99,
      c: 102,
    }
  },
  components:{
    'tabbar':tabbar,
  },
  beforeCreate() {},
  created() {},
  mounted() {
    http.personalInfo().then((res) => {
      this.info = res.data;
      // console.log(this.noPaymentNum);
    });
    // 一些生产废料的展示
    // 页面能用css少操作dom，即能重绘则不要重排版
    //
    //   for (let i = 1; i < 5; i++) {
    //     var num = "num" + i;
    //     num = document.getElementById(num);
    //     console.log(num);
    //     if (num.innerHTML - 10 >= 0) {
    //       this.wrapper[i - 1] = "two_width";
    //     } else if (num.innerHTML == "99+") {
    //       this.wrapper[i - 1] = "three_width";
    //     } else {
    //       this.wrapper[i - 1] = "one_width";
    //     }
    //   }
  },
};
</script>



<style lang="less" scoped>
.zero_width {
  display: none;
}
.one_width {
  width: 17px;
  display: none;
  border-radius: 50%;
  left: 20px;
}
.two_width {
  width: 25px;
  border-radius: 10px;
  left: 30px;
}
.three_width {
  width: 30px;
  border-radius: 10px;
  left: 30px;
}
#bundle() {
  .icon() {
    > img {
      display: block;
      width: 30px;
      margin: 0 auto;
    }
    > div {
      position: absolute;
      display: flex;
      top: -6px;
      left:43px;
      height: 17px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #fb842c;

      text-align: center;
      > span {
        margin: auto;
        line-height: 17px;
        font-size: 12px;
        transform: scale(0.916);
        font-weight: 600;
        color: #fb842c;
      }
    }
  }
}

#order_page {
  overflow: hidden;
  height: 100vh;
  background-color: #f9f9f9;
  font-family: PingFangSC-Regular, PingFang SC;
  line-height: 1;
  #header_all {
    background-color: #ffffff;
    display: inline-block;
    width: 100%;
    height: 62.4vw;
    .header {
      position: relative;
      width: 100%;
      .leftarrow {
        //怎样用css写个三角形，就是不要有内容，让边框填满整个方框，一条边对应一个小三角
        width: 0;
        height: 0;
        // border: 100px solid #333333;
        border-top: 9px solid transparent;
        border-bottom: 9px solid transparent;
        border-right: 11px solid #333333;
        position: absolute;
        left: 4vw;
        top: 0.8vw;
      }
      > p {
        display: flex;
        justify-content: center;
        margin: 9.06vw auto 3.2vw;
        font-size: 18px;
        color: #333333;
        line-height: 25px;
      }
    }
    #profile {
      width: 100%;
      img {
        display: block;
        width: 16vw;
        margin: 5.3vw auto 3.2vw;
      }
      > div {
        margin: 0vw auto 4vw;
        text-align: center;

        font-size: 16px;
        color: #333333;
        line-height: 26px;
      }
    }
    #wallet_coupon {
      //   height: 21.6vw;
      > div {
        height: 80px;
        width: 175px;
        overflow: hidden;
        display: inline-block;
        margin-left: 1.34vw;
        // 避免图片和浮动冲突就设置成父元素的背景
        background-image: url("../assets/wallet.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        p {
          margin: 20px auto auto 30px;
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          line-height: 13px;
        }
        div {
          margin-top: 12px;
          margin-left: 32px;
          display: inline-block;
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          line-height: 18px;
        }
        span {
          font-size: 15px;
          color: #ffffff;
          opacity: 0.4;
          margin-left: 5px;
          line-height: 18px;
        }
      }
      .coupon {
        float: right;
        height: 80px;
        width: 185px;
        margin-right: 1.34vw;
        margin-left: 0px;
        background-image: url("../assets/coupon.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  #order {
    margin: 5px auto 0;
    background-color: #ffffff;
    width: 345px;
    height: 207px;

    border-radius: 10px;
    .order_header {
      height: 43px;
      display: flex;
      :nth-child(1) {
        flex-grow: 0;
        width: 60px;
        margin: auto 15px;
        font-size: 15px;
        font-weight: 600;
        color: #333333;
        line-height: 21px;
      }
      > :nth-child(1) + div {
        flex-grow: 2;
      }
      > div + p {
        flex-grow: 0;
        width: 72px;
        margin: auto 0px;
        margin-right: 9px;
        // margin:13px 30px 0px 30px;
        font-size: 12px;
        color: #666666;
        line-height: 17px;
      }
      .rightarrow {
        flex-grow: 0;
        transform: rotateZ(-45deg);
        margin: auto 0px;
        margin-right: 15px;
        width: 5px;
        height: 5px;
        border: 2px solid #8b8b8b;
        border-top: transparent;
        border-left: transparent;

        // position: absolute;
      }
    }

    .order_body {
      height: 77px;
      overflow: hidden;
      // background-color: pink;
      > section {
        display: flex;
        justify-content: space-between;
        margin: 11px 10px 15px;
        > section {
          flex-grow: 1;
          position: relative;
          width: 40px;
          .icon {
          // 用了less中封装css为函数的功能
            #bundle.icon();
          }
          .icon_text {
            margin: 7px auto 0;
            font-size: 13px;
            text-align:center;
            color: #666666;
            line-height: 13px;
          }
        }
        >:nth-last-child(1){
          flex-grow:1.5;
          .icon{
            div{
              left:52px;
            }
          }
        }
      }
    }
    .order_footer {
      background-color: #f8f8f8;
      width: 326px;
      height: 70px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 17px;
      overflow: hidden;

      /deep/.van-swipe__indicators.van-swipe__indicators--vertical {
        display: none;
      }
      .roll {
        display: flex;
        .pic {
          flex-grow: 0;
          margin: 11px 0px 10px 11px;
          width: 63px;
          height: 50px;
          background-color: blue;
        }
        > .pic + div {
          flex-grow: 1;
          width: 173px;
          //width: 117px;
          // height: 18px;
          > p {
            margin: 9px auto 0 10px;
            font-size: 13px;
            font-weight: 600;
            color: #333333;
            line-height: 18px;
          }
          > span {
            display: inline-block;
            margin-top: 1px;
            margin-left: 10px;
            width: 143px;
            font-size: 13px;
            color: #999999;
            line-height: 18px;
          }
        }
        > :nth-last-child(1) {
          flex-grow: 2;
          margin: auto 10px auto auto;
          width: 70px;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          border: 1px solid #fd7e2d;
          text-align: center;
          > span {
            width: 30px;
            height: 21px;
            font-size: 15px;
            color: #fd7e2d;
            line-height: 21px;
          }
        }
      }
    }
  }
 

}
</style>

