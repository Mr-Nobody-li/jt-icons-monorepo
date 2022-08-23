const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.body = {
      code: 10001,
      message: 'error',
      requestUrl: `${ctx.method} ${ctx.path}`
    }
    ctx.status = 500
  }
}

export default catchError
