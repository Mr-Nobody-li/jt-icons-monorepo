/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: 发布npm包接口
 */
import KoaRouter from 'koa-router'
import { gitPush } from '../script/git.js'

const router = KoaRouter()
router.get('/publish', async (ctx) => {
  ctx.body = await gitPush()
})

export default router
