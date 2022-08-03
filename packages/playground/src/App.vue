<!--
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: app.vue
-->
<template>
  <div>
    <component
      :is="Icon"
      v-for="(Icon, key) in icons"
      :key="key"
      class="icon"
    />
    <hr />
    <component
      :is="`ElIcon${key}`"
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
