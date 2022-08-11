/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: 发布npm包接口
 */
import KoaRouter from 'koa-router'
import { updateVersion } from '../script/update-version.js'
import { gitPush } from '../script/git.js'

const router = KoaRouter()
router.get('/publish', async (ctx) => {
  const version = await updateVersion()
  const message = await gitPush(version)
  ctx.body = {
    code: 0,
    message
  }
})

export default router
