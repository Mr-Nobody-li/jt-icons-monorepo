/*
 * @Author: lipengfei
 * @Date: 2022-04
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description:
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
