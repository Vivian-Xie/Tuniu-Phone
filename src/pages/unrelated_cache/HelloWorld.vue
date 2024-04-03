<script setup>
// vue npm install后自带的页面
import { ref } from 'vue'
// export default{
//     name:"MyApp",
//     data(){
//       return{
//         btn:"haha"
//       }
//     }
//   }
defineProps({
  msg: String
})

const count = ref(0);



</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button >count is {{ btn }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <router-view></router-view>
  </div>
 <router-link to="/">Go to Home</router-link>
    <router-link to="/catalog">Go to Catalog</router-link>
  <!-- <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p id="test" class="read-the-docs">Click on the Vite and Vue logos to learn more</p> -->
 
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
