<template>
  <div id="product_page">
    <div id="header_all">
      <div class="header">
        <!-- <div class="leftarrow"></div> -->

        <div>
          <img :src="STORE" alt="" />
          <div>
            营业时间：{{ title["openTimeStart"] }}-{{ title["openTimeEnd"] }}
          </div>
        </div>
      </div>
    </div>

    <div id="body">
      <div id="detail">
        <div class="forehead"></div>
        <div class="title">{{ title["shopName"] }}</div>
        <div class="title_2">
          <section class="star">
            <img :src="STAR" alt="" v-for="index of 5" :key="index" />
          </section>
          <span>{{ title["rating"] }}分</span>
          <span>总订单：{{ title["orderNum"] }}</span>
        </div>
        <p></p>
      </div>
      <div id="location">
        <div class="address">
          <div>
            <img :src="LOCATION" alt="" />
            <div>{{ title["address"] }}</div>
          </div>
          <span>距您{{ title["distance"] / 100 }}km</span>
        </div>
        <p></p>
        <div>
          <img :src="NAV" alt="" />
        </div>
      </div>
      <p class="space"></p>
      <div id="service">
        <div class="service_title">
          <p>SERVICE</p>
          <div class="blank"></div>
          <span>门店服务</span>
        </div>
        <div class="service_body">
          <div class="select_bar">
            <!-- v-for来重复循环重复的代码，常用于表单li -->
            <!-- 用@click事件的this指向当前点击的节点并且为它添加active的属性 -->
            <span
              v-for="(item, index) in select_bar2"
              :key="index"
              :class="{ active: index === currentIndex }"
              @click="itemClick(index)"
              >{{ item }}
              <span class="highlight"> </span>
            </span>
            <div class="downarrow" @click="click_not">
              <div></div>
            </div>
          </div>
          <section class="service_select">
            <div class="car_box">
              <img :src="CAR" />
            </div>
            <div>
              <article>标准洗车-五座轿车</article>
              <p class="discount_box"></p>
              <div>
                <span>¥25</span>
                <p>¥35</p>
              </div>
            </div>
            <p>立即购买</p>
          </section>
        </div>
      </div>
      <div id="wash_store">
        <div class="double_title">
          <p>MORE</p>
          <div class="blank"></div>
          <span>附近更多</span>
        </div>

        <div class="shop" v-for="(items, i) in shop" :key="i">
          <section id="shop_detail">
            <div>图片</div>
            <div>
              <article>{{ items.name }}</article>
              <span>评分</span>
              <p>{{ items.rank }}</p>
              <span>总单数</span>
              <p>{{ items.order }}</p>
              <div>{{ items.address }}</div>
              <div>{{ items.dist }}</div>
            </div>
          </section>

          <section id="standard"></section>
          <section id="high-end"></section>
        </div>
      </div>
    </div>
    <div v-show="click" id="pop-up">
      <div id="backgr"></div>
      <div id="category_content">
        <div class="forehead"></div>
        <p>洗车</p>
        <div>
          <span v-for="(item, index) in select_bar2" :key="index"
            >{{ item }}
          </span>
        </div>
        <div class="confirm" @click="click_not">确定</div>
      </div>
    </div>
  </div>
</template>


<script>
import { http } from "../request/interface.ts";
import QUESTION from "../assets/question.png";
import ONSALE from "../assets/onsale.png";
import STAR from "../assets/star.png";
import LOCATION from "../assets/location.png";
import NAV from "../assets/navigate.png";
import STORE from "../assets/default-store.jpg";
import CAR from "../assets/car.png";
import tabbar from "../components/global.vue";
export default {
  name: "product_detail",
  data() {
    return {
      click: false,
      QUESTION,
      ONSALE,
      STAR,
      LOCATION,
      NAV,
      CAR,
      STORE,
      title: {},
      currentIndex: 0,
      list: [
        { id: 1, name: "五座小轿车" },
        { id: 2, name: "SUV/MPV" },
        { id: 3, name: "精致洗车" },
      ],
      discount: [
        { id: 1, money: "60", time: 3, save: "30" },
        { id: 2, money: "150", time: 6, save: "30" },
        { id: 3, money: "300", time: 12, save: "90" },
      ],
      select_bar: ["上海市", "标准洗车", "距离优先"],
      select_bar2: ["标准洗车", "精致洗车", "打蜡", "杀菌洗车", "内饰清洁"],
      shop: [
        {
          id: 1,
          name: "上海车爵士汽车美容装饰养护中心站点",
          rank: 4.8,
          order: 268,
          address: "上海市共和新路1888号",
          dist: "300m",
        },
        {
          id: 2,
          name: "美车堂·大宁广场店",
          rank: 4.6,
          order: 122,
          address: "上海市静安区共和新路1878号",
          dist: "300m",
        },
      ],
    };
  },
  methods: {
    itemClick: function (index) {
      this.currentIndex = index;
      console.log(index);
    },
    click_not() {
      this.click = !this.click;
    },
  },
  components: {
    tabbar: tabbar,
  },
  mounted() {
    http.getService().then((res) => (this.select_bar2 = [res.data.name]));
    http
      .getStore({ shopCode: localStorage.getItem("shopCode") })
      .then((res) => (this.title = res.data.carWashStoreDetailBean));
  },
};
</script>



<style lang="less" scoped>
#bundle() {
  .double_title {
    position: relative;
    margin: 15px auto 0 15px;
    height: 35px;

    > span {
      // position: absolute;
      // top:15px;
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      padding-top: 15px;
      line-height: 20px;
      letter-spacing: 1px;
    }
    .blank {
      height: 15px;
    }
    > p {
      position: absolute;
      font-size: 25px;
      font-family: Arial-Black, Arial;
      font-weight: 900;
      color: #333333;
      opacity: 0.06;
      line-height: 35px;
    }
  }
}

#product_page {
  // overflow: hidden;
  height: 100vh;
  background-color: #ffffff;
  font-family: PingFangSC-Regular, PingFang SC;
  line-height: 1;
  padding-bottom: 50px;
  #header_all {
    display: inline-block;
    width: 100%;
    .header {
      position: relative;
      width: 100%;
      > p {
        display: flex;
        justify-content: center;
        margin: 9.06vw auto 3.2vw;
        font-size: 18px;
        color: #333333;
        height: 25px;
      }
      > div {
        position: relative;
        // background: RGBA(76, 180, 254, 1);
        > div {
          width: 143px;
          height: 25px;
          position: absolute;
          top: 10px;
          right: 0;
          text-align: center;
          font-size: 12px;
          color: #ffffff;
          line-height: 25px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 50px 0px 0px 50px;
        }
        > img {
          width: 100%;
          height: 211px;
          display: inline-block;
        }
      }
    }
  }
  #body {
    #detail {
      position: relative;
      .forehead {
        height: 16px;
        position: absolute;
        top: -15px;
        width: 375px;
        background: #ffffff;
        border-radius: 15px 15px 0px 0px;
      }
      .title {
        margin-top: 4px;
        margin-left: 16px;
        width: 285px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 20px;
        white-space: pre-wrap;
      }
      .title_2 {
        display: flex;
        height: 43px;
        align-items: center;
        .star {
          // margin-top: 14px;
          margin-left: 15px;
          font-size: 0px;
          display: inline-block;
          justify-content: center;
          > img {
            display: inline-block;
            vertical-align: middle;
            width: 14px;
            height: 14px;
            margin-right: 5px;
          }
        }
        > span {
          margin-left: 10px;
          font-size: 12px;
          color: #333333;
          line-height: 15px;
        }
      }
      > p {
        margin-left: 15px;
        // box-sizing: border-box;
        width: 345px;
        height: 1px;
        background: #eeeeee;
      }
    }
    #location {
      // justify-content: center;
      display: flex;
      align-items: center;
      .address {
        width: 301px;
        > div {
          display: flex;
          margin-left: 20px;
          margin-top: 15px;
          // justify-content: center;
          align-items: center;
          > img {
            // flex-grow: 0;
            // flex-shrink:0;
            width: 11px;
            // height:11px;
          }
          > div {
            display: inline-block;
            margin-left: 5px;
            width: 260px;
            font-size: 15px;
            line-height: 21px;
          }
        }
        > span {
          display: block;
          margin: 6px 0px 13px 37px;
          font-size: 12px;
          color: #999999;
          line-height: 17px;
        }
      }
      > p {
        width: 1px;
        height: 24px;
        background: #eeeeee;
      }
      > div {
        width: 20px;
        > img {
          margin-left: 24px;
          width: 20px;
        }
      }
    }
    .space {
      width: 100%;
      height: 10px;
      background-color: #f9f9f9;
    }
    #service {
      display: inline-block;
      .service_title {
        #bundle.double_title();
        > img {
          width: 15px;
        }
      }
      .service_body {
        margin-top: 15px;
        // height: 20px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        .select_bar {
          width: 359px;
          position: relative;
          height: auto;
          margin-left: 16px;
          > span {
            margin-right: 30px;
            position: relative;
            font-size: 14px;
            line-height: 20px;
            .highlight {
              // visibility: hidden;
              display: inline-block;
              position: absolute;
              left: 0;
              bottom: -1px;
              width: 100%;
              height: 8px;
            }
          }
          .downarrow {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            right: 0px;
            top: -4px;
            width: 33px;
            height: 33px;
            > div {
              display: inline-block;
              width: 5px;
              height: 5px;
              border: 1px solid #666666;
              transform: rotate(45deg);
              border-top: transparent;
              border-left: transparent;
            }
          }
        }
        .service_select {
          display: flex;
          margin: 19px 15px 0px;
          // justify-content: center;
          // align-items: center;
          .car_box {
            margin:0;
            flex-grow: 0;
            width: 94px;
            height: 83px;
            border-radius: 5px;
            border: 1px solid #eeeeee;
            display: flex;
            align-items: center;
            justify-content: center;
            > img {
              width: 72px;
            }
          }
          > div {
            margin-top:5px;
            margin-left: 15px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            > article {
              flex-grow: 0;
              display: block;
              font-size: 14px;
              color: #333333;
              line-height: 20px;
            }
            .discount_box {
              flex-grow: 1;
            }
            > div {
              flex-grow: 0;
              display: block;
              margin-bottom:5px;
              > span {
                font-size: 17px;
                font-weight: 600;
                color: #ff5335;
                line-height: 14px;
                margin-right: 5px;
              }
              > p {
                text-decoration: line-through;
                display: inline-block;
                font-size: 12px;
                transform: scale(0.8333);
                font-weight: 300;
                color: #999999;
                line-height: 10px;
              }
            }
          }
          > p {
            flex-grow: 0;
            position: relative;
            margin-top: 34px;
            width: 80px;
            height: 27px;
            margin-right: 5px;
            text-align: center;
            line-height: 27px;
            color: #ffffff;
            background: #ff7e3f;
            border-radius: 13px;
          }
        }
        .active {
          color: #ff7e3f;
          > span {
            background: #ff7e3f;
            opacity: 0.1;
          }
        }
      }
      /deep/.van-swipe {
        margin: 10px 15px 15px 15px;
      }
      /deep/.van-swipe__indicators.van-swipe__indicators--vertical {
        display: none;
      }

      .roll {
        display: flex;
        justify-content: space-between;
        > div {
          width: 110px;
          height: 76px;
          background-color: orange;

          // linear-gradient(135deg, #ededed 0%, #a1a1a1 100%)
          //   linear-gradient(136deg, #f1d9cf 0%, #d29f80 100%)
          //   linear-gradient(90deg, #2bb5ff 0%, #1a85ff 100%)
          //   linear-gradient(90deg, #93a2ff 0%, #6178ff 100%);
          border-radius: 20px;
          color: #ffffff;
          position: relative;
          #line1 {
            margin: 10px auto 0 12px;
            > span {
              font-size: 13px;
              line-height: 17px;
            }
            > p {
              display: inline-block;
              font-size: 17px;
              font-weight: 600;
            }
          }
          #line2 {
            margin: 11px auto 0 9.16px;
            font-size: 12px;
            line-height: 12px;
            transform: scale(0.91666);
          }
          #line3 {
            margin: 4px auto 0 5px;
            font-size: 12px;
            line-height: 11px;
            transform: scale(0.8333);
          }
          #line4 {
            position: absolute;
            bottom: 1px;
            right: 6px;
            font-size: 44px;
            font-family: WenYue-XinQingNianTi-W8, WenYue-XinQingNianTi;
            font-weight: bold;
            opacity: 0.1;
            line-height: 40px;
          }
        }
      }
    }
    #wash_store {
      .double_title {
        #bundle.double_title();
        overflow: hidden;
        margin-top: 0px;
      }
      .select_bar {
        width: 125px;
        height: 40px;
        display: inline-block;
        text-align: center;
        > div {
          display: inline-block;
          line-height: 40px;
          position: relative;
        }
      }
      #bar_wrapper {
        position: relative;
        overflow: auto;
        white-space: nowrap;
        margin: 5px 0px 5px 15px;
        height: 30px;
        .select_bar2 {
          width: 70px;
          margin-right: 10px;
          background: #f8f8f8;
          border-radius: 15px;
          text-align: center;
          display: inline-block;
          > div {
            display: inline-block;
            line-height: 23px;
            margin-left: 12px;
            margin-right: 12px;

            font-size: 12px;
          }
        }
      }
      .shop {
        #shop_detail {
          display: flex;
          margin: 10px 15px;
          > :nth-child(1) {
            flex-shrink: 0;
            flex-grow: 0;
            width: 100px;
            height: 80px;
            border-radius: 10px;
            background-color: #317fae;
            margin-right: 15px;
          }
          > div {
            flex-grow: 2;
            position: relative;

            > article {
              width: 230px;
              height: 20px;
              font-size: 14px;
              font-weight: 600;
              color: #333333;
              line-height: 20px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            > span {
              margin-right: 3px;
              font-size: 12px;
              color: #999999;
              line-height: 17px;
            }
            > p {
              display: inline-block;
              width: 30px;
              font-size: 12px;
              color: #ff7e3f;
              line-height: 17px;
            }
            > div {
              position: absolute;
              bottom: 10px;
              left: 0px;
              font-size: 12px;
              color: #666666;
              line-height: 17px;
            }
            :nth-last-child(1) {
              position: absolute;
              display: inline-block;
              bottom: 10px;
              right: 0px;
              left: auto;
              color: #999999;
            }
          }
        }
      }
    }
  }
  #pop-up {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    #backgr {
      width: 100%;
      height: 350px;
      background: rgba(23, 13, 13, 0.2);
    }
    #category_content {
      position: relative;
      width: 100%;
      height: 317px;
      padding: 4px 15px;
      background: #ffffff;
      box-sizing: border-box;
      .forehead {
        height: 16px;
        position: absolute;
        left: 0px;
        top: -15px;
        width: 375px;
        background: #ffffff;
        border-radius: 15px 15px 0px 0px;
      }
      > p {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
      }
      > div {
        width: 100%;
        height: 216px;
        overflow: hidden;
        zoom: 1;
        > span {
          float: left;
          margin-top: 12px;
          margin-right: 6px;
          display: inline;
          width: 109px;
          height: 35px;
          line-height: 35px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 18px;
          background-color: #ff7e3f;
          color: #ffffff;
          text-align: center;
        }
      }
      .confirm {
        font-size: 17px;
        font-weight: 600;
        color: #fff;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: #fd7e2d;
        border-radius: 44px;
      }
    }
  }
}
</style>



