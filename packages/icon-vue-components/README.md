# icon-vue-components

## 简介

`icon-vue-components`是一个让开发者以组件的形式使用图标的图标组件库，类似于[element-plus-icon](https://github.com/element-plus/element-plus-icons) ，如果阅读了这两个项目的源码会发现在打包部分是参考了`element-plus-icon`。目前仅支持 vue 项目使用

开发这个项目的初衷是不满足于`element-plus-icon`提供的有限的 svg 图标，同时为了内网部署考虑也没有使用类似 icon-font 等在线图标库，一般情况下我们手动将需要使用到的图标放在项目内部便可，但是当我们项目变得庞大的同时，与产品经理/UI 的交流也变得多了起来，因为他们要将合适的图标通过聊天软件发给你，之后需要你复制粘贴到项目中，当你在另一个项目中也想要使用某个图标的时候，继续复制粘贴？很明显这样是很影响开发效率的，基于这一点`icon-vue-components`在`element-plus-icon`的基础上提供了上传图标的入口，我们仅需要更新我们的 npm 依赖便可使用到本来需要大费周折才能使用到的图标

注意：`icon-vue-components`本身不提供任何图标(测试图标除外)

## 安装

```
npm i @jt-icons/icon-vue-components
```

## 使用

`JticonPassword`是使用者（一般是产品或者 UI）上传的 svg 文件，`password.svg`，我们将其对应的 vue 组件的名称命名为前缀+文件名的格式，例如这里的前缀为 Jticon

```
<template>
  <JticonPassword />
</template>

<script setup>
import { JticonPassword } from '@jt-icons/icon-vue-components'
</script>
```
