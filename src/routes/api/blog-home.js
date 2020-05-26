/**
 * @description 首页 API 路由
 * @author sswq
 */

const router = require('koa-router')()
const { genLoginCheck } = require('../../middlewares/loginChecks')
const { releaseBlog } = require('../../controller/blog-home')
const genValidator = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')

router.prefix('/api/blog')

// 发布微博
router.post('/create', genLoginCheck(),genValidator(blogValidate), async (ctx, next) => {
    const {content,image} = ctx.request.body   
    ctx.body = await releaseBlog(ctx,{content,image})
})


module.exports = router