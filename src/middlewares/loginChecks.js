/**
 * @description  登录验证中间件
 * @author sswq
 */


const { createErrorData } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * @description API验证登陆中间件
 */
function genLoginCheck(){
    // 定义中间件函数
    async function loginCheck(ctx,next){
        if(ctx.session && ctx.session.userInfo) {
            await next()
            return
        }
        ctx.body = createErrorData(loginCheckFailInfo)

    }
    return loginCheck
}

/**
 * @description 页面验证登陆中间件
 */
function genLoginRedirect(){
    // 定义中间件函数
    async function loginRedirect(ctx,next){
        if(ctx.session && ctx.session.userInfo) {
            await next()
            return
        }
        const curUrl = ctx.url
        ctx.redirect(`/login?url=${encodeURIComponent(curUrl)}`)

    }
    return loginRedirect
}



module.exports = {
    genLoginCheck,
    genLoginRedirect
}