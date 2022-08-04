/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: icon-server入口文件
 */
import Koa from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import router from './router/upload.js'

const app = new Koa()
const port = 3001
const dir = dirname(fileURLToPath(import.meta.url))

const koaBodyOptions = {
  multipart: true,
  formidable: {
    maxFileSize: 500 * 1024 // 设置上传文件大小最大限制，默认500kb
  }
}

app
  .use(KoaBody(koaBodyOptions))
  .use(KoaStatic(dir))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port)
