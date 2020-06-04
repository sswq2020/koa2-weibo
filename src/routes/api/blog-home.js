/**
 * @description 首页 API 路由
 * @author sswq
 */

const router = require('koa-router')()
const { genLoginCheck } = require('../../middlewares/loginChecks')
const { releaseBlog,getHomeBlogList } = require('../../controller/blog-home')
const { getBlogListStr } = require('../../utils/blog')
const genValidator = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')

router.prefix('/api/blog')

// 发布微博
router.post('/create', genLoginCheck(),genValidator(blogValidate), async (ctx, next) => {
    const {content,image} = ctx.request.body   
    ctx.body = await releaseBlog(ctx,{content,image})
})

// 首页加载更多微博
router.get('/loadMore/:pageIndex',genLoginCheck(),async (ctx,next) => {
    let { pageIndex } = ctx.params
    const {id} = ctx.session.userInfo
    const res = await getHomeBlogList(id,parseInt(pageIndex))   
    const { blogList } = res.data
    // 渲染为html字符串
    res.data.blogListTpl = getBlogListStr(blogList)
    ctx.body = res
})

module.exports = router