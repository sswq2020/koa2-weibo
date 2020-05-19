const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const session = require('koa-generic-session') // 详细配置https://www.npmjs.com/package/koa-generic-session
const redisStore = require('koa-redis')

const {REDIS_CONF} = require('./conf/db')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

//session 配置
app.keys = ['SSwq_2332#']
app.use(session({

    key:'weibo.sid', // cookie name 默认是koa.sid
    prefix:'weibo.sess:', // redis key的前缀 默认是koa.sess
    // cookie的配置
    cookie: {
        path:'/',
        httpOnly:true,
        maxAge: 24 * 60 * 60 * 1000
    },
    ttl: 24 * 60 * 60 * 1000,
    // 配置redis
    store:redisStore({
        all:`${REDIS_CONF.host}:${REDIS_CONF.port}`,

    })
}))


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app