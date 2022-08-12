# icon-vue-components

## 简介

`icon-vue-components`是一个让开发者以组件的形式使用图标的图标组件库，类似于[element-plus-cion](https://github.com/element-plus/element-plus-icons) ，如果阅读了这两个项目的源码会发现在打包部分是参考了`element-plus-cion`

开发这个项目的初衷是不满足于`element-plus-cion`提供的有限的svg图标，同时为了内网部署考虑也没有使用类似icon-font等在线图标库，一般情况下我们手动将需要使用到的图标放在项目内部便可，但是当我们项目变得庞大的同时，与产品经理/UI的交流也变得多了起来，因为他们要将合适的图标通过聊天软件发给你，之后需要你复制粘贴到项目中，当你在另一个项目中也想要使用某个图标的时候，继续复制粘贴？很明显这样是很影响开发效率的，基于这一点`icon-vue-components`在`element-plus-cion`的基础上提供了上传图标的入口，我们仅需要更新我们的npm依赖便可使用到本来需要大费周折才能使用到的图标

注意：`icon-vue-components`本身不提供任何图标

### 安装

```
npm i @jt-icons/icon-vue-components
```

## 使用

`JticonPassword`是开发者自己上传的svg文件，`password.svg`，我们将其导出的vue组件命名为前缀+文件名的格式

```
<template>
  <JticonPassword />
</template>

<script setup>
import { JticonPassword } from '@jt-icons/icon-vue-components'
</script>
```

## 上传图标

在上传界面我们可以上传图标到项目中，存放地址在`packages/icon-server/static/svg`目录下，目前只支持上传svg格式图片

```
npm i -g pnpm
pnpm i
pnpm dev
```

点击右下角npm按钮，则会触发GitHub action并发布npm依赖，虽然npm市场上显示已经更新，但是不能马上使用，npm会有延迟，大概一个小时左右才能使用