/**
 * @description user API
 * @author sswq
 */

const router = require('koa-router')() 

const {isExist} = require('../../controller/user')

router.prefix('/api/user')

// 注册路由
router.post('/register',async (ctx,next)=>{

})


// 用户是否存在
router.post('/isExist',async (ctx,next)=>{
    debugger
    const {userName} = ctx.request.body
    ctx.body = await isExist(userName)
    // controller 
    
})

module.exports = router