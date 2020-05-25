/**
 * @description user API
 * @author sswq
 */

const router = require('koa-router')() 
const {
    logout,
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword} = require('../../controller/user')
const genValidator = require('../../middlewares/validator')
const userValidate = require('../../validator/user')
const {genLoginCheck} =require('../../middlewares/loginChecks')

const {isTest} = require('../../utils/env')

router.prefix('/api/user')

// 注册路由
router.post('/register',genValidator(userValidate),async (ctx,next)=>{
    const {userName,password,gender} = ctx.request.body
    ctx.body = await register({userName,password,gender})
})


// 用户是否存在
router.post('/isExist',async (ctx,next)=>{
    const {userName} = ctx.request.body
    ctx.body = await isExist(userName)
    // controller 
    
})

// 登录
router.post('/login',async (ctx,next)=>{
    const {userName,password} = ctx.request.body
    ctx.body = await login({userName,password,ctx})    
})

// 删除
router.post('/delete',genLoginCheck(), async (ctx,next)=>{
    if(isTest){
        // 测试环境下,测试账号登录之后,删除自己
        const {userName} = ctx.session.userInfo
        ctx.body = await deleteCurUser(ctx,userName)
    }else {
        ctx.body = {
            'errno': 100012,
            'title':'只在测试环境使用'
        }
    }   
})
 
// 修改基本信息
router.patch('/changeInfo', genLoginCheck(), genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, city, picture})
})

// 修改密码
router.patch('/changePassword', genLoginCheck(), genValidator(userValidate), async (ctx, next) => {
    const { password,newPassword } = ctx.request.body
    ctx.body = await changePassword(ctx, { password, newPassword})
})

// 退出登录
router.post('/logout', genLoginCheck(), async (ctx, next) => {
    ctx.body = await logout(ctx)
})

module.exports = router