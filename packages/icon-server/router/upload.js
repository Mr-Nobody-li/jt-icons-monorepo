/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2023-02
 * @Description: upload上传文件接口
 */
import fs from 'fs-extra'
import KoaRouter from 'koa-router'
import { resolve } from 'node:path'
import { port } from '../script/constant.js'
import { pathStaticSvg, pathSvg } from '../script/paths.js'

const router = KoaRouter()

router.post('/upload', async (ctx) => {
  // 获取上传文件
  const file = ctx.request.files.file
  await uploadFile(file, ctx)
})

const uploadFile = async (file, ctx) => {
  // 组装成绝对路径
  const fileResource = resolve(
    pathStaticSvg,
    `${file.originalFilename}`
  )
  // 查重，如果有此文件，抛出错误
  const exists = await fs.pathExists(fileResource)
  if (exists) {
    const error = new Error()
    error.msg = `${file.originalFilename}已存在`
    throw error
  } else {
    writeFile({ file, fileResource, ctx })
  }
}

const writeFile = ({ file, fileResource, ctx }) => {
  // 读取文件流
  const fileReader = fs.createReadStream(file.filepath)
  // 使用 createWriteStream 写入数据，然后使用管道流pipe拼接
  const writeStream = fs.createWriteStream(fileResource)
  const handleReponse = () => {
    fileReader.pipe(writeStream)
    ctx.body = {
      url: `http:localhost:${port}/${pathSvg}/${file.originalFilename}`,
      code: 0,
      message: '上传成功',
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
