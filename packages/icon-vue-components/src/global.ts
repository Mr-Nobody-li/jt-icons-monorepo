/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: '@jt-icons/icon-vue-components/global'的入口文件
 */
import * as icons from './components'
import type { App } from 'vue'

export default (app: App) => {
  for (const [key, component] of Object.entries(icons)) {
    app.component(key, component)
  }
}

export { icons }
