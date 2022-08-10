/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: urlList获取svg图片路径接口
 */
import KoaRouter from 'koa-router'
import fg from 'fast-glob'
import { prefix } from '../script/constant.js'
import { pathSvg } from '../script/paths.js'

const router = KoaRouter()

router.get('/urlList', async (ctx) => {
  // 获取服务端svg静态文件路径
  const svgList = fg.sync('*.svg', { cwd: 'static/svg' })
  const urlList = svgList.map((svg) => {
    return {
      iconName: prefix + '-' + svg.replace('.svg', ''),
      url: pathSvg + '/' + svg
    }
  })
  ctx.body = {
    urlList,
    code: 0,
    message: '获取成功'
  }
})

export default router
