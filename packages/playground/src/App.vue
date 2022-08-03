<!--
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: app.vue
-->
<template>
  <div>
    <h1>svg图标列表</h1>
    <component
      :is="Icon"
      v-for="(Icon, key) in icons"
      :key="key"
      class="icon"
    />
    <hr />
    <h1>全局注册的svg图标</h1>
    <component
      :is="key"
      v-for="key in Object.keys(icons)"
      :key="key"
      class="icon"
    />
  </div>
</template>

<script lang="ts" setup>
import { icons } from '@jt-icons/icon-vue-components/global'
</script>

<style>
.icon {
  height: 48px;
  color: #409eff;
}
</style>
