import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// 以上是自带，以下是自装
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { less } from 'svelte-preprocess-less'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from 'unplugin-vue-components/resolvers';

// 以下引入了一个虚拟文件，用正则判断需要查询的文件与内容
const fileRegex = /\.(vue)$/
var reg = /\b(\d+(\.\d+)?)(px|PX)\b/g
// 自定义的函数插件用来把px转换为vw，用了transform，传入src是源文件，id是文件地址
function myPlugin() {
  return {
    name: 'transform-file',

    transform(src, id) {
      // console.log(id);
      if (fileRegex.test(id)) {
        // console.log(src);
        // 用数组的replace功能先全局通缉px，然后把px的值换成vw的页面百分比
        const _src= src.replace(reg,function(a){
          console.log(a);
          if(a.slice(-2)==='PX'){
            return a.toLowerCase();
          }
          // parseFloat将a:"xxpx"字符串自动改造为不带px带小数的数字，所以后面要自己加个vw
          return (parseFloat(a)*100/375).toFixed(6)+"vw"
        })
        return {
          code: _src,
          map: null // 如果可行将提供 source map
        }
      }
    }
  }
}

// 以下 defineConfig为vite标配
export default defineConfig({
  // ...
  alias:{
    '@': './src'
  },
  plugins: [
    myPlugin(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      resolvers: [VantResolver()],
    }),
    svelte({
      preprocess: {
        style: less(),
      },
    }),
  ]
})

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })
