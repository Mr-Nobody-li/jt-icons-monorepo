/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description:playground-图标预览 main
 */
import { createApp } from 'vue'
import JtIcons, { icons } from '@jt-icons/icon-vue-components/global'
// import { default as a } from '@jt-icons/icon-vue-components/global'
// import { icons } from '@jt-icons/icon-vue-components/global'
console.log(`🚀 => file: main.ts => line 12 => icons`, icons)

// console.log(a, jticonAddLocation)

import App from './App.vue'

createApp(App).use(JtIcons).mount('#app')
