<template>
  <div id="home_page">
    <div id="header_all">
      <div class="header">
        <!-- <div class="leftarrow"></div> -->
        <p>特惠洗车</p>
        <img :src="headImg" alt="" />
      </div>
    </div>
    <div id="discount">
      <div class="double_title">
        <p>DISCOUNT</p>
        <div class="blank"></div>
        <span>优惠卡包</span>
        <img :src="QUESTION" alt="" />
      </div>
      <div class="discount_body">
        <div>
          <!-- v-for来重复循环重复的代码，常用于表单li -->
          <!-- 用@click事件的this指向当前点击的节点并且为它添加active的属性 -->
          <span
            v-for="(item, index) in list"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="itemClick2(index)"
            >{{ item.name }}
            <span class="highlight"> </span>
          </span>
        </div>
      </div>
      <van-swipe style="height: 76px" autoplay="3000" vertical>
        <van-swipe-item v-for="(item, i) in list" :key="i">
          <div class="roll">
            <div v-for="(items, i) in discount" :key="i">
              <div id="line1">
                <span>¥</span>
                <p>{{ items.money }}</p>
                <span> /{{ items.time }}次</span>
              </div>
              <div id="line2">标准洗车·五座轿车</div>
              <div id="line3">省 ¥{{ items.save }}</div>
              <div id="line4">标</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div id="wash_store">
      <div class="double_title">
        <p>CAR WASH</p>
        <div class="blank"></div>
        <span>洗车门店</span>
      </div>
      <div class="select_bar" v-for="(item, i) in select_bar" :key="i">
        <div>
          {{ item }}
          <div class="downarrow"></div>
        </div>
      </div>

      <div id="bar_wrapper">
        <div class="select_bar2" v-for="(items, i) in select_bar2" :key="i">
          <div>{{ items }}</div>
        </div>
        <div></div>
      </div>

      <div class="shop">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="(items, i) in title" :key="i">
            <section id="shop_detail" @click="itemClick(i)">
              <img :src="items['doorPhotoUrl']" />
              <div>
                <article>{{ items["shopName"] }}</article>
                <span>评分</span>
                <p>{{ items["rating"] }}</p>
                <span>总单数</span>
                <p>{{ items["orderNum"] }}</p>
                <div>{{ items["address"] }}</div>
                <div>{{ items["distance"] / 100 }}m</div>
              </div>
            </section>
          </van-cell>
        </van-list>
        <section id="standard"></section>
        <section id="high-end"></section>
      </div>
    </div>

    <tabbar></tabbar>
  </div>
</template>


<script>
import { List } from "vant";
import { http } from "../request/interface.ts";
import QUESTION from "../assets/question.png";
// import ONSALE from "../assets/onsale.png";
import tabbar from "../components/global.vue";
export default {
  name: "home_page",
  data() {
    return {
      QUESTION,
      // ONSALE,
      currentIndex: 1,
      // loading,
      // finished,
      loading: false,
      finished: false,
      headImg: " ",
      title: [],
      pageNum: 0,
      shopList: [],
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
      select_bar: ["兰州市", "标准洗车", "距离优先"],
      select_bar2: ["标准洗车", "手工打蜡", "杀菌洗车", "内饰清洁", "精致洗车"],
      // shop: [
      //   {
      //     id: 1,
      //     name: "上海车爵士汽车美容装饰养护中心站点",
      //     rank: 4.8,
      //     order: 268,
      //     address: "上海市共和新路1888号",
      //     dist: "300m",
      //   },
      //   {
      //     id: 2,
      //     name: "美车堂·大宁广场店",
      //     rank: 4.6,
      //     order: 122,
      //     address: "上海市静安区共和新路1878号",
      //     dist: "300m",
      //   },
      // ],
    };
  },
  methods: {
    itemClick: function (index) {
      // this.currentIndex = index;
      // if (localStorage.getItem("shopCode")){

      // }
      localStorage.setItem("shopCode", this.title[index]["shopCode"]);
      location.assign("#/product");
    },
    itemClick2: function (index) {
      this.currentIndex = index;
      // console.log(index);
    },
    onLoad() {
      if (this.loading||this.finished) return;
      console.log("111", this.shopList);
      this.loading = true;
      this.pageNum++;
      
        
      http.getStoreList({ pageNum: this.pageNum }).then((res) => {
        //   this.title = res.data.carWashStoreList;

        this.title = [...this.title, ...res.data.carWashStoreList];
        this.loading = false;
        console.log('title', this.title);
        let total=res.data.totalCount
        // console.log("total",Math.ceil(total/5));
        if(this.pageNum==Math.ceil(total/5)){
          this.finished=true;
          this.finished.value = true;
          return
        }
      });
      // 加载状态结束
      // loading.value = false;
      // 数据全部加载完成
      // if (this.title.value.length >= 10) {
      //   finished.value = true;
      // }
      // });
    },
  },
  components: {
    tabbar: tabbar,
  },
  mounted() {
    http.chanelInfo().then((res) => (this.headImg = res.data.headImg));
    // http.getStoreList({ pageNum: "1" }).then((res) => {
    //   this.title = res.data.carWashStoreList;
    // });
    // this.onLoad();
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

#home_page {
  // overflow: hidden;
  height: 100vh;
  background-color: #ffffff;
  font-family: PingFangSC-Regular, PingFang SC;
  line-height: 1;
  padding-bottom: 80px;
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
      > img {
        width: 100%;
        height: 140px;
      }
    }
  }
  #discount {
    .double_title {
      #bundle.double_title();
      > img {
        width: 15px;
      }
    }
    .discount_body {
      position: relative;
      margin-top: 15px;
      height: 20px;
      > div {
        position: absolute;
        margin-left: 15px;
        > span {
          margin-right: 33px;
          font-size: 14px;
          line-height: 20px;
          position: relative;
          font-weight: 600;
        }
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
        background: linear-gradient(90deg, #4ad8cc 0%, #31abea 100%);

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
      .downarrow {
        // border: 100px solid #333333;
        border-left: 4.5px solid transparent;
        border-right: 4.5px solid transparent;
        border-top: 5px solid #d4d6e1;
        display: inline-block;
        // margin:18px auto 17px;              //为什么会上浮？
        // position: absolute;
        // top:18px;
        // margin-left:5px;
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
      /deep/.van-cell{
        padding:0;
      }
      
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
                width: 130px;
                bottom: 10px;
                left: 0px;
                font-size: 12px;
                color: #666666;
                line-height: 17px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              :nth-last-child(1) {
                position: absolute;
                // float:right;
                display: inline-block;
                bottom: 10px;
                left: 155px;
                // left: auto;
                color: #999999;
              }
            }
        //   }
        // }
      }
    }
  }
}
</style>



