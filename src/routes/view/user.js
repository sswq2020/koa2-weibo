/**
 * @description user view 路由
 * @author
 */

const router = require('koa-router')()

const getSessionUserInfo = (ctx)=>{
    const userInfo = ctx.session.userInfo
    if(!userInfo){
        return {
            isLogin:false
        }
    }else{
        return {
            isLogin:true,
            userName:userInfo.userName
        }
    }
}


router.get('/login', async (ctx, next) => {
    await ctx.render('login',getSessionUserInfo(ctx))
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getSessionUserInfo(ctx))
})

module.exports = router