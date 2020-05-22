/**
 * @description user API
 * @author sswq
 */

const router = require('koa-router')() 
const {isExist,register,login} = require('../../controller/user')
const genValidator = require('../../middlewares/validator')
const userValidate = require('../../validator/user')

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


module.exports = router