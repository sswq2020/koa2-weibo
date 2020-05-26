/**
 * @description blog view 路由
 * @author
 */

 
const router = require('koa-router')()

const {genLoginRedirect} = require('../../middlewares/loginChecks')


router.get('/',genLoginRedirect(), async (ctx,next)=>{
    await ctx.render('index',{} )
})

module.exports = router