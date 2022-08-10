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
import uploadRouter from './router/upload.js'
import urlListRouter from './router/url-list.js'
import { port } from './script/constant.js'
import { pathRoot } from './script/paths.js'

const app = new Koa()

const koaBodyOptions = {
  multipart: true,
  formidable: {
    maxFileSize: 500 * 1024 // 设置上传文件大小最大限制，默认500kb
  }
}

app
  .use(KoaBody(koaBodyOptions))
  .use(KoaStatic(pathRoot))
  .use(uploadRouter.routes())
  .use(urlListRouter.routes())
  .use(uploadRouter.allowedMethods())
  .listen(port)

console.log(`服务启动，端口${port}`)
