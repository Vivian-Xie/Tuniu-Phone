<template>
  <div id="footer">
    <div
      class="footer_icon"
      v-for="(item, i) in footer"
      :key="i"
      :class="{ actived: active == i }"
      @click="change(i)"
    >
      <a :href="item.href">
        <img :src="item.src" />
        <span>{{ item.name }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import HOME from "../assets/home.png";
import HOME_RED from "../assets/home_red.png";
import ORDER from "../assets/order.png";
import ORDER_RED from "../assets/order_red.png";
import TICKET from "../assets/ticket.png";
import QUESTION from "../assets/common_question.png";
export default {
  name: "global",
  data() {
    return {
      footer: [
        { name: "首页", src: HOME, href: "#/home" },
        { name: "常见问题", src: QUESTION },
        { name: "卡券", src: TICKET },
        { name: "订单", src: ORDER, href: "#/order" },
      ],
      change_color: "#/home",
      active:0,
    };
  },
  methods:{
    change(index){
        console.log(this.footer.src);//data中定义的arr不再是this
        this.active=index;
        this.change_color= this.footer.href;
    //   this.change = this.footer.href + "_red";
    }
  },
};
</script>

<style lang="less" scoped>
#footer {
  position: fixed;
  bottom: 0px;
  width: 375px;
  height: 50px;
  background: #ffffff;
  display: flex;
  .footer_icon {
    width: 10px;
    align-items: stretch;
    flex-grow: 1;
    text-align: center;
    > a {
      display: inline-block;
      text-align: center;
      cursor: pointer;
      > img {
        margin: 6px auto 0;
        width: 24px;
        height: 24px;
        display: block;
      }
      > span {
        margin-top: 1px;
        display: inline-block;
        text-align: center;
        width: 100%;
        font-weight: 600;
        font-size: 12px;
        color: rgb(102, 102, 102);
      }
    }
  }
}
</style>