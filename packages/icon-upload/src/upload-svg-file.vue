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
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      :on-success="handleSuccess"
    >
      <el-button type="primary">本地上传</el-button>
      <template #tip>
        <div class="el-upload__tip">
          仅支持上传.svg格式文件,大小限制500kb
        </div>
      </template>
    </el-upload>
    <hr />
    <h3>svg图标预览</h3>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg'
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg'
  }
])

const handleSuccess = (response) => {
  console.log(
    `🚀 => file: upload-svg-file.vue => line 47 => response`,
    response
  )
  ElMessage.success('上传成功')
}
</script>

<style lang="css" scoped>
.upload-svg-file {
  margin: 30px 300px;
}
</style>
