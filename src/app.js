const Koa = require('koa')
const path = require('path')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static')

const session = require('koa-generic-session') // 详细配置https://www.npmjs.com/package/koa-generic-session
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const {SESSION_SECRET_KEY} = require('./conf/secretKeys')

const blogViewRouter = require('./routes/view/blog')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const utilsAPIRouter = require('./routes/api/utils')
const errorViewRouter = require('./routes/view/error')

// error handler 
let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect: 'error' 
    }
}

onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname,'..','uploadFiles')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

//session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({

    key: 'weibo.sid', // cookie name 默认是koa.sid
    prefix: 'weibo.sess:', // redis key的前缀 默认是koa.sess
    // cookie的配置
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    ttl: 24 * 60 * 60 * 1000,
    // 配置redis
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,

    })
}))


// routes 

app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())

app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404路由一定放到最后 

// error-handling
app.on('error', (err, ctx) => { 
    console.error('server error', err, ctx)
})

module.exports = app
