
<!-- 测试用的文件，第一个自己写的vue组件 -->
<template>
  <div class="my-test">

    <ul>
      <li>导航01</li>
      <li>导航02</li>
      <!-- 学会了使用点击事件 -->
      <li @click="happy">{{ count }}</li>
    </ul>
  </div>
 
</template>

<script>
export default {
  name: "MyTest",
  data() {
    return { count: 4 };
  },
  methods:{
        happy(){
            console.log("yes");
            this.count++;
        },
  }
};

</script>

<style scoped>
.my-test ul {
  margin: 0;
  padding: 0;
}
.my-test ul li {
  padding: 8px;
}
</style>
