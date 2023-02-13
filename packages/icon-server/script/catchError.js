/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-09
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2023-02
 * @Description: 全局错误捕获
 */
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log(`🚀 => file: catchError.js:12 => error`, error)
    ctx.body = {
      code: 10001,
      message: error.msg ?? error,
      requestUrl: `${ctx.method} ${ctx.path}`,
    }
    ctx.status = 500
  }
}

export default catchError
