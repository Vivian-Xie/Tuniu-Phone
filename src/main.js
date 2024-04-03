
import './style.css'


import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import App from './App.vue'
import axios from 'axios'
import { Swipe } from "vant";
import { List } from "vant";
import {router} from './router/index.js'
import global from "./components/global.vue"
// 实例化app
const app = createApp(App)
app.use(router)
app.use(Swipe)
app.use(List);
app.component("global",global);
// app.defaults.baseURL=
app.config.globalProperties.$http=axios
// app.use(ElementPlus)
// mount组件
app.mount('#app')

// createApp(App).mount('#app')
    