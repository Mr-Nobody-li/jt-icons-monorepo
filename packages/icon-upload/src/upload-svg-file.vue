<!--
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2023-02
 * @Description: 上传svg文件
-->
<template>
  <div class="upload-svg-file">
    <h3>上传svg图标</h3>
    <el-upload
      v-model:file-list="fileList"
      accept=".svg"
      class="upload"
      action="api/upload"
      multiple
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
    >
      <el-button type="primary">本地上传</el-button>
      <template #tip>
        <div class="el-upload__tip">
          仅支持上传.svg格式文件,大小限制500kb,文件名只允许包含小写字母和'-'
        </div>
      </template>
    </el-upload>
    <hr />
    <h3>svg图标预览</h3>
    <div
      v-for="item in urlList"
      :key="item"
      class="svg-preview"
    >
      <img
        class="svg"
        :src="'api/' + item.url"
      />
      <span class="svg-name">
        {{ item.iconName }}
      </span>
    </div>
  </div>
  <el-button
    class="publish-button"
    type="info"
    plain
    circle
    @click="pubilshDebounce"
  >
    npm
  </el-button>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import Axios from 'axios'

const axios = Axios.create()
const fileList = ref<UploadUserFile[]>([])
const urlList = ref([])

const handleSuccess = () => {
  ElMessage.success('上传成功')
  getUrlList()
}

const handleError = (error) => {
  ElMessage.error(error.message)
}

// 文件名校验 禁止输入除小写字母、'-'以外的字符
const beforeUpload = (rawFile) => {
  const pattern = /[^a-z-(.svg)]+/
  const fileNameIllegal = pattern.test(rawFile.name)
  fileNameIllegal && ElMessage.info('文件名只允许包含小写字母和"-"')
  return !fileNameIllegal
}

const getUrlList = () => {
  axios('api/urlList').then(({ data }) => {
    urlList.value = data.urlList
  })
}

const debounce = (fn, delay) => {
  let timer = null
  return function _debounce(...arg) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}

const publish = () => {
  ElMessage.info('发布中...')
  axios('api/publish').then(({ data }) => {
    if (data.code === 0) {
      ElMessage.success(data.message)
    } else {
      ElMessage.warning(data.message)
    }
  })
}

const pubilshDebounce = debounce(publish, 500)

onMounted(getUrlList)
</script>

<style lang="css" scoped>
.upload-svg-file {
  margin: 30px 170px;
}
.svg-preview {
  display: inline-block;
  margin: 10px;
  width: 130px;
  text-align: center;
}
.svg-preview:hover {
  background-color: #f3f4f6;
  border-radius: 5px;
}
.svg {
  width: 40px;
  height: 40px;
  display: block;
  margin: 5px auto;
}
.publish-button {
  position: fixed;
  width: 60px;
  font-size: 17px;
  height: 60px;
  bottom: 50px;
  right: 50px;
  font-weight: 600;
}
.svg-name {
  color: #409eff;
}
</style>
