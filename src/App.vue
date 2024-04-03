<!-- <script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import MyTest from './components/Mytest copy.vue'

       

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue 我回来啦" />
</template>

<style scoped>

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 1em 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 1em 0.5em #42b883aa);
}
</style> -->
<template>
 
  <!-- 此处添加的组件每一页公用，是app.vue中执行的template -->

  <router-view></router-view>
</template>

<script>

import paging from './pages/paging.vue'
export default {
    name:'App',
    components:{
      paging
    }
  };
</script>

<style>
</style>
