
import {createRouter, createWebHashHistory} from 'vue-router'
import paging from '../pages/paging.vue'
import Order from '../pages/order.vue'
import home_page from '../pages/home_page.vue'
import product_detail from '../pages/product_detail.vue'
import { getState } from '../global.js'



const routes = [
  {
  path: '/', 
  redirect: '/catalog',
},
  {
  path: '/order', 
  component: Order,
  name:'order',

},
  {
    path: '/home', 
    component: home_page,
    name:'home_page',

  },
  {
    path: '/product', 
    component: product_detail,
    name:'product_detail',

  },
  { 
    path: '/catalog', 
    component: paging,
    name:'paging',
   
    },
  ]
  const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })
  router.beforeEach(async (to, from) => {
    // console.log(to,getState());
    if (to.name===from.name) return
    if (
      // 检查用户是否已登录
      !getState() &&
      // ❗️ 避免无限重定向
      to.name !== 'paging'
    ) {
      // 将用户重定向到登录页面
      return { name: 'paging' }
    }
  })
  
   export {router}