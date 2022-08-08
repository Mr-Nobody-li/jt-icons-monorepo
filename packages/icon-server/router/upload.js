/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: upload接口
 */
import KoaRouter from 'koa-router'
import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { port, pathSvg } from '../constant.js'

const dir = dirname(fileURLToPath(import.meta.url))
const pathRoot = resolve(dir, '..')
const pathStaticSvg = resolve(pathRoot, pathSvg)
const router = KoaRouter()

router.post('/upload', async (ctx) => {
  // 获取上传文件
  const file = ctx.request.files.file
  uploadFile(file, ctx)
})

const uploadFile = (file, ctx) => {
  // 读取文件流
  const fileReader = fs.createReadStream(file.filepath)
  // 组装成绝对路径
  const fileResource = resolve(
    pathStaticSvg,
    `${file.originalFilename}`
  )
  // 使用 createWriteStream 写入数据，然后使用管道流pipe拼接
  const writeStream = fs.createWriteStream(fileResource)
  const handleReponse = () => {
    fileReader.pipe(writeStream)
    ctx.body = {
      url: `http:localhost:${port}/${pathSvg}/${file.originalFilename}`,
      code: 0,
      message: '上传成功'
    }
  }

  // 判断 /static/svg 文件夹是否存在，如果不在的话就创建一个
  if (!fs.existsSync(pathStaticSvg)) {
    fs.mkdir(pathStaticSvg, (err) => {
      err || handleReponse()
    })
  } else {
    handleReponse()
  }
}

export default router
