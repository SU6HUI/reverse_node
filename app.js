const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const jwt = require('jsonwebtoken')

const index = require('./routes/index')
const users = require('./routes/users')
const designworks = require('./routes/designworks')
const commitworks = require('./routes/commitworks')
// app.use(async ctx => {
//   if(ctx.status == 404) {
//     ctx.response.redirect('/404')
//   }
// })

// error handler
onerror(app)



// middlewares
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(async(ctx,next) => {
  let url = ctx.url.split('?')[0]
  if(url == '/api/users/loginuser') {
    await next()
  } else {
    let token = ctx.request.header['authorization']
    if(token.indexOf('Bearer') >= 0) token = token.replace('Bearer ','')
    if(token) {
      const tokenItem = jwt.verify(token,'woyebuzhidao')

      const {iat,exp} = tokenItem
      let data = +new Date()
      data = parseInt(data.toString().substring(0,10))
      if(data <= exp) {
        await next()
      } else {
        ctx.body = {
          status:504,
          message:'token已过期，请重新登录'
        }
      }
    } else {
      ctx.body = {
        status:405,
        message:'请登录'
      }
    }
  }
})
// app.use(checkToken)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(designworks.routes(),designworks.allowedMethods())
app.use(commitworks.routes(),commitworks.allowedMethods())




// error-handling
app.on('error', (err, ctx) => {
  if(err.name == 'UnauthorizedError') console.error('身份认证失败')
  console.error('server error', err, ctx)
});

app.listen(3000)

module.exports = app
