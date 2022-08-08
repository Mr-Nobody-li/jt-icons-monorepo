<!--
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
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
      <span>{{ item.iconName }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import Axios from 'axios'

const fileList = ref<UploadUserFile[]>([])
const urlList = ref([])

const handleSuccess = () => {
  ElMessage.success('上传成功')
  getUrlList()
}

// 文件名校验 禁止输入除小写字母、'-'以外的字符
const beforeUpload = (rawFile) => {
  const pattern = /[^a-z-(.svg)]+/
  const fileNameIllegal = pattern.test(rawFile.name)
  fileNameIllegal && ElMessage.info('文件名只允许包含小写字母和"-"')
  return !fileNameIllegal
}

const getUrlList = () => {
  const axios = Axios.create()
  axios('api/urlList').then(({ data }) => {
    urlList.value = data.urlList
  })
}

onMounted(getUrlList)
</script>

<style lang="css" scoped>
.upload-svg-file {
  margin: 30px 170px;
}
.svg-preview {
  display: inline-block;
  margin: 10px;
}
.svg {
  width: 40px;
  height: 40px;
  display: block;
  margin: 5px auto;
}
</style>
